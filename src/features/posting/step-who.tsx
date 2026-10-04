import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { readAreaCookie, useOpenMarkets } from "@/components/shell/location-data";
import { Check } from "lucide-react";

import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";

import { RequiredMark } from "./field";
import { PhoneNumberField } from "./phone-number-field";
import { loadPhoneLib, type PhoneLib } from "./phone-parse";
import { ALIAS_RULE_REASON, aliasRuleLocal } from "./alias-rules";
import {
  checkAlias as checkAliasDoor,
  readLastListingContact,
  readSellerIdentity,
  saveIdentity,
  suggestAliases,
  type SellerIdentity,
} from "./posting-service";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";
import { checkChannel } from "./validate";

/**
 * U6-C2b — STEP 7: WHO IS SELLING, AND HOW A BUYER REACHES THEM (spec §4 B2).
 *
 * FOUR DECISIONS CARRY THIS SCREEN.
 *
 *  1 A SELLER IS ASKED ONCE. The identity lives on the PROFILE, not on the
 *    listing: a seller who has posted before sees what is stored and CONFIRMS it,
 *    with one "change these" for the rare correction. Nothing is re-typed.
 *  2 THE ALIAS IS THE DOOR'S ANSWER, NOT THE SCREEN'S. The shape
 *    (`^[a-z0-9_]{3,30}$`) is mirrored here so a plainly wrong alias costs no
 *    round trip, but whether an alias is FREE — case-insensitively, against the
 *    reserved list — is known only to `save_posting_identity` (F3). The check is
 *    debounced and the door is idempotent, so asking is also claiming: an alias
 *    that comes back accepted is the seller's from that moment.
 *  3 MESSAGES CANNOT BE SWITCHED OFF. `listing_contact_refusals` requires it: a
 *    listing nobody can be reached about is not a listing. The toggle is shown as
 *    a fact, disabled, so the rule is visible rather than mysterious.
 *  4 A CHANNEL IS TWO ANSWERS. A number is not a permission: every channel has a
 *    value AND a "show it" switch, and the door refuses `showNeedsValue` if the
 *    switch is on with nothing behind it. A shown handle is validated by the door
 *    (`+2519…`, `@handle`), which this screen mirrors in the hint only.
 *
 * THE CHANNELS BELONG TO THE LISTING (`listings.contact_pref`, saved with the
 * draft); the ALIAS, TYPE, BUSINESS NAME and HOME COUNTRY belong to the PROFILE
 * and are committed to the identity route as each one settles — the door takes any
 * subset and leaves the fields it was not given alone.
 */

const ALIAS_DEBOUNCE_MS = 700;
/** Bundle 2 Q2 — `phone2` is the optional second phone, revealed on request. */
const CHANNELS = ["phone", "phone2", "telegram", "whatsapp"] as const;
type Channel = (typeof CHANNELS)[number];

const CHANNEL_LABELS: Record<Channel, MessageKey> = {
  phone: "post.who.channel.phone",
  phone2: "post.who.channel.phone2",
  telegram: "post.who.channel.telegram",
  whatsapp: "post.who.channel.whatsapp",
};

/** Bundle 2 Q1 — the number hints name no country's number (new keys, D5). */
const CHANNEL_HINTS: Record<Channel, MessageKey> = {
  phone: "post.who.channel.numberHint",
  phone2: "post.who.channel.numberHint",
  telegram: "post.who.channel.telegramHint",
  whatsapp: "post.who.channel.numberHint",
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const smallButtonClass =
  "inline-flex min-h-11 items-center rounded-md border border-input px-3 text-sm font-medium " +
  "text-foreground hover:bg-accent";

type AliasState = "idle" | "checking" | "ok" | "refused";

/** A door timestamp as a day in the reader's language; the raw value if unreadable. */
function formatDay(value: string, lang: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(date);
}

function channelOf(
  pref: Record<string, unknown>,
  channel: Channel,
): { show: boolean; value: string } {
  const entry = pref[channel];
  if (entry === null || typeof entry !== "object") return { show: false, value: "" };
  const row = entry as Record<string, unknown>;
  return {
    show: row["show"] === true,
    value: typeof row["value"] === "string" ? row["value"] : "",
  };
}

/** Bundle 2 Q3 — whether a draft's contact already holds a channel value. */
function hasChannelValue(pref: Record<string, unknown>): boolean {
  return CHANNELS.some((channel) => channelOf(pref, channel).value !== "");
}

export function StepWho({
  listingId = null,
  contactPref,
  refusals,
  onChange,
  itemCountry = null,
  nextTried = 0,
  onBlocked,
  saveRef,
}: {
  listingId?: string | null;
  contactPref: Record<string, unknown>;
  refusals: Refusal[];
  onChange: (contactPref: Record<string, unknown>, immediate: boolean) => void;
  /** B3 — the country of the place marked "the item or service is here", if known. */
  itemCountry?: string | null;
  /** Rulings 3 — how many times Next was refused here; > 0 shows the refusals at their controls. */
  nextTried?: number;
  /** Rulings 3 — whether Next must refuse on this step (unconfirmed country, unread phone). */
  /**
   * Rulings 4 item 4 — Next must not judge before the identity is read:
   * "pending" while the read is outstanding, then "blocked" or "open".
   */
  onBlocked?: (gate: "pending" | "blocked" | "open") => void;
  /**
   * Bundle 3 step 19 — checking is not claiming: the wizard calls this before it
   * leaves the step, and a checked name is claimed only then. False keeps the step.
   */
  saveRef?: { current: (() => Promise<boolean>) | null };
}) {
  const { t, entities, language } = useI18n();
  const markets = useOpenMarkets();

  const [identity, setIdentity] = useState<SellerIdentity | null>(null);
  const [identityFailed, setIdentityFailed] = useState(false);
  /** A stored identity is CONFIRMED, not re-asked, until the seller opens it. */
  const [editing, setEditing] = useState(false);

  const [alias, setAlias] = useState("");
  const [aliasState, setAliasState] = useState<AliasState>("idle");
  /** The check door's (or the mirror's) refusal for the typed name; nothing is saved. */
  const [aliasCheckRefusal, setAliasCheckRefusal] = useState<Refusal | null>(null);
  /** Step 21 — three free names, offered after every refusal. */
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sellerType, setSellerType] = useState("person");
  const [businessName, setBusinessName] = useState("");
  /** D17 — the account's own name, apart from the public alias. */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [countryLocked, setCountryLocked] = useState(false);
  /** Refusals the identity door named, kept apart from the draft's own. */
  const [identityRefusals, setIdentityRefusals] = useState<Refusal[]>([]);

  /** Step 11 — the phone library, loaded when this step opens; a failure offers a retry. */
  const [phoneLib, setPhoneLib] = useState<PhoneLib | null>(null);
  const [phoneLibFailed, setPhoneLibFailed] = useState(false);
  const loadLib = useCallback(() => {
    setPhoneLibFailed(false);
    loadPhoneLib().then(
      (lib) => {
        if (aliveRef.current) setPhoneLib(lib);
      },
      (error: unknown) => {
        console.error("[phone-lib] load failed", error);
        if (aliveRef.current) setPhoneLibFailed(true);
      },
    );
  }, []);
  useEffect(() => {
    loadLib();
  }, [loadLib]);

  const aliveRef = useRef(true);
  const aliasTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkedAliasRef = useRef("");

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      if (aliasTimerRef.current) clearTimeout(aliasTimerRef.current);
    };
  }, []);

  /** The stored identity, read once as the owner. */
  useEffect(() => {
    let cancelled = false;
    void readSellerIdentity().then((found) => {
      if (cancelled) return;
      if (found === null) {
        setIdentityFailed(true);
        return;
      }
      setIdentity(found);
      setAlias(found.alias ?? "");
      checkedAliasRef.current = found.alias ?? "";
      setSellerType(found.sellerType ?? "person");
      setBusinessName(found.businessName ?? "");
      setFirstName(found.firstName ?? "");
      setLastName(found.lastName ?? "");
      // A confirmed home country cannot be changed here (`countryAlreadyConfirmed`);
      // an unset one is FILLED IN from the seller's own saved area and confirmed.
      // Bundle 3 step 12 — only a CONFIRMED country locks; a guessed one is
      // offered and the seller confirms it (publish_listing requires that).
      if (found.homeCountryCode !== null && found.homeCountryConfirmed) {
        setCountry(found.homeCountryCode);
        setCountryLocked(true);
      } else if (found.homeCountryCode !== null) {
        setCountry(found.homeCountryCode);
      } else {
        setCountry(readAreaCookie()?.country ?? "");
      }
      setEditing(found.alias === null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Bundle 2 step 15 (Q3) — a new post opens with the channels of the seller's
   * last post (values and show switches, editable), written to the draft when
   * the step first opens so a seller who changes nothing publishes with them.
   * A draft that already holds a channel value is never overwritten.
   */
  const [carriedContact, setCarriedContact] = useState(false);
  /** Bundle 2 Q2 — "Add another phone" reveals the second phone row. */
  const [phone2Open, setPhone2Open] = useState(false);
  /** B4 — the first phone's country, so the second phone opens on it. */
  const [firstPhoneIso, setFirstPhoneIso] = useState("");
  /**
   * B3 — an empty box's country: the item's place, else the seller's home
   * country, else the posting market (`country` already holds home ▸ market).
   */
  const defaultIso = itemCountry ?? country;
  const carryAskedRef = useRef(false);
  const contactRef = useRef(contactPref);
  contactRef.current = contactPref;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (carryAskedRef.current) return;
    carryAskedRef.current = true;
    if (hasChannelValue(contactRef.current)) return;
    let cancelled = false;
    readLastListingContact(listingId)
      .then((last) => {
        if (cancelled || last === null || !hasChannelValue(last)) return;
        if (hasChannelValue(contactRef.current)) return;
        const next: Record<string, unknown> = { ...contactRef.current, messages: true };
        for (const channel of CHANNELS) {
          const entry = channelOf(last, channel);
          if (entry.value !== "") next[channel] = entry;
        }
        onChangeRef.current(next, true);
        setCarriedContact(true);
      })
      .catch((error: unknown) => {
        console.error("[post-who] last post's contact read failed", error);
      });
    return () => {
      cancelled = true;
    };
  }, [listingId]);

  const commit = useCallback(async (body: Parameters<typeof saveIdentity>[0]) => {
    const answer = await saveIdentity(body);
    if (!aliveRef.current) return answer;
    setIdentityRefusals(answer.ok ? [] : answer.refusals);
    return answer;
  }, []);

  /** Step 12 — a country the seller picks or confirms is saved as confirmed. */
  const confirmCountry = useCallback(
    async (code: string) => {
      const answer = await commit({ homeCountryCode: code });
      if (aliveRef.current && answer.ok) setCountryLocked(true);
    },
    [commit],
  );

  /** Step 21 — after a refusal, three free names from the seller's own names. */
  const offerSuggestions = useCallback(() => {
    void suggestAliases(
      sellerType === "business"
        ? { businessName }
        : { firstName: firstName.trim() || null, lastName: lastName.trim() || null },
    ).then((list) => {
      if (aliveRef.current) setSuggestions(list.slice(0, 3));
    });
  }, [sellerType, businessName, firstName, lastName]);

  /**
   * The live check (bundle 3 step 19): the mirror's rules a–c first, then the
   * check door, which writes nothing. The name is claimed when the step is saved.
   */
  const checkAlias = useCallback(
    (next: string) => {
      if (aliasTimerRef.current) clearTimeout(aliasTimerRef.current);
      setAliasCheckRefusal(null);
      if (next === "") {
        setAliasState("idle");
        return;
      }
      if (next === checkedAliasRef.current) {
        setAliasState("ok");
        return;
      }
      const local = aliasRuleLocal(next);
      if (local !== null) {
        setAliasCheckRefusal({ field: "alias", reason: ALIAS_RULE_REASON[local] });
        setAliasState("refused");
        offerSuggestions();
        return;
      }
      setAliasState("checking");
      aliasTimerRef.current = setTimeout(() => {
        void (async () => {
          const answer = await checkAliasDoor(next);
          if (!aliveRef.current) return;
          if (answer.ok) {
            setAliasState("ok");
            return;
          }
          setAliasCheckRefusal(answer.refusals[0] ?? { field: "alias", reason: "badValue" });
          setAliasState("refused");
          offerSuggestions();
        })();
      }, ALIAS_DEBOUNCE_MS);
    },
    [offerSuggestions],
  );

  /** Bundle 3 step 19 — the claim: a checked, changed name is saved as the step is left. */
  useEffect(() => {
    if (!saveRef) return;
    saveRef.current = async () => {
      const next = alias.trim().toLowerCase();
      if (next === "" || next === checkedAliasRef.current) return true;
      if (aliasState !== "ok") {
        if (aliasState !== "refused") checkAlias(next);
        return false;
      }
      const answer = await commit({ alias: next });
      if (!aliveRef.current) return answer.ok;
      if (answer.ok) {
        checkedAliasRef.current = next;
        return true;
      }
      setAliasCheckRefusal(refusalFor(answer.refusals, "alias"));
      setAliasState("refused");
      offerSuggestions();
      return false;
    };
    return () => {
      saveRef.current = null;
    };
  }, [saveRef, alias, aliasState, commit, checkAlias, offerSuggestions]);

  const setChannel = (channel: Channel, patch: { show?: boolean; value?: string }) => {
    // Read the latest pref, so two phones read in the same tick never clobber each other.
    const base = contactRef.current;
    const current = channelOf(base, channel);
    const next = { ...current, ...patch };
    const pref = { ...base, messages: true, [channel]: next };
    contactRef.current = pref;
    onChange(pref, patch.show !== undefined);
  };

  /** INC-407 — phone boxes holding text the library has not read yet. */
  const [pendingPhones, setPendingPhones] = useState<readonly Channel[]>([]);
  const setPhonePending = useCallback((channel: Channel, pending: boolean) => {
    setPendingPhones((prev) =>
      prev.includes(channel) === pending
        ? prev
        : pending
          ? [...prev, channel]
          : prev.filter((entry) => entry !== channel),
    );
  }, []);
  const unreadPhone = phoneLibFailed && pendingPhones.length > 0;
  const blocked = !countryLocked || unreadPhone;
  const identityPending = identity === null && !identityFailed;
  const gate = identityPending ? "pending" : blocked ? "blocked" : "open";
  const onBlockedRef = useRef(onBlocked);
  onBlockedRef.current = onBlocked;
  useEffect(() => {
    onBlockedRef.current?.(gate);
  }, [gate]);
  const showRequired = nextTried > 0;

  const aliasRefusal = refusalFor(identityRefusals, "alias");
  const shownAliasRefusal = aliasCheckRefusal ?? aliasRefusal;
  const typeRefusal = refusalFor(identityRefusals, "seller_type");
  const businessRefusal = refusalFor(identityRefusals, "business_name");
  const firstRefusal = refusalFor(identityRefusals, "first_name");
  const lastRefusal = refusalFor(identityRefusals, "last_name");
  const countryRefusal =
    refusalFor(identityRefusals, "home_country_code") ?? refusalFor(refusals, "home_country_code");
  /** The door names a channel refusal on the channel's own key. */
  const draftRefusalOf = (field: string) => refusalFor(refusals, field);
  /** What this screen saw on blur, in the doors' own words (U6-C1-R3a). */
  const [local, setLocal] = useState<Refusal[]>([]);
  const messagesRefusal = refusalFor(refusals, "messages") ?? refusalFor(refusals, "contact_pref");

  const countries = useMemo(() => markets.markets, [markets.markets]);
  const openMarketCodes = useMemo(() => countries.map((market) => market.code), [countries]);

  /** What this screen sees when a channel box is left (U6-C1-R3a). */
  const leaveChannel = (channel: Channel, value: string, show: boolean) => {
    const field = `contact_pref.${channel}`;
    const found = checkChannel(channel, value, show, field);
    setLocal((prev) => [
      ...prev.filter((entry) => entry.field !== field),
      ...(found === null ? [] : [found]),
    ]);
  };

  return (
    <div className="space-y-5" data-testid="post-who">
      <p className="text-sm text-muted-foreground">{t("post.who.why")}</p>

      {identityFailed && (
        <p className="text-sm text-destructive" data-testid="post-who-read-failed">
          {t("post.who.readFailed")}
        </p>
      )}

      {/* ------------------------- the stored identity ------------------------ */}
      {identity !== null && identity.alias !== null && !editing && (
        <div className="space-y-2 rounded-md border border-border p-3" data-testid="post-who-saved">
          <p className="text-sm text-foreground" data-testid="post-who-saved-alias">
            {identity.alias}
          </p>
          <p className="text-xs text-muted-foreground">{t("post.who.savedHint")}</p>
          <button
            type="button"
            data-testid="post-who-edit"
            className={smallButtonClass}
            onClick={() => setEditing(true)}
          >
            {t("post.who.edit")}
          </button>
        </div>
      )}

      {(editing || identity === null) && (
        <>
          {/* --------------------------- the alias ---------------------------- */}
          <div className="space-y-1">
            <label htmlFor="post-who-alias" className="text-sm font-medium text-foreground">
              {t("post.who.aliasLabel")}
            </label>
            <input
              id="post-who-alias"
              data-testid="post-who-alias"
              className={fieldClass}
              value={alias}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              onChange={(event) => {
                const next = event.target.value.toLowerCase();
                setAlias(next);
                checkAlias(next);
              }}
            />
            <p className="text-xs text-muted-foreground">{t("post.who.aliasRules")}</p>
            {aliasState === "checking" && (
              <p className="text-xs text-muted-foreground" data-testid="post-who-alias-checking">
                {t("post.who.aliasChecking")}
              </p>
            )}
            {aliasState === "ok" && (
              <p className="text-xs text-foreground" data-testid="post-who-alias-ok">
                {t("post.who.aliasAvailable")}
              </p>
            )}
            {/[^ -~]/.test(alias) && (
              <p className="text-xs text-muted-foreground" data-testid="post-who-alias-latin">
                {t("post.who.aliasLatinOnly")}
              </p>
            )}
            {aliasState === "refused" && shownAliasRefusal !== null && (
              <p className="text-sm text-destructive" data-testid="post-who-alias-refusal">
                {/* U6-C1-R2 — the imitation check names WHAT the alias resembles,
                    so the seller can tell a coincidence from a rejection. */}
                {shownAliasRefusal.reason === "aliasImitatesBrand"
                  ? fill(t("post.refusal.aliasImitatesBrand"), {
                      name: shownAliasRefusal.detail ?? "",
                    })
                  : shownAliasRefusal.reason === "aliasTooSoon"
                    ? fill(t("post.refusal.aliasTooSoon"), {
                        date: formatDay(shownAliasRefusal.detail ?? "", language),
                      })
                    : t(draftRefusalKey(shownAliasRefusal.reason))}
              </p>
            )}
            {/* THE SUGGESTION: a business's own name, or the account's name — the
                seller's to take in one tap, never written for them. */}
            {aliasState === "refused" && suggestions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{t("post.who.aliasSuggestions")}</span>
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    data-testid="post-who-alias-suggestion"
                    data-name={name}
                    className={smallButtonClass}
                    onClick={() => {
                      setAlias(name);
                      checkAlias(name);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/*
           * D17 / M-MAINT-2 A — THE SELLER'S OWN NAME, now that the columns exist
           * (`profiles.first_name`/`last_name`, mark 20260920000000) and the door
           * takes them (`save_posting_identity`'s `p_first_name`/`p_last_name`).
           *
           * IT IS NOT THE PUBLIC NAME. The alias is what a buyer reads; these two
           * belong to the account, and the hint says so plainly rather than
           * leaving a seller to guess what a marketplace will publish about them.
           * A PERSON must give them (the door refuses `nameRequired`); a BUSINESS
           * is known by its business name, so for a business they are optional and
           * the hint changes to say it.
           */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2" data-testid="post-who-names">
            <div className="space-y-1">
              <label htmlFor="post-who-first" className="text-sm font-medium text-foreground">
                {t("post.who.firstNameLabel")}
              </label>
              <input
                id="post-who-first"
                data-testid="post-who-first"
                className={fieldClass}
                value={firstName}
                autoComplete="given-name"
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={() => {
                  void commit({ firstName });
                }}
              />
              {firstRefusal !== null && (
                <p className="text-sm text-destructive" data-testid="post-who-first-refusal">
                  {t(draftRefusalKey(firstRefusal.reason))}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="post-who-last" className="text-sm font-medium text-foreground">
                {t("post.who.lastNameLabel")}
              </label>
              <input
                id="post-who-last"
                data-testid="post-who-last"
                className={fieldClass}
                value={lastName}
                autoComplete="family-name"
                onChange={(event) => setLastName(event.target.value)}
                onBlur={() => {
                  void commit({ lastName });
                }}
              />
              {lastRefusal !== null && (
                <p className="text-sm text-destructive" data-testid="post-who-last-refusal">
                  {t(draftRefusalKey(lastRefusal.reason))}
                </p>
              )}
            </div>
            <p
              className="text-xs text-muted-foreground md:col-span-2"
              data-testid="post-who-name-hint"
            >
              {sellerType === "business" ? t("post.who.nameBusinessHint") : t("post.who.nameHint")}
            </p>
          </div>

          {/* ------------------------- person or business ---------------------- */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">
              {t("post.who.typeLabel")}
            </legend>
            {(["person", "business"] as const).map((value) => (
              <label
                key={value}
                className="flex min-h-11 items-center gap-2 text-sm text-foreground"
              >
                <input
                  type="radio"
                  name="post-who-type"
                  data-testid={`post-who-type-${value}`}
                  checked={sellerType === value}
                  onChange={() => {
                    setSellerType(value);
                    void commit({
                      sellerType: value,
                      ...(value === "business" && businessName !== "" ? { businessName } : {}),
                    });
                  }}
                />
                <span>
                  {value === "person" ? t("post.who.typePerson") : t("post.who.typeBusiness")}
                </span>
              </label>
            ))}
            {typeRefusal !== null && (
              <p className="text-sm text-destructive" data-testid="post-who-type-refusal">
                {t(draftRefusalKey(typeRefusal.reason))}
              </p>
            )}
          </fieldset>

          {sellerType === "business" && (
            <div className="space-y-1">
              <label htmlFor="post-who-business" className="text-sm font-medium text-foreground">
                {t("post.who.businessLabel")}
              </label>
              <input
                id="post-who-business"
                data-testid="post-who-business"
                className={fieldClass}
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                onBlur={() => {
                  void commit({ sellerType: "business", businessName });
                }}
              />
              {businessRefusal !== null && (
                <p className="text-sm text-destructive" data-testid="post-who-business-refusal">
                  {t(draftRefusalKey(businessRefusal.reason))}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ---------------------------- the channels --------------------------- */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">{t("post.who.channelsLabel")}</p>
        {/* Bundle 3 step 10 — messages: one highlighted box, always on. */}
        <div
          className="space-y-1 rounded-md border-2 border-primary p-3"
          data-testid="post-who-channel-messages"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
            <span>{t("post.who.channel.messages")}</span>
            <span className="ms-auto rounded-sm bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {t("post.who.messagesOnBadge")}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">{t("post.who.messagesEveryBuyer")}</p>
          <p className="text-xs text-muted-foreground">{t("post.who.messagesCannotOff")}</p>
        </div>
        <p className="text-sm font-medium text-foreground">{t("post.who.optionalHeading")}</p>
        <p className="text-xs text-muted-foreground">{t("post.who.optionalLine")}</p>
        {phoneLibFailed && (
          <p
            className="flex flex-wrap items-center gap-2 text-sm text-destructive"
            data-testid="post-who-phone-lib-failed"
          >
            <span>{t("post.who.phoneLibFailed")}</span>
            <button
              type="button"
              className={smallButtonClass}
              data-testid="post-who-phone-lib-retry"
              onClick={loadLib}
            >
              {t("post.who.phoneLibRetry")}
            </button>
          </p>
        )}
        {carriedContact && (
          <p className="text-sm text-muted-foreground" data-testid="post-who-contact-carried">
            {t("post.who.contactFromLastPost")}
          </p>
        )}
        {messagesRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-who-messages-refusal">
            {t(draftRefusalKey(messagesRefusal.reason))}
          </p>
        )}

        {CHANNELS.map((channel) => {
          const current = channelOf(contactPref, channel);
          if (channel === "phone2" && !phone2Open && current.value === "" && !current.show) {
            return (
              <button
                key={channel}
                type="button"
                className={smallButtonClass}
                data-testid="post-who-add-phone2"
                onClick={() => setPhone2Open(true)}
              >
                {t("post.who.addPhone2")}
              </button>
            );
          }
          /**
           * U6-C1-R3a / STEP 8 — the door's refusal first, then what this screen
           * saw on blur (same shapes, same words). The identity route now asks
           * `listing_contact_refusals` BEFORE saving, so a phone of "number" is
           * refused there too and lands on this same control (`contact_pref.phone`).
           */
          const refusal =
            draftRefusalOf(channel) ??
            draftRefusalOf(`contact_pref.${channel}`) ??
            refusalFor(identityRefusals, `contact_pref.${channel}`) ??
            local.find((entry) => entry.field === `contact_pref.${channel}`) ??
            null;
          return (
            <div key={channel} className="space-y-1" data-testid={`post-who-channel-${channel}`}>
              <label
                htmlFor={`post-who-value-${channel}`}
                className="text-sm font-medium text-foreground"
              >
                {t(CHANNEL_LABELS[channel])}
              </label>
              {/* U6-C1-R2 — ONE ROW PER CHANNEL: the number and the permission sit
                  side by side, so whether a buyer will see it is visible at a
                  glance rather than a switch further down the screen. */}
              {/* B2 — the group keeps the number box at least 160 px; when the row
                  cannot also hold the switch, the switch wraps to its own line. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {channel === "telegram" ? (
                  <input
                    id={`post-who-value-${channel}`}
                    data-testid={`post-who-value-${channel}`}
                    className={`${fieldClass} grow`}
                    value={current.value}
                    inputMode="text"
                    onBlur={(event) => leaveChannel(channel, event.target.value, current.show)}
                    onChange={(event) => setChannel(channel, { value: event.target.value.trim() })}
                  />
                ) : (
                  /* Bundle 2 Q1 — a country picker in front of the number. */
                  <PhoneNumberField
                    id={`post-who-value-${channel}`}
                    testId={`post-who-value-${channel}`}
                    value={current.value}
                    defaultIso={
                      channel === "phone2" && firstPhoneIso !== "" ? firstPhoneIso : defaultIso
                    }
                    openMarkets={openMarketCodes}
                    onValue={(next) => setChannel(channel, { value: next })}
                    onLeave={(next) => leaveChannel(channel, next, current.show)}
                    onCountry={channel === "phone" ? setFirstPhoneIso : undefined}
                    lib={phoneLib}
                    onPending={(pending) => setPhonePending(channel, pending)}
                  />
                )}
                <label className="flex min-h-11 shrink-0 items-center gap-2 text-xs text-foreground">
                  <input
                    type="checkbox"
                    data-testid={`post-who-show-${channel}`}
                    checked={current.show}
                    onChange={(event) => setChannel(channel, { show: event.target.checked })}
                  />
                  <span>{t("post.who.showToSignedIn")}</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">{t(CHANNEL_HINTS[channel])}</p>
              {showRequired && phoneLibFailed && pendingPhones.includes(channel) && (
                <p
                  className="flex flex-wrap items-center gap-2 text-sm text-destructive"
                  data-testid={`post-who-unread-${channel}`}
                >
                  <span>{t("post.who.phoneLibFailed")}</span>
                  <button type="button" className={smallButtonClass} onClick={loadLib}>
                    {t("post.who.phoneLibRetry")}
                  </button>
                </p>
              )}
              {refusal !== null && (
                <p className="text-sm text-destructive" data-testid={`post-who-refusal-${channel}`}>
                  {t(draftRefusalKey(refusal.reason))}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* --------------------------- the home country ------------------------- */}
      <div className="space-y-1">
        <label htmlFor="post-who-country" className="text-sm font-medium text-foreground">
          {t("post.who.countryLabel")}
          {!countryLocked && <RequiredMark />}
        </label>
        <select
          id="post-who-country"
          data-testid="post-who-country"
          className={fieldClass}
          value={country}
          disabled={countryLocked || markets.isLoading}
          onChange={(event) => {
            const code = event.target.value;
            // Rulings 3 item 3 — choosing only selects; the button confirms.
            setCountry(code);
          }}
        >
          <option value="">{t("post.who.countryNone")}</option>
          {countries.map((market) => (
            <option key={market.code} value={market.code}>
              {market.anchorId === null
                ? market.nameEn
                : entityName(
                    "location",
                    { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
                    entities,
                  )}
            </option>
          ))}
        </select>
        {!countryLocked && country !== "" && (
          <button
            type="button"
            data-testid="post-who-country-confirm"
            className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground"
            onClick={() => void confirmCountry(country)}
          >
            {t("post.who.countryConfirm")}
          </button>
        )}
        <p className="text-xs text-muted-foreground">
          {countryLocked ? t("post.who.countryConfirmed") : t("post.who.countryWhereHint")}
        </p>
        {!countryLocked && countryRefusal === null && !showRequired && (
          <p className="text-sm text-muted-foreground" data-testid="post-who-country-required">
            {t("post.who.countryRequired")}
          </p>
        )}
        {(countryRefusal !== null || (showRequired && !countryLocked)) && (
          <p className="text-sm text-destructive" data-testid="post-who-country-refusal">
            {t(draftRefusalKey(countryRefusal?.reason ?? "required"))}
          </p>
        )}
      </div>
    </div>
  );
}

export default StepWho;

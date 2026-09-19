import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { readAreaCookie, useOpenMarkets } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";

import { readSellerIdentity, saveIdentity, type SellerIdentity } from "./posting-service";
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

const ALIAS_RE = /^[a-z0-9_]{3,30}$/;
const ALIAS_DEBOUNCE_MS = 700;
const CHANNELS = ["phone", "telegram", "whatsapp"] as const;
type Channel = (typeof CHANNELS)[number];

const CHANNEL_LABELS: Record<Channel, MessageKey> = {
  phone: "post.who.channel.phone",
  telegram: "post.who.channel.telegram",
  whatsapp: "post.who.channel.whatsapp",
};

const CHANNEL_HINTS: Record<Channel, MessageKey> = {
  phone: "post.who.channel.phoneHint",
  telegram: "post.who.channel.telegramHint",
  whatsapp: "post.who.channel.whatsappHint",
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const smallButtonClass =
  "inline-flex min-h-11 items-center rounded-md border border-input px-3 text-sm font-medium " +
  "text-foreground hover:bg-accent";

type AliasState = "idle" | "checking" | "ok" | "refused" | "badShape";

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

export function StepWho({
  contactPref,
  refusals,
  onChange,
}: {
  contactPref: Record<string, unknown>;
  refusals: Refusal[];
  onChange: (contactPref: Record<string, unknown>, immediate: boolean) => void;
}) {
  const { t, entities } = useI18n();
  const markets = useOpenMarkets();

  const [identity, setIdentity] = useState<SellerIdentity | null>(null);
  const [identityFailed, setIdentityFailed] = useState(false);
  /** A stored identity is CONFIRMED, not re-asked, until the seller opens it. */
  const [editing, setEditing] = useState(false);

  const [alias, setAlias] = useState("");
  const [aliasState, setAliasState] = useState<AliasState>("idle");
  const [sellerType, setSellerType] = useState("person");
  const [businessName, setBusinessName] = useState("");
  /** D17 — the account's own name, apart from the public alias. */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [countryLocked, setCountryLocked] = useState(false);
  /** Refusals the identity door named, kept apart from the draft's own. */
  const [identityRefusals, setIdentityRefusals] = useState<Refusal[]>([]);

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
      if (found.homeCountryCode !== null) {
        setCountry(found.homeCountryCode);
        setCountryLocked(true);
      } else {
        setCountry(readAreaCookie()?.country ?? "");
      }
      setEditing(found.alias === null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const commit = useCallback(async (body: Parameters<typeof saveIdentity>[0]) => {
    const answer = await saveIdentity(body);
    if (!aliveRef.current) return answer;
    setIdentityRefusals(answer.ok ? [] : answer.refusals);
    return answer;
  }, []);

  /** The live availability check: shape first, then the door (decision 2). */
  const checkAlias = useCallback(
    (next: string) => {
      if (aliasTimerRef.current) clearTimeout(aliasTimerRef.current);
      if (next === "") {
        setAliasState("idle");
        return;
      }
      if (!ALIAS_RE.test(next)) {
        setAliasState("badShape");
        return;
      }
      if (next === checkedAliasRef.current) {
        setAliasState("ok");
        return;
      }
      setAliasState("checking");
      aliasTimerRef.current = setTimeout(() => {
        void (async () => {
          const answer = await commit({ alias: next });
          if (!aliveRef.current) return;
          if (answer.ok) {
            checkedAliasRef.current = next;
            setAliasState("ok");
            return;
          }
          setAliasState("refused");
        })();
      }, ALIAS_DEBOUNCE_MS);
    },
    [commit],
  );

  const setChannel = (channel: Channel, patch: { show?: boolean; value?: string }) => {
    const current = channelOf(contactPref, channel);
    const next = { ...current, ...patch };
    onChange(
      {
        ...contactPref,
        messages: true,
        [channel]: next,
      },
      patch.show !== undefined,
    );
  };

  const aliasRefusal = refusalFor(identityRefusals, "alias");
  const typeRefusal = refusalFor(identityRefusals, "seller_type");
  const businessRefusal = refusalFor(identityRefusals, "business_name");
  const firstRefusal = refusalFor(identityRefusals, "first_name");
  const lastRefusal = refusalFor(identityRefusals, "last_name");
  const countryRefusal = refusalFor(identityRefusals, "home_country_code");
  /** The door names a channel refusal on the channel's own key. */
  const draftRefusalOf = (field: string) => refusalFor(refusals, field);
  /** What this screen saw on blur, in the doors' own words (U6-C1-R3a). */
  const [local, setLocal] = useState<Refusal[]>([]);
  const messagesRefusal = refusalFor(refusals, "messages") ?? refusalFor(refusals, "contact_pref");

  const countries = useMemo(() => markets.markets, [markets.markets]);

  /**
   * U6-C1-R2 — THE SUGGESTED SELLER NAME. A business is known by its business
   * name; a person by the name on their account. The suggestion is squeezed into
   * the alias SHAPE the door accepts, and offered — the seller still taps it.
   */
  const suggestedAlias = useMemo(() => {
    const source = sellerType === "business" ? businessName : (identity?.displayName ?? "");
    const shaped = source
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 30);
    return ALIAS_RE.test(shaped) ? shaped : null;
  }, [sellerType, businessName, identity]);

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
            <p className="text-xs text-muted-foreground">{t("post.who.aliasHint")}</p>
            {aliasState === "checking" && (
              <p className="text-xs text-muted-foreground" data-testid="post-who-alias-checking">
                {t("post.who.aliasChecking")}
              </p>
            )}
            {aliasState === "ok" && (
              <p className="text-xs text-foreground" data-testid="post-who-alias-ok">
                {t("post.who.aliasFree")}
              </p>
            )}
            {aliasState === "badShape" && (
              <p className="text-sm text-destructive" data-testid="post-who-alias-refusal">
                {t("post.refusal.badShape")}
              </p>
            )}
            {aliasState === "refused" && aliasRefusal !== null && (
              <p className="text-sm text-destructive" data-testid="post-who-alias-refusal">
                {/* U6-C1-R2 — the imitation check names WHAT the alias resembles,
                    so the seller can tell a coincidence from a rejection. */}
                {aliasRefusal.reason === "aliasImitatesBrand"
                  ? fill(t("post.refusal.aliasImitatesBrand"), {
                      name: aliasRefusal.detail ?? "",
                    })
                  : t(draftRefusalKey(aliasRefusal.reason))}
              </p>
            )}
            {/* THE SUGGESTION: a business's own name, or the account's name — the
                seller's to take in one tap, never written for them. */}
            {suggestedAlias !== null && suggestedAlias !== alias && (
              <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span data-testid="post-who-alias-suggested">
                  {fill(t("post.who.aliasSuggested"), { alias: suggestedAlias })}
                </span>
                <button
                  type="button"
                  data-testid="post-who-alias-use"
                  className={smallButtonClass}
                  onClick={() => {
                    setAlias(suggestedAlias);
                    checkAlias(suggestedAlias);
                  }}
                >
                  {t("post.who.aliasUseIt")}
                </button>
              </p>
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
        <p className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked
            disabled
            data-testid="post-who-channel-messages"
            aria-label={t("post.who.channel.messages")}
          />
          <span>{t("post.who.channel.messages")}</span>
        </p>
        <p className="text-xs text-muted-foreground">{t("post.who.messagesAlways")}</p>
        {messagesRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-who-messages-refusal">
            {t(draftRefusalKey(messagesRefusal.reason))}
          </p>
        )}

        {CHANNELS.map((channel) => {
          const current = channelOf(contactPref, channel);
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
              <div className="flex items-center gap-3">
                <input
                  id={`post-who-value-${channel}`}
                  data-testid={`post-who-value-${channel}`}
                  className={`${fieldClass} grow`}
                  value={current.value}
                  inputMode={channel === "telegram" ? "text" : "tel"}
                  onBlur={(event) => {
                    const field = `contact_pref.${channel}`;
                    const found = checkChannel(channel, event.target.value, current.show, field);
                    setLocal((prev) => [
                      ...prev.filter((entry) => entry.field !== field),
                      ...(found === null ? [] : [found]),
                    ]);
                  }}
                  onChange={(event) => setChannel(channel, { value: event.target.value.trim() })}
                />
                <label className="flex min-h-11 shrink-0 items-center gap-2 text-xs text-foreground">
                  <input
                    type="checkbox"
                    data-testid={`post-who-show-${channel}`}
                    checked={current.show}
                    onChange={(event) => setChannel(channel, { show: event.target.checked })}
                  />
                  <span>{t("post.who.showOnListing")}</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">{t(CHANNEL_HINTS[channel])}</p>
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
        </label>
        <select
          id="post-who-country"
          data-testid="post-who-country"
          className={fieldClass}
          value={country}
          disabled={countryLocked || markets.isLoading}
          onChange={(event) => {
            const code = event.target.value;
            setCountry(code);
            if (code !== "") void commit({ homeCountryCode: code });
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
        <p className="text-xs text-muted-foreground">
          {countryLocked ? t("post.who.countryConfirmed") : t("post.who.countryHint")}
        </p>
        {countryRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-who-country-refusal">
            {t(draftRefusalKey(countryRefusal.reason))}
          </p>
        )}
      </div>
    </div>
  );
}

export default StepWho;

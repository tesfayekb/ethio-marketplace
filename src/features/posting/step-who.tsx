import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { readAreaCookie, useOpenMarkets } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";

import { readSellerIdentity, saveIdentity, type SellerIdentity } from "./posting-service";
import { draftRefusalKey, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";

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
  const countryRefusal = refusalFor(identityRefusals, "home_country_code");
  /** The door names a channel refusal on the channel's own key. */
  const draftRefusalOf = (field: string) => refusalFor(refusals, field);
  const messagesRefusal = refusalFor(refusals, "messages") ?? refusalFor(refusals, "contact_pref");

  const countries = useMemo(() => markets.markets, [markets.markets]);

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
                {t(draftRefusalKey(aliasRefusal.reason))}
              </p>
            )}
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
          const refusal = draftRefusalOf(channel);
          return (
            <div key={channel} className="space-y-1" data-testid={`post-who-channel-${channel}`}>
              <label
                htmlFor={`post-who-value-${channel}`}
                className="text-sm font-medium text-foreground"
              >
                {t(CHANNEL_LABELS[channel])}
              </label>
              <input
                id={`post-who-value-${channel}`}
                data-testid={`post-who-value-${channel}`}
                className={fieldClass}
                value={current.value}
                inputMode={channel === "telegram" ? "text" : "tel"}
                onChange={(event) => setChannel(channel, { value: event.target.value.trim() })}
              />
              <p className="text-xs text-muted-foreground">{t(CHANNEL_HINTS[channel])}</p>
              <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  data-testid={`post-who-show-${channel}`}
                  checked={current.show}
                  onChange={(event) => setChannel(channel, { show: event.target.checked })}
                />
                <span>{t("post.who.showIt")}</span>
              </label>
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

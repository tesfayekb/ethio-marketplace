import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Z_POPOVER } from "@/components/layout/layers";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field, RequiredMark } from "./field";
import {
  currencyText,
  orderCurrencies,
  readGuessCurrency,
  readSellerHome,
  readLastListingCurrency,
  shortlistCurrencies,
  useCurrencies,
  useMarketCurrencies,
  useSellerHome,
  type CurrencyRow,
} from "./pricing-data";

import { draftRefusalKey, fieldAwareRefusal, fill, refusalFor } from "./refusal-text";
import { PRICE_MODES, PRICE_PERIODS, type CategoryFacts, type Refusal } from "./types";
import { formatCommission, percentToBp, priceShapeFor } from "./price-basis";
import { checkNumber, checkPriceBasis, mergeRefusals } from "./validate";

/**
 * U6-C2a / U6-C1-R1 — STEP 5: WHAT IT COSTS (DEC-067, D13).
 *
 * THE ORDER IS THE POINT (operator walk 2026-09-18):
 *
 *   mode → currency → amount → period
 *
 * A seller names the KIND of price first, then the money the number is in, then
 * the number. Asking for an amount before its currency invites a figure in the
 * wrong money. The period comes last and ONLY when the category leaves it
 * choosable: a locked period is shown to the buyer on the card, so repeating it
 * here as an un-editable line is noise.
 *
 * ONE CURRENCY CONTROL. 156 rows is a list, not a menu, so it is a combobox:
 * type "birr" or "ETB", move with the arrows, choose with Enter. The second text
 * box the walk found (a search field AND a select) is gone.
 *
 * The take-down date has LEFT this step: it belongs with the listing's active
 * window, which the review step now owns.
 *
 * Every rule here is a MIRROR. `submit_listing` is the authority (F3): its
 * `priceNotAllowed`, `periodLocked` and `unknownCurrency` refusals land beneath
 * the field that earned them.
 */

const MODE_KEYS: Record<string, MessageKey> = {
  fixed: "post.price.mode.fixed",
  free: "post.price.mode.free",
  contact: "post.price.mode.contact",
  commission: "post.price.mode.commission",
};

const PERIOD_KEYS: Record<string, MessageKey> = {
  once: "post.price.period.once",
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

/** W6b-2 A2 — how many zeros the typed amount is shifted by. */
type AmountScale = 0 | 3 | 6;

/**
 * The typed digits shifted by `zeros` places as a decimal STRING operation, so
 * "5.25" × million is exactly 5250000 (E4 — no float product). Anything that is
 * not a plain decimal is `null`.
 */
export function scaleAmount(raw: string, zeros: AmountScale): number | null {
  if (!/^\d*\.?\d*$/.test(raw) || raw === "" || raw === ".") return null;
  const [whole = "", frac = ""] = raw.split(".");
  const moved = frac.padEnd(zeros, "0");
  const digits = `${whole}${moved.slice(0, zeros)}`;
  const rest = moved.slice(zeros);
  const text = rest === "" ? digits : `${digits}.${rest}`;
  const value = Number(text === "" ? "0" : text);
  return Number.isFinite(value) ? value : null;
}

export interface PricingValues {
  priceMode: string;
  /** The amount as the seller typed it; `null` until they type a number. */
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** DEC-079 — a commission in basis points; null for every other mode. */
  priceBp: number | null;
  /** DEC-081 — the "Price is negotiable" flag; only a fixed or commission price carries it. */
  priceNegotiable: boolean;
  /** An ISO date (`YYYY-MM-DD`) or the empty string; step 8 owns this field now. */
  posterExpiresAt: string;
}

export function StepPricing({
  facts,
  values,
  refusals,
  onChange,
  basisValue = null,
  basisLabel = null,
  basisControl = null,
  basisKey = null,
  trailing = null,
}: {
  /** The category block of the posting read; `null` while it is still loading. */
  facts: CategoryFacts | null;
  values: PricingValues;
  refusals: Refusal[];
  onChange: (patch: Partial<PricingValues>, immediate: boolean) => void;
  /** DEC-079 — the seller's answer to the leaf's ONE pricing basis, or null. */
  basisValue?: string | null;
  /** That answer's option label in the UI language (the token while loading). */
  basisLabel?: string | null;
  /**
   * DEC-109 — "How it is sold": the basis in force and the size rows, drawn by
   * the SAME specifications form (`only=<basis + size>`), FIRST on this page.
   */
  basisControl?: ReactNode;
  /** DEC-109 step 7 — the basis key in force (`basisInForce`), or null. */
  basisKey?: string | null;
  /** DEC-109 — "How many do you have?" and "Terms", drawn after the price. */
  trailing?: ReactNode;
}) {
  const { t, language } = useI18n();
  const currencies = useCurrencies();
  const { home } = useSellerHome();
  const { markets } = useMarketCurrencies();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [highlight, setHighlight] = useState(0);
  /**
   * INC-280 — WHERE THE LIST OPENS. Downward by default; upward only when the
   * room below (the viewport, or the sticky action bar's top when it is sticky)
   * cannot hold the list and the room above is larger. Decided when the list
   * opens and on resize while open — never by scrolling or moving focus.
   */
  const [placement, setPlacement] = useState<"up" | "down">("down");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const guessRef = useRef<string | null>(null);
  /** The preselect is resolved ONCE per visit, never re-raced by a re-render. */
  const resolvedRef = useRef(false);

  /**
   * DEC-079 / D31 — A BASIS ANSWER DECIDES THE SHAPE. With one, the period is
   * derived (never chosen) and a forced type is the only type; the door refuses
   * `periodFollowsBasis` / `modeFollowsBasis` by itself (F3). L5: the basis
   * outranks the category's DEC-067 lock. No basis → DEC-067 exactly as before.
   */
  const basisOn = basisKey !== null && basisValue !== null;
  const shape = basisOn ? priceShapeFor(basisValue) : null;
  const forcedMode = shape?.forcedMode ?? null;
  const derivedPeriod =
    shape === null ? null : (shape.period ?? facts?.defaultPricePeriod ?? "once");
  const locked = basisOn || (facts?.pricePeriodLocked ?? false);
  const priceEnabled = facts?.priceEnabled ?? true;
  const commission = values.priceMode === "commission";
  const amountShown = values.priceMode === "fixed";
  /** DEC-081 — the toggle belongs to a price with a figure: fixed or commission. */
  const toggleShown = amountShown || commission;
  // A forced type is the only type; otherwise every type but commission (free stays).
  const modes = PRICE_MODES.filter((mode) =>
    forcedMode !== null ? mode === forcedMode : mode !== "commission",
  );

  /** The period's default comes from the category, written as an ordinary change. */
  useEffect(() => {
    if (facts === null) return;
    if (derivedPeriod !== null) {
      if (values.pricePeriod !== derivedPeriod) onChange({ pricePeriod: derivedPeriod }, false);
      return;
    }
    if (values.pricePeriod !== null) return;
    onChange({ pricePeriod: facts.defaultPricePeriod }, false);
  }, [facts, derivedPeriod, values.pricePeriod, onChange]);

  /** INC-375 — the type a basis last forced; released when the basis stops forcing it. */
  const forcedBefore = useRef(forcedMode);
  /** A forced type is written as an ordinary change, clearing what it forbids. */
  useEffect(() => {
    const previous = forcedBefore.current;
    forcedBefore.current = forcedMode;
    if (forcedMode !== null && values.priceMode !== forcedMode) {
      onChange(
        {
          priceMode: forcedMode,
          priceAmount: null,
          priceCurrency: null,
          priceBp: null,
          // A contact price carries no negotiable flag (the door forces it off too).
          ...(forcedMode === "contact" ? { priceNegotiable: false } : {}),
        },
        false,
      );
    } else if (forcedMode === null && values.priceMode === "commission") {
      onChange({ priceMode: "fixed", priceBp: null }, false);
    } else if (forcedMode === null && previous === "contact" && values.priceMode === "contact") {
      onChange({ priceMode: "fixed" }, false);
    }
  }, [forcedMode, values.priceMode, onChange]);

  /**
   * DEC-081 — A NEGOTIABLE BASIS SWITCHES THE TOGGLE ON, once per change of the
   * basis answer, as an ordinary change the seller may undo. Opening the step on
   * an already-answered basis writes nothing.
   */
  const basisSeen = useRef(basisValue);
  useEffect(() => {
    if (basisSeen.current === basisValue) return;
    basisSeen.current = basisValue;
    if (shape?.negotiable === true && !values.priceNegotiable) {
      onChange({ priceNegotiable: true }, false);
    }
  }, [basisValue, shape, values.priceNegotiable, onChange]);

  /**
   * U6-C1-R3a-2 — THE CURRENCY PRESELECT, IN ORDER:
   *
   *   1 the currency already SAVED on this draft (nothing overrides the seller),
   *   2 the seller's OWN LAST LISTING's currency — what they used before is what
   *     they mean now, wherever the edge thinks they are today,
   *   3 D62-2 — the seller's HOME country's currency (their own profile),
   *   4 the GUESS MARKET's currency (`cf-ipcountry` through `/api/geo`),
   *   5 `ETB`.
   *
   * The door still judges the currency it is sent (F3); this only opens the
   * screen on the answer the seller most likely means.
   */
  useEffect(() => {
    if (values.priceCurrency !== null) return;
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    /**
     * NO CANCELLATION HERE, deliberately: this effect's identity changes with
     * every draft write, and a cleanup that abandoned the in-flight read would
     * leave `resolvedRef` set and the seller with no currency at all.
     */
    void (async () => {
      const last = await readLastListingCurrency();
      if (last !== null) {
        onChange({ priceCurrency: last }, false);
        return;
      }
      const home = await readSellerHome();
      if (home.currencyCode !== null) {
        onChange({ priceCurrency: home.currencyCode }, false);
        return;
      }
      const guessed = await readGuessCurrency();
      guessRef.current = guessed;
      onChange({ priceCurrency: guessed }, false);
    })();
  }, [values.priceCurrency, onChange]);

  /**
   * U6-C1-R3a / STEP 8 — the amount is judged on blur with the door's own rules
   * (`required`, `notPositive`), so a zero or an empty box says so here rather
   * than on Next. `submit_listing` remains the authority (F3).
   */
  const [local, setLocal] = useState<Refusal[]>([]);
  const basisLocal = checkPriceBasis({
    basisKey,
    basisValue,
    priceMode: values.priceMode,
    pricePeriod: values.pricePeriod,
    defaultPeriod: facts?.defaultPricePeriod ?? "once",
    forcedMode,
    derivedPeriod,
    priceBp: values.priceBp,
  });
  const seen = mergeRefusals(refusals, [...local, ...basisLocal]);
  const bpRefusal = fieldAwareRefusal(refusalFor(seen, "price_bp"));
  const [percentText, setPercentText] = useState(
    values.priceBp === null ? "" : formatCommission(values.priceBp),
  );

  const modeRefusal = refusalFor(seen, "price_mode");
  const amountRefusal = refusalFor(seen, "price_amount");
  const currencyRefusal = refusalFor(seen, "price_currency");
  const periodRefusal = refusalFor(seen, "price_period");

  /**
   * THE LIST IS THE OPEN MARKETS' MONEY, the seller's own market first, until the
   * seller asks for more: typing a needle, or the "More currencies…" row, opens
   * the full ISO list. A short list is the whole point — 156 rows is a haystack
   * on a 360 px screen.
   */
  const homeCurrency = home?.currencyCode ?? null;
  const ordered = useMemo(
    () => orderCurrencies(currencies.currencies, homeCurrency),
    [currencies.currencies, homeCurrency],
  );
  const shortlist = useMemo(
    () => shortlistCurrencies(markets, currencies.currencies, homeCurrency),
    [markets, currencies.currencies, homeCurrency],
  );

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle !== "") {
      return ordered
        .filter(
          (row) =>
            row.code.toLowerCase().includes(needle) || row.nameEn.toLowerCase().includes(needle),
        )
        .slice(0, 40);
    }
    if (showAll || shortlist.length === 0) return ordered.slice(0, 40);
    const rows = shortlist
      .map((code) => currencies.currencies.find((row) => row.code === code) ?? null)
      .filter((row): row is CurrencyRow => row !== null);
    return rows;
  }, [currencies.currencies, ordered, query, shortlist, showAll]);

  /** True while the picker is showing the short list and more remain behind it. */
  const moreHidden =
    query.trim() === "" &&
    !showAll &&
    shortlist.length > 0 &&
    matches.length < currencies.currencies.length;

  const rowCount = matches.length + (moreHidden ? 1 : 0);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const input = inputRef.current;
      if (input === null) return;
      const rect = input.getBoundingClientRect();
      const bar = document.querySelector<HTMLElement>('[data-testid="form-layout-actions"]');
      const barTop =
        bar !== null && window.getComputedStyle(bar).position === "sticky"
          ? bar.getBoundingClientRect().top
          : window.innerHeight;
      const roomBelow = Math.min(barTop, window.innerHeight) - rect.bottom - 4;
      const roomAbove = rect.top - 4;
      const listHeight = Math.min(256, 44 * rowCount + 2);
      const next = roomBelow >= listHeight ? "down" : roomAbove > roomBelow ? "up" : "down";
      setPlacement((prev) => (prev === next ? prev : next));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, rowCount]);

  const chosen = currencies.currencies.find((row) => row.code === values.priceCurrency) ?? null;

  const choose = (code: string) => {
    onChange({ priceCurrency: code }, true);
    setQuery("");
    setOpen(false);
    setHighlight(0);
  };

  /**
   * W6b-2 A2 — the box holds what the seller TYPED; the scale (— · thousand ·
   * million) multiplies it by a decimal shift on the digits, never a float
   * product (E4). The value sent is the full amount; a reopen shows it as typed
   * with the scale at "—". A value written from outside (a mode switch clears it)
   * resets the box.
   */
  const [amountText, setAmountText] = useState<string>(
    values.priceAmount === null ? "" : String(values.priceAmount),
  );
  const [amountScale, setAmountScale] = useState<AmountScale>(0);
  useEffect(() => {
    if (values.priceAmount === scaleAmount(amountText, amountScale)) return;
    setAmountText(values.priceAmount === null ? "" : String(values.priceAmount));
    setAmountScale(0);
    // Only an outside write re-seeds the box; the seller's own typing never does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.priceAmount]);

  /** The seller's own locale formatting for the amount caption (never for storage). */
  const shownAmount =
    values.priceAmount === null
      ? ""
      : new Intl.NumberFormat(language === "am" ? "am-ET" : "en-US").format(values.priceAmount);

  return (
    <div className="space-y-5" data-testid="post-pricing">
      <p className="text-sm text-muted-foreground">{t("post.price.why")}</p>

      {/* D62-2 — the pricing basis is asked FIRST: it shapes everything below. */}
      {basisControl}

      {/* DEC-109 — the price group's own heading, between "How it is sold" and the rest. */}
      <h3 className="text-sm font-semibold text-foreground" data-testid="post-price-group-price">
        {t("post.price.group.price")}
      </h3>

      {/* ---------------------------- 1 · the mode --------------------------- */}
      <fieldset className="space-y-2">
        <legend className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span>{t("post.price.modeLabel")}</span>
          {/* D72 — the one required mark (it also gives screen readers the word). */}
          <RequiredMark />
        </legend>
        <div className="flex flex-wrap gap-2">
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              data-testid={`post-price-mode-${mode}`}
              aria-pressed={values.priceMode === mode}
              className={`min-h-11 rounded-md border px-4 text-sm font-medium ${
                values.priceMode === mode
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-foreground hover:bg-accent"
              }`}
              onClick={() =>
                onChange(
                  // A mode without a price clears the amount: the door refuses an
                  // amount sent with `free`/`contact`, so it must not linger.
                  mode === "free" || mode === "contact"
                    ? { priceMode: mode, priceAmount: null, priceBp: null, priceNegotiable: false }
                    : { priceMode: mode, priceBp: null },
                  true,
                )
              }
            >
              {t(MODE_KEYS[mode] ?? "post.price.modeLabel")}
            </button>
          ))}
        </div>
        {!priceEnabled && (
          <p className="text-xs text-muted-foreground" data-testid="post-price-notallowed">
            {t("post.price.notAllowed")}
          </p>
        )}
        {modeRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-price-mode-refusal">
            {t(draftRefusalKey(modeRefusal.reason))}
          </p>
        )}
      </fieldset>

      {amountShown && (
        <>
          {/* ------------------------- 2 · the currency ----------------------- */}
          <Field
            id="post-price-currency-search"
            label={t("post.price.currencyLabel")}
            required={false}
            refusal={currencyRefusal}
            hint={
              currencies.failed ? (
                <p className="text-sm text-destructive" data-testid="post-price-currency-error">
                  {t("post.price.currencyFailed")}
                </p>
              ) : undefined
            }
          >
            <div className="relative">
              <input
                ref={inputRef}
                id="post-price-currency-search"
                data-testid="post-price-currency-search"
                role="combobox"
                aria-expanded={open}
                aria-controls="post-price-currency-list"
                autoComplete="off"
                className={`${controlClass(currencyRefusal !== null)} pe-10`}
                value={
                  open || query !== ""
                    ? query
                    : chosen === null
                      ? (values.priceCurrency ?? "")
                      : currencyText(chosen)
                }
                placeholder={t("post.price.currencySearch")}
                onFocus={() => setOpen(true)}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                  setHighlight(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setOpen(true);
                    setHighlight((index) => Math.min(index + 1, Math.max(matches.length - 1, 0)));
                    return;
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setHighlight((index) => Math.max(index - 1, 0));
                    return;
                  }
                  if (event.key === "Enter") {
                    event.preventDefault();
                    const row = matches[highlight];
                    if (row !== undefined) choose(row.code);
                    return;
                  }
                  if (event.key === "Escape") setOpen(false);
                }}
              />
              {/* U6-C1-R2 — THE AFFORDANCE: a chevron, so the box reads as a list
                  to open rather than a plain text field. Decorative only — the
                  input itself is the control the keyboard drives. */}
              <ChevronDown
                aria-hidden="true"
                data-testid="post-price-currency-chevron"
                className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              {/* The chosen code, for a screen and for a test, in one place. */}
              <span
                className="sr-only"
                data-testid="post-price-currency"
                data-code={values.priceCurrency ?? ""}
              >
                {values.priceCurrency ?? t("post.price.currencyNone")}
              </span>
              {open && (
                <ul
                  id="post-price-currency-list"
                  data-testid="post-price-currency-list"
                  role="listbox"
                  data-placement={placement}
                  className={
                    `absolute ${Z_POPOVER} ${placement === "up" ? "bottom-full mb-1" : "top-full mt-1"} max-h-64 w-full overflow-y-auto rounded-md border ` +
                    "border-border bg-background shadow-md"
                  }
                >
                  {matches.map((row, index) => (
                    <li key={row.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={row.code === values.priceCurrency}
                        data-testid="post-price-currency-option"
                        data-code={row.code}
                        className={`flex min-h-11 w-full items-center px-3 text-start text-sm ${
                          index === highlight ? "bg-accent" : ""
                        }`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(row.code)}
                      >
                        {currencyText(row)}
                      </button>
                    </li>
                  ))}
                  {/* THE WAY OUT OF THE SHORT LIST: one row, at the end, revealing
                      every ISO currency — never a hidden capability. */}
                  {moreHidden && (
                    <li>
                      <button
                        type="button"
                        data-testid="post-price-currency-more"
                        className="flex min-h-11 w-full items-center px-3 text-start text-sm text-muted-foreground"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setShowAll(true);
                          setHighlight(0);
                        }}
                      >
                        {t("post.price.moreCurrencies")}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </Field>

          {/* -------------------------- 3 · the amount ------------------------ */}
          <Field
            id="post-price-amount"
            label={
              basisOn && basisLabel !== null
                ? fill(t("post.price.amountPer"), { basis: basisLabel })
                : t("post.price.amountLabel")
            }
            required={true}
            refusal={amountRefusal}
            hint={
              shownAmount === "" ? undefined : (
                <p className="text-xs text-muted-foreground" data-testid="post-price-amount-shown">
                  {fill(t("post.price.amountShown"), {
                    amount: shownAmount,
                    currency: values.priceCurrency ?? "",
                  })}
                </p>
              )
            }
          >
            <div className="flex min-w-0 gap-2">
              <input
                id="post-price-amount"
                data-testid="post-price-amount"
                inputMode="decimal"
                className={`${controlClass(amountRefusal !== null)} min-w-0 flex-1`}
                value={amountText}
                placeholder={t("post.price.amountEnter")}
                onBlur={() => {
                  const found = checkNumber("price_amount", values.priceAmount, {
                    required: true,
                    positive: true,
                  });
                  setLocal((prev) => [
                    ...prev.filter((entry) => entry.field !== "price_amount"),
                    ...(found === null ? [] : [found]),
                  ]);
                }}
                onChange={(event) => {
                  const raw = event.target.value.replace(/[^\d.]/g, "");
                  setAmountText(raw);
                  onChange({ priceAmount: scaleAmount(raw, amountScale) }, false);
                }}
              />
              <select
                aria-label={t("post.price.scaleLabel")}
                data-testid="post-price-scale"
                className="min-h-11 shrink-0 rounded-md border border-input bg-background px-2 text-sm text-foreground"
                value={String(amountScale)}
                onChange={(event) => {
                  const next = Number(event.target.value) as AmountScale;
                  setAmountScale(next);
                  onChange({ priceAmount: scaleAmount(amountText, next) }, false);
                }}
              >
                <option value="0">{t("post.price.scaleNone")}</option>
                <option value="3">{t("post.price.scaleThousand")}</option>
                <option value="6">{t("post.price.scaleMillion")}</option>
              </select>
            </div>
          </Field>
        </>
      )}

      {/* DEC-079 — a commission is a percentage: no currency, no amount. */}
      {commission && (
        <Field
          id="post-price-commission"
          label={t("post.price.commissionLabel")}
          required={true}
          refusal={bpRefusal}
          hint={<p className="text-xs text-muted-foreground">{t("post.price.commissionHelp")}</p>}
        >
          <input
            id="post-price-commission"
            data-testid="post-price-commission"
            type="number"
            inputMode="decimal"
            min={0.01}
            max={100}
            step={0.01}
            className={controlClass(bpRefusal !== null)}
            value={percentText}
            onChange={(event) => {
              const raw = event.target.value;
              setPercentText(raw);
              const parsed = raw.trim() === "" ? null : Number(raw);
              onChange({ priceBp: percentToBp(parsed) }, false);
            }}
          />
        </Field>
      )}

      {/* DEC-081 — "Price is negotiable": a flag on a price with a figure, never a type. */}
      {toggleShown && (
        <label className="flex min-h-11 items-center gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            data-testid="post-price-negotiable"
            className="size-5 accent-primary"
            checked={values.priceNegotiable}
            onChange={(event) => onChange({ priceNegotiable: event.target.checked }, true)}
          />
          <span>{t("post.price.negotiableToggle")}</span>
        </label>
      )}

      {/* --------------- 4 · the period, ONLY when it is choosable ------------ */}
      {!locked && (
        <Field
          id="post-price-period"
          label={t("post.price.periodLabel")}
          required={false}
          refusal={periodRefusal}
        >
          <select
            id="post-price-period"
            data-testid="post-price-period"
            className={controlClass(periodRefusal !== null)}
            value={values.pricePeriod ?? ""}
            onChange={(event) => onChange({ pricePeriod: event.target.value || null }, true)}
          >
            {PRICE_PERIODS.map((period) => (
              <option key={period} value={period}>
                {t(PERIOD_KEYS[period] ?? "post.price.period.once")}
              </option>
            ))}
          </select>
        </Field>
      )}
      {/* DEC-067 — a LOCKED period says nothing here: the buyer reads it on the
          card, and a line the seller cannot act on is only noise. The value
          still travels, so the door never has to guess it. */}
      {basisOn && (
        <span
          className="sr-only"
          data-testid="post-price-period-fixed"
          data-period={derivedPeriod ?? ""}
        >
          {/* INC-297 — a shape-only basis has no noun, so no "per" line. */}
          {basisLabel !== null && fill(t("post.price.basisFixed"), { basis: basisLabel })}
        </span>
      )}
      {trailing}
      {locked && !basisOn && (
        <span
          className="sr-only"
          data-testid="post-price-period-fixed"
          data-period={values.pricePeriod ?? facts?.defaultPricePeriod ?? ""}
        >
          {fill(t("post.price.periodFixed"), {
            period: t(
              PERIOD_KEYS[values.pricePeriod ?? facts?.defaultPricePeriod ?? "once"] ??
                "post.price.period.once",
            ),
          })}
        </span>
      )}
    </div>
  );
}

export default StepPricing;

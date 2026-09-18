import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field } from "./field";
import { readGuessCurrency, useCurrencies, useSellerHome } from "./pricing-data";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { PRICE_MODES, PRICE_PERIODS, type CategoryFacts, type Refusal } from "./types";

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
  negotiable: "post.price.mode.negotiable",
  free: "post.price.mode.free",
  contact: "post.price.mode.contact",
};

const PERIOD_KEYS: Record<string, MessageKey> = {
  once: "post.price.period.once",
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

export interface PricingValues {
  priceMode: string;
  /** The amount as the seller typed it; `null` until they type a number. */
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** An ISO date (`YYYY-MM-DD`) or the empty string; step 8 owns this field now. */
  posterExpiresAt: string;
}

export function StepPricing({
  facts,
  values,
  refusals,
  onChange,
}: {
  /** The category block of the posting read; `null` while it is still loading. */
  facts: CategoryFacts | null;
  values: PricingValues;
  refusals: Refusal[];
  onChange: (patch: Partial<PricingValues>, immediate: boolean) => void;
}) {
  const { t, language } = useI18n();
  const currencies = useCurrencies();
  const { home } = useSellerHome();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const guessRef = useRef<string | null>(null);

  const locked = facts?.pricePeriodLocked ?? false;
  const priceEnabled = facts?.priceEnabled ?? true;
  const amountShown = values.priceMode === "fixed" || values.priceMode === "negotiable";

  /** The period's default comes from the category, written as an ordinary change. */
  useEffect(() => {
    if (facts === null || values.pricePeriod !== null) return;
    onChange({ pricePeriod: facts.defaultPricePeriod }, false);
  }, [facts, values.pricePeriod, onChange]);

  /**
   * THE CURRENCY PRESELECT: the saved value wins; otherwise the seller's home
   * market, then the edge's guess market, then ETB (pricing-data.ts).
   */
  useEffect(() => {
    if (values.priceCurrency !== null) return;
    if (home !== null && home.currencyCode !== null) {
      onChange({ priceCurrency: home.currencyCode }, false);
      return;
    }
    if (home === null) return;
    if (guessRef.current !== null) {
      onChange({ priceCurrency: guessRef.current }, false);
      return;
    }
    let cancelled = false;
    void readGuessCurrency().then((code) => {
      if (cancelled) return;
      guessRef.current = code;
      onChange({ priceCurrency: code }, false);
    });
    return () => {
      cancelled = true;
    };
  }, [home, values.priceCurrency, onChange]);

  const modeRefusal = refusalFor(refusals, "price_mode");
  const amountRefusal = refusalFor(refusals, "price_amount");
  const currencyRefusal = refusalFor(refusals, "price_currency");
  const periodRefusal = refusalFor(refusals, "price_period");

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows =
      needle === ""
        ? currencies.currencies
        : currencies.currencies.filter(
            (row) =>
              row.code.toLowerCase().includes(needle) || row.nameEn.toLowerCase().includes(needle),
          );
    return rows.slice(0, 40);
  }, [currencies.currencies, query]);

  const chosen = currencies.currencies.find((row) => row.code === values.priceCurrency) ?? null;

  const choose = (code: string) => {
    onChange({ priceCurrency: code }, true);
    setQuery("");
    setOpen(false);
    setHighlight(0);
  };

  /** The seller's own locale formatting for the amount caption (never for storage). */
  const shownAmount =
    values.priceAmount === null
      ? ""
      : new Intl.NumberFormat(language === "am" ? "am-ET" : "en-US").format(values.priceAmount);

  return (
    <div className="space-y-5" data-testid="post-pricing">
      <p className="text-sm text-muted-foreground">{t("post.price.why")}</p>

      {/* ---------------------------- 1 · the mode --------------------------- */}
      <fieldset className="space-y-2">
        <legend className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span>{t("post.price.modeLabel")}</span>
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRICE_MODES.map((mode) => (
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
                    ? { priceMode: mode, priceAmount: null }
                    : { priceMode: mode },
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
                id="post-price-currency-search"
                data-testid="post-price-currency-search"
                role="combobox"
                aria-expanded={open}
                aria-controls="post-price-currency-list"
                autoComplete="off"
                className={controlClass(currencyRefusal !== null)}
                value={
                  open || query !== ""
                    ? query
                    : chosen === null
                      ? (values.priceCurrency ?? "")
                      : `${chosen.code} — ${chosen.nameEn}`
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
                  className={
                    "absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border " +
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
                        {`${row.code} — ${row.nameEn}`}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Field>

          {/* -------------------------- 3 · the amount ------------------------ */}
          <Field
            id="post-price-amount"
            label={t("post.price.amountLabel")}
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
            <input
              id="post-price-amount"
              data-testid="post-price-amount"
              inputMode="decimal"
              className={controlClass(amountRefusal !== null)}
              value={values.priceAmount === null ? "" : String(values.priceAmount)}
              placeholder={t("post.price.amountPlaceholder")}
              onChange={(event) => {
                const raw = event.target.value.replace(/[^\d.]/g, "");
                const parsed = raw === "" ? null : Number(raw);
                onChange(
                  { priceAmount: parsed !== null && Number.isFinite(parsed) ? parsed : null },
                  false,
                );
              }}
            />
          </Field>
        </>
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
      {locked && (
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

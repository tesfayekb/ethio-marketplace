import { lengthHint, phonePlanOf } from "./phone-plans";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Z_POPOVER } from "@/components/layout/layers";
import { useI18n } from "@/i18n";

import {
  CALLING_CODES,
  countryDisplayName,
  flagOf,
  joinPhone,
  orderCountries,
  readInternational,
  searchCountries,
  splitPhone,
} from "./calling-codes";
import { fill } from "./refusal-text";

/**
 * Bundle 2 step 13 (Q1) and the walk defect (B2) — ONE bordered group:
 * [flag +code ▾] | [number]. Closed, the picker shows only the flag and the
 * calling code, so the number box keeps the row. Open, it is a searchable list
 * in the pattern of the currency control: flag, name in the UI language, code;
 * open markets first; search by name or code; arrows, Enter and Escape.
 *
 * The picker starts on `defaultIso` while the box is empty and untouched; a
 * number typed or pasted with + or 00 moves it to the longest matching code,
 * and a typed, picked or carried number keeps its own country. What is saved
 * is always "+" code digits.
 */
export function PhoneNumberField({
  id,
  testId,
  value,
  defaultIso,
  openMarkets,
  onValue,
  onLeave,
  onCountry,
}: {
  id: string;
  testId: string;
  value: string;
  defaultIso: string;
  openMarkets: readonly string[];
  onValue: (next: string) => void;
  onLeave: (next: string) => void;
  /** The country the picker shows, reported so a sibling can open on it (B4). */
  onCountry?: (iso: string) => void;
}) {
  const { t, language } = useI18n();
  const listId = useId();
  const [iso, setIso] = useState(() => splitPhone(value, defaultIso).iso);
  const [national, setNational] = useState(() => splitPhone(value, defaultIso).national);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  /** The seller's own pick (or a +code read, or a carried value) outranks a late default. */
  const pickedRef = useRef(value !== "");
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const numberRef = useRef<HTMLInputElement | null>(null);
  const onCountryRef = useRef(onCountry);
  onCountryRef.current = onCountry;

  /** A value set from outside (the last post's contact, Q3) reopens split. */
  useEffect(() => {
    if (value === joinPhone(iso, national)) return;
    if (value === "" && national === "") return;
    const split = splitPhone(value, iso === "" ? defaultIso : iso);
    if (value !== "") pickedRef.current = true;
    setIso(split.iso);
    setNational(split.national);
    // Only an outside change of `value` reopens it; typing keeps them equal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /** B3 — an empty, untouched box follows the default as it becomes known. */
  useEffect(() => {
    if (pickedRef.current || defaultIso === "") return;
    setIso((current) => (current === defaultIso ? current : defaultIso));
  }, [defaultIso]);

  useEffect(() => {
    onCountryRef.current?.(iso);
  }, [iso]);

  const nameOf = (code: string) => countryDisplayName(code, language);
  const order = useMemo(
    () => orderCountries(openMarkets, (code) => countryDisplayName(code, language), language),
    [openMarkets, language],
  );
  const matches = useMemo(
    () => searchCountries(order, query, (code) => countryDisplayName(code, language)),
    [order, query, language],
  );

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const shownIso = iso !== "" && CALLING_CODES[iso] !== undefined ? iso : "";
  const shownCode = shownIso === "" ? "" : (CALLING_CODES[shownIso] ?? "");

  // W4 — an example number and a length hint for the chosen country (blocks nothing).
  const plan = shownIso === "" ? null : phonePlanOf(shownIso);
  const hint = shownIso === "" ? null : lengthHint(shownIso, national);

  const close = (refocus: boolean) => {
    setOpen(false);
    setQuery("");
    setHighlight(0);
    if (refocus) numberRef.current?.focus();
  };

  const choose = (code: string) => {
    pickedRef.current = true;
    setIso(code);
    onValue(joinPhone(code, national));
    close(true);
  };

  return (
    <div className="min-w-[16.5rem] grow basis-0 space-y-1">
    <div
      ref={wrapRef}
      data-testid={`${testId}-row`}
      className={
        "relative flex min-h-11 items-stretch rounded-md border border-input bg-background " +
        "focus-within:ring-2 focus-within:ring-ring"
      }
      onBlur={(event) => {
        if (open && !wrapRef.current?.contains(event.relatedTarget as Node | null)) close(false);
      }}
    >
      <button
        type="button"
        data-testid={`${testId}-country`}
        data-iso={shownIso}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={
          shownIso === ""
            ? t("post.who.phoneCountryLabel")
            : `${t("post.who.phoneCountryLabel")}: ${fill(t("post.who.phoneCountryChosen"), {
                name: nameOf(shownIso),
                code: shownCode,
              })}`
        }
        className="flex w-24 shrink-0 items-center gap-1 rounded-s-md ps-3 pe-2 text-base text-foreground focus-visible:outline-none"
        onClick={() => (open ? close(false) : setOpen(true))}
      >
        <span aria-hidden="true">{shownIso === "" ? "" : flagOf(shownIso)}</span>
        <span dir="ltr" className="tabular-nums">
          {shownCode === "" ? "" : `+${shownCode}`}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="ms-auto h-4 w-4 shrink-0 text-muted-foreground"
        />
      </button>
      <span aria-hidden="true" className="my-2 w-px shrink-0 bg-border" />
      <input
        ref={numberRef}
        id={id}
        data-testid={testId}
        className="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"
        inputMode="tel"
        autoComplete="tel-national"
        dir="ltr"
        value={national}
        placeholder={plan === null ? undefined : plan.example}
        aria-describedby={hint === null ? undefined : `${id}-hint`}
        onChange={(event) => {
          const typed = event.target.value;
          const international = readInternational(typed, iso);
          if (international !== null) {
            pickedRef.current = true;
            setIso(international.iso);
            setNational(international.rest);
            onValue(joinPhone(international.iso, international.rest));
            return;
          }
          if (typed !== "") pickedRef.current = true;
          setNational(typed);
          onValue(joinPhone(iso, typed));
        }}
        onBlur={(event) => {
          if (wrapRef.current?.contains(event.relatedTarget as Node | null)) return;
          onLeave(joinPhone(iso, national));
        }}
      />
      {open && (
        <div
          className={`absolute start-0 top-full ${Z_POPOVER} mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-background shadow-md`}
        >
          <input
            ref={searchRef}
            data-testid={`${testId}-country-search`}
            role="combobox"
            aria-expanded={true}
            aria-controls={listId}
            aria-label={t("post.who.phoneCountrySearch")}
            aria-activedescendant={
              matches[highlight] === undefined ? undefined : `${listId}-${matches[highlight]}`
            }
            autoComplete="off"
            placeholder={t("post.who.phoneCountrySearch")}
            className="min-h-11 w-full rounded-t-md border-b border-border bg-background px-3 text-base text-foreground focus-visible:outline-none"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlight(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
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
                if (row !== undefined) choose(row);
                return;
              }
              if (event.key === "Escape") {
                event.preventDefault();
                close(true);
              }
            }}
          />
          <ul
            id={listId}
            role="listbox"
            data-testid={`${testId}-country-list`}
            aria-label={t("post.who.phoneCountryLabel")}
            className="max-h-64 overflow-y-auto"
          >
            {matches.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                {t("post.who.phoneCountryNone")}
              </li>
            )}
            {matches.map((code, index) => (
              <li key={code} role="presentation">
                <button
                  type="button"
                  id={`${listId}-${code}`}
                  role="option"
                  aria-selected={code === shownIso}
                  data-testid={`${testId}-country-option`}
                  data-iso={code}
                  className={`flex min-h-11 w-full items-center gap-2 px-3 text-start text-sm text-foreground ${
                    index === highlight ? "bg-accent" : ""
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(code)}
                >
                  <span aria-hidden="true">{flagOf(code)}</span>
                  <span className="min-w-0 grow truncate">{nameOf(code)}</span>
                  <span dir="ltr" className="shrink-0 tabular-nums text-muted-foreground">
                    +{CALLING_CODES[code] ?? ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    {hint !== null && plan !== null && (
      <p
        id={`${id}-hint`}
        data-testid={`${testId}-length-hint`}
        data-hint={hint}
        className="text-xs text-muted-foreground"
      >
        {fill(t(hint === "short" ? "post.who.phoneTooShort" : "post.who.phoneTooLong"), {
          min: String(plan.min),
          max: String(plan.max),
        })}
      </p>
    )}
    </div>
  );
}

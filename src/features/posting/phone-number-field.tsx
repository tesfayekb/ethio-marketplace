import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n";

import {
  CALLING_CODES,
  countryDisplayName,
  joinPhone,
  orderCountries,
  readInternational,
  splitPhone,
} from "./calling-codes";
import { fill } from "./refusal-text";

/**
 * Bundle 2 step 13 (Q1) — a phone number with a country picker in front of it.
 * The picker starts on `defaultIso` (the seller's home country, else the
 * posting market's); a number typed or pasted with + or 00 moves it to the
 * longest matching code. What is saved is always "+" code digits.
 */
export function PhoneNumberField({
  id,
  testId,
  value,
  defaultIso,
  openMarkets,
  fieldClass,
  onValue,
  onLeave,
}: {
  id: string;
  testId: string;
  value: string;
  defaultIso: string;
  openMarkets: readonly string[];
  fieldClass: string;
  onValue: (next: string) => void;
  onLeave: (next: string) => void;
}) {
  const { t, language } = useI18n();
  const [iso, setIso] = useState(() => splitPhone(value, defaultIso).iso);
  const [national, setNational] = useState(() => splitPhone(value, defaultIso).national);
  /** The seller's own pick (or a +code read) outranks a late default. */
  const pickedRef = useRef(value !== "");

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

  useEffect(() => {
    if (pickedRef.current || defaultIso === "") return;
    setIso(defaultIso);
  }, [defaultIso]);

  const options = useMemo(
    () =>
      orderCountries(openMarkets, (code) => countryDisplayName(code, language), language).map(
        (code) => ({
          code,
          label: fill(t("post.who.phoneCountryOption"), {
            name: countryDisplayName(code, language),
            code: CALLING_CODES[code] ?? "",
          }),
        }),
      ),
    [openMarkets, language, t],
  );

  const shownIso = iso === "" || CALLING_CODES[iso] === undefined ? "" : iso;

  return (
    <div className="flex grow items-center gap-2" data-testid={`${testId}-row`}>
      <select
        className={`${fieldClass} w-28 shrink-0`}
        data-testid={`${testId}-country`}
        aria-label={t("post.who.phoneCountryLabel")}
        value={shownIso}
        onChange={(event) => {
          pickedRef.current = true;
          setIso(event.target.value);
          onValue(joinPhone(event.target.value, national));
        }}
      >
        {shownIso === "" && <option value="" />}
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        id={id}
        data-testid={testId}
        className={`${fieldClass} grow`}
        inputMode="tel"
        value={national}
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
          setNational(typed);
          onValue(joinPhone(iso, typed));
        }}
        onBlur={() => onLeave(joinPhone(iso, national))}
      />
    </div>
  );
}

/**
 * Bundle 2 step 13 (Q1) — the one static table of international calling codes
 * (ISO 3166-1 alpha-2 → ITU-T E.164 country code, digits only), and the pure
 * helpers that split and join a stored number. Country NAMES are never here:
 * the picker reads them from Intl.DisplayNames in the UI language.
 *
 * The door's rule (^\+[0-9]{7,15}$) is unchanged; join() only shapes what the
 * seller typed into "+" code digits.
 */
const TABLE =
  "AD376 AE971 AF93 AG1 AI1 AL355 AM374 AO244 AR54 AS1 AT43 AU61 AW297 AX358 AZ994 " +
  "BA387 BB1 BD880 BE32 BF226 BG359 BH973 BI257 BJ229 BL590 BM1 BN673 BO591 BQ599 BR55 " +
  "BS1 BT975 BW267 BY375 BZ501 CA1 CC61 CD243 CF236 CG242 CH41 CI225 CK682 CL56 CM237 " +
  "CN86 CO57 CR506 CU53 CV238 CW599 CX61 CY357 CZ420 DE49 DJ253 DK45 DM1 DO1 DZ213 " +
  "EC593 EE372 EG20 EH212 ER291 ES34 ET251 FI358 FJ679 FK500 FM691 FO298 FR33 GA241 " +
  "GB44 GD1 GE995 GF594 GG44 GH233 GI350 GL299 GM220 GN224 GP590 GQ240 GR30 GT502 GU1 " +
  "GW245 GY592 HK852 HN504 HR385 HT509 HU36 ID62 IE353 IL972 IM44 IN91 IQ964 IR98 " +
  "IS354 IT39 JE44 JM1 JO962 JP81 KE254 KG996 KH855 KI686 KM269 KN1 KP850 KR82 KW965 " +
  "KY1 KZ7 LA856 LB961 LC1 LI423 LK94 LR231 LS266 LT370 LU352 LV371 LY218 MA212 MC377 " +
  "MD373 ME382 MF590 MG261 MH692 MK389 ML223 MM95 MN976 MO853 MP1 MQ596 MR222 MS1 " +
  "MT356 MU230 MV960 MW265 MX52 MY60 MZ258 NA264 NC687 NE227 NF672 NG234 NI505 NL31 " +
  "NO47 NP977 NR674 NU683 NZ64 OM968 PA507 PE51 PF689 PG675 PH63 PK92 PL48 PM508 PR1 " +
  "PS970 PT351 PW680 PY595 QA974 RE262 RO40 RS381 RU7 RW250 SA966 SB677 SC248 SD249 " +
  "SE46 SG65 SH290 SI386 SJ47 SK421 SL232 SM378 SN221 SO252 SR597 SS211 ST239 SV503 " +
  "SX1 SY963 SZ268 TC1 TD235 TG228 TH66 TJ992 TK690 TL670 TM993 TN216 TO676 TR90 TT1 " +
  "TV688 TW886 TZ255 UA380 UG256 US1 UY598 UZ998 VA39 VC1 VE58 VG1 VI1 VN84 VU678 " +
  "WF681 WS685 XK383 YE967 YT262 ZA27 ZM260 ZW263";

export const CALLING_CODES: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(TABLE.split(" ").map((cell) => [cell.slice(0, 2), cell.slice(2)])),
);

/** Every code length present, longest first, for the longest-match read. */
const LENGTHS = [...new Set(Object.values(CALLING_CODES).map((code) => code.length))].sort(
  (a, b) => b - a,
);

/**
 * The country a run of international digits starts with: the longest code
 * that matches; among countries sharing it, `current` when it has that code,
 * else the first by ISO code. Null when no code matches.
 */
export function matchCountry(
  digits: string,
  current: string,
): { iso: string; rest: string } | null {
  for (const length of LENGTHS) {
    const code = digits.slice(0, length);
    if (code.length < length) continue;
    const holders = Object.keys(CALLING_CODES)
      .filter((iso) => CALLING_CODES[iso] === code)
      .sort();
    if (holders.length === 0) continue;
    const iso = holders.includes(current) ? current : holders[0]!;
    return { iso, rest: digits.slice(length) };
  }
  return null;
}

/** The national digits a seller typed: separators and leading zeros removed. */
export function nationalDigits(typed: string): string {
  return typed.replace(/[\s.\-()]/g, "").replace(/^0+/, "");
}

/** What is saved: "+" code digits, or "" when nothing was typed. */
export function joinPhone(iso: string, typed: string): string {
  const digits = nationalDigits(typed);
  if (digits === "") return "";
  const code = CALLING_CODES[iso];
  return code === undefined ? digits : `+${code}${digits}`;
}

/**
 * A typed or pasted number that starts with + or 00 carries its own country.
 * Returns the country and the national rest, or null when it does not.
 */
export function readInternational(
  typed: string,
  current: string,
): { iso: string; rest: string } | null {
  const trimmed = typed.trim();
  if (!trimmed.startsWith("+") && !trimmed.startsWith("00")) return null;
  const digits = trimmed.replace(/^(\+|00)/, "").replace(/[^0-9]/g, "");
  return matchCountry(digits, current);
}

/** A saved value reopened the same way: picker country and national digits. */
export function splitPhone(saved: string, fallbackIso: string): { iso: string; national: string } {
  const found = readInternational(saved, fallbackIso);
  if (found !== null) return { iso: found.iso, national: found.rest };
  return { iso: fallbackIso, national: saved };
}

/**
 * The picker's order: the open markets first (in the order given), then every
 * other country A to Z by the name shown in `language`.
 */
export function orderCountries(
  openMarkets: readonly string[],
  nameOf: (iso: string) => string,
  language: string,
): string[] {
  const known = new Set(Object.keys(CALLING_CODES));
  const first = openMarkets.filter((iso) => known.has(iso));
  const seen = new Set(first);
  const rest = [...known]
    .filter((iso) => !seen.has(iso))
    .sort((a, b) => nameOf(a).localeCompare(nameOf(b), language));
  return [...first, ...rest];
}

/** The country name in the UI language; the ISO code when Intl has none. */
export function countryDisplayName(iso: string, language: string): string {
  try {
    const names = new Intl.DisplayNames([language], { type: "region" });
    return names.of(iso) ?? iso;
  } catch {
    return iso;
  }
}

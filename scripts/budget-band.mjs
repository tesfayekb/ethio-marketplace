/**
 * DEC-296 (turn A, the budget instrument) — THE NEAR BAND, in one place.
 *
 * INC-1003, INC-1021 and the 398a5859 red were one class: a ceiling left within
 * build-to-build noise of the size it judges, so the next build tipped it over.
 * A ceiling must stand at least NEAR_KIB above the size it measures; the form
 * that sets one is ceilingFor(size) = floor(size + NEAR_KIB) + 1, from CI's own
 * size. From a local size, add LOCAL_ALLOWANCE_KIB first (CI builds measure
 * about 0.1 KiB more), then apply the same form.
 *
 * Read by scripts/check-bundle-size.mjs for the entry, the stylesheet and every
 * page of scripts/route-budgets.mjs; proven by scripts/conformance/budget-band.test.ts.
 */
export const NEAR_KIB = 0.3;
export const LOCAL_ALLOWANCE_KIB = 0.1;

/** DEC-296's ceiling for a size in KiB measured by CI. */
export function ceilingFor(sizeKib) {
  return Math.floor(sizeKib + NEAR_KIB) + 1;
}

/** DEC-296's ceiling for a size in KiB measured by a local build. */
export function ceilingForLocal(sizeKib) {
  return ceilingFor(sizeKib + LOCAL_ALLOWANCE_KIB);
}

/**
 * The NEAR findings: each { label, kib, ceiling } whose size sits under its
 * ceiling by less than NEAR_KIB (an over-ceiling size is the ceiling check's).
 */
/** INC-1029 — a local measurement is judged with CI's observed noise added. */
export function judgedSize(sizeKib, ci = Boolean(process.env.CI)) {
  return sizeKib + (ci ? 0 : LOCAL_ALLOWANCE_KIB);
}

/** The same size rule for the ceiling and the NEAR band. */
export function exceedsCeiling(sizeKib, ceiling, ci = Boolean(process.env.CI)) {
  return judgedSize(sizeKib, ci) > ceiling;
}

export function nearFindings(rows, ci = Boolean(process.env.CI)) {
  const findings = [];
  for (const { label, kib, ceiling } of rows) {
    const used = judgedSize(kib, ci);
    if (used > ceiling) continue;
    if (ceiling - used < NEAR_KIB - 1e-9)
      findings.push(
        `${label}: ${kib.toFixed(1)} KiB${ci ? "" : ` + ${LOCAL_ALLOWANCE_KIB} KiB local allowance`} sits within the NEAR band (${NEAR_KIB} KiB) of its ceiling of ${ceiling} KiB — DEC-296: set it to ${ci ? "ceilingFor" : "ceilingForLocal"}(size) = ${ci ? ceilingFor(kib) : ceilingForLocal(kib)}`,
      );
  }
  return findings;
}

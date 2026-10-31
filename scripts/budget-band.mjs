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
export function nearFindings(rows) {
  const findings = [];
  for (const { label, kib, ceiling } of rows) {
    if (kib > ceiling) continue;
    if (ceiling - kib < NEAR_KIB - 1e-9)
      findings.push(
        `${label}: ${kib.toFixed(1)} KiB sits within the NEAR band (${NEAR_KIB} KiB) of its ceiling of ${ceiling} KiB — DEC-296: set it to ceilingFor(size) = ${ceilingFor(kib)}`,
      );
  }
  return findings;
}

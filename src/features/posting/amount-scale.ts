/** W6b-2 A2 — how many zeros the typed amount is shifted by. */
export type AmountScale = 0 | 3 | 6;

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

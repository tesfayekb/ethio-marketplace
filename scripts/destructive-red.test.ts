import { describe, expect, it } from "vitest";

import { check, findingsIn, NOT_DESTRUCTIVE, readSources } from "./destructive-red";

/**
 * Bundle 11, Part C (turn C2) — a destructive act is red on every control that
 * performs or confirms it: proven on planted files, then run on the tree.
 */
const F = "src/features/x/x.tsx";
/** One planted file's controls that are not drawn red (the stale-exception rule is DR-3's). */
const one = (text: string) =>
  findingsIn(F, text)
    .filter((f) => !f.red)
    .map((f) => `${f.file}:${f.line} ${f.key} (${f.how}) is not drawn red`);

describe("the destructive-red check — planted files", () => {
  it("DR-1 a control that deletes, removes, rejects or revokes is refused unless red; a state word or a plain label is not judged", () => {
    expect(one(`<Button variant="outline">{t("x.action.delete")}</Button>`)).toEqual([
      `${F}:1 x.action.delete (Button) is not drawn red`,
    ]);
    expect(one(`<Button variant="destructive">{t("x.action.delete")}</Button>`)).toEqual([]);
    expect(one(`<button className={dangerButtonClass}>{t("x.removeConfirmYes")}</button>`)).toEqual(
      [],
    );
    expect(one(`<Button>{t("x.delete.confirm")}</Button>`)).toEqual([
      `${F}:1 x.delete.confirm (Button) is not drawn red`,
    ]);
    // "Removed" names a state; a label outside any control is not a control's.
    expect(one(`<Button>{t("x.status.removed")}</Button>`)).toEqual([]);
    expect(one(`<p>{t("x.action.delete")}</p>`)).toEqual([]);
    expect(one(`<Button>{t("x.action.save")}</Button>`)).toEqual([]);
  });

  it("DR-2 a row action is red with tone danger or in RowActions' remove slot; a dialog's submit with danger; a verb with its danger flag", () => {
    expect(one(`more.push({ key: "remove", label: t("x.action.remove"), onSelect });`)).toEqual([
      `${F}:1 x.action.remove (action) is not drawn red`,
    ]);
    expect(
      one(`more.push({ key: "remove", label: t("x.action.remove"), tone: "danger", onSelect });`),
    ).toEqual([]);
    expect(
      one(`<RowActions remove={ok ? { label: t("x.action.delete"), onSelect } : undefined} />`),
    ).toEqual([]);
    expect(one(`<DialogActions submitLabel={t("x.action.delete")} />`)).toEqual([
      `${F}:1 x.action.delete (submit) is not drawn red`,
    ]);
    expect(one(`<DialogActions submitLabel={t("x.action.delete")} danger />`)).toEqual([]);
    expect(one(`verb("x-delete", t("x.action.delete"), icon, run, false)`)).toEqual([
      `${F}:1 x.action.delete (verb) is not drawn red`,
    ]);
    expect(one(`verb("x-delete", t("x.action.delete"), icon, run, false, true)`)).toEqual([]);
  });

  it("DR-3 a declared exception passes, and one that no longer matches a control is refused", () => {
    const [file, keys] = Object.entries(NOT_DESTRUCTIVE)[0]!;
    const key = Object.keys(keys)[0]!;
    const text = `<button className="x">{t("${key}")}</button>`;
    expect(findingsIn(file, text)).toHaveLength(1);
    const refusals = check([{ file, text }]).refusals;
    expect(refusals.some((r) => r.includes(key))).toBe(false);
    expect(check([{ file, text: "" }]).refusals).toContain(
      `${file}: the exception for ${key} matches no control`,
    );
  });
});

describe("the destructive-red check — the real tree", () => {
  it("DR-4 every destructive control in the app is red", () => {
    const result = check(readSources());
    // The scan finds the controls (a check that reads nothing proves nothing).
    expect(result.findings.length).toBeGreaterThanOrEqual(25);
    expect(result.refusals).toEqual([]);
  });
});

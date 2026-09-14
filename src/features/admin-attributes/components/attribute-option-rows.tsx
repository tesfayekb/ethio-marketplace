import { useEffect, useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import type { AttributeOption } from "../attributes-service";

import type { AllowedTarget } from "./attribute-allowed-values";
import { OptionRow, type BoundsTarget } from "./attribute-option-row";

export { ALIAS_MAX, ALIAS_LENGTH_MAX, type BoundsTarget } from "./attribute-option-row";

/**
 * DEC-050 L3b / C3-UX-7 — THE OPTION SET FOR ONE DEFINITION.
 *
 * `storedValues` are the values the database already holds: those rows are
 * deactivated, never deleted (deletion stays with the import's delete path).
 *
 * C3-UX-7 — LONG LISTS ARE WALKED, NOT SCROLLED. A search box narrows the
 * rows by value or either label, and a dependent definition also filters by
 * parent value. Both are VIEW-ONLY: `rows` is never rewritten by a filter, so
 * a save after filtering still round-trips every stored record (AT-49's law,
 * asserted again by AT-54).
 */
export function AttributeOptionRows({
  rows,
  storedValues,
  targets,
  allowedTargets,
  parentValues,
  dependent,
  blankCount,
  onChange,
}: {
  rows: AttributeOption[];
  storedValues: string[];
  targets: BoundsTarget[];
  allowedTargets: AllowedTarget[];
  parentValues: string[];
  dependent: boolean;
  /**
   * INC-195 — how many rows the dialog refused for a blank value on the last
   * Save attempt (0 = nothing refused). The refusal is named here, under the
   * rows it is about, and the door was never called.
   */
  blankCount: number;
  onChange: (next: AttributeOption[]) => void;
}) {
  const { t } = useI18n();
  const [needleInput, setNeedleInput] = useState("");
  const [parentFilter, setParentFilter] = useState("");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const needle = needleInput.trim().toLowerCase();

  /**
   * INC-195 — A NEW ROW IS NEVER BORN OUT OF VIEW. A blank row matches no
   * non-empty needle, so `add` cleared the walk's filters; this effect then
   * brings the row on screen and puts the cursor in its value cell.
   */
  useEffect(() => {
    if (focusIndex === null) return;
    const input = document.getElementById(`option-value-${focusIndex}`);
    setFocusIndex(null);
    if (input === null) return;
    input.scrollIntoView({ block: "center" });
    (input as HTMLInputElement).focus();
  }, [focusIndex]);

  /** View-only: a row is HIDDEN, never dropped from the edited set. */
  const matches = (option: AttributeOption): boolean =>
    needle === "" ||
    option.value.toLowerCase().includes(needle) ||
    option.labelEn.toLowerCase().includes(needle) ||
    option.labelAm.toLowerCase().includes(needle);

  const groups: { parent: string; label: string }[] = dependent
    ? parentValues
        .filter((value) => parentFilter === "" || value === parentFilter)
        .map((value) => ({
          parent: value,
          label: t("admin.attributes.dependsOn.optionsFor").replace("{parent}", value),
        }))
    : [{ parent: "", label: t("admin.attributes.options.rowsLabel") }];

  /** "n of N": the rows the operator can see out of the rows being edited. */
  const shown = rows.filter(
    (row) => matches(row) && groups.some((group) => group.parent === row.parent),
  ).length;

  const replace = (index: number, next: AttributeOption) =>
    onChange(rows.map((row, position) => (position === index ? next : row)));
  const remove = (index: number) => onChange(rows.filter((_, position) => position !== index));
  /**
   * INC-195 — the walk's filters are VIEW-ONLY, so they must not hide a write:
   * the needle is cleared and, when a parent filter is narrowing the view, it
   * is moved to the new row's own parent before the row is focused.
   */
  const add = (parent: string) => {
    setNeedleInput("");
    if (parentFilter !== "" && parentFilter !== parent) setParentFilter(parent);
    setFocusIndex(rows.length);
    onChange([...rows, { value: "", labelEn: "", labelAm: "", parent, active: true }]);
  };

  return (
    <div className="min-w-0 space-y-4" data-testid="attribute-option-rows">
      <p className="text-xs text-muted-foreground">{t("admin.attributes.options.rowsHelp")}</p>

      {/* C3-UX-7 — the operator's walk through a long list. */}
      <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2">
        <FormField label={t("admin.attributes.options.search")} htmlFor="option-search">
          <Input
            id="option-search"
            data-testid="option-search"
            value={needleInput}
            placeholder={t("admin.attributes.options.searchPlaceholder")}
            onChange={(event) => setNeedleInput(event.target.value)}
          />
        </FormField>
        {dependent ? (
          <FormField
            label={t("admin.attributes.options.parentFilter")}
            htmlFor="option-parent-filter"
          >
            <select
              id="option-parent-filter"
              data-testid="option-parent-filter"
              className={SELECT_CLASS}
              value={parentFilter}
              onChange={(event) => setParentFilter(event.target.value)}
            >
              <option value="">{t("admin.attributes.options.parentFilterAll")}</option>
              {parentValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </FormField>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground" data-testid="option-count">
        {t("admin.attributes.options.countLine")
          .replace("{shown}", String(shown))
          .replace("{total}", String(rows.length))}
      </p>

      {groups.map((group) => {
        const indexed = rows
          .map((row, index) => ({ row, index }))
          .filter((entry) => entry.row.parent === group.parent && matches(entry.row));
        return (
          <div
            key={group.parent === "" ? "flat" : group.parent}
            className="min-w-0 space-y-2"
            data-testid={`option-group-${group.parent === "" ? "flat" : group.parent}`}
          >
            <p className="text-sm font-semibold text-foreground">{group.label}</p>
            {indexed.length === 0 ? (
              <p className="text-sm text-muted-foreground" data-testid="option-group-empty">
                {t("admin.attributes.options.empty")}
              </p>
            ) : (
              <ul className="min-w-0 space-y-2">
                {indexed.map((entry) => (
                  <OptionRow
                    key={`${group.parent}-${entry.index}`}
                    option={entry.row}
                    index={entry.index}
                    locked={storedValues.includes(entry.row.value)}
                    targets={targets}
                    allowedTargets={allowedTargets}
                    onChange={(next) => replace(entry.index, next)}
                    onRemove={() => remove(entry.index)}
                  />
                ))}
              </ul>
            )}
            <Button
              type="button"
              variant="outline"
              size="touch"
              data-testid={`option-add-${group.parent === "" ? "flat" : group.parent}`}
              onClick={() => add(group.parent)}
            >
              {t("admin.attributes.options.addRow")}
            </Button>
          </div>
        );
      })}

      {/* INC-195 — the refusal is named where the rows are, and the door was
          never called (F4: no phantom success, no silent refusal). */}
      {blankCount > 0 ? (
        <p role="alert" className="text-sm text-destructive" data-testid="option-blank-message">
          {t("admin.attributes.options.blankRows").replace("{count}", String(blankCount))}
        </p>
      ) : null}
    </div>
  );
}

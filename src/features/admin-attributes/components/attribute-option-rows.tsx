import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import type { AttributeOption } from "../attributes-service";

/**
 * DEC-050 L3b — THE OPTION ROW EDITOR (fixes INC-188).
 *
 * The old values textarea could only carry a value, so every console save of a
 * select definition rewrote its options WITHOUT their labels and, since L1,
 * without `active`, `bounds` and `aliases`. Here every field of every option is
 * edited in place, so a save with no edits sends the stored records back.
 *
 * The door stays the authority (F3): the picker only OFFERS number definitions,
 * it never judges co-linkage — `admin_upsert_attribute` refuses and the dialog
 * names the refusal.
 */

export const ALIAS_MAX = 5;
export const ALIAS_LENGTH_MAX = 32;

/** A number definition the bounds picker may target. */
export interface BoundsTarget {
  attrKey: string;
  label: string;
}

function boundsEntries(option: AttributeOption): [string, { min?: string; max?: string }][] {
  return Object.entries(option.bounds ?? {});
}

function OptionRow({
  option,
  index,
  locked,
  targets,
  onChange,
  onRemove,
}: {
  option: AttributeOption;
  index: number;
  /** A STORED value is the option's identity; it is never retyped or removed. */
  locked: boolean;
  targets: BoundsTarget[];
  onChange: (next: AttributeOption) => void;
  onRemove: () => void;
}) {
  const { t } = useI18n();
  const patch = (part: Partial<AttributeOption>) => onChange({ ...option, ...part });
  const inactive = option.active === false;
  const aliases = option.aliases ?? [];
  const entries = boundsEntries(option);
  const unusedTargets = targets.filter((target) => option.bounds?.[target.attrKey] === undefined);

  const setAlias = (position: number, raw: string) => {
    const next = [...aliases];
    next[position] = raw;
    patch({ aliases: next.filter((alias) => alias.trim() !== "").map((alias) => alias.trim()) });
  };

  const setBound = (target: string, part: { min?: string; max?: string }) => {
    const current = option.bounds ?? {};
    const merged = { ...(current[target] ?? {}), ...part };
    const cleaned: { min?: string; max?: string } = {};
    if ((merged.min ?? "").trim() !== "") cleaned.min = (merged.min ?? "").trim();
    if ((merged.max ?? "").trim() !== "") cleaned.max = (merged.max ?? "").trim();
    patch({ bounds: { ...current, [target]: cleaned } });
  };

  const dropBound = (target: string) => {
    const next = { ...(option.bounds ?? {}) };
    delete next[target];
    patch({ bounds: next });
  };

  return (
    <li
      data-testid={`option-row-${option.value === "" ? `new-${index}` : option.value}`}
      data-inactive={inactive ? "true" : "false"}
      className={`min-w-0 space-y-2 rounded-md border border-border p-3 ${
        inactive ? "text-muted-foreground" : ""
      }`}
    >
      {/* C3-UX-6 — the row grid contains its cells: every cell is min-w-0
          overflow-hidden so a long locked value can never run under the label
          inputs; value is fractionally wider than each label. */}
      <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 overflow-hidden">
          <FormField label={t("admin.attributes.options.value")} htmlFor={`option-value-${index}`}>
            {locked ? (
              <p
                data-testid="option-value"
                title={option.value}
                className="min-h-11 w-full min-w-0 break-all py-2 text-sm font-medium"
              >
                {option.value}
              </p>
            ) : (
              <div className="w-full min-w-0">
                <Input
                  id={`option-value-${index}`}
                  data-testid="option-value"
                  value={option.value}
                  placeholder={t("admin.attributes.options.valuePlaceholder")}
                  onChange={(event) => patch({ value: event.target.value })}
                />
              </div>
            )}
          </FormField>
        </div>
        <div className="min-w-0 overflow-hidden">
          <FormField label={t("admin.attributes.options.labelEn")} htmlFor={`option-en-${index}`}>
            <div className="w-full min-w-0">
              <Input
                id={`option-en-${index}`}
                data-testid="option-label-en"
                value={option.labelEn}
                onChange={(event) => patch({ labelEn: event.target.value })}
              />
            </div>
          </FormField>
        </div>
        <div className="min-w-0 overflow-hidden">
          <FormField label={t("admin.attributes.options.labelAm")} htmlFor={`option-am-${index}`}>
            <div className="w-full min-w-0">
              <Input
                id={`option-am-${index}`}
                data-testid="option-label-am"
                value={option.labelAm}
                onChange={(event) => patch({ labelAm: event.target.value })}
              />
            </div>
          </FormField>
        </div>
      </div>

      <div className="flex min-h-11 flex-wrap items-center gap-2">
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <Checkbox
            data-testid="option-active"
            checked={!inactive}
            onCheckedChange={(checked) => patch({ active: checked === true ? true : false })}
          />
          {t("admin.attributes.options.active")}
        </label>
        {inactive ? (
          <span data-testid="option-inactive-tag" className="text-xs text-muted-foreground">
            {t("admin.attributes.options.inactiveTag")}
          </span>
        ) : null}
        {locked ? null : (
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="option-remove"
            onClick={onRemove}
          >
            {t("admin.attributes.options.removeRow")}
          </Button>
        )}
      </div>

      <div data-testid="option-aliases" className="min-w-0 space-y-2">
        <p className="text-xs text-muted-foreground">{t("admin.attributes.options.aliasesHelp")}</p>
        <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-3">
          {[...aliases, ""].slice(0, ALIAS_MAX).map((alias, position) => (
            <Input
              key={`alias-${position}`}
              data-testid={`option-alias-${position}`}
              maxLength={ALIAS_LENGTH_MAX}
              value={alias}
              placeholder={t("admin.attributes.options.aliasPlaceholder")}
              onChange={(event) => setAlias(position, event.target.value)}
            />
          ))}
        </div>
      </div>

      <div data-testid="option-bounds" className="min-w-0 space-y-2">
        <p className="text-xs text-muted-foreground">{t("admin.attributes.options.boundsHelp")}</p>
        {entries.map(([target, bound]) => (
          <div key={target} className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-4">
            <p className="min-h-11 py-2 text-sm" data-testid={`option-bounds-target-${target}`}>
              {target}
            </p>
            <Input
              data-testid={`option-bounds-min-${target}`}
              value={bound.min ?? ""}
              placeholder={t("admin.attributes.options.boundsMin")}
              onChange={(event) => setBound(target, { min: event.target.value })}
            />
            <Input
              data-testid={`option-bounds-max-${target}`}
              value={bound.max ?? ""}
              placeholder={t("admin.attributes.options.boundsMax")}
              onChange={(event) => setBound(target, { max: event.target.value })}
            />
            <Button
              type="button"
              variant="outline"
              size="touch"
              data-testid={`option-bounds-remove-${target}`}
              onClick={() => dropBound(target)}
            >
              {t("admin.attributes.options.boundsRemove")}
            </Button>
          </div>
        ))}
        {unusedTargets.length === 0 ? null : (
          <select
            data-testid="option-bounds-add"
            className={SELECT_CLASS}
            value=""
            onChange={(event) => {
              if (event.target.value !== "") setBound(event.target.value, {});
            }}
          >
            <option value="">{t("admin.attributes.options.boundsAdd")}</option>
            {unusedTargets.map((target) => (
              <option key={target.attrKey} value={target.attrKey}>
                {target.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </li>
  );
}

/**
 * The whole option set for one definition. `storedValues` are the values the
 * database already holds: those rows are deactivated, never deleted (deletion
 * stays with the import's delete path).
 */
export function AttributeOptionRows({
  rows,
  storedValues,
  targets,
  parentValues,
  dependent,
  onChange,
}: {
  rows: AttributeOption[];
  storedValues: string[];
  targets: BoundsTarget[];
  parentValues: string[];
  dependent: boolean;
  onChange: (next: AttributeOption[]) => void;
}) {
  const { t } = useI18n();
  const groups: { parent: string; label: string }[] = dependent
    ? parentValues.map((value) => ({
        parent: value,
        label: t("admin.attributes.dependsOn.optionsFor").replace("{parent}", value),
      }))
    : [{ parent: "", label: t("admin.attributes.options.rowsLabel") }];

  const replace = (index: number, next: AttributeOption) =>
    onChange(rows.map((row, position) => (position === index ? next : row)));
  const remove = (index: number) => onChange(rows.filter((_, position) => position !== index));
  const add = (parent: string) =>
    onChange([...rows, { value: "", labelEn: "", labelAm: "", parent, active: true }]);

  return (
    <div className="min-w-0 space-y-4" data-testid="attribute-option-rows">
      <p className="text-xs text-muted-foreground">{t("admin.attributes.options.rowsHelp")}</p>
      {groups.map((group) => {
        const indexed = rows
          .map((row, index) => ({ row, index }))
          .filter((entry) => entry.row.parent === group.parent);
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
    </div>
  );
}

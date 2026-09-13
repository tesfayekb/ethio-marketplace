import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import type { AttributeOption } from "../attributes-service";

import { AttributeAllowedValues, type AllowedTarget } from "./attribute-allowed-values";

/**
 * DEC-050 L3b — ONE OPTION ROW (fixes INC-188), extracted from the list by
 * C3-UX-7 so neither file carries the search box and the row editor at once
 * (the ~300-line law).
 *
 * Every field of every option is edited in place, so a save with no edits
 * sends the stored records back. The door stays the authority (F3): the
 * pickers only OFFER candidates — `admin_upsert_attribute` refuses and the
 * dialog names the refusal.
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

export function OptionRow({
  option,
  index,
  locked,
  targets,
  allowedTargets,
  onChange,
  onRemove,
}: {
  option: AttributeOption;
  index: number;
  /** A STORED value is the option's identity; it is never retyped or removed. */
  locked: boolean;
  targets: BoundsTarget[];
  /** DEC-057 — the select definitions this option's `allowed` may target. */
  allowedTargets: AllowedTarget[];
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
        {/*
          C3-UX-9 — the picker offers only CO-LINKED number definitions: a
          definition sharing no category with this one could never carry the
          bound, so the caption says so instead of listing the library.
        */}
        {targets.length === 0 ? (
          <p className="text-sm text-muted-foreground" data-testid="option-bounds-none">
            {t("admin.attributes.options.boundsNoTargets")}
          </p>
        ) : unusedTargets.length === 0 ? null : (
          <select
            data-testid="option-bounds-add"
            className={SELECT_CLASS}
            value=""
            onChange={(event) => {
              if (event.target.value !== "") setBound(event.target.value, {});
            }}
          >
            <option value="">{t("admin.attributes.options.boundsAddExample")}</option>
            {unusedTargets.map((target) => (
              <option key={target.attrKey} value={target.attrKey}>
                {target.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* DEC-057 L3 — the allowed-values block, beside the bounds block. */}
      <AttributeAllowedValues
        option={option}
        targets={allowedTargets}
        onChange={(part) => patch(part)}
      />
    </li>
  );
}

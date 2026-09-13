import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import type { AttributeOption } from "../attributes-service";

/**
 * DEC-057 L3 — THE ALLOWED-VALUES PICKER.
 *
 * An option may constrain a sibling SELECT attribute's values (a phone model's
 * storage tiers). The picker only OFFERS targets it can rule out cheaply — a
 * select definition that is neither this one, its `depends_on` parent nor a
 * definition that depends on it; co-linkage, the value list and the ceilings
 * stay the door's (F3), which refuses by name and the dialog renders it.
 */

export const ALLOWED_TARGET_MAX = 5;
export const ALLOWED_VALUE_MAX = 50;

/** A select definition an option's `allowed` map may target. */
export interface AllowedTarget {
  attrKey: string;
  label: string;
  /** The target's own option records, so its values can be ticked by label. */
  options: AttributeOption[];
}

function allowedEntries(option: AttributeOption): [string, string[]][] {
  return Object.entries(option.allowed ?? {});
}

export function AttributeAllowedValues({
  option,
  targets,
  onChange,
}: {
  option: AttributeOption;
  targets: AllowedTarget[];
  onChange: (part: Pick<AttributeOption, "allowed">) => void;
}) {
  const { t } = useI18n();
  const entries = allowedEntries(option);
  const unused = targets.filter((target) => option.allowed?.[target.attrKey] === undefined);
  const atCeiling = entries.length >= ALLOWED_TARGET_MAX;

  /**
   * A target picked but not yet ticked STANDS while the row is edited; the
   * writer prunes empty lists, so an empty map reaches the door as silence.
   */
  const commit = (next: Record<string, string[]>) =>
    onChange({ allowed: Object.keys(next).length === 0 ? undefined : next });

  const addTarget = (target: string) => commit({ ...(option.allowed ?? {}), [target]: [] });

  const dropTarget = (target: string) => {
    const next = { ...(option.allowed ?? {}) };
    delete next[target];
    commit(next);
  };

  const toggleValue = (target: string, value: string, ticked: boolean) => {
    const current = option.allowed?.[target] ?? [];
    const next = ticked
      ? current.includes(value)
        ? current
        : [...current, value].slice(0, ALLOWED_VALUE_MAX)
      : current.filter((entry) => entry !== value);
    commit({ ...(option.allowed ?? {}), [target]: next });
  };

  return (
    <div data-testid="option-allowed" className="min-w-0 space-y-2">
      <p className="text-xs text-muted-foreground">{t("admin.attributes.options.allowedHelp")}</p>
      {entries.map(([target, values]) => {
        const definition = targets.find((entry) => entry.attrKey === target) ?? null;
        const offered = (definition?.options ?? []).slice(0, ALLOWED_VALUE_MAX);
        return (
          <div key={target} className="min-w-0 space-y-2 rounded-md border border-border p-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <p
                data-testid={`option-allowed-target-${target}`}
                className="min-h-11 min-w-0 break-all py-2 text-sm font-medium"
              >
                {definition?.label ?? target}
              </p>
              <Button
                type="button"
                variant="outline"
                size="touch"
                data-testid={`option-allowed-remove-${target}`}
                onClick={() => dropTarget(target)}
              >
                {t("admin.attributes.options.allowedRemove")}
              </Button>
            </div>
            {offered.length === 0 ? (
              <p
                data-testid={`option-allowed-empty-${target}`}
                className="text-sm text-muted-foreground"
              >
                {t("admin.attributes.options.allowedNoValues")}
              </p>
            ) : (
              <ul className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2">
                {offered.map((entry) => (
                  <li key={entry.value} className="min-w-0">
                    <label
                      className={`flex min-h-11 min-w-0 items-center gap-2 text-sm ${
                        entry.active === false ? "text-muted-foreground" : ""
                      }`}
                    >
                      <Checkbox
                        data-testid={`option-allowed-value-${target}-${entry.value}`}
                        checked={values.includes(entry.value)}
                        onCheckedChange={(checked) =>
                          toggleValue(target, entry.value, checked === true)
                        }
                      />
                      <span className="min-w-0 break-all">
                        {entry.labelEn.trim() === "" ? entry.value : entry.labelEn}
                      </span>
                      {entry.labelAm.trim() === "" ? null : (
                        <span className="min-w-0 break-all text-xs text-muted-foreground">
                          {entry.labelAm}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
      {unused.length === 0 || atCeiling ? null : (
        <select
          data-testid="option-allowed-add"
          className={SELECT_CLASS}
          value=""
          onChange={(event) => {
            if (event.target.value !== "") addTarget(event.target.value);
          }}
        >
          <option value="">{t("admin.attributes.options.allowedAddExample")}</option>
          {unused.map((target) => (
            <option key={target.attrKey} value={target.attrKey}>
              {target.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

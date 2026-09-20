import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import {
  optionLabel,
  type AttributeLink,
  type LinkCellName,
  type VisibleWhen,
} from "../attributes-service";

function defaultText(value: unknown): string {
  return value === null || value === undefined
    ? ""
    : Array.isArray(value)
      ? value.join("|")
      : String(value);
}

function typedDefault(type: string, raw: string): unknown {
  if (type === "number") return Number(raw);
  if (type === "boolean") return raw === "true";
  if (type === "multi_select") return raw.split("|").filter(Boolean);
  return raw;
}

export function AttributeLinkCells({
  row,
  siblings,
  onSave,
}: {
  row: AttributeLink;
  siblings: AttributeLink[];
  onSave: (input: {
    allowedOptions?: string[];
    defaultValue?: unknown;
    visibleWhen?: VisibleWhen;
    clearCells?: LinkCellName[];
  }) => void;
}) {
  const { t } = useI18n();
  const [allowed, setAllowed] = useState<string[]>(row.allowedOptions ?? []);
  const [defaultValue, setDefaultValue] = useState(defaultText(row.defaultValue));
  const [conditionKey, setConditionKey] = useState(row.visibleWhen?.key ?? "");
  const [conditionValues, setConditionValues] = useState<string[]>(row.visibleWhen?.in ?? []);

  useEffect(() => {
    setAllowed(row.allowedOptions ?? []);
    setDefaultValue(defaultText(row.defaultValue));
    setConditionKey(row.visibleWhen?.key ?? "");
    setConditionValues(row.visibleWhen?.in ?? []);
  }, [row]);

  const conditionOptions = useMemo(
    () => siblings.find((sibling) => sibling.attrKey === conditionKey)?.options ?? [],
    [conditionKey, siblings],
  );
  const isSelect = row.attrType === "single_select" || row.attrType === "multi_select";
  const effectiveOptions =
    allowed.length === 0
      ? row.options
      : row.options.filter((option) => allowed.includes(option.value));

  return (
    <div className="grid gap-3 border-t border-border pt-3 sm:grid-cols-3">
      <fieldset className="space-y-1" disabled={!isSelect}>
        <legend className="text-xs font-medium text-foreground">
          {t("admin.attributes.link.allowedOptions")}
        </legend>
        {row.options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-2 text-xs">
            <Checkbox
              data-testid={`category-attribute-allowed-${row.attrKey}-${option.value}`}
              checked={allowed.includes(option.value)}
              onCheckedChange={(checked) =>
                setAllowed((previous) =>
                  checked === true
                    ? [...previous, option.value]
                    : previous.filter((value) => value !== option.value),
                )
              }
            />
            {optionLabel(option)}
          </label>
        ))}
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`category-attribute-save-allowed-${row.attrKey}`}
          onClick={() =>
            onSave(
              allowed.length === 0
                ? { clearCells: ["allowed_options"] }
                : { allowedOptions: allowed },
            )
          }
        >
          {t("common.save")}
        </Button>
      </fieldset>

      <div className="space-y-1">
        <label className="text-xs font-medium text-foreground" htmlFor={`default-${row.linkId}`}>
          {t("admin.attributes.link.defaultValue")}
        </label>
        {row.attrType === "single_select" || row.attrType === "boolean" ? (
          <select
            id={`default-${row.linkId}`}
            data-testid={`category-attribute-default-${row.attrKey}`}
            className={SELECT_CLASS}
            value={defaultValue}
            onChange={(event) => setDefaultValue(event.target.value)}
          >
            <option value="">{t("admin.attributes.link.none")}</option>
            {row.attrType === "boolean" ? (
              <>
                <option value="true">{t("post.review.yes")}</option>
                <option value="false">{t("post.review.no")}</option>
              </>
            ) : (
              effectiveOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {optionLabel(option)}
                </option>
              ))
            )}
          </select>
        ) : (
          <Input
            id={`default-${row.linkId}`}
            data-testid={`category-attribute-default-${row.attrKey}`}
            type={row.attrType === "number" ? "number" : row.attrType === "date" ? "date" : "text"}
            value={defaultValue}
            onChange={(event) => setDefaultValue(event.target.value)}
          />
        )}
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`category-attribute-save-default-${row.attrKey}`}
          onClick={() =>
            onSave(
              defaultValue === ""
                ? { clearCells: ["default_value"] }
                : { defaultValue: typedDefault(row.attrType, defaultValue) },
            )
          }
        >
          {t("common.save")}
        </Button>
      </div>

      <fieldset className="space-y-1">
        <legend className="text-xs font-medium text-foreground">
          {t("admin.attributes.link.visibleWhen")}
        </legend>
        <select
          data-testid={`category-attribute-condition-key-${row.attrKey}`}
          className={SELECT_CLASS}
          value={conditionKey}
          onChange={(event) => {
            setConditionKey(event.target.value);
            setConditionValues([]);
          }}
        >
          <option value="">{t("admin.attributes.link.alwaysVisible")}</option>
          {siblings
            .filter((sibling) => sibling.attrKey !== row.attrKey && sibling.options.length > 0)
            .map((sibling) => (
              <option key={sibling.attrKey} value={sibling.attrKey}>
                {sibling.nameEn}
              </option>
            ))}
        </select>
        {conditionOptions.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-2 text-xs">
            <Checkbox
              data-testid={`category-attribute-condition-${row.attrKey}-${option.value}`}
              checked={conditionValues.includes(option.value)}
              onCheckedChange={(checked) =>
                setConditionValues((previous) =>
                  checked === true
                    ? [...previous, option.value]
                    : previous.filter((value) => value !== option.value),
                )
              }
            />
            {optionLabel(option)}
          </label>
        ))}
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`category-attribute-save-condition-${row.attrKey}`}
          onClick={() =>
            onSave(
              conditionKey === "" || conditionValues.length === 0
                ? { clearCells: ["visible_when"] }
                : { visibleWhen: { key: conditionKey, in: conditionValues } },
            )
          }
        >
          {t("common.save")}
        </Button>
      </fieldset>
    </div>
  );
}

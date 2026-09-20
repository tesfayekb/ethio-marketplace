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

/**
 * U6-C1-R3b-3a STEP 3 — THE THREE CELLS SAY WHERE THEY STAND.
 *
 * A Save that is always enabled teaches nobody whether anything is pending, and a
 * write that vanishes teaches nobody whether it landed. So each cell carries its
 * own state: Save is SHUT while the cell matches what is stored, OPEN the moment
 * the operator changes it, and shut again with a translated "Saved" caption once
 * the door answers; a refusal is an error caption beside the same button, never a
 * silent nothing (F4).
 */
type CellState = "idle" | "saving" | "saved" | "error";

const CELLS = ["allowed", "default", "condition"] as const;
type Cell = (typeof CELLS)[number];

const IDLE_STATES: Record<Cell, CellState> = {
  allowed: "idle",
  default: "idle",
  condition: "idle",
};

function stamp(value: unknown): string {
  return JSON.stringify(value ?? null);
}

export function AttributeLinkCells({
  row,
  siblings,
  onSave,
}: {
  row: AttributeLink;
  siblings: AttributeLink[];
  /** Resolves TRUE when the door accepted the write, FALSE when it refused. */
  onSave: (input: {
    allowedOptions?: string[];
    defaultValue?: unknown;
    visibleWhen?: VisibleWhen;
    clearCells?: LinkCellName[];
  }) => Promise<boolean>;
}) {
  const { t } = useI18n();
  const [allowed, setAllowed] = useState<string[]>(row.allowedOptions ?? []);
  const [defaultValue, setDefaultValue] = useState(defaultText(row.defaultValue));
  const [conditionKey, setConditionKey] = useState(row.visibleWhen?.key ?? "");
  const [conditionValues, setConditionValues] = useState<string[]>(row.visibleWhen?.in ?? []);
  const [states, setStates] = useState<Record<Cell, CellState>>(IDLE_STATES);
  /**
   * WHAT IS STORED, as this editor last saw it: the row when it arrived, and the
   * accepted value after each write. Dirtiness is measured against THIS, so a
   * successful save leaves the cell clean even before the roster refetches.
   */
  const [baseline, setBaseline] = useState({
    allowed: stamp([...(row.allowedOptions ?? [])].sort()),
    default: defaultText(row.defaultValue),
    condition: stamp(row.visibleWhen),
  });

  useEffect(() => {
    setAllowed(row.allowedOptions ?? []);
    setDefaultValue(defaultText(row.defaultValue));
    setConditionKey(row.visibleWhen?.key ?? "");
    setConditionValues(row.visibleWhen?.in ?? []);
    setBaseline({
      allowed: stamp([...(row.allowedOptions ?? [])].sort()),
      default: defaultText(row.defaultValue),
      condition: stamp(row.visibleWhen),
    });
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

  const conditionNow: VisibleWhen | null =
    conditionKey === "" || conditionValues.length === 0
      ? null
      : { key: conditionKey, in: conditionValues };
  const dirty: Record<Cell, boolean> = {
    allowed: stamp([...allowed].sort()) !== baseline.allowed,
    default: defaultValue !== baseline.default,
    condition: stamp(conditionNow) !== baseline.condition,
  };

  const save = (
    cell: Cell,
    input: Parameters<typeof onSave>[0],
    accepted: Partial<typeof baseline>,
  ) => {
    setStates((prev) => ({ ...prev, [cell]: "saving" }));
    void onSave(input).then((ok) => {
      setStates((prev) => ({ ...prev, [cell]: ok ? "saved" : "error" }));
      if (ok) setBaseline((prev) => ({ ...prev, ...accepted }));
    });
  };

  /** One caption for all three cells, so no cell can report differently. */
  const caption = (cell: Cell) =>
    states[cell] === "saved" && !dirty[cell] ? (
      <span
        role="status"
        aria-live="polite"
        data-testid={`category-attribute-cell-saved-${cell}-${row.attrKey}`}
        className="text-xs text-muted-foreground"
      >
        {t("admin.attributes.links.saved")}
      </span>
    ) : states[cell] === "error" ? (
      <span
        role="alert"
        data-testid={`category-attribute-cell-error-${cell}-${row.attrKey}`}
        className="text-xs text-destructive"
      >
        {t("admin.attributes.link.saveFailed")}
      </span>
    ) : null;

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
          disabled={!dirty.allowed || states.allowed === "saving"}
          onClick={() =>
            save(
              "allowed",
              allowed.length === 0
                ? { clearCells: ["allowed_options"] }
                : { allowedOptions: allowed },
              { allowed: stamp([...allowed].sort()) },
            )
          }
        >
          {t("common.save")}
        </Button>
        {caption("allowed")}
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
          disabled={!dirty.default || states.default === "saving"}
          onClick={() =>
            save(
              "default",
              defaultValue === ""
                ? { clearCells: ["default_value"] }
                : { defaultValue: typedDefault(row.attrType, defaultValue) },
              { default: defaultValue },
            )
          }
        >
          {t("common.save")}
        </Button>
        {caption("default")}
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
          disabled={!dirty.condition || states.condition === "saving"}
          onClick={() =>
            save(
              "condition",
              conditionNow === null
                ? { clearCells: ["visible_when"] }
                : { visibleWhen: conditionNow },
              { condition: stamp(conditionNow) },
            )
          }
        >
          {t("common.save")}
        </Button>
        {caption("condition")}
      </fieldset>
    </div>
  );
}

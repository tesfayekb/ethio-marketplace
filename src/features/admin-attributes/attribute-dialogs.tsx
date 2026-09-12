import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { CategoryNode } from "@/features/admin-categories/categories-service";
import { CategoryModal, SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import {
  ATTRIBUTE_TYPES,
  optionValues,
  typeHasOptions,
  type AttributeCategory,
  type AttributeOption,
  type AttributeRow,
  type MergeCounts,
} from "./attributes-service";
import {
  useDeleteAttribute,
  useLinkAttribute,
  useMergeAttributes,
  useUnlinkAttribute,
  useUpsertAttribute,
} from "./use-attributes";
import { useAttributeLabel } from "./use-attribute-label";
import { AttributeOptionRows } from "./components/attribute-option-rows";
import {
  AttributeNumberFields,
  AttributeTextFields,
  HELP_TEXT_MAX,
  type NumberFieldsValue,
  type TextFieldsValue,
} from "./components/attribute-v2-fields";

import {
  EMPTY_NUMBER_FIELDS,
  EMPTY_TEXT_FIELDS,
  parsePreset,
  presetToken,
} from "./attributes-service";

/**
 * C3c — THE ATTRIBUTE LIBRARY's write surfaces.
 *
 * Every submit runs through the page's step-up `guard`; the RPC behind it
 * re-checks the permission AND the step-up server-side (F3), so a refusal is a
 * translated line, never a silent no-op (F4). 360-first throughout.
 */

/**
 * F4 — a server refusal raises a TRANSLATION KEY, optionally with a `:count`
 * tail (`admin.attributes.error.deleteHasLinks:7`). Both namespaces the
 * attribute doors can raise are rendered through `t`; anything else falls back
 * to the generic save failure.
 */
export function useAttributeError() {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    // FIX-SCAN-1 ISSUE 2 — the gate settling without running the action.
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setMessage(abort === null ? null : t(abort));
      return;
    }
    const raw =
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "";
    const [key, detail] = raw.split(":");
    if (
      key !== undefined &&
      (key.startsWith("admin.attributes.error.") || key.startsWith("admin.categories.error."))
    ) {
      const text = t(key as MessageKey);
      if (detail === undefined) {
        setMessage(text);
        return;
      }
      /**
       * DEC-050 L3b — an option refusal names its parts with pipes
       * (`<attribute>|<target>`): the sentence names the TARGET, never a raw
       * token pasted mid-line.
       */
      const parts = detail.split("|");
      setMessage(
        text
          .replace("{count}", detail)
          .replace("{attr}", parts[0] ?? detail)
          .replace("{target}", parts[parts.length - 1] ?? detail)
          .replace("{detail}", detail),
      );
      return;

    }
    setMessage(raw === "" ? t("admin.attributes.error.saveFailed") : raw);
  };
  return { message, setMessage, fail };
}

export function AttributeErrorLine({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" data-testid="attribute-dialog-error" className="text-sm text-destructive">
      {message}
    </p>
  );
}

function DialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
  submitLabel,
  danger,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
  submitLabel?: string;
  danger?: boolean;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="attribute-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        variant={danger ? "destructive" : "default"}
        size="touch"
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {submitLabel ?? t("common.save")}
      </Button>
    </div>
  );
}

/* ------------------------------ definition -------------------------------- */

export function AttributeEditorDialog({
  attribute,
  attributes,
  mayDepend,
  guard,
  onClose,
}: {
  /** Null in create-mode. */
  attribute: AttributeRow | null;
  /** DEC-045 — the library, so the "Depends on" picker can offer its parents. */
  attributes: AttributeRow[];
  /** F3 convenience only: the RPC refuses a dependency write regardless. */
  mayDepend: boolean;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const upsert = useUpsertAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [attrKey, setAttrKey] = useState(attribute?.attrKey ?? "");
  const [nameEn, setNameEn] = useState(attribute?.nameEn ?? "");
  const [attrType, setAttrType] = useState(attribute?.attrType ?? "text");
  /**
   * DEC-050 L3b (INC-188) — the options are ROWS carrying every stored field,
   * so a save with no edits sends the stored records back untouched.
   */
  const [optionRows, setOptionRows] = useState<AttributeOption[]>(attribute?.options ?? []);
  const storedValues = (attribute?.options ?? []).map((option) => option.value);
  const [dependsOn, setDependsOn] = useState(attribute?.dependsOnKey ?? "");
  const [preview, setPreview] = useState("");

  const [helpText, setHelpText] = useState(attribute?.helpTextEn ?? "");
  /**
   * DEC-050 L3a — the v2 cells. A group is UNMOUNTED for the wrong type and its
   * values are cleared when the type changes, so a number's unit can never ride
   * along on a text definition (the door's CHECKs refuse it regardless — F3).
   */
  const [helpTextAm, setHelpTextAm] = useState(attribute?.helpTextAm ?? "");
  const [numberFields, setNumberFields] = useState<NumberFieldsValue>(() => ({
    unit: attribute?.unit ?? "",
    min: attribute?.minBound ?? "",
    max: attribute?.maxBound ?? "",
    decimals:
      attribute?.decimals === null || attribute?.decimals === undefined
        ? ""
        : String(attribute.decimals),
    format: attribute?.format ?? "",
  }));
  const [textFields, setTextFields] = useState<TextFieldsValue>(() => ({
    ...parsePreset(attribute?.preset ?? null),
    maxLength:
      attribute?.maxLength === null || attribute?.maxLength === undefined
        ? ""
        : String(attribute.maxLength),
  }));

  /**
   * DEC-045 LAW — a definition may depend on exactly one OTHER definition of
   * type `single_select`. The picker offers nothing else; the server re-checks
   * the type, the self-reference and the cycle regardless (F3).
   */
  const parents = attributes.filter(
    (row) => row.attrType === "single_select" && row.id !== attribute?.id,
  );
  const parent = parents.find((row) => row.attrKey === dependsOn) ?? null;
  const parentValues = parent === null ? [] : optionValues(parent.options);
  const dependent = typeHasOptions(attrType) && parent !== null;

  /** The number definitions a per-option bound may target (F3: the door judges). */
  const boundsTargets = attributes
    .filter((row) => row.attrType === "number")
    .map((row) => ({
      attrKey: row.attrKey,
      label: `${attributeLabel(row.id, row.nameEn)} (${row.attrKey})`,
    }));

  /**
   * The rows exactly as edited: a dependent definition keeps its `parent`, a
   * flat one keeps "". Nothing is recomposed, so nothing is lost (INC-188).
   */
  const composed: AttributeOption[] = optionRows.filter((option) => option.value.trim() !== "");


  /** Empty is null; a non-number for an integer cell is left to the door. */
  const text = (raw: string): string | null => (raw.trim() === "" ? null : raw.trim());
  const whole = (raw: string): number | null =>
    raw.trim() === "" || !/^\d+$/.test(raw.trim()) ? null : Number(raw.trim());
  const isNumber = attrType === "number";
  const isText = attrType === "text";

  const submit = () => {
    setMessage(null);
    if (attrKey.trim() === "") {
      setMessage(t("admin.attributes.error.keyRequired"));
      return;
    }
    if (nameEn.trim() === "") {
      setMessage(t("admin.attributes.error.nameRequired"));
      return;
    }
    void guard(async () => {
      try {
        await upsert.mutateAsync({
          id: attribute?.id ?? null,
          attrKey: attrKey.trim(),
          nameEn: nameEn.trim(),
          attrType,
          options: composed,
          helpTextEn: helpText,
          dependsOnKey: dependent ? dependsOn : null,
          helpTextAm,
          unit: isNumber ? text(numberFields.unit) : null,
          minBound: isNumber ? text(numberFields.min) : null,
          maxBound: isNumber ? text(numberFields.max) : null,
          decimals: isNumber
            ? numberFields.format === "year"
              ? 0
              : whole(numberFields.decimals)
            : null,
          format: isNumber ? text(numberFields.format) : null,
          preset: isText ? presetToken(textFields) : null,
          maxLength: isText ? whole(textFields.maxLength) : null,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="attribute-edit-dialog"
      openedBy={attribute === null ? "create-button" : "row-edit"}
      title={
        attribute === null ? t("admin.attributes.create.title") : t("admin.attributes.edit.title")
      }
      onClose={onClose}
    >
      {/* UX-2 PART 4 — key and name are different KINDS of thing, and the form
          now says which is which before an operator guesses. */}
      <FormField
        label={t("admin.attributes.field.key")}
        htmlFor="attribute-key"
        help={t("admin.attributes.field.keyHelp")}
      >
        <Input
          id="attribute-key"
          data-testid="attribute-key"
          value={attrKey}
          onChange={(event) => setAttrKey(event.target.value)}
        />
      </FormField>
      <FormField
        label={t("admin.attributes.field.name")}
        htmlFor="attribute-name"
        help={t("admin.attributes.field.nameHelp")}
      >
        <Input
          id="attribute-name"
          data-testid="attribute-name"
          value={nameEn}
          onChange={(event) => setNameEn(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.attributes.field.type")} htmlFor="attribute-type">
        <select
          id="attribute-type"
          data-testid="attribute-type"
          className={SELECT_CLASS}
          value={attrType}
          onChange={(event) => {
            const next = event.target.value;
            setAttrType(next);
            // DEC-050 L3a — a group that no longer applies leaves no residue.
            if (next !== "number") setNumberFields(EMPTY_NUMBER_FIELDS);
            if (next !== "text") setTextFields(EMPTY_TEXT_FIELDS);
          }}
        >
          {ATTRIBUTE_TYPES.map((option) => (
            <option key={option} value={option}>
              {t(`admin.attributes.type.${option}` as MessageKey)}
            </option>
          ))}
        </select>
      </FormField>

      {/* DEC-045 — the dependency picker; hidden without the write permission. */}
      {mayDepend && typeHasOptions(attrType) ? (
        <FormField
          label={t("admin.attributes.field.dependsOn")}
          htmlFor="attribute-depends-on"
          help={t("admin.attributes.field.dependsOnHelp")}
        >
          <select
            id="attribute-depends-on"
            data-testid="attribute-depends-on"
            className={SELECT_CLASS}
            value={dependsOn}
            onChange={(event) => {
              setDependsOn(event.target.value);
              setPreview("");
            }}
          >
            <option value="">{t("admin.attributes.dependsOn.none")}</option>
            {parents.map((row) => (
              <option key={row.id} value={row.attrKey}>
                {`${attributeLabel(row.id, row.nameEn)} (${row.attrKey})`}
              </option>
            ))}
          </select>
        </FormField>
      ) : null}

      {/* DEC-050 L3b — ONE ROW PER OPTION, flat or grouped by parent value. */}
      {typeHasOptions(attrType) ? (
        <div className="min-w-0 space-y-3" data-testid="attribute-options">
          {dependent && parentValues.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid="attribute-parent-empty">
              {t("admin.attributes.dependsOn.parentEmpty")}
            </p>
          ) : (
            <AttributeOptionRows
              rows={optionRows}
              storedValues={storedValues}
              targets={boundsTargets}
              parentValues={parentValues}
              dependent={dependent}
              onChange={setOptionRows}
            />
          )}

          {/* THE CASCADE, previewed where it is authored. */}
          {dependent ? (
            <>
              <FormField
                label={t("admin.attributes.dependsOn.previewLabel")}
                htmlFor="attribute-cascade-parent"
              >
                <select
                  id="attribute-cascade-parent"
                  data-testid="attribute-cascade-parent"
                  className={SELECT_CLASS}
                  value={preview}
                  onChange={(event) => setPreview(event.target.value)}
                >
                  <option value="">{t("admin.attributes.dependsOn.previewNone")}</option>
                  {parentValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </FormField>
              <ul data-testid="attribute-cascade-child" className="space-y-1">
                {optionRows
                  .filter((option) => preview !== "" && option.parent === preview)
                  .map((option) => (
                    <li
                      key={option.value}
                      data-testid={`attribute-cascade-option-${option.value}`}
                      className="text-sm text-muted-foreground"
                    >
                      {option.value}
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}


      {/* DEC-050 L3a — one group per type, mounted only for that type. */}
      {isNumber ? <AttributeNumberFields value={numberFields} onChange={setNumberFields} /> : null}
      {isText ? <AttributeTextFields value={textFields} onChange={setTextFields} /> : null}

      <FormField
        label={t("admin.attributes.field.help")}
        htmlFor="attribute-help"
        help={t("admin.attributes.field.helpCounter").replace("{count}", String(helpText.length))}
      >
        <Input
          id="attribute-help"
          data-testid="attribute-help"
          maxLength={HELP_TEXT_MAX}
          value={helpText}
          onChange={(event) => setHelpText(event.target.value)}
        />
      </FormField>
      <FormField
        label={t("admin.attributes.field.helpAm")}
        htmlFor="attribute-help-am"
        help={t("admin.attributes.field.helpCounter").replace("{count}", String(helpTextAm.length))}
      >
        <Input
          id="attribute-help-am"
          data-testid="attribute-help-am"
          maxLength={HELP_TEXT_MAX}
          value={helpTextAm}
          onChange={(event) => setHelpTextAm(event.target.value)}
        />
      </FormField>
      <AttributeErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={upsert.isPending}
        submitTestId="attribute-edit-submit"
      />
    </CategoryModal>
  );
}

/* -------------------------------- delete ---------------------------------- */

/**
 * THE BLAST-RADIUS LAW. A definition that is still linked cannot be deleted;
 * the copy NAMES the count so the operator knows exactly how much work the
 * refusal represents before they type the key.
 */
export function DeleteAttributeDialog({
  attribute,
  guard,
  onClose,
}: {
  attribute: AttributeRow;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const remove = useDeleteAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [typed, setTyped] = useState("");
  /** The blast radius owns the single message slot whenever it is present. */
  const [blastCount, setBlastCount] = useState<number | null>(
    attribute.usageCount > 0 ? attribute.usageCount : null,
  );

  /**
   * C3e — the linked-refusal (`admin.attributes.error.deleteHasLinks:<n>`) is
   * not a generic error line: it re-states the BLAST RADIUS with the server's
   * own count, in the same amber line the operator read before typing the key.
   */
  const failDelete = (error: unknown) => {
    const raw =
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "";
    const match = /^admin\.attributes\.error\.deleteHasLinks:(\d+)$/.exec(raw);
    if (match !== null) {
      // F4 / AT5-ONE-MESSAGE: clear the generic error state so the node is
      // removed entirely; only the amber blast-radius line renders.
      setMessage(null);
      setBlastCount(Number(match[1]));
      return;
    }
    setBlastCount(null);
    fail(error);
  };

  const submit = () => {
    setMessage(null);
    void guard(async () => {
      try {
        await remove.mutateAsync({ id: attribute.id, confirmKey: typed.trim() });
        onClose();
      } catch (error) {
        failDelete(error);
      }
    }).catch(failDelete);
  };

  return (
    <CategoryModal
      testid="attribute-delete-dialog"
      openedBy="row-delete"
      title={t("admin.attributes.delete.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.attributes.delete.hint")}</p>
      {blastCount !== null ? (
        <p
          role="status"
          data-testid="attribute-delete-blast"
          className="text-sm text-amber-600 dark:text-amber-400"
        >
          {t("admin.attributes.delete.blastRadius").replace("{count}", String(blastCount))}
        </p>
      ) : null}
      <FormField
        label={t("admin.attributes.delete.confirmLabel").replace("{key}", attribute.attrKey)}
        htmlFor="attribute-delete-confirm"
      >
        <Input
          id="attribute-delete-confirm"
          data-testid="attribute-delete-confirm"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
        />
      </FormField>
      {blastCount === null ? <AttributeErrorLine message={message} /> : null}
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={remove.isPending}
        submitTestId="attribute-delete-submit"
        submitLabel={t("admin.attributes.action.delete")}
        danger
      />
    </CategoryModal>
  );
}

/* --------------------------------- merge ---------------------------------- */

/**
 * THE CURATION DOOR (condition × 15). The operator ticks the duplicates, picks
 * the survivor, and the confirmation states — before anything moves — how many
 * links travel and how many definitions disappear.
 */
export function MergeAttributesDialog({
  attributes,
  guard,
  onClose,
}: {
  attributes: AttributeRow[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const merge = useMergeAttributes();
  const { message, setMessage, fail } = useAttributeError();
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const [targetId, setTargetId] = useState("");
  const [counts, setCounts] = useState<MergeCounts | null>(null);

  const target = attributes.find((row) => row.id === targetId) ?? null;
  const sources = attributes.filter((row) => sourceIds.includes(row.id) && row.id !== targetId);
  const movingLinks = sources.reduce((total, row) => total + row.usageCount, 0);

  const toggle = (id: string, on: boolean) =>
    setSourceIds((prev) => (on ? [...prev, id] : prev.filter((entry) => entry !== id)));

  const submit = () => {
    setMessage(null);
    if (target === null) {
      setMessage(t("admin.attributes.error.mergeNoTarget"));
      return;
    }
    if (sources.length === 0) {
      setMessage(t("admin.attributes.error.mergeNoSources"));
      return;
    }
    void guard(async () => {
      try {
        const result = await merge.mutateAsync({
          targetId: target.id,
          sourceIds: sources.map((row) => row.id),
        });
        setCounts(result);
        setSourceIds([]);
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="attribute-merge-dialog"
      openedBy="toolbar-merge"
      title={t("admin.attributes.merge.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.attributes.merge.hint")}</p>

      <FormField label={t("admin.attributes.merge.target")} htmlFor="attribute-merge-target">
        <select
          id="attribute-merge-target"
          data-testid="attribute-merge-target"
          className={SELECT_CLASS}
          value={targetId}
          onChange={(event) => setTargetId(event.target.value)}
        >
          <option value="">{t("admin.attributes.merge.targetNone")}</option>
          {attributes.map((row) => (
            <option key={row.id} value={row.id}>
              {`${attributeLabel(row.id, row.nameEn)} (${row.attrKey})`}
            </option>
          ))}
        </select>
      </FormField>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">
          {t("admin.attributes.merge.sources")}
        </legend>
        <div className="max-h-56 space-y-1 overflow-y-auto">
          {attributes
            .filter((row) => row.id !== targetId)
            .map((row) => (
              <label key={row.id} className="flex min-h-11 items-center gap-2 text-sm">
                <Checkbox
                  data-testid={`attribute-merge-source-${row.attrKey}`}
                  checked={sourceIds.includes(row.id)}
                  onCheckedChange={(next) => toggle(row.id, next === true)}
                />
                <span className="min-w-0 truncate">{`${attributeLabel(row.id, row.nameEn)} (${row.attrKey}) · ${row.usageCount}`}</span>
              </label>
            ))}
        </div>
      </fieldset>

      {target !== null && sources.length > 0 ? (
        <p
          role="status"
          data-testid="attribute-merge-confirm"
          className="text-sm text-muted-foreground"
        >
          {t("admin.attributes.merge.confirm")
            .replace("{n}", String(movingLinks))
            .replace("{target}", attributeLabel(target.id, target.nameEn))
            .replace("{m}", String(sources.length))}
        </p>
      ) : null}

      {counts === null ? null : (
        <p role="status" data-testid="attribute-merge-result" className="text-sm text-foreground">
          {t("admin.attributes.merge.result")
            .replace("{moved}", String(counts.moved))
            .replace("{folded}", String(counts.folded))
            .replace("{removed}", String(counts.removed))}
        </p>
      )}

      <AttributeErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={merge.isPending}
        submitTestId="attribute-merge-submit"
        submitLabel={t("admin.attributes.action.merge")}
      />
    </CategoryModal>
  );
}

/* ------------------------- assign from the library ------------------------ */

/**
 * C3-UX-1 PART C — ASSIGN FROM THE LIBRARY.
 *
 * The per-category link manager, pre-scoped to ONE attribute: the operator
 * picks the category instead of the attribute. The same gated door does the
 * write (`admin_link_attribute`, `categories:update` + step-up), so a duplicate
 * link is refused by the server with its own translated line (F3/F4), and the
 * row's "Used by" count re-reads from the mutation's invalidation.
 */
export function AssignAttributeDialog({
  attribute,
  categories,
  guard,
  onClose,
}: {
  attribute: AttributeRow;
  categories: CategoryNode[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const link = useLinkAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [needle, setNeedle] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const query = needle.trim().toLowerCase();
  const options = categories.filter(
    (row) =>
      query === "" ||
      row.nameEn.toLowerCase().includes(query) ||
      row.slug.toLowerCase().includes(query),
  );

  const submit = () => {
    setMessage(null);
    if (categoryId === "") {
      setMessage(t("admin.attributes.error.assignNoCategory"));
      return;
    }
    void guard(async () => {
      try {
        await link.mutateAsync({
          categoryId,
          attributeId: attribute.id,
          isRequired: false,
          isFilterable: true,
          displayOrder: null,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="attribute-assign-dialog"
      openedBy="row-assign"
      title={`${t("admin.attributes.assign.title")} — ${attributeLabel(attribute.id, attribute.nameEn)}`}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.attributes.assign.hint")}</p>
      <Input
        data-testid="attribute-assign-search"
        placeholder={t("admin.attributes.assign.searchPlaceholder")}
        value={needle}
        onChange={(event) => setNeedle(event.target.value)}
      />
      <FormField label={t("admin.attributes.assign.category")} htmlFor="attribute-assign-picker">
        <select
          id="attribute-assign-picker"
          data-testid="attribute-assign-picker"
          className={SELECT_CLASS}
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">{t("admin.attributes.assign.pickNone")}</option>
          {options.map((row) => (
            <option key={row.id} value={row.id}>
              {`${"\u00b7 ".repeat(row.depth)}${row.nameEn} (${row.slug})`}
            </option>
          ))}
        </select>
      </FormField>
      <AttributeErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={link.isPending}
        submitTestId="attribute-assign-submit"
        submitLabel={t("admin.attributes.action.assign")}
      />
    </CategoryModal>
  );
}

/* --------------------- C3-UX-1c — remove from category -------------------- */

/**
 * PART C — REMOVE FROM CATEGORY. The inverse of "Assign to category": the
 * operator picks one of the categories the definition is CURRENTLY linked to
 * and the confirmation names it before the write. The door is the existing
 * `admin_unlink_attribute` (`categories:restructure` + step-up, re-checked
 * server-side), so the chips and the blast radius both re-read from the
 * mutation's invalidation.
 */
export function RemoveAttributeCategoryDialog({
  attribute,
  links,
  guard,
  onClose,
}: {
  attribute: AttributeRow;
  links: AttributeCategory[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const unlink = useUnlinkAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [linkId, setLinkId] = useState(links.length === 1 ? (links[0]?.linkId ?? "") : "");

  const chosen = links.find((row) => row.linkId === linkId) ?? null;

  const submit = () => {
    setMessage(null);
    if (chosen === null) {
      setMessage(t("admin.attributes.error.removeNoCategory"));
      return;
    }
    void guard(async () => {
      try {
        await unlink.mutateAsync(chosen.linkId);
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="attribute-remove-dialog"
      openedBy="row-remove"
      title={`${t("admin.attributes.remove.title")} — ${attributeLabel(attribute.id, attribute.nameEn)}`}
      onClose={onClose}
    >
      {links.length === 0 ? (
        <p data-testid="attribute-remove-none" className="text-sm text-muted-foreground">
          {t("admin.attributes.remove.none")}
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">{t("admin.attributes.remove.hint")}</p>
          <FormField
            label={t("admin.attributes.remove.category")}
            htmlFor="attribute-remove-picker"
          >
            <select
              id="attribute-remove-picker"
              data-testid="attribute-remove-picker"
              className={SELECT_CLASS}
              value={linkId}
              onChange={(event) => setLinkId(event.target.value)}
            >
              <option value="">{t("admin.attributes.remove.pickNone")}</option>
              {links.map((row) => (
                <option key={row.linkId} value={row.linkId}>
                  {`${row.nameEn} (${row.categorySlug})`}
                </option>
              ))}
            </select>
          </FormField>
          {chosen === null ? null : (
            <p data-testid="attribute-remove-confirm" className="text-sm text-foreground">
              {t("admin.attributes.remove.confirm")
                .replace("{attribute}", attributeLabel(attribute.id, attribute.nameEn))
                .replace("{category}", chosen.nameEn)}
            </p>
          )}
        </>
      )}
      <AttributeErrorLine message={message} />
      {links.length === 0 ? null : (
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={unlink.isPending}
          danger
          submitTestId="attribute-remove-submit"
          submitLabel={t("admin.attributes.action.remove")}
        />
      )}
    </CategoryModal>
  );
}

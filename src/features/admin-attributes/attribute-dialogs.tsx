import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { CategoryModal, SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import {
  ATTRIBUTE_TYPES,
  typeHasOptions,
  type AttributeRow,
  type MergeCounts,
} from "./attributes-service";
import { useDeleteAttribute, useMergeAttributes, useUpsertAttribute } from "./use-attributes";

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
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const raw = error instanceof Error ? error.message : "";
    const [key, detail] = raw.split(":");
    if (
      key !== undefined &&
      (key.startsWith("admin.attributes.error.") || key.startsWith("admin.categories.error."))
    ) {
      const text = t(key as MessageKey);
      setMessage(detail === undefined ? text : text.replace("{count}", detail));
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
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        data-testid="attribute-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        variant={danger ? "destructive" : "default"}
        className="min-h-11"
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
  guard,
  onClose,
}: {
  /** Null in create-mode. */
  attribute: AttributeRow | null;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const upsert = useUpsertAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [attrKey, setAttrKey] = useState(attribute?.attrKey ?? "");
  const [nameEn, setNameEn] = useState(attribute?.nameEn ?? "");
  const [attrType, setAttrType] = useState(attribute?.attrType ?? "text");
  const [options, setOptions] = useState((attribute?.options ?? []).join("\n"));
  const [helpText, setHelpText] = useState(attribute?.helpTextEn ?? "");

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
          options: options
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== ""),
          helpTextEn: helpText,
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
      <FormField label={t("admin.attributes.field.key")} htmlFor="attribute-key">
        <Input
          id="attribute-key"
          data-testid="attribute-key"
          value={attrKey}
          onChange={(event) => setAttrKey(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.attributes.field.name")} htmlFor="attribute-name">
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
          onChange={(event) => setAttrType(event.target.value)}
        >
          {ATTRIBUTE_TYPES.map((option) => (
            <option key={option} value={option}>
              {t(`admin.attributes.type.${option}` as MessageKey)}
            </option>
          ))}
        </select>
      </FormField>
      {typeHasOptions(attrType) ? (
        <FormField
          label={t("admin.attributes.field.options")}
          htmlFor="attribute-options"
          help={t("admin.attributes.field.optionsHelp")}
        >
          <Textarea
            id="attribute-options"
            data-testid="attribute-options"
            rows={6}
            value={options}
            onChange={(event) => setOptions(event.target.value)}
          />
        </FormField>
      ) : null}
      <FormField label={t("admin.attributes.field.help")} htmlFor="attribute-help">
        <Input
          id="attribute-help"
          data-testid="attribute-help"
          value={helpText}
          onChange={(event) => setHelpText(event.target.value)}
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
  const remove = useDeleteAttribute();
  const { message, setMessage, fail } = useAttributeError();
  const [typed, setTyped] = useState("");

  const submit = () => {
    setMessage(null);
    void guard(async () => {
      try {
        await remove.mutateAsync({ id: attribute.id, confirmKey: typed.trim() });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="attribute-delete-dialog"
      openedBy="row-delete"
      title={t("admin.attributes.delete.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.attributes.delete.hint")}</p>
      {attribute.usageCount > 0 ? (
        <p
          role="status"
          data-testid="attribute-delete-blast"
          className="text-sm text-amber-600 dark:text-amber-400"
        >
          {t("admin.attributes.delete.blastRadius").replace(
            "{count}",
            String(attribute.usageCount),
          )}
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
      <AttributeErrorLine message={message} />
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
              {`${row.nameEn} (${row.attrKey})`}
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
                <span className="min-w-0 truncate">{`${row.nameEn} (${row.attrKey}) · ${row.usageCount}`}</span>
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
            .replace("{target}", target.nameEn)
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

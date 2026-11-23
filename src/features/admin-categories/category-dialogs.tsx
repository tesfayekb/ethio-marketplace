import { TriangleAlert } from "lucide-react";
import { PanelSubject } from "@/components/ui/dialog-parts-facade";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { controlClass } from "@/components/forms/control-class";
import { Field } from "@/components/forms/field";
import { FieldSelect } from "@/components/forms/field-select";
import { useFormGate } from "@/components/forms/use-form-gate";
import { CategoryModal } from "@/components/ui/category-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { useSettling } from "@/lib/use-settling";

import { suggestCategoryIcon } from "./category-images-service";
import { CategoryFormFields, type CategoryFormValues } from "./category-form-fields";
import {
  categoryRefusals,
  emptyCategoryForm,
  readCategoryNumbers,
  type CategoryFormRefusals,
} from "./category-form-values";
import { CATEGORY_REFUSALS, useCategoryRefusal } from "./category-refusals";

import {
  activeParentOptions,
  deriveSlugPreview,
  type CategoryNode,
  type CategoryRow,
} from "./categories-service";
import {
  ADMIN_CATEGORIES_KEY,
  useAddCategoryPointer,
  useCategoryPointers,
  useCreateCategory,
  useDeleteCategory,
  useMoveCategoryPointer,
  useRemoveCategoryPointer,
  useSetPrimaryPointer,
  useReorderCategories,
  useRetireCategory,
  useSetCategoryWindow,
  useSetCountryExclusions,
  useUpdateCategory,
} from "./use-categories";

import { CategoryImagePanel } from "./category-image-dialog";

/**
 * C2-UI — the categories console's write surfaces.
 *
 * Every submit runs through the step-up `guard` handed down by the page's
 * StepUpGate; the RPC behind it re-checks the permission AND the step-up
 * server-side (F3), so a refusal here is a translated error, never a silent
 * no-op (F4). 360-first: full-width controls, ≥44px targets, logical spacing.
 */

function CategoryDialogAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" data-testid="category-dialog-error" className="text-sm text-destructive">
      {message}
    </p>
  );
}

/* ------------------------------- editor ---------------------------------- */

/**
 * C5m PART A — ONE DIALOG, TWO MODES.
 *
 * The console has a SINGLE write surface. `mode="create"` renders the same
 * shell and the same shared Details fields (plus Countries and Position);
 * lifecycle verbs and the Image surface are hidden until the row exists.
 * Saving runs the create RPC, chains the exclusions and the position
 * placement, and then transitions THIS OPEN DIALOG in place to edit-mode bound
 * to the new id, Image surface in front — no close, no reopen, no second
 * component (the standalone create dialog is deleted).
 *
 * PARTIAL-FAILURE LAW: the create RPC succeeding makes the row REAL. A chained
 * step failing surfaces the translated refusal on the image surface — the row
 * is never lost.
 */
export function CategoryEditorDialog({
  mode,
  category,
  parents,
  countries,
  guard,
  verbBar,
  openedBy,
  onClose,
}: {
  mode: "create" | "edit";
  /** Edit-mode: the LIVE roster row (INC-142). Null in create-mode. */
  category: CategoryRow | null;
  parents: CategoryNode[];
  countries: { code: string; nameEn: string }[];
  guard: GuardFn;
  /** UI-FIX-4 — the editor's wrapping verb bar; hidden in create-mode. */
  verbBar?: ReactNode;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const setExclusions = useSetCountryExclusions();
  const reorder = useReorderCategories();
  /**
   * INC-558's class (turn G3c) — the editor's verb bar can move this category;
   * its Save sends the order it holds, so Save waits until the roster settles.
   */
  const settling = useSettling(ADMIN_CATEGORIES_KEY);
  const { message, setMessage, fail } = useCategoryRefusal();
  const gate = useFormGate();
  const [parsed, setParsed] = useState<CategoryFormRefusals>({});
  /** Set by a successful create — from here the SAME dialog is an editor. */
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  /** Bundle 2 step 18 — the suggestion fell back to the default icon. */
  const [iconFallback, setIconFallback] = useState(false);
  const [form, setForm] = useState<CategoryFormValues>(() =>
    category === null
      ? emptyCategoryForm()
      : {
          ...emptyCategoryForm(),
          nameEn: category.nameEn,
          icon: category.icon ?? "",
          allowListings: category.allowListings,
          priceEnabled: category.priceEnabled,
          // INC-143 — NULL renders EMPTY. No coalesce to a numeric literal.
          expiryDays: category.expiryDays === null ? "" : String(category.expiryDays),
        },
  );
  const patch = (next: Partial<CategoryFormValues>) => setForm((prev) => ({ ...prev, ...next }));
  /**
   * C5e/C5l — the icon is EMPTY until the silent name-blur suggestion lands;
   * Change reveals the input, and a manual edit is never overwritten.
   */
  const [iconOpen, setIconOpen] = useState(false);
  const iconTouched = useRef(false);
  const suggestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (suggestTimer.current !== null) clearTimeout(suggestTimer.current);
    },
    [],
  );

  const creating = mode === "create" && createdId === null;
  const parentId = form.parentId === "" ? null : form.parentId;
  const parentName =
    parentId === null ? null : (parents.find((row) => row.id === parentId)?.nameEn ?? null);

  /**
   * C5m PART B — POSITION reads the ACTIVE, non-catch-all CHILDREN OF THE
   * CURRENTLY SELECTED PARENT (root parent ⇒ root-level siblings), in roster
   * order, and is reactive to a parent change. Catch-alls are excluded: they
   * always sort last server-side, so "before a catch-all" is meaningless.
   */
  const siblings = parents.filter(
    (row) => row.parentId === parentId && row.isActive && !row.isCatchall,
  );
  const positionOptions = siblings.map((row) => ({
    id: row.id,
    label: t("admin.categories.create.positionBefore").replace("{name}", row.nameEn),
  }));
  const positionEndLabel = t("admin.categories.create.positionEnd").replace(
    "{n}",
    String(siblings.length + 1),
  );
  const positionCaption = t("admin.categories.create.positionCount")
    .replace("{n}", String(siblings.length))
    .replace("{parent}", parentName ?? t("admin.categories.create.parentRoot"));

  /** Debounced so a blur-then-blur never fires two calls (I3). */
  const requestSuggestion = (name: string) => {
    if (name.trim().length === 0 || iconTouched.current) return;
    if (suggestTimer.current !== null) clearTimeout(suggestTimer.current);
    suggestTimer.current = setTimeout(() => {
      void suggestCategoryIcon({ name: name.trim(), parentName })
        .then((suggested) => {
          if (iconTouched.current) return;
          patch({ icon: suggested.icon });
          setIconFallback(suggested.fallback);
        })
        .catch(() => {
          /* no fallback value: save-time applies Package if still empty. */
        });
    }, 300);
  };

  const submitCreate = (expiryDays: number | null) => {
    setBusy(true);
    void guard(async () => {
      const id = await create.mutateAsync({
        nameEn: form.nameEn.trim(),
        // Package is the SAVE-TIME default, never a prefill.
        icon: form.icon.trim() === "" ? "Package" : form.icon.trim(),
        parentId,
        allowListings: form.allowListings,
        priceEnabled: form.priceEnabled,
        expiryDays,
        visibleFrom: fromLocalInput(form.visibleFrom),
        visibleUntil: fromLocalInput(form.visibleUntil),
      });
      // The row exists from here on — a chained failure can never lose it.
      setCreatedId(id);
      try {
        if (form.excludedCodes.length > 0) {
          await setExclusions.mutateAsync({ id, countryCodes: form.excludedCodes });
        }
        if (form.positionBefore !== "") {
          const ordered = parents
            .filter((row) => row.parentId === parentId && !row.isCatchall)
            .map((row) => row.id);
          const at = ordered.indexOf(form.positionBefore);
          if (at >= 0) {
            ordered.splice(at, 0, id);
            await reorder.mutateAsync({ parentId, orderedChildIds: ordered });
          }
        }
      } catch (chainError) {
        fail(chainError);
      }
    })
      .catch(fail)
      .finally(() => setBusy(false));
  };

  const submitEdit = (row: CategoryRow, expiryDays: number | null) => {
    void guard(async () => {
      try {
        await update.mutateAsync({
          id: row.id,
          nameEn: form.nameEn.trim(),
          icon: form.icon.trim(),
          // C2-CLOSE Part C — the order is not typed here; Move up/down owns it.
          displayOrder: row.displayOrder,
          allowListings: form.allowListings,
          priceEnabled: form.priceEnabled,
          expiryDays,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  const submit = () => {
    setMessage(null);
    setParsed({});
    // DEC-339: the gate first, then the one parser; nothing is sent while either refuses.
    if (!gate.try()) return;
    const numbers = readCategoryNumbers(form);
    if (!numbers.ok) {
      setParsed(numbers.refusals);
      return;
    }
    if (creating) {
      submitCreate(numbers.expiryDays);
      return;
    }
    if (category !== null) submitEdit(category, numbers.expiryDays);
  };

  return (
    <CategoryModal
      testid="category-edit-dialog"
      openedBy={openedBy}
      title={creating ? t("admin.categories.create.title") : t("admin.categories.edit.title")}
      onClose={onClose}
      description={t("admin.categories.edit.description")}
      size="default"
      subject={category === null ? undefined : <PanelSubject title={category.nameEn} />}
      footer={
        creating ? (
          <DialogActions
            onCancel={onClose}
            onSubmit={submit}
            busy={busy || create.isPending}
            submitTestId="category-create-submit"
          />
        ) : createdId !== null ? (
          <div className="flex justify-end">
            <Button
              type="button"
              size="touch"
              data-testid="category-editor-close"
              onClick={onClose}
            >
              {t("common.close")}
            </Button>
          </div>
        ) : (
          <DialogActions
            onCancel={onClose}
            onSubmit={submit}
            busy={update.isPending || settling}
            submitTestId="category-edit-submit"
          />
        )
      }
    >
      {creating ? (
        <>
          <CategoryFormFields
            mode="create"
            values={form}
            parents={parents}
            iconOpen={iconOpen}
            onIconOpen={() => setIconOpen(true)}
            onNameBlur={requestSuggestion}
            iconFallback={iconFallback}
            countries={countries}
            positionOptions={positionOptions}
            positionEndLabel={positionEndLabel}
            positionCaption={positionCaption}
            gate={gate}
            refusals={categoryRefusals(gate, parsed)}
            onChange={(next) => {
              if (next.icon !== undefined) {
                iconTouched.current = true;
                setIconFallback(false);
              }
              patch(next);
            }}
          />
          <CategoryDialogAlert message={message} />
        </>
      ) : createdId !== null ? (
        /* C5m — the SAME dialog, now bound to the new id: Image in front. */
        <div data-testid="category-editor-image" className="space-y-3">
          <CategoryImagePanel categoryId={createdId} guard={guard} />
          <CategoryDialogAlert message={message} />
        </div>
      ) : (
        <>
          {verbBar}
          <CategoryFormFields
            mode="edit"
            values={form}
            onChange={patch}
            gate={gate}
            refusals={categoryRefusals(gate, parsed)}
            extra={
              /**
               * C2-CLOSE Part C — DISPLAY ORDER IS LIVE, NOT TYPED. The field
               * mirrors the LIVE roster row (INC-142); it is drawn only where
               * that row is loaded, so the stored order is always there.
               */
              category !== null ? (
                <Field
                  id="category-edit-order"
                  field="displayOrder"
                  label={t("admin.categories.field.order")}
                  required={false}
                  hint={
                    <p className="min-w-0 break-words text-xs text-muted-foreground">
                      {t("admin.categories.field.orderManaged")}
                    </p>
                  }
                  refusal={null}
                  family={CATEGORY_REFUSALS}
                >
                  {(control) => (
                    <Input
                      {...control}
                      data-testid="category-edit-order"
                      inputMode="numeric"
                      readOnly
                      className={controlClass(false, false, "dialog")}
                      value={String(category.displayOrder)}
                    />
                  )}
                </Field>
              ) : null
            }
          />
          <CategoryDialogAlert message={message} />
        </>
      )}
    </CategoryModal>
  );
}

function DialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
  submitLabel,
  danger = false,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
  submitLabel?: string;
  /** Bundle 11 B2 (G29) — the button that confirms a destruction is red. */
  danger?: boolean;
}) {
  const { t } = useI18n();
  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="category-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        size="touch"
        variant={danger ? "destructive" : "default"}
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {submitLabel ?? t("common.save")}
      </Button>
    </>
  );
}

/* ------------------------------- window ---------------------------------- */

/**
 * C2-UI-FIX — the visibility window is a MOMENT, not a day. `datetime-local`
 * carries no zone, so we render the stored instant in the operator's own zone
 * and serialise back through `Date` (which reads the value as local time and
 * emits a zone-correct UTC instant). An empty control clears the bound: the
 * RPC receives NULL, never a midnight guess.
 */
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const at = new Date(iso);
  if (Number.isNaN(at.getTime())) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}T${pad(at.getHours())}:${pad(at.getMinutes())}`;
}

function fromLocalInput(value: string): string | null {
  if (value.trim() === "") return null;
  const at = new Date(value);
  return Number.isNaN(at.getTime()) ? null : at.toISOString();
}

export function CategoryWindowDialog({
  category,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setWindow = useSetCategoryWindow();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [from, setFrom] = useState(toLocalInput(category.visibleFrom));
  const [until, setUntil] = useState(toLocalInput(category.visibleUntil));

  const submit = () => {
    setMessage(null);
    void guard(async () => {
      try {
        await setWindow.mutateAsync({
          id: category.id,
          visibleFrom: fromLocalInput(from),
          visibleUntil: fromLocalInput(until),
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-window-dialog"
      openedBy={openedBy}
      title={t("admin.categories.window.title")}
      onClose={onClose}
      description={t("admin.categories.window.hint")}
      size="default"
      subject={<PanelSubject title={category.nameEn} />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={setWindow.isPending}
          submitTestId="category-window-submit"
        />
      }
    >
      <Field
        id="category-window-from"
        field="visibleFrom"
        label={t("admin.categories.window.from")}
        required={false}
        refusal={null}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            data-testid="category-window-from"
            type="datetime-local"
            className={controlClass(false, false, "dialog")}
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
        )}
      </Field>
      <Field
        id="category-window-until"
        field="visibleUntil"
        label={t("admin.categories.window.until")}
        required={false}
        refusal={null}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            data-testid="category-window-until"
            type="datetime-local"
            className={controlClass(false, false, "dialog")}
            value={until}
            onChange={(event) => setUntil(event.target.value)}
          />
        )}
      </Field>
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

/* ----------------------------- exclusions -------------------------------- */

export function CategoryExclusionsDialog({
  category,
  countries,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  countries: { code: string; nameEn: string }[];
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setExclusions = useSetCountryExclusions();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [codes, setCodes] = useState<string[]>(category.excludedCountryCodes);

  const submit = () => {
    setMessage(null);
    void guard(async () => {
      try {
        await setExclusions.mutateAsync({ id: category.id, countryCodes: codes });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-exclusions-dialog"
      openedBy={openedBy}
      title={t("admin.categories.exclusions.title")}
      onClose={onClose}
      description={t("admin.categories.exclusions.hint")}
      size="default"
      subject={<PanelSubject title={category.nameEn} />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={setExclusions.isPending}
          submitTestId="category-exclusions-submit"
        />
      }
    >
      <p data-testid="category-exclusions-current" className="text-sm text-foreground">
        {`${t("admin.categories.exclusions.current")}: ${category.exclusionCount}`}
      </p>
      <FieldSelect
        id="category-exclusion"
        field="excludedCodes"
        label={t("admin.categories.exclusions.title")}
        required={false}
        refusal={null}
        family={CATEGORY_REFUSALS}
        multiple
        options={countries.map((country) => ({
          value: country.code,
          label: `${country.code} — ${country.nameEn}`,
        }))}
        value={codes}
        onChange={setCodes}
      />
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

/* -------------------------------- retire --------------------------------- */

export function RetireCategoryDialog({
  category,
  targets,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  targets: CategoryNode[];
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const retire = useRetireCategory();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [reassignTo, setReassignTo] = useState("");
  const gate = useFormGate();

  /**
   * C2h — RETIRE DIALOG CLARITY. A category with no active listings has
   * nothing to move: the picker is hidden and the body says so plainly. The
   * server already accepts a NULL target in exactly that case (it only
   * demands one when live listings exist), so the console stops inventing a
   * destination the operator does not need to choose.
   */
  const listingCount = category.listingCount;
  const hasListings = listingCount > 0;

  const submit = () => {
    setMessage(null);
    // DEC-339: a blank target, where listings must move, is the gate's to stop.
    if (!gate.try()) return;
    void guard(async () => {
      try {
        await retire.mutateAsync({
          id: category.id,
          reassignTo: hasListings ? reassignTo : null,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-retire-dialog"
      openedBy={openedBy}
      title={t("admin.categories.retire.title")}
      onClose={onClose}
      description={t("admin.categories.retire.hint")}
      size="narrow"
      subject={<PanelSubject title={category.nameEn} />}
      tone={"danger"}
      icon={<TriangleAlert />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={retire.isPending}
          submitTestId="category-retire-submit"
          submitLabel={t("admin.categories.retire.confirm")}
        />
      }
    >
      {hasListings ? (
        <Field
          id="category-retire-target"
          field="reassignTo"
          label={t("admin.categories.retire.reassignCount").replace(
            "{count}",
            String(listingCount),
          )}
          required
          refusal={gate.marks.find((mark) => mark.field === "reassignTo") ?? null}
          family={CATEGORY_REFUSALS}
          gate={gate}
          blank={reassignTo === ""}
          marked={false}
        >
          {(control) => (
            <NativeSelect
              {...control}
              data-testid="category-retire-target"
              className="w-full"
              value={reassignTo}
              onChange={(event) => setReassignTo(event.target.value)}
            >
              <option value="">{t("admin.categories.retire.reassignPlaceholder")}</option>
              {targets
                .filter((row) => row.id !== category.id)
                .map((row) => (
                  <option key={row.id} value={row.id}>
                    {`${"— ".repeat(row.depth)}${row.nameEn}`}
                  </option>
                ))}
            </NativeSelect>
          )}
        </Field>
      ) : (
        <p className="text-sm text-muted-foreground" data-testid="category-retire-no-listings">
          {t("admin.categories.retire.noListings")}
        </p>
      )}
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

/* ------------------------------- pointer --------------------------------- */

export function AddPointerDialog({
  category,
  parents,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  parents: CategoryNode[];
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const addPointer = useAddCategoryPointer();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [parentId, setParentId] = useState("");
  const gate = useFormGate();

  const submit = () => {
    setMessage(null);
    // DEC-339: a blank parent is the gate's to stop.
    if (!gate.try()) return;
    void guard(async () => {
      try {
        await addPointer.mutateAsync({ parentId, childId: category.id });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-pointer-dialog"
      openedBy={openedBy}
      title={t("admin.categories.pointer.title")}
      onClose={onClose}
      description={t("admin.categories.pointer.hint")}
      size="default"
      subject={<PanelSubject title={category.nameEn} />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={addPointer.isPending}
          submitTestId="category-pointer-submit"
        />
      }
    >
      <Field
        id="category-pointer-parent"
        field="parentId"
        label={t("admin.categories.pointer.parent")}
        required
        refusal={gate.marks.find((mark) => mark.field === "parentId") ?? null}
        family={CATEGORY_REFUSALS}
        gate={gate}
        blank={parentId === ""}
        marked={false}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid="category-pointer-parent"
            className="w-full"
            value={parentId}
            onChange={(event) => setParentId(event.target.value)}
          >
            <option value="">{t("admin.categories.pointer.parentPlaceholder")}</option>
            {activeParentOptions(parents, category.id).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

/* ----------------------------- browse paths ------------------------------ */

/**
 * C2-UI-FIX — BROWSE PATHS. `admin_list_category_pointers` (C2b) finally gives
 * the console pointer IDs, so move and remove stop being a documented
 * limitation. Every write goes through the same step-up `guard`; the RPC
 * re-checks `categories:restructure` and the step-up server-side (F3).
 */
export function CategoryPathsDialog({
  category,
  parents,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  parents: CategoryNode[];
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const pointers = useCategoryPointers(category.id);
  const movePointer = useMoveCategoryPointer();
  const removePointer = useRemoveCategoryPointer();
  const setPrimary = useSetPrimaryPointer();
  const addPointer = useAddCategoryPointer();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [addParentId, setAddParentId] = useState("");
  /** Each added path starts a fresh round, so the emptied picker is not marked again. */
  const [addRound, setAddRound] = useState(0);
  const gate = useFormGate(addRound);

  /** C2c — active destinations only, each rendered with its whole path. */
  const candidates = activeParentOptions(parents, category.id);

  const run = (work: () => Promise<unknown>) => {
    setMessage(null);
    void guard(async () => {
      try {
        await work();
      } catch (error) {
        fail(error);
      }
    });
  };

  const busy =
    movePointer.isPending ||
    removePointer.isPending ||
    addPointer.isPending ||
    setPrimary.isPending;

  return (
    <CategoryModal
      testid="category-paths-dialog"
      openedBy={openedBy}
      title={t("admin.categories.paths.title")}
      onClose={onClose}
      description={t("admin.categories.paths.hint")}
      size="default"
      subject={<PanelSubject title={category.nameEn} />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={() => {
            setMessage(null);
            // DEC-339: a blank parent is the gate's to stop.
            if (!gate.try()) return;
            run(async () => {
              await addPointer.mutateAsync({ parentId: addParentId, childId: category.id });
              setAddParentId("");
              setAddRound((round) => round + 1);
            });
          }}
          busy={busy}
          submitTestId="category-paths-add-submit"
          submitLabel={t("admin.categories.paths.addSubmit")}
        />
      }
    >
      {pointers.isLoading ? (
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {t("admin.categories.paths.loading")}
        </p>
      ) : pointers.error ? (
        <p role="alert" className="text-sm text-destructive">
          {t("admin.categories.paths.error")}
        </p>
      ) : (pointers.data ?? []).length === 0 ? (
        <p data-testid="category-paths-empty" className="text-sm text-muted-foreground">
          {t("admin.categories.paths.empty")}
        </p>
      ) : (
        <ul className="min-w-0 space-y-2">
          {(pointers.data ?? []).map((pointer) => (
            <li
              key={pointer.pointerId}
              data-testid={`category-path-${pointer.pointerId}`}
              className="min-w-0 space-y-2 rounded-md border border-border p-3"
            >
              <p className="flex min-w-0 flex-wrap items-center gap-2 break-words text-sm text-foreground">
                <span className="min-w-0 break-words">
                  {pointer.parentNameEn ?? t("admin.categories.paths.root")}
                </span>
                {/*
                  ES5 — the PRIMARY (home) path is the edge the door marks
                  is_primary; the roster and the breadcrumbs read the same one.
                */}
                {pointer.isPrimary ? (
                  <Badge
                    variant="secondary"
                    data-testid={`category-path-primary-${pointer.pointerId}`}
                    title={t("admin.categories.paths.primaryTip")}
                    aria-label={`${t("admin.categories.paths.primary")}: ${t("admin.categories.paths.primaryTip")}`}
                  >
                    {t("admin.categories.paths.primary")}
                  </Badge>
                ) : null}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Field
                  id={`category-path-move-${pointer.pointerId}`}
                  field="newParentId"
                  label={<span className="sr-only">{t("admin.categories.paths.moveTo")}</span>}
                  required={false}
                  layout="inline"
                  refusal={null}
                  family={CATEGORY_REFUSALS}
                >
                  {(control) => (
                    <NativeSelect
                      {...control}
                      data-testid={`category-path-move-${pointer.pointerId}`}
                      className="w-full"
                      value={pointer.parentId ?? ""}
                      disabled={busy}
                      onChange={(event) => {
                        const next = event.target.value === "" ? null : event.target.value;
                        run(() =>
                          movePointer.mutateAsync({
                            pointerId: pointer.pointerId,
                            newParentId: next,
                          }),
                        );
                      }}
                    >
                      <option value="">{t("admin.categories.paths.root")}</option>
                      {candidates.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </NativeSelect>
                  )}
                </Field>
                {/* Bundle 11 B3 (G29) — it removes the path at once: a destructive
                    act is red on the button that performs it. */}
                <Button
                  type="button"
                  variant="destructive"
                  size="touch"
                  data-testid={`category-path-remove-${pointer.pointerId}`}
                  disabled={busy}
                  onClick={() => run(() => removePointer.mutateAsync(pointer.pointerId))}
                >
                  {t("admin.categories.paths.remove")}
                </Button>
                {pointer.isPrimary ? null : (
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    data-testid={`category-path-make-primary-${pointer.pointerId}`}
                    disabled={busy}
                    onClick={() => run(() => setPrimary.mutateAsync(pointer.pointerId))}
                  >
                    {t("admin.categories.paths.makePrimary")}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Field
        id="category-paths-add"
        field="parentId"
        label={t("admin.categories.paths.add")}
        required
        refusal={gate.marks.find((mark) => mark.field === "parentId") ?? null}
        family={CATEGORY_REFUSALS}
        gate={gate}
        blank={addParentId === ""}
        marked={false}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid="category-paths-add"
            className="w-full"
            value={addParentId}
            disabled={busy}
            onChange={(event) => setAddParentId(event.target.value)}
          >
            <option value="">{t("admin.categories.pointer.parentPlaceholder")}</option>
            {candidates.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

/* -------------------------------- delete ---------------------------------- */

/**
 * C2d — the one destructive verb. A retired row only: the operator types the
 * slug exactly, and the RPC re-checks the match, the retired state and the
 * zero listing count server-side (F3). A refusal renders as a translated
 * message; nothing is deleted optimistically (F4).
 */
export function DeleteCategoryDialog({
  category,
  guard,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const remove = useDeleteCategory();
  const { message, setMessage, fail } = useCategoryRefusal();
  const [typed, setTyped] = useState("");
  const gate = useFormGate();

  const submit = () => {
    setMessage(null);
    // DEC-339: a blank confirmation is the gate's; a wrong one stays the dialog's own words.
    if (!gate.try()) return;
    if (typed !== category.slug) {
      setMessage(t("admin.categories.delete.mismatch"));
      return;
    }
    void guard(async () => {
      try {
        await remove.mutateAsync({ id: category.id, confirmSlug: typed });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-delete-dialog"
      openedBy={openedBy}
      title={t("admin.categories.delete.title")}
      onClose={onClose}
      description={t("admin.categories.delete.hint")}
      size="narrow"
      subject={<PanelSubject title={category.nameEn} />}
      tone={"danger"}
      icon={<TriangleAlert />}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={submit}
          busy={remove.isPending}
          submitTestId="category-delete-submit"
          submitLabel={t("admin.categories.delete.confirm")}
          danger
        />
      }
    >
      <Field
        id="category-delete-slug"
        field="confirmSlug"
        label={t("admin.categories.delete.confirmLabel")}
        required
        refusal={gate.marks.find((mark) => mark.field === "confirmSlug") ?? null}
        family={CATEGORY_REFUSALS}
        gate={gate}
        blank={typed.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid="category-delete-slug"
            className={controlClass(
              gate.marks.some((mark) => mark.field === "confirmSlug"),
              false,
              "dialog",
            )}
            value={typed}
            placeholder={category.slug}
            onChange={(event) => setTyped(event.target.value)}
          />
        )}
      </Field>
      <CategoryDialogAlert message={message} />
    </CategoryModal>
  );
}

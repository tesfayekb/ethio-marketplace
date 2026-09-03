import { useState, type ReactNode } from "react";

import { FormField } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import {
  activeParentOptions,
  deriveSlugPreview,
  type CategoryNode,
  type CategoryRow,
} from "./categories-service";
import {
  useAddCategoryPointer,
  useCategoryPointers,
  useCreateCategory,
  useDeleteCategory,
  useMoveCategoryPointer,
  useRemoveCategoryPointer,
  useRetireCategory,
  useSetCategoryWindow,
  useSetCountryExclusions,
  useUpdateCategory,
} from "./use-categories";

/**
 * C2-UI — the categories console's write surfaces.
 *
 * Every submit runs through the step-up `guard` handed down by the page's
 * StepUpGate; the RPC behind it re-checks the permission AND the step-up
 * server-side (F3), so a refusal here is a translated error, never a silent
 * no-op (F4). 360-first: full-width controls, ≥44px targets, logical spacing.
 */

export const SELECT_CLASS =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

export function CategoryModal({
  testid,
  title,
  openedBy,
  onClose,
  children,
}: {
  testid: string;
  title: string;
  /** C2-GHOST PART B — the confession channel: WHO opened this surface. */
  openedBy: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent
        data-testid={testid}
        data-opened-by={openedBy}
        className="block w-[min(32rem,calc(100vw-1.5rem))] max-w-lg border-0 bg-transparent p-0 shadow-none"
      >
        <DialogTitle asChild>
          <h2 className="sr-only">{title}</h2>
        </DialogTitle>
        <PageCard className="max-h-[80vh] w-full space-y-3 overflow-y-auto">
          <p className="text-base font-semibold text-foreground">{title}</p>
          {children}
        </PageCard>
      </DialogContent>
    </Dialog>
  );
}

function ErrorLine({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" data-testid="category-dialog-error" className="text-sm text-destructive">
      {message}
    </p>
  );
}

// The page's verb bar shares this exact refusal mapping (B1: one utility per
// concern); the rule only warns about fast-refresh granularity, not correctness.
// eslint-disable-next-line react-refresh/only-export-components
export function useSubmitError() {
  const { t } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  /**
   * F4 — a server refusal raises a TRANSLATION KEY (e.g. C2g's
   * `admin.categories.error.catchallParent`); it is rendered through `t`, so
   * the operator never reads a raw key. Anything else falls back to the
   * generic save failure.
   */
  const fail = (error: unknown) => {
    const raw = error instanceof Error ? error.message : "";
    if (raw.startsWith("admin.categories.error.")) {
      setMessage(t(raw as Parameters<typeof t>[0]));
      return;
    }
    setMessage(raw === "" ? t("admin.categories.error.saveFailed") : raw);
  };
  return { message, setMessage, fail };
}

/* ------------------------------- create ---------------------------------- */

export function CreateCategoryDialog({
  parents,
  guard,
  openedBy,
  onClose,
}: {
  parents: CategoryNode[];
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const create = useCreateCategory();
  const { message, setMessage, fail } = useSubmitError();
  const [nameEn, setNameEn] = useState("");
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState("");
  const [allowListings, setAllowListings] = useState(true);

  const submit = () => {
    setMessage(null);
    if (nameEn.trim().length === 0) {
      setMessage(t("admin.categories.error.nameRequired"));
      return;
    }
    void guard(async () => {
      try {
        await create.mutateAsync({
          nameEn: nameEn.trim(),
          icon: icon.trim(),
          parentId: parentId === "" ? null : parentId,
          allowListings,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-create-dialog"
      openedBy={openedBy}
      title={t("admin.categories.create.title")}
      onClose={onClose}
    >
      <FormField label={t("admin.categories.create.name")} htmlFor="category-create-name">
        <Input
          id="category-create-name"
          data-testid="category-create-name"
          value={nameEn}
          onChange={(event) => setNameEn(event.target.value)}
        />
      </FormField>
      {/* C2c — the slug is no longer typed. This is a PREVIEW of what the
          server will derive; the RPC owns the final value and any -2/-3
          uniqueness suffix, so there is exactly one authority (F3). */}
      <p className="text-sm text-muted-foreground">
        <span>{t("admin.categories.create.slugPreview")}</span>{" "}
        <span data-testid="category-create-slug-preview" className="break-all font-mono">
          {deriveSlugPreview(nameEn.trim())}
        </span>
      </p>
      <FormField label={t("admin.categories.create.icon")} htmlFor="category-create-icon">
        <Input
          id="category-create-icon"
          data-testid="category-create-icon"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.create.parent")} htmlFor="category-create-parent">
        <select
          id="category-create-parent"
          data-testid="category-create-parent"
          className={SELECT_CLASS}
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
        >
          <option value="">{t("admin.categories.create.parentRoot")}</option>
          {activeParentOptions(parents).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <Checkbox
          data-testid="category-create-allow"
          checked={allowListings}
          onCheckedChange={(checked) => setAllowListings(checked === true)}
        />
        {t("admin.categories.field.allowListings")}
      </label>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={create.isPending}
        submitTestId="category-create-submit"
      />
    </CategoryModal>
  );
}

function DialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
  submitLabel,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
  submitLabel?: string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        data-testid="category-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
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

/* -------------------------------- edit ----------------------------------- */

export function EditCategoryDialog({
  category,
  guard,
  verbBar,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  guard: GuardFn;
  /**
   * UI-FIX-4 — the editor is the console's ONE interaction surface (the Roles
   * model). The row carries Edit alone; every other verb arrives here as a
   * wrapping full-text bar rendered above the fields.
   */
  verbBar?: ReactNode;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const update = useUpdateCategory();
  const { message, setMessage, fail } = useSubmitError();
  const [nameEn, setNameEn] = useState(category.nameEn);
  const [icon, setIcon] = useState(category.icon ?? "");
  const [allowListings, setAllowListings] = useState(category.allowListings);
  const [priceEnabled, setPriceEnabled] = useState(category.priceEnabled);
  // INC-143 — NULL renders EMPTY. No coalesce to a numeric literal anywhere.
  const [expiryDays, setExpiryDays] = useState(
    category.expiryDays === null ? "" : String(category.expiryDays),
  );

  const submit = () => {
    setMessage(null);
    if (nameEn.trim().length === 0) {
      setMessage(t("admin.categories.error.nameRequired"));
      return;
    }
    void guard(async () => {
      try {
        await update.mutateAsync({
          id: category.id,
          nameEn: nameEn.trim(),
          icon: icon.trim(),
          // C2-CLOSE Part C — the order is not typed here; Move up/down owns it.
          displayOrder: category.displayOrder,
          allowListings,
          priceEnabled,
          expiryDays: expiryDays.trim() === "" ? null : Number(expiryDays),
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-edit-dialog"
      openedBy={openedBy}
      title={t("admin.categories.edit.title")}
      onClose={onClose}
    >
      {verbBar}
      <FormField label={t("admin.categories.field.name")} htmlFor="category-edit-name">
        <Input
          id="category-edit-name"
          data-testid="category-edit-name"
          value={nameEn}
          onChange={(event) => setNameEn(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.field.icon")} htmlFor="category-edit-icon">
        <Input
          id="category-edit-icon"
          data-testid="category-edit-icon"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
        />
      </FormField>
      {/**
       * C2-CLOSE Part C — DISPLAY ORDER IS LIVE, NOT TYPED. The field mirrors
       * the LIVE roster row (the editor re-reads it on every render, INC-142),
       * so a Move up/down updates it immediately; the operator changes it with
       * the Move verbs, never by typing.
       */}
      <FormField
        label={t("admin.categories.field.order")}
        htmlFor="category-edit-order"
        help={t("admin.categories.field.orderManaged")}
      >
        <Input
          id="category-edit-order"
          data-testid="category-edit-order"
          inputMode="numeric"
          readOnly
          value={String(category.displayOrder)}
        />
      </FormField>
      <FormField label={t("admin.categories.field.expiryDays")} htmlFor="category-edit-expiry">
        <Input
          id="category-edit-expiry"
          data-testid="category-edit-expiry"
          inputMode="numeric"
          placeholder={t("admin.categories.field.expiryNone")}
          value={expiryDays}
          onChange={(event) => setExpiryDays(event.target.value)}
        />
      </FormField>
      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <Checkbox
          data-testid="category-edit-allow"
          checked={allowListings}
          onCheckedChange={(checked) => setAllowListings(checked === true)}
        />
        {t("admin.categories.field.allowListings")}
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <Checkbox
          data-testid="category-edit-price"
          checked={priceEnabled}
          onCheckedChange={(checked) => setPriceEnabled(checked === true)}
        />
        {t("admin.categories.field.priceEnabled")}
      </label>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={update.isPending}
        submitTestId="category-edit-submit"
      />
    </CategoryModal>
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
  const { message, setMessage, fail } = useSubmitError();
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
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.window.hint")}</p>
      <FormField label={t("admin.categories.window.from")} htmlFor="category-window-from">
        <Input
          id="category-window-from"
          data-testid="category-window-from"
          type="datetime-local"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.window.until")} htmlFor="category-window-until">
        <Input
          id="category-window-until"
          data-testid="category-window-until"
          type="datetime-local"
          value={until}
          onChange={(event) => setUntil(event.target.value)}
        />
      </FormField>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={setWindow.isPending}
        submitTestId="category-window-submit"
      />
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
  const { message, setMessage, fail } = useSubmitError();
  const [codes, setCodes] = useState<string[]>(category.excludedCountryCodes);

  const toggle = (code: string, on: boolean) =>
    setCodes((prev) => (on ? [...prev, code] : prev.filter((entry) => entry !== code)));

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
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.exclusions.hint")}</p>
      <p data-testid="category-exclusions-current" className="text-sm text-foreground">
        {`${t("admin.categories.exclusions.current")}: ${category.exclusionCount}`}
      </p>
      <div className="grid max-h-64 grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
        {countries.map((country) => (
          <label
            key={country.code}
            className="flex min-h-11 items-center gap-2 text-sm text-foreground"
          >
            <Checkbox
              data-testid={`category-exclusion-${country.code}`}
              checked={codes.includes(country.code)}
              onCheckedChange={(checked) => toggle(country.code, checked === true)}
            />
            <span className="min-w-0 break-words">{`${country.code} — ${country.nameEn}`}</span>
          </label>
        ))}
      </div>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={setExclusions.isPending}
        submitTestId="category-exclusions-submit"
      />
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
  const { message, setMessage, fail } = useSubmitError();
  const [reassignTo, setReassignTo] = useState("");

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
    if (hasListings && reassignTo === "") {
      setMessage(t("admin.categories.error.reassignRequired"));
      return;
    }
    void guard(async () => {
      try {
        await retire.mutateAsync({
          id: category.id,
          reassignTo: hasListings ? reassignTo : (null as unknown as string),
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
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.retire.hint")}</p>
      {hasListings ? (
        <FormField
          label={t("admin.categories.retire.reassignCount").replace(
            "{count}",
            String(listingCount),
          )}
          htmlFor="category-retire-target"
        >
          <select
            id="category-retire-target"
            data-testid="category-retire-target"
            className={SELECT_CLASS}
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
          </select>
        </FormField>
      ) : (
        <p className="text-sm text-muted-foreground" data-testid="category-retire-no-listings">
          {t("admin.categories.retire.noListings")}
        </p>
      )}
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={retire.isPending}
        submitTestId="category-retire-submit"
        submitLabel={t("admin.categories.retire.confirm")}
      />
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
  const { message, setMessage, fail } = useSubmitError();
  const [parentId, setParentId] = useState("");

  const submit = () => {
    setMessage(null);
    if (parentId === "") {
      setMessage(t("admin.categories.error.parentRequired"));
      return;
    }
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
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.pointer.hint")}</p>
      <FormField label={t("admin.categories.pointer.parent")} htmlFor="category-pointer-parent">
        <select
          id="category-pointer-parent"
          data-testid="category-pointer-parent"
          className={SELECT_CLASS}
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
        >
          <option value="">{t("admin.categories.pointer.parentPlaceholder")}</option>
          {activeParentOptions(parents, category.id).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={addPointer.isPending}
        submitTestId="category-pointer-submit"
      />
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
  const addPointer = useAddCategoryPointer();
  const { message, setMessage, fail } = useSubmitError();
  const [addParentId, setAddParentId] = useState("");

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

  const busy = movePointer.isPending || removePointer.isPending || addPointer.isPending;

  return (
    <CategoryModal
      testid="category-paths-dialog"
      openedBy={openedBy}
      title={t("admin.categories.paths.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.paths.hint")}</p>

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
              <p className="min-w-0 break-words text-sm text-foreground">
                {pointer.parentNameEn ?? t("admin.categories.paths.root")}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  aria-label={t("admin.categories.paths.moveTo")}
                  data-testid={`category-path-move-${pointer.pointerId}`}
                  className={SELECT_CLASS}
                  value={pointer.parentId ?? ""}
                  disabled={busy}
                  onChange={(event) => {
                    const next = event.target.value === "" ? null : event.target.value;
                    run(() =>
                      movePointer.mutateAsync({ pointerId: pointer.pointerId, newParentId: next }),
                    );
                  }}
                >
                  <option value="">{t("admin.categories.paths.root")}</option>
                  {candidates.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  data-testid={`category-path-remove-${pointer.pointerId}`}
                  disabled={busy}
                  onClick={() => run(() => removePointer.mutateAsync(pointer.pointerId))}
                >
                  {t("admin.categories.paths.remove")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <FormField label={t("admin.categories.paths.add")} htmlFor="category-paths-add">
        <select
          id="category-paths-add"
          data-testid="category-paths-add"
          className={SELECT_CLASS}
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
        </select>
      </FormField>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={() => {
          if (addParentId === "") {
            setMessage(t("admin.categories.error.parentRequired"));
            return;
          }
          run(async () => {
            await addPointer.mutateAsync({ parentId: addParentId, childId: category.id });
            setAddParentId("");
          });
        }}
        busy={busy}
        submitTestId="category-paths-add-submit"
        submitLabel={t("admin.categories.paths.addSubmit")}
      />
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
  const { message, setMessage, fail } = useSubmitError();
  const [typed, setTyped] = useState("");

  const submit = () => {
    setMessage(null);
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
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.delete.hint")}</p>
      <FormField label={t("admin.categories.delete.confirmLabel")} htmlFor="category-delete-slug">
        <Input
          id="category-delete-slug"
          data-testid="category-delete-slug"
          className="h-11"
          value={typed}
          placeholder={category.slug}
          onChange={(event) => setTyped(event.target.value)}
        />
      </FormField>
      <ErrorLine message={message} />
      <DialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={remove.isPending}
        submitTestId="category-delete-submit"
        submitLabel={t("admin.categories.delete.confirm")}
      />
    </CategoryModal>
  );
}

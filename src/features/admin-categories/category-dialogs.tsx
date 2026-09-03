import { useState, type ReactNode } from "react";

import { FormField } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import type { CategoryNode, CategoryRow } from "./categories-service";
import {
  useAddCategoryPointer,
  useCreateCategory,
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
  onClose,
  children,
}: {
  testid: string;
  title: string;
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

function useSubmitError() {
  const { t } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) =>
    setMessage(error instanceof Error ? error.message : t("admin.categories.error.saveFailed"));
  return { message, setMessage, fail };
}

/* ------------------------------- create ---------------------------------- */

export function CreateCategoryDialog({
  parents,
  guard,
  onClose,
}: {
  parents: CategoryNode[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const create = useCreateCategory();
  const { message, setMessage, fail } = useSubmitError();
  const [slug, setSlug] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState("");
  const [allowListings, setAllowListings] = useState(true);

  const submit = () => {
    setMessage(null);
    if (slug.trim().length === 0) {
      setMessage(t("admin.categories.error.slugRequired"));
      return;
    }
    if (nameEn.trim().length === 0) {
      setMessage(t("admin.categories.error.nameRequired"));
      return;
    }
    void guard(async () => {
      try {
        await create.mutateAsync({
          slug: slug.trim(),
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
      title={t("admin.categories.create.title")}
      onClose={onClose}
    >
      <FormField label={t("admin.categories.create.slug")} htmlFor="category-create-slug">
        <Input
          id="category-create-slug"
          data-testid="category-create-slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.create.name")} htmlFor="category-create-name">
        <Input
          id="category-create-name"
          data-testid="category-create-name"
          value={nameEn}
          onChange={(event) => setNameEn(event.target.value)}
        />
      </FormField>
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
          {parents.map((row) => (
            <option key={row.id} value={row.id}>
              {`${"— ".repeat(row.depth)}${row.nameEn}`}
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
  onClose,
}: {
  category: CategoryRow;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const update = useUpdateCategory();
  const { message, setMessage, fail } = useSubmitError();
  const [nameEn, setNameEn] = useState(category.nameEn);
  const [icon, setIcon] = useState(category.icon ?? "");
  const [displayOrder, setDisplayOrder] = useState(String(category.displayOrder));
  const [allowListings, setAllowListings] = useState(category.allowListings);
  const [priceEnabled, setPriceEnabled] = useState(category.priceEnabled);
  const [expiryDays, setExpiryDays] = useState(String(category.expiryDays ?? 30));

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
          displayOrder: Number(displayOrder) || 0,
          allowListings,
          priceEnabled,
          expiryDays: Number(expiryDays) || 0,
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
      title={t("admin.categories.edit.title")}
      onClose={onClose}
    >
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
      <FormField label={t("admin.categories.field.order")} htmlFor="category-edit-order">
        <Input
          id="category-edit-order"
          data-testid="category-edit-order"
          inputMode="numeric"
          value={displayOrder}
          onChange={(event) => setDisplayOrder(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.field.expiryDays")} htmlFor="category-edit-expiry">
        <Input
          id="category-edit-expiry"
          data-testid="category-edit-expiry"
          inputMode="numeric"
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

export function CategoryWindowDialog({
  category,
  guard,
  onClose,
}: {
  category: CategoryRow;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setWindow = useSetCategoryWindow();
  const { message, setMessage, fail } = useSubmitError();
  const [from, setFrom] = useState(category.visibleFrom?.slice(0, 10) ?? "");
  const [until, setUntil] = useState(category.visibleUntil?.slice(0, 10) ?? "");

  const submit = () => {
    setMessage(null);
    void guard(async () => {
      try {
        await setWindow.mutateAsync({
          id: category.id,
          visibleFrom: from === "" ? null : new Date(`${from}T00:00:00Z`).toISOString(),
          visibleUntil: until === "" ? null : new Date(`${until}T23:59:59Z`).toISOString(),
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
      title={t("admin.categories.window.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.window.hint")}</p>
      <FormField label={t("admin.categories.window.from")} htmlFor="category-window-from">
        <Input
          id="category-window-from"
          data-testid="category-window-from"
          type="date"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
      </FormField>
      <FormField label={t("admin.categories.window.until")} htmlFor="category-window-until">
        <Input
          id="category-window-until"
          data-testid="category-window-until"
          type="date"
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
  onClose,
}: {
  category: CategoryRow;
  countries: { code: string; nameEn: string }[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setExclusions = useSetCountryExclusions();
  const { message, setMessage, fail } = useSubmitError();
  const [codes, setCodes] = useState<string[]>([]);

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
  onClose,
}: {
  category: CategoryRow;
  targets: CategoryNode[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const retire = useRetireCategory();
  const { message, setMessage, fail } = useSubmitError();
  const [reassignTo, setReassignTo] = useState("");

  const submit = () => {
    setMessage(null);
    if (reassignTo === "") {
      setMessage(t("admin.categories.error.reassignRequired"));
      return;
    }
    void guard(async () => {
      try {
        await retire.mutateAsync({ id: category.id, reassignTo });
        onClose();
      } catch (error) {
        fail(error);
      }
    });
  };

  return (
    <CategoryModal
      testid="category-retire-dialog"
      title={t("admin.categories.retire.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.categories.retire.hint")}</p>
      <FormField label={t("admin.categories.retire.reassign")} htmlFor="category-retire-target">
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
  onClose,
}: {
  category: CategoryRow;
  parents: CategoryNode[];
  guard: GuardFn;
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
          {parents
            .filter((row) => row.id !== category.id)
            .map((row) => (
              <option key={row.id} value={row.id}>
                {`${"— ".repeat(row.depth)}${row.nameEn}`}
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

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const create = vi.fn((_input: unknown) => Promise.resolve("new-id"));
const update = vi.fn((_input: unknown) => Promise.resolve());
const retire = vi.fn((_input: unknown) => Promise.resolve());
const addPointer = vi.fn((_input: unknown) => Promise.resolve());
const remove = vi.fn((_input: unknown) => Promise.resolve());
const idle = (mutateAsync: (input: unknown) => Promise<unknown>) => ({
  mutateAsync,
  isPending: false,
});

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => false, language: "en" }),
}));
vi.mock("@/lib/use-settling", () => ({ useSettling: () => false }));
vi.mock("./category-image-dialog", () => ({ CategoryImagePanel: () => null }));
vi.mock("./category-images-service", () => ({
  suggestCategoryIcon: () => new Promise(() => {}),
}));
vi.mock("./use-categories", () => ({
  ADMIN_CATEGORIES_KEY: ["admin-categories"],
  useCreateCategory: () => idle(create),
  useUpdateCategory: () => idle(update),
  useSetCountryExclusions: () => idle(() => Promise.resolve()),
  useReorderCategories: () => idle(() => Promise.resolve()),
  useRetireCategory: () => idle(retire),
  useAddCategoryPointer: () => idle(addPointer),
  useDeleteCategory: () => idle(remove),
  useCategoryPointers: () => ({ isLoading: false, error: null, data: [] }),
  useMoveCategoryPointer: () => idle(() => Promise.resolve()),
  useRemoveCategoryPointer: () => idle(() => Promise.resolve()),
  useSetPrimaryPointer: () => idle(() => Promise.resolve()),
  useSetCategoryWindow: () => idle(() => Promise.resolve()),
}));

import type { CategoryNode } from "./categories-service";
import {
  AddPointerDialog,
  CategoryEditorDialog,
  CategoryPathsDialog,
  DeleteCategoryDialog,
  RetireCategoryDialog,
} from "./category-dialogs";

const guard: GuardFn = (action) => Promise.resolve(action());

function node(id: string, extra: Partial<CategoryNode> = {}): CategoryNode {
  return {
    id,
    parentId: null,
    slug: id,
    nameEn: id,
    icon: "Car",
    displayOrder: 7,
    isActive: true,
    isCatchall: false,
    allowListings: true,
    priceEnabled: true,
    expiryDays: null,
    visibleFrom: null,
    visibleUntil: null,
    listingCount: 0,
    exclusionCount: 0,
    excludedCountryCodes: [],
    hasImage: false,
    attributeCount: 0,
    cardAttributeCount: 0,
    secondaryParentNames: [],
    depth: 0,
    ...extra,
  };
}

const refusalOf = (field: string) =>
  document.querySelector(`[data-testid="form-field-refusal"][data-field="${field}"]`);

function mountEditor(category: CategoryNode | null) {
  render(
    <CategoryEditorDialog
      mode={category === null ? "create" : "edit"}
      category={category}
      parents={[]}
      countries={[]}
      guard={guard}
      openedBy="test"
      onClose={() => {}}
    />,
  );
}

beforeEach(() => {
  for (const fn of [create, update, retire, addPointer, remove]) fn.mockClear();
});

describe("the categories console's forms on the one Field (L4, DEC-339)", () => {
  it("KFC-1 a blank name is refused under the name; the gate stays closed and nothing is sent", async () => {
    mountEditor(null);
    fireEvent.click(await waitFor(() => screen.getByTestId("category-create-submit")));
    await waitFor(() => expect(refusalOf("category-create-name")).not.toBeNull());
    expect(refusalOf("category-create-name")?.textContent).toBe("post.refusal.required");
    expect(screen.getByTestId("category-create-name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByTestId("category-create-name")).toHaveAttribute(
      "aria-describedby",
      "category-create-name-refusal",
    );
    expect(screen.queryByTestId("category-dialog-error")).toBeNull();
    expect(create).not.toHaveBeenCalled();
  });

  it("KFC-2 once the name is given the gate opens, the refusal goes and the create is sent", async () => {
    mountEditor(null);
    fireEvent.click(await waitFor(() => screen.getByTestId("category-create-submit")));
    await waitFor(() => expect(refusalOf("category-create-name")).not.toBeNull());
    fireEvent.change(screen.getByTestId("category-create-name"), { target: { value: "Cars" } });
    await waitFor(() => expect(refusalOf("category-create-name")).toBeNull());
    fireEvent.click(screen.getByTestId("category-create-submit"));
    await waitFor(() => expect(create).toHaveBeenCalledTimes(1));
    expect(create.mock.calls[0]?.[0]).toMatchObject({ nameEn: "Cars", expiryDays: null });
  });

  it("KFC-3 an expiry that is not a whole number of at least 1 is refused under it; 30 is sent", async () => {
    mountEditor(node("cat-a"));
    const expiry = await waitFor(() => screen.getByTestId("category-edit-expiry"));
    for (const raw of ["0", "1.5", "abc", "-3"]) {
      fireEvent.change(expiry, { target: { value: raw } });
      fireEvent.click(screen.getByTestId("category-edit-submit"));
      await waitFor(() =>
        expect(refusalOf("category-edit-expiry")?.textContent).toBe("post.refusal.badType"),
      );
      expect(expiry).toHaveAttribute("aria-invalid", "true");
    }
    expect(update).not.toHaveBeenCalled();
    fireEvent.change(expiry, { target: { value: "30" } });
    fireEvent.click(screen.getByTestId("category-edit-submit"));
    await waitFor(() => expect(update).toHaveBeenCalledTimes(1));
    expect(update.mock.calls[0]?.[0]).toMatchObject({ expiryDays: 30, displayOrder: 7 });
    expect(refusalOf("category-edit-expiry")).toBeNull();
  });

  it("KFC-4 the order box shows the stored order, read-only, inside the Field", async () => {
    mountEditor(node("cat-a", { displayOrder: 12 }));
    const order = await waitFor(() => screen.getByTestId("category-edit-order"));
    expect(order).toHaveValue("12");
    expect(order).toHaveAttribute("readonly");
    expect(order.closest('[data-form-field][data-field="category-edit-order"]')).not.toBeNull();
  });

  it("KFC-5 a blank delete confirmation is the gate's; a wrong one stays the dialog's own words", async () => {
    render(
      <DeleteCategoryDialog
        category={node("old-cat", { isActive: false })}
        guard={guard}
        openedBy="test"
        onClose={() => {}}
      />,
    );
    fireEvent.click(await waitFor(() => screen.getByTestId("category-delete-submit")));
    await waitFor(() => expect(refusalOf("category-delete-slug")).not.toBeNull());
    expect(screen.queryByTestId("category-dialog-error")).toBeNull();
    fireEvent.change(screen.getByTestId("category-delete-slug"), { target: { value: "nope" } });
    fireEvent.click(screen.getByTestId("category-delete-submit"));
    await waitFor(() =>
      expect(screen.getByTestId("category-dialog-error")).toHaveTextContent(
        "admin.categories.delete.mismatch",
      ),
    );
    expect(refusalOf("category-delete-slug")).toBeNull();
    expect(remove).not.toHaveBeenCalled();
  });

  it("KFC-6 a blank retire target, pointer parent or path parent is refused at its field; nothing is sent", async () => {
    const a = node("cat-a", { listingCount: 3 });
    const { unmount } = render(
      <RetireCategoryDialog
        category={a}
        targets={[a, node("cat-b")]}
        guard={guard}
        openedBy="test"
        onClose={() => {}}
      />,
    );
    fireEvent.click(await waitFor(() => screen.getByTestId("category-retire-submit")));
    await waitFor(() => expect(refusalOf("category-retire-target")).not.toBeNull());
    unmount();

    const second = render(
      <AddPointerDialog
        category={a}
        parents={[node("cat-b")]}
        guard={guard}
        openedBy="test"
        onClose={() => {}}
      />,
    );
    fireEvent.click(await waitFor(() => screen.getByTestId("category-pointer-submit")));
    await waitFor(() => expect(refusalOf("category-pointer-parent")).not.toBeNull());
    second.unmount();

    render(
      <CategoryPathsDialog
        category={a}
        parents={[node("cat-b")]}
        guard={guard}
        openedBy="test"
        onClose={() => {}}
      />,
    );
    fireEvent.click(await waitFor(() => screen.getByTestId("category-paths-add-submit")));
    await waitFor(() => expect(refusalOf("category-paths-add")).not.toBeNull());
    expect(screen.queryByTestId("category-dialog-error")).toBeNull();
    expect(retire).not.toHaveBeenCalled();
    expect(addPointer).not.toHaveBeenCalled();
  });
});

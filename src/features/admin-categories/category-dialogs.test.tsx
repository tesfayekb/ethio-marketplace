import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DIALOG_FIELD } from "@/components/ui/dialog-look";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => `T(${key})` }),
}));

const retire = vi.fn((input: { id: string; reassignTo: string | null }) =>
  Promise.resolve(input.id),
);
vi.mock("./use-categories", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./use-categories")>()),
  useRetireCategory: () => ({ mutateAsync: retire, isPending: false }),
}));

import type { CategoryNode } from "./categories-service";
import { RetireCategoryDialog, useSubmitError } from "./category-dialogs";

describe("category screen refusal (turn D1 stop 11, G0.2)", () => {
  it("CDR-1: a save refused by a rate gate shows the shared admin.error.rateLimited", () => {
    const { result } = renderHook(() => useSubmitError());
    // PostgREST hands the door's RAISE EXCEPTION 'rateLimited' over as a plain object.
    act(() => result.current.fail({ message: "rateLimited", code: "P0001" }));
    expect(result.current.message).toBe("T(admin.error.rateLimited)");
  });
});

function node(id: string, listingCount: number): CategoryNode {
  return {
    id,
    parentId: null,
    slug: id,
    nameEn: id,
    icon: null,
    displayOrder: 1,
    isActive: true,
    isCatchall: false,
    allowListings: true,
    priceEnabled: true,
    expiryDays: null,
    visibleFrom: null,
    visibleUntil: null,
    listingCount,
    exclusionCount: 0,
    excludedCountryCodes: [],
    hasImage: false,
    attributeCount: 0,
    cardAttributeCount: 0,
    secondaryParentNames: [],
    depth: 0,
  };
}

const guard: GuardFn = (action) => Promise.resolve(action());

function mountRetire(listingCount: number) {
  const category = node("cat-a", listingCount);
  render(
    <RetireCategoryDialog
      category={category}
      targets={[category, node("cat-b", 0)]}
      guard={guard}
      openedBy="test"
      onClose={() => {}}
    />,
  );
}

/**
 * Turn S6-2 — the retire dialog's target is NativeSelect, pressed in inside the panel, and a
 * category with nothing to move sends a plain null target (no cast).
 */
describe("RetireCategoryDialog (turn S6-2)", () => {
  it("CDR-2: the reassign target is NativeSelect with the panel's pressed-in field look", async () => {
    mountRetire(3);
    const target = await waitFor(() => screen.getByTestId("category-retire-target"));
    expect(target.tagName).toBe("SELECT");
    for (const cls of ["w-full", "h-11", "md:pointer-fine:h-9", ...DIALOG_FIELD.split(/\s+/)])
      expect(target).toHaveClass(cls);
    expect(target.closest("[data-dialog-panel]")).not.toBeNull();
  });

  it("CDR-3: a category with no listings retires with a null target", async () => {
    retire.mockClear();
    mountRetire(0);
    await waitFor(() => screen.getByTestId("category-retire-no-listings"));
    expect(screen.queryByTestId("category-retire-target")).toBeNull();
    fireEvent.click(screen.getByTestId("category-retire-submit"));
    await waitFor(() => expect(retire).toHaveBeenCalledWith({ id: "cat-a", reassignTo: null }));
  });
});

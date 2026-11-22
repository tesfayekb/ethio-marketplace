import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const upsert = vi.fn((_input: unknown) => Promise.resolve());
const updateLink = vi.fn(() => Promise.resolve(true));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => false, language: "en" }),
}));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@/lib/supabase-door", () => ({ rpc: vi.fn() }));
vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({
    children,
    footer,
    subject,
    description,
  }: {
    children: ReactNode;
    footer?: ReactNode;
    subject?: ReactNode;
    description?: string;
  }) => (
    <div>
      {description}
      {subject}
      {children}
      {footer}
    </div>
  ),
}));
vi.mock("@/features/admin-categories/use-categories", () => ({
  useAdminCategories: () => ({ data: [] }),
}));
vi.mock("./use-attribute-label", () => ({
  useAttributeLabel: () => (_id: string, name: string) => name,
}));
vi.mock("./use-attributes", () => ({
  useUpsertAttribute: () => ({ mutateAsync: upsert, isPending: false }),
  useAttributeCategories: () => ({ data: [] }),
  useRemovedAnswerHolders: () => ({ known: true, failed: false, total: 0 }),
  useDeleteAttribute: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useLinkAttribute: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useMergeAttributes: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useAttributeHolders: () => ({ data: 0 }),
  useUnlinkAttribute: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

import { AttributeEditorDialog } from "./attribute-dialogs";
import type { AttributeLink } from "./attributes-service";
import { AttributeLinkCells } from "./components/attribute-link-cells";

const guard: GuardFn = (action) => Promise.resolve(action());

const refusalAt = (id: string) =>
  document.querySelector(`[data-testid="form-field-refusal"][data-field="${id}"]`);

function openCreate() {
  render(
    <AttributeEditorDialog
      attribute={null}
      attributes={[]}
      mayDepend
      guard={guard}
      onClose={() => {}}
    />,
  );
}

describe("the attribute editor on the one Field and gate (DEC-339, wave 3)", () => {
  beforeEach(() => {
    upsert.mockClear();
    updateLink.mockClear();
  });

  it("KFA-4 a blank key and name are the gate's refusals, under each Field; nothing is sent", async () => {
    openCreate();
    fireEvent.click(screen.getByTestId("attribute-edit-submit"));
    await waitFor(() => expect(refusalAt("attribute-key")).not.toBeNull());
    expect(refusalAt("attribute-key")?.textContent).toBe("post.refusal.required");
    expect(refusalAt("attribute-name")?.textContent).toBe("post.refusal.required");
    const key = screen.getByTestId("attribute-key");
    expect(key.getAttribute("aria-invalid")).toBe("true");
    expect(key.getAttribute("aria-describedby")).toContain("attribute-key-refusal");
    expect(screen.queryByTestId("attribute-dialog-error")).toBeNull();
    expect(upsert).not.toHaveBeenCalled();
  });

  it("KFA-5 once the key and name are given the gate opens and its refusals leave", async () => {
    openCreate();
    fireEvent.click(screen.getByTestId("attribute-edit-submit"));
    await waitFor(() => expect(refusalAt("attribute-key")).not.toBeNull());
    fireEvent.change(screen.getByTestId("attribute-key"), { target: { value: "colour" } });
    fireEvent.change(screen.getByTestId("attribute-name"), { target: { value: "Colour" } });
    await waitFor(() => expect(refusalAt("attribute-key")).toBeNull());
    expect(refusalAt("attribute-name")).toBeNull();
    fireEvent.click(screen.getByTestId("attribute-edit-submit"));
    await waitFor(() => expect(upsert).toHaveBeenCalledTimes(1));
    expect(upsert.mock.calls[0]?.[0]).toMatchObject({ attrKey: "colour", nameEn: "Colour" });
  });

  it("KFA-6 an unreadable longest length is refused under its Field and never sent", async () => {
    openCreate();
    fireEvent.change(screen.getByTestId("attribute-key"), { target: { value: "vin" } });
    fireEvent.change(screen.getByTestId("attribute-name"), { target: { value: "VIN" } });
    fireEvent.change(screen.getByTestId("attribute-max-length"), { target: { value: "ten" } });
    fireEvent.click(screen.getByTestId("attribute-edit-submit"));
    await waitFor(() => expect(refusalAt("attribute-max-length")).not.toBeNull());
    expect(refusalAt("attribute-max-length")?.textContent).toBe("post.refusal.badType");
    expect(screen.getByTestId("attribute-max-length").getAttribute("aria-invalid")).toBe("true");
    expect(upsert).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("attribute-max-length"), { target: { value: "17" } });
    fireEvent.click(screen.getByTestId("attribute-edit-submit"));
    await waitFor(() => expect(upsert).toHaveBeenCalledTimes(1));
    expect(upsert.mock.calls[0]?.[0]).toMatchObject({ maxLength: 17 });
  });

  it("KFA-7 a number link's unreadable default is refused under its Field; the door is not called", async () => {
    const row: AttributeLink = {
      linkId: "link-1",
      attributeId: "attr-1",
      attrKey: "mileage",
      nameEn: "Mileage",
      attrType: "number",
      options: [],
      isRequired: false,
      isFilterable: false,
      displayOrder: 0,
      cardRank: null,
      factRank: null,
      dependsOnKey: null,
      allowedOptions: null,
      defaultValue: null,
      visibleWhen: null,
    };
    render(<AttributeLinkCells row={row} siblings={[row]} onSave={updateLink} />);
    fireEvent.change(screen.getByTestId("category-attribute-default-mileage"), {
      target: { value: "1e5" },
    });
    fireEvent.click(screen.getByTestId("category-attribute-save-default-mileage"));
    await waitFor(() => expect(refusalAt("default-link-1")).not.toBeNull());
    expect(refusalAt("default-link-1")?.textContent).toBe("post.refusal.badType");
    expect(updateLink).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("category-attribute-default-mileage"), {
      target: { value: "120" },
    });
    expect(refusalAt("default-link-1")).toBeNull();
    fireEvent.click(screen.getByTestId("category-attribute-save-default-mileage"));
    await waitFor(() => expect(updateLink).toHaveBeenCalledWith({ defaultValue: 120 }));
  });
});

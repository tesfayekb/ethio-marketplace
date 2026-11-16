import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const mutateAsync = vi.fn();

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => false, language: "en" }),
}));
vi.mock("@/features/admin-categories/category-dialogs", () => ({
  CategoryModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock("./use-locations", () => ({
  useUpsertLocation: () => ({ mutateAsync, isPending: false }),
}));

import { LocationCreateDialog } from "./location-dialogs";
import { LocationEditorDialog } from "./location-editor";
import type { LocationNode } from "./locations-service";

const guard = vi.fn(((action) => Promise.resolve(action())) as GuardFn);

function node(level: string, extra: Partial<LocationNode> = {}): LocationNode {
  return {
    id: `loc-${level}`,
    parentId: "parent-1",
    level,
    countryCode: "ET",
    slug: `a-${level}`,
    nameEn: `A ${level}`,
    iso: null,
    aliases: [],
    displayOrder: 4,
    centerLat: null,
    centerLng: null,
    isActive: true,
    path: `Ethiopia › ${level}`,
    ...extra,
  } as unknown as LocationNode;
}

const drawEditor = (row: LocationNode) =>
  render(
    <LocationEditorDialog
      row={row}
      guard={guard as unknown as GuardFn}
      verbBar={null}
      openedBy="test"
      onClose={() => {}}
    />,
  );
const type = (testid: string, value: string) =>
  fireEvent.change(screen.getByTestId(testid), { target: { value } });
const click = async (testid: string) => {
  await act(async () => {
    fireEvent.click(screen.getByTestId(testid));
  });
};
const refusalOf = (id: string) =>
  screen
    .queryAllByTestId("form-field-refusal")
    .find((line) => line.getAttribute("data-field") === id) ?? null;

describe("the places console on the one Field, gate and parser (L3, DEC-339)", () => {
  beforeEach(() => {
    mutateAsync.mockReset();
    mutateAsync.mockResolvedValue(undefined);
    guard.mockClear();
  });

  it("KFP-1 every answer sits in the one Field with its own id under its label", () => {
    drawEditor(node("region"));
    for (const [part, label] of [
      ["name", "name"],
      ["slug", "slug"],
      ["iso", "iso"],
      ["lat", "centerLat"],
      ["lng", "centerLng"],
      ["alias", "aliases"],
    ] as const) {
      const control = screen.getByTestId(`location-edit-${part}`);
      expect(control).toHaveAttribute("id", `location-edit-${part}`);
      expect(screen.getByLabelText(new RegExp(`^admin.locations.field.${label}`))).toBe(control);
    }
  });

  it("KFP-2 a blank name is marked by the gate and nothing is sent; once given, the line is gone", async () => {
    drawEditor(node("region"));
    type("location-edit-name", "  ");
    await click("location-editor-save");
    const name = screen.getByTestId("location-edit-name");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(refusalOf("location-edit-name")).toHaveTextContent("post.refusal.required");
    expect(name.getAttribute("aria-describedby")).toContain(
      refusalOf("location-edit-name")?.id ?? "missing",
    );
    expect(guard).not.toHaveBeenCalled();
    expect(mutateAsync).not.toHaveBeenCalled();
    type("location-edit-name", "Adama");
    await click("location-editor-save");
    expect(refusalOf("location-edit-name")).toBeNull();
    expect(mutateAsync).toHaveBeenCalledTimes(1);
  });

  it("KFP-3 at city level the blank coordinates are marked by the gate; nothing is sent", async () => {
    drawEditor(node("city"));
    await click("location-editor-save");
    expect(refusalOf("location-edit-lat")).toHaveTextContent("post.refusal.required");
    expect(refusalOf("location-edit-lng")).toHaveTextContent("post.refusal.required");
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("KFP-4 an out-of-range or unreadable coordinate is refused by the parser, never sent", async () => {
    drawEditor(node("city"));
    type("location-edit-lat", "91");
    type("location-edit-lng", "abc");
    await click("location-editor-save");
    expect(refusalOf("location-edit-lat")).toHaveTextContent("post.refusal.badType");
    expect(refusalOf("location-edit-lng")).toHaveTextContent("post.refusal.badType");
    expect(guard).not.toHaveBeenCalled();
    type("location-edit-lat", "8.54");
    type("location-edit-lng", "-180");
    await click("location-editor-save");
    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ centerLat: 8.54, centerLng: -180, displayOrder: 4 }),
    );
  });

  it("KFP-5 a decimal or blank order is refused in words, never sent as 0 or the old value", async () => {
    drawEditor(node("country"));
    for (const raw of ["1.5", ""]) {
      type("location-edit-order", raw);
      await click("location-editor-save");
      expect(refusalOf("location-edit-order")).toHaveTextContent("post.refusal.badType");
      expect(mutateAsync).not.toHaveBeenCalled();
    }
    type("location-edit-order", "7");
    await click("location-editor-save");
    expect(mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ displayOrder: 7 }));
  });

  it("KFP-8 the create dialog's parent holds no mark; a blank name stops the create", async () => {
    const region = node("region");
    render(
      <LocationCreateDialog
        parents={[region]}
        parentId={region.id}
        fixed={false}
        guard={guard as unknown as GuardFn}
        onClose={() => {}}
      />,
    );
    const parent = screen.getByTestId("location-create-parent");
    expect(parent).toHaveAttribute("id", "location-create-parent");
    await click("location-create-submit");
    expect(refusalOf("location-create-name")).toHaveTextContent("post.refusal.required");
    expect(mutateAsync).not.toHaveBeenCalled();
    type("location-create-name", "Adama");
    type("location-create-lat", "8.5");
    type("location-create-lng", "39.3");
    await click("location-create-submit");
    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        nameEn: "Adama",
        centerLat: 8.5,
        centerLng: 39.3,
        displayOrder: 0,
      }),
    );
  });
});

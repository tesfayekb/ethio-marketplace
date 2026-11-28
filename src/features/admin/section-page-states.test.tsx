import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
import { AdminSectionPage } from "./section-page";
afterEach(() => cleanup());
it("UFA-61 Images placeholder shows its catalogue heading, not-built title and image-tooling caption uf:A20.1", () => {
  render(<AdminSectionPage id="images" />);
  const page = screen.getByTestId("admin-section-images");
  expect(
    within(page).getByRole("heading", { level: 1, name: en["admin.section.images.title"] }),
  ).toBeVisible();
  expect(
    within(page).getByRole("heading", { level: 2, name: en["admin.comingSoon"] }),
  ).toBeVisible();
  expect(within(page).getByText(en["admin.section.images.body"])).toBeVisible();
  expect(within(page).queryByRole("button")).toBeNull();
});

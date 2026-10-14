import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { AiFeatureRow } from "./ai-service";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const shell = vi.hoisted(() => ({ permissions: ["services:view"] as string[] }));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: shell.permissions, accessDenied: false }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) =>
    children(async (work: () => Promise<void>) => work()),
}));
vi.mock("@/lib/use-settling", () => ({ useSettling: () => false }));

const ROWS: AiFeatureRow[] = [
  {
    feature: "photo_screen",
    on: true,
    offReason: null,
    offAt: null,
    monthlyBudgetCents: null,
    unit: "call",
    unitCostMicrousd: 2_000,
    monthSpentMicrousd: 4_000,
    monthCalls: 2,
    monthUnits: 2,
    todayCalls: 1,
    alertLevel: 0,
    updatedAt: "2026-10-13T18:00:00Z",
  },
  {
    feature: "writing_helper",
    on: false,
    offReason: "budget",
    offAt: "2026-10-12T09:00:00Z",
    monthlyBudgetCents: 500,
    unit: "call",
    unitCostMicrousd: 3_000,
    monthSpentMicrousd: 5_001_000,
    monthCalls: 1_667,
    monthUnits: 1_667,
    todayCalls: 0,
    alertLevel: 100,
    updatedAt: "2026-10-12T09:00:00Z",
  },
  {
    feature: "translations",
    on: true,
    offReason: null,
    offAt: null,
    monthlyBudgetCents: 1_000,
    unit: "character",
    unitCostMicrousd: 20,
    monthSpentMicrousd: 8_200_000,
    monthCalls: 3,
    monthUnits: 410_000,
    todayCalls: 0,
    alertLevel: 80,
    updatedAt: "",
  },
];
vi.mock("./use-ai-features", () => ({
  ADMIN_AI_KEY: ["ai"],
  useAiFeatures: () => ({ data: ROWS, isLoading: false, error: null }),
  useSetAiFeature: () => ({ isPending: false, mutateAsync: vi.fn() }),
  // Bundle 13 turn 14 — the spend by day below the table (its own tests: ai-spend-days.test.tsx).
  useAiSpendDays: () => ({ data: [], isLoading: false, error: null, refetch: vi.fn() }),
}));

import { AdminAiPage } from "./ai-page";

/** Bundle 13 turn 5 (D158) — the page draws each feature's state, spend and price; Edit needs manage. */
describe("AdminAiPage (D158)", () => {
  it("AIP-1 every row shows its state, the month's spend against its budget with its alert, and its price; Edit only with services:manage", () => {
    shell.permissions = ["services:view"];
    const { unmount } = render(<AdminAiPage />);
    const table = screen.getByRole("table");
    expect(within(table).getByTestId("ai-photo_screen-name").textContent).toBe(
      "admin.ai.feature.photo_screen",
    );
    expect(within(table).getByTestId("ai-photo_screen-state").textContent).toBe(
      "admin.ai.state.on",
    );
    expect(within(table).getByTestId("ai-photo_screen-spend").textContent).toBe(
      "admin.ai.spend.noBudget",
    );
    expect(within(table).getByTestId("ai-writing_helper-state").textContent).toBe(
      "admin.ai.state.off",
    );
    expect(within(table).getByTestId("ai-writing_helper-alert").textContent).toBe(
      "admin.ai.alert.full",
    );
    expect(within(table).getByTestId("ai-translations-alert").textContent).toBe(
      "admin.ai.alert.most",
    );
    expect(within(table).queryByTestId("ai-photo_screen-alert")).toBeNull();
    expect(within(table).getByTestId("ai-translations-calls").textContent).toContain(
      "admin.ai.calls.characters",
    );
    expect(within(table).getByTestId("ai-translations-price").textContent).toBe(
      "admin.ai.price.perMillion",
    );
    expect(screen.queryByTestId("ai-actions-photo_screen-edit")).toBeNull();
    unmount();

    shell.permissions = ["services:view", "services:manage"];
    render(<AdminAiPage />);
    expect(screen.getAllByTestId("ai-actions-writing_helper-edit").length).toBeGreaterThan(0);
  });

  it("AIP-2 each feature says what it does and who provides it under its name, and the spend by day follows the table", () => {
    shell.permissions = ["services:view"];
    render(<AdminAiPage />);
    const table = screen.getByRole("table");
    expect(within(table).getByTestId("ai-photo_screen-name").textContent).toBe(
      "admin.ai.feature.photo_screen",
    );
    expect(within(table).getByTestId("ai-photo_screen-about").textContent).toBe(
      "admin.ai.about.photo_screen",
    );
    expect(screen.getByTestId("ai-days")).toBeInTheDocument();
  });
});

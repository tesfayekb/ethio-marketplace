import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { enAdmin } from "@/i18n/locales/en-admin";

/**
 * F1-7b (CID-1) — the countries import dialog names the row reason the planner gained for a
 * country's own row (INC-1164): `permissionDenied`, its detail the action the caller lacks the
 * right for, in the shared places namespace's own sentence and never the generic one.
 */

const words = enAdmin as unknown as Record<string, string>;
const t = (key: string): string => words[key] ?? `T(${key})`;

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t, has: (key: string) => key in words }),
}));

const callRoute = vi.fn();
vi.mock("@/lib/route-client", () => ({ callRoute: (...args: unknown[]) => callRoute(...args) }));

vi.mock("@/features/auth/mfa/mfa-service", () => ({ stepUpAbortKey: () => undefined }));

vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

import { ImportCountriesDialog } from "./country-import-dialog";

async function previewWith(refusals: Record<string, unknown>[]) {
  callRoute.mockResolvedValueOnce({
    kind: "answered",
    ok: true,
    status: 200,
    payload: { digest: "d", counts: {}, refusals, ignored: [] },
  });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ImportCountriesDialog
        guard={(async (run: () => Promise<void>) => run()) as never}
        onClose={() => {}}
      />
    </QueryClientProvider>,
  );
  const file = new File(["countries"], "markets.csv", { type: "text/csv" });
  fireEvent.change(screen.getByTestId("country-import-countries"), { target: { files: [file] } });
  await waitFor(() => expect(screen.getByTestId("country-import-preview")).not.toBeDisabled());
  fireEvent.click(screen.getByTestId("country-import-preview"));
  await screen.findByTestId("country-import-refusals");
}

beforeEach(() => {
  callRoute.mockReset();
  document.body.innerHTML = "";
});

describe("the countries import dialog's row reasons (F1-7b)", () => {
  it("CID-1 permissionDenied draws its own sentence for either action, never the generic one", async () => {
    await previewWith([
      { file: "countries", row: 2, key: "XZ", reason: "permissionDenied", detail: "update" },
      { file: "countries", row: 3, key: "XY", reason: "permissionDenied", detail: "activate" },
    ]);
    const denied = words["admin.locations.import.reason.permissionDenied"] ?? "";
    expect(denied).not.toBe("");
    for (const row of [2, 3]) {
      const text = screen.getByTestId(`country-import-refusal-${row}`).textContent;
      expect(text).toContain(denied);
      expect(text).not.toContain(words["admin.locations.import.reason.unknown"]);
    }
  });
});

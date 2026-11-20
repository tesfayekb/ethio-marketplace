import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { enAdmin } from "@/i18n/locales/en-admin";

/**
 * F1-7b (LID-1) — the places import dialog names the two row reasons the planner gained: a
 * coordinate out of range (`badCoordinates`) and a country's own row the caller holds no right
 * over (`permissionDenied`, its detail the action), each in its own sentence and never as the
 * generic "this row was refused".
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

import { ImportLocationsDialog } from "./location-import-dialog";

const PREFIX = "admin.locations.import.reason";
const refusal = (row: number, reason: string, detail?: string) => ({
  file: "locations",
  row,
  key: `e2e-lid/row-${row}`,
  reason,
  ...(detail === undefined ? {} : { detail }),
});

async function previewWith(refusals: ReturnType<typeof refusal>[]) {
  callRoute.mockResolvedValueOnce({
    kind: "answered",
    ok: true,
    status: 200,
    payload: { digest: "d", counts: {}, refusals, ignored: [] },
  });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ImportLocationsDialog
        scope=""
        country=""
        guard={(async (run: () => Promise<void>) => run()) as never}
        onClose={() => {}}
      />
    </QueryClientProvider>,
  );
  const file = new File(["locations"], "places.csv", { type: "text/csv" });
  fireEvent.change(screen.getByTestId("location-import-locations"), { target: { files: [file] } });
  await waitFor(() => expect(screen.getByTestId("location-import-preview")).not.toBeDisabled());
  fireEvent.click(screen.getByTestId("location-import-preview"));
  await screen.findByTestId("location-import-refusals");
}

const rowText = (row: number) => screen.getByTestId(`location-import-refusal-${row}`).textContent;

beforeEach(() => {
  callRoute.mockReset();
  document.body.innerHTML = "";
});

describe("the places import dialog's row reasons (F1-7b)", () => {
  it("LID-1 badCoordinates and permissionDenied draw their own sentences, never the generic one", async () => {
    await previewWith([
      refusal(2, "badCoordinates"),
      refusal(3, "permissionDenied", "update"),
      refusal(4, "permissionDenied", "activate"),
    ]);
    const badCoordinates = words[`${PREFIX}.badCoordinates`] ?? "";
    const denied = words[`${PREFIX}.permissionDenied`] ?? "";
    expect(badCoordinates).not.toBe("");
    expect(denied).not.toBe("");
    expect(rowText(2)).toContain(badCoordinates);
    expect(rowText(3)).toContain(denied);
    expect(rowText(4)).toContain(denied);
    for (const row of [2, 3, 4]) expect(rowText(row)).not.toContain(words[`${PREFIX}.unknown`]);
  });
});

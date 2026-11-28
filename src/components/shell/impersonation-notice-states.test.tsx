import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
const state = vi.hoisted(() => ({ active: vi.fn(), end: vi.fn(), refresh: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@/features/admin/impersonation/impersonation-service", async (original) => ({
  ...(await original<typeof import("@/features/admin/impersonation/impersonation-service")>()),
  getActiveImpersonation: state.active,
  endImpersonation: state.end,
}));
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: state.refresh,
}));
import { ImpersonationNotice } from "./impersonation-notice";
beforeEach(() => {
  vi.resetAllMocks();
  state.active.mockResolvedValue({ id: "session-1" });
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
it("UFA-37 fallback banner offers End now, reports refusal without raw text, and Refresh page calls the shared refresh uf:A12.8", async () => {
  state.end.mockRejectedValue({ code: "P0D01", message: "unknownRefusal" });
  render(<ImpersonationNotice />);
  expect(screen.getByRole("status")).toHaveTextContent(en["impersonation.mayBeActive"]);
  const end = screen.getByRole("button", { name: en["impersonation.endNow"] });
  end.focus();
  fireEvent.keyDown(end, { key: "Enter" });
  fireEvent.click(end, { detail: 0 });
  const alert = await screen.findByTestId("impersonation-notice-failed");
  expect(alert).toHaveTextContent(en["impersonation.error.endFailed"]);
  expect(alert).not.toHaveTextContent("unknownRefusal");
  expect(state.end).toHaveBeenCalledWith("session-1");
  fireEvent.click(screen.getByRole("button", { name: en["common.refreshPage"] }));
  await waitFor(() => expect(state.refresh).toHaveBeenCalledTimes(1));
  expect(screen.getByTestId("impersonation-notice")).toBeVisible();
});

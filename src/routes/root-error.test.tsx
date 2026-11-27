import { fireEvent, render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { expect, it, vi } from "vitest";

/**
 * INC-918 / INC-914 (Foundations turn 34c) — the route error view's one cure is a fresh load:
 * "Try again" re-ran the loaders in the page, and a download that failed (the page's code, the
 * session's client) fails again until the page reloads.
 */
vi.mock("../i18n", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../i18n")>()),
  I18nProvider: ({ children }: { children: ReactNode }) => children,
  useI18n: () => ({ t: (key: string) => key }),
}));
vi.mock("../lib/lovable-error-reporting", () => ({ reportLovableError: () => undefined }));
const reports = vi.hoisted(() => ({ report: vi.fn() }));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: reports.report }));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: refreshed,
}));

const { Route } = await import("./__root");

it("REV-1 the route error view offers Refresh, never a Try again that cannot work", () => {
  const view = Route.options.errorComponent;
  if (typeof view !== "function") throw new Error("the root route has no error view");
  const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
  render(
    createElement(view, {
      error: new Error("the session could not be read: offline"),
      reset: () => undefined,
      info: { componentStack: "" },
    }),
  );
  expect(screen.getByText("error.pageFailed")).toBeTruthy();
  expect(screen.queryByText("common.tryAgain")).toBeNull();
  const refresh = screen.getByTestId("route-error-refresh");
  expect(refresh.textContent).toBe("common.refreshPage");
  fireEvent.click(refresh);
  expect(refreshed).toHaveBeenCalledTimes(1);
  errors.mockRestore();
});

it("REV-2 a crash the root boundary catches is reported once, as a crash (DEC-474 Part F)", () => {
  const view = Route.options.errorComponent;
  if (typeof view !== "function") throw new Error("the root route has no error view");
  const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
  reports.report.mockClear();
  const error = new Error("Cannot read properties of undefined (reading 'title')");
  render(createElement(view, { error, reset: () => undefined, info: { componentStack: "" } }));
  expect(reports.report).toHaveBeenCalledTimes(1);
  expect(reports.report).toHaveBeenCalledWith({ kind: "crash", code: null, error });
  errors.mockRestore();
});

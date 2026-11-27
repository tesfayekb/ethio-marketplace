import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ sendReport: vi.fn(() => Promise.resolve(true)) }));
vi.mock("@/lib/error-report-send", () => ({ sendReport: mocks.sendReport }));

import { listenForFailures, reportBrowserFailure } from "./error-report";

describe("the browser's one report trigger (DEC-474 Part F)", () => {
  afterEach(() => {
    mocks.sendReport.mockClear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("ERTR-1 a failure is handed to the sender, downloaded on demand", async () => {
    const error = new Error("boom");
    reportBrowserFailure({ kind: "crash", code: null, error });
    await vi.waitFor(() => expect(mocks.sendReport).toHaveBeenCalledTimes(1));
    expect(mocks.sendReport).toHaveBeenCalledWith({ kind: "crash", code: null, error });
  });

  it("ERTR-2 the page's unhandled error and rejection are reported; an error event with no error object is not", async () => {
    const target = new EventTarget() as Window;
    listenForFailures(target);
    const thrown = new Error("thrown");
    target.dispatchEvent(new ErrorEvent("error", { error: thrown, message: "thrown" }));
    target.dispatchEvent(new ErrorEvent("error", { message: "Script error." }));
    const rejected = Object.assign(new Event("unhandledrejection"), { reason: "rejected" });
    target.dispatchEvent(rejected);
    await vi.waitFor(() => expect(mocks.sendReport).toHaveBeenCalledTimes(2));
    expect(mocks.sendReport.mock.calls).toEqual([
      [{ kind: "unhandled", code: null, error: thrown }],
      [{ kind: "unhandled", code: null, error: "rejected" }],
    ]);
  });

  it("ERTR-3 the server reports nothing through it", async () => {
    vi.stubGlobal("window", undefined);
    reportBrowserFailure({ kind: "crash", code: null, error: new Error("boom") });
    await new Promise((settle) => setTimeout(settle, 20));
    expect(mocks.sendReport).not.toHaveBeenCalled();
  });

  it("ERTR-4 a sender that cannot download is logged once as [error-report] send failed, never thrown", async () => {
    vi.resetModules();
    vi.doMock("@/lib/error-report-send", () => {
      throw new Error("Failed to fetch dynamically imported module");
    });
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fresh = await import("./error-report");
    fresh.reportBrowserFailure({ kind: "crash", code: null, error: new Error("boom") });
    await vi.waitFor(() =>
      expect(
        logged.mock.calls.filter(([first]) => first === "[error-report] send failed"),
      ).toHaveLength(1),
    );
    vi.doUnmock("@/lib/error-report-send");
  });
});

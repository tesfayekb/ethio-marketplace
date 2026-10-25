import { afterEach, describe, expect, it, vi } from "vitest";

const originalError = console.error;
const originalWarn = console.warn;

async function loadCapture() {
  vi.resetModules();
  await import("./error-capture");
}

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

describe("error-capture console channel (INC-894, INC-893)", () => {
  it("ECAP-1 tags a stream render error for the census", async () => {
    const errorSpy = vi.fn();
    const warnSpy = vi.fn();
    console.error = errorSpy;
    console.warn = warnSpy;
    await loadCapture();

    console.error("Error in renderToReadableStream:", new ReferenceError("window is not defined"), {
      componentStack: "…",
    });

    expect(errorSpy).toHaveBeenCalledTimes(1);
    const args = errorSpy.mock.calls[0];
    expect(args[0]).toBe("[ssr-error] render");
    expect(args[1]).toBe("Error in renderToReadableStream:");
    expect(String(args[2])).toContain("ReferenceError: window is not defined");
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("ECAP-2 turns an abandoned request's unhandled 500 into one warning", async () => {
    const errorSpy = vi.fn();
    const warnSpy = vi.fn();
    console.error = errorSpy;
    console.warn = warnSpy;
    await loadCapture();

    const error = Object.assign(new Error("HTTPError"), {
      unhandled: true,
      status: 500,
      cause: new DOMException("This operation was aborted", "AbortError"),
    });
    console.error(error);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(String(warnSpy.mock.calls[0][0])).toContain("[aborted]");
  });

  it("ECAP-3 keeps a real unhandled error's full description", async () => {
    const errorSpy = vi.fn();
    const warnSpy = vi.fn();
    console.error = errorSpy;
    console.warn = warnSpy;
    await loadCapture();

    const error = Object.assign(new Error("HTTPError"), {
      unhandled: true,
      status: 500,
      cause: new TypeError("boom"),
    });
    console.error(error);

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
    const line = String(errorSpy.mock.calls[0][0]);
    expect(line).toContain("(status 500)");
    expect(line).toContain("caused by: TypeError: boom");
  });
});

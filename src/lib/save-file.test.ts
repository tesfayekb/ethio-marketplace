import { afterEach, describe, expect, it, vi } from "vitest";

import { saveBlobAs } from "./save-file";

function stubObjectUrls(made: string) {
  const create = vi.fn().mockReturnValue(made);
  const revoke = vi.fn();
  vi.stubGlobal("URL", Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke }));
  const clicks: Array<{ href: string; download: string; attached: boolean }> = [];
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clicks.push({ href: this.href, download: this.download, attached: this.isConnected });
  });
  return { create, revoke, clicks };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("saveBlobAs (DEC-370)", () => {
  it("SVF-1 saves the blob under its name through the app's object URL, once, and revokes it", () => {
    const { create, revoke, clicks } = stubObjectUrls("blob:https://ethio.com/0f8c-1");
    const blob = new Blob(["\ufeffkey\r\n"], { type: "text/csv" });
    saveBlobAs(blob, "ethio-terms-all-v1-text.md");
    expect(create).toHaveBeenCalledExactlyOnceWith(blob);
    expect(clicks).toEqual([
      {
        href: "blob:https://ethio.com/0f8c-1",
        download: "ethio-terms-all-v1-text.md",
        attached: true,
      },
    ]);
    expect(revoke).toHaveBeenCalledExactlyOnceWith("blob:https://ethio.com/0f8c-1");
    expect(document.querySelector("a[download]")).toBeNull();
  });

  it("SVF-2 an object URL that is not a blob: URL is refused before any click, and still revoked", () => {
    const { revoke, clicks } = stubObjectUrls("https://evil.example/x");
    expect(() => saveBlobAs(new Blob(["x"]), "x.txt")).toThrow("appObjectUrl: not an object URL");
    expect(clicks).toEqual([]);
    expect(revoke).toHaveBeenCalledExactlyOnceWith("https://evil.example/x");
    expect(document.querySelector("a[download]")).toBeNull();
  });
});

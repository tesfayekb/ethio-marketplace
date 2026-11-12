import { describe, expect, it } from "vitest";

import { appObjectUrl, safeHref, siteHref } from "./safe-href";

describe("safeHref (DEC-370)", () => {
  it.each([
    ["https://example.invalid/terms", "https://example.invalid/terms"],
    ["https://example.invalid", "https://example.invalid/"],
    ["mailto:one@example.invalid", "mailto:one@example.invalid"],
    ["tel:+251911000001", "tel:+251911000001"],
    ["/terms", "/terms"],
    ["/legal/publishing?country=ET#s-1", "/legal/publishing?country=ET#s-1"],
    ["#s-2", "#s-2"],
    ["  /terms\n", "/terms"],
  ])("SAFE-1 answers the normalised href for an allowed form: %s", (input, answer) => {
    expect(safeHref(input)).toBe(answer);
  });

  it("SAFE-2 a path with .. stays a path on the site", () => {
    expect(safeHref("/legal/../terms")).toBe("/terms");
    expect(safeHref("/../../etc/passwd")).toBe("/etc/passwd");
  });

  it.each([
    "http://example.invalid",
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "java\tscript:alert(1)",
    " \u0001javascript:alert(1)",
    "data:text/html,x",
    "blob:https://example.invalid/0f8c",
    "file:///etc/passwd",
    "//evil.example",
    "/\\evil.example",
    "/\t/evil.example",
    "https:evil.example",
    "terms",
    "?q=1",
    "#",
    "",
    "https://",
    "comgooglemaps://?q=Bole",
  ])("SAFE-3 refuses %j with null", (input) => {
    expect(safeHref(input)).toBeNull();
  });

  it("SAFE-4 refuses what is not a string", () => {
    for (const input of [null, undefined, 42, {}, ["/terms"]]) expect(safeHref(input)).toBeNull();
  });

  it("SAFE-5 an app scheme only when the caller asks, and never a refused scheme", () => {
    expect(safeHref("comgooglemaps://?q=Bole%2C%20Addis", { app: true })).toBe(
      "comgooglemaps://?q=Bole%2C%20Addis",
    );
    expect(safeHref("javascript:alert(1)", { app: true })).toBeNull();
    expect(safeHref("http://example.invalid", { app: true })).toBeNull();
  });
});

describe("siteHref (DEC-370)", () => {
  it("SAFE-6 the page's own origin, http included, and a root path", () => {
    expect(siteHref("https://ethio.com", "/terms")).toBe("https://ethio.com/terms");
    expect(siteHref("http://127.0.0.1:4173", "/?lang=am")).toBe("http://127.0.0.1:4173/?lang=am");
  });

  it("SAFE-7 refuses another origin, a relative path and a non-web origin", () => {
    expect(siteHref("https://ethio.com", "//evil.example/x")).toBeNull();
    expect(siteHref("https://ethio.com", "/\\evil.example")).toBeNull();
    expect(siteHref("https://ethio.com", "/\t/evil.example")).toBeNull();
    expect(siteHref("https://ethio.com", "terms")).toBeNull();
    expect(siteHref("https://ethio.com", "https://evil.example/")).toBeNull();
    expect(siteHref("javascript:alert(1)", "/terms")).toBeNull();
    expect(siteHref("not a url", "/terms")).toBeNull();
  });
});

describe("appObjectUrl (DEC-370)", () => {
  it("SAFE-8 passes an object URL and throws on anything else", () => {
    expect(appObjectUrl("blob:https://ethio.com/0f8c-1")).toBe("blob:https://ethio.com/0f8c-1");
    for (const input of ["https://ethio.com/x", "javascript:alert(1)", "/x", "not a url"])
      expect(() => appObjectUrl(input)).toThrow("appObjectUrl: not an object URL");
  });
});

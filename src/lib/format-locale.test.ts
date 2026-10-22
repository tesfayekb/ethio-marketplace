import { afterEach, describe, expect, it, vi } from "vitest";

import { formatLocale, languageRowName } from "./format-locale";

/** DEC-229 (bundle 22 turn 24) — dates and numbers in the reader's language, else English. */
describe("formatLocale (DEC-229)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("formats Amharic as am-ET", () => {
    expect(formatLocale("am")).toBe("am-ET");
  });

  it("formats English as en-GB", () => {
    expect(formatLocale("en")).toBe("en-GB");
  });

  it("formats a code the runtime supports as itself", () => {
    expect(formatLocale("fr")).toBe("fr");
  });

  it("formats a code the runtime does not support as en-GB", () => {
    vi.spyOn(Intl.DateTimeFormat, "supportedLocalesOf").mockImplementation((codes) =>
      ([] as string[]).concat(codes as string[]).filter((code) => code !== "om"),
    );
    expect(formatLocale("om")).toBe("en-GB");
  });

  it("formats a malformed tag as en-GB", () => {
    expect(formatLocale("not a tag!")).toBe("en-GB");
  });
});

describe("languageRowName (DEC-229)", () => {
  const rows = [
    { code: "en", name_native: "English" },
    { code: "om", name_native: "Afaan Oromoo" },
  ];

  it("names an acceptance in a third language by its language row", () => {
    expect(languageRowName("om", rows)).toBe("Afaan Oromoo");
  });

  it("names a language without a row by its bare code", () => {
    expect(languageRowName("ti", rows)).toBe("ti");
  });
});

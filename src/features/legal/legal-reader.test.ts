import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.hoisted(() => vi.fn());
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({ rpc }));
import { legalTextFor, myListingCertification, parseLegalVersion } from "./legal-reader";

const version = {
  version_id: "e2e-version",
  kind: "e2e-language",
  version: 1,
  body_en: "English text",
  body_am: "Amharic text",
  texts: { om: "Oromo text" },
  settings_snapshot: {},
  label: "scratch",
};

beforeEach(() => rpc.mockReset());

describe("legalTextFor (DEC-228)", () => {
  it.each([
    ["en", "English text"],
    ["am", "Amharic text"],
  ])("%s picks its required column", (language, text) => {
    expect(legalTextFor(version, language)).toEqual({ text, shown: language, fallback: false });
  });
  it("a language with a text picks it and records that language", () => {
    expect(legalTextFor(version, "om")).toEqual({
      text: "Oromo text",
      shown: "om",
      fallback: false,
    });
  });
  it("a missing language gives English and records English", () => {
    expect(legalTextFor(version, "ti")).toEqual({
      text: "English text",
      shown: "en",
      fallback: true,
    });
  });
  it("constructor is not a stored language text", () => {
    expect(legalTextFor(version, "constructor")).toEqual({
      text: "English text",
      shown: "en",
      fallback: true,
    });
  });
});

describe("legal reader text shapes", () => {
  it("accepts an object of strings, including the empty object", () => {
    expect(parseLegalVersion(version, "legal_in_force").texts).toEqual({ om: "Oromo text" });
    expect(parseLegalVersion({ ...version, texts: {} }, "legal_in_force").texts).toEqual({});
  });
  it.each([null, undefined, [], "text", 42, { om: 42 }, { om: null }])(
    "public parser refuses invalid texts %j",
    (texts) => {
      expect(() => parseLegalVersion({ ...version, texts }, "legal_in_force")).toThrow();
    },
  );
  it.each([null, undefined, [], "text", 42, { om: 42 }, { om: null }])(
    "certification parser refuses invalid texts %j",
    async (texts) => {
      rpc.mockResolvedValue({
        data: { statements: [{ ...version, texts }], acceptance_pending: false },
        error: null,
      });
      await expect(myListingCertification("e2e-listing")).rejects.toThrow();
    },
  );
});

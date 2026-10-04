import { beforeAll, describe, expect, it } from "vitest";

import { type PhoneLib, groupedPhone, loadPhoneLib, readPhone, tidyTyping } from "./phone-parse";

/** Bundle 3 step 11 — the judge, with the real library. */
const JUDGE: [string, string, string, string?][] = [
  ["ET", "0911234567", "+251911234567", "91 123 4567"],
  ["ET", "911234567", "+251911234567"],
  ["US", "435-6554444", "+14356554444", "435 655 4444"],
  ["US", "455 456 4566", "+14554564566", "455 456 4566"],
  ["US", "14356554444", "+14356554444"],
  ["CI", "0123456789", "+2250123456789"],
  ["IT", "0612345678", "+390612345678"],
  ["CG", "061234567", "+242061234567"],
  ["GB", "07400123456", "+447400123456", "7400 123456"],
  ["RU", "89123456789", "+79123456789"],
  ["AE", "0501234567", "+971501234567"],
];

describe("step 11 phone judge", () => {
  let lib: PhoneLib;
  // The real library, by the same dynamic import the contact step uses (cold loads are slow).
  beforeAll(async () => {
    lib = await loadPhoneLib();
  }, 30_000);
  for (const [iso, typed, saved, shown] of JUDGE) {
    it(`${iso} ${typed} → ${saved}`, () => {
      // Typed and pasted take the same path: the box tidies, then reads.
      const read = readPhone(lib, iso, tidyTyping(typed));
      expect(read.value).toBe(saved);
      if (shown !== undefined) expect(read.shown).toBe(shown);
    });
  }

  it('typing "abc" leaves the box empty', () => {
    expect(tidyTyping("abc")).toBe("");
    expect(readPhone(lib, "ET", tidyTyping("abc")).value).toBe("");
  });

  it("an unreadable number is kept as typed digits behind the code", () => {
    expect(readPhone(lib, "ET", "12").value).toBe("+25112");
  });

  it("a saved number is shown grouped", () => {
    expect(groupedPhone(lib, "+251911234567")).toBe("+251 91 123 4567");
  });
});

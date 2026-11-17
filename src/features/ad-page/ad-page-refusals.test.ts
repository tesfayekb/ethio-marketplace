import { describe, expect, it } from "vitest";
import { en } from "@/i18n/locales/en";
import { readRefusal } from "@/lib/refusal";
import {
  CONTACT_REFUSALS,
  REPORT_REFUSALS,
  SAVE_REFUSALS,
  contactRefusal,
  refusalCode,
  reportRefusal,
  saveRefusal,
} from "./ad-page-refusals";

/**
 * F1-5b — the buyer's doors' words and the reason each screen branches on, read from what
 * the shell answers: an error whose message is `code[:detail]`, or a returned answer.
 */

// The shell's gate codes and the codes of the other families no buyer door answers.
const GATES = ["notSignedIn", "accountDeactivated"];
const STRANGERS = ["boom", "badReason:spam", "noProfile", "", "constructor"];

describe("ARF-1 refusalCode reads the head of the shell's code", () => {
  it.each([
    [{ message: "ownListing" }, "ownListing"],
    [{ message: "alreadyReported:2026-11-17" }, "alreadyReported"],
    [{ ok: false, reason: "sellersCapReached" }, "sellersCapReached"],
    ["rateLimited", "rateLimited"],
    [{ message: " listingNotAvailable " }, "listingNotAvailable"],
    [null, ""],
    [undefined, ""],
    [{}, ""],
    [42, ""],
  ])("%j is %j", (failure, code) => {
    expect(refusalCode(failure)).toBe(code);
  });
});

describe("ARF-2 every family's words are keys the catalogue holds", () => {
  it.each([
    ["save", SAVE_REFUSALS],
    ["report", REPORT_REFUSALS],
    ["contact", CONTACT_REFUSALS],
  ] as const)("%s", (_name, family) => {
    for (const key of [...Object.values(family.words), family.generic]) {
      expect(Object.keys(en)).toContain(key);
    }
  });
});

describe("ARF-3 save and unsave", () => {
  it.each([
    ["ownListing", "ownListing"],
    ["listingNotAvailable", "listingNotAvailable"],
    ["rateLimited", "rateLimited"],
  ])("%s reads %s", (code, reason) => {
    expect(saveRefusal({ message: code })).toBe(reason);
  });
  it.each([...GATES, ...STRANGERS])("%s reads the generic line", (code) => {
    expect(saveRefusal({ message: code })).toBe("failed");
    expect(readRefusal({ message: code }, SAVE_REFUSALS).key).toBe("adPage.save.failed");
  });
});

describe("ARF-4 report", () => {
  it.each([
    ["ownListing", "ownListing"],
    ["alreadyReported", "alreadyReported"],
    ["rateLimited", "rateLimited"],
  ])("%s reads %s", (code, reason) => {
    expect(reportRefusal({ message: code })).toBe(reason);
  });
  it.each([...GATES, ...STRANGERS, "badReason", "noteTooLong", "listingNotAvailable"])(
    "%s reads the generic line",
    (code) => {
      expect(reportRefusal({ message: code })).toBe("failed");
      expect(readRefusal({ message: code }, REPORT_REFUSALS).key).toBe("adPage.report.failed");
    },
  );
});

describe("ARF-5 contact reveal", () => {
  it.each([
    [{ message: "listingNotAvailable" }, "listingNotAvailable"],
    [{ message: "acceptanceRequired" }, "acceptanceRequired"],
    [{ message: "rateLimited" }, "rateLimited"],
    [
      { ok: false, reason: "sellersCapReached", resets_at: "2026-11-18T00:00:00Z" },
      "sellersCapReached",
    ],
    [{ ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" }, "rateLimited"],
  ])("%j reads %s", (failure, reason) => {
    expect(contactRefusal(failure)).toBe(reason);
  });
  it.each([...GATES, ...STRANGERS])("%s reads the generic line", (code) => {
    expect(contactRefusal({ message: code })).toBe("failed");
    expect(readRefusal({ message: code }, CONTACT_REFUSALS).key).toBe("adPage.contact.failed");
  });
  it("a returned answer with no reason reads the generic line", () => {
    expect(contactRefusal({ ok: false })).toBe("failed");
  });
});

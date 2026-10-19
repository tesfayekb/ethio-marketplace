import { describe, expect, it } from "vitest";

import type { MessageKey } from "@/i18n";
import en from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

import { bulkNotice } from "./my-listing";

const t = (key: MessageKey) => ownValue(en as Record<string, string>, key) ?? key;
const REASON = "Something went wrong.";

describe("bulkNotice (bundle 22 turn 5)", () => {
  it("all renewed", () => {
    expect(bulkNotice(t, { done: 2, notChanged: 0, reason: null, needsStatement: [] })).toEqual({
      text: "Changed: 2.",
      tone: "done",
    });
  });
  it("one refused for another reason keeps today's text", () => {
    expect(bulkNotice(t, { done: 1, notChanged: 1, reason: REASON, needsStatement: [] })).toEqual({
      text: `Changed: 1. Not changed: 1. ${REASON}`,
      tone: "error",
    });
  });
  it("one needs the statement", () => {
    expect(
      bulkNotice(t, { done: 1, notChanged: 0, reason: null, needsStatement: ["Red bike"] }),
    ).toEqual({
      text: "Changed: 1. Not renewed: Red bike. Each one needs your statement: renew it on its own.",
      tone: "error",
    });
  });
  it("none renewed, two need it", () => {
    expect(
      bulkNotice(t, { done: 0, notChanged: 0, reason: null, needsStatement: ["Red bike", "Sofa"] }),
    ).toEqual({
      text: "Not renewed: Red bike, Sofa. Each one needs your statement: renew it on its own.",
      tone: "error",
    });
  });
  it("one refused and one needing it", () => {
    expect(
      bulkNotice(t, { done: 0, notChanged: 1, reason: REASON, needsStatement: ["Sofa"] }),
    ).toEqual({
      text: `Not changed: 1. ${REASON} Not renewed: Sofa. Each one needs your statement: renew it on its own.`,
      tone: "error",
    });
  });
});

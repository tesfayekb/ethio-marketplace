import { describe, expect, it } from "vitest";

import {
  dropRefusedAnswers,
  keepListedAnswers,
  type QuestionListRead,
} from "./catalog-held-answers";

const ok: QuestionListRead = {
  state: "ok",
  categoryId: "cat-1",
  definitions: [
    { attributeId: "1", attrKey: "colour", attrType: "single_select" },
    { attributeId: "2", attrKey: "extras", attrType: "multi_select" },
    { attributeId: "3", attrKey: "notes", attrType: "text" },
  ],
};
const options = { colour: ["red", "blue", "off"], extras: ["a", "b", "c"] };
const keep = (
  answers: Record<string, unknown>,
  read: QuestionListRead = ok,
  categoryId = "cat-1",
) => keepListedAnswers({ answers, categoryId, read, optionsByKey: options });

describe("keepListedAnswers (D5 rule 1)", () => {
  it("drops a key the list no longer has", () => {
    expect(keep({ notes: "x", gone: "y" })).toEqual({ notes: "x" });
  });
  it("drops a single value the question no longer has", () => {
    expect(keep({ colour: "green", notes: "x" })).toEqual({ notes: "x" });
  });
  it("drops one removed entry of a list of three", () => {
    expect(keep({ extras: ["a", "z", "c"] })).toEqual({ extras: ["a", "c"] });
  });
  it("leaves an other write-in untouched", () => {
    const answers = {
      colour: { value: "other", text: "teal" },
      extras: ["a", { value: "other", text: "hand" }],
    };
    expect(keep(answers)).toBe(answers);
  });
  it("leaves a switched-off value untouched", () => {
    const answers = { colour: "off" };
    expect(keep(answers)).toBe(answers);
  });
  it("returns an empty answer set as it is", () => {
    expect(keep({})).toEqual({});
  });
  it("never after a failed read", () => {
    const answers = { gone: "y", colour: "green" };
    expect(keep(answers, { state: "failed" })).toBe(answers);
  });
  it("never from a list read for another category", () => {
    const answers = { gone: "y", colour: "green" };
    expect(keep(answers, ok, "cat-2")).toBe(answers);
  });
  it("never while a read is in the air", () => {
    const answers = { gone: "y", colour: "green" };
    expect(keep(answers, { state: "pending" })).toBe(answers);
  });
});

describe("dropRefusedAnswers (D5 rule 2)", () => {
  it("drops the key an unknownAttribute names", () => {
    expect(
      dropRefusedAnswers({ a: 1, b: 2 }, [{ field: "a", reason: "unknownAttribute" }]),
    ).toEqual({ b: 2 });
  });
  it("drops the single answer and only the named list entry for unknownOption", () => {
    expect(
      dropRefusedAnswers({ c: "red", e: ["a", "z"] }, [
        { field: "c", reason: "unknownOption", detail: "red" },
        { field: "e", reason: "unknownOption", detail: "z" },
      ]),
    ).toEqual({ e: ["a"] });
  });
  it("answers null when nothing held is named", () => {
    expect(dropRefusedAnswers({ a: 1 }, [{ field: "x", reason: "unknownAttribute" }])).toBeNull();
    expect(dropRefusedAnswers({ a: 1 }, [{ field: "a", reason: "required" }])).toBeNull();
  });
});

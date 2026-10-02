import { describe, expect, it } from "vitest";

import { answerOtherText, answerTokens, multiAnswer } from "./answer-tokens";

describe("Part O answer reader (mirror of attr_answer_tokens / attr_answer_other_text)", () => {
  it("reads every stored shape", () => {
    expect(answerTokens("a")).toEqual(["a"]);
    expect(answerTokens({ value: "other", text: "teff" })).toEqual(["other"]);
    expect(answerTokens(["a", { value: "other", text: "teff" }])).toEqual(["a", "other"]);
    expect(answerTokens(null)).toEqual([]);
  });

  it("reads the Other text and rebuilds a multi answer", () => {
    expect(answerOtherText(["a", { value: "other", text: "teff" }])).toBe("teff");
    expect(answerOtherText(["a", "other"])).toBe("");
    expect(multiAnswer(["a", "other"], "teff")).toEqual(["a", { value: "other", text: "teff" }]);
    expect(multiAnswer(["a", "other"], "")).toEqual(["a", "other"]);
  });
});

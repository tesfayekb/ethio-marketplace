import { describe, expect, it } from "vitest";

import { firstSentence } from "./step-specifications";

describe("firstSentence (INC-294)", () => {
  it("does not end a sentence on an abbreviation", () => {
    const text =
      "As the device reports it — iPhone: Settings › Battery › Battery Health; Samsung: Samsung Members › Diagnostics; laptops: the battery report. E.g. 89.";
    const out = firstSentence(text);
    expect(out.head.endsWith("the battery report.")).toBe(true);
    expect(out.rest).toBe("E.g. 89.");
  });

  it("reads past e.g. inside the first sentence", () => {
    expect(
      firstSentence("Tick every time you are available, e.g. weekends. Buyers filter on these.")
        .head,
    ).toBe("Tick every time you are available, e.g. weekends.");
  });

  it("ends on the Amharic full stop", () => {
    expect(firstSentence("ሜሞሪ (ራም)። በቅንብሮች › ስለ ስልኩ ሥር ወይም በሳጥኑ ላይ ያገኙታል።").head).toBe("ሜሞሪ (ራም)።");
  });

  it("keeps a single sentence whole", () => {
    const text = "Find it under Settings › About phone, or on the box.";
    expect(firstSentence(text)).toEqual({ head: text, rest: "" });
  });
});

import { describe, expect, it } from "vitest";

import { firstSentence, foldFact } from "./step-specifications";

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

  it("keeps a sentence that ends in a category token whole (step 29)", () => {
    const out = firstSentence("Cases are posted under {category:phone-cases}. Ask the seller.");
    expect(out.head).toBe("Cases are posted under {category:phone-cases}.");
    expect(out.rest).toBe("Ask the seller.");
    expect(firstSentence("ሽፋኖች በ{category:phone-cases} ሥር ይለጠፋሉ። ሻጩን ይጠይቁ።").head).toBe(
      "ሽፋኖች በ{category:phone-cases} ሥር ይለጠፋሉ።",
    );
  });
});

describe("foldFact (INC-434)", () => {
  it("a list fact prefills a multi_select target", () => {
    expect(foldFact(["doro_wot"], "multi_select")).toEqual({ kind: "prefill", value: ["doro_wot"] });
  });

  it("a list fact never fills a single_select or boolean target", () => {
    expect(foldFact(["doro_wot"], "single_select")).toEqual({ kind: "skip" });
    expect(foldFact(["doro_wot"], "boolean")).toEqual({ kind: "skip" });
  });

  it("an empty list or a list of non-strings is not a fact", () => {
    expect(foldFact([], "multi_select")).toEqual({ kind: "skip" });
    expect(foldFact([1, null], "multi_select")).toEqual({ kind: "skip" });
  });

  it("a scalar still prefills and a boolean target stays a hint (D27)", () => {
    expect(foldFact("petrol", "single_select")).toEqual({ kind: "prefill", value: "petrol" });
    expect(foldFact(true, "boolean")).toEqual({ kind: "hint", value: true });
    expect(foldFact({ a: 1 }, "single_select")).toEqual({ kind: "skip" });
  });
});

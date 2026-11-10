/**
 * D36 — HELP IS ONE SENTENCE UNTIL IT IS ASKED FOR. A curator's guidance can run
 * to a paragraph, and a paragraph under every field is what makes a 360-pixel
 * form unreadable. The FIRST sentence stays inline; the rest waits behind the
 * (i) tap beside the label. Amharic's own full stop (`።`) ends a sentence here
 * exactly as a full stop does.
 */
export function firstSentence(text: string): { head: string; rest: string } {
  // INC-294 — "e.g." / "i.e." / "etc." / "vs." / "approx." / "cf." do not end
  // a sentence. Amharic's `።` is never an abbreviation.
  const terminator = /[.!?…።](?=\s|$)/g;
  for (let match = terminator.exec(text); match !== null; match = terminator.exec(text)) {
    const before = text.slice(0, match.index);
    if (match[0] !== "።" && /(?:^|[^\p{L}])(?:e\.g|i\.e|etc|vs|approx|cf)$/iu.test(before)) {
      continue;
    }
    const end = match.index + 1;
    return { head: text.slice(0, end).trim(), rest: text.slice(end).trim() };
  }
  return { head: text.trim(), rest: "" };
}

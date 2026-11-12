/** The sentence's two fixed parts around its one slot; a sentence without the slot is all fixed. */
export function splitAtSlot(sentence: string, slot: string): [string, string] | null {
  const at = sentence.indexOf(slot);
  if (at < 0) return null;
  return [sentence.slice(0, at), sentence.slice(at + slot.length)];
}

/** Every code the standard leaves to private use — the whole scratch universe. */
export function userAssignedCodes(): string[] {
  const letters = (from: string, to: string) => {
    const out: string[] = [];
    for (let code = from.charCodeAt(0); code <= to.charCodeAt(0); code += 1) {
      out.push(String.fromCharCode(code));
    }
    return out;
  };
  return [
    ...letters("M", "Z").map((second) => `Q${second}`),
    ...letters("A", "Z").map((second) => `X${second}`),
  ];
}

/** INC-817 — concurrent workers draw from disjoint, five-code slots. */
export function countrySlotCodes(parallelIndex: number): string[] {
  return userAssignedCodes().filter((_, position) => position % 8 === parallelIndex % 8);
}

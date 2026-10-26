import { describe, expect, it } from "vitest";

// INC-917 (Foundations turn 34, ruling 2) — no client mock: nothing this module reaches imports
// the Supabase client statically (provider → the door, which loads it only on demand).
const { serverShellLanguage } = await import("./server-shell-language");

describe("the first server byte's language (INC-872, CHANGE 1)", () => {
  it("ILA-5 a star am visitor still gets lang en while the server renders the base catalog", () => {
    // The star cookie is not an input: the server renders the base catalog.
    const rows = [
      { code: "en", rtl: false },
      { code: "am", rtl: false },
    ];
    expect(serverShellLanguage(rows)).toEqual({ lang: "en", dir: "ltr" });
    expect(serverShellLanguage([])).toEqual({ lang: "en", dir: "ltr" });
  });
});

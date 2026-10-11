import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useFollowingDraft } from "./use-following-draft";

/** Bundle 11, turn G3c (INC-558's class) — an editor's draft and the stored value. */
describe("useFollowingDraft", () => {
  it("FD-1 an untouched draft follows the stored value (the AI's text, a restore)", () => {
    const hook = renderHook(({ stored }) => useFollowingDraft(stored), {
      initialProps: { stored: "" },
    });
    expect(hook.result.current[0]).toBe("");
    hook.rerender({ stored: "machine" });
    expect(hook.result.current[0]).toBe("machine");
    hook.rerender({ stored: "restored" });
    expect(hook.result.current[0]).toBe("restored");
  });

  it("FD-2 a typed draft is kept when the stored value moves; once saved, it follows again", () => {
    const hook = renderHook(({ stored }) => useFollowingDraft(stored), {
      initialProps: { stored: "old" },
    });
    act(() => hook.result.current[1]("typed"));
    hook.rerender({ stored: "machine" });
    expect(hook.result.current[0]).toBe("typed");
    // The admin's Save lands: the stored value catches up with the draft …
    hook.rerender({ stored: "typed" });
    expect(hook.result.current[0]).toBe("typed");
    // … and the draft is untouched again, so the next change is followed.
    hook.rerender({ stored: "restored" });
    expect(hook.result.current[0]).toBe("restored");
  });

  it("FD-3 a draft typed back to the stored text counts as untouched", () => {
    const hook = renderHook(({ stored }) => useFollowingDraft(stored), {
      initialProps: { stored: "old" },
    });
    act(() => hook.result.current[1]("x"));
    act(() => hook.result.current[1]("old"));
    hook.rerender({ stored: "new" });
    expect(hook.result.current[0]).toBe("new");
  });
});

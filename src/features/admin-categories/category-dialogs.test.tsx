import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => `T(${key})` }),
}));

import { useSubmitError } from "./category-dialogs";

describe("category screen refusal (turn D1 stop 11, G0.2)", () => {
  it("CDR-1: a save refused by a rate gate shows the shared admin.error.rateLimited", () => {
    const { result } = renderHook(() => useSubmitError());
    // PostgREST hands the door's RAISE EXCEPTION 'rateLimited' over as a plain object.
    act(() => result.current.fail({ message: "rateLimited", code: "P0001" }));
    expect(result.current.message).toBe("T(admin.error.rateLimited)");
  });
});

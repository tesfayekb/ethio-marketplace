import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => false }),
}));

import { CategoryImageError } from "./category-images-service";
import { useImageFailure } from "./use-image-failure";

describe("the picture surface's failure line (F1-4a)", () => {
  it("CIG-2 a route step keeps its own words; a door's refusal reads the family's words, a code without words names the step alone", () => {
    const { result } = renderHook(() => useImageFailure());
    const line = (error: unknown) => {
      act(() => result.current.fail(error));
      return result.current.message;
    };
    const stage = (name: string) => ` (admin.categories.image.stageLabel ${name})`;
    expect(line(new CategoryImageError("rateLimited", 429, "model-call"))).toBe(
      `admin.categories.error.imageFailed${stage("model-call")}: rateLimited`,
    );
    expect(line(new CategoryImageError("storage upload failed: x", 0, "upload"))).toBe(
      `admin.categories.error.imageFailed${stage("upload")}: storage upload failed: x`,
    );
    expect(line(new CategoryImageError("rateLimited", 0, "persist"))).toBe(
      "admin.error.rateLimited",
    );
    expect(line(new CategoryImageError("permissionDenied", 0, "persist"))).toBe(
      `admin.categories.error.imageFailed${stage("persist")}`,
    );
    expect(line({ message: "acceptNoImage", code: "P0D01", details: "", hint: "" })).toBe(
      "admin.categories.error.acceptNoImage",
    );
    expect(line(new Error("Failed to fetch"))).toBe("admin.categories.error.imageFailed");
  });

  it("RRD-7 a persist step's code is named by the step alone; a sentence keeps its words", () => {
    const { result } = renderHook(() => useImageFailure());
    const line = (error: unknown) => {
      act(() => result.current.fail(error));
      return result.current.message;
    };
    const stage = " (admin.categories.image.stageLabel persist)";
    expect(line(new CategoryImageError("someCode:a, b", 0, "persist"))).toBe(
      `admin.categories.error.imageFailed${stage}`,
    );
    expect(line(new CategoryImageError("Some sentence: x", 0, "persist"))).toBe(
      `admin.categories.error.imageFailed${stage}: Some sentence: x`,
    );
  });
});

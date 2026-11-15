import { describe, expect, it } from "vitest";

import { answeredId } from "./answered-id";

describe("answeredId", () => {
  it("AWI-1 a door's `{ ok: true, id }` answers its id", () => {
    expect(answeredId("door", { ok: true, id: "c-1" })).toBe("c-1");
  });

  it("AWI-2 an answer without an id is a failure naming the door, never a phantom id", () => {
    for (const data of [
      null,
      undefined,
      "c-1",
      { ok: true },
      { ok: false, id: "c-1" },
      { ok: true, id: "" },
      { ok: true, id: 7 },
    ])
      expect(() => answeredId("door", data)).toThrow("door answered without an id");
  });
});

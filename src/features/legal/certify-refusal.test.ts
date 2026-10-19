import { beforeEach, describe, expect, it, vi } from "vitest";

import { certifyRefusal, refreshers } from "./certify-refusal";

const refresh = vi.fn();
beforeEach(() => {
  refresh.mockReset();
  refreshers.clear();
  refreshers.add(refresh);
});

describe("certifyRefusal (bundle 22 turn 4)", () => {
  it("acceptanceRequired goes to the acceptance screen with the current path and search", () => {
    const navigate = vi.fn();
    expect(
      certifyRefusal("acceptanceRequired", navigate, { pathname: "/post/l-1", search: "?step=8" }),
    ).toBe(true);
    expect(navigate).toHaveBeenCalledWith({
      to: "/legal/accept",
      search: { next: "/post/l-1?step=8" },
      replace: true,
    });
    expect(refresh).not.toHaveBeenCalled();
  });
  it("certificationRequired re-reads the statements and navigates nowhere", () => {
    const navigate = vi.fn();
    expect(certifyRefusal("certificationRequired", navigate, { pathname: "/", search: "" })).toBe(
      true,
    );
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(navigate).not.toHaveBeenCalled();
  });
  it("any other reason is the screen's own", () => {
    const navigate = vi.fn();
    expect(certifyRefusal("rateLimited", navigate, { pathname: "/", search: "" })).toBe(false);
    expect(refresh).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});

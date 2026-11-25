import { expect, it } from "vitest";

import { signInReturn } from "./sign-in-return";

it("SIR-U1 Sign in carries the current page, query included", () => {
  expect(signInReturn("/l/abc?x=1")).toEqual({ return: "/l/abc?x=1" });
});

it("SIR-U2 the sign-in page itself carries no return", () => {
  expect(signInReturn("/auth?view=sign-up")).toEqual({});
});

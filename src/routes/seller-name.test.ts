import { isNotFound, isRedirect } from "@tanstack/react-router";
import { expect, it, vi } from "vitest";

const sellerExists = vi.fn();
vi.mock("@/server/seller-page", () => ({
  sellerExists: (...args: unknown[]) => sellerExists(...args),
}));

type Loader = (ctx: { params: { name: string } }) => Promise<unknown>;
async function load(name: string): Promise<unknown> {
  const { Route } = (await import("./$name")) as { Route: { options: unknown } };
  const loader = (Route.options as { loader: Loader }).loader;
  try {
    return await loader({ params: { name } });
  } catch (thrown) {
    return thrown;
  }
}

it.each(["a/b", "a\\b", "a%2Fb", "A%2fb", "a%5Cb", "Abc%2F", "%E0%A4%A"])(
  "SNAME-1 a name holding a path separator, or an escape that does not decode, is not found before any redirect (%s, INC-1117)",
  async (name) => {
    sellerExists.mockClear();
    const answer = await load(name);
    expect(isNotFound(answer)).toBe(true);
    expect(sellerExists).not.toHaveBeenCalled();
  },
);

it("SNAME-2 an upper-case name still moves (301) to its lower-cased address on this site", async () => {
  const answer = await load("Scratch_Seller");
  expect(isRedirect(answer)).toBe(true);
  const redirect = answer as { options: { href?: string; statusCode?: number } };
  expect(redirect.options.href).toBe("/scratch_seller");
  expect(redirect.options.statusCode).toBe(301);
});

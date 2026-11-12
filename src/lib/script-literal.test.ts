import { describe, expect, it } from "vitest";

import { scriptLiteral } from "./script-literal";

describe("scriptLiteral — a value in inline script text", () => {
  it("CF-SCRIPT-1 writes <, >, &, U+2028 and U+2029 as escapes, so a value cannot close the element or a line", () => {
    const text = scriptLiteral({ name: "</script><!--x-->&\u2028\u2029" });
    expect(text).toBe('{"name":"\\u003c/script\\u003e\\u003c!--x--\\u003e\\u0026\\u2028\\u2029"}');
    expect(text).not.toMatch(/[<>&\u2028\u2029]/);
    expect(JSON.parse(text)).toEqual({ name: "</script><!--x-->&\u2028\u2029" });
    expect(scriptLiteral(["light", "dark"])).toBe('["light","dark"]');
    expect(scriptLiteral("ethio.theme")).toBe('"ethio.theme"');
  });

  it("CF-SCRIPT-2 answers null for undefined and throws for a value with no JSON form", () => {
    expect(scriptLiteral(undefined)).toBe("null");
    expect(scriptLiteral(null)).toBe("null");
    expect(() => scriptLiteral(() => 1)).toThrow("scriptLiteral: the value has no JSON form");
    expect(() => scriptLiteral(Symbol("s"))).toThrow("scriptLiteral: the value has no JSON form");
  });
});

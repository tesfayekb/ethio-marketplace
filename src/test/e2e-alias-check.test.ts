/**
 * P-2 (c) c2a ruling 5 §2 (INC-1085) — the contact step's name check
 * (e2e/helpers/alias-check.ts) fails naming its cause: the route's status and
 * body, or the screen's alias state when no check was sent.
 */
import { describe, expect, it } from "vitest";

import {
  ALIAS_CHECK_MS,
  aliasCheckFailure,
  isCheckOf,
  scratchAlias,
  sentAlias,
} from "../../e2e/helpers/alias-check";
import { aliasShapeOk } from "@/features/posting/alias-rules";

const ROUTE = "http://127.0.0.1:4173/api/listings/alias";

describe("INC-1085 — aliasCheckFailure", () => {
  it("passes only a 200 whose body says ok", () => {
    expect(
      aliasCheckFailure("e2e_abcdef", { kind: "answer", status: 200, body: '{"ok":true}' }),
    ).toBeNull();
  });

  it("names the status and the body of a refused check", () => {
    const body = '{"ok":false,"refusals":[{"field":"alias","reason":"aliasShape"}]}';
    const message = aliasCheckFailure("e2e_123456", { kind: "answer", status: 200, body });
    expect(message).toContain('"e2e_123456"');
    expect(message).toContain("HTTP 200");
    expect(message).toContain(body);
  });

  it("names the status and the body of a failed call", () => {
    const body = '{"error":{"code":"serviceUnavailable"}}';
    const message = aliasCheckFailure("e2e_abcdef", { kind: "answer", status: 503, body });
    expect(message).toContain("HTTP 503");
    expect(message).toContain(body);
  });

  it("fails a 200 whose body is not an answer", () => {
    const message = aliasCheckFailure("e2e_abcdef", {
      kind: "answer",
      status: 200,
      body: "<html>",
    });
    expect(message).toContain("HTTP 200: <html>");
  });

  it("names why no check came and which alias state the screen shows", () => {
    const message = aliasCheckFailure("e2e_123456", {
      kind: "none",
      why: "Timeout 20000ms exceeded",
      screen: ["post-who-alias-refusal"],
    });
    expect(message).toContain(`within ${ALIAS_CHECK_MS} ms`);
    expect(message).toContain("Timeout 20000ms exceeded");
    expect(message).toContain("post-who-alias-refusal");
  });
});

describe("INC-1085 — isCheckOf", () => {
  it("matches the check of the typed name only", () => {
    expect(isCheckOf("POST", ROUTE, '{"alias":"e2e_abcdef"}', "e2e_abcdef")).toBe(true);
    expect(isCheckOf("POST", ROUTE, '{"alias":"e2e_other"}', "e2e_abcdef")).toBe(false);
    expect(isCheckOf("POST", ROUTE, '{"suggest":true,"firstName":"Abebe"}', "e2e_abcdef")).toBe(
      false,
    );
    expect(isCheckOf("GET", ROUTE, null, "e2e_abcdef")).toBe(false);
    expect(
      isCheckOf(
        "POST",
        "http://127.0.0.1:4173/api/listings/identity",
        '{"alias":"e2e_abcdef"}',
        "e2e_abcdef",
      ),
    ).toBe(false);
  });

  it("compares the name as the screen sends it", () => {
    expect(sentAlias("  E2E_AbcDef ")).toBe("e2e_abcdef");
  });
});

describe("INC-1085 — scratchAlias", () => {
  it("a tail of digits alone is what the shape rule refuses", () => {
    expect(aliasShapeOk("e2e_123456")).toBe(false);
  });

  it("every scratch name passes the shape rule", () => {
    for (let i = 0; i < 500; i += 1) {
      const name = scratchAlias();
      expect(aliasShapeOk(name), name).toBe(true);
    }
  });
});

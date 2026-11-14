import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";
import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";

import { readRefusal, refusalText, refusalsOf, type RefusalFamily } from "./refusal";
import { ADMIN_REFUSALS } from "./refusal-tail";

const POSTING: RefusalFamily = {
  words: { required: "post.refusal.required", tooLong: "post.refusal.tooLong" },
  generic: "post.refusal.unknown",
};

const DOOR_KEYS = new Set<string>([
  "admin.categories.error.delete_has_children",
  "admin.error.rateLimited",
]);
const known = (key: string) => DOOR_KEYS.has(key);

/** The catalogue a screen holds, as words; a key it lacks reads as itself. */
const CATALOGUE: Record<string, string> = {
  "common.error": "Something went wrong",
  "post.refusal.tooLong": "At most {count} characters.",
  "admin.categories.error.delete_has_children": "{count} categories sit under this one.",
};
const t = (key: MessageKey): string => ownValue(CATALOGUE, key) ?? key;

describe("the one refusal reader (DEC-339)", () => {
  it("RFR-1 a cancelled step-up says nothing; a step-up with no factor names the hint", () => {
    const cancelled = readRefusal(new StepUpCancelled(), POSTING);
    expect(cancelled.branch).toBe("stepUp");
    expect(cancelled.silent).toBe(true);
    expect(refusalText(cancelled, t)).toBe("");
    const unavailable = readRefusal(new StepUpUnavailable(), POSTING);
    expect(unavailable).toMatchObject({ key: "mfa.stepUpUnavailableHint", silent: false });
  });

  it("RFR-2 the route envelope: the posting refusals first, else the error code and its detail", () => {
    const refused = readRefusal(
      {
        kind: "answered",
        status: 200,
        ok: false,
        payload: { ok: false, refusals: [{ field: "title", reason: "tooLong:120" }] },
        error: null,
        detail: null,
      },
      POSTING,
    );
    expect(refused).toMatchObject({
      key: "post.refusal.tooLong",
      tail: "120",
      field: "title",
      branch: "family",
    });
    const coded = readRefusal(
      { kind: "answered", status: 429, ok: false, payload: null, error: "rateLimited", detail: "" },
      ADMIN_REFUSALS,
    );
    expect(coded).toMatchObject({ key: "admin.error.rateLimited", branch: "family" });
    expect(readRefusal({ kind: "signedOut" })).toMatchObject({
      key: "door.refused",
      branch: "doorCode",
    });
    expect(readRefusal({ kind: "unreachable", reason: "network" })).toMatchObject({
      key: "common.error",
      branch: "generic",
    });
  });

  it("RFR-3 a door's machine code reads by its family's words, the detail as its tail", () => {
    expect(readRefusal({ field: "price", reason: "required" }, POSTING)).toMatchObject({
      key: "post.refusal.required",
      field: "price",
      branch: "family",
    });
    expect(readRefusal({ field: "title", reason: "tooLong", detail: "80" }, POSTING)).toMatchObject(
      { key: "post.refusal.tooLong", tail: "80" },
    );
    expect(refusalText(readRefusal("tooLong:120", POSTING), t)).toBe("At most 120 characters.");
  });

  it("RFR-4 a console door's key is used only when the catalogue holds it", () => {
    const message = { message: "admin.categories.error.delete_has_children:2" };
    const read = readRefusal(message, {}, known);
    expect(read).toMatchObject({
      key: "admin.categories.error.delete_has_children",
      tail: "2",
      branch: "doorKey",
    });
    expect(refusalText(read, t)).toBe("2 categories sit under this one.");
    expect(readRefusal({ message: "admin.categories.error.notInCatalogue" }, {}, known).key).toBe(
      "common.error",
    );
    expect(readRefusal(message).key).toBe("common.error");
  });

  it("RFR-5 a DEC-333 door code with no family words is door.refused, or the family's generic", () => {
    expect(readRefusal({ message: "permissionDenied" })).toMatchObject({
      key: "door.refused",
      branch: "doorCode",
    });
    expect(readRefusal("sameLevel:2026-12-01")).toMatchObject({
      key: "door.refused",
      tail: "2026-12-01",
    });
    expect(readRefusal("permissionDenied", POSTING).key).toBe("post.refusal.unknown");
  });

  it("RFR-6 a sentence reads only through its family's row; any other sentence is never drawn", () => {
    const roles: RefusalFamily = {
      sentences: [[/role has members/i, "admin.roles.error.hasMembers"]],
      generic: "common.error",
    };
    expect(readRefusal({ message: "role has members" }, roles)).toMatchObject({
      key: "admin.roles.error.hasMembers",
      branch: "sentence",
    });
    const planted = 'duplicate key value violates unique constraint "users_email_key"';
    const read = readRefusal({ message: planted, code: "23505" }, roles, known);
    expect(read).toMatchObject({ key: "common.error", branch: "generic" });
    expect(refusalText(read, t)).toBe("Something went wrong");
    expect(refusalText(read, t)).not.toContain("duplicate");
  });

  it("RFR-7 an auth provider's own code reads by the family's words", () => {
    const auth: RefusalFamily = {
      words: { weak_password: "auth.errorWeakPassword" },
      generic: "auth.errorGeneric",
    };
    expect(
      readRefusal(
        { name: "AuthApiError", message: "Password is too weak", code: "weak_password" },
        auth,
      ),
    ).toMatchObject({ key: "auth.errorWeakPassword", branch: "provider" });
    expect(readRefusal({ message: "Something odd", code: "unexpected_failure" }, auth).key).toBe(
      "auth.errorGeneric",
    );
  });

  it("RFR-8 anything the reader does not know is the one generic key, never the input", () => {
    for (const input of [null, undefined, 42, "", "   ", {}, [], "notARealCode", { error: {} }]) {
      expect(readRefusal(input)).toMatchObject({ key: "common.error", branch: "generic" });
    }
    expect(readRefusal("notARealCode", POSTING).key).toBe("post.refusal.unknown");
  });

  it("RFR-9 the words: translated, the tail filled, then the named values; a silent read is empty", () => {
    const aliasFamily: RefusalFamily = {
      words: { aliasImitatesBrand: "post.refusal.aliasImitatesBrand" },
    };
    const words = refusalText(
      readRefusal("aliasImitatesBrand", aliasFamily),
      (key) => (key === "post.refusal.aliasImitatesBrand" ? "That name looks like {name}." : key),
      { name: "Ethio" },
    );
    expect(words).toBe("That name looks like Ethio.");
  });

  it("RFR-10 refusalsOf reads the posting contract, an attribute's attr_key as its field", () => {
    expect(
      refusalsOf({
        refusals: [
          { attr_key: "year", reason: "outOfBounds", detail: "1990" },
          { field: "title", reason: "required" },
        ],
      }),
    ).toEqual([
      { field: "year", reason: "outOfBounds", detail: "1990" },
      { field: "title", reason: "required" },
    ]);
    expect(refusalsOf({ refusals: "not a list" })).toEqual([]);
    expect(refusalsOf({})).toEqual([]);
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { PROVIDER_ERRORS, providerError, type ProviderErrorEntry } from "./provider-errors";

/**
 * INC-1278 (b) — the one fixture of the provider's real errors: every entry carries its code (or the
 * name of an error the client library raises), its message, and the vendor file:line that sends it.
 * cursor-bundle-8a ruling 1 — the data API's and storage's sources at the versions the pinned CLI
 * starts, and our own routes' answer module, are source forms too.
 */
const SOURCE =
  /^(?:(?:supabase\/auth v2\.197\.0 internal\/[a-z]+\/[a-z_]+\.go|@supabase\/auth-js 2\.110\.9 dist\/module\/lib\/errors\.js|@supabase\/postgrest-js 2\.110\.9 dist\/index\.mjs|PostgREST\/postgrest v16\.4 src\/library\/PostgREST\/[A-Za-z/]+\.hs|supabase\/storage v1\.79\.36 src\/[a-z/-]+\.ts|supabase\/migrations\/[0-9]{14}_[0-9a-f-]{36}\.sql):[1-9][0-9]*|src\/server\/(?:answer|supabase\/user-client)\.ts#[A-Za-z][A-Za-z0-9]*)$/;

/**
 * INC-1320 — the problem with an entry's own-code source `<file>#<symbol>` (null when none): the
 * file declares the symbol (a function, or a const holding one) and the declaration's body, up to
 * the next line that is a lone `}`, holds the message as a quoted string. `readText` is the file's
 * text, so a test can show the check on a file that changed above the symbol.
 */
function ownSourceProblem(
  entry: ProviderErrorEntry,
  readText: (file: string) => string,
): string | null {
  const [file = "", symbol = ""] = entry.source.split("#");
  const lines = readText(file).split("\n");
  const declared = new RegExp(
    `^(?:export )?(?:async )?(?:function ${symbol}\\b|const ${symbol}\\b)`,
  );
  const start = lines.findIndex((line) => declared.test(line));
  if (start < 0) return `${file} declares no ${symbol}`;
  const end = lines.findIndex((line, index) => index > start && line === "}");
  const body = lines.slice(start, end < 0 ? lines.length : end + 1).join("\n");
  return body.includes(JSON.stringify(entry.message))
    ? null
    : `${symbol} does not hold the message ${JSON.stringify(entry.message)}`;
}

describe("PROVIDER_ERRORS (INC-1278 b)", () => {
  const entries: Array<[string, ProviderErrorEntry]> = Object.entries(PROVIDER_ERRORS);

  it("PEF-1 every entry carries its message, its code or name, and its source line", () => {
    expect(entries.length).toBeGreaterThanOrEqual(25);
    for (const [key, entry] of entries) {
      expect(entry.message.trim(), key).not.toBe("");
      expect(entry.source, key).toMatch(SOURCE);
      if (entry.code !== undefined) expect(entry.code, key).toBe(key);
      else expect(entry.name === key || key === "disposableEmail", key).toBe(true);
    }
  });

  it("PEF-2 a mocked error is the entry's message, code, name and status, and no other word", () => {
    expect(providerError("same_password")).toEqual({
      message: "New password should be different from the old password.",
      code: "same_password",
      status: 422,
    });
    expect(providerError("AuthSessionMissingError")).toEqual({
      message: "Auth session missing!",
      name: "AuthSessionMissingError",
      status: 400,
    });
  });

  it("PEF-3 a source of another vendor, version or file does not pass (planted)", () => {
    expect("PostgREST/postgrest v16.4 src/library/PostgREST/Error.hs:485").toMatch(SOURCE);
    expect("PostgREST/postgrest v14.1 src/library/PostgREST/Error.hs:485").not.toMatch(SOURCE);
    expect("supabase/storage v1.79.36 src/http/error-handler.ts:91").toMatch(SOURCE);
    expect("supabase/storage v1.79.35 src/http/error-handler.ts:91").not.toMatch(SOURCE);
    expect("src/server/answer.ts#ok").toMatch(SOURCE);
    expect("src/server/route.ts#ok").not.toMatch(SOURCE);
    expect(
      "src/server/answer.ts:180",
      "our own code is quoted by symbol, never by line",
    ).not.toMatch(SOURCE);
  });

  it("PEF-4 a captured answer is JSON carrying its own code and message, at a server status", () => {
    const captured = entries.filter(([, entry]) => entry.body !== undefined);
    expect(captured.map(([key]) => key).sort()).toEqual([
      "InternalError",
      "PGRST000",
      "unexpected_failure",
      "upstream unavailable",
    ]);
    for (const [key, entry] of captured) {
      const text = JSON.stringify(JSON.parse(entry.body ?? ""));
      expect(text, key).toContain(JSON.stringify(entry.message));
      expect(text, key).toContain(JSON.stringify(entry.code));
      expect(entry.status ?? 0, key).toBeGreaterThanOrEqual(500);
    }
  });

  it("PEF-5 our own route's entry quotes the symbol in src/server that answers it", () => {
    const own = entries.filter(([, e]) => e.source.startsWith("src/server/"));
    expect(own.length).toBeGreaterThan(0);
    for (const [key, entry] of own)
      expect(
        ownSourceProblem(entry, (file) => readFileSync(file, "utf8")),
        key,
      ).toBeNull();
  });

  it("PEF-6 a symbol that moved to another line still passes, and one that left or changed does not (planted)", () => {
    const own = entries.filter(([, e]) => e.source.startsWith("src/server/"));
    expect(own.length).toBeGreaterThan(0);
    for (const [key, entry] of own) {
      const text = readFileSync(entry.source.split("#")[0] ?? "", "utf8");
      const moved = `${"// planted: a line added above the symbol\n".repeat(40)}${text}`;
      expect(
        ownSourceProblem(entry, () => moved),
        `${key} on a moved line`,
      ).toBeNull();
      const symbol = entry.source.split("#")[1] ?? "";
      const renamed = text.replaceAll(symbol, `${symbol}Elsewhere`);
      expect(
        ownSourceProblem(entry, () => renamed),
        `${key} renamed`,
      ).not.toBeNull();
      const reworded = text.replaceAll(JSON.stringify(entry.message), '"another sentence"');
      expect(
        ownSourceProblem(entry, () => reworded),
        `${key} reworded`,
      ).not.toBeNull();
    }
  });
});

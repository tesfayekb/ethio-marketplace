import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { lastDeclarations } from "./migration-reader";
import { doorAnswerFindings, envelopeDoors } from "./door-answers";

/**
 * P-2 (a) ruling 14 item 2 (CF-DOOR-1, INC-1062) — every e2e call of an envelope
 * door (derived from the migrations' last declarations: a body that can answer
 * `'ok', false`) reads the door's answer — through e2e/helpers/door-answer.ts,
 * by its `ok`, or as the door's raised refusal — never only `error` null.
 * Allowances (`<file>:<line> | reason | until`) in door-answers-allowlist.txt;
 * a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "door-answers-allowlist.txt");
const HELPER = "e2e/helpers/door-answer.ts";

const PLANTED_DOORS = ["publish_listing", "report_listing"];

const planteds: string[] = [];
afterEach(() => {
  while (planteds.length) rmSync(planteds.pop() as string, { recursive: true, force: true });
});

/** A planted spec under node_modules/.cache/, removed after the test. */
function planted(name: string, lines: string[]): string {
  const dir = `node_modules/.cache/door-answers-${name}`;
  mkdirSync(dir, { recursive: true });
  planteds.push(dir);
  const file = `${dir}/planted.ts`;
  writeFileSync(
    file,
    [
      "declare const me: { rpc(fn: string, args?: unknown): Promise<{ data: unknown; error: unknown }> };",
      "declare const expect: (v: unknown, m?: string) => Record<string, (...a: unknown[]) => void> & { not: Record<string, (...a: unknown[]) => void> };",
      "declare function doorAnswer(r: unknown, what: string): Record<string, unknown>;",
      "declare function rpcResult(page: unknown, fn: string): Promise<{ data: unknown; error: unknown }>;",
      ...lines,
      "",
    ].join("\n"),
  );
  return file;
}

describe("a test reads an envelope door's answer (CF-DOOR-1)", () => {
  it(
    "CFD-1 every e2e call of an envelope door reads its answer, or its line holds it",
    () => {
      const doors = envelopeDoors(lastDeclarations(ROOT));
      const files = walkFiles([join(ROOT, "e2e")], { ext: ["ts"] })
        .map((file) =>
          file
            .slice(ROOT.length + 1)
            .split("\\")
            .join("/"),
        )
        .filter((file) => file !== HELPER);
      const findings = doorAnswerFindings(
        files.map((file) => join(ROOT, file)),
        doors,
      ).map((finding) => ({ ...finding, file: finding.file.slice(ROOT.length + 1) }));
      const allowed = readAllowlist(
        ALLOWLIST,
        findings.map((finding) => `${finding.file}:${finding.line}`),
      );
      const unexcused = findings.filter(
        (finding) => !allowed.has(`${finding.file}:${finding.line}`),
      );
      console.log(
        `[door-answers] envelope doors: ${doors.length}; files read: ${files.length}; unread answers: ${findings.length}, held: ${allowed.size}`,
      );
      // The derivation is not blind: the doors this rule was born on are among those derived.
      expect(doors).toEqual(
        expect.arrayContaining(["publish_listing", "renew_listing", "reveal_listing_contact"]),
      );
      expect(files.length).toBeGreaterThan(0);
      expect(report(unexcused)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFD-2 the census names LG-29's shape (an answer read for its error only) and a bare call, and passes a helper, an ok read, a raised refusal and another function", () => {
    const file = planted("shapes", [
      "export async function a() {",
      '  const published = await me.rpc("publish_listing", { p_listing_id: "x" });',
      "  expect(published.error, JSON.stringify(published)).toBeNull();",
      '  expect((await me.rpc("publish_listing")).error, "looks ok").toBeNull();',
      '  doorAnswer(await me.rpc("publish_listing"), "helper");',
      '  const read = await me.rpc("publish_listing");',
      "  expect((read.data as { ok: boolean }).ok).toBe(true);",
      '  const raised = await me.rpc("publish_listing");',
      '  expect(raised.error).toContain("certificationRequired");',
      '  const other = await me.rpc("set_listing_pin");',
      "  expect(other.error).toBeNull();",
      '  const viaWrapper = await rpcResult(null, "publish_listing");',
      "  expect(viaWrapper.error).toBeNull();",
      "}",
    ]);
    expect(doorAnswerFindings([file], PLANTED_DOORS).map((finding) => finding.line)).toEqual([
      6, 8, 16,
    ]);
  });

  it("CFD-3 a call a function returns is judged at its callers; the doors are the last declarations that can answer 'ok', false", () => {
    const file = planted("wrapper", [
      "export async function b() {",
      '  const report = (id: string) => me.rpc("report_listing", { p_public_id: id });',
      '  expect((await report("a")).data).toEqual({ ok: true });',
      '  const second = await report("b");',
      "  expect(second.error).toBeNull();",
      "}",
    ]);
    expect(doorAnswerFindings([file], PLANTED_DOORS).map((finding) => finding.line)).toEqual([6]);
    const body = (text: string) => ({
      fn: "",
      header: "",
      body: text,
      line: 1,
      offset: 0,
      bodyLine: 1,
      file: "x.sql",
    });
    expect(
      envelopeDoors(
        new Map([
          ["refuses", body("RETURN jsonb_build_object('ok', false, 'reason', 'x');")],
          ["answers_yes", body("RETURN jsonb_build_object('ok', true);")],
          ["raises", body("RAISE EXCEPTION 'nope';")],
        ]),
      ),
    ).toEqual(["refuses"]);
  });
});

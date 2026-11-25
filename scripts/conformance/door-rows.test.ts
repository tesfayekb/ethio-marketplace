import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { parseManifest } from "../doors/manifest";
import {
  callerComparisons,
  doorRowFindings,
  PERSONAL_CLASSES,
  readClassCell,
  type AllowedDoor,
} from "./door-rows";
import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./migration-reader";

/**
 * CF-DOOR-ROWS-1 (cursor-bundle-7a Part 4, DEC-471) — every owner, signed-in-reader and helper door
 * compares a column of a row it reads with the caller, or has a line in door-rows-allowlist.txt.
 * Proven on planted bodies (the argument-alone door the brief names, each form the matching rule
 * counts and each it does not); wired by this test's own run (door-rows.ts).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "door-rows-allowlist.txt");

const header = "(p_listing_id uuid, p_seller uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER";
const reader = (body: string, head = header) => ({
  body,
  header: head,
  file: "planted.sql",
  bodyLine: 7,
});
const planted = (body: string, head = header) => callerComparisons(reader(body, head));

const door = (name: string, cls = "owner") => ({ name, class: cls });
const judge = (body: string, allowed: Record<string, AllowedDoor> = {}, cls = "owner") =>
  doorRowFindings({
    doors: [door("e2e_planted", cls)],
    declarations: new Map([["e2e_planted", reader(body)]]),
    allowed: new Map(Object.entries(allowed)),
  });

describe("CF-DOOR-ROWS-1 — a personal door names the rule that limits its rows", () => {
  it(
    "CFDR-1 every personal door of the tree compares an owner column with the caller or is allowlisted, and the allowlist holds exactly the doors that do not",
    () => {
      const manifest = parseManifest(
        readFileSync(join(ROOT, "scripts/doors/manifest.txt"), "utf8"),
      );
      const doors = [...manifest.lines.values()].map((line) => ({
        name: line.name,
        class: line.class,
      }));
      const personal = doors.filter((d) =>
        (PERSONAL_CLASSES as readonly string[]).includes(d.class),
      );
      const found = personal.map((d) => d.name);
      const allowances = readAllowlist(ALLOWLIST, found);
      const allowed = new Map<string, AllowedDoor>();
      for (const [name, allowance] of allowances) {
        const cell = readClassCell(allowance.reason, allowance.until);
        expect(typeof cell, `${name}: ${allowance.reason}`).toBe("object");
        if (typeof cell === "object")
          allowed.set(name, { class: cell.class, reason: cell.reason, until: allowance.until });
      }
      expect(personal.length).toBeGreaterThan(50);
      expect(doorRowFindings({ doors, declarations: lastDeclarations(ROOT), allowed })).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CFDR-2 a planted owner door that reads by an argument alone fails, and the same door comparing the owner column passes", () => {
    const byArgument =
      "BEGIN SELECT l.title INTO v_title FROM public.listings l WHERE l.seller_id = p_seller; RETURN '{}'; END";
    expect(judge(byArgument)).toEqual([
      {
        door: "e2e_planted",
        file: "planted.sql",
        line: 7,
        what: "owner door compares no column of a row it reads with the caller, and has no line in door-rows-allowlist.txt",
      },
    ]);
    const byCaller =
      "BEGIN SELECT l.title INTO v_title FROM public.listings l WHERE l.seller_id = auth.uid(); RETURN '{}'; END";
    expect(judge(byCaller)).toEqual([]);
    // The same door with a line in the allowlist and a comparison is idle; without one, it is not.
    const line: AllowedDoor = { class: "public", reason: "a catalogue", until: "DEC-471" };
    expect(judge(byCaller, { e2e_planted: line })[0]?.what).toBe(
      "its allowlist line is idle: it compares l.seller_id with the caller",
    );
    expect(judge(byArgument, { e2e_planted: line })).toEqual([]);
  });

  it("CFDR-3 the matching rule counts a column of a row the body reads, and not a literal, an argument or a variable filled from elsewhere", () => {
    // counted
    expect(planted("SELECT 1 FROM public.t x WHERE x.owner_id = auth.uid()")).toEqual([
      "x.owner_id",
    ]);
    expect(planted("SELECT 1 FROM public.t WHERE auth.uid() = owner_id")).toEqual(["owner_id"]);
    expect(planted("SELECT 1 FROM public.t WHERE owner_id = (SELECT auth.uid())")).toEqual([
      "owner_id",
    ]);
    expect(planted("SELECT 1 FROM public.t WHERE owner_id::uuid = auth.uid()::uuid")).toEqual([
      "owner_id",
    ]);
    expect(
      planted("SELECT 1 FROM public.t WHERE owner_id IS NOT DISTINCT FROM auth.uid()"),
    ).toEqual(["owner_id"]);
    expect(planted("SELECT 1 FROM public.t WHERE owner_id <> auth.uid()")).toEqual(["owner_id"]);
    expect(planted("UPDATE public.t SET n = 1 WHERE owner_id = v_ctx.uid")).toEqual(["owner_id"]);
    expect(planted("DELETE FROM public.t WHERE owner_id = auth.uid()")).toEqual(["owner_id"]);
    expect(
      planted(
        "DECLARE v_uid uuid := auth.uid(); BEGIN SELECT 1 FROM public.t t WHERE t.u = v_uid; END",
      ),
    ).toEqual(["t.u"]);
    expect(
      planted(
        "BEGIN SELECT * INTO v_row FROM public.t WHERE id = p_listing_id; IF v_row.owner_id <> auth.uid() THEN RETURN 1; END IF; END",
      ),
    ).toEqual(["v_row.owner_id"]);
    expect(
      planted(
        "BEGIN SELECT owner_id INTO v_owner FROM public.t WHERE id = p_listing_id; IF v_owner IS DISTINCT FROM auth.uid() THEN RETURN 1; END IF; END",
      ),
    ).toEqual(["v_owner"]);
    expect(
      planted(
        "BEGIN FOR v_r IN SELECT * FROM public.t WHERE id = 1 LOOP IF v_r.owner_id = auth.uid() THEN RETURN 1; END IF; END LOOP; END",
      ),
    ).toEqual(["v_r.owner_id"]);
    // not counted: a literal, an argument, a variable the body fills from no table row, a caller beside a caller
    expect(planted("SELECT 1 FROM public.t WHERE 'abc' = auth.uid()")).toEqual([]);
    expect(planted("SELECT 1 FROM public.t WHERE p_seller = auth.uid()")).toEqual([]);
    expect(
      planted("SELECT 1 FROM public.t WHERE p_seller = v_ctx.uid AND id = p_listing_id"),
    ).toEqual([]);
    expect(
      planted(
        "DECLARE v_other uuid := p_seller; BEGIN IF v_other = auth.uid() THEN RETURN 1; END IF; END",
      ),
    ).toEqual([]);
    expect(
      planted(
        "DECLARE v_uid uuid := auth.uid(); BEGIN IF v_uid = auth.uid() THEN RETURN 1; END IF; END",
      ),
    ).toEqual([]);
    // an argument not named p_ is an argument too (read from the header)
    expect(
      planted("SELECT 1 FROM public.t WHERE seller = auth.uid()", "(seller uuid) RETURNS jsonb"),
    ).toEqual([]);
    // no row is read: a bare name beside no table is not a column
    expect(planted("SELECT owner_id = auth.uid()")).toEqual([]);
  });

  it("CFDR-4 a body the check cannot read fails, never passes", () => {
    const computed = doorRowFindings({
      doors: [door("e2e_planted"), door("e2e_missing")],
      declarations: new Map([["e2e_planted", { ...reader("x"), computed: true }]]),
      allowed: new Map(),
    });
    expect(computed.map((f) => `${f.door}: ${f.what}`)).toEqual([
      "e2e_missing: its last declaration cannot be read (built at run time, or none)",
      "e2e_planted: its last declaration cannot be read (built at run time, or none)",
    ]);
    expect(judge("   ")[0]?.what).toMatch(/cannot be read/);
  });

  it("CFDR-5 a door that is not personal is not judged: staff, public and staff-reader lines stay with their own judges", () => {
    for (const cls of ["staff", "public-door", "public-reader", "staff-reader"])
      expect(judge("SELECT 1 FROM public.t WHERE id = p_listing_id", {}, cls)).toEqual([]);
    for (const cls of PERSONAL_CLASSES)
      expect(judge("SELECT 1 FROM public.t WHERE id = p_listing_id", {}, cls)).toHaveLength(1);
  });

  it("CFDR-6 an allowlist line reads `<class>: <reason>`: the permanent classes carry DEC-471, held a date or an INC, any other class or shape fails", () => {
    expect(readClassCell("public: a catalogue", "DEC-471")).toEqual({
      class: "public",
      reason: "a catalogue",
    });
    expect(readClassCell("delegates: the core compares", "DEC-471")).toEqual({
      class: "delegates",
      reason: "the core compares",
    });
    expect(readClassCell("held: a row the caller holds", "2099-01-01")).toEqual({
      class: "held",
      reason: "a row the caller holds",
    });
    expect(readClassCell("held: a row the caller holds", "INC-1000")).toEqual({
      class: "held",
      reason: "a row the caller holds",
    });
    expect(readClassCell("public: a catalogue", "INC-1000")).toBe(
      "the permanent class public carries DEC-471",
    );
    expect(readClassCell("held: a row the caller holds", "DEC-471")).toBe(
      "the class held carries a date or an INC, not DEC-471",
    );
    expect(readClassCell("own: nothing", "DEC-471")).toMatch(/is not one of/);
    expect(readClassCell("a catalogue", "DEC-471")).toBe(
      "the reason must read `<class>: <reason>`",
    );
    expect(readClassCell("public:", "DEC-471")).toBe("the reason must read `<class>: <reason>`");
  });

  it("CFDR-7 a line for a door the manifest does not list as personal is stale, and a past date is expired (the kit's grammar)", () => {
    const dir = mkdtempSync(join(tmpdir(), "door-rows-"));
    const write = (text: string) => {
      const path = join(dir, "allowlist.txt");
      writeFileSync(path, text);
      return path;
    };
    const found = ["e2e_planted"];
    try {
      expect(() =>
        readAllowlist(write("e2e_gone | public: a catalogue | DEC-471\n"), found),
      ).toThrow(/stale allowance/);
      expect(() =>
        readAllowlist(write("e2e_planted | held: a grant | 2020-01-01\n"), found),
      ).toThrow(/expired allowance/);
      expect(
        readAllowlist(write("e2e_planted | public: a catalogue | DEC-471\n"), found).size,
      ).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

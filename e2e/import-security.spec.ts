import { expect, test } from "./fixtures";

import { gotoReady, switchUser } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import {
  rand,
  bandOnly,
  destroyCategory,
  grantRole,
  signInAsSuperAdmin,
} from "./helpers/categories";

/**
 * IMPORT-GATE PART D — HOSTILE FILES, ONE SPEC, EVERY FAMILY.
 *
 * The gate is a single door (`src/server/imports/gate.ts`), so its proof is a
 * single PARAMETERISED spec: each registered family is driven through the same
 * hostile catalogue and must answer the same way. A family added to the
 * registry is added HERE, never given a private test.
 *
 * J-laws: nothing is seeded and nothing is committed — every case is a
 * `preview`, the door that writes nothing (F5), so the spec mutates no global
 * list (J6) and needs no scratch reaping beyond its own namespaced keys.
 */

interface Family {
  id: string;
  path: string;
  /** The body field carrying the file text. */
  field: string;
  /** The exact export header, unlabelled. */
  header: string;
  /** A well-formed row; `mutate` replaces one cell. */
  row: (cells?: Partial<Record<string, string>>) => string;
  /** The identity cell's column name, for the too-long / bad-slug cases. */
  identity: string;
  /**
   * The reason a MALFORMED identity is refused by. `badSlug` for a family whose
   * identity carries the gate's slug/key law; a family whose identity shape is
   * the planner's verdict (a slash path) or whose cap alone settles it (a
   * two-letter country code) names its own word — one refusal per row either
   * way, and never a silent pass.
   */
  identityReason?: string;
  /** A header belonging to ANOTHER family — the wrongFile case. */
  foreignHeader: string;
  /** The door this family exposes: a preview plan, or a one-step import. */
  mode: "preview" | "commit";
  /** Extra body fields every request to this family carries (e.g. `lang`). */
  body?: Record<string, unknown>;
  /** Only a family with a preview door can have its bytes digest-checked. */
  digest?: boolean;
  /** The cell the formula case poisons. */
  formulaCell: string;
  /**
   * The row the rate-limit case repeats. A one-step family meters its WRITE
   * door, so its metering probe must be a row the gate refuses on its own —
   * the ceiling is proven without a single write (J6).
   */
  meterRow?: () => string;
  /**
   * DEC-050 L2b — the family's own SHAPE hostility: rows whose cells are the
   * wrong shape for a declared column (a bound that is not a number or a year,
   * a format that is not on the allowlist, an option carrying an unknown field
   * or a non-boolean flag). The gate refuses each on its own row and names the
   * reason; the semantics stay the planner's.
   */
  shapeProbe?: () => { rows: string[]; reasons: string[] };
}

/** A CSV cell that may carry commas or quotes. */
function csv(value: string): string {
  return `"${value.split('"').join('""')}"`;
}

/**
 * DEC-050 L2b — the nine v2 cells sit between `depends_on` and the two
 * read-only cells; `V2_EMPTY` splices them into the hostile rows below so the
 * probes read exactly as before.
 */
const V2_COLUMNS = [
  "unit",
  "min",
  "max",
  "decimals",
  "format",
  "preset",
  "max_length",
  "help_text_en",
  "help_text_am",
] as const;
const V2_EMPTY = V2_COLUMNS.map(() => "").join(",");
const ATTRIBUTE_HEADER =
  `attribute_key,label_en,label_am,type,options,depends_on,${V2_COLUMNS.join(",")},` +
  "is_per_variant,direct_link_count";
const CATEGORY_HEADER =
  "category_path,category_slug,parent_slug,name_en,name_am,display_order,is_active," +
  "allow_listings,is_catchall,price_enabled,capabilities,default_price_period," +
  "price_period_locked,expiry_days,icon,visible_from,visible_until," +
  "excluded_country_codes,secondary_parents,listing_count,origin_scope";

const TRANSLATION_HEADER = "key,source,translation,context";

const COUNTRY_HEADER =
  "country_code,name_en,is_active,unit_system,currency_code,display_order,root_order";
const LOCATION_HEADER =
  "location_path,location_key,name_en,name_am,iso_3166_2,aliases,display_order," +
  "center_lat,center_lng,is_active,level,country_code,source,listing_count";

const FAMILIES: Family[] = [
  {
    id: "attributes",
    path: "/api/admin/attributes/import",
    field: "definitions",
    header: ATTRIBUTE_HEADER,
    identity: "attribute_key",
    foreignHeader: CATEGORY_HEADER,
    mode: "preview",
    digest: true,
    formulaCell: "label_en",
    row: (cells = {}) => {
      const key = cells["attribute_key"] ?? `e2e_attr_${rand()}`;
      const label = cells["label_en"] ?? "Hostile probe";
      const type = cells["type"] ?? "text";
      const options = cells["options"] ?? "";
      const dependsOn = cells["depends_on"] ?? "";
      return `${key},${label},,${type},"${options}",${dependsOn},${V2_EMPTY},,0`;
    },
    shapeProbe: () => {
      const cells = (over: Partial<Record<string, string>> = {}): string =>
        [
          over["attribute_key"] ?? `e2e_attr_${rand()}`,
          "Shape probe",
          "",
          over["type"] ?? "number",
          over["options"] ?? "",
          "",
          "",
          over["min"] ?? "",
          "",
          "",
          "",
          over["preset"] ?? "",
          "",
          "",
          "",
          "",
          "0",
        ].join(",");
      return {
        rows: [
          // a bound that is neither a number nor a year token
          cells({ min: "twenty" }),
          // a text format that is not on the allowlist
          cells({ type: "text", preset: "regex:.*" }),
          // an option carrying a field the import does not know
          cells({
            type: "single_select",
            options: csv('{"value": "alpha", "colour": "red"}'),
          }),
          // an option whose on/off flag is not a boolean
          cells({
            type: "single_select",
            options: csv('{"value": "beta", "active": "yes"}'),
          }),
        ],
        reasons: ["badBound", "badPreset", "optionKey", "optionShape"],
      };
    },
  },
  {
    id: "categories",
    path: "/api/admin/categories/import",
    field: "categories",
    header: CATEGORY_HEADER,
    identity: "category_slug",
    foreignHeader: ATTRIBUTE_HEADER,
    mode: "preview",
    digest: true,
    formulaCell: "name_en",
    row: (cells = {}) => {
      const slug = cells["category_slug"] ?? `e2e-cat-${rand()}`;
      const name = cells["name_en"] ?? "Hostile probe";
      const visibleFrom = cells["visible_from"] ?? "";
      // U6-C1-R1 — 21 cells, in CATEGORY_HEADER order: the three posting cells
      // (capabilities, default_price_period, price_period_locked) sit between
      // price_enabled and expiry_days, so `30` stays the expiry, not a capability.
      return (
        `,${slug},,${name},,10,true,true,,true,` +
        `,,,30,,${visibleFrom},,,,,`
      );
    },
  },
  {
    /**
     * IMPORT-GATE PART C — UI STRINGS. One step, so the metered door is the
     * WRITE and the hostile catalogue is driven against it: every probe below
     * is refused by the gate itself, so the language catalog is never touched
     * (J6) and no step-up is ever demanded of a file that never reached the
     * writer.
     */
    id: "translations",
    path: "/api/admin/translations/import",
    field: "strings",
    header: TRANSLATION_HEADER,
    identity: "key",
    foreignHeader: CATEGORY_HEADER,
    mode: "commit",
    body: { lang: "zxx-mo" },
    formulaCell: "key",
    row: (cells = {}) => {
      const key = cells["key"] ?? `e2e.gate.${rand()}`;
      const value = cells["translation"] ?? "Hostile probe";
      return `${key},"src","${value}","note"`;
    },
    meterRow: () => `Not A Key!!,"src","x","note"`,
  },
  /**
   * LOCATIONS ERA L1b-C — GEOGRAPHY, TWO FILES. Both entries drive the SAME
   * door with the other file empty, so each file's identity, shape and format
   * law is proven on its own; every probe is a `preview`, which writes nothing,
   * and every scratch key carries an `e2e-` segment (J1).
   */
  {
    id: "locations-countries",
    path: "/api/admin/locations/import",
    field: "countries",
    body: { locations: "" },
    header: COUNTRY_HEADER,
    identity: "country_code",
    // A two-letter cap settles a malformed code before any shape law is needed.
    identityReason: "tooLong",
    foreignHeader: CATEGORY_HEADER,
    mode: "preview",
    digest: true,
    formulaCell: "name_en",
    row: (cells = {}) =>
      `${cells["country_code"] ?? "ZQ"},${cells["name_en"] ?? "Hostile probe"},false,metric,,0,`,
  },
  {
    id: "locations-locations",
    path: "/api/admin/locations/import",
    field: "locations",
    body: { countries: "" },
    header: LOCATION_HEADER,
    identity: "location_key",
    // The slash key's shape is `loc_import_plan`'s verdict, by name.
    identityReason: "badKey",
    foreignHeader: CATEGORY_HEADER,
    mode: "preview",
    digest: true,
    formulaCell: "name_en",
    row: (cells = {}) =>
      `,${cells["location_key"] ?? `ethiopia/e2e-l1b-${rand()}`},${
        cells["name_en"] ?? "Hostile probe"
      },,,,0,9.0,38.7,false,,,,`,
    shapeProbe: () => {
      const cells = (over: Partial<Record<string, string>> = {}): string =>
        [
          "",
          over["location_key"] ?? `ethiopia/e2e-l1b-${rand()}`,
          "Shape probe",
          "",
          "",
          "",
          "0",
          over["center_lat"] ?? "9.0",
          over["center_lng"] ?? "38.7",
          over["is_active"] ?? "false",
          "",
          "",
          "",
          "",
        ].join(",");
      return {
        rows: [
          // a latitude that is not a number at all
          cells({ center_lat: "north" }),
          // a longitude carrying more precision than the column declares
          cells({ center_lng: "38.123456789" }),
          // an on/off cell that is neither true nor false
          cells({ is_active: "maybe" }),
          /**
           * INC-208 — A PLAIN NEGATIVE IS A NUMBER. A southern latitude spelt
           * without the export's apostrophe must reach the planner: the gate's
           * formula law exempts numeric columns, so this row is NOT refused as
           * `formula` (the block below asserts no such refusal exists).
           */
          cells({ center_lat: "-33.9", center_lng: "18.4" }),
        ],
        reasons: ["badNumber", "badNumber", "badBoolean"],
      };
    },
  },
];

async function bearerOf(page: import("@playwright/test").Page): Promise<string> {
  const token = await page.evaluate(async () => {
    const client = (
      window as unknown as {
        __ethioSupabase: {
          auth: {
            getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
          };
        };
      }
    ).__ethioSupabase;
    const { data } = await client.auth.getSession();
    return data.session?.access_token ?? "";
  });
  expect(token, "IMPORT-GATE the page carries no bearer").not.toBe("");
  return token;
}

for (const family of FAMILIES) {
  test.describe(`IMPORT-GATE ${family.id}`, () => {
    async function post(
      page: import("@playwright/test").Page,
      token: string,
      body: Record<string, unknown>,
    ) {
      const response = await page.request.post(family.path, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { mode: family.mode, ...(family.body ?? {}), ...body },
      });
      let payload: Record<string, unknown> = {};
      try {
        payload = (await response.json()) as Record<string, unknown>;
      } catch {
        payload = {};
      }
      return { status: response.status(), payload };
    }

    const file = (rows: string[]) => `${family.header}\r\n${rows.join("\r\n")}\r\n`;

    /**
     * IG-1 — THE WHOLE-FILE REFUSALS. Each of these is a verdict on the FILE:
     * nothing is parsed past it, and every one is answered with a named reason,
     * never a 500 and never a silent partial plan (F4).
     */
    test(`IG-1 ${family.id}: malformed, foreign, oversized and unreadable files are refused whole`, async ({
      page,
    }) => {
      test.setTimeout(240_000);
      bandOnly(page, "any");
      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      // (a) a header that belongs to NOBODY.
      const nonsense = await post(page, token, { [family.field]: "a,b,c\r\n1,2,3\r\n" });
      expect(nonsense.status, JSON.stringify(nonsense.payload)).toBe(400);
      expect(nonsense.payload["error"]).toBe("badHeader");

      // (b) a header that belongs to ANOTHER family — file identity, not shape.
      const foreign = await post(page, token, {
        [family.field]: `${family.foreignHeader}\r\n`,
      });
      expect(foreign.status, JSON.stringify(foreign.payload)).toBe(400);
      expect(foreign.payload["error"]).toBe("wrongFile");

      // (c) an EMPTY file is empty, not an empty plan.
      const empty = await post(page, token, { [family.field]: "" });
      expect(empty.status, JSON.stringify(empty.payload)).toBe(400);
      expect(empty.payload["error"]).toBe("no file");

      // (d) a header carrying a column the family does not declare.
      const unknown = await post(page, token, {
        [family.field]: `${family.header},evil\r\n`,
      });
      expect(unknown.status, JSON.stringify(unknown.payload)).toBe(400);
      expect(["unknownColumn", "badHeader"]).toContain(unknown.payload["error"]);

      // (e) OVER THE BYTE CAP — 1 MB of well-formed rows is still refused.
      const filler = family.row({ [family.identity]: "e2e-cat-filler" });
      const big = `${family.header}\r\n${`${filler}\r\n`.repeat(20000)}`;
      const oversize = await post(page, token, { [family.field]: big });
      expect([413, 400]).toContain(oversize.status);
      expect(["fileTooLarge", "tooManyRows"]).toContain(oversize.payload["error"]);

      // (f) a NUL byte is not text.
      const nul = await post(page, token, {
        [family.field]: file([
          family.row({ name_en: "a\u0000b", label_en: "a\u0000b", translation: "a\u0000b" }),
        ]),
      });
      expect(nul.status, JSON.stringify(nul.payload)).toBe(400);
      expect(nul.payload["error"]).toBe("nulByte");

      // (g) NO BEARER, NO DOOR — the gate answers before it reads anything.
      const anonymous = await page.request.post(family.path, {
        data: { mode: family.mode, [family.field]: file([family.row()]) },
      });
      expect(anonymous.status()).toBe(401);
    });

    /**
     * IG-2 — PER-ROW HOSTILITY. A dangerous or malformed CELL refuses its own
     * row with a named reason and leaves the rest of the plan standing; the
     * preview still writes nothing.
     */
    test(`IG-2 ${family.id}: dangerous cells refuse their own row and name the reason`, async ({
      page,
    }) => {
      test.setTimeout(240_000);
      bandOnly(page, "any");
      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const formulaCell = family.formulaCell;
      const rows = [
        // a RAW spreadsheet formula
        family.row({ [formulaCell]: "=cmd|'/c calc'!A1" }),
        // an identity that is not a slug
        family.row({ [family.identity]: "Not A Slug!!" }),
        // an identity longer than the law allows
        family.row({
          [family.identity]: `e2e-${"x".repeat(family.id === "translations" ? 220 : 80)}`,
        }),
        // a label past the 120-character cap
        family.row({ [formulaCell]: "L".repeat(240) }),
      ];
      const probe = await post(page, token, { [family.field]: file(rows) });
      expect(probe.status, JSON.stringify(probe.payload)).toBe(200);
      const refusals = (probe.payload["refusals"] as { reason: string; row: number }[]) ?? [];
      const reasons = refusals.map((entry) => entry.reason);
      expect(reasons, JSON.stringify(refusals)).toEqual(
        expect.arrayContaining(["formula", family.identityReason ?? "badSlug", "tooLong"]),
      );
      // Every refusal names the row the operator sees, never row 0.
      for (const refusal of refusals) expect(refusal.row).toBeGreaterThan(1);

      // BIDI OVERRIDES AND ZERO-WIDTH characters are stripped, not stored: an
      // identity disguised with them is judged on what it REALLY says, and the
      // refusal names the cleaned value, never the disguise.
      const disguised = await post(page, token, {
        [family.field]: file([family.row({ [family.identity]: "e2e\u200b-cat\u202e-ok!!" })]),
      });
      expect(disguised.status, JSON.stringify(disguised.payload)).toBe(200);
      const disguisedRefusals =
        (disguised.payload["refusals"] as { key: string; reason: string }[]) ?? [];
      expect(
        disguisedRefusals.map((entry) => entry.reason),
        JSON.stringify(disguisedRefusals),
      ).toContain(family.identityReason ?? "badSlug");
      for (const refusal of disguisedRefusals) {
        expect(refusal.key).not.toMatch(/[\u200b\u202e]/);
        if (refusal.reason === "badSlug") expect(refusal.key).toBe("e2e-cat-ok!!");
      }

      /**
       * DEC-050 L2b — SHAPE HOSTILITY. A cell of the wrong SHAPE for its
       * declared column is refused by the gate itself: named reason, own row,
       * nothing written, and the rest of the plan still stands.
       */
      const shape = family.shapeProbe?.();
      if (shape !== undefined) {
        const answer = await post(page, token, { [family.field]: file(shape.rows) });
        expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
        const shapeRefusals =
          (answer.payload["refusals"] as { reason: string; row: number }[]) ?? [];
        expect(
          shapeRefusals.map((entry) => entry.reason),
          JSON.stringify(shapeRefusals),
        ).toEqual(expect.arrayContaining(shape.reasons));
        for (const refusal of shapeRefusals) expect(refusal.row).toBeGreaterThan(1);
        // INC-208: no numeric cell is read as a formula, in any family.
        expect(
          shapeRefusals.map((entry) => entry.reason),
          JSON.stringify(shapeRefusals),
        ).not.toContain("formula");
      }

      /**
       * DEC-057 L2 — `allowed` HOSTILITY, ONE ROW PER RULE. The gate admits the
       * key and judges its SHAPE; `attr_option_shape` judges the record and
       * `attr_allowed_check` judges the TARGET. Every rule refuses its own row
       * and names its id and detail; a preview writes nothing, so the scratch
       * fixtures below are read-only to the plan (F5/J6).
       */
      /**
       * INC-198/199 L2 — SILENCE IS THE DEFECT. Three rows the categories
       * planner used to answer with nothing: a status cell that contradicts the
       * stored status, a root delete held down by a retired child, and a delete
       * for a slug that is not there. Each must answer — two by name, one as an
       * unchanged row that SAYS why. Every fixture is J1-namespaced, written
       * through the service client (J5) and destroyed in `finally`; the preview
       * writes nothing (F5).
       */
      if (family.id === "categories") {
        const supabase = adminClient();
        const retiredSlug = `e2e-cat-${rand()}`;
        const rootSlug = `e2e-cat-${rand()}`;
        const childSlug = `e2e-cat-${rand()}`;
        const goneSlug = `e2e-cat-${rand()}`;
        /** The header carries `action`; the row is the family's own, plus it. */
        const actionFile = (rows: string[]) =>
          `${family.header},action\r\n${rows.join("\r\n")}\r\n`;
        try {
          const { data: seeded, error: seedError } = await supabase
            .from("categories")
            .insert([
              { slug: retiredSlug, name_en: retiredSlug, is_active: false },
              { slug: rootSlug, name_en: rootSlug, is_active: false },
              { slug: childSlug, name_en: childSlug, is_active: false },
            ])
            .select("id, slug");
          if (seedError || !seeded) {
            throw new Error(`IG-2 categories seed failed: ${seedError?.message}`);
          }
          const idOf = (slug: string) => seeded.find((row) => row.slug === slug)!.id;
          const { error: pointerError } = await supabase.from("category_tree_pointers").insert([
            { parent_id: null, child_id: idOf(rootSlug), display_order: 0 },
            { parent_id: idOf(rootSlug), child_id: idOf(childSlug), display_order: 0 },
          ]);
          if (pointerError) {
            throw new Error(`IG-2 categories pointers failed: ${pointerError.message}`);
          }

          // (k) is_active = true on a RETIRED category, with no action.
          const mismatch = await post(page, token, {
            [family.field]: file([
              family.row({ category_slug: retiredSlug, name_en: retiredSlug }),
            ]),
          });
          expect(mismatch.status, JSON.stringify(mismatch.payload)).toBe(200);
          const mismatchRefusals =
            (mismatch.payload["refusals"] as { reason: string; detail?: string }[]) ?? [];
          const mismatchDump = JSON.stringify(mismatch.payload);
          const named = mismatchRefusals.find((entry) => entry.reason === "statusNeedsAction");
          expect(named, `IG-2 (k) ${mismatchDump}`).toBeTruthy();
          expect(named?.detail ?? "", `IG-2 (k) ${mismatchDump}`).toContain("stored=false");
          expect(named?.detail ?? "", `IG-2 (k) ${mismatchDump}`).toContain("requested=true");

          // (l) a delete for a root a RETIRED child still hangs under.
          const blocked = await post(page, token, {
            [family.field]: actionFile([
              `${family.row({ category_slug: rootSlug, name_en: rootSlug })},delete`,
            ]),
          });
          expect(blocked.status, JSON.stringify(blocked.payload)).toBe(200);
          const blockedRefusals =
            (blocked.payload["refusals"] as { reason: string; detail?: string }[]) ?? [];
          const blockedDump = JSON.stringify(blocked.payload);
          const held = blockedRefusals.find((entry) => entry.reason === "hasChildren");
          expect(held, `IG-2 (l) ${blockedDump}`).toBeTruthy();
          expect(held?.detail ?? "", `IG-2 (l) ${blockedDump}`).toContain(childSlug);

          // (m) a delete for a slug that is not there: UNCHANGED, and it says so.
          const absent = await post(page, token, {
            [family.field]: actionFile([
              `${family.row({ category_slug: goneSlug, name_en: goneSlug })},delete`,
            ]),
          });
          expect(absent.status, JSON.stringify(absent.payload)).toBe(200);
          const absentDump = JSON.stringify(absent.payload);
          expect(absent.payload["refusals"], `IG-2 (m) ${absentDump}`).toEqual([]);
          const absentCounts = (absent.payload["counts"] as Record<string, number>) ?? {};
          expect(absentCounts["unchanged"], `IG-2 (m) ${absentDump}`).toBe(1);
          expect(absentCounts["deletes"] ?? 0, `IG-2 (m) ${absentDump}`).toBe(0);
          const absentItems =
            (absent.payload["items"] as { slug?: string; op?: string; detail?: string }[]) ?? [];
          expect(
            absentItems.some(
              (item) =>
                item.slug === goneSlug && item.op === "noop" && item.detail === "alreadyDeleted",
            ),
            `IG-2 (m) ${absentDump}`,
          ).toBe(true);

          // The previews wrote nothing: the absent slug is still absent (F5).
          const { data: written } = await supabase
            .from("categories")
            .select("slug")
            .eq("slug", goneSlug);
          expect(written ?? [], `IG-2 a preview wrote a category: ${absentDump}`).toHaveLength(0);
        } finally {
          await destroyCategory(childSlug);
          await destroyCategory(rootSlug);
          await destroyCategory(retiredSlug);
        }
      }

      if (family.id === "attributes") {
        const supabase = adminClient();
        const targetKey = `e2e_attr_${rand()}`;
        const numberKey = `e2e_attr_${rand()}`;
        const selfKey = `e2e_attr_${rand()}`;
        const depKey = `e2e_attr_${rand()}`;
        const allowedSharedKey = `e2e_attr_${rand()}`;
        const allowedNowhereKey = `e2e_attr_${rand()}`;
        const boundsSharedKey = `e2e_attr_${rand()}`;
        const boundsNowhereKey = `e2e_attr_${rand()}`;
        const sharedNumberKey = `e2e_attr_${rand()}`;
        const slugA = `e2e-cat-${rand()}`;
        const slugB = `e2e-cat-${rand()}`;
        /** The options cell is quoted by `row()`, so inner quotes are doubled. */
        const opts = (payload: unknown) => JSON.stringify(payload).split('"').join('""');
        const allowedRow = (key: string, allowed: unknown, dependsOn = "") =>
          family.row({
            attribute_key: key,
            type: "single_select",
            options: opts([{ value: "a", allowed }, { value: "b" }]),
            depends_on: dependsOn,
          });
        const boundsRow = (key: string, target: string) =>
          family.row({
            attribute_key: key,
            type: "single_select",
            options: opts([{ value: "a", bounds: { [target]: { min: 1 } } }]),
          });
        try {
          const { data: seeded, error: seedError } = await supabase
            .from("attributes")
            .insert([
              {
                attr_key: targetKey,
                name_en: targetKey,
                attr_type: "single_select",
                options: [{ value: "x" }, { value: "y" }, { value: "z" }],
              },
              { attr_key: numberKey, name_en: numberKey, attr_type: "number" },
              { attr_key: sharedNumberKey, name_en: sharedNumberKey, attr_type: "number" },
            ])
            .select("id, attr_key");
          if (seedError || !seeded) throw new Error(`IG-2 seed failed: ${seedError?.message}`);
          const target = seeded.find((row) => row.attr_key === targetKey);
          const sharedNumber = seeded.find((row) => row.attr_key === sharedNumberKey);
          if (!target || !sharedNumber) throw new Error("IG-2 seeded targets missing");

          const { data: cats, error: catError } = await supabase
            .from("categories")
            .insert([
              { slug: slugA, name_en: slugA, is_active: true, allow_listings: true },
              { slug: slugB, name_en: slugB, is_active: true, allow_listings: true },
            ])
            .select("id, slug");
          if (catError || !cats) throw new Error(`IG-2 categories failed: ${catError?.message}`);
          const catA = cats.find((row) => row.slug === slugA)!;
          // Each positive target is used at ONE of its owner's two categories only.
          const { error: linkError } = await supabase.from("category_attribute_links").insert([
            { category_id: catA.id, attribute_id: target.id, display_order: 0 },
            { category_id: catA.id, attribute_id: sharedNumber.id, display_order: 1 },
          ]);
          if (linkError) throw new Error(`IG-2 link failed: ${linkError.message}`);
          // (h) needs a LIVE dependent: the parent walk anchors on live rows
          // (DEC-057 L2-mig), so the dependent is seeded, not created in-file.
          const { error: depError } = await supabase.from("attributes").insert({
            attr_key: depKey,
            name_en: depKey,
            attr_type: "single_select",
            options: [{ value: "a" }, { value: "b" }],
            depends_on: target.id,
          });
          if (depError) throw new Error(`IG-2 dependent failed: ${depError.message}`);

          const rows = [
            // (a) `allowed` is not a set of attributes at all — the gate's own.
            allowedRow(`e2e_attr_${rand()}`, []),
            // (b) a value list that is not a list — the gate's own.
            allowedRow(`e2e_attr_${rand()}`, { [targetKey]: "x" }),
            // (c) six targets.
            allowedRow(`e2e_attr_${rand()}`, {
              [targetKey]: ["x"],
              t2: ["x"],
              t3: ["x"],
              t4: ["x"],
              t5: ["x"],
              t6: ["x"],
            }),
            // (d) an empty list.
            allowedRow(`e2e_attr_${rand()}`, { [targetKey]: [] }),
            // (e) the same value twice.
            allowedRow(`e2e_attr_${rand()}`, { [targetKey]: ["x", "x"] }),
            // (f) a target that is a number definition.
            allowedRow(`e2e_attr_${rand()}`, { [numberKey]: ["1"] }),
            // (g) the owner targeting ITSELF.
            allowedRow(selfKey, { [selfKey]: ["b"] }),
            // (h) a dependent targeting its own `depends_on` parent.
            allowedRow(depKey, { [targetKey]: ["x"] }, targetKey),
            // (i) a value the target does not offer.
            allowedRow(`e2e_attr_${rand()}`, { [targetKey]: ["q"] }),
            // (j) target linked in NONE of the owner's categories: refused.
            allowedRow(allowedNowhereKey, { [targetKey]: ["x"] }),
            // (k) target linked in ONE of the owner's two categories: accepted.
            allowedRow(allowedSharedKey, { [targetKey]: ["x"] }),
            // (l) number target linked in NONE of the owner's categories: refused.
            boundsRow(boundsNowhereKey, sharedNumberKey),
            // (m) number target linked in ONE of the owner's two categories: accepted.
            boundsRow(boundsSharedKey, sharedNumberKey),
          ];
          const links =
            "category_path,category_slug,attribute_key,is_required,is_filterable,card_rank,origin\r\n" +
            `${slugB},${slugB},${allowedNowhereKey},false,false,,${slugB}\r\n` +
            `${slugA},${slugA},${allowedSharedKey},false,false,,${slugA}\r\n` +
            `${slugB},${slugB},${allowedSharedKey},false,false,,${slugB}\r\n` +
            `${slugB},${slugB},${boundsNowhereKey},false,false,,${slugB}\r\n` +
            `${slugA},${slugA},${boundsSharedKey},false,false,,${slugA}\r\n` +
            `${slugB},${slugB},${boundsSharedKey},false,false,,${slugB}\r\n`;

          const answer = await post(page, token, { [family.field]: file(rows), links });
          expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
          const refusals =
            (answer.payload["refusals"] as { reason: string; detail?: string; row: number }[]) ??
            [];
          const dump = JSON.stringify(refusals);
          const named = (reason: string, detail: string) =>
            refusals.some(
              (entry) => entry.reason === reason && (entry.detail ?? "").includes(detail),
            );

          expect(named("optionShape", "allowedNotObject"), `IG-2 (a) ${dump}`).toBe(true);
          expect(named("optionShape", "allowedValuesNotArray"), `IG-2 (b) ${dump}`).toBe(true);
          expect(named("badOption", "allowedTooMany"), `IG-2 (c) ${dump}`).toBe(true);
          expect(named("badOption", `allowedEmpty:${targetKey}`), `IG-2 (d) ${dump}`).toBe(true);
          expect(named("badOption", `allowedDuplicate:${targetKey}`), `IG-2 (e) ${dump}`).toBe(
            true,
          );
          expect(named("allowedTargetNotSelect", numberKey), `IG-2 (f) ${dump}`).toBe(true);
          expect(named("allowedTargetCircular", selfKey), `IG-2 (g) ${dump}`).toBe(true);
          expect(named("allowedTargetCircular", depKey), `IG-2 (h) ${dump}`).toBe(true);
          expect(named("allowedUnknownValue", "q"), `IG-2 (i) ${dump}`).toBe(true);
          expect(named("allowedTargetNotColinked", targetKey), `IG-2 (j) ${dump}`).toBe(true);
          expect(
            refusals.some((entry) => entry.row === 12),
            `IG-2 (k) ${dump}`,
          ).toBe(false);
          expect(named("boundsTargetNotColinked", sharedNumberKey), `IG-2 (l) ${dump}`).toBe(true);
          expect(
            refusals.some((entry) => entry.row === 14),
            `IG-2 (m) ${dump}`,
          ).toBe(false);
          for (const refusal of refusals) expect(refusal.row, dump).toBeGreaterThan(1);

          // The preview wrote nothing: not one of these owners exists (F5).
          const { data: written } = await supabase
            .from("attributes")
            .select("attr_key")
            .in("attr_key", [
              selfKey,
              allowedSharedKey,
              allowedNowhereKey,
              boundsSharedKey,
              boundsNowhereKey,
            ]);
          expect(written ?? [], `IG-2 the preview wrote a definition: ${dump}`).toHaveLength(0);
        } finally {
          for (const key of [
            targetKey,
            numberKey,
            sharedNumberKey,
            selfKey,
            depKey,
            allowedSharedKey,
            allowedNowhereKey,
            boundsSharedKey,
            boundsNowhereKey,
          ]) {
            const { data: row } = await supabase
              .from("attributes")
              .select("id")
              .eq("attr_key", key)
              .maybeSingle();
            if (row) {
              await supabase.from("category_attribute_links").delete().eq("attribute_id", row.id);
              await supabase.from("attributes").delete().eq("id", row.id);
            }
          }
          await destroyCategory(slugA);
          await destroyCategory(slugB);
        }
      }
    });

    /**
     * IG-3 — THE DIGEST AND THE RATE LIMIT. A commit may only carry the bytes a
     * preview judged, and one operator cannot hammer the door.
     */
    test(`@private-identity IG-3 ${family.id}: a changed file cannot be committed and previews are rate limited`, async ({
      page,
    }) => {
      test.setTimeout(240_000);
      bandOnly(page, "any");
      // J9 — this test EXHAUSTS an operator's preview budget, so it spends its
      // own identity, never the pooled super admin every other test shares.
      await signInAsSuperAdmin(page);
      const operator = await createUser({ confirmed: true });
      await grantRole(operator.id, "super_admin");
      await switchUser(page, operator.email, operator.password);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const text = file([(family.meterRow ?? family.row)()]);
      if (family.digest === true) {
        const preview = await post(page, token, { [family.field]: text });
        expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
        expect(typeof preview.payload["digest"]).toBe("string");

        const tampered = await post(page, token, {
          mode: "commit",
          [family.field]: file([family.row(), family.row()]),
          digest: preview.payload["digest"],
        });
        expect(tampered.status, JSON.stringify(tampered.payload)).toBe(409);
        expect(tampered.payload["error"]).toBe("fileChanged");
      }

      // THE LIMIT: a budget of previews a minute per operator; past it the
      // door answers 429, and refusing costs nothing (no plan, no write).
      let limited = 0;
      for (let attempt = 0; attempt < 45; attempt += 1) {
        const answer = await post(page, token, { [family.field]: text });
        if (answer.status === 429) {
          expect(answer.payload["error"]).toBe("tooManyRequests");
          limited += 1;
          break;
        }
      }
      expect(limited, "IMPORT-GATE the preview rate limit never engaged").toBe(1);
    });

    /**
     * IG-4 — THE SECOND DIALECT (translations only). XLIFF 1.2 enters through
     * the SAME door: it is turned into the family's own columns and then walks
     * the identical key, hygiene and refusal law. A unit with no target is a
     * malformed row named by its position; a hostile id is refused by name.
     * Nothing here reaches the writer, so no catalog is touched (J6).
     */
    if (family.id === "translations") {
      test(`IG-4 ${family.id}: XLIFF enters the same door and is judged by the same law`, async ({
        page,
      }) => {
        test.setTimeout(240_000);
        bandOnly(page, "any");
        await signInAsSuperAdmin(page);
        await gotoReady(page, "/admin/categories");
        const token = await bearerOf(page);

        const xliff = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">`,
          `  <file original="ethio.com" datatype="plaintext" source-language="en" target-language="zxx-mo">`,
          `    <body>`,
          // (a) a unit with no target at all — no row, refused as `required`.
          `      <trans-unit id="e2e.gate.${rand()}"><source>x</source></trans-unit>`,
          // (b) an id that is not a key.
          `      <trans-unit id="Not A Key!!"><source>x</source><target>y</target></trans-unit>`,
          // (c) an id disguised with a zero-width space and a bidi override.
          `      <trans-unit id="e2e\u200b.gate\u202e.!!"><source>x</source><target>y</target></trans-unit>`,
          `    </body>`,
          `  </file>`,
          `</xliff>`,
        ].join("\n");

        const probe = await post(page, token, { [family.field]: xliff });
        expect(probe.status, JSON.stringify(probe.payload)).toBe(200);
        const refusals = (probe.payload["refusals"] as { reason: string; key: string }[]) ?? [];
        expect(
          refusals.map((entry) => entry.reason),
          JSON.stringify(refusals),
        ).toEqual(expect.arrayContaining(["required", "badSlug"]));
        for (const refusal of refusals) expect(refusal.key).not.toMatch(/[\u200b\u202e]/);
        // The writer was never reached: the run has no batch to take back.
        expect(probe.payload["batch_id"] ?? null).toBeNull();
        expect(probe.payload["imported"] ?? 0).toBe(0);

        // An XLIFF file with no units at all is empty, not an empty import.
        const hollow = await post(page, token, {
          [family.field]: `<?xml version="1.0"?>\n<xliff version="1.2"><file><body></body></file></xliff>`,
        });
        expect(hollow.status, JSON.stringify(hollow.payload)).toBe(400);
        expect(hollow.payload["error"]).toBe("emptyFile");
      });
    }
  });
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "../conformance/kit";
import { declarationsOf, functionCodeOf, type Declaration } from "../conformance/plan-seam";
import { sqlCodeOf } from "../conformance/perm-vocabulary";
import { identityKey, normaliseType, parseArgument, splitTopLevel } from "./identity";

export { identityKey, normaliseType, parseArgument, splitTopLevel } from "./identity";

/**
 * Foundations 1 (DEC-333) — THE STATIC CATALOGUE: every function of schema
 * public as the migrations leave it, keyed the way the live catalogue prints it
 * (`regprocedure::text`: `name(type,type)`), with the EXECUTE grants in effect
 * after the last statement that touched it.
 *
 * The reader walks every migration in order and replays, by offset:
 * - each `CREATE [OR REPLACE] FUNCTION` (plan-seam's reader: comments and DO
 *   blocks blanked), keeping the LAST declaration of each overload; a plain
 *   CREATE of a new function is born closed (the hosted ACL: no browser role,
 *   no service_role — scripts/ci/prepare-local-backend.sh (4c)); OR REPLACE
 *   keeps the grants in force;
 * - each `DROP FUNCTION`, which forgets the overload and its grants;
 * - each whole `GRANT … ON FUNCTION … TO …` / `REVOKE … ON FUNCTION … FROM …`
 *   statement, inside or outside a DO block, and the one dynamic form the tree
 *   holds — a `FOREACH f IN ARRAY ARRAY['public.a(uuid)', …] LOOP EXECUTE
 *   format('GRANT … %s … TO role', f)` loop over a literal array (INC-443);
 * - any other `EXECUTE format('GRANT|REVOKE … ON FUNCTION …')` whose target the
 *   reader cannot resolve is kept as `unseen` — the finding `grant-unseen`.
 *
 * Trigger and event-trigger functions stay in the catalogue (the live guards
 * exclude them; `check-doors` reads their grants for the stray-grant finding).
 */

export type GrantRole = "anon" | "authenticated" | "public" | "service_role";
export const GRANT_ROLES: readonly GrantRole[] = [
  "anon",
  "authenticated",
  "public",
  "service_role",
];

export type Volatility = "v" | "s" | "i";

export type CatalogueFunction = {
  /** `name(type,type)` as `regprocedure::text` prints it. */
  key: string;
  name: string;
  /** The input argument types, normalised to the catalogue's spelling. */
  argTypes: string[];
  /** The input argument names (`""` when unnamed), in order. */
  argNames: string[];
  /** The RETURNS clause, lower-cased and whitespace-folded (`jsonb`, `void`, `trigger`, `setof …`, `table(…)`). */
  returns: string;
  volatility: Volatility;
  definer: boolean;
  header: string;
  body: string;
  /** The migration (root-relative) holding the last declaration. */
  file: string;
  /** The line of that declaration's CREATE. */
  line: number;
  /** The roles holding EXECUTE after the last grant or revoke in effect. */
  roles: Set<GrantRole>;
};

export type UnseenGrant = { file: string; line: number; text: string };

export type Catalogue = {
  functions: Map<string, CatalogueFunction>;
  unseen: UnseenGrant[];
};

/** A browser role may run the function when it, or PUBLIC, holds EXECUTE. */
export function callableBy(fn: { roles: Set<GrantRole> }, role: "anon" | "authenticated"): boolean {
  return fn.roles.has(role) || fn.roles.has("public");
}

type Header = {
  argTypes: string[];
  argNames: string[];
  returns: string;
  volatility: Volatility;
  definer: boolean;
};

function parseHeader(header: string): Header {
  const open = header.indexOf("(");
  let depth = 0;
  let close = open;
  for (let at = open; at < header.length; at += 1) {
    if (header[at] === "(") depth += 1;
    else if (header[at] === ")") {
      depth -= 1;
      if (depth === 0) {
        close = at;
        break;
      }
    }
  }
  const args = splitTopLevel(header.slice(open + 1, close))
    .map(parseArgument)
    .filter((arg): arg is NonNullable<typeof arg> => arg !== null && arg.mode !== "out");
  const tail = header.slice(close + 1);
  const returnsMatch =
    /\bRETURNS\s+([\s\S]*?)(?=\s+(?:LANGUAGE|AS|STABLE|IMMUTABLE|VOLATILE|SECURITY|SET|STRICT|CALLED|RETURNS\s+NULL|PARALLEL|COST|ROWS|LEAKPROOF|NOT)\b|$)/i.exec(
      tail,
    );
  let returns = (returnsMatch?.[1] ?? "void").trim().replace(/\s+/g, " ").toLowerCase();
  if (!/^(?:setof\s|table\s*\()/.test(returns)) returns = normaliseType(returns);
  const words = tail.toLowerCase();
  const volatility: Volatility = /\bimmutable\b/.test(words)
    ? "i"
    : /\bstable\b/.test(words)
      ? "s"
      : "v";
  const definer = /\bsecurity\s+definer\b/.test(words);
  return {
    argTypes: args.map((arg) => arg.type),
    argNames: args.map((arg) => arg.name),
    returns,
    volatility,
    definer,
  };
}

/** Comments blanked, DO blocks KEPT (grants live inside them too), literals kept. */
function grantCodeOf(sql: string): string {
  return sqlCodeOf(sql);
}

type GrantEvent = {
  offset: number;
  verb: "grant" | "revoke";
  targets: string[];
  roles: GrantRole[];
  unseen?: string;
};

const WHOLE_GRANT =
  /\b(GRANT|REVOKE)\s+(?:EXECUTE|ALL(?:\s+PRIVILEGES)?)\s+ON\s+(?:FUNCTION|PROCEDURE|ROUTINE)\s+([\s\S]*?)\s+(?:TO|FROM)\s+([^;]+);/gi;
const FOREACH_GRANT =
  /FOREACH\s+(\w+)\s+IN\s+ARRAY\s+ARRAY\s*\[([\s\S]*?)\]\s*LOOP([\s\S]*?)END\s+LOOP/gi;
const FORMAT_GRANT =
  /EXECUTE\s+format\s*\(\s*'\s*(GRANT|REVOKE)\s+(?:EXECUTE|ALL(?:\s+PRIVILEGES)?)\s+ON\s+(?:FUNCTION|PROCEDURE|ROUTINE)\s+([^']*?)\s+(?:TO|FROM)\s+([^']+)'\s*,\s*([^)]*)\)/gi;

function rolesOf(text: string): GrantRole[] {
  const roles: GrantRole[] = [];
  for (const word of text.toLowerCase().match(/\b(?:anon|authenticated|public|service_role)\b/g) ??
    [])
    if ((GRANT_ROLES as readonly string[]).includes(word) && !roles.includes(word as GrantRole))
      roles.push(word as GrantRole);
  return roles;
}

function targetKey(text: string): string {
  const match = /^(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\s*(?:\(([\s\S]*)\))?$/.exec(
    text.trim(),
  );
  if (match === null) return text.trim();
  const name = (match[1] ?? "").toLowerCase();
  return match[2] === undefined ? name : identityKey(name, match[2]);
}

/** Every grant/revoke event of a file, with the FOREACH form expanded and the unresolvable kept as `unseen`. */
export function grantEventsOf(sql: string): GrantEvent[] {
  const code = grantCodeOf(sql);
  const events: GrantEvent[] = [];
  for (const match of code.matchAll(WHOLE_GRANT)) {
    events.push({
      offset: match.index ?? 0,
      verb: (match[1] ?? "grant").toLowerCase() as "grant" | "revoke",
      targets: splitTopLevel(match[2] ?? "").map(targetKey),
      roles: rolesOf(match[3] ?? ""),
    });
  }
  const resolvedFormat = new Set<number>();
  for (const loop of code.matchAll(FOREACH_GRANT)) {
    const variable = loop[1] ?? "";
    const items = Array.from((loop[2] ?? "").matchAll(/'([^']*)'/g), (item) => item[1] ?? "");
    const bodyStart = (loop.index ?? 0) + loop[0].indexOf(loop[3] ?? "");
    for (const grant of (loop[3] ?? "").matchAll(FORMAT_GRANT)) {
      const placeholderTarget = (grant[2] ?? "").trim();
      const argument = (grant[4] ?? "").trim();
      const at = bodyStart + (grant.index ?? 0);
      resolvedFormat.add(at);
      if (!/^%[sI]$/.test(placeholderTarget) || argument !== variable) {
        events.push({
          offset: at,
          verb: (grant[1] ?? "grant").toLowerCase() as "grant" | "revoke",
          targets: [],
          roles: rolesOf(grant[3] ?? ""),
          unseen: grant[0],
        });
        continue;
      }
      events.push({
        offset: at,
        verb: (grant[1] ?? "grant").toLowerCase() as "grant" | "revoke",
        targets: items.map(targetKey),
        roles: rolesOf(grant[3] ?? ""),
      });
    }
  }
  for (const grant of code.matchAll(FORMAT_GRANT)) {
    const at = grant.index ?? 0;
    if (resolvedFormat.has(at)) continue;
    events.push({
      offset: at,
      verb: (grant[1] ?? "grant").toLowerCase() as "grant" | "revoke",
      targets: [],
      roles: rolesOf(grant[3] ?? ""),
      unseen: grant[0],
    });
  }
  return events;
}

const DROP_FUNCTION =
  /\bDROP\s+FUNCTION\s+(?:IF\s+EXISTS\s+)?([\s\S]*?)\s*(?:CASCADE|RESTRICT)?\s*;/gi;

/** Every `DROP FUNCTION` of a file (comments and DO blocks blanked), its targets as identity keys or bare names. */
export function dropEventsOf(sql: string): Array<{ offset: number; targets: string[] }> {
  const code = functionCodeOf(sql);
  return Array.from(code.matchAll(DROP_FUNCTION), (match) => ({
    offset: match.index ?? 0,
    targets: splitTopLevel(match[1] ?? "").map(targetKey),
  }));
}

function lineOf(sql: string, offset: number): number {
  return sql.slice(0, offset).split("\n").length;
}

function declared(declaration: Declaration, file: string): Omit<CatalogueFunction, "roles"> {
  const header = parseHeader(declaration.header);
  return {
    key: `${declaration.fn}(${header.argTypes.join(",")})`,
    name: declaration.fn,
    argTypes: header.argTypes,
    argNames: header.argNames,
    returns: header.returns,
    volatility: header.volatility,
    definer: header.definer,
    header: declaration.header,
    body: declaration.body,
    file,
    line: declaration.line,
  };
}

/** The catalogue a set of migration files (root-relative path → SQL), applied in order, leaves. */
export function catalogueOf(files: Array<{ file: string; sql: string }>): Catalogue {
  const functions = new Map<string, CatalogueFunction>();
  const unseen: UnseenGrant[] = [];
  const byName = (name: string) =>
    [...functions.keys()].filter((key) => key.startsWith(`${name}(`));
  const resolve = (target: string) => (target.includes("(") ? [target] : byName(target));
  for (const { file, sql } of files) {
    const events: Array<{ offset: number; apply: () => void }> = [];
    for (const declaration of declarationsOf(sql)) {
      const replace = /\bOR\s+REPLACE\b/i.test(declaration.header.slice(0, 40));
      events.push({
        offset: declaration.offset,
        apply: () => {
          const next = declared(declaration, file);
          const before = functions.get(next.key);
          const roles = replace && before !== undefined ? before.roles : new Set<GrantRole>();
          functions.set(next.key, { ...next, roles });
        },
      });
    }
    for (const drop of dropEventsOf(sql)) {
      events.push({
        offset: drop.offset,
        apply: () => {
          for (const target of drop.targets)
            for (const key of resolve(target)) functions.delete(key);
        },
      });
    }
    for (const grant of grantEventsOf(sql)) {
      events.push({
        offset: grant.offset,
        apply: () => {
          if (grant.unseen !== undefined) {
            unseen.push({ file, line: lineOf(sql, grant.offset), text: grant.unseen });
            return;
          }
          for (const target of grant.targets) {
            for (const key of resolve(target)) {
              const fn = functions.get(key);
              if (fn === undefined) continue;
              for (const role of grant.roles) {
                if (grant.verb === "grant") fn.roles.add(role);
                else fn.roles.delete(role);
              }
            }
          }
        },
      });
    }
    events.sort((a, b) => a.offset - b.offset).forEach((event) => event.apply());
  }
  return { functions, unseen };
}

/** The catalogue of the repository's migrations under `root`. */
export function readCatalogue(root: string): Catalogue {
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
    file: file
      .slice(root.length + 1)
      .split("\\")
      .join("/"),
    sql: readFileSync(file, "utf8"),
  }));
  return catalogueOf(files);
}

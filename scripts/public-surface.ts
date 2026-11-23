/** DEC-310: the single grammar for migration grants and the live surface lint. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type BrowserRole = "anon" | "authenticated" | "public";
export interface SurfaceEntry {
  name: string;
  roles: BrowserRole[];
  reason: string;
}

export function parseSurface(text: string): SurfaceEntry[] {
  // INC-443 (housekeeping turn 4): one surface, one line, one reason.
  const names = new Set<string>();
  return text.split(/\r?\n/).flatMap((line, index) => {
    if (/^\s*(?:#|$)/.test(line)) return [];
    const fields = line.split("|").map((field) => field.trim());
    const [name, roleText, reason] = fields;
    if (
      fields.length !== 3 ||
      !name ||
      !/^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)?$/.test(name) ||
      !roleText ||
      !reason
    )
      throw new Error(`public surface: malformed line ${index + 1}`);
    if (names.has(name))
      throw new Error(`public surface: repeated name ${name} on line ${index + 1}`);
    names.add(name);
    const roles: BrowserRole[] = [];
    for (const role of roleText.split(",").map((value) => value.trim())) {
      if (role !== "anon" && role !== "authenticated" && role !== "public")
        throw new Error(`public surface: invalid role on line ${index + 1}`);
      if (roles.includes(role))
        throw new Error(`public surface: repeated role on line ${index + 1}`);
      roles.push(role);
    }
    return [{ name, roles, reason }];
  });
}

/** PUBLIC privileges are inherited by both browser roles. */
export function coversRole(entry: SurfaceEntry, role: BrowserRole): boolean {
  return entry.roles.includes(role) || entry.roles.includes("public");
}

/** The browser roles a grant or revoke clause names (anything else is no browser role). */
function rolesIn(text: string): BrowserRole[] {
  const roles: BrowserRole[] = [];
  for (const role of text.toLowerCase().match(/\b(?:anon|authenticated|public)\b/g) ?? [])
    if (role === "anon" || role === "authenticated" || role === "public") roles.push(role);
  return roles;
}

/**
 * Whole statements plus the existing FOREACH format-grant form (INC-443),
 * read in the file's own order (INC-1262): a GRANT opens a name for a role and
 * a later REVOKE of the same role closes it again; a REVOKE before the GRANT
 * closes nothing. A grant on a name in `dropped` (an object a later migration
 * drops) is no offender: the live lint's stale-line rule is the authority for
 * it (DEC-357).
 */
export function migrationSurfaceOffenders(
  sql: string,
  entries: SurfaceEntry[],
  dropped: ReadonlySet<string> = new Set(),
): string[] {
  // Comments become blanks of the same length, so a position means the same in both texts.
  const masked = sql.replace(/--[^\n]*/g, (comment) => " ".repeat(comment.length));
  const events: Array<{ at: number; open: boolean; name: string; roles: BrowserRole[] }> = [];
  let at = 0;
  for (const statement of masked.split(";")) {
    const grant =
      /\bgrant\s+(?:select|execute|all)\b[\s\S]*?\bon\s+(?:function\s+|table\s+|sequence\s+)?public\.([a-z0-9_]+)[\s\S]*?\bto\s+([^;]+)/i.exec(
        statement,
      );
    if (grant?.[1] && grant[2])
      events.push({ at, open: true, name: grant[1].toLowerCase(), roles: rolesIn(grant[2]) });
    const revoke =
      /\brevoke\s+(?:grant\s+option\s+for\s+)?(?:select|execute|all)\b[\s\S]*?\bon\s+(?:function\s+|table\s+|sequence\s+)?public\.([a-z0-9_]+)[\s\S]*?\bfrom\s+([^;]+)/i.exec(
        statement,
      );
    if (revoke?.[1] && revoke[2])
      events.push({ at, open: false, name: revoke[1].toLowerCase(), roles: rolesIn(revoke[2]) });
    at += statement.length + 1;
  }
  for (const loop of sql.matchAll(
    /FOREACH\s+\w+\s+IN\s+ARRAY\s+ARRAY\[([\s\S]*?)\]\s*LOOP([\s\S]*?)END\s+LOOP/gi,
  )) {
    const grant =
      /EXECUTE\s+format\s*\(\s*'\s*GRANT\s+(?:SELECT|EXECUTE|ALL)\b[^']*\bTO\s+([^']+)/i.exec(
        loop[2] ?? "",
      );
    if (!grant?.[1]) continue;
    for (const object of (loop[1] ?? "").matchAll(/'public\.([a-z0-9_]+)\s*\(/gi))
      if (object[1])
        events.push({
          at: loop.index ?? 0,
          open: true,
          name: object[1].toLowerCase(),
          roles: rolesIn(grant[1]),
        });
  }
  const opened = new Set<string>();
  for (const event of events.sort((a, b) => a.at - b.at)) {
    if (dropped.has(event.name)) continue;
    for (const role of event.roles) {
      const key = `${event.name} (${role})`;
      if (!event.open) opened.delete(key);
      else if (!entries.some((entry) => entry.name === event.name && coversRole(entry, role)))
        opened.add(key);
    }
  }
  return [...opened];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, path, sqlPath, root = process.cwd()] = process.argv.slice(2);
  if (!path) throw new Error("public surface: allowlist path required");
  const entries = parseSurface(readFileSync(path, "utf8"));
  if (mode === "--parse") console.log(JSON.stringify(entries));
  else if (mode === "--migration" && sqlPath) {
    // `--migration <allowlist> <file> [<root>]`: the drops are read from <root>'s
    // migrations only when the file has an offender (the reader loads on demand,
    // so the live lint that imports this file never carries it).
    const sql = readFileSync(sqlPath, "utf8");
    const offenders = migrationSurfaceOffenders(sql, entries);
    const judged =
      offenders.length === 0
        ? offenders
        : migrationSurfaceOffenders(
            sql,
            entries,
            (await import("./conformance/migration-reader")).droppedObjects(root),
          );
    for (const offender of judged) console.log(`${sqlPath}: ${offender}`);
  } else throw new Error("public surface: use --parse or --migration");
}

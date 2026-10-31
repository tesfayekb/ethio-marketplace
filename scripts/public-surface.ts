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
  return text.split(/\r?\n/).flatMap((line, index) => {
    if (/^\s*(?:#|$)/.test(line)) return [];
    const fields = line.split("|").map((field) => field.trim());
    const [name, roleText, reason] = fields;
    if (fields.length !== 3 || !name || !/^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)?$/.test(name) || !roleText || !reason)
      throw new Error(`public surface: malformed line ${index + 1}`);
    const roles: BrowserRole[] = [];
    for (const role of roleText.split(",").map((value) => value.trim())) {
      if (role !== "anon" && role !== "authenticated" && role !== "public")
        throw new Error(`public surface: invalid role on line ${index + 1}`);
      if (roles.includes(role)) throw new Error(`public surface: repeated role on line ${index + 1}`);
      roles.push(role);
    }
    return [{ name, roles, reason }];
  });
}

/** PUBLIC privileges are inherited by both browser roles. */
export function coversRole(entry: SurfaceEntry, role: BrowserRole): boolean {
  return entry.roles.includes(role) || entry.roles.includes("public");
}

/** Whole statements plus the existing FOREACH format-grant form (INC-443). */
export function migrationSurfaceOffenders(sql: string, entries: SurfaceEntry[]): string[] {
  const offenders = new Set<string>();
  const check = (name: string, text: string) => {
    for (const role of text.toLowerCase().match(/\b(?:anon|authenticated|public)\b/g) ?? []) {
      if (role !== "anon" && role !== "authenticated" && role !== "public") continue;
      if (!entries.some((entry) => entry.name === name && coversRole(entry, role)))
        offenders.add(`${name} (${role})`);
    }
  };
  for (const statement of sql.replace(/--[^\n]*/g, "").split(";")) {
    const grant = /\bgrant\s+(?:select|execute|all)\b[\s\S]*?\bon\s+(?:function\s+|table\s+|sequence\s+)?public\.([a-z0-9_]+)[\s\S]*?\bto\s+([^;]+)/i.exec(statement);
    if (grant?.[1] && grant[2]) check(grant[1].toLowerCase(), grant[2]);
  }
  for (const loop of sql.matchAll(/FOREACH\s+\w+\s+IN\s+ARRAY\s+ARRAY\[([\s\S]*?)\]\s*LOOP([\s\S]*?)END\s+LOOP/gi)) {
    const grant = /EXECUTE\s+format\s*\(\s*'\s*GRANT\s+(?:SELECT|EXECUTE|ALL)\b[^']*\bTO\s+([^']+)/i.exec(loop[2] ?? "");
    if (!grant?.[1]) continue;
    for (const object of (loop[1] ?? "").matchAll(/'public\.([a-z0-9_]+)\s*\(/gi))
      if (object[1]) check(object[1].toLowerCase(), grant[1]);
  }
  return [...offenders];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, path, sqlPath] = process.argv.slice(2);
  if (!path) throw new Error("public surface: allowlist path required");
  const entries = parseSurface(readFileSync(path, "utf8"));
  if (mode === "--parse") console.log(JSON.stringify(entries));
  else if (mode === "--migration" && sqlPath)
    for (const offender of migrationSurfaceOffenders(readFileSync(sqlPath, "utf8"), entries))
      console.log(`${sqlPath}: ${offender}`);
  else throw new Error("public surface: use --parse or --migration");
}
import { rpc } from "@/lib/supabase-door";
import { ERROR_KINDS, type ErrorKind } from "@/lib/error-clean";
import { readFailed } from "@/lib/reader-failure";
import { DEVICES, type Device } from "@/lib/schemas/error-report";

/**
 * DEC-474 Part F — THE ERROR REPORTS' CLIENT READERS, over the three staff doors (`errors:view`):
 * `admin_error_groups` (the groups of a window, with count, first and last seen),
 * `admin_error_occurrences` (one group's reports, a keyset page) and `admin_error_stats` (counts per
 * day by kind and the top pages, browsers and versions). The table is closed to the browser; every
 * check is the door's. A door's refusal is thrown as the typed failure (`readFailed`); an answer
 * out of its promised shape is refused, never drawn with invented values (F4). Every argument is
 * bounded here, so the doors' `badValue` is never provoked (errors-refusals.ts).
 */

export const ERROR_DAYS_MAX = 366;
export const OCCURRENCES_PAGE_MAX = 100;

export interface ErrorGroup {
  group: string;
  kind: ErrorKind;
  code: string | null;
  shape: string;
  place: string | null;
  count: number;
  firstSeen: string;
  lastSeen: string;
}

export interface ErrorGroups {
  rows: ErrorGroup[];
  /** More groups in the window than the 200 answered. */
  more: boolean;
}

export interface ErrorOccurrence {
  id: string;
  seenAt: string;
  kind: ErrorKind;
  code: string | null;
  message: string;
  place: string | null;
  path: string;
  browser: string | null;
  engine: string | null;
  browserVersion: string | null;
  device: Device | null;
  language: string | null;
  appVersion: string | null;
  signedIn: boolean;
}

/** The keyset position after a page: the last report's instant and id. */
export interface OccurrenceCursor {
  at: string;
  id: string;
}

export interface ErrorOccurrences {
  rows: ErrorOccurrence[];
  next: OccurrenceCursor | null;
}

export interface ErrorStats {
  days: Array<{ day: string; kind: ErrorKind; count: number }>;
  pages: Array<{ path: string; count: number }>;
  browsers: Array<{ browser: string | null; version: string | null; count: number }>;
  versions: Array<{ appVersion: string | null; count: number }>;
}

const GROUP_KEY = /^[0-9a-f]{32}$/;

type Fields = Record<string, unknown>;

function fieldsOf(raw: unknown): Fields | null {
  return raw !== null && typeof raw === "object" && !Array.isArray(raw) ? (raw as Fields) : null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

function textOrNull(value: unknown): string | null | undefined {
  if (value === null) return null;
  return typeof value === "string" ? value : undefined;
}

function count(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

function kindOf(value: unknown): ErrorKind | null {
  return ERROR_KINDS.find((kind) => kind === value) ?? null;
}

function deviceOf(value: unknown): Device | null | undefined {
  if (value === null) return null;
  return DEVICES.find((device) => device === value);
}

function outOfShape(door: string): Error {
  return new Error(`${door}: an answer out of shape`);
}

function rowsOf(door: string, raw: unknown): unknown[] {
  const rows = fieldsOf(raw)?.["rows"];
  if (!Array.isArray(rows)) throw outOfShape(door);
  return rows;
}

/** One group, or null when any field is not as the door promises. */
export function errorGroupOf(raw: unknown): ErrorGroup | null {
  const row = fieldsOf(raw);
  if (row === null) return null;
  const group = text(row["group"]);
  const kind = kindOf(row["kind"]);
  const code = textOrNull(row["code"]);
  const shape = text(row["shape"]);
  const place = textOrNull(row["place"]);
  const total = count(row["count"]);
  const firstSeen = text(row["first_seen"]);
  const lastSeen = text(row["last_seen"]);
  if (group === null || !GROUP_KEY.test(group) || kind === null || code === undefined) return null;
  if (shape === null || place === undefined || total === null) return null;
  if (firstSeen === null || lastSeen === null) return null;
  return { group, kind, code, shape, place, count: total, firstSeen, lastSeen };
}

/** The groups door's whole answer, or a thrown error. */
export function errorGroupsOf(raw: unknown): ErrorGroups {
  const door = "admin_error_groups";
  const rows = rowsOf(door, raw).map(errorGroupOf);
  const more = fieldsOf(raw)?.["more"];
  if (typeof more !== "boolean") throw outOfShape(door);
  const kept = rows.filter((row): row is ErrorGroup => row !== null);
  if (kept.length !== rows.length) throw outOfShape(door);
  return { rows: kept, more };
}

/** One report, or null when any field is not as the door promises. */
export function errorOccurrenceOf(raw: unknown): ErrorOccurrence | null {
  const row = fieldsOf(raw);
  if (row === null) return null;
  const id = text(row["id"]);
  const seenAt = text(row["seen_at"]);
  const kind = kindOf(row["kind"]);
  const message = text(row["message"]);
  const path = text(row["path"]);
  const signedIn = row["signed_in"];
  const optional = {
    code: textOrNull(row["code"]),
    place: textOrNull(row["place"]),
    browser: textOrNull(row["browser"]),
    engine: textOrNull(row["engine"]),
    browserVersion: textOrNull(row["browser_version"]),
    language: textOrNull(row["language"]),
    appVersion: textOrNull(row["app_version"]),
  };
  const device = deviceOf(row["device"]);
  if (id === null || seenAt === null || kind === null || message === null || path === null)
    return null;
  if (typeof signedIn !== "boolean" || device === undefined) return null;
  const { code, place, browser, engine, browserVersion, language, appVersion } = optional;
  if (
    code === undefined ||
    place === undefined ||
    browser === undefined ||
    engine === undefined ||
    browserVersion === undefined ||
    language === undefined ||
    appVersion === undefined
  )
    return null;
  return {
    id,
    seenAt,
    kind,
    code,
    message,
    place,
    path,
    browser,
    engine,
    browserVersion,
    device,
    language,
    appVersion,
    signedIn,
  };
}

/** The occurrences door's whole answer, or a thrown error. */
export function errorOccurrencesOf(raw: unknown): ErrorOccurrences {
  const door = "admin_error_occurrences";
  const rows = rowsOf(door, raw).map(errorOccurrenceOf);
  const kept = rows.filter((row): row is ErrorOccurrence => row !== null);
  if (kept.length !== rows.length) throw outOfShape(door);
  const rawNext = fieldsOf(raw)?.["next"];
  if (rawNext === null || rawNext === undefined) return { rows: kept, next: null };
  const next = fieldsOf(rawNext);
  const at = text(next?.["at"]);
  const id = text(next?.["id"]);
  if (at === null || id === null) throw outOfShape(door);
  return { rows: kept, next: { at, id } };
}

/** The stats door's whole answer, or a thrown error. */
export function errorStatsOf(raw: unknown): ErrorStats {
  const door = "admin_error_stats";
  const answer = fieldsOf(raw);
  const list = (key: string): Fields[] => {
    const value = answer?.[key];
    if (!Array.isArray(value)) throw outOfShape(door);
    return value.map((item) => {
      const fields = fieldsOf(item);
      if (fields === null || count(fields["count"]) === null) throw outOfShape(door);
      return fields;
    });
  };
  const days = list("days").map((row) => {
    const day = text(row["day"]);
    const kind = kindOf(row["kind"]);
    if (day === null || kind === null) throw outOfShape(door);
    return { day, kind, count: count(row["count"]) ?? 0 };
  });
  const pages = list("pages").map((row) => {
    const path = text(row["path"]);
    if (path === null) throw outOfShape(door);
    return { path, count: count(row["count"]) ?? 0 };
  });
  const browsers = list("browsers").map((row) => {
    const browser = textOrNull(row["browser"]);
    const version = textOrNull(row["version"]);
    if (browser === undefined || version === undefined) throw outOfShape(door);
    return { browser, version, count: count(row["count"]) ?? 0 };
  });
  const versions = list("versions").map((row) => {
    const appVersion = textOrNull(row["app_version"]);
    if (appVersion === undefined) throw outOfShape(door);
    return { appVersion, count: count(row["count"]) ?? 0 };
  });
  return { days, pages, browsers, versions };
}

/** A window in whole days, within what the doors take. */
export function windowDays(days: number): number {
  if (!Number.isFinite(days)) return 1;
  return Math.min(ERROR_DAYS_MAX, Math.max(1, Math.trunc(days)));
}

export async function listErrorGroups(input: {
  days: number;
  kind: ErrorKind | null;
}): Promise<ErrorGroups> {
  const { data, error } = await rpc("admin_error_groups", {
    p_days: windowDays(input.days),
    ...(input.kind === null ? {} : { p_kind: input.kind }),
  });
  if (error) throw readFailed(error);
  return errorGroupsOf(data);
}

export async function listErrorOccurrences(input: {
  group: string;
  after: OccurrenceCursor | null;
  limit: number;
}): Promise<ErrorOccurrences> {
  if (!GROUP_KEY.test(input.group)) throw new Error("admin_error_occurrences: not a group key");
  const limit = Math.min(OCCURRENCES_PAGE_MAX, Math.max(1, Math.trunc(input.limit) || 1));
  const { data, error } = await rpc("admin_error_occurrences", {
    p_group: input.group,
    p_limit: limit,
    ...(input.after === null ? {} : { p_before_at: input.after.at, p_before_id: input.after.id }),
  });
  if (error) throw readFailed(error);
  return errorOccurrencesOf(data);
}

export async function readErrorStats(days: number): Promise<ErrorStats> {
  const { data, error } = await rpc("admin_error_stats", { p_days: windowDays(days) });
  if (error) throw readFailed(error);
  return errorStatsOf(data);
}

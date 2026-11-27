import { getRequest } from "@tanstack/react-start/server";

import type { Database } from "@/integrations/supabase/types";
import {
  cleanCode,
  cleanLabel,
  cleanMessage,
  cleanPath,
  cleanPlace,
  type ErrorKind,
} from "@/lib/error-clean";
import { errorText } from "@/lib/error-text";
import { ERROR_REPORTS_PATH, type ErrorReport } from "@/lib/schemas/error-report";
import { ok, refused } from "@/server/answer";
import { carriesBearer } from "@/server/supabase/user-client";

/**
 * DEC-474 Part F — THE ERROR REPORTS' SERVER SIDE. One write (`record_error_report`, service
 * role only) behind the cleaner, run again here because the server is the authority. Two callers:
 * the report route (a browser's report, after the route's byte ceiling, caller and address dial)
 * and the server's own report of a 500 (`serverError`) or an auth server failure (INC-1312),
 * which never blocks or fails the answer it reports: it is not awaited, it ends within its
 * deadline, and a failed write is logged once as `[error-report] write failed`, never retried and
 * never reported (no write here goes through `serverError`).
 */

type Args = Database["public"]["Functions"]["record_error_report"]["Args"];
type Nullable<T> = { [K in keyof T]: T[K] | null };

export type ReportFields = {
  kind: ErrorKind;
  code: string | null;
  message: string;
  place: string | null;
  path: string;
  browser: string | null;
  engine: string | null;
  browserVersion: string | null;
  device: string | null;
  language: string | null;
  appVersion: string | null;
  signedIn: boolean;
};

export const WRITE_DEADLINE_MS = 3000;

/** The one write. Resolves whether the row was written; never throws. */
export async function writeReport(fields: ReportFields): Promise<boolean> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const args: Nullable<Args> = {
      p_kind: fields.kind,
      p_code: fields.code,
      p_message: fields.message,
      p_place: fields.place,
      p_path: fields.path,
      p_browser: fields.browser,
      p_engine: fields.engine,
      p_browser_version: fields.browserVersion,
      p_device: fields.device,
      p_language: fields.language,
      p_app_version: fields.appVersion,
      p_signed_in: fields.signedIn,
    };
    const { error } = await supabaseAdmin
      // The generator types every argument non-null; the columns behind the nullable ones take
      // JSON null for an absent value (cursor-bundle-8b ruling 1, STEP 3 step 2).
      .rpc("record_error_report", args as Args)
      .abortSignal(AbortSignal.timeout(WRITE_DEADLINE_MS));
    if (error === null) return true;
    console.error("[error-report] write failed", errorText(error));
    return false;
  } catch (failure) {
    console.error("[error-report] write failed", errorText(failure));
    return false;
  }
}

/** A browser's report, after the route's checks: cleaned again, then written. */
export async function recordBrowserReport({
  body,
  userId,
}: {
  body: ErrorReport;
  userId: string | null;
}): Promise<Response> {
  const written = await writeReport({
    kind: body.kind,
    code: cleanCode(body.code),
    message: cleanMessage(body.message),
    place: body.place === null ? null : cleanPlace(body.place),
    path: cleanPath(body.path),
    browser: cleanLabel(body.browser, 40),
    engine: cleanLabel(body.engine, 40),
    browserVersion: body.browserVersion,
    device: body.device,
    language: body.language,
    appVersion: body.appVersion,
    signedIn: userId !== null,
  });
  return written ? ok({ recorded: true }) : refused("reportNotRecorded", 503);
}

/** The request being answered; null outside one (a unit test, a script), where nothing is answered. */
function currentRequest(): Request | null {
  try {
    return getRequest();
  } catch {
    return null;
  }
}

/** The server's own limits per instance: the same failure once a minute, at most 30 a minute. */
export const SERVER_REPORTS_PER_MINUTE = 30;
const MINUTE_MS = 60_000;
let windowStartedAt = 0;
let windowCount = 0;
const lastWritten = new Map<string, number>();

function withinServerLimits(fields: ReportFields, now: number): boolean {
  if (now - windowStartedAt >= MINUTE_MS) {
    windowStartedAt = now;
    windowCount = 0;
    lastWritten.clear();
  }
  const key = [fields.kind, fields.code ?? "", fields.message, fields.place ?? ""].join("\u001f");
  if (lastWritten.has(key) || windowCount >= SERVER_REPORTS_PER_MINUTE) return false;
  lastWritten.set(key, now);
  windowCount += 1;
  return true;
}

/** The server's own report of a failure it answered: never awaited by the answer, never thrown. */
export function reportServerFailure(
  kind: "route" | "upstream",
  path: string,
  error: unknown,
): Promise<boolean> {
  if (path === ERROR_REPORTS_PATH) return Promise.resolve(false);
  const request = currentRequest();
  if (request === null) return Promise.resolve(false);
  const stack =
    // eslint-disable-next-line no-restricted-syntax -- only an Error carries a stack
    error instanceof Error ? error.stack : undefined;
  const fields: ReportFields = {
    kind,
    code: kind === "route" ? "500" : "503",
    message: cleanMessage(errorText(error)),
    place: cleanPlace(stack),
    path: cleanPath(path),
    browser: null,
    engine: null,
    browserVersion: null,
    device: null,
    language: null,
    appVersion: null,
    signedIn: carriesBearer(request),
  };
  if (!withinServerLimits(fields, Date.now())) return Promise.resolve(false);
  return writeReport(fields);
}

/** For tests: the per-instance limits start empty. */
export function resetServerLimits(): void {
  windowStartedAt = 0;
  windowCount = 0;
  lastWritten.clear();
}

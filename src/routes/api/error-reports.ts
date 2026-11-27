import { createFileRoute } from "@tanstack/react-router";

import { DIALS } from "@/lib/dials";
import {
  ERROR_REPORT_MAX_BYTES,
  ERROR_REPORTS_PATH,
  ErrorReportBody,
} from "@/lib/schemas/error-report";
import { defineRoute } from "@/server/route";

/**
 * DEC-474 Part F — POST /api/error-reports { kind, code, message, place, path, browser, engine,
 * browserVersion, device, language, appVersion } → { recorded: true }.
 *
 * A public write (OWASP ASVS V11): the byte ceiling first (by header, then by the counting
 * reader), the caller (optional: a bearer is verified, none is anonymous), the address dial spent
 * BEFORE the body is read, then the strict shape. A refused report writes nothing. The cleaning
 * and the write are src/server/error-reports.ts, loaded on demand. A failure of this route is
 * never itself reported (the server's report skips this path; the browser's sender reports
 * nothing about its own call).
 */
export const Route = createFileRoute("/api/error-reports")({
  server: {
    handlers: {
      POST: defineRoute({
        path: ERROR_REPORTS_PATH,
        auth: "optional",
        body: ErrorReportBody,
        badShape: "clientError",
        limits: { bodyBytes: ERROR_REPORT_MAX_BYTES },
        rate: [{ dial: DIALS.errorReportAddress, key: "address", when: "beforeParse" }],
        handler: async ({ body, userId }) => {
          const { recordBrowserReport } = await import("@/server/error-reports");
          return recordBrowserReport({ body, userId });
        },
      }),
    },
  },
});

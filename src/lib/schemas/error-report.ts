import { z } from "zod";

import { BROWSER_KINDS, MESSAGE_MAX, PATH_MAX, PLACE_MAX } from "@/lib/error-clean";

export { ERROR_REPORTS_PATH } from "@/lib/error-clean";

/** DEC-474 Part F — the report route's byte ceiling (read before the body is). */
export const ERROR_REPORT_MAX_BYTES = 4096;

export const DEVICES = ["phone", "tablet", "desktop"] as const;
export type Device = (typeof DEVICES)[number];

/** A length in characters (code points), as the table's `char_length` counts it. */
const text = (min: number, max: number) =>
  z.string().refine((value) => {
    const length = Array.from(value).length;
    return length >= min && length <= max;
  });

/**
 * POST /api/error-reports — what a browser may send. The kind is one of the browser's own three
 * (the server's kinds are written by the server alone); no person is named and the caller's
 * signed-in state is the route's to read, never the body's. The server cleans every text again.
 */
export const ErrorReportBody = z
  .object({
    kind: z.enum(BROWSER_KINDS),
    code: z
      .string()
      .regex(/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,63}$/)
      .nullable(),
    message: text(1, MESSAGE_MAX),
    place: text(1, PLACE_MAX).nullable(),
    path: text(1, PATH_MAX).refine((value) => value.startsWith("/")),
    browser: text(1, 40).nullable(),
    engine: text(1, 40).nullable(),
    browserVersion: z
      .string()
      .regex(/^[0-9A-Za-z._-]{1,20}$/)
      .nullable(),
    device: z.enum(DEVICES).nullable(),
    language: z
      .string()
      .regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/)
      .nullable(),
    appVersion: z
      .string()
      .regex(/^[0-9A-Za-z._-]{1,40}$/)
      .nullable(),
  })
  .strict();
export type ErrorReport = z.infer<typeof ErrorReportBody>;

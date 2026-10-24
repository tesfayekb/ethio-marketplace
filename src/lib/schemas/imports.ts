import { z } from "zod";

/**
 * Foundations turn 12 (DEC-237) — THE STAFF IMPORT BODY. Pure: the factory
 * (src/server/imports/route.ts) passes the registry's values. A `.strict()`
 * object: the mode (the family's own list and default), the scope key
 * (`scope` for the file families, `lang` for UI strings), every file key the
 * family reads (absent → ""), the commit's digest and the undo's batch id. Any
 * other key is refused (the route answers `malformed body`).
 */
export type ImportBodySpec = {
  modes: readonly [string, ...string[]];
  defaultMode: string;
  scopeKey: "scope" | "lang";
  fileKeys: readonly string[];
};

export type ImportBody = {
  mode: string;
  scope?: string | null;
  lang?: string;
  digest?: string;
  batchId?: string;
} & Record<string, string | null | undefined>;

export function importBody(spec: ImportBodySpec): z.ZodType<ImportBody> {
  const files: Record<string, z.ZodDefault<z.ZodOptional<z.ZodString>>> = Object.fromEntries(
    spec.fileKeys.map((key) => [key, z.string().optional().default("")]),
  );
  const scope =
    spec.scopeKey === "lang"
      ? { lang: z.string().optional() }
      : { scope: z.string().nullable().optional() };
  return z
    .object({
      mode: z.enum(spec.modes as [string, ...string[]]).default(spec.defaultMode),
      ...scope,
      ...files,
      digest: z.string().optional(),
      batchId: z.string().optional(),
    })
    .strict() as unknown as z.ZodType<ImportBody>;
}

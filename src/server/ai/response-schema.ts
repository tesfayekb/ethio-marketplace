/**
 * INC-1002 (turn J-1) — the provider's answer shape, derived from the task's
 * own `output` so the two cannot drift. One mechanism: the gateway asks every
 * `gemini-text` task's provider for `providerSchemaOf(task.output)`; no task
 * writes a response schema by hand (scripts/conformance/ai-response-schema.test.ts).
 *
 * The INPUT side of the zod schema is read (a transform or pipe answers its
 * input), because the provider writes what the parse reads. A key is required
 * unless the parse accepts it absent. `nullable` is never emitted: the provider
 * is asked to omit a key, while the parse still reads null as absent.
 *
 * A shape this cannot express throws `ResponseSchemaUnderivable` — never a
 * silent fallback to "no schema".
 */
import type { z } from "zod";

export type ProviderSchema =
  | { type: "STRING" }
  | { type: "BOOLEAN" }
  | { type: "NUMBER" }
  | { type: "ARRAY"; items: ProviderSchema }
  | { type: "OBJECT"; properties: Record<string, ProviderSchema>; required: string[] };

export class ResponseSchemaUnderivable extends Error {
  constructor(where: string, kind: string) {
    super(`response schema underivable at ${where}: ${kind}`);
    this.name = "ResponseSchemaUnderivable";
  }
}

type Def = {
  type: string;
  shape?: Record<string, z.ZodType>;
  innerType?: z.ZodType;
  in?: z.ZodType;
  element?: z.ZodType;
};

function defOf(schema: z.ZodType): Def {
  return (schema as unknown as { _zod: { def: Def } })._zod.def;
}

function acceptsAbsent(schema: z.ZodType): boolean {
  return (schema as unknown as { _zod: { optin?: string } })._zod.optin === "optional";
}

function derive(schema: z.ZodType, where: string): ProviderSchema {
  const def = defOf(schema);
  switch (def.type) {
    case "string":
      return { type: "STRING" };
    case "boolean":
      return { type: "BOOLEAN" };
    case "number":
      return { type: "NUMBER" };
    case "optional":
    case "nullable":
    case "default":
    case "readonly":
      if (def.innerType === undefined) throw new ResponseSchemaUnderivable(where, def.type);
      return derive(def.innerType, where);
    case "pipe":
      if (def.in === undefined) throw new ResponseSchemaUnderivable(where, def.type);
      return derive(def.in, where);
    case "array":
      if (def.element === undefined) throw new ResponseSchemaUnderivable(where, def.type);
      return { type: "ARRAY", items: derive(def.element, `${where}[]`) };
    case "object": {
      const shape = def.shape ?? {};
      const properties: Record<string, ProviderSchema> = {};
      const required: string[] = [];
      for (const [key, value] of Object.entries(shape)) {
        properties[key] = derive(value, `${where}.${key}`);
        if (!acceptsAbsent(value)) required.push(key);
      }
      return { type: "OBJECT", properties, required };
    }
    default:
      throw new ResponseSchemaUnderivable(where, def.type);
  }
}

/** The provider's response schema for a JSON object answer; throws when underivable. */
export function providerSchemaOf(output: z.ZodType): ProviderSchema {
  const derived = derive(output, "$");
  if (derived.type !== "OBJECT") throw new ResponseSchemaUnderivable("$", derived.type);
  return derived;
}

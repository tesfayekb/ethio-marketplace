import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { readFailed } from "@/lib/reader-failure";
import { uuid } from "@/lib/schemas/primitives";
import { clientError, conditional, readFailure } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { versionCache } from "@/server/version-cache";

/**
 * U6-A2-C — the lazy option list (DEC-053), signed-in only (INC-397).
 * The caller is checked before params and every cache hit. Both doors run as
 * the caller. A curator's commit moves the version and reaches an open form
 * after 15 seconds in process / 60 seconds in the browser (INC-243).
 */
const PATH = "/api/attributes/$id/options";
const Params = z.object({ id: uuid }).strict();
const OPTIONS = versionCache<string, { body: unknown; stamp: string }>({ ttlMs: 15_000, max: 512 });
class OptionsRefusal extends Error {
  readonly code = "rateLimited";
}

async function handler(ctx: RouteContext<unknown, z.infer<typeof Params>>): Promise<Response> {
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("caller client missing");
  const id = ctx.params.id;
  try {
    const held = await OPTIONS.get(
      id,
      async () => {
        const { data, error, status } = await supabase.rpc("get_attribute_options_version", {
          p_attribute_id: id,
        });
        if (error) throw readFailed(error, status);
        const stamp = typeof data === "string" ? data : "";
        return stamp === "" ? null : stamp;
      },
      async (stamp) => {
        const { data, error, status } = await supabase.rpc("get_attribute_options", {
          p_attribute_id: id,
        });
        if (error) {
          if (error.message.includes("attributeNotFound")) return null;
          if (error.message.includes("rateLimited")) throw new OptionsRefusal();
          throw readFailed(error, status);
        }
        return { body: data ?? { options: [], version: stamp }, stamp };
      },
    );
    if (held === null) return clientError("unknown attribute", 404);
    return conditional(ctx.request, {
      etag: `"attr-options-2-${held.value.stamp}"`,
      body: held.value.body,
      cache: "private, max-age=60, stale-while-revalidate=300",
    });
  } catch (error) {
    if (error instanceof OptionsRefusal) return clientError(error.code, 429);
    return readFailure(PATH, "attribute options read", error);
  }
}
export const Route = createFileRoute("/api/attributes/$id/options")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "user",
        params: Params,
        badShape: () => clientError("unknown attribute", 404),
        handler,
      }),
    },
  },
});

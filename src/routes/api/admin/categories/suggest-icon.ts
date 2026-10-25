/**
 * C5a PART C.2 — POST /api/admin/categories/suggest-icon
 *
 * Text model, JSON mode, constrained to the server-side allowlist
 * (`src/server/category-images/icons.ts`). The model's answer is NEVER trusted:
 * `checkIcon` maps anything off-list to the `Package` fallback and says so
 * with `fallback: true` (bundle 2 step 18); a listed answer has `fallback: false`. Same gate as
 * the image route (`categories:assets`), same [ssr-error] logging, same honest
 * provider statuses.
 *
 * D158 — asked for only while `category_icons` is switched on (off: 409, stage
 * `switched-off`; a switch that could not be read: 503); every answer the
 * provider (or fake mode) gives is metered.
 */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { aiCall } from "@/server/ai/gateway";
import { ok, serverError } from "@/server/answer";
import { defineRoute } from "@/server/route";
import { checkIcon } from "@/server/category-images/icons";

const PATH = "/api/admin/categories/suggest-icon";
export const SuggestIconBody = z
  .object({
    name: z.string().trim().min(1).max(120),
    parentName: z.string().trim().max(120).nullable().optional(),
  })
  .strict();

export const Route = createFileRoute("/api/admin/categories/suggest-icon")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: { staff: { resource: "categories", action: "assets" } },
        body: SuggestIconBody,
        badShape: ({ path, code }) =>
          ok(
            {
              error:
                code === "invalid_json"
                  ? "invalid json body"
                  : path === "parentName"
                    ? "invalid parentName"
                    : "invalid name",
            },
            { status: 400 },
          ),
        handler: async ({ body, userId }) => {
          const answer = await aiCall(
            "category_icon",
            { name: body.name, parent: body.parentName ?? "" },
            { actorId: userId, path: PATH },
          );
          if (answer.ok) {
            const value = answer.value;
            return ok({
              ...checkIcon(
                typeof value === "object" && value !== null && "icon" in value ? value.icon : null,
              ),
              fake: answer.fake,
            });
          }
          if (
            answer.reason === "featureOff" ||
            answer.reason === "budget" ||
            answer.reason === "unavailable"
          ) {
            const reason = answer.reason === "featureOff" ? "staff" : answer.reason;
            return ok(
              { error: `AI feature category_icons is off (${reason})`, stage: "switched-off" },
              { status: reason === "unavailable" ? 503 : 409 },
            );
          }
          const status = answer.status;
          if (
            answer.reason === "providerError" &&
            status !== undefined &&
            status >= 400 &&
            status < 500
          ) {
            const code =
              status === 400 || status === 422
                ? "modelRefused"
                : status === 401 || status === 403
                  ? "modelKeyRefused"
                  : status === 429
                    ? "modelRateLimited"
                    : "modelCallFailed";
            return ok({ error: code }, { status });
          }
          const response = serverError(PATH, `ai category_icon ${answer.reason}`);
          // Keep the boundary's incident-bearing envelope and the established 502 status.
          return ok(await response.json(), { status: 502 });
        },
      }),
    },
  },
});

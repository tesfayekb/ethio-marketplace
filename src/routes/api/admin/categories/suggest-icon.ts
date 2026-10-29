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
import { aiCall } from "@/server/ai/gateway";
import { clientError, ok, providerRefusal, refused, serverError } from "@/server/answer";
import { defineRoute } from "@/server/route";
import { checkIcon } from "@/server/category-images/icons";
import { SuggestIconBody } from "@/lib/schemas/category-icon";

const PATH = "/api/admin/categories/suggest-icon";

export const Route = createFileRoute("/api/admin/categories/suggest-icon")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: { staff: { resource: "categories", action: "assets" } },
        body: SuggestIconBody,
        badShape: ({ path, code }) =>
          clientError(
            code === "invalid_json"
              ? "invalid json body"
              : path === "parentName"
                ? "invalid parentName"
                : "invalid name",
            400,
          ),
        handler: async ({ body, userId }) => {
          const answer = await aiCall(
            "category_icon",
            { name: body.name, parent: body.parentName ?? "" },
            { actorId: userId, path: PATH },
          );
          if (answer.ok) {
            return ok({
              ...checkIcon(answer.value.icon),
              fake: answer.fake,
            });
          }
          if (
            answer.reason === "featureOff" ||
            answer.reason === "budget" ||
            answer.reason === "unavailable"
          ) {
            const reason = answer.reason === "featureOff" ? "staff" : answer.reason;
            const word = `AI feature category_icons is off (${reason})`;
            return reason === "unavailable"
              ? refused(word, 503, { stage: "switched-off" })
              : clientError(word, 409, { stage: "switched-off" });
          }
          const status = "status" in answer ? answer.status : undefined;
          if (
            answer.reason === "providerError" &&
            status !== undefined &&
            status >= 400 &&
            status < 500
          ) {
            return providerRefusal(status);
          }
          // The boundary's incident-bearing envelope (its log line under the same id) at the
          // established 502 status.
          const logged = (await serverError(PATH, `ai category_icon ${answer.reason}`).json()) as {
            error: string;
            incident: string;
          };
          return refused(logged.error, 502, { incident: logged.incident });
        },
      }),
    },
  },
});

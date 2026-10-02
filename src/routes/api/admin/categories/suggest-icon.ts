/**
 * C5a PART C.2 — POST /api/admin/categories/suggest-icon
 *
 * Text model, JSON mode, constrained to the server-side allowlist
 * (`src/server/category-images/icons.ts`). The model's answer is NEVER trusted:
 * `checkIcon` maps anything off-list to the `Package` fallback and says so
 * with `fallback: true` (bundle 2 step 18); a listed answer has `fallback: false`. Same gate as
 * the image route (`categories:assets`), same [ssr-error] logging, same honest
 * provider statuses.
 */
import { createFileRoute } from "@tanstack/react-router";

const PATH = "/api/admin/categories/suggest-icon";
const FAKE_ICON = "Store";

interface Body {
  name?: string;
  parentName?: string;
}

export const Route = createFileRoute("/api/admin/categories/suggest-icon")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { gateCategoriesAssets, json, fail5xx } =
          await import("@/server/category-images/gate");
        const gate = await gateCategoriesAssets(request, PATH);
        if (!gate.ok) return gate.response;

        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return json({ error: "invalid json body" }, 400);
        }
        const name = (body.name ?? "").trim();
        if (name === "" || name.length > 120) return json({ error: "invalid name" }, 400);
        const parentName = (body.parentName ?? "").trim() || null;
        if (parentName !== null && parentName.length > 120) {
          return json({ error: "invalid parentName" }, 400);
        }

        const { ICON_ALLOWLIST, checkIcon } = await import("@/server/category-images/icons");
        const { isFakeMode, suggestIconName, GeminiError } =
          await import("@/server/category-images/gemini");

        if (isFakeMode()) {
          return json({ ...checkIcon(FAKE_ICON), fake: true }, 200);
        }

        try {
          const raw = await suggestIconName(name, parentName, ICON_ALLOWLIST);
          return json({ ...checkIcon(raw), fake: false }, 200);
        } catch (error) {
          const message = error instanceof Error ? error.message : "unknown error";
          // PART B (F4): true cause + stable code before the generic body.
          console.error(`[ssr-error] ${PATH} icon_suggest_failed stage=model-call ${message}`);
          if (error instanceof GeminiError) {
            if (error.status >= 500) return fail5xx(PATH, error.message, 502);
            return json({ error: error.message }, error.status);
          }
          return fail5xx(PATH, message);
        }
      },
    },
  },
});

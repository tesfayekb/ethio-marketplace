import { DIALS } from "@/lib/dials";
import { aiCall, type AiAnswer } from "@/server/ai/gateway";
import { POLICY_CODES, POLICY_WARNINGS, taskOf, type OutputOf } from "@/server/ai/tasks";
import { render } from "@/server/ai/template";
import { spend } from "@/server/dials";
import type { RouteContext } from "@/server/route";

/** The caller's own client, typed through the seam (vendor-seams: no direct import here). */
type CallerClient = NonNullable<RouteContext<unknown>["supabase"]>;

import type { ImageFormat } from "./strip";

export { POLICY_CODES, POLICY_WARNINGS };

/**
 * U6-B1 — THE UPLOAD-TIME POLICY PASS (spec §12 D15), on the AI gateway since
 * Foundations turn 17.
 *
 * NOTHING IS STORED UNSCREENED. EVERY variant that will be stored — the cover,
 * the middle size when it is sent (D162), the card and the thumb — is shown to
 * the provider in ONE call (INC-601) through `aiCall("photo_screen", …)`: the
 * gate, the provider key, the site's day cap (the call's reservation, D184),
 * the stand-in or the provider, the schema, the spend and the audit row are
 * the gateway's order, and the task's `all` rule fails the call BEFORE the
 * provider is asked when any size would be dropped — a provider failure is a
 * refusal (F4): `providerUnavailable` with a retry hint, never a quiet accept.
 *
 * D165 (the operator, 2026-10-14: "Phone sizes, cheap check") — the first
 * image at the default detail, every smaller copy at low detail, retried once
 * without the setting when the model refuses it: the Gemini adapter's
 * `lowDetailAfterFirst` capability (turn 17, CHANGE 3).
 *
 * D154 B3 — RELEVANCE IS A WARNING, NEVER A REFUSAL: the ad's category and
 * title travel as declared material fields, quoted by the one template; the
 * only warnings are `not_relevant` and `unsure` (D178), and an unknown one is
 * dropped and logged.
 *
 * FAKE MODE (`E2E_FAKE_PHOTO_POLICY=1`) is DETERMINISTIC and costs nothing: the
 * task's stand-in reads the cover's width from the material — 13 px refuses
 * `not_a_photo`, 11 px refuses `nudity`, 19 px warns `unsure` with its
 * evidence, 17 px warns `not_relevant`, everything else passes — written as
 * the provider's JSON shape so ONE mapping (`screenAnswerOf`) serves both.
 */

export type PolicyCode = (typeof POLICY_CODES)[number] | "providerUnavailable";

export type PolicyWarning = (typeof POLICY_WARNINGS)[number];

/**
 * `warnings` is present only when the screen gave one; `evidence` only with the
 * warning `unsure` (bundle 16 turn 4a: what made the screen unsure, for staff).
 */
export type PolicyVerdict =
  | { ok: true; warnings?: PolicyWarning[]; evidence?: string }
  | { ok: false; code: PolicyCode; evidence: string };

/** One stored size of an upload, as the strip produced it. */
export interface PolicyImage {
  bytes: Uint8Array;
  format: ImageFormat;
  width: number;
}

/** INC-601 — the sizes one upload stores, screened together (D162: the middle size when sent). */
export interface PolicyVariants {
  cover: PolicyImage;
  mid?: PolicyImage;
  card: PolicyImage;
  thumb: PolicyImage;
}

/** The width a fixture uses to ask fake mode for a refusal. */
export const FAKE_REFUSAL_WIDTH = 13;

/** The width a fixture uses to ask fake mode for the warning `not_relevant` (D154 B3). */
export const FAKE_WARNING_WIDTH = 17;

/** Bundle 16 turn 4a — the width a fixture uses to ask fake mode for the refusal `nudity`. */
export const FAKE_NUDITY_WIDTH = 11;

/** Bundle 16 turn 4a — the width a fixture uses to ask fake mode for the warning `unsure`. */
export const FAKE_UNSURE_WIDTH = 19;

/** The instruction as the call carries it (the task's text under the one rule), for the tests. */
export const PHOTO_POLICY_INSTRUCTION = render(taskOf("photo_screen"), {}).system;

/** The stored sizes in the order the instruction names them: largest first. */
export function imagesOf(variants: PolicyVariants): PolicyImage[] {
  return [
    variants.cover,
    ...(variants.mid === undefined ? [] : [variants.mid]),
    variants.card,
    variants.thumb,
  ];
}

function mimeOf(format: ImageFormat): "image/jpeg" | "image/png" | "image/webp" {
  return format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
}

/** D154 B3 — the known warnings of an answer; an unknown one is logged and dropped. */
export function warningsOf(raw: unknown, log: (message: string) => void): PolicyWarning[] {
  if (!Array.isArray(raw)) return [];
  const known: PolicyWarning[] = [];
  for (const entry of raw) {
    if ((POLICY_WARNINGS as readonly unknown[]).includes(entry)) {
      if (!known.includes(entry as PolicyWarning)) known.push(entry as PolicyWarning);
    } else {
      log(`photo policy: unknown warning "${String(entry).slice(0, 40)}" dropped`);
    }
  }
  return known;
}

function isPolicyCode(value: string): value is (typeof POLICY_CODES)[number] {
  return (POLICY_CODES as readonly string[]).includes(value);
}

/** What the upload does with the call's answer: a verdict, or the held outcome. */
export type ScreenResult = { kind: "held" } | { kind: "verdict"; verdict: PolicyVerdict };

/**
 * Turn 17, CHANGE (5) — the ONE mapping of the gateway's answer, serving the
 * provider's and the stand-in's JSON alike: ok → today's verdict mapping
 * (allowed → warnings via `warningsOf`, `unsure` with its evidence; refused
 * with an unknown code → `providerUnavailable`, logged); `featureOff`,
 * `budget` and a refused reservation (the site's spent day cap) → held; any
 * other non-ok → `providerUnavailable` with retry.
 */
export function screenAnswerOf(
  answer: AiAnswer<OutputOf<"photo_screen">>,
  log: (message: string) => void,
): ScreenResult {
  if (!answer.ok) {
    if (
      answer.reason === "featureOff" ||
      answer.reason === "budget" ||
      answer.reason === "reserved"
    ) {
      return { kind: "held" };
    }
    return {
      kind: "verdict",
      verdict: { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" },
    };
  }
  const value = answer.value;
  if (value.allowed) {
    const warnings = warningsOf(value.warnings, log);
    if (warnings.length === 0) return { kind: "verdict", verdict: { ok: true } };
    // Bundle 16 turn 4a — with `unsure`, the phrase that says why, for staff.
    return {
      kind: "verdict",
      verdict:
        warnings.includes("unsure") && value.evidence !== ""
          ? { ok: true, warnings, evidence: value.evidence }
          : { ok: true, warnings },
    };
  }
  // An unusable code is not a pass: the answer is a refusal we cannot name, so
  // it becomes the provider's own failure rather than a silent accept.
  if (!isPolicyCode(value.code)) {
    log(`photo policy: unusable verdict code "${value.code}"`);
    return {
      kind: "verdict",
      verdict: { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" },
    };
  }
  return { kind: "verdict", verdict: { ok: false, code: value.code, evidence: value.evidence } };
}

/**
 * The one call (turn 17): the variants as the task's images, the category name
 * read as the caller by the material supplier — only for a real call — and the
 * site's day cap on paid screens as the reservation (D184), skipped for a
 * stand-in and refused into the held outcome, logged as today.
 */
export async function screenPhotoPolicy(
  variants: PolicyVariants,
  log: (message: string) => void,
  ctx: {
    actorId: string | null;
    path: string;
    supabase: CallerClient;
    categoryId: string | null;
    title: string | null;
  },
): Promise<ScreenResult> {
  const answer = await aiCall(
    "photo_screen",
    async () => {
      let category: string | null = null;
      if (ctx.categoryId !== null) {
        const { data } = await ctx.supabase
          .from("categories")
          .select("name_en")
          .eq("id", ctx.categoryId)
          .maybeSingle();
        category = typeof data?.name_en === "string" ? data.name_en : null;
      }
      return {
        ...(category === null ? {} : { category }),
        ...(ctx.title === null ? {} : { title: ctx.title }),
        coverWidth: String(variants.cover.width),
      };
    },
    {
      actorId: ctx.actorId,
      path: ctx.path,
      reserve: async ({ fake }) => {
        // dial in the handler: site-wide AI budget — the AI gateway's, INC-861
        if (fake) return { ok: true as const };
        const site = await spend(DIALS.uploadScreen, "site");
        if (!site.allowed) {
          log("photo screening: the site's day cap is spent; the photo is held");
        }
        return site.allowed ? { ok: true as const } : { ok: false as const, refusal: null };
      },
    },
    imagesOf(variants).map((image) => ({ bytes: image.bytes, mime: mimeOf(image.format) })),
  );
  return screenAnswerOf(answer, log);
}

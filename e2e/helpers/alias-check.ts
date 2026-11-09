import type { Page, Response } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";

/**
 * P-2 (c) c2a ruling 5 §2 (INC-1085) — THE CONTACT STEP'S NAME CHECK, READ WHOLE.
 * A test that types a public name and needs it accepted calls
 * `expectAliasAccepted`: it types the name, waits for the alias route's answer
 * to the check of THAT name (`POST /api/listings/alias` with `{alias}`), asserts
 * the answer says the name is free, then expects the screen's tick. A failure
 * names its cause — the route's status and body, or, when no check was sent
 * (the screen's own rules refused the name, `alias-rules.ts`), which alias state
 * the screen shows — never only "the tick is not visible".
 */

/** The step's own deadline for the check and its tick (unchanged from the tests it replaces). */
export const ALIAS_CHECK_MS = 20_000;

const ALIAS_ROUTE = "/api/listings/alias";

/** The alias states `step-who.tsx` draws under the name box. */
const ALIAS_STATES = [
  "post-who-alias-checking",
  "post-who-alias-ok",
  "post-who-alias-refusal",
  "post-who-alias-latin",
] as const;

/** What came back for the check: the route's answer, or why none arrived. */
export type AliasCheckAnswer =
  | { kind: "answer"; status: number; body: string }
  | { kind: "none"; why: string; screen: string[] };

function isRow(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsed(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

/**
 * A scratch public name the shape rule cannot refuse: letters only after `e2e_`.
 * `alias_rule` refuses a name with fewer than three letters (20261018142627 :102,
 * mirrored in `aliasShapeOk`), and `e2e_` holds two, so a random tail of digits
 * alone was refused (INC-1085).
 */
export function scratchAlias(): string {
  return `e2e_${Math.random().toString(36).slice(2, 8).replace(/[0-9]/g, "q")}`;
}

/** The name as the screen sends it (`step-who.tsx` lowercases what is typed; the door trims). */
export function sentAlias(alias: string): string {
  return alias.trim().toLowerCase();
}

/** True for the alias route's answer to the check of `alias` (not a suggestions call). */
export function isCheckOf(
  method: string,
  url: string,
  body: string | null,
  alias: string,
): boolean {
  if (method !== "POST" || new URL(url).pathname !== ALIAS_ROUTE) return false;
  const sent = parsed(body ?? "");
  return isRow(sent) && sent["alias"] === alias;
}

/** Null when the answer says the name is free; otherwise the failure's message, naming its cause. */
export function aliasCheckFailure(alias: string, answer: AliasCheckAnswer): string | null {
  if (answer.kind === "none") {
    const shown = answer.screen.length > 0 ? answer.screen.join(", ") : "no alias state";
    return (
      `[e2e:alias] no check of "${alias}" reached ${ALIAS_ROUTE} within ${ALIAS_CHECK_MS} ms ` +
      `(${answer.why}); the screen shows ${shown}`
    );
  }
  const body = parsed(answer.body);
  if (answer.status === 200 && isRow(body) && body["ok"] === true) return null;
  return `[e2e:alias] the check of "${alias}" answered HTTP ${answer.status}: ${answer.body}`;
}

async function shownStates(page: Page): Promise<string[]> {
  const shown: string[] = [];
  for (const state of ALIAS_STATES) {
    if (await page.getByTestId(state).isVisible()) shown.push(state);
  }
  return shown;
}

/**
 * Types `alias` into the contact step's public-name box and proves it accepted:
 * the route's answer first, then the tick. The name must differ from the
 * seller's saved one (an unchanged name sends no check).
 */
export async function expectAliasAccepted(page: Page, alias: string): Promise<void> {
  const sent = sentAlias(alias);
  const answered: Promise<AliasCheckAnswer> = page
    .waitForResponse(
      (response: Response) => {
        const request = response.request();
        return isCheckOf(request.method(), request.url(), request.postData(), sent);
      },
      { timeout: ALIAS_CHECK_MS },
    )
    .then(
      async (response) => ({
        kind: "answer" as const,
        status: response.status(),
        body: await response.text(),
      }),
      async (error: unknown) => ({
        kind: "none" as const,
        why: errorText(error),
        screen: await shownStates(page),
      }),
    );
  await page.getByTestId("post-who-alias").fill(alias);
  const failure = aliasCheckFailure(sent, await answered);
  if (failure !== null) throw new Error(failure);
  await waitAliasAccepted(page);
}

/**
 * Waits for the contact step's tick on a name the test did not fill itself (a
 * suggestion picked, the name built from the typed names, a name typed key by
 * key). A failure names which alias state the screen shows.
 */
export async function waitAliasAccepted(page: Page): Promise<void> {
  try {
    await page
      .getByTestId("post-who-alias-ok")
      .waitFor({ state: "visible", timeout: ALIAS_CHECK_MS });
  } catch (error) {
    const shown = await shownStates(page);
    throw new Error(
      `[e2e:alias] the name was not accepted within ${ALIAS_CHECK_MS} ms (${errorText(error)}); ` +
        `the screen shows ${shown.length > 0 ? shown.join(", ") : "no alias state"}`,
    );
  }
}

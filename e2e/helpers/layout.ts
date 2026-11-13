import type { Page, TestInfo } from "@playwright/test";

/**
 * The pictures turn (ruling 1, answer 4; INC-1123) — A SPEC BRANCHES ON THE LAYOUT IT DRAWS, NEVER
 * ON A PROJECT'S NAME. A project is a browser engine at a width (`desktop-1280`, `mobile-360`,
 * `webkit-1280`, `webkit-390`); a branch on one name silently skips its layout in every other
 * engine at the same width. `layoutOf` reads the page's own viewport: from LAYOUT_DESKTOP_MIN_PX
 * (the shell's `lg`, where the rail replaces the phone bar) the desktop layout, below it the phone's.
 * scripts/conformance/e2e-helpers.test.ts CF-HELPERS-9 refuses a project name in a spec.
 */
export type Layout = "desktop" | "mobile";

export const LAYOUT_DESKTOP_MIN_PX = 1024;

function layoutAt(width: number): Layout {
  return width >= LAYOUT_DESKTOP_MIN_PX ? "desktop" : "mobile";
}

export function layoutOf(page: Page): Layout {
  const viewport = page.viewportSize();
  if (viewport === null) throw new Error("[e2e:layout] the page has no viewport to read");
  return layoutAt(viewport.width);
}

/**
 * The layout the PROJECT draws, for a test whose `test.use` sets its own viewport and so reads the
 * same layout in every project: such a test runs once, in the projects that draw `layout`.
 */
export function projectLayoutOf(testInfo: TestInfo): Layout {
  const viewport = testInfo.project.use.viewport;
  if (viewport === null || viewport === undefined)
    throw new Error(`[e2e:layout] the project ${testInfo.project.name} declares no viewport`);
  return layoutAt(viewport.width);
}

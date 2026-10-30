import { test } from "./fixtures";
import { gotoReady, openRailScope } from "./helpers/ui";
test("INC-1011 probe", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280");
  await page.setViewportSize({ width: 1280, height: 600 });
  await gotoReady(page, "/");
  const rail = await openRailScope(page);
  await rail.getByTestId("rail-category-skeleton").waitFor({ state: "detached" });
  const out = await page.getByTestId("app-rail").evaluate((root) => {
    const rows: string[] = [];
    const walk = (el: Element, d: number) => {
      const r = el.getBoundingClientRect();
      rows.push(`${"  ".repeat(d)}${el.tagName.toLowerCase()}[${el.getAttribute("data-testid") ?? ""}] top=${r.top.toFixed(1)} h=${r.height.toFixed(1)}${el.getAttribute("data-testid")==="rail-scroll" ? ` client=${(el as HTMLElement).clientHeight} scroll=${el.scrollHeight}` : ""}`);
      if (d < 3 && el.getAttribute("data-testid") !== "rail-scroll") for (const c of el.children) walk(c, d + 1);
    };
    walk(root, 0);
    const top = document.querySelector("header")?.getBoundingClientRect();
    return `header h=${top?.height} vh=${innerHeight} roots=${root.querySelectorAll("[data-testid=rail-scroll] nav > ul.menu-fit > li:not([aria-hidden])").length}\n` + rows.join("\n");
  });
  console.log(out);
});

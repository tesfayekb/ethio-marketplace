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
  console.log(await page.evaluate(() => {
    const lines: string[] = [];
    let el: Element | null = document.querySelector("[data-testid=app-rail]");
    while (el && el !== document.body) {
      const p = el.parentElement!;
      lines.push(`PARENT ${p.tagName}.${p.className.toString().slice(0,140)} h=${p.getBoundingClientRect().height.toFixed(1)} top=${p.getBoundingClientRect().top.toFixed(1)} style.h=${getComputedStyle(p).height} pos=${getComputedStyle(p).position}`);
      for (const c of p.children) { const r=c.getBoundingClientRect(); lines.push(`   child ${c.tagName}[${c.getAttribute("data-testid")??""}].${c.className.toString().slice(0,100)} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)}`); }
      el = p; if (lines.length>40) break;
    }
    const a = document.querySelector("[data-testid=app-rail]")!; const cs=getComputedStyle(a);
    lines.push(`ASIDE class=${a.className} pos=${cs.position} top=${cs.top} height=${cs.height} maxh=${cs.maxHeight} bottom=${cs.bottom}`);
    for (const y of [420,500,590]) { const e=document.elementFromPoint(100,y); lines.push(`at y=${y}: ${e?.tagName}[${e?.getAttribute("data-testid")??""}].${e?.className.toString().slice(0,80)}`); }
    lines.push(`scrollY=${scrollY} docH=${document.documentElement.scrollHeight}`);
    return lines.join("\n");
  }));
});

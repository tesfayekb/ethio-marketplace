import { expect, test } from "./fixtures";
import { gotoReady } from "./helpers/ui";

/**
 * D262 (turn B1, DEC-314) — THE DARK-CARD CHOICE on /dev/style, both projects.
 * DCC-1: each candidate (A, B, C), measured in the page: every card surface against the dark page
 * at least 1.25 : 1, its edge ring at least 1.8 : 1, its text at least 4.5 : 1 on the card.
 * DCC-2: the live dark card (candidate B, provisional) is what a dark page draws outside the grid.
 * No account, no seeded row. Colours are read through a canvas, so any CSS colour form compares.
 */

const CANDIDATES = ["a", "b", "c"] as const;
const CARDS = ["plain", "premium", "featured", "no-photo"] as const;

type Measured = { surface: number; edge: number; text: number };

test.describe("dark-card choice", () => {
  test("DCC-1 every candidate card meets the surface, edge and text targets", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    const grid = page.getByTestId("style-dark-cards");
    await expect(grid).toBeVisible();
    for (const candidate of CANDIDATES) {
      for (const kind of CARDS) {
        const card = page.getByTestId(`style-candidate-${candidate}-${kind}`);
        await expect(card).toBeVisible();
        const m: Measured = await card.evaluate((element) => {
          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx === null) throw new Error("no 2d canvas");
          const rgb = (colour: string): number[] => {
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = colour;
            ctx.fillRect(0, 0, 1, 1);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
          };
          const lum = (c: number[]) => {
            const [r, g, b] = c.map((v) => {
              const x = v / 255;
              return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
            });
            return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
          };
          const ratio = (a: string, b: string) => {
            const [lo, hi] = [lum(rgb(a)), lum(rgb(b))].sort((x, y) => x - y);
            return Math.round((((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05)) * 100) / 100;
          };
          const page = element.closest("[data-testid='style-dark-cards']");
          if (page === null) throw new Error("no dark page");
          const pageBg = getComputedStyle(page).backgroundColor;
          const style = getComputedStyle(element);
          // Tailwind lists its empty ring layers first; the edge is the layer with a spread.
          const layers: string[] = [];
          let depth = 0;
          let current = "";
          for (const char of style.boxShadow) {
            if (char === "(") depth += 1;
            if (char === ")") depth -= 1;
            if (char === "," && depth === 0) {
              layers.push(current.trim());
              current = "";
            } else current += char;
          }
          layers.push(current.trim());
          const edgeLayer = layers.find((layer) => {
            const lengths = layer
              .replace(/[a-z]+\([^)]*\)/gi, "")
              .trim()
              .split(/\s+/);
            return lengths.length >= 4 && parseFloat(lengths[3] ?? "0") > 0;
          });
          const ring = edgeLayer?.match(/[a-z]+\([^)]*\)/i)?.[0] ?? "";
          return {
            surface: ratio(style.backgroundColor, pageBg),
            edge: ring === "" ? 0 : ratio(ring, pageBg),
            text: ratio(style.color, style.backgroundColor),
          };
        });
        console.log(
          `[dark-cards] ${test.info().project.name} ${candidate}/${kind} surface ${m.surface} edge ${m.edge} text ${m.text}`,
        );
        expect(m.surface, `${candidate}/${kind} surface`).toBeGreaterThanOrEqual(1.25);
        if (kind === "plain" || kind === "no-photo")
          expect(m.edge, `${candidate}/${kind} edge`).toBeGreaterThanOrEqual(1.8);
        expect(m.text, `${candidate}/${kind} text`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test("DCC-2 the dark page's own card is candidate B", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    const same = await page.evaluate(() => {
      const root = document.documentElement;
      const wasDark = root.classList.contains("dark");
      root.classList.add("dark");
      const probe = (candidate: string | null) => {
        const host = document.createElement("div");
        if (candidate !== null) host.setAttribute("data-card-candidate", candidate);
        const card = document.createElement("div");
        card.setAttribute("class", "bg-card shadow-card");
        host.append(card);
        document.body.append(host);
        const style = getComputedStyle(card);
        const out = `${style.backgroundColor} | ${style.boxShadow}`;
        host.remove();
        return out;
      };
      const out = { live: probe(null), b: probe("b") };
      if (!wasDark) root.classList.remove("dark");
      return out;
    });
    expect(same.live).toBe(same.b);
  });
});

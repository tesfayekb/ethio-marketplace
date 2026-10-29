import { expect, it } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { headText, pageHead, fillOne } from "./page-head";

const base = { meta: [{ title: "Category — ethio.com" }, { name: "description", content: "Browse listings in this category from sellers near you." }] };
const read = () => pageHead("head.site.pattern.title", "head.category.description", base, "head.category.title");
it("PGH-1 server fallback is the exact existing base text", () => {
  expect(read().meta[0].title).toBe("Category — ethio.com");
  expect(headText(read().meta, (key) => en[key])).toEqual({ title: "Category — ethio.com", description: "Browse listings in this category from sellers near you." });
});
it("PGH-2 applied Amharic catalogue supplies title and description", () => {
  expect(headText(read().meta, (key) => am[key])).toEqual({ title: "ምድብ — ethio.com", description: am["head.category.description"] });
});
it("PGH-3 raw names are data, including replacement metacharacters", () => {
  expect(fillOne("{name} — ethio.com", "$&{other}")).toBe("$&{other} — ethio.com");
});
it("PGH-4 existing links scripts images and robots survive", () => {
  const extra = { ...base, links: [{ rel: "canonical", href: "https://example.org/ad" }], scripts: [{ children: "{}" }] };
  const result = pageHead("head.home.title", "head.home.description", extra);
  expect(result.links).toBe(extra.links);
  expect(result.scripts).toBe(extra.scripts);
  expect(extra.meta[0]).not.toHaveProperty("pageHead");
});
it("PGH-5 missing seller/ad contributes no replacement title", () => {
  expect(headText([{ name: "robots", content: "noindex" }], (key) => en[key])).toBeNull();
});
it("PGH-6 dynamic ad description remains the loader's content", () => {
  const result = pageHead("head.site.pattern.title", null, { meta: [{ title: "A phone — ethio.com" }, { name: "description", content: "Seller's own words." }] }, null, "A phone");
  expect(headText(result.meta, (key) => am[key])).toEqual({ title: "A phone — ethio.com", description: "Seller's own words." });
});
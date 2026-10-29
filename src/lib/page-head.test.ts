import { afterEach, expect, it } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { pageHead } from "./page-head";
import { applyPageHead } from "./page-head-client";

const fillOne = (text: string, name: string) => text.replace("{name}", name);
afterEach(() => {
  document.head.innerHTML = "";
});
it("PGH-1 home base title and description keep exact English", () => {
  const { meta } = pageHead("head.home.title", "head.home.description");
  expect(meta[0]).toEqual({ title: "ethio.com — Ethiopia's marketplace" });
  expect(meta[1].content).toBe(
    "Browse listings from sellers near you. Free to post, free to browse.",
  );
});
it("PGH-2 staff fallbacks remain exact before the layer loads", () => {
  const { meta } = pageHead(
    "head.admin.pattern.title",
    "head.admin.pattern.description",
    "admin.section.ai.title",
    null,
    "AI — ethio.com Admin",
    "AI in the ethio.com staff panel.",
  );
  expect(meta[0].title).toBe("AI — ethio.com Admin");
  expect(meta[1].content).toBe("AI in the ethio.com staff panel.");
});
it("PGH-3 member base first title does not lose the layer name", () => {
  expect(
    pageHead(
      "head.site.pattern.title",
      "head.account.description",
      "account.overview.title",
      null,
      "Account — ethio.com",
      "Review your ethio.com account and listing activity.",
    ).meta[0].title,
  ).toBe("Account — ethio.com");
});
it("PGH-4 loader name is text and a raw ad description is kept", () => {
  const { meta } = pageHead(
    "head.site.pattern.title",
    null,
    null,
    "<seller>",
    undefined,
    "Raw ad description",
  );
  expect(meta[0].title).toBe("<seller> — ethio.com");
  expect(meta[1].content).toBe("Raw ad description");
});
it("PGH-5 applied catalogue re-titles all four text fields", () => {
  document.head.innerHTML =
    '<title>base</title><meta name="description"><meta property="og:title" data-head-key="head.home.title"><meta property="og:description" data-head-key="head.home.description">';
  applyPageHead((key) => am[key]);
  expect(document.title).toBe(am["head.home.title"]);
  expect(document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content).toBe(
    am["head.home.description"],
  );
  expect(document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content).toBe(
    am["head.home.title"],
  );
  expect(document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content).toBe(
    am["head.home.description"],
  );
});
it("PGH-6 navigation head mutations re-title with the current catalogue, then base returns", async () => {
  document.head.innerHTML =
    '<title>base</title><meta name="description"><meta property="og:title" data-head-key="head.home.title"><meta property="og:description" data-head-key="head.home.description">';
  applyPageHead((key) => am[key]);
  document
    .querySelector<HTMLMetaElement>('meta[property="og:title"]')
    ?.setAttribute("data-head-key", "head.site.pattern.title");
  document
    .querySelector<HTMLMetaElement>('meta[property="og:title"]')
    ?.setAttribute("data-head-name-key", "auth.signIn");
  await Promise.resolve();
  expect(document.title).toBe(fillOne(am["head.site.pattern.title"], am["auth.signIn"]));
  applyPageHead((key) => en[key]);
  expect(document.title).toBe("Sign in — ethio.com");
});

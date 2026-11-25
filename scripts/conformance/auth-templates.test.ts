import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { ACTION_KINDS, templateFindings, type TemplateSources } from "./auth-templates";
import { report, walkFiles } from "./kit";

/**
 * CF-TPL-1 (cursor bundle 6, INC-1276) — every e-mail the sign-in server sends comes from the
 * repository: each template has its subject and its backend table, each subject its template, the
 * body is English then Amharic, and an action e-mail carries the provider's one link once in each
 * language half and no other link (scripts/conformance/auth-templates.ts says the laws).
 */

const TEMPLATES = "supabase/templates";

function realSources(): TemplateSources {
  const htmls: Record<string, string> = {};
  for (const file of walkFiles([TEMPLATES], { ext: ["html"] }))
    htmls[basename(file, ".html")] = readFileSync(file, "utf8");
  const subjects: unknown = JSON.parse(readFileSync(join(TEMPLATES, "subjects.json"), "utf8"));
  if (typeof subjects !== "object" || subjects === null) throw new Error("subjects.json is no map");
  const map: Record<string, string> = {};
  for (const [key, value] of Object.entries(subjects))
    if (typeof value === "string") map[key] = value;
  return {
    htmls,
    subjects: map,
    toml: readFileSync("scripts/ci/local-backend-config.toml", "utf8"),
  };
}

const PLANT_BODY = (link: string) =>
  `<div lang="en">\n  <p><a href="${link}">Go</a></p>\n</div>\n<hr />\n<div lang="am">\n  <p><a href="${link}">Go</a></p>\n</div>\n`;
const PLANT_TOML = (kind: string, subject: string) =>
  `\n[auth.email.template.${kind}]\nsubject = "${subject}"\ncontent_path = "supabase/templates/${kind}.html"\n\n`;

describe("CF-TPL-1 — every sign-in e-mail comes from the repository (INC-1276)", () => {
  it("TPL-1 the tree's templates, subjects and backend tables agree, and the three action e-mails are in it", () => {
    const sources = realSources();
    expect(report(templateFindings(sources))).toBe("");
    for (const kind of ACTION_KINDS) expect(Object.keys(sources.htmls)).toContain(kind);
    expect(Object.keys(sources.htmls).sort()).toEqual(Object.keys(sources.subjects).sort());
  });

  it("TPL-2 planted: a template with no subject, a subject with no template, a table missing or out of step all fail", () => {
    const base: TemplateSources = {
      htmls: { recovery: PLANT_BODY("{{ .ConfirmationURL }}") },
      subjects: { recovery: "Reset" },
      toml: PLANT_TOML("recovery", "Reset"),
    };
    expect(templateFindings(base)).toEqual([]);
    expect(templateFindings({ ...base, subjects: {} }).map((f) => f.what)).toEqual([
      'no subject "recovery" in supabase/templates/subjects.json',
    ]);
    expect(templateFindings({ ...base, htmls: {} }).map((f) => f.what)).toEqual([
      'the subject "recovery" has no supabase/templates/recovery.html',
    ]);
    expect(templateFindings({ ...base, toml: "" }).map((f) => f.what)).toEqual([
      "no [auth.email.template.recovery] table",
    ]);
    expect(
      templateFindings({ ...base, toml: PLANT_TOML("recovery", "Other") }).map((f) => f.what),
    ).toEqual(["the config's subject for \"recovery\" is not subjects.json's"]);
  });

  it("TPL-3 planted: the link rule is once in each language half, and no other link", () => {
    const base: TemplateSources = {
      htmls: {},
      subjects: { recovery: "Reset" },
      toml: PLANT_TOML("recovery", "Reset"),
    };
    const run = (body: string) =>
      templateFindings({ ...base, htmls: { recovery: body } }).map((f) => f.what);
    expect(run(PLANT_BODY("{{ .ConfirmationURL }}"))).toEqual([]);
    // Two links in one half, none in the other.
    const twice = PLANT_BODY("{{ .ConfirmationURL }}");
    expect(
      run(
        twice.replace(
          "</div>\n<hr />",
          '  <p><a href="{{ .ConfirmationURL }}">Again</a></p>\n</div>\n<hr />',
        ),
      ),
    ).toEqual([
      "the en half holds 2 {{ .ConfirmationURL }}, not one",
      "the en half has a link that is not the provider's one",
    ]);
    expect(run(PLANT_BODY("https://example.test/x"))).toEqual([
      "the en half holds 0 {{ .ConfirmationURL }}, not one",
      "the en half has a link that is not the provider's one",
      "the am half holds 0 {{ .ConfirmationURL }}, not one",
      "the am half has a link that is not the provider's one",
    ]);
    expect(run("<p>no form</p>")).toEqual([
      'the body is not the form <div lang="en">…</div> <hr /> <div lang="am">…</div>',
    ]);
    // A notice holds no link at all.
    const notice = templateFindings({
      htmls: { password_changed: PLANT_BODY("{{ .ConfirmationURL }}") },
      subjects: { password_changed: "Changed" },
      toml: `\n[auth.email.notification.password_changed]\nsubject = "Changed"\ncontent_path = "templates/password_changed.html"\n\n`,
    }).map((f) => f.what);
    expect(notice).toEqual([
      "a notice's en half holds a link or an address",
      "a notice's am half holds a link or an address",
    ]);
  });
});

/**
 * INC-1276, CF-TPL-1 — every e-mail the sign-in server sends comes from the repository.
 *
 * The sources: `supabase/templates/<kind>.html` (the body), `supabase/templates/subjects.json` (the
 * subject, one key per kind) and `scripts/ci/local-backend-config.toml` (the temporary backend's
 * table for the kind: `[auth.email.notification.<kind>]` for a notice, `[auth.email.template.<kind>]`
 * for an action e-mail). The laws, each a finding when broken:
 *  - every html has its subject key and its toml table; every subject key has its html;
 *  - the toml's `subject` is the subject key's text, and its `content_path` is the kind's file;
 *  - the body is the form `<div lang="en">…</div><hr /><div lang="am">…</div>` and nothing else;
 *  - an action e-mail holds `{{ .ConfirmationURL }}` once in EACH language half (twice in all) as the
 *    one link's address, and no other `href` or `http`; a notice holds no link and no address at all.
 */

export type TemplateFinding = { file: string; line: number; what: string };

/** The kinds the app sends as an action e-mail: the provider's one link, in both languages. */
export const ACTION_KINDS: readonly string[] = ["confirmation", "recovery", "email_change"];

export type TemplateSources = {
  /** `<kind>` → the html text (file name without its extension). */
  htmls: Readonly<Record<string, string>>;
  /** The parsed `subjects.json`. */
  subjects: Readonly<Record<string, string>>;
  /** The temporary backend's config text. */
  toml: string;
};

const LINK = "{{ .ConfirmationURL }}";
const FORM = /^<div lang="en">\n[\s\S]*?\n<\/div>\n<hr \/>\n<div lang="am">\n[\s\S]*?\n<\/div>\n?$/;

/** The `key = "value"` pairs of one toml table, or null when the table is absent. */
function tableOf(toml: string, header: string): Record<string, string> | null {
  const start = toml.indexOf(`\n[${header}]\n`);
  if (start < 0) return null;
  const body = toml.slice(start + header.length + 4).split(/\n\s*\n|\n\[/)[0] ?? "";
  const pairs: Record<string, string> = {};
  for (const line of body.split("\n")) {
    const match = /^(\w+) = "(.*)"$/.exec(line);
    if (match?.[1] !== undefined && match[2] !== undefined) pairs[match[1]] = match[2];
  }
  return pairs;
}

/** The two language halves of a body, or null when it is not the form. */
function halvesOf(html: string): { en: string; am: string } | null {
  if (!FORM.test(html)) return null;
  const [en = "", am = ""] = html.split("\n<hr />\n");
  return { en, am };
}

export function templateFindings(sources: TemplateSources): TemplateFinding[] {
  const found: TemplateFinding[] = [];
  const add = (file: string, what: string) => found.push({ file, line: 1, what });
  const kinds = new Set([...Object.keys(sources.htmls), ...Object.keys(sources.subjects)]);
  for (const kind of [...kinds].sort()) {
    const html = sources.htmls[kind];
    const subject = sources.subjects[kind];
    const file = `supabase/templates/${kind}.html`;
    if (html === undefined) {
      add("supabase/templates/subjects.json", `the subject "${kind}" has no ${file}`);
      continue;
    }
    if (subject === undefined)
      add(file, `no subject "${kind}" in supabase/templates/subjects.json`);
    const action = ACTION_KINDS.includes(kind);
    const table = tableOf(
      sources.toml,
      action ? `auth.email.template.${kind}` : `auth.email.notification.${kind}`,
    );
    if (table === null)
      add(
        file,
        `no ${action ? "[auth.email.template." : "[auth.email.notification."}${kind}] table`,
      );
    else {
      if (subject !== undefined && table["subject"] !== subject)
        add(file, `the config's subject for "${kind}" is not subjects.json's`);
      const path = action ? `supabase/templates/${kind}.html` : `templates/${kind}.html`;
      if (table["content_path"] !== path) add(file, `the config's content_path is not "${path}"`);
    }
    const halves = halvesOf(html);
    if (halves === null) {
      add(file, 'the body is not the form <div lang="en">…</div> <hr /> <div lang="am">…</div>');
      continue;
    }
    for (const [language, half] of Object.entries(halves)) {
      const links = half.split(LINK).length - 1;
      const withoutLink = half.split(LINK).join("");
      const anchors = withoutLink.match(/href\s*=|https?:|\/\//gi) ?? [];
      if (action) {
        if (links !== 1) add(file, `the ${language} half holds ${links} ${LINK}, not one`);
        if (anchors.length !== 1 || !half.includes(`<a href="${LINK}">`))
          add(file, `the ${language} half has a link that is not the provider's one`);
      } else if (links > 0 || anchors.length > 0) {
        add(file, `a notice's ${language} half holds a link or an address`);
      }
    }
  }
  return found;
}

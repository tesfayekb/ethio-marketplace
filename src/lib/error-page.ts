/**
 * INC-085(c) — the SSR error page is the face of the parallel-load flake
 * family. In DEV builds ONLY it carries the true cause (HTML comment plus a
 * `data-ssr-error` attribute) so Playwright page snapshots record why the
 * request failed. Production output stays byte-identical to the clean page.
 *
 * Dependency-free by law: the same module-init failure that triggers this page
 * must not be able to break it.
 */

function sanitizeForMarkup(message: string): string {
  return message
    .replace(/[<>&"]/g, " ")
    .replace(/--+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

function describe(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error) ?? String(error);
  } catch {
    return String(error);
  }
}

export function renderErrorPage(error?: unknown): string {
  // DEPENDENCY-FREE BY LAW: the flag is INLINED here rather than imported from
  // src/lib/env-flags.ts — the same module-init failure that triggers this page
  // must not be able to break it. Same expression, same meaning (DEC-018).
  const isInstrumented = Boolean(import.meta.env?.DEV) || import.meta.env?.VITE_E2E === "1";
  const detail = isInstrumented && error !== undefined ? sanitizeForMarkup(describe(error)) : "";
  const comment = detail ? `\n    <!-- ssr-error: ${detail} -->` : "";
  const attribute = detail ? ` data-ssr-error="${detail}"` : "";
  // INC-085d CLASS RULE — evidence must be VISIBLE to the instruments that
  // collect it: ARIA/page snapshots record text, never comments or attributes.
  const cause = detail
    ? `\n      <pre data-testid="ssr-error-cause" class="cause">${detail}</pre>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
      .cause { margin: 1rem 0 0; padding: 0.5rem; background: #fff; border: 1px solid #d1d5db; border-radius: 0.375rem; text-align: start; white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/1.4 ui-monospace, monospace; color: #b91c1c; }
    </style>
  </head>
  <body>${comment}
    <div class="card"${attribute}>
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>${cause}
    </div>
  </body>
</html>`;
}

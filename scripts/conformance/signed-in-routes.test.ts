import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, walkFiles } from "./kit";
import { SIGNED_IN_PAGES } from "../../src/lib/signed-in-pages";

/**
 * INC-852 (Foundations turn 1, D3): a signed-in screen's door-step is
 * requireSignedIn (src/lib/signed-in-route.ts), in ONE place. A route file
 * whose code reads auth.getSession( itself is a breach (signed-in-route.ts is
 * not under src/routes — so: always a breach); a route with ssr: false must
 * import requireSignedIn or carry an allowance. Expected allowances: none.
 * INC-923 (Foundations turn 34b-1) — nor does a screen send a signed-out visitor to sign in from its
 * own code (`hasSessionRehydrating(` or a navigate to "/auth"): that raced the screen's other routing
 * (/settings landed on "/"). Only the sign-in screens themselves (a route path under /auth) may.
 * INC-925 (Foundations turn 34w) — the door-step's list of its pages (SIGNED_IN_PAGES, read by the
 * shell's live guard) is every route that calls requireSignedIn and nothing else: CF-SIR-4.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "signed-in-routes-allowlist.txt");

type Finding = { file: string; line: number; what: string };

function lineOf(code: string, index: number): number {
  return code.slice(0, index).split("\n").length;
}

/** The door-step breaches under a routes root. */
export function census(routesRoot: string): { scanned: number; findings: Finding[] } {
  const files = walkFiles([routesRoot], { ext: ["ts", "tsx"], skipTests: true });
  const findings: Finding[] = [];
  for (const file of files) {
    const code = codeOf(readFileSync(file, "utf8"));
    const rel = relative(ROOT, file).split("\\").join("/");
    const session = code.indexOf("auth.getSession(");
    if (session !== -1) {
      findings.push({ file: rel, line: lineOf(code, session), what: "reads the session itself" });
      continue;
    }
    const path = /createFileRoute\("([^"]*)"\)/.exec(code)?.[1] ?? "";
    const ownGate = code.search(/hasSessionRehydrating\(|navigate\(\{\s*to:\s*"\/auth"/);
    if (ownGate !== -1 && !path.startsWith("/auth")) {
      findings.push({
        file: rel,
        line: lineOf(code, ownGate),
        what: "sends to sign in from the screen",
      });
      continue;
    }
    const ssr = code.indexOf("ssr: false");
    if (ssr !== -1 && !/\brequireSignedIn\b/.test(code))
      findings.push({
        file: rel,
        line: lineOf(code, ssr),
        what: "ssr: false without requireSignedIn",
      });
  }
  return { scanned: files.length, findings };
}

/** A route's address from its file route id: a non-nesting segment's trailing "_" is not in the URL. */
function addressOf(routeId: string): string {
  return routeId
    .split("/")
    .map((segment) => segment.replace(/_$/, ""))
    .join("/");
}

/** INC-925 — where the door-step's page list and the routes that call requireSignedIn disagree. */
export function pageListCensus(routesRoot: string, pages: readonly string[]): Finding[] {
  const covers = (address: string) =>
    pages.some((page) => address === page || address.startsWith(`${page}/`));
  const findings: Finding[] = [];
  const served = new Set<string>();
  for (const file of walkFiles([routesRoot], { ext: ["ts", "tsx"], skipTests: true })) {
    const code = codeOf(readFileSync(file, "utf8"));
    const id = /createFileRoute\("([^"]*)"\)/.exec(code)?.[1];
    if (id === undefined) continue;
    const address = addressOf(id);
    const rel = relative(ROOT, file).split(sep).join("/");
    const doorStep = code.search(/\brequireSignedIn\(/);
    for (const page of pages)
      if (address === page || address.startsWith(`${page}/`)) served.add(page);
    if (doorStep !== -1 && !covers(address))
      findings.push({
        file: rel,
        line: lineOf(code, doorStep),
        what: `${address} calls requireSignedIn but SIGNED_IN_PAGES does not list it`,
      });
    if (doorStep === -1 && covers(address))
      findings.push({
        file: rel,
        line: 1,
        what: `${address} is under SIGNED_IN_PAGES but its route does not call requireSignedIn`,
      });
  }
  for (const page of pages)
    if (!served.has(page))
      findings.push({
        file: "src/lib/signed-in-pages.ts",
        line: 1,
        what: `SIGNED_IN_PAGES lists ${page}, which no route serves`,
      });
  return findings;
}

const tempRoots: string[] = [];
afterEach(() => {
  while (tempRoots.length) rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

describe("every signed-in screen's door-step is requireSignedIn (INC-852)", () => {
  it("CF-SIR-1 no route reads the session itself; ssr: false implies requireSignedIn", () => {
    const { scanned, findings } = census(join(ROOT, "src", "routes"));
    expect(scanned).toBeGreaterThanOrEqual(10);
    const allowances = readAllowlist(
      ALLOWLIST,
      findings.map((finding) => finding.file),
    );
    const breaches = findings.filter((finding) => !allowances.has(finding.file));
    console.log(`[signed-in-routes] scanned: ${scanned}, breaches: ${breaches.length}`);
    expect(report(breaches)).toBe("");
  });

  it("CF-SIR-2 a planted route with its own getSession is reported", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      'const { data } = await supabase.auth.getSession();\nif (!data.session) throw new Error("x");\n',
    );
    const { findings } = census(temp);
    expect(findings).toEqual([
      {
        file: relative(ROOT, join(temp, "planted.tsx")).split("\\").join("/"),
        line: 1,
        what: "reads the session itself",
      },
    ]);
  });

  it("CF-SIR-3 a planted screen that sends to sign in itself is reported; a sign-in screen is not (INC-923)", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      'createFileRoute("/planted")({});\nif (!signedIn) void navigate({ to: "/auth", search: {} });\n',
    );
    writeFileSync(
      join(temp, "rehydrating.tsx"),
      'createFileRoute("/other")({});\nconst signedIn = await hasSessionRehydrating();\n',
    );
    writeFileSync(
      join(temp, "sign-in.tsx"),
      'createFileRoute("/auth")({});\nif (await hasSessionRehydrating()) void navigate({ to: "/auth", search: {} });\n',
    );
    const { findings } = census(temp);
    const at = (name: string) => relative(ROOT, join(temp, name)).split("\\").join("/");
    expect(findings).toEqual([
      { file: at("planted.tsx"), line: 2, what: "sends to sign in from the screen" },
      { file: at("rehydrating.tsx"), line: 2, what: "sends to sign in from the screen" },
    ]);
  });

  it("CF-SIR-4 SIGNED_IN_PAGES is every route that calls requireSignedIn, and nothing else (INC-925)", () => {
    const findings = pageListCensus(join(ROOT, "src", "routes"), SIGNED_IN_PAGES);
    console.log(`[signed-in-routes] door-step pages: ${SIGNED_IN_PAGES.length}`);
    expect(report(findings)).toBe("");
    // The shell's live guard reads the list itself — never a copy of its own: for the pages it
    // sends to sign in and (INC-926) for the pages it evacuates after a sign-out.
    const shell = codeOf(readFileSync(join(ROOT, "src/components/app-shell.tsx"), "utf8"));
    expect(shell).toMatch(/const ownSignIn = sendsToSignIn\(pathname\);/);
    expect(shell).toMatch(
      /const gatedRoute = pathname\.startsWith\("\/admin"\) \|\| sendsToSignIn\(pathname\);/,
    );
  });

  it("CF-SIR-5 a planted unlisted door-step, a listed page without it and a list entry no route serves are reported", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "unlisted.tsx"),
      'createFileRoute("/vault_/$id")({\n  beforeLoad: () => requireSignedIn("/vault"),\n});\n',
    );
    writeFileSync(join(temp, "listed.tsx"), 'createFileRoute("/settings")({});\n');
    writeFileSync(
      join(temp, "kept.tsx"),
      'createFileRoute("/account_/saved")({\n  beforeLoad: () => requireSignedIn("/account/saved"),\n});\n',
    );
    const at = (name: string) => relative(ROOT, join(temp, name)).split(sep).join("/");
    expect(pageListCensus(temp, ["/account", "/settings", "/ghost"])).toEqual([
      {
        file: at("listed.tsx"),
        line: 1,
        what: "/settings is under SIGNED_IN_PAGES but its route does not call requireSignedIn",
      },
      {
        file: at("unlisted.tsx"),
        line: 2,
        what: "/vault/$id calls requireSignedIn but SIGNED_IN_PAGES does not list it",
      },
      {
        file: "src/lib/signed-in-pages.ts",
        line: 1,
        what: "SIGNED_IN_PAGES lists /ghost, which no route serves",
      },
    ]);
  });
});

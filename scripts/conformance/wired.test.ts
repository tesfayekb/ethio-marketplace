import { readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { codeOf, walkFiles } from "./kit";

/**
 * INC-563's class (Foundations turn 1, C3): a guard nothing runs is not a
 * guard. The domain — every scripts/check-*.{sh,ts,mjs}, every scripts/*.sh,
 * every scripts/*.ts exporting check(/inspect( and every
 * scripts/conformance/*.ts census (not a test, not the kit) — is each NAMED,
 * by basename, in a workflow step, a package.json script or a test under
 * scripts/ or src/. No allowlist: a script nothing runs is retired or wired,
 * never excused.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The scripts that must have a caller, as root-relative paths. */
export function wiredDomain(root = ROOT): string[] {
  const scripts = join(root, "scripts");
  const domain: string[] = [];
  for (const file of walkFiles([scripts], { ext: ["sh", "ts", "mjs"] })) {
    const name = basename(file);
    const rel = relative(root, file).split("\\").join("/");
    if (name.startsWith("check-") || name.endsWith(".sh")) {
      domain.push(rel);
      continue;
    }
    if (rel.startsWith("scripts/conformance/")) {
      if (!name.endsWith(".test.ts") && name !== "kit.ts") domain.push(rel);
      continue;
    }
    if (
      name.endsWith(".ts") &&
      !name.endsWith(".test.ts") &&
      rel.split("/").length === 2 &&
      /export\s+(?:async\s+)?function\s+(?:check|inspect)\s*\(/.test(
        codeOf(readFileSync(file, "utf8")),
      )
    )
      domain.push(rel);
  }
  return domain.sort();
}

/** Every text a caller can name a script in: workflows, package.json scripts, tests. */
export function callerText(root = ROOT): string {
  const parts: string[] = [];
  for (const file of walkFiles([join(root, ".github", "workflows")], { ext: ["yml"] }))
    parts.push(readFileSync(file, "utf8"));
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
    scripts?: Record<string, string>;
  };
  parts.push(Object.values(pkg.scripts ?? {}).join("\n"));
  for (const rootDir of ["scripts", "src"]) {
    for (const file of walkFiles([join(root, rootDir)], { ext: ["ts", "tsx"] })) {
      if (/\.test\.tsx?$/.test(file)) parts.push(readFileSync(file, "utf8"));
    }
  }
  return parts.join("\n");
}

/** The domain scripts no caller names (matched by basename without extension). */
export function missingCallers(domain: string[], callers: string): string[] {
  return domain.filter((path) => {
    const stem = basename(path).replace(/\.(?:sh|ts|mjs)$/, "");
    return !callers.includes(stem);
  });
}

describe("every guard script is wired to a caller (INC-563)", () => {
  it("CF-WIRED-1 the domain is each named by a workflow, a package.json script or a test", () => {
    const domain = wiredDomain();
    const missing = missingCallers(domain, callerText());
    console.log(`[wired] domain: ${domain.length} scripts, missing: ${missing.length}`);
    expect(domain.length).toBeGreaterThanOrEqual(20);
    expect(missing).toEqual([]);
    // DEC-310: smoke runs the lint with the catalogue; migration guard calls the same parser.
    expect(readFileSync(join(ROOT, ".github/workflows/local-backend-proof.yml"), "utf8")).toContain(
      "bun scripts/security-lints.ts --tsv",
    );
    expect(readFileSync(join(ROOT, "scripts/check-migrations.sh"), "utf8")).toContain(
      'public-surface.ts" --migration',
    );
    // INC-1089: the migration guard runs the reader's spanning-literal census.
    expect(readFileSync(join(ROOT, "scripts/check-migrations.sh"), "utf8")).toContain(
      'conformance/migration-reader.ts" --spanning',
    );
    expect(readFileSync(join(ROOT, "scripts/security-lints.ts"), "utf8")).toContain(
      'from "./public-surface"',
    );
    // route-client.test.ts RCG-1…3 is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "vitest.config.ts"), "utf8")).toContain("scripts/**/*.test.ts");
    expect(readFileSync(join(ROOT, "scripts/conformance/route-client.test.ts"), "utf8")).toContain(
      "RCG-3",
    );
    expect(readFileSync(join(ROOT, "src/server/ai/gateway.census.test.ts"), "utf8")).toContain(
      "GWC-5",
    );
    // look-values.test.ts CF-LOOK-1…2 (turn SAGE-S0) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/look-values.test.ts"), "utf8")).toContain(
      "CF-LOOK-2",
    );
    // budget-band.test.ts NB-1…5 (turn A, DEC-296) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/budget-band.test.ts"), "utf8")).toContain(
      "NB-5",
    );
    // dialogs.test.ts CF-DIALOG-1 DG-1…6 (turn S6-1) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/dialogs.test.ts"), "utf8")).toContain(
      "DG-6",
    );
    // card-tiers.test.ts CF-TIER-1…3 (turn SAGE-S4) is discovered by test:unit's scripts/**/*.test.ts;
    // its build judge (route-budgets.mjs tierFlagViolations) runs in check-bundle-size.mjs.
    expect(readFileSync(join(ROOT, "scripts/conformance/card-tiers.test.ts"), "utf8")).toContain(
      "CF-TIER-3",
    );
    expect(readFileSync(join(ROOT, "scripts/check-bundle-size.mjs"), "utf8")).toContain(
      "tierFlagViolations(",
    );
    // bundle-closure.test.ts BC-14…15 (housekeeping turn 1b, DEC-362) is discovered by test:unit's
    // scripts/**/*.test.ts; its two judges (ENTRY_CLOSURE and the shared-shell module census) run in
    // the budget step, check-bundle-size.mjs.
    expect(readFileSync(join(ROOT, "scripts/bundle-closure.test.ts"), "utf8")).toContain("BC-15");
    const budgetStep = readFileSync(join(ROOT, "scripts/check-bundle-size.mjs"), "utf8");
    expect(budgetStep).toContain("closureListViolations(");
    expect(budgetStep).toContain("moduleCensus(");
    // vendor-seams.test.ts VS-1…3 is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/vendor-seams.test.ts"), "utf8")).toContain(
      "VS-3",
    );
    // check-doors.test.ts CF-DOORS DOORS-1…6 (F1-1, DEC-333; DOORS-5 INC-1070; DOORS-6 INC-1072) is discovered by
    // test:unit's scripts/**/*.test.ts; check-doors.ts itself runs in ci.yml (self-test + static)
    // and local-backend-proof.yml (--live, DEC-334) with the query of scripts/doors/live-query.sql.
    const doorsTests = readFileSync(join(ROOT, "scripts/doors/check-doors.test.ts"), "utf8");
    expect(doorsTests).toContain("DOORS-4");
    expect(doorsTests).toContain("DOORS-5");
    expect(doorsTests).toContain("DOORS-6");
    expect(readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8")).toContain(
      "bun scripts/doors/check-doors.ts",
    );
    expect(readFileSync(join(ROOT, ".github/workflows/local-backend-proof.yml"), "utf8")).toContain(
      "check-doors.ts --live",
    );
    // seller-names.ts (DEC-359) is the seller-name law: seller-names.test.ts SPA-10a…10d runs its
    // file half; the smoke lane runs its live half after the door guard.
    expect(readFileSync(join(ROOT, "scripts/conformance/seller-names.test.ts"), "utf8")).toContain(
      "SPA-10d",
    );
    expect(readFileSync(join(ROOT, ".github/workflows/local-backend-proof.yml"), "utf8")).toContain(
      "bun scripts/conformance/seller-names.ts --live ",
    );
    // proof-readers.test.ts CF-PROOF-1 PRF-1…4 and CF-PROOF-2 PRF-5 (turn P-2 (a), INC-1052, DEC-341, INC-1054) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/proof-readers.test.ts"), "utf8")).toContain(
      "PRF-5",
    );
    // sql-writes.test.ts CF-SQL-1 SQW-1…3 (turn P-2 (a), INC-1055) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/sql-writes.test.ts"), "utf8")).toContain(
      "SQW-3",
    );
    // status-map.test.ts CF-STATUS-1 STM-1…3 (turn P-2 (a), INC-1057) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/status-map.test.ts"), "utf8")).toContain(
      "STM-3",
    );
    // listing-seed.test.ts CF-SEED-1 CFS-1…4 (turn P-2 (a), rulings 13 and 14, D318, INC-1061) is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/listing-seed.test.ts"), "utf8")).toContain(
      "CFS-4",
    );
    // door-answers.test.ts CF-DOOR-1 CFD-1…3 (turn P-2 (a), ruling 14, INC-1062) runs door-answers.ts's census;
    // it is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "scripts/conformance/door-answers.test.ts"), "utf8")).toContain(
      "CFD-3",
    );
    // listing-designation.test.ts CF-TIER-5 DSG-1…3 (turn P-2 (a), ruling 14) runs listing-designation.ts's census;
    // it is discovered by test:unit's scripts/**/*.test.ts.
    expect(
      readFileSync(join(ROOT, "scripts/conformance/listing-designation.test.ts"), "utf8"),
    ).toContain("DSG-3");
    // listing-levels.test.ts CF-LEVEL-1 CFL-1…3 (turn P-1b, D290) is discovered by test:unit's scripts/**/*.test.ts.
    expect(
      readFileSync(join(ROOT, "scripts/conformance/listing-levels.test.ts"), "utf8"),
    ).toContain("CFL-3");
    // admin-guides.test.ts CF-GUIDE-1 CFG-1…3 (turn P-1c, D313) is discovered by test:unit's
    // scripts/**/*.test.ts; admin-tables.test.ts TBL-4/TBL-6 read its allowlist for T10.
    expect(readFileSync(join(ROOT, "scripts/conformance/admin-guides.test.ts"), "utf8")).toContain(
      "CFG-3",
    );
    expect(readFileSync(join(ROOT, "scripts/admin-tables.test.ts"), "utf8")).toContain(
      "admin-guides-allowlist.txt",
    );
    // locale-imports.test.ts CF-LOC-1 CFLI-1…4 (turn P-1c (d), roadmap line 7's fold) is discovered
    // by test:unit's scripts/**/*.test.ts; its census is locale-imports.ts.
    expect(
      readFileSync(join(ROOT, "scripts/conformance/locale-imports.test.ts"), "utf8"),
    ).toContain("CFLI-4");
    // briefs.test.ts CF-BRIEF-1…4 (housekeeping turn 1, DEC-361) and CF-BRIEF-11…15 (housekeeping
    // turn 2) is discovered by test:unit's scripts/**/*.test.ts; it reads the brief roadmap line 3
    // names and that brief's rulings, and its self-test CF-BRIEF-14 runs scripts/brief/go-laws.ts's
    // every law and spawns scripts/brief/check-go.ts (the supervisor's pre-send run) on planted GOs.
    const briefLaws = readFileSync(join(ROOT, "scripts/conformance/briefs.test.ts"), "utf8");
    expect(briefLaws).toContain("CF-BRIEF-4");
    expect(briefLaws).toContain("CF-BRIEF-14");
    expect(briefLaws).toContain("CF-BRIEF-15");
    expect(briefLaws).toContain('"scripts/brief/check-go.ts"');
    expect(briefLaws).toContain('from "../brief/go-laws"');
    // e2e-helpers.test.ts CF-HELPERS-1…3 (housekeeping turn 2, INC-1065) is discovered by test:unit's
    // scripts/**/*.test.ts; it reads e2e/ and e2e-helpers-allowlist.txt.
    expect(readFileSync(join(ROOT, "scripts/conformance/e2e-helpers.test.ts"), "utf8")).toContain(
      "CF-HELPERS-3",
    );
    // lockfile-hosts.test.ts CF-LOCK-1…2 (the lockfile turn, DEC-363) is discovered by test:unit's
    // scripts/**/*.test.ts; it reads bun.lock and lockfile-hosts-allowlist.txt.
    expect(
      readFileSync(join(ROOT, "scripts/conformance/lockfile-hosts.test.ts"), "utf8"),
    ).toContain("CF-LOCK-2");
    // pattern-sites.test.ts CF-PATTERN-4 and scripts/lib/pattern.test.ts CF-PATTERN-1…3
    // (housekeeping turn 2 Part D, INC-1102) are discovered by test:unit's scripts/**/*.test.ts;
    // the census reads scripts/ and pattern-sites-allowlist.txt.
    expect(readFileSync(join(ROOT, "scripts/conformance/pattern-sites.test.ts"), "utf8")).toContain(
      "CF-PATTERN-4",
    );
    expect(readFileSync(join(ROOT, "scripts/lib/pattern.test.ts"), "utf8")).toContain(
      "CF-PATTERN-3",
    );
    // install-browser-deps.test.ts CF-INSTALL-1…6 (housekeeping turn 3 Part A, INC-1101, DEC-366) is
    // discovered by test:unit's scripts/**/*.test.ts; CF-CID-1's seventh rule holds every workflow's
    // browser-library install to scripts/ci/install-browser-deps.sh.
    expect(readFileSync(join(ROOT, "scripts/ci/install-browser-deps.test.ts"), "utf8")).toContain(
      "CF-INSTALL-6",
    );
    // e2e-failure-report.test.ts EFR-1 (housekeeping turn 3 Part B, INC-1101) runs the reporter's
    // in-file self-test, which ci.yml's verdict job also runs first.
    expect(readFileSync(join(ROOT, "scripts/e2e-failure-report.test.ts"), "utf8")).toContain(
      "EFR-1",
    );
    // publish-evidence.test.ts CF-PUBLISH-1…3 (housekeeping turn 3 Part C, DEC-321) is discovered
    // by test:unit's scripts/**/*.test.ts; ci-deadlines.test.ts CF-CID-5/6 holds every publisher
    // call to its EVIDENCE_REF.
    expect(readFileSync(join(ROOT, "scripts/publish-evidence.test.ts"), "utf8")).toContain(
      "CF-PUBLISH-3",
    );
    expect(readFileSync(join(ROOT, "scripts/conformance/ci-deadlines.test.ts"), "utf8")).toContain(
      "CF-CID-6",
    );
    // docs-only.test.ts CF-DOCS-1…6 (housekeeping turn 3 Part D, DEC-365) is discovered by
    // test:unit's scripts/**/*.test.ts; ci.yml's `scope` job runs scripts/ci/docs-only.ts, and
    // check-promote-needs.sh's planted fixture proves promote's explicit condition.
    expect(readFileSync(join(ROOT, "scripts/ci/docs-only.test.ts"), "utf8")).toContain("CF-DOCS-6");
    // redact.test.ts CF-REDACT-1/2, backend-config.test.ts CF-BCFG-1/2 and ci-images.test.ts
    // CF-CI-IMG-5 (housekeeping turn 3 Part E) are discovered by test:unit's scripts/**/*.test.ts;
    // local-backend-proof.yml imports scripts/ci/redact.py and runs scripts/ci/backend-config.py.
    expect(readFileSync(join(ROOT, "scripts/ci/redact.test.ts"), "utf8")).toContain("CF-REDACT-2");
    expect(readFileSync(join(ROOT, "scripts/ci/backend-config.test.ts"), "utf8")).toContain(
      "CF-BCFG-2",
    );
    expect(readFileSync(join(ROOT, "scripts/conformance/ci-images.test.ts"), "utf8")).toContain(
      "CF-CI-IMG-5",
    );
  });

  it("CF-WIRED-2 a basename no caller names is reported", () => {
    expect(missingCallers(["scripts/check-planted-thing.sh"], "some other text")).toEqual([
      "scripts/check-planted-thing.sh",
    ]);
    expect(
      missingCallers(["scripts/check-planted-thing.sh"], "bash scripts/check-planted-thing.sh"),
    ).toEqual([]);
  });
});

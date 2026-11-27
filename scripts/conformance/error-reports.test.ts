import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  ANSWER_HOME,
  answerFindings,
  answersHere,
  NOTICE_HOME,
  readingFindings,
  type ReportFinding,
} from "./error-reports";
import { readAllowlist, report, TREE_SCAN_MS, typedProgram, visitTs, walkFiles } from "./kit";

/**
 * DEC-474 Part F (cursor-bundle-8b) — the reporter census over the tree, and its planted bypasses:
 * a server reading that does not report, a refusal that reports, a crash boundary that does not
 * report and a 500 built outside serverError each fail; their honest twins pass.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "error-reports-allowlist.txt");

function rel(file: string): string {
  return relative(ROOT, file).split("\\").join("/");
}

function sourceOf(file: string, text: string): ts.SourceFile {
  return ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function treeReadingFindings(): ReportFinding[] {
  const findings: ReportFinding[] = [];
  for (const file of walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"], skipTests: true })) {
    let source: ts.SourceFile | null = null;
    visitTs(file, (node, whole) => {
      if (node.kind === ts.SyntaxKind.SourceFile) source = whole;
    });
    if (source !== null) findings.push(...readingFindings(rel(file), source));
  }
  return findings;
}

let tree: { readings: ReportFinding[]; answers: ReportFinding[] } | null = null;

/** Both halves once: the allowlist is judged against every key the census finds. */
function treeFindings(): { readings: ReportFinding[]; answers: ReportFinding[] } {
  tree ??= {
    readings: treeReadingFindings(),
    answers: answerFindings(typedProgram(ROOT), ROOT, answersHere),
  };
  return tree;
}

function unallowed(findings: ReportFinding[]): string {
  const { readings, answers } = treeFindings();
  const allowed = readAllowlist(
    ALLOWLIST,
    [...readings, ...answers].map((finding) => finding.key),
  );
  return report(findings.filter((finding) => !allowed.has(finding.key)));
}

describe("the reporter census (DEC-474 Part F)", () => {
  it(
    "ERCE-1 every server reading, crash boundary and notice report in src/ reports as the one reading decides, but the allowlist's",
    () => {
      expect(unallowed(treeFindings().readings)).toBe("");
    },
    TREE_SCAN_MS * 2,
  );

  it(
    "ERCE-2 no answer of status 500 is built outside serverError, but the allowlist's",
    () => {
      expect(unallowed(treeFindings().answers)).toBe("");
    },
    TREE_SCAN_MS * 2,
  );

  it("ERCE-3 a planted server reading that does not report, a refusal that reports and a boundary that does not report each fail; their twins pass", () => {
    const silent = readingFindings(
      "src/features/x/silent.ts",
      sourceOf(
        "src/features/x/silent.ts",
        `export const READ: FailureReading = { kind: "server", diagnostic: "x", until: undefined };`,
      ),
    );
    expect(silent.map((f) => f.key)).toEqual(["reading src/features/x/silent.ts#READ"]);

    const refusal = readingFindings(
      NOTICE_HOME,
      sourceOf(
        NOTICE_HOME,
        `export function useNotice(error: unknown) {
           const reading = failureKind(error);
           useEffect(() => {
             if (reading.kind === "noAccess") reportBrowserFailure({ kind: "notice", code: null, error });
           }, [reading.kind]);
         }`,
      ),
    );
    expect(refusal.map((f) => f.what)).toEqual(["reports a notice its server kind did not decide"]);

    const elsewhere = readingFindings(
      "src/features/x/own-reading.ts",
      sourceOf(
        "src/features/x/own-reading.ts",
        `export function own(error: unknown) {
           if (failureKind(error).kind === "server") reportBrowserFailure({ kind: "notice", code: null, error });
         }`,
      ),
    );
    expect(elsewhere.map((f) => f.what)).toEqual([
      "reports a notice outside the notice's one reading",
    ]);

    const boundary = readingFindings(
      "src/routes/planted.tsx",
      sourceOf(
        "src/routes/planted.tsx",
        `export const Route = createFileRoute("/planted")({ errorComponent: PlantedError });`,
      ),
    );
    expect(boundary.map((f) => f.key)).toEqual(["boundary src/routes/planted.tsx#Route"]);

    const honest = readingFindings(
      NOTICE_HOME,
      sourceOf(
        NOTICE_HOME,
        `const UNREAD = { kind: "server", diagnostic: "unreadable", until: undefined };
         export function useNotice(error: unknown) {
           const reading = failureKind(error);
           useEffect(() => {
             if (reading.kind !== "server") return;
             reportBrowserFailure({ kind: "notice", code: null, error });
           }, [reading.kind]);
         }
         export const Route = createRootRoute({ errorComponent: Crash });`,
      ),
    );
    expect(honest).toEqual([]);
  });

  it("ERCE-4 a planted 500 built outside serverError fails; a status on a thrown failure and the answer module's own pass", () => {
    const planted = (path: string, text: string) =>
      answerFindings(typedProgram(ROOT, { path, text }), ROOT, (file) => file === path);
    expect(
      planted(
        "src/server/planted-500.ts",
        `export function answer(): Response { return new Response("x", { status: 500 }); }
         export function json(): Response { return Response.json({ error: "x" }, { status: 500 }); }`,
      ).map((f) => f.key),
    ).toEqual(["500 src/server/planted-500.ts#answer", "500 src/server/planted-500.ts#json"]);
    expect(
      planted(
        "src/server/planted-thrown.ts",
        `export function fail(): never { throw Object.assign(new Error("x"), { status: 500 }); }`,
      ),
    ).toEqual([]);
    expect(
      answerFindings(
        typedProgram(ROOT, {
          path: ANSWER_HOME,
          text: `export function serverError(): Response { return new Response("x", { status: 500 }); }`,
        }),
        ROOT,
        (file) => file === ANSWER_HOME,
      ),
    ).toEqual([]);
  });

  it("ERCE-5 a planted notice drawn with an error of null or undefined, or with a carried reading, fails (INC-1319); its error, a refusal by construction and a reading the file builds pass", () => {
    const path = "src/features/x/unseen.tsx";
    const unseen = readingFindings(
      path,
      sourceOf(
        path,
        `export function Unseen({ item }: { item: { reading: FailureReading } }) {
           return (
             <>
               <FailureNotice error={null} testid="x-null" />
               <FeedError error={undefined} />
               <FailureNotice reading={item.reading} testid="x-carried" />
             </>
           );
         }`,
      ),
    );
    expect(unseen.map((f) => f.key)).toEqual([
      `unseen ${path}#Unseen::x-null`,
      `unseen ${path}#Unseen`,
      `unseen ${path}#Unseen::x-carried`,
    ]);

    const twins = readingFindings(
      path,
      sourceOf(
        path,
        `const NONE = { kind: "server", diagnostic: "none", until: undefined };
         export function Seen({ error }: { error: unknown }) {
           return (
             <>
               <FailureNotice error={error} testid="x-error" />
               <FailureNotice reading={goneReading()} testid="x-gone" />
               <FailureNotice reading={rateReading(undefined)} testid="x-rate" />
               <FailureNotice reading={NONE} testid="x-built" />
             </>
           );
         }`,
      ),
    );
    expect(twins.map((f) => f.key)).toEqual(["reading src/features/x/unseen.tsx#NONE"]);
  });
});

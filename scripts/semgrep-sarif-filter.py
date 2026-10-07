#!/usr/bin/env python3
"""DEC-153 (b) — the SARIF the Semgrep job uploads holds security findings only.

Usage:
  python3 scripts/semgrep-sarif-filter.py semgrep.sarif      # filters in place
  python3 scripts/semgrep-sarif-filter.py --self-test         # proves the rules

Rules, applied to every result of every run:
  (c) a result carrying a `suppressions` entry (a reviewed site, `nosemgrep`)
      is dropped and counted as suppressed;
  (a) an ERROR result is kept wherever it is;
  (b) a WARNING result whose file is under e2e/ or ends in .test.ts/.test.tsx
      is dropped as test code; any other WARNING is kept.

A SARIF result has no level of its own here: its level is its rule's
defaultConfiguration.level. Prints one count line — counts only, never a
finding's file, line or rule (DEC-132 rule 2) — and exits 1 for any ERROR.
Standard library only.
"""

import json
import sys


def _rule_levels(run):
    levels = {}
    for rule in run.get("tool", {}).get("driver", {}).get("rules", []) or []:
        level = (rule.get("defaultConfiguration") or {}).get("level", "warning")
        levels[rule.get("id")] = level
    return levels


def _level(result, levels):
    level = result.get("level") or levels.get(result.get("ruleId"), "warning")
    return "error" if level == "error" else "warning"


def _uri(result):
    for location in result.get("locations", []) or []:
        uri = (
            location.get("physicalLocation", {}).get("artifactLocation", {}).get("uri")
        )
        if uri:
            return uri
    return ""


def _is_test_code(uri):
    path = uri[len("file://"):] if uri.startswith("file://") else uri
    path = path.lstrip("./")
    return (
        path.startswith("e2e/")
        or "/e2e/" in path
        or path.endswith(".test.ts")
        or path.endswith(".test.tsx")
    )


def filter_sarif(sarif):
    """Filters a SARIF document in place; answers (error, kept, test, suppressed)."""
    error = kept = test = suppressed = 0
    for run in sarif.get("runs", []) or []:
        levels = _rule_levels(run)
        out = []
        for result in run.get("results", []) or []:
            if result.get("suppressions"):
                suppressed += 1
                continue
            if _level(result, levels) == "error":
                error += 1
                out.append(result)
                continue
            if _is_test_code(_uri(result)):
                test += 1
                continue
            kept += 1
            out.append(result)
        run["results"] = out
    return error, kept, test, suppressed


def _count_line(counts):
    error, kept, test, suppressed = counts
    return (
        f"Semgrep counts: ERROR={error} WARNING kept={kept} "
        f"WARNING dropped as test code={test} suppressed={suppressed}"
    )


def _fixture_result(rule, uri, suppressed=False):
    result = {
        "ruleId": rule,
        "locations": [
            {"physicalLocation": {"artifactLocation": {"uri": uri}, "region": {"startLine": 1}}}
        ],
    }
    if suppressed:
        result["suppressions"] = [{"kind": "inSource"}]
    return result


def self_test():
    sarif = {
        "runs": [
            {
                "tool": {
                    "driver": {
                        "rules": [
                            {"id": "planted.error", "defaultConfiguration": {"level": "error"}},
                            {"id": "planted.warning", "defaultConfiguration": {"level": "warning"}},
                        ]
                    }
                },
                "results": [
                    _fixture_result("planted.error", "e2e/a.spec.ts"),
                    _fixture_result("planted.warning", "src/lib/a.test.ts"),
                    _fixture_result("planted.warning", "src/lib/b.ts", suppressed=True),
                    _fixture_result("planted.warning", "src/lib/c.ts"),
                ],
            }
        ]
    }
    counts = filter_sarif(sarif)
    kept_uris = sorted(_uri(r) for r in sarif["runs"][0]["results"])
    failures = []
    if counts != (1, 1, 1, 1):
        failures.append(f"counts {counts} != (1, 1, 1, 1)")
    if kept_uris != ["e2e/a.spec.ts", "src/lib/c.ts"]:
        failures.append(f"kept {kept_uris}")
    if failures:
        print("SELF-TEST FAILED — " + "; ".join(failures))
        return 1
    print(
        "Self-test OK: an ERROR in test code is kept; a WARNING in test code is dropped; "
        "a suppressed result is dropped; a WARNING in product code is kept."
    )
    return 0


def main(argv):
    if "--self-test" in argv:
        return self_test()
    if len(argv) != 1:
        print("usage: semgrep-sarif-filter.py <file.sarif> | --self-test")
        return 2
    path = argv[0]
    with open(path, encoding="utf-8") as handle:
        sarif = json.load(handle)
    counts = filter_sarif(sarif)
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(sarif, handle)
    print(_count_line(counts))
    if counts[0]:
        print(
            f"::error::Semgrep: {counts[0]} ERROR finding(s). Bodies are not printed in this log "
            "(DEC-132 rule 2). Reproduce locally with the pinned version and rules, or read "
            "Security → Code scanning (branch dev, tool Semgrep)."
        )
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

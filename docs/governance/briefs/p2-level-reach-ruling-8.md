# P-2 turn (a) — ruling 8 (the revision shape, and dev merged in before the judging run)

Base: cursor/p2-plan at f9db30818

````
RULING — P-2 (a), ruling 8: the revision shape, and dev merged in before the judging run. Base: cursor/p2-plan f9db30818. Save as docs/governance/briefs/p2-level-reach-ruling-8.md.
**MODEL — Claude Fable 5.1 (High)**

1. THE QUESTION — the revision keeps its nulls. A revision row is the before/after of the columns the door touched, and an explicit null there is information (tier_until null = "no end was set"), unlike the audit meta, which is a flat summary and strips them — two shapes for two purposes, kept (recorded as a decision). So ATR-1 :2383–:2384 and ATR-6 :2590–:2591 assert the exact new truth: before `toEqual({ tier: "regular", tier_until: null, tier_source: null })`, after `toEqual({ tier: "premium", tier_until: null, tier_source: "staff" })`. No migration change. Census the spec for any other `toEqual` on a revision's before/after that names tier and treat it the same.

2. DEV MERGED IN: `git merge origin/dev` (c89271ca2 — never a rebase; a merge commit). Expected conflicts: roadmap.md (your line 3 against dev's new line 4) and docs/_changelog.md — keep both sides, except roadmap line 4 "Lane B (build): docs/governance/briefs/ci-db-error-record.md", which goes (that lane closed with PR #22's merge). Nothing else of this turn's scope is in dev's 15 files. The judging run then runs on the tree that will land — and carries DEC-340's capture if anything fails at the apply.

3. Then `bash scripts/check-migrations.sh` → typecheck → lint → push ONCE → END THE TURN. The preflight's STAGING BEHIND red stays expected (eight files, not yet on staging); any other red whose body touches a path this turn changed is a STOP. Stop-4 report §8: the two decisions above, one line each.
````

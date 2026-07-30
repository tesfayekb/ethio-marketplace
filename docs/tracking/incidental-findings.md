# Incidental Findings (INC-###)
| ID | Date | Finding | Disposition |
|---|---|---|---|
| INC-000 | 2026-07-29 | Committed .env holds publishable-tier values only (verified); standing rule: nothing above publishable tier may ever enter it | RULED-ACCEPTABLE, CI secrets-scan guards |
| INC-001 | 2026-07-29 | First CI run exposed 127 latent prettier errors in scaffold-era files; generated files (supabase types.ts, routeTree.gen.ts) were lintable | FIXED — generated files excluded from lint/format as a class; four integration files formatted |
| INC-002 | 2026-07-30 | String-scanner (warn-mode) surfaced pre-existing hardcoded strings in __root.tsx scaffold error/not-found boundary; same class as INC-001 scaffold debt | FIXED same-day + scanner promoted to fail-mode so the class cannot recur |

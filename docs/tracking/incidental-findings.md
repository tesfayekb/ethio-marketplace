# Incidental Findings (INC-###)
| ID | Date | Finding | Disposition |
|---|---|---|---|
| INC-000 | 2026-07-29 | Committed .env holds publishable-tier values only (verified); standing rule: nothing above publishable tier may ever enter it | RULED-ACCEPTABLE, CI secrets-scan guards |
| INC-001 | 2026-07-29 | First CI run exposed 127 latent prettier errors in scaffold-era files; generated files (supabase types.ts, routeTree.gen.ts) were lintable | FIXED — generated files excluded from lint/format as a class; four integration files formatted |

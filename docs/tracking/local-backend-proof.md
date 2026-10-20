# Local backend proof (non-gating)

- Commit: `7464c799de3a7efbe0f3f2d837aa3b437ea607c8`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39385861649
- CLI version: 2.120.0
- Seconds — checkout: 2
- Seconds — install: 8
- Seconds — CLI install: 7
- Seconds — working copy: 0
- Seconds — start (migrations included): 106
- Seconds — build: not run
- Seconds — browser install: not run
- Seconds — tests: not run
- Migrations: not confirmed; backend failure
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail])
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
not written

## Migration/start failure
Last migration line: Applying migration 20261020041607_c88f99d5-b2cd-495f-93c1-8c9de328a1db.sql...
```text
Applying migration 20261019063500_1bb93282-5a6f-4557-b00b-781967b410c6.sql...
Applying migration 20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql...
Applying migration 20261019084720_0bad8634-24d0-4c7c-bd3e-f2f736dab99d.sql...
Applying migration 20261019103558_df2b6472-8b61-4c4b-a074-94b1e69e3724.sql...
Applying migration 20261019103756_2bd8e360-a732-41b7-a610-c6daf13d917a.sql...
Applying migration 20261019115742_844b64b2-424a-47fe-97d5-5523663fdba3.sql...
Applying migration 20261019115951_9e3ecfc4-409a-4c68-ae90-9b85964f5e91.sql...
Applying migration 20261019140533_709c3922-984d-4e4d-a62a-a89543f08e83.sql...
Applying migration 20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql...
Applying migration 20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql...
Applying migration 20261019223222_b947bfda-3636-493b-b9b5-8a0225eb0f21.sql...
Applying migration 20261019224505_a93ea697-cdf9-4d5a-b3b9-e1e65e0549f6.sql...
Applying migration 20261019232513_2240482e-4359-4f8d-b926-24411bd13096.sql...
Applying migration 20261020041607_c88f99d5-b2cd-495f-93c1-8c9de328a1db.sql...
Starting containers...
Waiting for health checks...
Started supabase local development setup.

╭──────────────────────────────────╮
│ 🔧 Development Tools             │
├─────────┬────────────────────────┤
│ Mailpit │ http://127.0.0.1:54324 │
╰─────────┴────────────────────────╯

╭─────────────────────────────────────────────────╮
│ 🌐 APIs                                         │
├─────────────┬───────────────────────────────────┤
│ Project URL │ http://127.0.0.1:54321            │
│ REST        │ http://127.0.0.1:54321/rest/v1    │
│ GraphQL     │ http://127.0.0.1:54321/graphql/v1 │
╰─────────────┴───────────────────────────────────╯

╭───────────────────────────────────────────────────────────────╮
│ ⛁ Database                                                    │
├─────┬─────────────────────────────────────────────────────────┤
│ URL │ postgresql://postgres:postgres@127.0.0.1:54322/postgres │
╰─────┴─────────────────────────────────────────────────────────╯

╭──────────────────────────────────────────────────────────────╮
│ 🔑 Authentication Keys                                       │
├─────────────┬────────────────────────────────────────────────┤
│ Publishable │ [masked key] │
│ Secret      │ [masked key]      │
╰─────────────┴────────────────────────────────────────────────╯

╭───────────────────────────────────────────────────────────────────────────────╮
│ 📦 Storage (S3)                                                               │
├────────────┬──────────────────────────────────────────────────────────────────┤
│ URL        │ http://127.0.0.1:54321/storage/v1/s3                             │
│ Access Key │ 625729a08b95bf1b7ff351a663f3a23c                                 │
│ Secret Key │ 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907 │
│ Region     │ local                                                            │
╰────────────┴──────────────────────────────────────────────────────────────────╯
Local dev security notice
All services bind to 0.0.0.0 (network-accessible, not just localhost)
API keys and JWT secrets are shared defaults. Do not use in production
Studio, pgMeta (/pg/*), and analytics have no authentication

A new version of Supabase CLI is available: v2.121.0 (currently installed v2.120.0)
We recommend updating regularly for new features and bug fixes: https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli
```
- Smoke: 0 passed · 0 failed · 0 flaky · 0 skipped · total 0
- Job conclusion before evidence publication: failure
- Backend/build/smoke: failure/skipped/skipped

## Failing/flaky tests and setup errors
- No JSON results; smoke skipped

DEC-209: compare with staging CI on this same commit; two consecutive dev proofs required. No automatic proceed verdict.

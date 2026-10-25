# Vendor exit notes (DEC-250)

The vendor-seams freeze (scripts/conformance/vendor-seams.test.ts, VS-1…3) holds every direct
vendor reach in scripts/conformance/vendor-seams-allowlist.txt until INC-877. This file is the
exit note each Lovable line names: what the tie does, what replaces it off Lovable, and the work
it takes. The Supabase concerns follow.

## build-wrapper

`vite.config.ts` imports `@lovable.dev/vite-tanstack-config`, the platform's build wrapper around
the TanStack Start + Vite config. Off Lovable it is replaced by a plain TanStack Start + nitro
config in the project's own hand. Work: small — the wrapper's options are few and declared in one
file.

## preview-auth-storage

`src/integrations/supabase/previewAuthStorage.ts` brokers the auth session to the editor over
`postMessage` on Lovable preview hosts only (`lovableproject.com`, `lovable.app`, …). Off Lovable
there is no editor surface: the module is removed and the client falls back to plain localStorage.
Work: small — one deletion and its two call sites.

## error-reporting

`src/lib/lovable-error-reporting.ts` forwards runtime errors to the editor's telemetry hooks
(`window.__lovableEvents`, `window.__lovableReportRuntimeError`); off Lovable both are absent and
the module is a no-op. Replaced by the project's own error capture. `src/routes/__root.tsx` holds
the one call site. Work: small — one module and one import.

## platform-references

The three Supabase seam modules (`client.ts`, `client.server.ts`, `auth-middleware.ts`) carry the
string "Connect Supabase in Lovable Cloud" in their missing-env error messages. Off Lovable the
message names the operator's own environment setup. Work: trivial — message text only.

## ci-tooling

`scripts/e2e-failure-report.ts` recognises the platform's auto-push commit subjects ("Lovable
update", "Work in progress") when it attributes a CI failure. Off Lovable the platform-origin
label is retired with the platform. Work: trivial — one list and one report line.

## platform-header

The AGENTS.md LOVABLE block is the platform's own header, not project code; it leaves with the
platform. (Not a census finding — noted here for completeness.)

## hosting

Hosting and Publish run on Cloudflare Workers; off Lovable the project deploys the same build
through the operator's own Cloudflare account. Work: medium — account, secrets and the deploy
pipeline, no code change.

## Supabase concerns

One note per concern; the freeze's 61 Supabase lines are all uses of these, through or beside the
seams.

- **Postgres** — the database. `pg_dump` takes the data; the migrations under supabase/migrations
  are the schema. Work: medium — replay migrations, restore, re-point the clients.
- **Auth** — GoTrue. The GoTrue export takes the users; the user ids stay, so every foreign key
  survives. Work: medium — export, import, re-issue sessions.
- **Storage** — the photo buckets. An S3 sync takes the objects; the storage keys are unchanged, so
  every photo row keeps pointing at its object. Work: medium — sync, re-point the storage seam.
- **pg_cron** — the scheduled jobs (the AI-audit purge, the heartbeat). Any Postgres with pg_cron
  runs them unchanged; otherwise an external scheduler calls the same functions. Work: small.

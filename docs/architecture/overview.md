# Architecture Overview

This document maps the current repository for both AI agents and human readers.
It reflects the real files present today; folders marked "(planned)" do not yet
exist and will be created when a task requires them.

## Stack

- **TanStack Start** (server-rendered React) with Vite bundler.
- **Tailwind CSS** for styling.
- **Supabase** (external project `ethio-prod`, org `ethio`) for Postgres,
  Auth, Storage, RLS, and Edge Functions. Schema truth lives in
  `/supabase/migrations` (append-only).

## Repository layout

- `/src/routes` — TanStack Start file-based routes (pages). Public routes at
  the top level; authenticated routes under `_authenticated/`.
- `/src/components` — shared UI primitives reused across features.
- `/src/features` (planned) — one folder per feature module. Each will contain
  `components/`, `hooks/`, `<name>-service.ts`, and `types.ts`. Empty today.
- `/src/lib` — pure utilities only (currency, date, geo formatters, etc.).
  Single source of truth per concern.
- `/src/i18n` (planned) — translation infrastructure. `locales/` will hold one
  lazy-loaded file per language (English + Amharic ship together for every
  new key).
- `/src/integrations/supabase` — Supabase clients.
  - `client.ts` — browser client, uses the publishable key only.
  - `client.server.ts` — server-only client; the service-role key is confined
    to this file and never reaches the browser bundle.
  - `auth-middleware.ts` — server-function auth middleware.
- `/supabase/migrations` — the sole source of schema truth. Migrations are
  append-only; corrections ship as new migrations.
- `/docs` — this documentation tree (governance, architecture, conventions,
  tracking, features, decisions, spec, changelog, registry).

## Boundaries

- The **publishable** Supabase key may appear in the browser bundle. The
  **service-role** key must never leave `client.server.ts` or a server
  function that imports it.
- The server (RLS + `has_permission`) is the only authorization authority.
  Client-side hiding is convenience, not enforcement.

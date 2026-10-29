# Conventions

## Naming

- **Files:** kebab-case (e.g. `product-card.tsx`, `use-listing.ts`).
- **Components:** PascalCase exports, one component per file.
- **Hooks:** `use-*` prefix (e.g. `use-current-user.ts`).
- **Services:** `<name>-service.ts` (e.g. `listing-service.ts`).

## Structure

- **Feature code** lives in `/src/features/<name>/` and is organized as:
  - `components/` — feature-specific components
  - `hooks/` — feature-specific hooks
  - `<name>-service.ts` — data access / business logic for the feature
  - `types.ts` — feature-specific TypeScript types
- **Shared UI primitives** live in `/src/components/`. Never copy a component
  to make a variant — extend via props.
- **Formatters and pure utilities** live ONLY in `/src/lib/`. Currency, date,
  and location formatting each have exactly one implementation there.
- **Translations** live in `/src/i18n/locales/`, one file per language, lazy
  loaded. Every new key ships with English AND Amharic values in the same
  change.

## File size

- Split any component file that exceeds ~300 lines.
- One component per file, always.

## Reuse

Before creating any new component, hook, utility, translation key, or table,
search for an existing one and use or extend it.

## Migration proofs

- A proof of a statement that spans a whole table (a prune, a sweep, a backfill) runs a service-only core that takes an optional id scope (`<name>_core(p_only uuid[])`), called with the proof's own scratch ids; only the live wrapper (`<name>()` → core(NULL)) spans real rows, and the proof never calls it (INC-980; house form since N1b-1 M5, `job_runs_prune_core`).
- A function call and the check of its effect are never in one SQL expression: call, then read back in a separate statement (N1b-1 M3).
- A test never writes a secret-shaped literal; it makes its fake secret at run time (`randomBytes(32).toString("hex")`, INC-983).

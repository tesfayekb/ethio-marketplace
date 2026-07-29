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

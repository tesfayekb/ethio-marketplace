# Migration Rules

1. Every table ships with RLS ENABLED + explicit per-operation policies + explicit GRANTs in the SAME migration (CI-enforced by scripts/check-migrations.sh).
2. Append-only: never edit, rename, or delete an existing migration; corrections are new migrations. Additive-first: destructive changes require an explicit task instruction with operator approval.
3. Personal-data tables include home_country_code. Timestamps: timestamptz (UTC). Money: integer minor units or numeric, never floats.
4. Application: Lovable's Supabase integration writes AND applies each migration to ethio-prod in the same action. A migration is not DONE until read-back query evidence (table, RLS flag, policies, seeds) is produced from the live database. Committed-but-unapplied is a named deferral, never a silent pass.
5. Seeds in migrations: reference data only (e.g., countries). User/personal data is never seeded.
6. Environment note (standing): ethio-prod currently doubles as the development database pre-launch. A separate dev/preview database is a NAMED LAUNCH-GATE item before real users exist.
7. Generated artifacts (src/integrations/supabase/types.ts) refresh after schema changes; they are never hand-edited (Knowledge E5).

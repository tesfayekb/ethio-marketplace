#!/usr/bin/env bash
# DEC-343 — THE TEMPORARY BACKEND'S WORKING COPY, ONE PREPARATION FOR CI AND THE OPERATOR'S COMPUTER.
# Usage (from the repository root): bash scripts/ci/prepare-local-backend.sh <workdir> <notes-file>
# Writes <workdir>/supabase/migrations (every repository migration, the bucket seed, the named patches
# and the hosted-platform and account fixtures) and <workdir>/supabase/config.toml, and lists each
# skip, patch and fixture in <notes-file>. Called by local-backend-proof.yml's "Prepare temporary
# working copy" step and by scripts/db-proof.sh; no network, no Docker, no environment written.
# Portable to BSD sed and to a system without coreutils' sha256sum (macOS); the copy is the same bytes.
set -eo pipefail
if [ "$#" -ne 2 ] || [ ! -f scripts/ci/local-backend-config.toml ]; then
  echo "usage (from the repository root): prepare-local-backend.sh <workdir> <notes-file>" >&2
  exit 2
fi
root=$1
notes=$2
command -v sha256sum > /dev/null || sha256sum() { shasum -a 256 "$@"; }
mkdir -p "$root/supabase/migrations"
cp supabase/migrations/*.sql "$root/supabase/migrations/"
cat > "$root/supabase/migrations/00000000000000_ci_local_buckets.sql" <<'SQL'
-- Census c1/c2: buckets are operator-created on hosted staging.
-- D1 M7 (INC-939): the seed carries the operator-set limits too, so the
-- migration's read-back proof judges the same law on every backend.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('category-assets', 'category-assets', true, 10485760, '{image/png,image/webp}'::text[]),
       ('listing-photos', 'listing-photos', false, 1048576, '{image/jpeg,image/png,image/webp}'::text[])
ON CONFLICT DO NOTHING;
SQL
# D228 turn 14b: the working copy's named fixes (DEC-209: in the proof's working copy, never in a landed migration).
wc="$root/supabase/migrations"
: > "$notes"
# (1) Never applied on hosted (INC-266): its own proof asserted 'update'; 20260922121913 restates it.
rm "$wc/20260922120000_a4e1c9d2-7b5f-4c86-9a30-6d2f81ce4b77.sql"
echo "- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it" >> "$notes"
patch_copy() {
  before=$(sha256sum "$wc/$1" | cut -c1-12)
  sed -i.orig "$2" "$wc/$1"
  rm "$wc/$1.orig"
  after=$(sha256sum "$wc/$1" | cut -c1-12)
  if [ "$before" = "$after" ]; then echo "::error::working-copy patch changed nothing: $1"; exit 1; fi
  echo "- patched ${1%%_*} ($before -> $after): $3" >> "$notes"
}
# (2) A privilege check by NAME over pg_class is evaluated before its namespace filter on a small catalogue ("relation public.buckets does not exist"); the table's oid names the same table.
patch_copy 20260830091427_f1d6873d-acd2-480f-89c3-36f0f786c0a3.sql "s/format('public.%I', c.relname)/c.oid/g" "the service_role proof checks each table by oid"
patch_copy 20260830091455_14223614-1c76-4cad-97f2-f455e485cbc3.sql "s/format('public.%I', c.relname)/c.oid/g" "the service_role census checks each table by oid"
# (3) PROOF 5 measured the real catalogue's answer size on hosted (at most 8 rows and 2,048 bytes); the migrations' own catalogue answers 2,111 bytes.
patch_copy 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql "s/RAISE EXCEPTION 'PROOF 5 failed'/RAISE WARNING 'PROOF 5 (the real catalogue size, proven on hosted): % bytes', v_bytes/" "PROOF 5 reports the size instead of refusing"
# (3b) INC-1028, DEC-316: CL-3's ahead check judged v_now + 61 against job_run_claim's own later clock; a second's tick left it 60 s ahead, inside the window ('refused:replay'). It reads the clock just before the call.
patch_copy 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql "s/job_run_claim('name-check-catchup', v_now + 61)/job_run_claim('name-check-catchup', floor(extract(epoch FROM clock_timestamp()))::bigint + 62)/" "CL-3's ahead check reads the clock just before the call (INC-1028, DEC-316)"
fixture() {
  echo "- fixture $1: $2" >> "$notes"
}
# (4) What a hosted project has before its first migration.
cat > "$wc/00000000000001_ci_local_hosted_platform.sql" <<'SQL'
-- D228 turn 14b: what a hosted project has before its first migration.
-- (a) Public objects are born without grants to the browser roles: 20260810075629's P5 ("home_country_code update was permitted") passed on hosted only because authenticated held no table-wide UPDATE on profiles.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
-- (c) INC-846: the hosted default ACL for role postgres's functions is postgres=X/postgres alone (ci-local-backend.md B3); the local image grants anon, authenticated and service_role at birth, so every function created before 20261007222234 with only a REVOKE FROM PUBLIC stayed open to anon here — the nine of run 40008732750's artifact.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated, service_role;
-- (b) The platform's row-level-security event trigger, read from ethio-prod (census rows j and k).
CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;
CREATE EVENT TRIGGER ensure_rls ON ddl_command_end WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO') EXECUTE FUNCTION public.rls_auto_enable();
SQL
fixture 00000000000001 "hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)"
# (5) The accounts hosted had when the bootstrap and the early proofs ran: the bootstrap account (read from its landed migrations, never printed) and three plain ones. No password; never signed in.
cat > "$wc/20260809010129_ci_local_accounts.sql" <<'SQL'
-- D228 turn 14b: accounts for 20260809010130 (bootstrap), 20260809103904 (a base user), 20260817061418 (one more profile) and 20260917210349 / 20260917210459 (the super admin by id).
INSERT INTO auth.users (instance_id, id, aud, role, email, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES ('00000000-0000-0000-0000-000000000000', '__BOOTSTRAP_ID__', 'authenticated', 'authenticated', '__BOOTSTRAP_EMAIL__', now(), now(), '{}'::jsonb, '{}'::jsonb);
INSERT INTO auth.users (instance_id, id, aud, role, email, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
SELECT '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', e, now(), now(), '{}'::jsonb, '{}'::jsonb
FROM unnest(ARRAY['ci-local-1@example.invalid', 'ci-local-2@example.invalid', 'ci-local-3@example.invalid']) AS e;
-- INC-808: the auth server writes '' (never NULL) in the text columns it reads back as strings, and its admin list of users fails on a NULL there; each column only if this backend's auth schema has it.
DO $$
DECLARE c text;
BEGIN
  FOREACH c IN ARRAY ARRAY['confirmation_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'email_change', 'phone_change', 'phone_change_token', 'reauthentication_token'] LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = c) THEN
      EXECUTE format('UPDATE auth.users SET %I = %L WHERE %I IS NULL', c, '', c);
    END IF;
  END LOOP;
END $$;
SQL
bootstrap_email=$(grep -o "auth.users WHERE email = '[^']*'" supabase/migrations/20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql | head -1 | sed "s/.*= '//; s/'\$//")
bootstrap_id=$(grep -o "v_uid   uuid := '[0-9a-f-]*'" supabase/migrations/20260917210349_c23b6c76-b29b-4cfe-b559-0d4abc728a9f.sql | head -1 | sed "s/.*:= '//; s/'\$//")
if [ -z "$bootstrap_email" ] || [ -z "$bootstrap_id" ]; then echo "::error::the bootstrap account was not found in its landed migrations"; exit 1; fi
sed -i.orig "s/__BOOTSTRAP_EMAIL__/$bootstrap_email/; s/__BOOTSTRAP_ID__/$bootstrap_id/" "$wc/20260809010129_ci_local_accounts.sql"
rm "$wc/20260809010129_ci_local_accounts.sql.orig"
fixture 20260809010129 "four accounts: the bootstrap account by its landed e-mail and id, and three plain ones (ci-local-N@example.invalid); the auth server's text columns '' (INC-808)"
# (6) The open countries' currencies (set on hosted through the admin): 20260917112956's P5b defaults ET's.
cat > "$wc/20260917112955_ci_local_country_currencies.sql" <<'SQL'
-- D228 turn 14b: 20260917112956's P5b reads ET's currency ("refusals: price_currency required" without it).
UPDATE public.countries c SET currency_code = v.cur
FROM (VALUES ('ET', 'ETB'), ('US', 'USD'), ('GB', 'GBP'), ('DE', 'EUR'), ('KE', 'KES'), ('CA', 'CAD')) AS v(code, cur)
WHERE c.code = v.code AND c.currency_code IS NULL;
SQL
fixture 20260917112955 "the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets"
# (7) The catalogue's 'voltage' definition (imported on hosted): 20260921092130's proofs round-trip it.
cat > "$wc/20260921092129_ci_local_voltage.sql" <<'SQL'
-- D228 turn 14b: 20260921092130's proofs read the 'voltage' definition ("PROOF setup: voltage definition absent" without it).
INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
VALUES ('voltage', 'Voltage', 'single_select',
        '[{"value":"220v","label_en":"220 V"},{"value":"110v","label_en":"110 V"},{"value":"380v_three_phase","label_en":"380 V three-phase"}]'::jsonb);
SQL
fixture 20260921092129 "a 'voltage' definition with the three digit-led values the proof names"
# (8) A home country for the plain accounts: 20260927045940's proof borrows the oldest active account with one.
cat > "$wc/20260927045939_ci_local_residency.sql" <<'SQL'
-- D228 turn 14b: 20260927045940's proof needs an active account with a home country ("no active seller" without it).
UPDATE public.user_directory d SET home_country_code = 'ET', country_source = 'user_confirmed'
  FROM auth.users u WHERE u.id = d.user_id AND u.email LIKE 'ci-local-%@example.invalid';
UPDATE public.profiles p SET home_country_code = 'ET', country_source = 'user_confirmed'
  FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'ci-local-%@example.invalid';
SQL
fixture 20260927045939 "home country ET for the three plain accounts"
# (9) One active sub-city (hosted's came from the places import): 20260929201601's proof needs one.
cat > "$wc/20260929201600_ci_local_sub_city.sql" <<'SQL'
-- D228 turn 14b: 20260929201601's proof needs an active sub-city ("PROOF setup failed: places" without it).
INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, region_id, city_id, center_lat, center_lng)
SELECT c.id, 'sub_city', c.country_code, 'Bole', 'bole', true, c.region_id, c.id, 8.9906, 38.7893
  FROM public.locations c WHERE c.level = 'city' AND c.slug = 'addis-ababa';
SQL
fixture 20260929201600 "the sub-city Bole under Addis Ababa"
# DEC-309: the config is one file, read here and by the backend-images job (its hash is in the images' cache key).
cp scripts/ci/local-backend-config.toml "$root/supabase/config.toml"

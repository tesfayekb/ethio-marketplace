-- (no e2e-areas line: the dropped indexes only duplicate the kept ones; no behaviour changes, so every spec area is selected)

-- Cursor bundle 7a, Part 3, file D of five — ONE INDEX PER NEED (INC-1294; brief docs/governance/briefs/cursor-bundle-7a.md,
-- ruling docs/governance/briefs/cursor-bundle-7a-ruling-1.md decision 8). Three indexes only cost every write:
--   profiles_alias_unique            — the same unique index on lower(seller_alias) as profiles_seller_alias_lower_key (kept: the
--                                      one a document names; the alias doors catch the violation by SQLSTATE 23505, not by name);
--   idx_ctp_child                    — the same index on child_id as category_tree_pointers_child_idx (kept);
--   category_tree_pointers_parent_idx — on (parent_id), a prefix of idx_ctp_parent (parent_id, display_order), which serves every
--                                      lookup by parent_id (the advisor's duplicate_index names the first two; the third is the
--                                      same class).
-- Census (supabase/, src/, e2e/, scripts/ at this file's base): no file reads any of the three names but the migrations that
-- create them; none backs a constraint (proof (a) reads pg_constraint). This file drops three indexes and writes nothing else.
-- Proofs on scratch rows under a sentinel rollback: the catalogue, the unique rule still enforced by the index kept, and the
-- plan of a lookup of category_tree_pointers by parent_id. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_name text;
  v_def  text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125170200') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D: the mark 20261125170200 (file C) must be applied first';
  END IF;
  FOREACH v_name IN ARRAY ARRAY['profiles_alias_unique', 'profiles_seller_alias_lower_key', 'idx_ctp_child',
                                'category_tree_pointers_child_idx', 'category_tree_pointers_parent_idx', 'idx_ctp_parent'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = v_name) THEN
      RAISE EXCEPTION 'cursor-bundle-7a file D: the index % is not there', v_name;
    END IF;
  END LOOP;
  -- each pair is the same index under two names (the name apart)
  IF (SELECT replace(indexdef, 'profiles_alias_unique', 'X') FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'profiles_alias_unique')
     IS DISTINCT FROM
     (SELECT replace(indexdef, 'profiles_seller_alias_lower_key', 'X') FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'profiles_seller_alias_lower_key')
     OR (SELECT replace(indexdef, 'idx_ctp_child', 'X') FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'idx_ctp_child')
     IS DISTINCT FROM
     (SELECT replace(indexdef, 'category_tree_pointers_child_idx', 'X') FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'category_tree_pointers_child_idx') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D: a pair of indexes is not the same index under two names';
  END IF;
  -- the parent index is a prefix of idx_ctp_parent
  SELECT indexdef INTO v_def FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'category_tree_pointers_parent_idx';
  IF v_def !~ '\(parent_id\)$'
     OR (SELECT indexdef FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'idx_ctp_parent') !~ '\(parent_id, display_order\)$' THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D: category_tree_pointers_parent_idx is not a prefix of idx_ctp_parent (%)', v_def;
  END IF;
  -- none of the three backs a constraint
  IF EXISTS (SELECT 1 FROM pg_constraint c JOIN pg_class i ON i.oid = c.conindid
              WHERE i.relname IN ('profiles_alias_unique', 'idx_ctp_child', 'category_tree_pointers_parent_idx')) THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D: one of the three indexes backs a constraint';
  END IF;
END $pre$;

-- ------------------------------------------------------------ the three drops
DROP INDEX IF EXISTS public.profiles_alias_unique;
DROP INDEX IF EXISTS public.idx_ctp_child;
DROP INDEX IF EXISTS public.category_tree_pointers_parent_idx;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the catalogue: the three are gone, the three kept stand;
--   (b) the unique rule on lower(seller_alias) is still enforced, by the index kept: a second scratch profile taking the
--       first's alias in another case is refused with 23505 naming profiles_seller_alias_lower_key;
--   (c) a lookup of category_tree_pointers by parent_id plans on an index (the unique index's leading column), and in display
--       order on idx_ctp_parent.
DO $proof$
DECLARE
  v_hex   text := replace(gen_random_uuid()::text, '-', '');
  v_tag   text;
  v_a     uuid := gen_random_uuid();
  v_b     uuid := gen_random_uuid();
  v_st    text;
  v_con   text;
  v_plan  text := '';
  v_text  text;
  v_msg   text;
BEGIN
  -- (a)
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public'
              AND indexname IN ('profiles_alias_unique', 'idx_ctp_child', 'category_tree_pointers_parent_idx')) THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D proof (a): a dropped index still stands';
  END IF;
  IF (SELECT count(*) FROM pg_indexes WHERE schemaname = 'public'
       AND indexname IN ('profiles_seller_alias_lower_key', 'category_tree_pointers_child_idx', 'idx_ctp_parent')) <> 3 THEN
    RAISE EXCEPTION 'cursor-bundle-7a file D proof (a): a kept index is missing';
  END IF;

  v_tag := 'e2e-mig-b7ad-' || substr(v_hex, 1, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- (b) e2e-mig- scratch profiles only: the second takes the first's alias in another case
    UPDATE public.profiles SET seller_alias = 'B7a Scratch ' || substr(v_hex, 1, 6) WHERE user_id = v_a;
    BEGIN
      -- e2e-mig- scratch profile (v_b's)
      UPDATE public.profiles SET seller_alias = 'b7a scratch ' || substr(v_hex, 1, 6) WHERE user_id = v_b;
      RAISE EXCEPTION 'cursor-bundle-7a file D proof (b): a second profile took the first''s alias';
    EXCEPTION WHEN unique_violation THEN
      GET STACKED DIAGNOSTICS v_con = CONSTRAINT_NAME;
      GET STACKED DIAGNOSTICS v_st = RETURNED_SQLSTATE;
      IF v_st <> '23505' OR v_con IS DISTINCT FROM 'profiles_seller_alias_lower_key' THEN
        RAISE EXCEPTION 'cursor-bundle-7a file D proof (b): the refusal was % on % (not 23505 on profiles_seller_alias_lower_key)', v_st, v_con;
      END IF;
    END;

    -- (c) the plans (an index scan wanted whatever the table's size: the scratch has no rows to count). A lookup by parent_id
    -- is served by the leading column of the unique index category_tree_pointers_unique (an index-only scan); the same
    -- lookup in display order is served by idx_ctp_parent.
    SET LOCAL enable_seqscan = off;
    FOR v_text IN EXECUTE format('EXPLAIN (COSTS OFF) SELECT child_id FROM public.category_tree_pointers WHERE parent_id = %L',
                                 gen_random_uuid()) LOOP
      v_plan := v_plan || E'\n' || v_text;
    END LOOP;
    IF v_plan !~ 'Index' OR v_plan ~ 'Seq Scan' OR v_plan ~ 'category_tree_pointers_parent_idx' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file D proof (c): the lookup by parent_id is not an index scan: %', v_plan;
    END IF;
    v_plan := '';
    FOR v_text IN EXECUTE format('EXPLAIN (COSTS OFF) SELECT child_id FROM public.category_tree_pointers WHERE parent_id = %L ORDER BY display_order',
                                 gen_random_uuid()) LOOP
      v_plan := v_plan || E'\n' || v_text;
    END LOOP;
    IF v_plan !~ 'idx_ctp_parent' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file D proof (c): the ordered lookup by parent_id does not use idx_ctp_parent: %', v_plan;
    END IF;

    RAISE EXCEPTION 'b7a-d-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b7a-d-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261125170300') ON CONFLICT DO NOTHING;

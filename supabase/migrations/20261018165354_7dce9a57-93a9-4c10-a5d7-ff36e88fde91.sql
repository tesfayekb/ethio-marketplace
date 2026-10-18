-- Bundle 20 turn 2, part 3 of 3 (2026-10-18). Tier A. DEC-198, DEC-202 - THE v4 RESERVED NAMES (the Amharic short forms, the exact-only words, the rebuild and the proofs of the whole end state).
-- e2e-areas: posting, admin-users
-- The curator's reserved-names-v4.csv (762 organisations, audited 2026-10-18; saved as docs/data/reserved-names-v4.csv)
-- as its own seed, in 3 tool-sized parts (DEC-189), each gated on the one before. ADDITIVE ONLY: the 435 v3 rows are
-- the file's first 435, unchanged, and are never rewritten; the 327 new rows take ids 436-762 in file order, each with
-- its country's ISO code or marked international (DEC-202); a handle is added only when no row holds its fold yet (the
-- first row in the file keeps a shared fold - v3's rule). Nothing is updated or deleted; a re-run changes nothing.
-- No rule changes (turn 1 changed them). Applied on ethio-prod by the executor's migration tool on save; the operator
-- applies the saved file on ethio-staging and reads back the mark 20261019080000.

DO $gate$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019070000') THEN
    RAISE EXCEPTION 'B20S3: part 2 (20261019070000) has not landed';
  END IF;
END $gate$;

-- The Amharic short forms (handles_am) of 34 organisations; the first row in the file keeps a shared fold.
INSERT INTO public.protected_handles_am (handle_am_fold, name_id, handle_am)
SELECT DISTINCT ON (x.f) x.f, x.id, x.h
  FROM (SELECT v.id, v.h, v.o, public.name_fold_am(v.h) AS f FROM (VALUES (1, E'\u1295\u130D\u12F5 \u1263\u1295\u12AD', 1), (1, E'\u1232\u1262\u12A2', 2), (2, E'\u120D\u121B\u1275 \u1263\u1295\u12AD', 1), (33, E'\u1218\u12F5\u1295 \u12F5\u122D\u1305\u1275', 1), (93, E'\u1218\u1265\u122B\u1275 \u1283\u12ED\u120D', 1), (104, E'\u1265\u1214\u122B\u12CA \u1263\u1295\u12AD', 1), (121, E'\u1275\u121D\u1205\u122D\u1275 \u121A\u1292\u1235\u1274\u122D', 1), (134, E'\u12A2\u1295\u1233', 1), (136, E'\u134C\u12F0\u122B\u120D \u1356\u120A\u1235', 1), (147, E'\u12A2\u1272\u126A', 1), (153, E'\u12A2\u1230\u1218\u12AE', 1), (166, E'\u12A2\u12DC\u12A0', 1), (170, E'\u1265\u1214\u122B\u12CA \u120E\u1270\u122A', 1), (618, E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u1218\u1295\u130D\u1225\u1273\u1275', 1), (635, E'\u12E9\u1294\u1235\u12AE', 1), (637, E'\u12E9\u1292\u1234\u134D', 1), (659, E'\u12E8\u12A0\u121C\u122A\u12AB \u12A4\u121D\u1263\u1232', 1), (660, E'\u12E8\u12A5\u1295\u130D\u120A\u12DD \u12A4\u121D\u1263\u1232', 1), (660, E'\u12E8\u1265\u122A\u1273\u1295\u12EB \u12A4\u121D\u1263\u1232', 2), (661, E'\u12E8\u12AB\u1293\u12F3 \u12A4\u121D\u1263\u1232', 1), (662, E'\u12E8\u1300\u122D\u1218\u1295 \u12A4\u121D\u1263\u1232', 1), (663, E'\u12E8\u1323\u120A\u12EB\u1295 \u12A4\u121D\u1263\u1232', 1), (664, E'\u12E8\u1348\u1228\u1295\u1233\u12ED \u12A4\u121D\u1263\u1232', 1), (665, E'\u12E8\u1294\u12D8\u122D\u120B\u1295\u12F5\u1235 \u12A4\u121D\u1263\u1232', 1), (665, E'\u12E8\u1206\u120B\u1295\u12F5 \u12A4\u121D\u1263\u1232', 2), (666, E'\u12E8\u1235\u12CA\u12F5\u1295 \u12A4\u121D\u1263\u1232', 1), (667, E'\u12E8\u1296\u122D\u12CC\u12ED \u12A4\u121D\u1263\u1232', 1), (668, E'\u12E8\u1264\u120D\u1302\u12E8\u121D \u12A4\u121D\u1263\u1232', 1), (669, E'\u12E8\u12F4\u1295\u121B\u122D\u12AD \u12A4\u121D\u1263\u1232', 1), (670, E'\u12E8\u12A5\u1235\u122B\u12A4\u120D \u12A4\u121D\u1263\u1232', 1), (671, E'\u12E8\u1233\u12D1\u12F2 \u12D3\u1228\u1262\u12EB \u12A4\u121D\u1263\u1232', 1), (671, E'\u12E8\u1233\u12D1\u12F2 \u12A4\u121D\u1263\u1232', 2), (672, E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u12D3\u1228\u1265 \u12A4\u121D\u122C\u1276\u127D \u12A4\u121D\u1263\u1232', 1), (673, E'\u12E8\u12A9\u12CC\u1275 \u12A4\u121D\u1263\u1232', 1), (674, E'\u12E8\u12B3\u1273\u122D \u12A4\u121D\u1263\u1232', 1), (675, E'\u12E8\u12F0\u1261\u1265 \u12A0\u134D\u122A\u12AB \u12A4\u121D\u1263\u1232', 1), (679, E'\u12F2\u126A \u120E\u1270\u122A', 1), (695, E'\u12E8\u1218\u1295\u130D\u1225\u1275 \u130D\u12E5\u1293 \u1295\u1265\u1228\u1275 \u12A0\u1235\u1270\u12F3\u12F0\u122D \u12A4\u1300\u1295\u1232', 1), (695, E'\u12E8\u1218\u1295\u130D\u1225\u1275 \u130D\u12E5 \u12A4\u1300\u1295\u1232', 2)) AS v(id, h, o)) x
 WHERE x.f <> ''
 ORDER BY x.f, x.id, x.o
ON CONFLICT (handle_am_fold) DO NOTHING;
-- The exact-only cells of the file that the table lacks.
INSERT INTO public.exact_only_words (word)
SELECT w FROM unnest(ARRAY['absher', 'bankid', 'fuliza', 'ideal', 'interac', 'kale_heywet', 'lewedaje', 'mekane_yesus', 'mukuru', 'polisen', 'politiet', 'swish']) AS w
ON CONFLICT (word) DO NOTHING;
SELECT public.name_folds_rebuild();

-- ===== P - the end state, proved against the file (G27: no rule is run against a real name - the door tests do that) =====
DO $proof$ BEGIN
  -- P1. The 762 organisations, ids 1-762, each field as the file, with its country code or international (DEC-202).
  IF (SELECT md5(string_agg(concat_ws('|', id, name_en, coalesce(name_am, ''), kind, country, coalesce(country_code, ''), international), E'\n' ORDER BY id))
        FROM public.protected_names) <> 'b4d01bfa91cb50b51e71c4cee3e5f9d3' THEN
    RAISE EXCEPTION 'B20S3 P1: protected_names is not the file''s 762 organisations';
  END IF;
  -- P2. The 2964 handle folds and their owners (first row in the file).
  IF (SELECT md5(string_agg(concat_ws('|', handle_fold, name_id, handle), E'\n' ORDER BY handle_fold COLLATE "C"))
        FROM public.protected_handles) <> '834a0a626db4d6175c4a461b1caca8db' THEN
    RAISE EXCEPTION 'B20S3 P2: protected_handles is not the file''s 2964 folds';
  END IF;
  -- P3. The 39 Amharic short forms.
  IF (SELECT md5(string_agg(concat_ws('|', handle_am_fold, name_id, handle_am), E'\n' ORDER BY handle_am_fold COLLATE "C"))
        FROM public.protected_handles_am) <> '3eda454b8d2ec6593848436d3ff4c08f' THEN
    RAISE EXCEPTION 'B20S3 P3: protected_handles_am is not the file''s 39 short forms';
  END IF;
  -- P4. Every exact-only cell of the file is an exact-only word.
  IF EXISTS (SELECT 1 FROM unnest(ARRAY['absher', 'alibaba', 'amerga', 'amole', 'awash', 'bankid', 'bolt', 'chapa', 'dashen', 'destta', 'ems', 'faiba', 'fayda', 'feres', 'fuliza', 'golis', 'hormuud', 'ideal', 'imo', 'interac', 'jiji', 'kacha', 'kale_heywet', 'lewedaje', 'mekane_yesus', 'messenger', 'meta', 'mukuru', 'outlook', 'polisen', 'politiet', 'proton', 'ria', 'ride', 'seregela', 'signal', 'siinqee', 'stripe', 'swish', 'threads', 'ups', 'visa', 'waafi', 'wegagen', 'wise']) w
              WHERE NOT EXISTS (SELECT 1 FROM public.exact_only_words e WHERE e.word = w)) THEN
    RAISE EXCEPTION 'B20S3 P4: an exact-only word of the file is missing';
  END IF;
  -- P5. The rules' folds were rebuilt from the new lists.
  IF (SELECT count(*) FROM public.name_folds WHERE kind = 'handle') <> 2964
     OR (SELECT count(*) FROM public.name_folds WHERE kind = 'handle_am') <> 39 THEN
    RAISE EXCEPTION 'B20S3 P5: the folds were not rebuilt from the new list';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261019080000') ON CONFLICT (version) DO NOTHING;

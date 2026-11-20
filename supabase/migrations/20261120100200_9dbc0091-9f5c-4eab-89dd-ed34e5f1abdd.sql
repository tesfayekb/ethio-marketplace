-- e2e-areas: admin-locations

-- Foundations 1, turn F1-7c, part 3 of 4 — admin_set_location_active's COMMENT RESTATED (F1-7b finding; brief
-- docs/governance/briefs/f1-doors-7c.md; ruling docs/governance/briefs/f1-doors-7c-ruling-1.md, decision 1).
-- The comment said the ancestry trigger's parentInactive "passes unchanged"; since F1-7b the trigger refuses by
-- door_refuse codes, which the door's shell answers {ok:false} and meters. The sentence is the function's COMMENT, not
-- its body: the comment alone is restated; the body is not redeclared (its live md5 is read, unchanged).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120120100') THEN
    RAISE EXCEPTION 'F1-7c part 3: part 2 (c4559f10) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_set_location_active(uuid,boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '80e42fb16ab528da01e3178ec495f666' THEN
    RAISE EXCEPTION 'F1-7c part 3: the live admin_set_location_active is not its last declaration''s body (%)', v_md5;
  END IF;
  IF replace(coalesce(obj_description('public.admin_set_location_active(uuid,boolean)'::regprocedure, 'pg_proc'), ''), chr(13), '')
       NOT LIKE '%the ancestry trigger''s parentInactive passes unchanged;%' THEN
    RAISE EXCEPTION 'F1-7c part 3: the live comment is not the one this file restates';
  END IF;
END $pre$;

COMMENT ON FUNCTION public.admin_set_location_active(uuid, boolean) IS
  'F1-4b on the door shell (DEC-333): activates or retires a place behind door_context(staff, locations:update, staff_config, the place''s country, match); refuses locationMissing; the ancestry trigger''s refusals (parentInactive among them) answer through the shell as codes, metered (F1-7b); audits location.activate / location.retire; answers {ok:true}.';

-- PROOF: the comment is the restated one and the body is unchanged.
DO $proof$
BEGIN
  IF replace(coalesce(obj_description('public.admin_set_location_active(uuid,boolean)'::regprocedure, 'pg_proc'), ''), chr(13), '')
       NOT LIKE '%the ancestry trigger''s refusals (parentInactive among them) answer through the shell as codes, metered (F1-7b);%'
     OR replace(obj_description('public.admin_set_location_active(uuid,boolean)'::regprocedure, 'pg_proc'), chr(13), '')
       LIKE '%passes unchanged%' THEN
    RAISE EXCEPTION 'F1-7c part 3 proof: the comment was not restated';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.admin_set_location_active(uuid,boolean)'::regprocedure)
       IS DISTINCT FROM '80e42fb16ab528da01e3178ec495f666' THEN
    RAISE EXCEPTION 'F1-7c part 3 proof: the body changed';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120120200') ON CONFLICT DO NOTHING;

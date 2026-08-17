-- U1f-3 rider: explicit deny-all policy on public.migration_marks.
-- The table is definer/service_role territory; RLS with zero policies already
-- denies every client role, but the project law is that every table ships an
-- explicit policy, so the refusal is stated rather than implied.
DROP POLICY IF EXISTS "migration_marks_no_client_access" ON public.migration_marks;
CREATE POLICY "migration_marks_no_client_access"
  ON public.migration_marks FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260817055438') ON CONFLICT DO NOTHING;
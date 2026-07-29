-- Intentionally BAD migration used only by scripts/check-migrations.sh self-test.
-- Do NOT apply. Missing: RLS enable, policy, grant.
CREATE TABLE public.bad_example (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note text
);

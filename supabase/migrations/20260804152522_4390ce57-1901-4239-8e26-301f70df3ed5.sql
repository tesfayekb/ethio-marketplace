-- P2-b Category system + attribute schema (REQ-017 three-concept model, REQ-020).
-- Mirrors the public.locations / public.countries reference-table posture exactly:
-- shared reference data, public read, NO write policy (admin writes via service role).
-- Names ship as name_en/name_am columns (no translations table exists yet) — same
-- basis as D-015.

-- a. CANONICAL NODE — one row per real category. A listing (later) FKs categories.id
-- and lives in EXACTLY ONE category (REQ-017 v1).
CREATE TABLE public.categories (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en       text NOT NULL,
  name_am       text,
  slug          text NOT NULL UNIQUE,
  price_enabled boolean NOT NULL DEFAULT true,          -- REQ-018: a category may disable price entirely
  expiry_days   integer NOT NULL DEFAULT 30 CHECK (expiry_days > 0), -- REQ-022 per-category auto-expiry default
  is_restricted boolean NOT NULL DEFAULT false,         -- REQ-009/010 screening seam; REQ-021 gateway fills at P2-d
  is_active     boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX categories_active_idx ON public.categories (is_active) WHERE is_active;
CREATE INDEX categories_slug_idx   ON public.categories (slug);

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- b. BROWSE TREE — pointers, not copies. One canonical category can appear under
-- multiple parents (bike parts under Auto AND Bicycles); one inventory, many paths,
-- so the split-inventory bug is impossible by construction.
CREATE TABLE public.category_tree_pointers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id     uuid REFERENCES public.categories(id),  -- NULL = top-level browse entry
  child_id      uuid NOT NULL REFERENCES public.categories(id),
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT category_tree_pointers_unique UNIQUE (parent_id, child_id),
  CONSTRAINT category_tree_pointers_no_self CHECK (child_id <> parent_id)
);

-- Cycle prevention beyond self-reference is carried by admin discipline; a recursive
-- cycle trigger is DEFERRED (no role holds writes on this table today).

CREATE INDEX category_tree_pointers_parent_idx ON public.category_tree_pointers (parent_id);
CREATE INDEX category_tree_pointers_child_idx  ON public.category_tree_pointers (child_id);

-- c. ATTRIBUTE BUILDER OUTPUT (REQ-020). The builder ADMIN UI lands with the admin
-- console; this phase seeds attributes via migration.
CREATE TABLE public.category_attributes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   uuid NOT NULL REFERENCES public.categories(id),
  name_en       text NOT NULL,
  name_am       text,
  attr_key      text NOT NULL,                          -- stable machine key, e.g. 'make'
  attr_type     text NOT NULL CHECK (attr_type IN ('text','number','single_select','multi_select','boolean')),
  options       jsonb,                                  -- [{value,label_en,label_am}] for select types; NULL otherwise
  is_required   boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT category_attributes_key_unique UNIQUE (category_id, attr_key),
  -- a select without choices, or a non-select carrying stray options, is rejected at write time
  CONSTRAINT category_attributes_options_shape CHECK (
    (attr_type IN ('single_select','multi_select')) = (options IS NOT NULL)
  )
);

CREATE INDEX category_attributes_category_idx ON public.category_attributes (category_id);

CREATE TRIGGER update_category_attributes_updated_at
  BEFORE UPDATE ON public.category_attributes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: read-only reference data, deny-by-default for writes on all three.
ALTER TABLE public.categories             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_tree_pointers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_attributes    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Pointer and attribute rows are meaningless without their category, which is itself
-- gated by categories_public_read — so they inherit visibility rather than duplicating
-- the active-only predicate (which would also require a join on every read).
CREATE POLICY "category_tree_pointers_public_read"
  ON public.category_tree_pointers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "category_attributes_public_read"
  ON public.category_attributes FOR SELECT
  TO anon, authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policy on any of the three: admin writes go through the
-- service role, which bypasses RLS. SELECT-only grants.
GRANT SELECT ON public.categories             TO anon, authenticated;
GRANT SELECT ON public.category_tree_pointers TO anon, authenticated;
GRANT SELECT ON public.category_attributes    TO anon, authenticated;
GRANT ALL    ON public.categories             TO service_role;
GRANT ALL    ON public.category_tree_pointers TO service_role;
GRANT ALL    ON public.category_attributes    TO service_role;

-- STEP 2 — starter seed: 12 real ethio.com top-level categories. PROVISIONAL; the
-- authoritative WooCommerce import (dedupe/repair, empty-depth collapsing) is a
-- separate later task per REQ-017. Excluded per rulings: prescription
-- pharmaceuticals (v1 exclusion), Jobs & Vacancies + Tenders (deferred to v2).
-- name_am filled only where the Amharic term is known; NULL rather than a guess.
INSERT INTO public.categories (name_en, name_am, slug, price_enabled, expiry_days, display_order)
VALUES
  ('Vehicles',              'ተሽከርካሪዎች',  'vehicles',              true, 30,  10),
  ('Real Estate',           'ንብረት',        'real-estate',           true, 60,  20),
  ('Electronics',           'ኤሌክትሮኒክስ',  'electronics',           true, 30,  30),
  ('Phones & Tablets',      'ስልኮች',        'phones-tablets',        true, 30,  40),
  ('Home & Furniture',      'የቤት ዕቃዎች',  'home-furniture',        true, 30,  50),
  ('Fashion & Clothing',    'ልብስ',          'fashion-clothing',      true, 30,  60),
  ('Health & Beauty',       'ጤናና ውበት',   'health-beauty',         true, 30,  70),
  ('Baby & Kids',           'ሕፃናት',        'baby-kids',             true, 30,  80),
  ('Sports & Hobbies',      'ስፖርት',        'sports-hobbies',        true, 30,  90),
  ('Pets & Animals',        'እንስሳት',       'pets-animals',          true, 30, 100),
  ('Business & Industrial', NULL,            'business-industrial',   true, 30, 110),
  ('Services',              'አገልግሎቶች',   'services',              false, 30, 120);

-- One top-level browse root per canonical category (parent_id NULL).
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
SELECT NULL, c.id, c.display_order FROM public.categories c;

-- One illustrative attribute set on Vehicles — enough to prove the schema end to end
-- and give listings something to validate against. Other categories' attributes come
-- with the real import / admin builder.
INSERT INTO public.category_attributes (category_id, name_en, name_am, attr_key, attr_type, options, is_required, display_order)
SELECT c.id, x.name_en, x.name_am, x.attr_key, x.attr_type, x.options, x.is_required, x.display_order
FROM public.categories c
CROSS JOIN (VALUES
  ('Make',         'ማምረቻ'::text, 'make',         'text',          NULL::jsonb, true,  10),
  ('Model',        NULL,           'model',        'text',          NULL,        true,  20),
  ('Year',         'ዓመት',        'year',         'number',        NULL,        false, 30),
  ('Transmission', NULL,           'transmission', 'single_select',
     '[{"value":"manual","label_en":"Manual","label_am":"ማንዋል"},{"value":"automatic","label_en":"Automatic","label_am":"አውቶማቲክ"}]'::jsonb,
     false, 40),
  ('Condition',    'ሁኔታ',        'condition',    'single_select',
     '[{"value":"new","label_en":"New","label_am":"አዲስ"},{"value":"used","label_en":"Used","label_am":"ያገለገለ"}]'::jsonb,
     true,  50)
) AS x(name_en, name_am, attr_key, attr_type, options, is_required, display_order)
WHERE c.slug = 'vehicles';
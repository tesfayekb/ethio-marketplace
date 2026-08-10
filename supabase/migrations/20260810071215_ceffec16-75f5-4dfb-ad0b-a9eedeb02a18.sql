-- Phase A1b — taxonomy restructure per operator directive (INC-066)

-- STEP 0 — GLOBAL GUARD
DO $$
DECLARE v_n integer;
BEGIN
  SELECT count(*) INTO v_n
  FROM public.listings l
  JOIN public.categories c ON c.id = l.category_id
  WHERE c.slug IN ('vehicles','computers','phones-tablets','cars','trucks','motorcycles',
                   'fashion-clothing','home-furniture','sports-hobbies','health-beauty',
                   'baby-kids','business-industrial','automotive');
  IF v_n > 0 THEN
    RAISE EXCEPTION 'A1b aborted: % listing(s) reference affected categories', v_n;
  END IF;
END $$;

-- STEP 1 — REPURPOSE VEHICLES
UPDATE public.categories
   SET name_en = 'Vehicles', icon = 'CarFront', display_order = 1
 WHERE slug = 'vehicles';

-- STEP 2a — drop legacy/moved root pointers
DELETE FROM public.category_tree_pointers p
 WHERE p.parent_id IS NULL
   AND p.child_id IN (SELECT id FROM public.categories WHERE slug IN
        ('vehicles','computers','phones-tablets','fashion-clothing','home-furniture',
         'sports-hobbies','health-beauty','baby-kids','business-industrial'));

-- STEP 2b — detach cars/trucks/motorcycles from automotive
DELETE FROM public.category_tree_pointers p
 WHERE p.parent_id = (SELECT id FROM public.categories WHERE slug = 'automotive')
   AND p.child_id IN (SELECT id FROM public.categories WHERE slug IN ('cars','trucks','motorcycles'));

-- STEP 2c — new pointers
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
SELECT (SELECT id FROM public.categories WHERE slug = v.parent),
       (SELECT id FROM public.categories WHERE slug = v.child),
       v.ord
FROM (VALUES
  ('automotive','vehicles',1),
  ('vehicles','cars',1),
  ('vehicles','trucks',2),
  ('vehicles','motorcycles',3),
  ('electronics','computers',3),
  ('electronics','phones-tablets',4)
) AS v(parent, child, ord)
ON CONFLICT (parent_id, child_id) DO NOTHING;

UPDATE public.category_tree_pointers
   SET display_order = 2
 WHERE parent_id = (SELECT id FROM public.categories WHERE slug = 'automotive')
   AND child_id  = (SELECT id FROM public.categories WHERE slug = 'auto-parts');

-- STEP 3 — attribute move (legacy colliding rows removed first)
DELETE FROM public.category_attributes
 WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'vehicles')
   AND attr_key IN (
     SELECT attr_key FROM public.category_attributes
      WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'automotive'));

UPDATE public.category_attributes
   SET category_id = (SELECT id FROM public.categories WHERE slug = 'vehicles')
 WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'automotive');

-- STEP 4 — retire the six legacy duplicate roots
DO $$
DECLARE s text; v_id uuid; v_n integer;
BEGIN
  FOREACH s IN ARRAY ARRAY['fashion-clothing','home-furniture','sports-hobbies',
                           'health-beauty','baby-kids','business-industrial'] LOOP
    SELECT id INTO v_id FROM public.categories WHERE slug = s;
    IF v_id IS NULL THEN CONTINUE; END IF;

    SELECT count(*) INTO v_n FROM public.listings WHERE category_id = v_id;
    IF v_n > 0 THEN RAISE EXCEPTION 'A1b aborted: listings reference %', s; END IF;

    DELETE FROM public.category_attributes WHERE category_id = v_id;
    DELETE FROM public.category_tree_pointers WHERE parent_id = v_id OR child_id = v_id;
    DELETE FROM public.categories WHERE id = v_id;

    IF EXISTS (SELECT 1 FROM public.categories WHERE slug = s)
       OR EXISTS (SELECT 1 FROM public.category_attributes WHERE category_id = v_id)
       OR EXISTS (SELECT 1 FROM public.category_tree_pointers WHERE parent_id = v_id OR child_id = v_id)
    THEN RAISE EXCEPTION 'A1b aborted: residual rows for %', s; END IF;
  END LOOP;
END $$;

-- STEP 5 — root ordering
UPDATE public.category_tree_pointers p
   SET display_order = v.ord
  FROM (VALUES
    ('electronics',1),('fashion',2),('automotive',3),('home-garden',4),('services',5),
    ('sports-leisure',6),('real-estate',7),('jobs',8),('pets-animals',9),('babies-kids',10),
    ('beauty-personal-care',11),('agriculture-farming',12),('commercial-equipment',13)
  ) AS v(slug, ord)
 WHERE p.parent_id IS NULL
   AND p.child_id = (SELECT id FROM public.categories WHERE slug = v.slug);

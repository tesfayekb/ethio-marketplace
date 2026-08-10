-- Phase A1 — real category taxonomy + attribute definitions (DEC-013; REQ-017/020)
-- Additive, idempotent, append-only. No literal uuids; all cross-refs by slug.

-- PART 1 — schema deltas
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS icon text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS og_image_url text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS description_en text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS description_am text;

ALTER TABLE public.category_attributes DROP CONSTRAINT IF EXISTS category_attributes_attr_type_check;
ALTER TABLE public.category_attributes ADD CONSTRAINT category_attributes_attr_type_check
  CHECK (attr_type = ANY (ARRAY['text','number','single_select','multi_select','boolean','date','range']));

ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS is_filterable boolean NOT NULL DEFAULT true;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS is_searchable boolean NOT NULL DEFAULT false;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS validation jsonb;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS default_value jsonb;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS inherit_from_parent boolean NOT NULL DEFAULT true;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS help_text_en text;
ALTER TABLE public.category_attributes ADD COLUMN IF NOT EXISTS help_text_am text;

CREATE INDEX IF NOT EXISTS category_attributes_category_idx ON public.category_attributes (category_id);

-- PART 2 — pointer-walking inheritance function
CREATE OR REPLACE FUNCTION public.get_category_attributes(p_category_id uuid, p_include_inherited boolean DEFAULT true)
RETURNS TABLE (
  id uuid, category_id uuid, category_name text, name_en text, name_am text,
  attr_key text, attr_type text, is_required boolean, is_filterable boolean, is_searchable boolean,
  options jsonb, validation jsonb, default_value jsonb, display_order integer,
  help_text_en text, help_text_am text, inherited_from uuid, inherited_from_name text
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
WITH RECURSIVE chain AS (
  SELECT c.id, c.name_en, 0 AS d FROM categories c WHERE c.id = p_category_id
  UNION
  SELECT c.id, c.name_en, ch.d + 1 FROM category_tree_pointers p
  JOIN chain ch ON p.child_id = ch.id
  JOIN categories c ON c.id = p.parent_id
  WHERE p_include_inherited AND p.parent_id IS NOT NULL AND ch.d < 10
)
SELECT DISTINCT ON (a.id)
  a.id, a.category_id, ch.name_en, a.name_en, a.name_am, a.attr_key, a.attr_type,
  a.is_required, a.is_filterable, a.is_searchable, a.options, a.validation, a.default_value,
  a.display_order, a.help_text_en, a.help_text_am,
  CASE WHEN a.category_id <> p_category_id THEN a.category_id END,
  CASE WHEN a.category_id <> p_category_id THEN ch.name_en END
FROM category_attributes a JOIN chain ch ON a.category_id = ch.id
WHERE a.inherit_from_parent = true OR a.category_id = p_category_id
ORDER BY a.id, ch.d ASC;
$$;

REVOKE ALL ON FUNCTION public.get_category_attributes(uuid, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_category_attributes(uuid, boolean) TO anon, authenticated;

-- PART 3 — taxonomy: 96 categories, upsert by slug (never touches price_enabled/expiry_days/is_restricted/is_active)
INSERT INTO public.categories (name_en, slug, icon, display_order)
SELECT v.name_en, v.slug, v.icon, v.ord FROM (VALUES
  ('Electronics'::text, 'electronics'::text, 'Laptop'::text, 1::int),
  ('Fashion', 'fashion', 'Shirt', 2),
  ('Automotive', 'automotive', 'Car', 3),
  ('Home & Garden', 'home-garden', 'Home', 4),
  ('Services', 'services', 'Briefcase', 5),
  ('Sports & Leisure', 'sports-leisure', 'Dumbbell', 6),
  ('Real Estate', 'real-estate', 'Building2', 7),
  ('Jobs', 'jobs', 'Briefcase', 8),
  ('Phones & Tablets', 'phones-tablets', 'Smartphone', 9),
  ('Computers', 'computers', 'Monitor', 10),
  ('Pets & Animals', 'pets-animals', 'PawPrint', 11),
  ('Babies & Kids', 'babies-kids', 'Baby', 12),
  ('Beauty & Personal Care', 'beauty-personal-care', 'Sparkles', 13),
  ('Agriculture & Farming', 'agriculture-farming', 'Tractor', 14),
  ('Commercial Equipment', 'commercial-equipment', 'Factory', 15),
  ('Audio & Headphones', 'audio-headphones', 'Headphones', 1),
  ('Cameras & Photography', 'cameras-photography', 'Camera', 2),
  ('Men''s Clothing', 'mens-clothing', 'Shirt', 1),
  ('Women''s Clothing', 'womens-clothing', 'ShoppingBag', 2),
  ('Shoes & Footwear', 'shoes-footwear', 'Footprints', 3),
  ('Accessories', 'accessories', 'Watch', 4),
  ('Cars', 'cars', 'Car', 1),
  ('Trucks', 'trucks', 'Truck', 2),
  ('Motorcycles', 'motorcycles', 'Bike', 3),
  ('Parts & Accessories', 'auto-parts', 'Settings', 4),
  ('Sedans', 'sedans', 'Car', 1),
  ('SUVs', 'suvs', 'Car', 2),
  ('Coupes', 'coupes', 'Car', 3),
  ('Electric Vehicles', 'electric-vehicles', 'Zap', 4),
  ('Hatchbacks', 'hatchbacks', 'Car', 5),
  ('Luxury', 'luxury-cars', 'Crown', 6),
  ('Compact Sedans', 'compact-sedans', 'Car', 1),
  ('Mid-size Sedans', 'midsize-sedans', 'Car', 2),
  ('Full-size Sedans', 'fullsize-sedans', 'Car', 3),
  ('Furniture', 'furniture', 'Sofa', 1),
  ('Kitchen & Dining', 'kitchen-dining', 'ChefHat', 2),
  ('Garden & Outdoor', 'garden-outdoor', 'Trees', 3),
  ('Home Decor', 'home-decor', 'Lamp', 4),
  ('Professional Services', 'professional-services', 'Briefcase', 1),
  ('Home Services', 'home-services', 'Wrench', 2),
  ('Creative Services', 'creative-services', 'Palette', 3),
  ('Education & Training', 'education-training', 'GraduationCap', 4),
  ('Sports Equipment', 'sports-equipment', 'Dumbbell', 1),
  ('Outdoor Recreation', 'outdoor-recreation', 'Mountain', 2),
  ('Fitness & Gym', 'fitness-gym', 'Heart', 3),
  ('Houses for Sale', 'houses-for-sale', 'Home', 1),
  ('Houses for Rent', 'houses-for-rent', 'Home', 2),
  ('Apartments for Sale', 'apartments-for-sale', 'Building', 3),
  ('Apartments for Rent', 'apartments-for-rent', 'Building', 4),
  ('Land & Plots', 'land-plots', 'MapPin', 5),
  ('Commercial Property', 'commercial-property', 'Store', 6),
  ('Short-term Rentals', 'short-term-rentals', 'Calendar', 7),
  ('Roommates & Shared', 'roommates-shared', 'Users', 8),
  ('Full-time Jobs', 'full-time-jobs', 'Clock', 1),
  ('Part-time Jobs', 'part-time-jobs', 'Clock3', 2),
  ('Internships', 'internships', 'GraduationCap', 3),
  ('Freelance & Contract', 'freelance-contract', 'FileText', 4),
  ('Job Seekers & CVs', 'job-seekers-cvs', 'UserSearch', 5),
  ('Work from Home', 'work-from-home', 'Laptop', 6),
  ('Smartphones', 'smartphones', 'Smartphone', 1),
  ('Tablets', 'tablets', 'Tablet', 2),
  ('Feature Phones', 'feature-phones', 'Phone', 3),
  ('Phone Accessories', 'phone-accessories', 'Headphones', 4),
  ('Repair Services', 'phone-repair-services', 'Wrench', 5),
  ('Laptops', 'laptops', 'Laptop', 1),
  ('Desktops', 'desktops', 'Monitor', 2),
  ('Computer Accessories', 'computer-accessories', 'Keyboard', 3),
  ('Components & Parts', 'computer-components', 'Cpu', 4),
  ('Software', 'software', 'Code', 5),
  ('Other Computers', 'other-computers', 'Monitor', 99),
  ('Dogs', 'dogs', 'Dog', 1),
  ('Cats', 'cats', 'Cat', 2),
  ('Birds', 'birds', 'Bird', 3),
  ('Fish & Aquariums', 'fish-aquariums', 'Fish', 4),
  ('Livestock', 'livestock', 'Beef', 5),
  ('Pet Supplies', 'pet-supplies', 'ShoppingBag', 6),
  ('Pet Services', 'pet-services', 'Stethoscope', 7),
  ('Baby Clothing', 'baby-clothing', 'Shirt', 1),
  ('Kids Clothing', 'kids-clothing', 'Shirt', 2),
  ('Toys & Games', 'toys-games', 'Gamepad2', 3),
  ('Strollers & Car Seats', 'strollers-car-seats', 'Baby', 4),
  ('Nursery Furniture', 'nursery-furniture', 'Bed', 5),
  ('Skincare', 'skincare', 'Droplet', 1),
  ('Makeup', 'makeup', 'Palette', 2),
  ('Hair Care', 'hair-care', 'Scissors', 3),
  ('Fragrances', 'fragrances', 'Flower2', 4),
  ('Wellness & Fitness', 'wellness-fitness', 'Heart', 5),
  ('Farm Equipment', 'farm-equipment', 'Tractor', 1),
  ('Seeds & Plants', 'seeds-plants', 'Sprout', 2),
  ('Fertilizers & Chemicals', 'fertilizers-chemicals', 'FlaskConical', 3),
  ('Livestock Feed', 'livestock-feed', 'Wheat', 4),
  ('Harvested Produce', 'harvested-produce', 'Apple', 5),
  ('Office Equipment', 'office-equipment', 'Printer', 1),
  ('Restaurant Equipment', 'restaurant-equipment', 'UtensilsCrossed', 2),
  ('Medical Equipment', 'medical-equipment', 'Stethoscope', 3),
  ('Construction Equipment', 'construction-equipment', 'HardHat', 4)
) AS v(name_en, slug, icon, ord)
ON CONFLICT (slug) DO UPDATE SET name_en = EXCLUDED.name_en, icon = EXCLUDED.icon, display_order = EXCLUDED.display_order;

-- top-level browse pointers (NULL parent bypasses the UNIQUE constraint)
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
SELECT NULL, c.id, v.ord FROM (VALUES
  ('electronics'::text, 1::int),
  ('fashion', 2),
  ('automotive', 3),
  ('home-garden', 4),
  ('services', 5),
  ('sports-leisure', 6),
  ('real-estate', 7),
  ('jobs', 8),
  ('phones-tablets', 9),
  ('computers', 10),
  ('pets-animals', 11),
  ('babies-kids', 12),
  ('beauty-personal-care', 13),
  ('agriculture-farming', 14),
  ('commercial-equipment', 15)
) AS v(slug, ord)
JOIN public.categories c ON c.slug = v.slug
WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers t WHERE t.parent_id IS NULL AND t.child_id = c.id);

INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
SELECT p.id, c.id, v.ord FROM (VALUES
  ('electronics'::text, 'audio-headphones'::text, 1::int),
  ('electronics', 'cameras-photography', 2),
  ('fashion', 'mens-clothing', 1),
  ('fashion', 'womens-clothing', 2),
  ('fashion', 'shoes-footwear', 3),
  ('fashion', 'accessories', 4),
  ('automotive', 'cars', 1),
  ('automotive', 'trucks', 2),
  ('automotive', 'motorcycles', 3),
  ('automotive', 'auto-parts', 4),
  ('cars', 'sedans', 1),
  ('cars', 'suvs', 2),
  ('cars', 'coupes', 3),
  ('cars', 'electric-vehicles', 4),
  ('cars', 'hatchbacks', 5),
  ('cars', 'luxury-cars', 6),
  ('sedans', 'compact-sedans', 1),
  ('sedans', 'midsize-sedans', 2),
  ('sedans', 'fullsize-sedans', 3),
  ('home-garden', 'furniture', 1),
  ('home-garden', 'kitchen-dining', 2),
  ('home-garden', 'garden-outdoor', 3),
  ('home-garden', 'home-decor', 4),
  ('services', 'professional-services', 1),
  ('services', 'home-services', 2),
  ('services', 'creative-services', 3),
  ('services', 'education-training', 4),
  ('sports-leisure', 'sports-equipment', 1),
  ('sports-leisure', 'outdoor-recreation', 2),
  ('sports-leisure', 'fitness-gym', 3),
  ('real-estate', 'houses-for-sale', 1),
  ('real-estate', 'houses-for-rent', 2),
  ('real-estate', 'apartments-for-sale', 3),
  ('real-estate', 'apartments-for-rent', 4),
  ('real-estate', 'land-plots', 5),
  ('real-estate', 'commercial-property', 6),
  ('real-estate', 'short-term-rentals', 7),
  ('real-estate', 'roommates-shared', 8),
  ('jobs', 'full-time-jobs', 1),
  ('jobs', 'part-time-jobs', 2),
  ('jobs', 'internships', 3),
  ('jobs', 'freelance-contract', 4),
  ('jobs', 'job-seekers-cvs', 5),
  ('jobs', 'work-from-home', 6),
  ('phones-tablets', 'smartphones', 1),
  ('phones-tablets', 'tablets', 2),
  ('phones-tablets', 'feature-phones', 3),
  ('phones-tablets', 'phone-accessories', 4),
  ('phones-tablets', 'phone-repair-services', 5),
  ('computers', 'laptops', 1),
  ('computers', 'desktops', 2),
  ('computers', 'computer-accessories', 3),
  ('computers', 'computer-components', 4),
  ('computers', 'software', 5),
  ('computers', 'other-computers', 99),
  ('pets-animals', 'dogs', 1),
  ('pets-animals', 'cats', 2),
  ('pets-animals', 'birds', 3),
  ('pets-animals', 'fish-aquariums', 4),
  ('pets-animals', 'livestock', 5),
  ('pets-animals', 'pet-supplies', 6),
  ('pets-animals', 'pet-services', 7),
  ('babies-kids', 'baby-clothing', 1),
  ('babies-kids', 'kids-clothing', 2),
  ('babies-kids', 'toys-games', 3),
  ('babies-kids', 'strollers-car-seats', 4),
  ('babies-kids', 'nursery-furniture', 5),
  ('beauty-personal-care', 'skincare', 1),
  ('beauty-personal-care', 'makeup', 2),
  ('beauty-personal-care', 'hair-care', 3),
  ('beauty-personal-care', 'fragrances', 4),
  ('beauty-personal-care', 'wellness-fitness', 5),
  ('agriculture-farming', 'farm-equipment', 1),
  ('agriculture-farming', 'seeds-plants', 2),
  ('agriculture-farming', 'fertilizers-chemicals', 3),
  ('agriculture-farming', 'livestock-feed', 4),
  ('agriculture-farming', 'harvested-produce', 5),
  ('commercial-equipment', 'office-equipment', 1),
  ('commercial-equipment', 'restaurant-equipment', 2),
  ('commercial-equipment', 'medical-equipment', 3),
  ('commercial-equipment', 'construction-equipment', 4)
) AS v(parent_slug, slug, ord)
JOIN public.categories p ON p.slug = v.parent_slug
JOIN public.categories c ON c.slug = v.slug
ON CONFLICT (parent_id, child_id) DO NOTHING;

-- PART 4 — 54 attribute definitions
INSERT INTO public.category_attributes (category_id, name_en, attr_key, attr_type, is_required, is_filterable, display_order, options, validation)
SELECT c.id, v.name_en, v.attr_key, v.attr_type, v.is_required, v.is_filterable, v.ord, v.options, v.validation FROM (VALUES
  ('automotive'::text, 'Make'::text, 'make'::text, 'single_select'::text, true::boolean, true::boolean, 1::int, '[{"value": "toyota", "label_en": "Toyota"}, {"value": "honda", "label_en": "Honda"}, {"value": "ford", "label_en": "Ford"}, {"value": "chevrolet", "label_en": "Chevrolet"}, {"value": "bmw", "label_en": "BMW"}, {"value": "mercedes", "label_en": "Mercedes-Benz"}, {"value": "audi", "label_en": "Audi"}, {"value": "volkswagen", "label_en": "Volkswagen"}, {"value": "nissan", "label_en": "Nissan"}, {"value": "hyundai", "label_en": "Hyundai"}, {"value": "other", "label_en": "Other"}]'::jsonb, NULL::jsonb),
  ('automotive', 'Model', 'model', 'text', true, true, 2, NULL, '{"minLength":1,"maxLength":100}'),
  ('automotive', 'Year', 'year', 'number', true, true, 3, NULL, '{"min":1900,"max":2027}'),
  ('automotive', 'Mileage (km)', 'mileage_km', 'number', false, true, 4, NULL, '{"min":0}'),
  ('automotive', 'Condition', 'condition', 'single_select', true, true, 5, '[{"value": "new", "label_en": "New"}, {"value": "used", "label_en": "Used"}, {"value": "certified", "label_en": "Certified Pre-Owned"}]', NULL),
  ('automotive', 'Transmission', 'transmission', 'single_select', false, true, 6, '[{"value": "automatic", "label_en": "Automatic"}, {"value": "manual", "label_en": "Manual"}, {"value": "cvt", "label_en": "CVT"}]', NULL),
  ('automotive', 'Fuel Type', 'fuel_type', 'single_select', false, true, 7, '[{"value": "gasoline", "label_en": "Gasoline"}, {"value": "diesel", "label_en": "Diesel"}, {"value": "electric", "label_en": "Electric"}, {"value": "hybrid", "label_en": "Hybrid"}, {"value": "plugin_hybrid", "label_en": "Plug-in Hybrid"}]', NULL),
  ('sedans', 'Body Style', 'body_style', 'single_select', false, true, 10, '[{"value": "compact", "label_en": "Compact"}, {"value": "midsize", "label_en": "Mid-size"}, {"value": "fullsize", "label_en": "Full-size"}, {"value": "sport", "label_en": "Sport"}]', NULL),
  ('sedans', 'Number of Doors', 'doors', 'single_select', false, true, 11, '[{"value": "2", "label_en": "2 Door"}, {"value": "4", "label_en": "4 Door"}]', NULL),
  ('electric-vehicles', 'Range (km)', 'range_km', 'number', false, true, 10, NULL, '{"min":0,"max":1600}'),
  ('electric-vehicles', 'Battery Capacity (kWh)', 'battery_kwh', 'number', false, true, 11, NULL, '{"min":0,"max":500}'),
  ('electric-vehicles', 'Charging Speed', 'charging_speed', 'single_select', false, true, 12, '[{"value": "level1", "label_en": "Level 1 (120V)"}, {"value": "level2", "label_en": "Level 2 (240V)"}, {"value": "dc_fast", "label_en": "DC Fast Charging"}]', NULL),
  ('electronics', 'Brand', 'brand', 'text', false, true, 1, NULL, NULL),
  ('electronics', 'Condition', 'condition', 'single_select', true, true, 2, '[{"value": "new", "label_en": "New"}, {"value": "like_new", "label_en": "Like New"}, {"value": "good", "label_en": "Good"}, {"value": "fair", "label_en": "Fair"}, {"value": "parts", "label_en": "For Parts"}]', NULL),
  ('electronics', 'Warranty', 'warranty', 'boolean', false, true, 3, NULL, NULL),
  ('fashion', 'Size', 'size', 'single_select', false, true, 1, '[{"value": "xs", "label_en": "XS"}, {"value": "s", "label_en": "S"}, {"value": "m", "label_en": "M"}, {"value": "l", "label_en": "L"}, {"value": "xl", "label_en": "XL"}, {"value": "xxl", "label_en": "XXL"}]', NULL),
  ('fashion', 'Color', 'color', 'multi_select', false, true, 2, '[{"value": "black", "label_en": "Black"}, {"value": "white", "label_en": "White"}, {"value": "red", "label_en": "Red"}, {"value": "blue", "label_en": "Blue"}, {"value": "green", "label_en": "Green"}, {"value": "yellow", "label_en": "Yellow"}, {"value": "pink", "label_en": "Pink"}, {"value": "purple", "label_en": "Purple"}, {"value": "orange", "label_en": "Orange"}, {"value": "gray", "label_en": "Gray"}, {"value": "brown", "label_en": "Brown"}, {"value": "multi", "label_en": "Multi-color"}]', NULL),
  ('fashion', 'Material', 'material', 'text', false, true, 3, NULL, NULL),
  ('fashion', 'Condition', 'condition', 'single_select', true, true, 4, '[{"value": "new_with_tags", "label_en": "New with Tags"}, {"value": "new_without_tags", "label_en": "New without Tags"}, {"value": "like_new", "label_en": "Like New"}, {"value": "good", "label_en": "Good"}, {"value": "fair", "label_en": "Fair"}]', NULL),
  ('services', 'Service Type', 'service_type', 'single_select', false, true, 1, '[{"value": "one_time", "label_en": "One-time"}, {"value": "recurring", "label_en": "Recurring"}, {"value": "project", "label_en": "Project-based"}]', NULL),
  ('services', 'Duration', 'duration', 'single_select', false, true, 2, '[{"value": "hourly", "label_en": "Hourly"}, {"value": "daily", "label_en": "Daily"}, {"value": "weekly", "label_en": "Weekly"}, {"value": "monthly", "label_en": "Monthly"}, {"value": "custom", "label_en": "Custom"}]', NULL),
  ('services', 'Remote Available', 'remote_available', 'boolean', false, true, 3, NULL, NULL),
  ('services', 'Experience Level', 'experience_level', 'single_select', false, true, 4, '[{"value": "entry", "label_en": "Entry Level"}, {"value": "intermediate", "label_en": "Intermediate"}, {"value": "expert", "label_en": "Expert"}]', NULL),
  ('real-estate', 'Property Type', 'property_type', 'single_select', true, true, 1, '[{"value": "house", "label_en": "House"}, {"value": "apartment", "label_en": "Apartment"}, {"value": "villa", "label_en": "Villa"}, {"value": "studio", "label_en": "Studio"}, {"value": "commercial", "label_en": "Commercial"}, {"value": "land", "label_en": "Land"}]', NULL),
  ('real-estate', 'Bedrooms', 'bedrooms', 'number', false, true, 2, NULL, '{"min":0,"max":20}'),
  ('real-estate', 'Bathrooms', 'bathrooms', 'number', false, true, 3, NULL, '{"min":0,"max":20}'),
  ('real-estate', 'Size (sqm)', 'size_sqm', 'number', false, true, 4, NULL, '{"min":1}'),
  ('real-estate', 'Furnished', 'furnished', 'boolean', false, true, 5, NULL, NULL),
  ('jobs', 'Job Type', 'job_type', 'single_select', true, true, 1, '[{"value": "full-time", "label_en": "Full-time"}, {"value": "part-time", "label_en": "Part-time"}, {"value": "contract", "label_en": "Contract"}, {"value": "freelance", "label_en": "Freelance"}, {"value": "internship", "label_en": "Internship"}]', NULL),
  ('jobs', 'Experience Level', 'experience_level', 'single_select', false, true, 2, '[{"value": "entry", "label_en": "Entry Level"}, {"value": "mid", "label_en": "Mid Level"}, {"value": "senior", "label_en": "Senior"}, {"value": "executive", "label_en": "Executive"}]', NULL),
  ('jobs', 'Industry', 'industry', 'single_select', false, true, 3, '[{"value": "technology", "label_en": "Technology"}, {"value": "healthcare", "label_en": "Healthcare"}, {"value": "finance", "label_en": "Finance"}, {"value": "education", "label_en": "Education"}, {"value": "hospitality", "label_en": "Hospitality"}, {"value": "retail", "label_en": "Retail"}, {"value": "other", "label_en": "Other"}]', NULL),
  ('jobs', 'Salary Range', 'salary_range', 'text', false, false, 4, NULL, NULL),
  ('phones-tablets', 'Brand', 'brand', 'single_select', true, true, 1, '[{"value": "apple", "label_en": "Apple"}, {"value": "samsung", "label_en": "Samsung"}, {"value": "xiaomi", "label_en": "Xiaomi"}, {"value": "huawei", "label_en": "Huawei"}, {"value": "oppo", "label_en": "Oppo"}, {"value": "vivo", "label_en": "Vivo"}, {"value": "tecno", "label_en": "Tecno"}, {"value": "infinix", "label_en": "Infinix"}, {"value": "other", "label_en": "Other"}]', NULL),
  ('phones-tablets', 'Storage', 'storage', 'single_select', false, true, 2, '[{"value": "16gb", "label_en": "16 GB"}, {"value": "32gb", "label_en": "32 GB"}, {"value": "64gb", "label_en": "64 GB"}, {"value": "128gb", "label_en": "128 GB"}, {"value": "256gb", "label_en": "256 GB"}, {"value": "512gb", "label_en": "512 GB"}, {"value": "1tb", "label_en": "1 TB"}]', NULL),
  ('phones-tablets', 'Condition', 'condition', 'single_select', true, true, 3, '[{"value": "new", "label_en": "New"}, {"value": "like-new", "label_en": "Like New"}, {"value": "good", "label_en": "Good"}, {"value": "fair", "label_en": "Fair"}]', NULL),
  ('pets-animals', 'Animal Type', 'animal_type', 'single_select', true, true, 1, '[{"value": "dog", "label_en": "Dog"}, {"value": "cat", "label_en": "Cat"}, {"value": "bird", "label_en": "Bird"}, {"value": "fish", "label_en": "Fish"}, {"value": "livestock", "label_en": "Livestock"}, {"value": "other", "label_en": "Other"}]', NULL),
  ('pets-animals', 'Age', 'age', 'text', false, false, 2, NULL, NULL),
  ('pets-animals', 'Breed', 'breed', 'text', false, true, 3, NULL, NULL),
  ('babies-kids', 'Age Range', 'age_range', 'single_select', false, true, 1, '[{"value": "0-6m", "label_en": "0-6 months"}, {"value": "6-12m", "label_en": "6-12 months"}, {"value": "1-2y", "label_en": "1-2 years"}, {"value": "2-4y", "label_en": "2-4 years"}, {"value": "4-8y", "label_en": "4-8 years"}, {"value": "8-12y", "label_en": "8-12 years"}]', NULL),
  ('babies-kids', 'Condition', 'condition', 'single_select', true, true, 2, '[{"value": "new", "label_en": "New"}, {"value": "like-new", "label_en": "Like New"}, {"value": "good", "label_en": "Good"}, {"value": "fair", "label_en": "Fair"}]', NULL),
  ('babies-kids', 'Gender', 'gender', 'single_select', false, true, 3, '[{"value": "boy", "label_en": "Boy"}, {"value": "girl", "label_en": "Girl"}, {"value": "unisex", "label_en": "Unisex"}]', NULL),
  ('beauty-personal-care', 'Category Type', 'category_type', 'single_select', true, true, 1, '[{"value": "skincare", "label_en": "Skincare"}, {"value": "makeup", "label_en": "Makeup"}, {"value": "haircare", "label_en": "Hair Care"}, {"value": "fragrance", "label_en": "Fragrance"}, {"value": "wellness", "label_en": "Wellness"}]', NULL),
  ('beauty-personal-care', 'Brand', 'brand', 'text', false, true, 2, NULL, NULL),
  ('beauty-personal-care', 'Condition', 'condition', 'single_select', true, true, 3, '[{"value": "new", "label_en": "New/Sealed"}, {"value": "opened", "label_en": "Opened/Used"}]', NULL),
  ('agriculture-farming', 'Equipment Type', 'equipment_type', 'single_select', false, true, 1, '[{"value": "tractor", "label_en": "Tractor"}, {"value": "harvester", "label_en": "Harvester"}, {"value": "irrigation", "label_en": "Irrigation"}, {"value": "tools", "label_en": "Hand Tools"}, {"value": "seeds", "label_en": "Seeds"}, {"value": "fertilizer", "label_en": "Fertilizer"}, {"value": "produce", "label_en": "Produce"}, {"value": "other", "label_en": "Other"}]', NULL),
  ('agriculture-farming', 'Condition', 'condition', 'single_select', true, true, 2, '[{"value": "new", "label_en": "New"}, {"value": "used", "label_en": "Used"}, {"value": "refurbished", "label_en": "Refurbished"}]', NULL),
  ('commercial-equipment', 'Equipment Type', 'equipment_type', 'single_select', true, true, 1, '[{"value": "office", "label_en": "Office Equipment"}, {"value": "restaurant", "label_en": "Restaurant Equipment"}, {"value": "medical", "label_en": "Medical Equipment"}, {"value": "construction", "label_en": "Construction Equipment"}, {"value": "other", "label_en": "Other"}]', NULL),
  ('commercial-equipment', 'Condition', 'condition', 'single_select', true, true, 2, '[{"value": "new", "label_en": "New"}, {"value": "used", "label_en": "Used"}, {"value": "refurbished", "label_en": "Refurbished"}]', NULL),
  ('commercial-equipment', 'Warranty', 'warranty', 'boolean', false, true, 3, NULL, NULL),
  ('computers', 'Processor', 'processor', 'text', false, true, 1, NULL, NULL),
  ('computers', 'RAM', 'ram', 'single_select', false, true, 2, '[{"value": "4gb", "label_en": "4 GB"}, {"value": "8gb", "label_en": "8 GB"}, {"value": "16gb", "label_en": "16 GB"}, {"value": "32gb", "label_en": "32 GB"}, {"value": "64gb", "label_en": "64 GB"}]', NULL),
  ('computers', 'Storage', 'storage', 'single_select', false, true, 3, '[{"value": "128gb", "label_en": "128 GB"}, {"value": "256gb", "label_en": "256 GB"}, {"value": "512gb", "label_en": "512 GB"}, {"value": "1tb", "label_en": "1 TB"}, {"value": "2tb", "label_en": "2 TB"}]', NULL),
  ('computers', 'Graphics Card', 'graphics_card', 'text', false, true, 4, NULL, NULL),
  ('laptops', 'Screen Size', 'screen_size', 'single_select', false, true, 1, '[{"value": "11-13", "label_en": "11-13\""}, {"value": "14", "label_en": "14\""}, {"value": "15-16", "label_en": "15-16\""}, {"value": "17+", "label_en": "17\"+"}]', NULL)
) AS v(slug, name_en, attr_key, attr_type, is_required, is_filterable, ord, options, validation)
JOIN public.categories c ON c.slug = v.slug
ON CONFLICT (category_id, attr_key) DO NOTHING;
-- C1 SEED — generated 2026-09-03 from ratified /docs/spec/category-era artifacts. Verbatim; do not edit.
-- §0 additive columns
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS visible_from timestamptz;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS visible_until timestamptz;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_catchall boolean NOT NULL DEFAULT false;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS allow_listings boolean NOT NULL DEFAULT true;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_thumb_url text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_generation_prompt text;

-- §1a current-row renames (preserve ids + translations; idempotent)
UPDATE public.categories SET slug='vehicles', name_en='Vehicles' WHERE slug='automotive' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='vehicles');
UPDATE public.categories SET slug='fashion', name_en='Fashion' WHERE slug='fashion-clothing' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='fashion');
UPDATE public.categories SET slug='home-garden', name_en='Home & Garden' WHERE slug='home-furniture' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='home-garden');
UPDATE public.categories SET slug='beauty-personal-care', name_en='Beauty & Personal Care' WHERE slug='health-beauty' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='beauty-personal-care');
UPDATE public.categories SET slug='sports-leisure', name_en='Sports & Leisure' WHERE slug='sports-hobbies' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='sports-leisure');
UPDATE public.categories SET slug='babies-kids', name_en='Babies & Kids' WHERE slug='baby-kids' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='babies-kids');
UPDATE public.categories SET slug='commercial-equipment', name_en='Commercial Equipment' WHERE slug='business-industrial' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='commercial-equipment');
UPDATE public.categories SET slug='motorbikes-bicycles', name_en='Motorbikes & Bicycles' WHERE slug='motorcycles' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='motorbikes-bicycles');
UPDATE public.categories SET slug='audio-sound', name_en='Audio & Sound Systems' WHERE slug='audio-headphones' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='audio-sound');
UPDATE public.categories SET slug='cameras-drones', name_en='Cameras & Drones' WHERE slug='cameras-photography' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='cameras-drones');
UPDATE public.categories SET slug='shoes', name_en='Shoes & Footwear' WHERE slug='shoes-footwear' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='shoes');
UPDATE public.categories SET slug='jewelry-watches', name_en='Jewelry & Watches' WHERE slug='accessories' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='jewelry-watches');
UPDATE public.categories SET slug='kids-clothing', name_en='Kids & Baby Clothing' WHERE slug='baby-clothing' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='kids-clothing');
UPDATE public.categories SET slug='haircare', name_en='Hair Care & Wigs' WHERE slug='hair-care' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='haircare');
UPDATE public.categories SET slug='health-wellness', name_en='Health & Wellness (OTC)' WHERE slug='wellness-fitness' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='health-wellness');
UPDATE public.categories SET slug='apartments-condos', name_en='Apartments & Condominiums' WHERE slug='apartments-for-rent' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='apartments-condos');
UPDATE public.categories SET slug='houses', name_en='Houses & Townhomes' WHERE slug='houses-for-rent' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='houses');
UPDATE public.categories SET slug='professional-services', name_en='Professional & Office Services' WHERE slug='creative-services' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='professional-services');
UPDATE public.categories SET slug='fitness-equipment', name_en='Fitness & Gym Equipment' WHERE slug='fitness-gym' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='fitness-equipment');
UPDATE public.categories SET slug='construction-tools', name_en='Tools & Site Machinery' WHERE slug='construction-equipment' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='construction-tools');
UPDATE public.categories SET slug='seeds-inputs', name_en='Seeds, Feed & Inputs' WHERE slug='seeds-plants' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='seeds-inputs');
UPDATE public.categories SET slug='dogs-cats', name_en='Dogs & Cats' WHERE slug='dogs' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='dogs-cats');
UPDATE public.categories SET slug='birds-fish', name_en='Birds, Fish & Small Pets' WHERE slug='birds' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='birds-fish');
UPDATE public.categories SET slug='pet-supplies-services', name_en='Pet Supplies & Services' WHERE slug='pet-supplies' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='pet-supplies-services');
UPDATE public.categories SET slug='baby-gear', name_en='Strollers, Car Seats & Gear' WHERE slug='strollers-car-seats' AND NOT EXISTS (SELECT 1 FROM public.categories WHERE slug='baby-gear');

-- §1a2 rename-blocked leftovers: any old slug still present was guard-blocked (target existed) → retire
UPDATE public.categories SET is_active=false WHERE slug='automotive';
UPDATE public.categories SET is_active=false WHERE slug='fashion-clothing';
UPDATE public.categories SET is_active=false WHERE slug='home-furniture';
UPDATE public.categories SET is_active=false WHERE slug='health-beauty';
UPDATE public.categories SET is_active=false WHERE slug='sports-hobbies';
UPDATE public.categories SET is_active=false WHERE slug='baby-kids';
UPDATE public.categories SET is_active=false WHERE slug='business-industrial';
UPDATE public.categories SET is_active=false WHERE slug='motorcycles';
UPDATE public.categories SET is_active=false WHERE slug='audio-headphones';
UPDATE public.categories SET is_active=false WHERE slug='cameras-photography';
UPDATE public.categories SET is_active=false WHERE slug='shoes-footwear';
UPDATE public.categories SET is_active=false WHERE slug='accessories';
UPDATE public.categories SET is_active=false WHERE slug='baby-clothing';
UPDATE public.categories SET is_active=false WHERE slug='hair-care';
UPDATE public.categories SET is_active=false WHERE slug='wellness-fitness';
UPDATE public.categories SET is_active=false WHERE slug='apartments-for-rent';
UPDATE public.categories SET is_active=false WHERE slug='houses-for-rent';
UPDATE public.categories SET is_active=false WHERE slug='creative-services';
UPDATE public.categories SET is_active=false WHERE slug='fitness-gym';
UPDATE public.categories SET is_active=false WHERE slug='construction-equipment';
UPDATE public.categories SET is_active=false WHERE slug='seeds-plants';
UPDATE public.categories SET is_active=false WHERE slug='dogs';
UPDATE public.categories SET is_active=false WHERE slug='birds';
UPDATE public.categories SET is_active=false WHERE slug='pet-supplies';
UPDATE public.categories SET is_active=false WHERE slug='strollers-car-seats';

-- §1b upsert all 113 target nodes
INSERT INTO public.categories (name_en, slug, icon, display_order, is_active, is_catchall, allow_listings) VALUES
  ('Vehicles','vehicles','CarFront',1,true,false,false),
  ('Cars','cars','Car',1,true,false,true),
  ('Motorbikes & Bicycles','motorbikes-bicycles','Bike',2,true,false,true),
  ('Buses, Vans & Taxis','buses-vans','Bus',3,true,false,true),
  ('Trucks & Trailers','trucks-trailers','Truck',4,true,false,true),
  ('Heavy Machinery','heavy-machinery','Construction',5,true,false,true),
  ('Parts & Accessories','vehicle-parts','Wrench',6,true,false,true),
  ('Vehicle Hire & Rentals','vehicle-hire','KeyRound',7,true,false,true),
  ('Auto Services','auto-services','Settings',8,true,false,true),
  ('Other Vehicles','other-vehicles','MoreHorizontal',999,true,true,true),
  ('Electronics','electronics','Laptop',2,true,false,false),
  ('Phones & Tablets','phones-tablets','Smartphone',1,true,false,true),
  ('Computers & Laptops','computers','Monitor',2,true,false,true),
  ('TV & Video','tv-video','Tv',3,true,false,true),
  ('Gaming & Consoles','gaming','Gamepad2',4,true,false,true),
  ('Audio & Sound Systems','audio-sound','Headphones',5,true,false,true),
  ('Cameras & Drones','cameras-drones','Camera',6,true,false,true),
  ('Printers & Office Electronics','printers-office','Printer',7,true,false,true),
  ('Accessories & Parts','electronics-accessories','Cable',8,true,false,true),
  ('Other Electronics','other-electronics','MoreHorizontal',999,true,true,true),
  ('Fashion','fashion','Shirt',3,true,false,false),
  ('Women''s Clothing','womens-clothing','ShoppingBag',1,true,false,true),
  ('Men''s Clothing','mens-clothing','Shirt',2,true,false,true),
  ('Shoes & Footwear','shoes','Footprints',3,true,false,true),
  ('Bags & Luggage','bags-luggage','Briefcase',4,true,false,true),
  ('Jewelry & Watches','jewelry-watches','Watch',5,true,false,true),
  ('Traditional Cloth','traditional-cloth','Ribbon',6,true,false,true),
  ('Uniforms & Workwear','uniforms','BadgeCheck',7,true,false,true),
  ('Other Fashion','other-fashion','MoreHorizontal',999,true,true,true),
  ('Home & Garden','home-garden','Home',4,true,false,false),
  ('Furniture','furniture','Sofa',1,true,false,true),
  ('Home Appliances','appliances','Refrigerator',2,true,false,true),
  ('Kitchen & Dining','kitchen-dining','ChefHat',3,true,false,true),
  ('Home Décor','home-decor','Lamp',4,true,false,true),
  ('Garden & Outdoor','garden-outdoor','Trees',5,true,false,true),
  ('Other Home & Garden','other-home-garden','MoreHorizontal',999,true,true,true),
  ('Beauty & Personal Care','beauty-personal-care','Sparkles',5,true,false,false),
  ('Skincare','skincare','Droplet',1,true,false,true),
  ('Hair Care & Wigs','haircare','Scissors',2,true,false,true),
  ('Makeup','makeup','Palette',3,true,false,true),
  ('Fragrances','fragrances','Flower2',4,true,false,true),
  ('Men''s Grooming','mens-grooming','User',5,true,false,true),
  ('Nails, Hand & Foot Care','nail-hand-foot','Hand',6,true,false,true),
  ('Health & Wellness (OTC)','health-wellness','HeartPulse',7,true,false,true),
  ('Other Beauty & Personal Care','other-beauty-personal-care','MoreHorizontal',999,true,true,true),
  ('Real Estate','real-estate','Building2',6,true,false,false),
  ('Apartments & Condominiums','apartments-condos','Building',1,true,false,true),
  ('Houses & Townhomes','houses','Home',2,true,false,true),
  ('Land & Plots','land-plots','MapPin',3,true,false,true),
  ('Commercial Property','commercial-property','Store',4,true,false,true),
  ('Short-term Rentals','short-term-rentals','Calendar',5,true,false,true),
  ('Roommates & Shared','roommates-shared','Users',6,true,false,true),
  ('Realtor & Property Services','realtor-services','KeySquare',7,true,false,true),
  ('Other Real Estate','other-real-estate','MoreHorizontal',999,true,true,true),
  ('Services','services','Briefcase',7,true,false,false),
  ('Home & Cleaning Services','home-services','Wrench',1,true,false,true),
  ('Repair & Maintenance','repair-maintenance','Hammer',2,true,false,true),
  ('Financial & Legal Services','financial-legal','Banknote',3,true,false,true),
  ('Logistics, Cargo & Moving','logistics-cargo','Package',4,true,false,true),
  ('Events & Catering','events-services','PartyPopper',5,true,false,true),
  ('Education & Tutoring','education-training','GraduationCap',6,true,false,true),
  ('Personal Care Services','personal-care-services','Scissors',7,true,false,true),
  ('Printing, Photo & Design','printing-photography','Printer',8,true,false,true),
  ('Professional & Office Services','professional-services','Briefcase',9,true,false,true),
  ('Health Services','health-services','Stethoscope',10,true,false,true),
  ('Other Services','other-services','MoreHorizontal',999,true,true,true),
  ('Sports & Leisure','sports-leisure','Dumbbell',8,true,false,false),
  ('Fitness & Gym Equipment','fitness-equipment','Dumbbell',1,true,false,true),
  ('Sports Equipment','sports-equipment','Trophy',2,true,false,true),
  ('Outdoor & Camping','outdoor-recreation','Mountain',3,true,false,true),
  ('Gyms & Fitness Centers','fitness-centers','Activity',4,true,false,true),
  ('Books, Music & Media','books-media','Book',5,true,false,true),
  ('Other Sports & Leisure','other-sports-leisure','MoreHorizontal',999,true,true,true),
  ('Construction Material','construction','HardHat',9,true,false,false),
  ('Cement, Concrete & Masonry','cement-concrete','Layers',1,true,false,true),
  ('Steel & Metals','steel-metals','Anvil',2,true,false,true),
  ('Wood & Timber','wood-timber','TreePine',3,true,false,true),
  ('Plumbing & Sanitary','plumbing','Droplets',4,true,false,true),
  ('Electrical & Lighting','electrical-lighting','Zap',5,true,false,true),
  ('Tiles, Paint & Finishing','tiles-paint','Paintbrush',6,true,false,true),
  ('Roofing, Doors & Windows','roofing-doors','DoorOpen',7,true,false,true),
  ('Tools & Site Machinery','construction-tools','Drill',8,true,false,true),
  ('Other Construction Material','other-construction','MoreHorizontal',999,true,true,true),
  ('Travel & Accommodation','travel','Plane',10,true,false,false),
  ('Hotels & Guesthouses','hotels-guesthouses','Hotel',1,true,false,true),
  ('Resorts & Lodges','resorts-lodges','Palmtree',2,true,false,true),
  ('Tours, Tickets & Travel Agents','tours-tickets','TicketsPlane',3,true,false,true),
  ('Restaurants, Cafés & Nightlife','restaurants-cafes','UtensilsCrossed',4,true,false,true),
  ('Attractions & Recreation','attractions','FerrisWheel',5,true,false,true),
  ('Travel Documents & Services','travel-services','FileCheck',6,true,false,true),
  ('Other Travel & Accommodation','other-travel','MoreHorizontal',999,true,true,true),
  ('Agriculture & Farming','agriculture-farming','Tractor',11,true,false,false),
  ('Farm Equipment & Machinery','farm-equipment','Tractor',1,true,false,true),
  ('Livestock & Poultry','livestock','Beef',2,true,false,true),
  ('Grains, Produce & Coffee','harvested-produce','Coffee',3,true,false,true),
  ('Seeds, Feed & Inputs','seeds-inputs','Sprout',4,true,false,true),
  ('Other Agriculture & Farming','other-agriculture-farming','MoreHorizontal',999,true,true,true),
  ('Pets & Animals','pets-animals','PawPrint',12,true,false,false),
  ('Dogs & Cats','dogs-cats','Dog',1,true,false,true),
  ('Birds, Fish & Small Pets','birds-fish','Bird',2,true,false,true),
  ('Pet Supplies & Services','pet-supplies-services','Bone',3,true,false,true),
  ('Other Pets & Animals','other-pets-animals','MoreHorizontal',999,true,true,true),
  ('Babies & Kids','babies-kids','Baby',13,true,false,false),
  ('Kids & Baby Clothing','kids-clothing','Shirt',1,true,false,true),
  ('Toys & Games','toys-games','Gamepad2',2,true,false,true),
  ('Strollers, Car Seats & Gear','baby-gear','BabyIcon',3,true,false,true),
  ('Other Babies & Kids','other-babies-kids','MoreHorizontal',999,true,true,true),
  ('Commercial Equipment','commercial-equipment','Factory',14,true,false,false),
  ('Restaurant & Café Equipment','restaurant-equipment','CookingPot',1,true,false,true),
  ('Medical Equipment','medical-equipment','Stethoscope',2,true,false,true),
  ('Office & Shop Equipment','office-equipment','Printer',3,true,false,true),
  ('Industrial Machinery','industrial-equipment','Factory',4,true,false,true),
  ('Other Commercial Equipment','other-commercial-equipment','MoreHorizontal',999,true,true,true)
ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, icon=EXCLUDED.icon, display_order=EXCLUDED.display_order, is_catchall=EXCLUDED.is_catchall, allow_listings=EXCLUDED.allow_listings, is_active=true;

-- §1c absorbed current rows with no surviving slug: retire (no listings exist)
UPDATE public.categories SET is_active=false WHERE slug='apartments-for-sale';
UPDATE public.categories SET is_active=false WHERE slug='cats';
UPDATE public.categories SET is_active=false WHERE slug='fertilizers-chemicals';
UPDATE public.categories SET is_active=false WHERE slug='fish-aquariums';
UPDATE public.categories SET is_active=false WHERE slug='houses-for-sale';
UPDATE public.categories SET is_active=false WHERE slug='livestock-feed';
UPDATE public.categories SET is_active=false WHERE slug='nursery-furniture';
UPDATE public.categories SET is_active=false WHERE slug='pet-services';

-- §1d absorbed A1 leaves (no target slug; no listings): retire
UPDATE public.categories SET is_active=false WHERE slug='apartments-for-sale';
UPDATE public.categories SET is_active=false WHERE slug='auto-parts';
UPDATE public.categories SET is_active=false WHERE slug='cats';
UPDATE public.categories SET is_active=false WHERE slug='compact-sedans';
UPDATE public.categories SET is_active=false WHERE slug='computer-accessories';
UPDATE public.categories SET is_active=false WHERE slug='computer-components';
UPDATE public.categories SET is_active=false WHERE slug='coupes';
UPDATE public.categories SET is_active=false WHERE slug='desktops';
UPDATE public.categories SET is_active=false WHERE slug='electric-vehicles';
UPDATE public.categories SET is_active=false WHERE slug='feature-phones';
UPDATE public.categories SET is_active=false WHERE slug='fertilizers-chemicals';
UPDATE public.categories SET is_active=false WHERE slug='fish-aquariums';
UPDATE public.categories SET is_active=false WHERE slug='fullsize-sedans';
UPDATE public.categories SET is_active=false WHERE slug='hatchbacks';
UPDATE public.categories SET is_active=false WHERE slug='houses-for-sale';
UPDATE public.categories SET is_active=false WHERE slug='laptops';
UPDATE public.categories SET is_active=false WHERE slug='livestock-feed';
UPDATE public.categories SET is_active=false WHERE slug='luxury-cars';
UPDATE public.categories SET is_active=false WHERE slug='midsize-sedans';
UPDATE public.categories SET is_active=false WHERE slug='nursery-furniture';
UPDATE public.categories SET is_active=false WHERE slug='other-computers';
UPDATE public.categories SET is_active=false WHERE slug='pet-services';
UPDATE public.categories SET is_active=false WHERE slug='phone-accessories';
UPDATE public.categories SET is_active=false WHERE slug='phone-repair-services';
UPDATE public.categories SET is_active=false WHERE slug='sedans';
UPDATE public.categories SET is_active=false WHERE slug='smartphones';
UPDATE public.categories SET is_active=false WHERE slug='software';
UPDATE public.categories SET is_active=false WHERE slug='suvs';
UPDATE public.categories SET is_active=false WHERE slug='tablets';
UPDATE public.categories SET is_active=false WHERE slug='trucks';

-- §2 pointers: roots (NULL parent, NOT-EXISTS guard), children, L2 extras
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 1 FROM public.categories WHERE slug='vehicles' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 2 FROM public.categories WHERE slug='electronics' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 3 FROM public.categories WHERE slug='fashion' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 4 FROM public.categories WHERE slug='home-garden' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 5 FROM public.categories WHERE slug='beauty-personal-care' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 6 FROM public.categories WHERE slug='real-estate' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 7 FROM public.categories WHERE slug='services' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 8 FROM public.categories WHERE slug='sports-leisure' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 9 FROM public.categories WHERE slug='construction' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 10 FROM public.categories WHERE slug='travel' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 11 FROM public.categories WHERE slug='agriculture-farming' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 12 FROM public.categories WHERE slug='pets-animals' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 13 FROM public.categories WHERE slug='babies-kids' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) SELECT NULL, id, 14 FROM public.categories WHERE slug='commercial-equipment' AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=public.categories.id);
INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
SELECT p.id, c.id, v.ord FROM (VALUES
  ('vehicles','cars',1),
  ('vehicles','motorbikes-bicycles',2),
  ('vehicles','buses-vans',3),
  ('vehicles','trucks-trailers',4),
  ('vehicles','heavy-machinery',5),
  ('vehicles','vehicle-parts',6),
  ('vehicles','vehicle-hire',7),
  ('vehicles','auto-services',8),
  ('vehicles','other-vehicles',999),
  ('electronics','phones-tablets',1),
  ('electronics','computers',2),
  ('electronics','tv-video',3),
  ('electronics','gaming',4),
  ('electronics','audio-sound',5),
  ('electronics','cameras-drones',6),
  ('electronics','printers-office',7),
  ('electronics','electronics-accessories',8),
  ('electronics','other-electronics',999),
  ('fashion','womens-clothing',1),
  ('fashion','mens-clothing',2),
  ('fashion','shoes',3),
  ('fashion','bags-luggage',4),
  ('fashion','jewelry-watches',5),
  ('fashion','traditional-cloth',6),
  ('fashion','uniforms',7),
  ('fashion','other-fashion',999),
  ('home-garden','furniture',1),
  ('home-garden','appliances',2),
  ('home-garden','kitchen-dining',3),
  ('home-garden','home-decor',4),
  ('home-garden','garden-outdoor',5),
  ('home-garden','other-home-garden',999),
  ('beauty-personal-care','skincare',1),
  ('beauty-personal-care','haircare',2),
  ('beauty-personal-care','makeup',3),
  ('beauty-personal-care','fragrances',4),
  ('beauty-personal-care','mens-grooming',5),
  ('beauty-personal-care','nail-hand-foot',6),
  ('beauty-personal-care','health-wellness',7),
  ('beauty-personal-care','other-beauty-personal-care',999),
  ('real-estate','apartments-condos',1),
  ('real-estate','houses',2),
  ('real-estate','land-plots',3),
  ('real-estate','commercial-property',4),
  ('real-estate','short-term-rentals',5),
  ('real-estate','roommates-shared',6),
  ('real-estate','realtor-services',7),
  ('real-estate','other-real-estate',999),
  ('services','home-services',1),
  ('services','repair-maintenance',2),
  ('services','financial-legal',3),
  ('services','logistics-cargo',4),
  ('services','events-services',5),
  ('services','education-training',6),
  ('services','personal-care-services',7),
  ('services','printing-photography',8),
  ('services','professional-services',9),
  ('services','health-services',10),
  ('services','other-services',999),
  ('sports-leisure','fitness-equipment',1),
  ('sports-leisure','sports-equipment',2),
  ('sports-leisure','outdoor-recreation',3),
  ('sports-leisure','fitness-centers',4),
  ('sports-leisure','books-media',5),
  ('sports-leisure','other-sports-leisure',999),
  ('construction','cement-concrete',1),
  ('construction','steel-metals',2),
  ('construction','wood-timber',3),
  ('construction','plumbing',4),
  ('construction','electrical-lighting',5),
  ('construction','tiles-paint',6),
  ('construction','roofing-doors',7),
  ('construction','construction-tools',8),
  ('construction','other-construction',999),
  ('travel','hotels-guesthouses',1),
  ('travel','resorts-lodges',2),
  ('travel','tours-tickets',3),
  ('travel','restaurants-cafes',4),
  ('travel','attractions',5),
  ('travel','travel-services',6),
  ('travel','other-travel',999),
  ('agriculture-farming','farm-equipment',1),
  ('agriculture-farming','livestock',2),
  ('agriculture-farming','harvested-produce',3),
  ('agriculture-farming','seeds-inputs',4),
  ('agriculture-farming','other-agriculture-farming',999),
  ('pets-animals','dogs-cats',1),
  ('pets-animals','birds-fish',2),
  ('pets-animals','pet-supplies-services',3),
  ('pets-animals','other-pets-animals',999),
  ('babies-kids','kids-clothing',1),
  ('babies-kids','toys-games',2),
  ('babies-kids','baby-gear',3),
  ('babies-kids','other-babies-kids',999),
  ('commercial-equipment','restaurant-equipment',1),
  ('commercial-equipment','medical-equipment',2),
  ('commercial-equipment','office-equipment',3),
  ('commercial-equipment','industrial-equipment',4),
  ('commercial-equipment','other-commercial-equipment',999),
  ('construction','heavy-machinery',500),
  ('agriculture-farming','heavy-machinery',500),
  ('travel','vehicle-hire',500),
  ('services','auto-services',500),
  ('fashion','kids-clothing',500),
  ('services','realtor-services',500),
  ('electronics','repair-maintenance',500),
  ('beauty-personal-care','personal-care-services',500),
  ('services','fitness-centers',500),
  ('commercial-equipment','construction-tools',500),
  ('construction','industrial-equipment',500)
) AS v(parent_slug,child_slug,ord) JOIN public.categories p ON p.slug=v.parent_slug JOIN public.categories c ON c.slug=v.child_slug
ON CONFLICT (parent_id, child_id) DO NOTHING;

-- §3 jobs out of the marketplace (REQ-017a)
UPDATE public.categories SET is_active=false, allow_listings=false WHERE slug IN ('jobs','freelance-contract','full-time-jobs','internships','job-seekers-cvs','part-time-jobs','work-from-home');

-- §4 Amharic names into entity layer. live→approved (human names override U0i provisional); drafts→'edited', never downgrading an approved row
INSERT INTO public.entity_translations (entity_type, entity_id, field, lang_code, value, status)
SELECT 'category', c.id, 'name', 'am', v.am, v.st FROM (VALUES
  ('vehicles','መኪና እና መለዋወጫዎች','approved'),
  ('electronics','ኤሌክትሮኒክስ','approved'),
  ('fashion','አልባሳትና ሻንጣዎች','approved'),
  ('home-garden','ቁሳቁሶችና መሳሪያዎች','approved'),
  ('beauty-personal-care','መዋቢያዎችና የግል እንክብካቤ ምርቶች','approved'),
  ('real-estate','የማይንቀሳቀስ የቤት ንብረት','approved'),
  ('services','አገልግሎቶች','approved'),
  ('sports-leisure','ስፖርት እና መዝናኛ','edited'),
  ('construction','የግንባታ እቃዎችና መሳርያዎች','approved'),
  ('travel','የጉዞ እና ማረፊያ አገልግሎቶች','approved'),
  ('agriculture-farming','እርሻ እና ግብርና','edited'),
  ('pets-animals','የቤት እንስሳት','edited'),
  ('babies-kids','ሕፃናት እና ልጆች','edited'),
  ('commercial-equipment','የንግድ መሣሪያዎች','edited'),
  ('cars','የግል መጠቀሚያ መኪናዎች','approved'),
  ('motorbikes-bicycles','ሞተር ብስክሌቶች እና ብስክሌቶች','edited'),
  ('buses-vans','አውቶቡሶች፣ ቫኖች እና ታክሲዎች','edited'),
  ('trucks-trailers','ትላልቅ የመጓጓዣ መኪናዎች','approved'),
  ('heavy-machinery','ከባድ ማሽነሪዎች','edited'),
  ('vehicle-parts','መለዋወጫዎችና ተጨማሪዎች','edited'),
  ('vehicle-hire','የተሽከርካሪ ኪራይ','edited'),
  ('auto-services','የመኪና አገልግሎቶች','edited'),
  ('phones-tablets','ስልኮች እና ታብሌቶች','edited'),
  ('computers','ኮምፒውተሮች እና ላፕቶፖች','edited'),
  ('tv-video','ቲቪ፣ ቪዲዮ፣ ጨዋታዎች','approved'),
  ('gaming','የቪዲዮ ጌም መጫወቻዎች','edited'),
  ('audio-sound','የድምፅ ሲስተሞች','edited'),
  ('cameras-drones','ካሜራዎች እና ድሮኖች','edited'),
  ('printers-office','ፕሪንተሮች እና የቢሮ ኤሌክትሮኒክስ','edited'),
  ('electronics-accessories','መለዋወጫዎችና ክፍሎች','edited'),
  ('womens-clothing','የሴቶች ልብስ','approved'),
  ('mens-clothing','የወንዶች ልብስ','approved'),
  ('shoes','ጫማዎች','edited'),
  ('bags-luggage','ሻንጣ እና የጉዞ መለዋወጫዎች','approved'),
  ('jewelry-watches','ጌጣጌጥ እና ሰዓቶች','edited'),
  ('traditional-cloth','የባህል ልብስ','edited'),
  ('uniforms','ዩኒፎርሞች','approved'),
  ('kids-clothing','የልጆች እና የሕፃናት ልብስ','edited'),
  ('furniture','የቤት ዕቃዎች','edited'),
  ('appliances','የቤት ውስጥ መገልገያዎች','edited'),
  ('kitchen-dining','የወጥ ቤት እቃዎች','edited'),
  ('home-decor','የቤት ማስዋቢያ','edited'),
  ('garden-outdoor','የአትክልት ስፍራ እና ውጪ','edited'),
  ('skincare','የቆዳ እንክብካቤ','edited'),
  ('haircare','የፀጉር እንክብካቤ እና ዊግ','edited'),
  ('makeup','ሜካፕ','edited'),
  ('fragrances','ሽቶዎች','edited'),
  ('mens-grooming','ወንዶች መላጨት ምርቶች','approved'),
  ('nail-hand-foot','የጥፍር፣ የእጅ እና የእግር እንክብካቤ','edited'),
  ('health-wellness','ፋርማሲ','approved'),
  ('apartments-condos','አፓርታማዎች እና ኮንዶሚኒየሞች','edited'),
  ('houses','ቤቶች እና ታውን ሀውሶች','edited'),
  ('land-plots','መሬት','approved'),
  ('commercial-property','ቢሮ ወይም የችርቻሮ ቦታ','approved'),
  ('short-term-rentals','የአጭር ጊዜ ኪራይ','edited'),
  ('roommates-shared','ጋራ መኖሪያ','edited'),
  ('realtor-services','ሪልቶር እና ተዛማጅ አገልግሎቶች','approved'),
  ('home-services','የቤት እና የጽዳት አገልግሎቶች','edited'),
  ('repair-maintenance','የጥገና እና የጥገና አገልግሎቶች','approved'),
  ('financial-legal','የፋይናንስ አገልግሎቶች','approved'),
  ('logistics-cargo','ሎጂስቲክስ፣ ጭነት እና ማጓጓዣ','edited'),
  ('events-services','የዝግጅት ማደራጀት አገልግሎቶች','approved'),
  ('education-training','ትምህርት እና ስልጠና','approved'),
  ('personal-care-services','የግል እንክብካቤ አገልግሎቶች','edited'),
  ('printing-photography','ህትመት፣ ፎቶ እና ዲዛይን','edited'),
  ('professional-services','ሙያዊ እና የቢሮ አገልግሎቶች','edited'),
  ('health-services','የጤና አገልግሎቶች','edited'),
  ('fitness-equipment','የአካል ብቃት መሣሪያዎች','edited'),
  ('sports-equipment','የስፖርት እቃዎች','edited'),
  ('outdoor-recreation','ካምፒንግ እና ውጪ መዝናኛ','edited'),
  ('fitness-centers','የኩላሊት እና የሆርሞን መድኃኒቶች','approved'),
  ('books-media','የመጻሕፍት መደብር እና የሙዚቃ ሱቆች','approved'),
  ('cement-concrete','ኮንክሪት እና ሜሶነሪ','approved'),
  ('steel-metals','ብረታ ብረት','edited'),
  ('wood-timber','እንጨትና ጣውላ','edited'),
  ('plumbing','የቧንቧ እቃዎች','edited'),
  ('electrical-lighting','የኤሌክትሪክ እና የመብራት ቁሶች','approved'),
  ('tiles-paint','ንጣፎች፣ ቀለም እና ማጠናቀቂያ','edited'),
  ('roofing-doors','ጣሪያ፣ በሮች እና መስኮቶች','edited'),
  ('construction-tools','መሣሪያዎችና የግንባታ ማሽነሪ','edited'),
  ('hotels-guesthouses','ማረፊያ','approved'),
  ('resorts-lodges','ሪዞርቶች እና ሎጆች','edited'),
  ('tours-tickets','ጉብኝቶች፣ ትኬቶች እና ወኪሎች','edited'),
  ('restaurants-cafes','መመገቢያ እና መዝናኛዎች','approved'),
  ('attractions','የመዝናኛ አገልግሎቶች','approved'),
  ('travel-services','ከጉዞ ጋር የተያያዙ አገልግሎቶች እና እቃዎች','approved'),
  ('farm-equipment','የእርሻ መሣሪያዎች','edited'),
  ('livestock','የቀንድ ከብቶች እና ዶሮዎች','edited'),
  ('harvested-produce','እህል፣ ምርት እና ቡና','edited'),
  ('seeds-inputs','ዘር፣ መኖ እና ግብዓቶች','edited'),
  ('dogs-cats','ውሾች እና ድመቶች','edited'),
  ('birds-fish','ወፎች እና ዓሣዎች','edited'),
  ('pet-supplies-services','የቤት እንስሳት ቁሳቁስ','edited'),
  ('toys-games','መጫወቻዎች','edited'),
  ('baby-gear','የሕፃን መገልገያዎች','edited'),
  ('restaurant-equipment','የምግብ ቤት መሣሪያዎች','edited'),
  ('medical-equipment','የሕክምና መሣሪያዎች አቅራቢዎች','approved'),
  ('office-equipment','የቢሮ መሣሪያዎች','edited'),
  ('industrial-equipment','የኢንዱስትሪ ማሽነሪዎች','edited'),
  ('other-vehicles','ሌሎች መኪና እና መለዋወጫዎች','approved'),
  ('other-electronics','ሌሎች ኤሌክትሮኒክስ','approved'),
  ('other-fashion','ሌሎች አልባሳትና ሻንጣዎች','approved'),
  ('other-home-garden','ሌሎች ቁሳቁሶችና መሳሪያዎች','approved'),
  ('other-beauty-personal-care','ሌሎች መዋቢያዎችና የግል እንክብካቤ ምርቶች','approved'),
  ('other-real-estate','ሌሎች የማይንቀሳቀስ የቤት ንብረት','approved'),
  ('other-services','ሌሎች አገልግሎቶች','approved'),
  ('other-sports-leisure','ሌሎች ስፖርት እና መዝናኛ','edited'),
  ('other-construction','ሌሎች የግንባታ እቃዎችና መሳርያዎች','approved'),
  ('other-travel','ሌሎች የጉዞ እና ማረፊያ አገልግሎቶች','approved'),
  ('other-agriculture-farming','ሌሎች እርሻ እና ግብርና','edited'),
  ('other-pets-animals','ሌሎች የቤት እንስሳት','edited'),
  ('other-babies-kids','ሌሎች ሕፃናት እና ልጆች','edited'),
  ('other-commercial-equipment','ሌሎች የንግድ መሣሪያዎች','edited')
) AS v(slug,am,st) JOIN public.categories c ON c.slug=v.slug
ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE SET value=EXCLUDED.value, status=EXCLUDED.status WHERE EXCLUDED.status='approved';

-- §5 L1 offer_type attribute at the narrowest truthful nodes
INSERT INTO public.category_attributes (category_id, name_en, name_am, attr_key, attr_type, options, is_required, display_order)
SELECT id, 'Offer type', 'የቅናሽ አይነት', 'offer-type', 'single_select', '[{"value":"sale","label_en":"For sale","label_am":"ለሽያጭ"},{"value":"rent","label_en":"For rent","label_am":"ለኪራይ"},{"value":"lease","label_en":"Lease","label_am":"በሊዝ"}]'::jsonb, true, 1 FROM public.categories WHERE slug IN ('apartments-condos','houses','land-plots','commercial-property','short-term-rentals','roommates-shared')
ON CONFLICT (category_id, attr_key) DO NOTHING;
INSERT INTO public.category_attributes (category_id, name_en, name_am, attr_key, attr_type, options, is_required, display_order)
SELECT id, 'Offer type', 'የቅናሽ አይነት', 'offer-type', 'single_select', '[{"value":"sale","label_en":"For sale","label_am":"ለሽያጭ"},{"value":"hire","label_en":"For hire","label_am":"ለኪራይ"}]'::jsonb, true, 1 FROM public.categories WHERE slug IN ('cars','buses-vans','trucks-trailers')
ON CONFLICT (category_id, attr_key) DO NOTHING;

-- §6 in-migration proofs (raise on failure)
DO $$
DECLARE n int; BEGIN
  SELECT count(*) INTO n FROM public.category_tree_pointers WHERE parent_id IS NULL AND child_id IN (SELECT id FROM public.categories WHERE is_active); IF n<>14 THEN RAISE EXCEPTION 'root count % <> 14', n; END IF;
  SELECT count(*) INTO n FROM public.categories WHERE is_catchall AND is_active; IF n<>14 THEN RAISE EXCEPTION 'catchall %', n; END IF;
  SELECT count(*) INTO n FROM public.categories c WHERE c.is_active AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.child_id=c.id); IF n>0 THEN RAISE EXCEPTION 'orphans %', n; END IF;
  SELECT count(*) INTO n FROM public.categories WHERE is_active; IF n<>113 THEN RAISE EXCEPTION 'active count % <> 113', n; END IF;
  SELECT count(*) INTO n FROM public.categories WHERE slug='jobs' AND is_active; IF n>0 THEN RAISE EXCEPTION 'jobs still active'; END IF;
  SELECT count(*) INTO n FROM public.categories c WHERE c.is_active AND c.allow_listings=false AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.parent_id IS NULL AND p.child_id=c.id); IF n>0 THEN RAISE EXCEPTION 'non-root allow_listings=false: %', n; END IF;
  SELECT count(*) INTO n FROM public.categories c WHERE c.is_active AND NOT EXISTS (SELECT 1 FROM public.entity_translations t WHERE t.entity_type='category' AND t.entity_id=c.id AND t.field='name' AND t.lang_code='am'); IF n>0 THEN RAISE EXCEPTION 'am coverage gap %', n; END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260903030000') ON CONFLICT DO NOTHING;
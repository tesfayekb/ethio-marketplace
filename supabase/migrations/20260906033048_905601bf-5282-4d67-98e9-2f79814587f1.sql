-- C3a — Attributes completion (donor import), brand-as-attribute, Services-edge flip.
-- Additive only: pre-existing category_attributes rows are preserved byte-identical
-- (ON CONFLICT (category_id, attr_key) DO NOTHING + per-row checksum assertion).

ALTER TABLE public.category_attributes
  ADD COLUMN IF NOT EXISTS is_filterable boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_searchable boolean NOT NULL DEFAULT false;

CREATE TEMP TABLE c3a_before ON COMMIT DROP AS
SELECT id,
       concat_ws(':', id::text, category_id::text, attr_key, attr_type, name_en,
                 coalesce(name_am,''), coalesce(options::text,''), is_required::text,
                 display_order::text, is_filterable::text, is_searchable::text,
                 coalesce(validation::text,''), coalesce(default_value::text,''),
                 inherit_from_parent::text, coalesce(help_text_en,''), coalesce(help_text_am,'')) AS t
FROM public.category_attributes;

-- options_src encodes the option list as value=Label pairs separated by '|'
-- (no donor value or label contains either character; asserted at authoring time).
CREATE TEMP TABLE c3a_import (
  target_slug text NOT NULL,
  attr_key text NOT NULL,
  name_en text NOT NULL,
  attr_type text NOT NULL,
  options_src text,
  is_required boolean NOT NULL,
  is_filterable boolean NOT NULL,
  is_searchable boolean NOT NULL,
  display_order integer NOT NULL,
  inherit_from_parent boolean NOT NULL,
  help_text_en text,
  validation jsonb
) ON COMMIT DROP;

INSERT INTO c3a_import VALUES
('agriculture-farming','equipment_type','Equipment Type','single_select','tractor=Tractor|harvester=Harvester|irrigation=Irrigation|tools=Hand Tools|seeds=Seeds|fertilizer=Fertilizer|produce=Produce|other=Other',false,true,false,1,true,NULL,NULL),
('agriculture-farming','condition','Condition','single_select','new=New|used=Used|refurbished=Refurbished',true,true,false,2,true,NULL,NULL),
('audio-sound','audio_type','Audio Type','single_select','headphones=Headphones|earbuds=Earbuds|speakers=Speakers|soundbar=Soundbar|amplifier=Amplifier|other=Other',true,true,false,1,true,NULL,NULL),
('audio-sound','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('babies-kids','age_range','Age Range','single_select','0-6m=0-6 months|6-12m=6-12 months|1-2y=1-2 years|2-4y=2-4 years|4-8y=4-8 years|8-12y=8-12 years',false,true,false,1,true,NULL,NULL),
('babies-kids','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('babies-kids','gender','Gender','single_select','boy=Boy|girl=Girl|unisex=Unisex',false,true,false,3,true,NULL,NULL),
('baby-gear','furniture_type','Furniture Type','single_select','crib=Crib/Bassinet|changing=Changing Table|dresser=Dresser|rocker=Rocker/Glider|high-chair=High Chair|play-yard=Play Yard|other=Other',true,true,false,1,true,NULL,NULL),
('baby-gear','product_type','Product Type','single_select','stroller=Stroller|car-seat=Car Seat|travel-system=Travel System|booster-seat=Booster Seat|carrier=Carrier|other=Other',true,true,false,1,true,NULL,NULL),
('baby-gear','age_range','Age Range','single_select','newborn=Newborn (0-6 months)|infant=Infant (6-12 months)|toddler=Toddler (1-3 years)|child=Child (3+ years)|convertible=Convertible/Multi-stage',false,true,false,2,true,NULL,NULL),
('baby-gear','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('beauty-personal-care','category_type','Category Type','single_select','skincare=Skincare|makeup=Makeup|haircare=Hair Care|fragrance=Fragrance|wellness=Wellness',true,true,false,1,true,NULL,NULL),
('beauty-personal-care','brand','Brand','text',NULL,false,true,false,2,true,NULL,NULL),
('beauty-personal-care','condition','Condition','single_select','new=New/Sealed|opened=Opened/Used',true,true,false,3,true,NULL,NULL),
('birds-fish','bird_species','Species','single_select','parrot=Parrot|canary=Canary|finch=Finch|lovebird=Lovebird|cockatiel=Cockatiel|budgie=Budgie|other=Other',true,true,true,1,true,NULL,NULL),
('birds-fish','listing_type','Listing Type','single_select','fish=Fish|tank=Aquarium/Tank|equipment=Equipment|supplies=Supplies',true,true,false,1,true,NULL,NULL),
('birds-fish','bird_age','Age','single_select','baby=Baby|young=Young|adult=Adult|unknown=Unknown',false,true,false,2,true,NULL,NULL),
('birds-fish','water_type','Water Type','single_select','freshwater=Freshwater|saltwater=Saltwater|brackish=Brackish',false,true,false,2,true,NULL,NULL),
('cameras-drones','camera_type','Camera Type','single_select','dslr=DSLR|mirrorless=Mirrorless|point_shoot=Point & Shoot|film=Film Camera|action=Action Camera|drone=Drone|lens=Lens|accessory=Accessory',true,true,false,1,true,NULL,NULL),
('cameras-drones','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('cars','battery_range','Battery Range','single_select','under-200=Under 200 km|200-300=200-300 km|300-400=300-400 km|400-500=400-500 km|500-plus=500+ km',false,true,false,1,false,'Estimated range on full charge',NULL),
('cars','make','Make','single_select','acura=Acura|alfa_romeo=Alfa Romeo|aston_martin=Aston Martin|audi=Audi|baic=BAIC|bajaj=Bajaj|bentley=Bentley|bmw=BMW|brilliance=Brilliance|bugatti=Bugatti|buick=Buick|byd=BYD|cadillac=Cadillac|changan=Changan|chery=Chery|chevrolet=Chevrolet|chrysler=Chrysler|citroen=Citroën|dacia=Dacia|daewoo=Daewoo|daihatsu=Daihatsu|datsun=Datsun|dodge=Dodge|dongfeng=Dongfeng|faw=FAW|ferrari=Ferrari|fiat=Fiat|force_motors=Force Motors|ford=Ford|foton=Foton|gac=GAC|geely=Geely|genesis=Genesis|gmc=GMC|great_wall=Great Wall|haval=Haval|higer=Higer|hillman=Hillman|hino=Hino|holden=Holden|honda=Honda|hongqi=Hongqi|hummer=Hummer|hyundai=Hyundai|innoson=Innoson|infiniti=Infiniti|isuzu=Isuzu|iveco=Iveco|jac=JAC|jaguar=Jaguar|jeep=Jeep|jmc=JMC|kia=Kia|king_long=King Long|koenigsegg=Koenigsegg|lada=Lada|lamborghini=Lamborghini|lancia=Lancia|land_rover=Land Rover|lexus=Lexus|lifan=Lifan|lincoln=Lincoln|lotus=Lotus|mahindra=Mahindra|man=MAN|maruti_suzuki=Maruti Suzuki|maserati=Maserati|mazda=Mazda|mclaren=McLaren|mercedes_benz=Mercedes-Benz|mercury=Mercury|mg=MG|mini=Mini|mitsubishi=Mitsubishi|morris=Morris|nissan=Nissan|oldsmobile=Oldsmobile|opel=Opel|peugeot=Peugeot|plymouth=Plymouth|pontiac=Pontiac|porsche=Porsche|proton=Proton|ram=Ram|renault=Renault|rolls_royce=Rolls-Royce|rover=Rover|saab=Saab|samsung=Samsung|scion=Scion|seat=Seat|sinotruk=Sinotruk|skoda=Skoda|smart=Smart|ssangyong=SsangYong|subaru=Subaru|suzuki=Suzuki|tata=Tata|tesla=Tesla|toyota=Toyota|uaz=UAZ|vauxhall=Vauxhall|volkswagen=Volkswagen|volvo=Volvo|wuling=Wuling|yutong=Yutong|zhongtong=Zhongtong|zotye=Zotye|other=Other',true,true,true,1,true,'Select your vehicle manufacturer',NULL),
('cars','charging_type','Charging Type','single_select','level-1=Level 1 (Standard)|level-2=Level 2 (Fast)|dc-fast=DC Fast Charging|tesla=Tesla Supercharger',false,true,false,2,false,'Supported charging method',NULL),
('cars','custom_make','Custom Make','text',NULL,false,true,true,2,true,'Enter your vehicle make if not in the list above',NULL),
('cars','model','Model','single_select','other=Other',true,true,true,3,true,'Model will populate based on selected make',NULL),
('cars','custom_model','Custom Model','text',NULL,false,true,true,4,true,'Enter your vehicle model if not in the list above',NULL),
('cars','mileage_unit','Mileage Unit','single_select','km=Kilometers (km)|miles=Miles (mi)',true,true,false,5,true,'Auto-selected based on your location',NULL),
('cars','mileage_value','Mileage','number',NULL,true,true,true,6,true,'Total distance traveled','{"max":9999999,"min":0}'),
('cars','doors','Number of Doors','single_select','2=2 Doors|3=3 Doors|4=4 Doors|5=5 Doors',true,true,true,7,true,'Auto-selected based on model',NULL),
('cars','body_style','Body Style','single_select','sedan=Sedan|suv=SUV|hatchback=Hatchback|crossover=Crossover|coupe=Coupe|convertible=Convertible|wagon=Wagon/Estate|pickup=Pickup/Truck|van=Van|minivan=Minivan/MPV|suv_coupe=SUV Coupe|sportback=Fastback/Sportback|roadster=Roadster|microcar=Microcar|other=Other',true,true,true,8,true,'Auto-selected based on model',NULL),
('cars','condition','Condition','single_select','brand_new=Brand New|foreign_used=Foreign Used|locally_used=Locally Used|salvage=Salvage/Accident',true,true,false,9,true,'Current condition of the vehicle',NULL),
('cars','fuel_type','Fuel Type','single_select','petrol=Petrol/Gasoline|diesel=Diesel|electric=Electric|hybrid=Hybrid (Petrol)|plug_in_hybrid=Plug-in Hybrid|hydrogen=Hydrogen|cng=CNG (Natural Gas)|lpg=LPG|flex=Flex Fuel|other=Other',true,true,true,9,true,'Auto-selected based on model',NULL),
('cars','exterior_color','Exterior Color','single_select','black=Black|white=White|silver=Silver|gray=Gray|red=Red|blue=Blue|green=Green|brown=Brown/Beige|gold=Gold|orange=Orange|yellow=Yellow|purple=Purple|burgundy=Burgundy/Wine|other=Other',false,true,false,10,true,'Exterior color of the vehicle',NULL),
('cars','range_miles','Range (miles)','number',NULL,false,true,false,10,true,NULL,'{"max":1000,"min":0}'),
('cars','transmission','Transmission','single_select','automatic=Automatic|manual=Manual|cvt=CVT (Continuously Variable)|dct=Dual Clutch (DCT)|amt=Automated Manual (AMT)|semi_automatic=Semi-Automatic|other=Other',true,true,true,10,true,'Auto-selected based on model',NULL),
('cars','battery_kwh','Battery Capacity (kWh)','number',NULL,false,true,false,11,true,NULL,'{"max":500,"min":0}'),
('cars','charging_speed','Charging Speed','single_select','level1=Level 1 (120V)|level2=Level 2 (240V)|dc_fast=DC Fast Charging',false,true,false,12,true,NULL,NULL),
('commercial-equipment','equipment_type','Equipment Type','single_select','office=Office Equipment|restaurant=Restaurant Equipment|medical=Medical Equipment|construction=Construction Equipment|other=Other',true,true,false,1,true,NULL,NULL),
('commercial-equipment','condition','Condition','single_select','new=New|used=Used|refurbished=Refurbished',true,true,false,2,true,NULL,NULL),
('commercial-equipment','warranty','Warranty','boolean',NULL,false,true,false,3,true,NULL,NULL),
('commercial-equipment','power_source','Power Source','single_select','110v=Electric (110V)|220v=Electric (220V)|gas=Gas|battery=Battery|manual=Manual',false,true,false,40,true,NULL,NULL),
('commercial-property','commercial_type','Commercial Type','single_select','office=Office Space|retail=Retail/Shop|warehouse=Warehouse|industrial=Industrial|restaurant=Restaurant/Cafe|showroom=Showroom',false,true,false,10,true,'Type of commercial property',NULL),
('commercial-property','parking_spaces','Parking Spaces','number',NULL,false,true,false,11,true,'Number of parking spots',NULL),
('commercial-property','loading_dock','Loading Dock','boolean',NULL,false,true,false,12,true,'Has loading dock for deliveries?',NULL),
('computers','computer_brand','Brand','single_select','apple=Apple|dell=Dell|hp=HP|lenovo=Lenovo|asus=Asus|acer=Acer|microsoft=Microsoft|msi=MSI|samsung=Samsung|lg=LG|custom=Custom Build|other=Other',true,true,false,0,true,'Computer manufacturer',NULL),
('computers','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair|refurbished=Refurbished|for_parts=For Parts',true,true,false,1,true,'Select the condition of your computer or component',NULL),
('computers','desktop_form_factor','Form Factor','single_select','tower=Tower|mini-pc=Mini PC|all-in-one=All-in-One|workstation=Workstation',false,true,false,1,true,NULL,NULL),
('computers','item_type','Item Type','single_select','computer=Computer|accessory=Accessory|component=Component|software=Software|other=Other',false,true,false,1,true,NULL,NULL),
('computers','processor','Processor','text',NULL,false,true,false,1,true,NULL,NULL),
('computers','screen_size','Screen Size','single_select','11-12=11-12 inch|13-14=13-14 inch|15-16=15-16 inch|17+=17+ inch',false,true,false,1,true,NULL,NULL),
('computers','ram','RAM','single_select','4gb=4 GB|8gb=8 GB|16gb=16 GB|32gb=32 GB|64gb=64 GB+',false,true,false,2,true,NULL,NULL),
('computers','storage','Storage','single_select','128gb=128 GB|256gb=256 GB|512gb=512 GB|1tb=1 TB|2tb=2 TB+',false,true,false,3,true,NULL,NULL),
('computers','graphics_card','Graphics Card','text',NULL,false,true,false,4,true,NULL,NULL),
('construction-tools','equipment_type','Equipment Type','single_select','excavator=Excavator|bulldozer=Bulldozer|crane=Crane|mixer=Concrete Mixer|scaffolding=Scaffolding|power-tools=Power Tools|other=Other',true,true,false,1,true,NULL,NULL),
('construction-tools','condition','Condition','single_select','new=New|excellent=Used - Excellent|good=Used - Good|fair=Used - Fair|parts=For Parts',true,true,false,2,true,NULL,NULL),
('dogs-cats','cat_breed','Breed','text',NULL,true,true,true,1,true,NULL,NULL),
('dogs-cats','dog_breed','Breed','text',NULL,true,true,true,1,true,NULL,NULL),
('dogs-cats','cat_age','Age','single_select','kitten-0-1-year=Kitten (0-1 year)|young-1-3-years=Young (1-3 years)|adult-3-7-years=Adult (3-7 years)|senior-7-years=Senior (7+ years)',true,true,false,2,true,NULL,NULL),
('dogs-cats','dog_age','Age','single_select','puppy-0-1-year=Puppy (0-1 year)|young-1-3-years=Young (1-3 years)|adult-3-7-years=Adult (3-7 years)|senior-7-years=Senior (7+ years)',true,true,false,2,true,NULL,NULL),
('dogs-cats','cat_gender','Gender','single_select','male=Male|female=Female',true,true,false,3,true,NULL,NULL),
('dogs-cats','dog_gender','Gender','single_select','male=Male|female=Female',true,true,false,3,true,NULL,NULL),
('dogs-cats','cat_health','Health Status','single_select','vaccinated=Vaccinated|dewormed=Dewormed|spayed-neutered=Spayed/Neutered|microchipped=Microchipped|vet-checked=Vet Checked',false,true,false,40,false,NULL,NULL),
('dogs-cats','dog_health','Health Status','single_select','vaccinated=Vaccinated|dewormed=Dewormed|spayed-neutered=Spayed/Neutered|microchipped=Microchipped|vet-checked=Vet Checked',false,true,false,40,false,NULL,NULL),
('education-training','service_type','Service Type','single_select','tutoring=Tutoring|language=Language Classes|music=Music Lessons|professional=Professional Training|test-prep=Test Prep|other=Other',true,true,false,1,true,NULL,NULL),
('education-training','delivery_method','Delivery Method','single_select','in-person=In-Person|online=Online|both=Both',false,true,false,2,true,NULL,NULL),
('electronics','brand','Brand','text',NULL,true,true,false,1,true,NULL,NULL),
('electronics','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair|parts=For Parts',true,true,false,2,true,NULL,NULL),
('electronics','warranty','Warranty','boolean',NULL,false,true,false,3,true,NULL,NULL),
('electronics-accessories','component_type','Component Type','single_select','cpu=CPU|gpu=GPU|ram=RAM|ssd=SSD|hdd=HDD|motherboard=Motherboard|power-supply=Power Supply|cooling=Cooling|case=Case|other=Other',false,true,true,1,true,NULL,NULL),
('electronics-accessories','computer_accessory_type','Accessory Type','single_select','keyboard=Keyboard|mouse=Mouse|monitor=Monitor|webcam=Webcam|headset=Headset|usb-hub=USB Hub|docking-station=Docking Station|other=Other',false,true,true,1,true,NULL,NULL),
('electronics-accessories','phone_accessory_type','Accessory Type','single_select','case=Case|screen-protector=Screen Protector|charger=Charger|cable=Cable|earphones=Earphones|power-bank=Power Bank|holder=Holder|other=Other',false,true,true,1,true,NULL,NULL),
('electronics-accessories','compatible_brand','Compatible Brand','single_select','apple=Apple|samsung=Samsung|huawei=Huawei|xiaomi=Xiaomi|oneplus=OnePlus|universal=Universal|other=Other',false,true,true,2,true,NULL,NULL),
('farm-equipment','equipment_type','Equipment Type','single_select','tractor=Tractor|harvester=Harvester|plow=Plow|irrigation=Irrigation System|sprayer=Sprayer|seeder=Seeder|other=Other',true,true,false,1,true,NULL,NULL),
('farm-equipment','condition','Condition','single_select','new=New|excellent=Used - Excellent|good=Used - Good|fair=Used - Fair|parts=For Parts',true,true,false,2,true,NULL,NULL),
('farm-equipment','horsepower','Horsepower','single_select','under-50=Under 50 HP|50-100=50-100 HP|100-150=100-150 HP|150-200=150-200 HP|200plus=200+ HP',false,true,false,30,false,NULL,NULL),
('fashion','size','Size','single_select','xs=XS|s=S|m=M|l=L|xl=XL|xxl=XXL',false,true,false,1,true,NULL,NULL),
('fashion','color','Color','multi_select','black=Black|white=White|red=Red|blue=Blue|green=Green|yellow=Yellow|pink=Pink|purple=Purple|orange=Orange|gray=Gray|brown=Brown|multi=Multi-color',false,true,false,2,true,NULL,NULL),
('fashion','material','Material','text',NULL,false,true,false,3,true,NULL,NULL),
('fashion','condition','Condition','single_select','new_with_tags=New with Tags|new_without_tags=New without Tags|like_new=Like New|good=Good|fair=Fair',true,true,false,4,true,NULL,NULL),
('fitness-equipment','equipment_type','Equipment Type','single_select','cardio=Cardio Machine|weights=Strength/Weights|yoga=Yoga/Pilates|accessories=Accessories|apparel=Apparel|other=Other',true,true,false,1,true,NULL,NULL),
('fitness-equipment','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('fitness-equipment','weight_capacity','Weight Capacity','single_select','100kg=Up to 100 kg|150kg=Up to 150 kg|200kg=Up to 200 kg|200plus=200+ kg',false,true,false,20,false,'Maximum user weight supported',NULL),
('fragrances','fragrance_type','Fragrance Type','single_select','edp=Eau de Parfum|edt=Eau de Toilette|edc=Eau de Cologne|body-mist=Body Mist|oil=Perfume Oil|set=Gift Set',true,true,false,1,true,NULL,NULL),
('fragrances','fragrance_gender','For','single_select','women=Women|men=Men|unisex=Unisex',true,true,false,2,true,NULL,NULL),
('fragrances','fragrance_size','Size','single_select','travel=Travel Size (< 30ml)|small=Small (30-50ml)|medium=Medium (50-100ml)|large=Large (> 100ml)',false,true,false,3,true,NULL,NULL),
('furniture','furniture_type','Furniture Type','single_select','sofa=Sofa|bed=Bed|table=Table|chair=Chair|desk=Desk|cabinet=Cabinet|shelf=Shelf|wardrobe=Wardrobe|other=Other',true,true,true,1,true,NULL,NULL),
('furniture','furniture_material','Material','single_select','wood=Wood|metal=Metal|fabric=Fabric|leather=Leather|glass=Glass|plastic=Plastic|mixed=Mixed',false,true,false,2,true,NULL,NULL),
('furniture','furniture_room','Room','single_select','living-room=Living Room|bedroom=Bedroom|dining-room=Dining Room|office=Office|outdoor=Outdoor|kids-room=Kids Room|other=Other',false,true,false,3,true,NULL,NULL),
('furniture','furniture_style','Style','single_select','modern=Modern|traditional=Traditional|contemporary=Contemporary|rustic=Rustic|industrial=Industrial|scandinavian=Scandinavian|mid-century=Mid-Century|bohemian=Bohemian',false,true,false,30,false,NULL,NULL),
('garden-outdoor','garden_item_type','Item Type','single_select','plants=Plants|garden-furniture=Garden Furniture|tools=Tools|planters=Planters|decor=Decor|lighting=Lighting|irrigation=Irrigation|other=Other',true,true,true,1,true,NULL,NULL),
('garden-outdoor','plant_type','Plant Type','single_select','indoor=Indoor Plants|outdoor=Outdoor Plants|succulents=Succulents|flowering=Flowering|trees=Trees/Shrubs|herbs=Herbs/Vegetables',false,true,false,20,false,NULL,NULL),
('haircare','product_type','Product Type','single_select','shampoo=Shampoo|conditioner=Conditioner|treatment=Hair Treatment|styling=Styling Product|color=Hair Color|tools=Hair Tools|other=Other',true,true,false,1,true,NULL,NULL),
('haircare','hair_type','Hair Type','single_select','all=All Hair Types|straight=Straight|wavy=Wavy|curly=Curly|coily=Coily',false,true,false,2,true,NULL,NULL),
('harvested-produce','produce_type','Produce Type','single_select','grains=Grains|vegetables=Vegetables|fruits=Fruits|coffee-tea=Coffee/Tea|spices=Spices|other=Other',true,true,false,1,true,NULL,NULL),
('health-wellness','product_type','Product Type','single_select','vitamins=Vitamins & Supplements|fitness-equipment=Fitness Equipment|yoga-meditation=Yoga & Meditation|massage-recovery=Massage & Recovery|health-monitors=Health Monitors|other=Other',true,true,false,1,true,NULL,NULL),
('home-decor','item_type','Item Type','single_select','wall-art=Wall Art|rugs=Rugs|lighting=Lighting|curtains=Curtains/Blinds|mirrors=Mirrors|vases=Vases/Planters|other=Other',true,true,false,1,true,NULL,NULL),
('home-decor','condition','Condition','single_select','new=New|like-new=Like New|good=Good|vintage=Vintage',false,true,false,2,true,NULL,NULL),
('home-garden','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair|for_parts=For Parts',true,true,false,1,true,NULL,NULL),
('home-garden','room','Room','single_select','living=Living Room|bedroom=Bedroom|kitchen=Kitchen|bathroom=Bathroom|outdoor=Outdoor|office=Office|other=Other',false,true,false,2,true,NULL,NULL),
('home-services','service_type','Service Type','single_select','cleaning=Cleaning|plumbing=Plumbing|electrical=Electrical|painting=Painting|landscaping=Landscaping|moving=Moving|handyman=Handyman|other=Other',true,true,false,1,true,NULL,NULL),
('home-services','availability','Availability','single_select','weekdays=Weekdays|weekends=Weekends|evenings=Evenings|emergency=24/7 Emergency|appointment=By Appointment',false,true,false,20,false,NULL,NULL),
('houses','lot_size_sqm','Lot Size','number',NULL,false,true,false,10,true,'Land area in square meters',NULL),
('houses','year_built','Year Built','number',NULL,false,true,false,11,true,'Year the house was constructed',NULL),
('houses','parking_spaces','Parking Spaces','number',NULL,false,true,false,12,true,'Number of parking spots',NULL),
('houses','stories','Stories','number',NULL,false,true,false,13,true,'Number of floors/levels',NULL),
('jewelry-watches','accessory_type','Accessory Type','single_select','watch=Watch|bag=Bag|belt=Belt|wallet=Wallet|sunglasses=Sunglasses|jewelry=Jewelry|hat=Hat|scarf=Scarf|other=Other',true,true,true,1,true,NULL,NULL),
('kids-clothing','baby_size','Size','single_select','newborn=Newborn|0-3-months=0-3 months|3-6-months=3-6 months|6-12-months=6-12 months|12-18-months=12-18 months|18-24-months=18-24 months',true,true,false,1,true,NULL,NULL),
('kids-clothing','kids_size','Size','single_select','2t=2T|3t=3T|4t=4T|5-6=5-6|7-8=7-8|9-10=9-10|11-12=11-12|13-14=13-14',true,true,false,1,true,NULL,NULL),
('kids-clothing','baby_gender','Gender','single_select','boy=Boy|girl=Girl|unisex=Unisex',true,true,false,2,true,NULL,NULL),
('kids-clothing','kids_gender','Gender','single_select','boy=Boy|girl=Girl|unisex=Unisex',true,true,false,2,true,NULL,NULL),
('kitchen-dining','item_type','Item Type','single_select','cookware=Cookware|appliances=Small Appliances|dinnerware=Dinnerware|storage=Storage|utensils=Utensils|other=Other',true,true,false,1,true,NULL,NULL),
('kitchen-dining','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',false,true,false,2,true,NULL,NULL),
('land-plots','zoning','Zoning / Land Use','single_select','residential=Residential|commercial=Commercial|agricultural=Agricultural|industrial=Industrial|mixed-use=Mixed Use|recreational=Recreational',true,true,false,1,false,'What is the land zoned for?',NULL),
('land-plots','lot_size','Lot Size','number',NULL,true,true,false,3,false,'Size in square meters','{"min":1}'),
('land-plots','land_use','Land Use','single_select','residential=Residential|commercial=Commercial|agricultural=Agricultural|industrial=Industrial|mixed=Mixed Use',false,true,false,10,true,'Permitted land use type',NULL),
('land-plots','title_status','Title Status','single_select','freehold=Freehold|leasehold=Leasehold|pending=Title Pending',false,true,false,11,true,'Land ownership type',NULL),
('land-plots','road_access','Road Access','boolean',NULL,false,true,false,12,true,'Does the plot have road access?',NULL),
('land-plots','utilities_available','Utilities Available','boolean',NULL,false,true,false,13,true,'Are water and electricity available?',NULL),
('livestock','livestock_type','Animal Type','single_select','cattle=Cattle|sheep=Sheep|goat=Goat|pig=Pig|poultry=Poultry|horse=Horse|other=Other',true,true,true,1,true,NULL,NULL),
('livestock','livestock_purpose','Purpose','single_select','breeding=Breeding|meat=Meat|dairy=Dairy|eggs=Eggs|wool=Wool|work=Work|pet=Pet',false,true,false,2,true,NULL,NULL),
('makeup','makeup_type','Product Type','single_select','foundation=Foundation|concealer=Concealer|powder=Powder|blush=Blush|bronzer=Bronzer|highlighter=Highlighter|lips=Lipstick/Lip Gloss|mascara=Mascara|eyeliner=Eyeliner|eyeshadow=Eyeshadow|brows=Brow Products|tools=Makeup Tools|set=Set/Palette',true,true,true,1,true,NULL,NULL),
('medical-equipment','equipment_type','Equipment Type','single_select','diagnostic=Diagnostic Equipment|surgical=Surgical Equipment|patient-care=Patient Care|mobility=Mobility Aids|lab=Laboratory Equipment|other=Other',true,true,false,1,true,NULL,NULL),
('medical-equipment','condition','Condition','single_select','new=New|refurbished=Refurbished|good=Used - Good|fair=Used - Fair',true,true,false,2,true,NULL,NULL),
('medical-equipment','certification','Certification','single_select','fda=FDA Approved|ce=CE Marked|iso=ISO Certified|none=Not Certified',false,true,false,30,false,NULL,NULL),
('mens-clothing','clothing_gender','Gender','single_select','men=Men|unisex=Unisex',true,true,false,0,false,NULL,NULL),
('mens-clothing','clothing_type','Clothing Type','single_select','shirts=Shirts|pants=Pants|jackets=Jackets & Coats|suits=Suits|activewear=Activewear|traditional=Traditional|underwear=Underwear|other=Other',true,true,false,1,false,NULL,NULL),
('mens-clothing','mens_size','Size','single_select','xs=XS|s=S|m=M|l=L|xl=XL|xxl=XXL|xxxl=XXXL',true,true,false,1,true,NULL,NULL),
('mens-clothing','mens_clothing_type','Clothing Type','single_select','shirt=Shirt|t-shirt=T-Shirt|pants=Pants|jeans=Jeans|jacket=Jacket|suit=Suit|sweater=Sweater|shorts=Shorts|other=Other',true,true,true,2,true,NULL,NULL),
('motorbikes-bicycles','engine_cc','Engine Size','single_select','under250=Under 250cc|250-500=250-500cc|500-750=500-750cc|750-1000=750-1000cc|over1000=Over 1000cc',true,true,false,1,true,NULL,NULL),
('motorbikes-bicycles','bike_type','Type','single_select','sport=Sport|cruiser=Cruiser|touring=Touring|dual_sport=Dual Sport|scooter=Scooter',true,true,false,2,true,NULL,NULL),
('motorbikes-bicycles','license_class','License Class','single_select','light=Light Motorcycle (Under 125cc)|medium=Medium Motorcycle (125-400cc)|heavy=Heavy Motorcycle (400cc+)',false,true,false,3,false,'License class required to ride',NULL),
('office-equipment','equipment_type','Equipment Type','single_select','desk=Desk|chair=Chair|printer=Printer/Scanner|shredder=Shredder|filing=Filing Cabinet|other=Other',true,true,false,1,true,NULL,NULL),
('office-equipment','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('outdoor-recreation','activity_type','Activity Type','single_select','camping=Camping|hiking=Hiking|fishing=Fishing|hunting=Hunting|water-sports=Water Sports|cycling=Cycling|winter-sports=Winter Sports|golf=Golf|other=Other',true,true,false,1,true,NULL,NULL),
('pet-supplies-services','service_type','Service Type','single_select','grooming=Pet Grooming|sitting=Pet Sitting|walking=Dog Walking|training=Pet Training|veterinary=Veterinary Services|boarding=Pet Boarding|transportation=Pet Transportation|other=Other',true,true,false,1,true,NULL,NULL),
('pet-supplies-services','supply_type','Supply Type','single_select','food=Food|treats=Treats|toys=Toys|beds=Beds/Housing|grooming=Grooming|health=Health/Wellness|other=Other',true,true,false,1,true,NULL,NULL),
('pet-supplies-services','pet_type','For Pet Type','single_select','dog=Dog|cat=Cat|bird=Bird|fish=Fish|small-animal=Small Animal|universal=Universal',true,true,false,2,true,NULL,NULL),
('pet-supplies-services','service_area','Service Area','single_select','in-home=In-Home|facility=At Facility|mobile=Mobile|online=Online/Virtual',false,true,false,20,false,NULL,NULL),
('pets-animals','animal_type','Animal Type','single_select','dog=Dog|cat=Cat|bird=Bird|fish=Fish|livestock=Livestock|other=Other',true,true,false,1,true,NULL,NULL),
('pets-animals','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair',true,true,false,1,true,'Select the condition of your pet supply item',NULL),
('pets-animals','age','Age','text',NULL,false,false,false,2,true,NULL,NULL),
('pets-animals','breed','Breed','text',NULL,false,true,false,3,true,NULL,NULL),
('phones-tablets','brand','Brand','single_select','apple=Apple|samsung=Samsung|xiaomi=Xiaomi|huawei=Huawei|oppo=Oppo|vivo=Vivo|tecno=Tecno|infinix=Infinix|other=Other',true,true,false,1,true,NULL,NULL),
('phones-tablets','feature_phone_type','Phone Type','single_select','bar-phone=Bar Phone|flip-phone=Flip Phone|slider=Slider',false,true,false,1,true,NULL,NULL),
('phones-tablets','tablet_storage','Storage','single_select','16gb=16GB|32gb=32GB|64gb=64GB|128gb=128GB|256gb=256GB|512gb=512GB|1tb=1TB+',false,true,false,1,true,NULL,NULL),
('phones-tablets','ram','RAM','single_select','2gb=2GB|4gb=4GB|6gb=6GB|8gb=8GB|12gb=12GB|16gb-plus=16GB+',false,true,false,2,true,NULL,NULL),
('phones-tablets','storage','Storage','single_select','16gb=16 GB|32gb=32 GB|64gb=64 GB|128gb=128 GB|256gb=256 GB|512gb=512 GB|1tb=1 TB',false,true,false,2,true,NULL,NULL),
('phones-tablets','tablet_screen_size','Screen Size','single_select','7-8-inch=7-8 inch|9-10-inch=9-10 inch|11-12-inch=11-12 inch|13-inch=13 inch+',false,true,false,2,true,NULL,NULL),
('phones-tablets','condition','Condition','single_select','new=New|like-new=Like New|good=Good|fair=Fair',true,true,false,3,true,NULL,NULL),
('phones-tablets','network','Network','single_select','unlocked=Unlocked|carrier-locked=Carrier Locked',false,true,false,3,true,NULL,NULL),
('phones-tablets','tablet_connectivity','Connectivity','single_select','wifi-only=WiFi Only|wifi-cellular=WiFi + Cellular',false,true,false,3,true,NULL,NULL),
('professional-services','service_type','Service Type','single_select','photography=Photography|videography=Videography|design=Graphic Design|web=Web Development|writing=Writing/Content|audio=Music/Audio|other=Other',true,true,false,1,true,NULL,NULL),
('real-estate','property_type','Property Type','single_select','house=House|apartment=Apartment|condo=Condo|villa=Villa|townhouse=Townhouse|studio=Studio|penthouse=Penthouse|commercial=Commercial|land=Land',true,true,false,1,true,NULL,NULL),
('real-estate','bedrooms','Bedrooms','number',NULL,true,true,false,2,true,NULL,'{"max":20,"min":0}'),
('real-estate','bathrooms','Bathrooms','number',NULL,true,true,false,3,true,NULL,'{"max":10,"min":0}'),
('real-estate','size_sqm','Size (sqm)','number',NULL,false,true,false,4,true,NULL,'{"min":1}'),
('real-estate','furnished','Furnished','boolean',NULL,false,true,false,5,true,NULL,NULL),
('repair-maintenance','service_type','Service Type','single_select','screen-repair=Screen Repair|battery=Battery Replacement|water-damage=Water Damage|software=Software Issues|charging-port=Charging Port|speaker-mic=Speaker/Mic Repair|unlocking=Unlocking|data-recovery=Data Recovery|other=Other',false,true,false,1,true,NULL,NULL),
('restaurant-equipment','equipment_type','Equipment Type','single_select','cooking=Cooking Equipment|refrigeration=Refrigeration|prep=Food Prep|display=Display/Serving|pos=POS System|furniture=Furniture|other=Other',true,true,false,1,true,NULL,NULL),
('restaurant-equipment','condition','Condition','single_select','new=New|excellent=Used - Excellent|good=Used - Good|fair=Used - Fair',true,true,false,2,true,NULL,NULL),
('restaurant-equipment','restaurant_cert','Certification','single_select','nsf=NSF Certified|ul=UL Listed|energy-star=Energy Star|none=Not Certified',false,true,false,30,false,NULL,NULL),
('roommates-shared','room_type','Room Type','single_select','private=Private Room|shared=Shared Room|entire=Entire Place',true,true,false,1,true,NULL,NULL),
('roommates-shared','gender_preference','Gender Preference','single_select','any=Any|female=Female Only|male=Male Only',false,true,false,2,true,NULL,NULL),
('roommates-shared','furnished','Furnished','single_select','furnished=Furnished|unfurnished=Unfurnished|partial=Partially Furnished',false,true,false,3,true,NULL,NULL),
('seeds-inputs','feed_type','Feed Type','single_select','cattle=Cattle Feed|poultry=Poultry Feed|sheep-goat=Sheep/Goat Feed|horse=Horse Feed|fish=Fish Feed|other=Other',true,true,false,1,true,NULL,NULL),
('seeds-inputs','plant_type','Plant Type','single_select','vegetable-seeds=Vegetable Seeds|flower-seeds=Flower Seeds|herb-seeds=Herb Seeds|fruit-seeds=Fruit Seeds|tree-seedlings=Tree Seedlings|indoor-plants=Indoor Plants|outdoor-plants=Outdoor Plants|succulents=Succulents|other=Other',true,true,false,1,true,NULL,NULL),
('seeds-inputs','product_type','Product Type','single_select','fertilizer=Fertilizer|pesticide=Pesticide|herbicide=Herbicide|fungicide=Fungicide|organic=Organic|other=Other',true,true,false,1,true,NULL,NULL),
('seeds-inputs','package_size','Package Size','single_select','small=Small (1-5 kg/L)|medium=Medium (5-25 kg/L)|large=Large (25-50 kg/L)|bulk=Bulk (50+ kg/L)',false,true,false,20,false,NULL,NULL),
('seeds-inputs','quantity_unit','Quantity Unit','single_select','seed=Per Seed|packet=Per Packet|kg=Per Kilogram|plant=Per Plant/Seedling|bunch=Per Bunch',false,true,false,20,false,NULL,NULL),
('seeds-inputs','application_type','Application Type','single_select','soil=Soil Application|foliar=Foliar Spray|drip=Drip/Irrigation|seed=Seed Treatment',false,true,false,30,false,NULL,NULL),
('seeds-inputs','growing_season','Growing Season','single_select','all-year=All Year|spring=Spring|summer=Summer|fall=Fall|winter=Winter',false,true,false,30,false,NULL,NULL),
('services','service_type','Service Type','single_select','one_time=One-time|recurring=Recurring|project=Project-based',false,true,false,1,true,NULL,NULL),
('services','duration','Duration','single_select','hourly=Hourly|daily=Daily|weekly=Weekly|monthly=Monthly|custom=Custom',false,true,false,2,true,NULL,NULL),
('services','remote_available','Remote Available','boolean',NULL,false,true,false,3,true,NULL,NULL),
('services','experience_level','Experience Level','single_select','entry=Entry Level|intermediate=Intermediate|expert=Expert',false,true,false,4,true,NULL,NULL),
('services','pricing_type','Pricing Type','single_select','hourly=Hourly Rate|fixed=Fixed Price|quote=Free Quote|negotiable=Negotiable',false,true,false,50,true,NULL,NULL),
('shoes','shoe_size','Shoe Size','single_select','35=35|36=36|37=37|38=38|39=39|40=40|41=41|42=42|43=43|44=44|45=45|46=46|47=47+',true,true,false,1,true,NULL,NULL),
('shoes','shoe_type','Shoe Type','single_select','sneakers=Sneakers|boots=Boots|sandals=Sandals|heels=Heels|loafers=Loafers|athletic=Athletic|formal=Formal|other=Other',true,true,true,2,true,NULL,NULL),
('shoes','shoe_gender','Gender','single_select','men=Men|women=Women|unisex=Unisex|kids=Kids',true,true,false,3,true,NULL,NULL),
('short-term-rentals','property_type','Property Type','single_select','apartment=Apartment|house=House|room=Room|guest-house=Guest House|hotel=Hotel/Hostel',true,true,false,1,true,NULL,NULL),
('short-term-rentals','rental_duration','Rental Duration','single_select','daily=Daily|weekly=Weekly|monthly=Monthly',false,true,false,2,true,NULL,NULL),
('short-term-rentals','bedrooms','Bedrooms','single_select','studio=Studio|1=1|2=2|3=3|4-plus=4+',false,true,false,3,true,NULL,NULL),
('skincare','skincare_type','Product Type','single_select','cleanser=Cleanser|moisturizer=Moisturizer|serum=Serum|toner=Toner|sunscreen=Sunscreen|mask=Face Mask|eye-cream=Eye Cream|exfoliator=Exfoliator|acne=Acne Treatment|anti-aging=Anti-Aging|set=Set/Kit',true,true,true,1,true,NULL,NULL),
('skincare','skin_type','Skin Type','single_select','all=All Skin Types|oily=Oily|dry=Dry|combination=Combination|sensitive=Sensitive|normal=Normal',false,true,false,2,true,NULL,NULL),
('sports-equipment','sport_type','Sport','single_select','football=Football|basketball=Basketball|tennis=Tennis|golf=Golf|swimming=Swimming|cycling=Cycling|running=Running|yoga=Yoga|other=Other',true,true,true,1,true,NULL,NULL),
('sports-equipment','equipment_type','Equipment Type','single_select','ball=Ball|racket=Racket|shoes=Shoes|clothing=Clothing|weights=Weights|machine=Machine|accessory=Accessory|other=Other',false,true,true,2,true,NULL,NULL),
('sports-leisure','sport','Sport','single_select','running=Running|cycling=Cycling|swimming=Swimming|basketball=Basketball|soccer=Soccer|tennis=Tennis|golf=Golf|fitness=Fitness|other=Other',false,true,false,1,true,NULL,NULL),
('sports-leisure','condition','Condition','single_select','new=New|like_new=Like New|good=Good|fair=Fair',true,true,false,2,true,NULL,NULL),
('sports-leisure','sports_brand','Brand','text',NULL,false,true,false,30,true,NULL,NULL),
('toys-games','toy_type','Toy Type','single_select','educational=Educational|action-figures=Action Figures|dolls=Dolls|building-blocks=Building Blocks|puzzles=Puzzles|board-games=Board Games|outdoor=Outdoor|electronic=Electronic|other=Other',true,true,true,1,true,NULL,NULL),
('toys-games','toy_age_range','Age Range','single_select','0-2-years=0-2 years|3-5-years=3-5 years|6-8-years=6-8 years|9-12-years=9-12 years|13=13+',true,true,false,2,true,NULL,NULL),
('trucks-trailers','bed_length','Bed Length','single_select','short=Short Bed (5-6 ft)|standard=Standard Bed (6-7 ft)|long=Long Bed (8+ ft)',false,true,false,1,true,NULL,NULL),
('trucks-trailers','cab_type','Cab Type','single_select','regular=Regular Cab|extended=Extended Cab|crew=Crew Cab',false,true,false,2,true,NULL,NULL),
('vehicle-parts','part_type','Part Type','single_select','engine-parts=Engine Parts|brake-parts=Brake Parts|suspension=Suspension|electrical=Electrical|body-parts=Body Parts|interior-parts=Interior Parts|tires-wheels=Tires & Wheels|accessories=Accessories|other=Other',false,true,false,1,true,NULL,NULL),
('vehicle-parts','compatible_make','Compatible Make','text',NULL,false,true,false,2,true,NULL,NULL),
('vehicles','make','Make','single_select','toyota=Toyota|honda=Honda|ford=Ford|chevrolet=Chevrolet|bmw=BMW|mercedes=Mercedes-Benz|audi=Audi|volkswagen=Volkswagen|nissan=Nissan|hyundai=Hyundai|other=Other',true,true,false,1,true,NULL,NULL),
('vehicles','condition','Condition','single_select','new=New|used=Used|certified=Certified Pre-Owned',true,true,false,5,true,NULL,NULL),
('womens-clothing','clothing_gender','Gender','single_select','women=Women|unisex=Unisex',true,true,false,0,false,NULL,NULL),
('womens-clothing','clothing_type','Clothing Type','single_select','dresses=Dresses|tops=Tops & Blouses|bottoms=Pants & Skirts|jackets=Jackets & Coats|activewear=Activewear|traditional=Traditional|underwear=Underwear & Lingerie|other=Other',true,true,false,1,false,NULL,NULL),
('womens-clothing','womens_size','Size','single_select','xs=XS|s=S|m=M|l=L|xl=XL|xxl=XXL|plus-size=Plus Size',true,true,false,1,true,NULL,NULL),
('womens-clothing','womens_clothing_type','Clothing Type','single_select','dress=Dress|top=Top|blouse=Blouse|pants=Pants|skirt=Skirt|jacket=Jacket|sweater=Sweater|other=Other',true,true,true,2,true,NULL,NULL)
;

DO $$
DECLARE bad integer;
BEGIN
  SELECT count(*) INTO bad FROM c3a_import
   WHERE attr_type NOT IN ('text','number','single_select','multi_select','boolean','date','range');
  IF bad > 0 THEN RAISE EXCEPTION 'C3a: % rows carry an unmapped attribute type', bad; END IF;
  SELECT count(*) INTO bad FROM c3a_import i
   WHERE NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = i.target_slug AND c.is_active);
  IF bad > 0 THEN RAISE EXCEPTION 'C3a: % rows target a missing or inactive category', bad; END IF;
  SELECT count(*) INTO bad FROM c3a_import
   WHERE (attr_type IN ('single_select','multi_select')) <> (options_src IS NOT NULL);
  IF bad > 0 THEN RAISE EXCEPTION 'C3a: % rows violate the options-shape law', bad; END IF;
END $$;

INSERT INTO public.category_attributes
  (category_id, attr_key, name_en, attr_type, options, is_required, is_filterable,
   is_searchable, display_order, inherit_from_parent, help_text_en, validation)
SELECT c.id, i.attr_key, i.name_en, i.attr_type,
       CASE WHEN i.options_src IS NULL THEN NULL ELSE (
         SELECT jsonb_agg(jsonb_build_object(
                  'value', split_part(p, '=', 1),
                  'label_en', substr(p, position('=' in p) + 1),
                  'label_am', NULL) ORDER BY ord)
           FROM unnest(string_to_array(i.options_src, '|')) WITH ORDINALITY AS u(p, ord)
       ) END,
       i.is_required, i.is_filterable, i.is_searchable, i.display_order,
       i.inherit_from_parent, i.help_text_en, i.validation
FROM c3a_import i
JOIN public.categories c ON c.slug = i.target_slug
ON CONFLICT (category_id, attr_key) DO NOTHING;

-- THE FLIP: the Services edge becomes the roster's parent pick (lowest display_order)
-- for the three service leaves that also hang under a goods root. Idempotent swap.
DO $$
DECLARE r record; svc record; other record; tmp integer;
BEGIN
  FOR r IN SELECT id, slug FROM public.categories
            WHERE slug IN ('auto-services','realtor-services','fitness-centers') ORDER BY slug LOOP
    SELECT tp.id, tp.display_order INTO svc FROM public.category_tree_pointers tp
      JOIN public.categories p ON p.id = tp.parent_id
     WHERE tp.child_id = r.id AND p.slug = 'services';
    SELECT tp.id, tp.display_order INTO other FROM public.category_tree_pointers tp
      JOIN public.categories p ON p.id = tp.parent_id
     WHERE tp.child_id = r.id AND p.slug <> 'services'
     ORDER BY tp.display_order, tp.created_at LIMIT 1;
    IF svc IS NULL OR other IS NULL THEN
      RAISE EXCEPTION 'C3a flip: % is missing one of its two edges', r.slug;
    END IF;
    IF svc.display_order > other.display_order THEN
      tmp := svc.display_order;
      UPDATE public.category_tree_pointers SET display_order = other.display_order WHERE id = svc.id;
      UPDATE public.category_tree_pointers SET display_order = tmp WHERE id = other.id;
    END IF;
  END LOOP;
END $$;

-- PROOFS
DO $$
DECLARE before_n integer; still_n integer; changed integer; total integer;
        bad integer; opts integer; inherited integer;
BEGIN
  SELECT count(*) INTO before_n FROM c3a_before;
  SELECT count(*) INTO still_n FROM public.category_attributes a JOIN c3a_before b ON b.id = a.id;
  IF still_n <> before_n THEN
    RAISE EXCEPTION 'C3a: pre-existing rows lost (% of %)', still_n, before_n;
  END IF;
  SELECT count(*) INTO changed
    FROM public.category_attributes a
    JOIN c3a_before b ON b.id = a.id
   WHERE b.t <> concat_ws(':', a.id::text, a.category_id::text, a.attr_key, a.attr_type, a.name_en,
                 coalesce(a.name_am,''), coalesce(a.options::text,''), a.is_required::text,
                 a.display_order::text, a.is_filterable::text, a.is_searchable::text,
                 coalesce(a.validation::text,''), coalesce(a.default_value::text,''),
                 a.inherit_from_parent::text, coalesce(a.help_text_en,''), coalesce(a.help_text_am,''));
  IF changed > 0 THEN RAISE EXCEPTION 'C3a: % pre-existing rows mutated', changed; END IF;

  SELECT count(*) INTO total FROM public.category_attributes;
  RAISE NOTICE 'C3a: attributes before=% after=% inserted=%', before_n, total, total - before_n;

  SELECT count(*) INTO bad FROM public.category_attributes
   WHERE attr_type IN ('single_select','multi_select') AND options IS NULL;
  IF bad > 0 THEN RAISE EXCEPTION 'C3a: % select rows without options', bad; END IF;

  SELECT jsonb_array_length(a.options) INTO opts
    FROM public.category_attributes a JOIN public.categories c ON c.id = a.category_id
   WHERE c.slug = 'cars' AND a.attr_key = 'make';
  IF coalesce(opts, 0) < 50 THEN RAISE EXCEPTION 'C3a: cars.make option list missing (%)', opts; END IF;
  RAISE NOTICE 'C3a: brand-as-attribute cars.make options=%', opts;

  SELECT count(*) INTO bad FROM public.categories c
   WHERE c.slug IN ('auto-services','realtor-services','fitness-centers')
     AND coalesce((SELECT p.slug FROM public.category_tree_pointers tp
            JOIN public.categories p ON p.id = tp.parent_id
           WHERE tp.child_id = c.id
           ORDER BY (tp.parent_id IS NOT NULL), tp.display_order, tp.created_at
           LIMIT 1), '') <> 'services';
  IF bad > 0 THEN RAISE EXCEPTION 'C3a flip: % nodes do not resolve to Services', bad; END IF;
  RAISE NOTICE 'C3a: flip verified for auto-services, realtor-services, fitness-centers';

  SELECT count(*) INTO inherited
    FROM public.get_category_attributes(
           (SELECT id FROM public.categories WHERE slug = 'other-vehicles'), true);
  IF inherited < 1 THEN RAISE EXCEPTION 'C3a: catch-all inheritance walk returned nothing'; END IF;
  RAISE NOTICE 'C3a: other-vehicles inherited attribute count=%', inherited;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906060000') ON CONFLICT DO NOTHING;
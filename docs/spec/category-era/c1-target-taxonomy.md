# C1 Target Taxonomy — for operator review (single pass)
2026-09-02 · 113 nodes = 14 roots + 85 leaves + 14 catch-alls · 2 levels · 11 L2 pointer paths

Legend: ✎ = Amharic drafted by supervisor (your native check); unmarked AM = live human name inherited (seeds as approved). ⤷ = extra browse path (L2 pointer). Catch-alls auto: sorted last, hidden while empty, poster-visible.

Cross-cutting attributes (L1): **offer_type** required on all Real Estate + Vehicles>Cars/Buses/Trucks (sale/rent/lease · hire for cars). Type-collapses noted per node.

## Vehicles · መኪና እና መለዋወጫዎች · `vehicles` · icon CarFront
- **Cars** · የግል መጠቀሚያ መኪናዎች · `cars` · Car — attrs: offer_type(sale/hire), body(sedan/suv...), make, model, year
- **Motorbikes & Bicycles** · ሞተር ብስክሌቶች እና ብስክሌቶች ✎ · `motorbikes-bicycles` · Bike — type attr: motorbike/tuktuk/bicycle
- **Buses, Vans & Taxis** · አውቶቡሶች፣ ቫኖች እና ታክሲዎች ✎ · `buses-vans` · Bus
- **Trucks & Trailers** · ትላልቅ የመጓጓዣ መኪናዎች · `trucks-trailers` · Truck — truck_type attr from 9 live leaves
- **Heavy Machinery** · ከባድ ማሽነሪዎች ✎ · `heavy-machinery` · Construction  ⤷ also under: construction, agriculture-farming — L2: also under Construction & Agriculture
- **Parts & Accessories** · መለዋወጫዎችና ተጨማሪዎች ✎ · `vehicle-parts` · Wrench
- **Vehicle Hire & Rentals** · የተሽከርካሪ ኪራይ ✎ · `vehicle-hire` · KeyRound  ⤷ also under: travel — canonical here; pointer from Travel
- **Auto Services** · የመኪና አገልግሎቶች ✎ · `auto-services` · Settings  ⤷ also under: services — absorbs Services>Automobile Repair (495)
- **Other Vehicles** · ሌሎች መኪና እና መለዋወጫዎች · `other-vehicles` · MoreHorizontal _(catch-all)_

## Electronics · ኤሌክትሮኒክስ · `electronics` · icon Laptop
- **Phones & Tablets** · ስልኮች እና ታብሌቶች ✎ · `phones-tablets` · Smartphone — type attr: smartphone/feature/basic/tablet
- **Computers & Laptops** · ኮምፒውተሮች እና ላፕቶፖች ✎ · `computers` · Monitor
- **TV & Video** · ቲቪ፣ ቪዲዮ፣ ጨዋታዎች · `tv-video` · Tv
- **Gaming & Consoles** · የቪዲዮ ጌም መጫወቻዎች ✎ · `gaming` · Gamepad2
- **Audio & Sound Systems** · የድምፅ ሲስተሞች ✎ · `audio-sound` · Headphones
- **Cameras & Drones** · ካሜራዎች እና ድሮኖች ✎ · `cameras-drones` · Camera — absorbs Drones branch; VR here
- **Printers & Office Electronics** · ፕሪንተሮች እና የቢሮ ኤሌክትሮኒክስ ✎ · `printers-office` · Printer — +projectors(328)
- **Accessories & Parts** · መለዋወጫዎችና ክፍሎች ✎ · `electronics-accessories` · Cable
- **Other Electronics** · ሌሎች ኤሌክትሮኒክስ · `other-electronics` · MoreHorizontal _(catch-all)_

## Fashion · አልባሳትና ሻንጣዎች · `fashion` · icon Shirt
- **Women's Clothing** · የሴቶች ልብስ · `womens-clothing` · ShoppingBag — wedding/occasion = attr occasion
- **Men's Clothing** · የወንዶች ልብስ · `mens-clothing` · Shirt
- **Shoes & Footwear** · ጫማዎች ✎ · `shoes` · Footprints — gender attr
- **Bags & Luggage** · ሻንጣ እና የጉዞ መለዋወጫዎች · `bags-luggage` · Briefcase
- **Jewelry & Watches** · ጌጣጌጥ እና ሰዓቶች ✎ · `jewelry-watches` · Watch — cur 'accessories' renamed
- **Traditional Cloth** · የባህል ልብስ ✎ · `traditional-cloth` · Ribbon — Tibeb/Netela/Gabi = product_type attr; cultural anchor
- **Uniforms & Workwear** · ዩኒፎርሞች · `uniforms` · BadgeCheck
- **Other Fashion** · ሌሎች አልባሳትና ሻንጣዎች · `other-fashion` · MoreHorizontal _(catch-all)_

## Home & Garden · ቁሳቁሶችና መሳሪያዎች · `home-garden` · icon Home
- **Furniture** · የቤት ዕቃዎች ✎ · `furniture` · Sofa — room attr; office furniture folded (48,180-184)
- **Home Appliances** · የቤት ውስጥ መገልገያዎች ✎ · `appliances` · Refrigerator
- **Kitchen & Dining** · የወጥ ቤት እቃዎች ✎ · `kitchen-dining` · ChefHat
- **Home Décor** · የቤት ማስዋቢያ ✎ · `home-decor` · Lamp
- **Garden & Outdoor** · የአትክልት ስፍራ እና ውጪ ✎ · `garden-outdoor` · Trees
- **Other Home & Garden** · ሌሎች ቁሳቁሶችና መሳሪያዎች · `other-home-garden` · MoreHorizontal _(catch-all)_

## Beauty & Personal Care · መዋቢያዎችና የግል እንክብካቤ ምርቶች · `beauty-personal-care` · icon Sparkles
- **Skincare** · የቆዳ እንክብካቤ ✎ · `skincare` · Droplet
- **Hair Care & Wigs** · የፀጉር እንክብካቤ እና ዊግ ✎ · `haircare` · Scissors
- **Makeup** · ሜካፕ ✎ · `makeup` · Palette
- **Fragrances** · ሽቶዎች ✎ · `fragrances` · Flower2
- **Men's Grooming** · ወንዶች መላጨት ምርቶች · `mens-grooming` · User
- **Nails, Hand & Foot Care** · የጥፍር፣ የእጅ እና የእግር እንክብካቤ ✎ · `nail-hand-foot` · Hand
- **Health & Wellness (OTC)** · ፋርማሲ · `health-wellness` · HeartPulse — OTC/vitamins per REQ-017; +medical equipment(90)→ptr commercial
- **Other Beauty & Personal Care** · ሌሎች መዋቢያዎችና የግል እንክብካቤ ምርቶች · `other-beauty-personal-care` · MoreHorizontal _(catch-all)_

## Real Estate · የማይንቀሳቀስ የቤት ንብረት · `real-estate` · icon Building2
- **Apartments & Condominiums** · አፓርታማዎች እና ኮንዶሚኒየሞች ✎ · `apartments-condos` · Building — type attr: apartment/condominium; L1 kills for-rent/for-sale twins
- **Houses & Townhomes** · ቤቶች እና ታውን ሀውሶች ✎ · `houses` · Home
- **Land & Plots** · መሬት · `land-plots` · MapPin — land_type attr (residential/commercial/farm/industrial/mixed)
- **Commercial Property** · ቢሮ ወይም የችርቻሮ ቦታ · `commercial-property` · Store — type attr: office/retail/industrial/warehouse
- **Short-term Rentals** · የአጭር ጊዜ ኪራይ ✎ · `short-term-rentals` · Calendar
- **Roommates & Shared** · ጋራ መኖሪያ ✎ · `roommates-shared` · Users
- **Realtor & Property Services** · ሪልቶር እና ተዛማጅ አገልግሎቶች · `realtor-services` · KeySquare  ⤷ also under: services
- **Other Real Estate** · ሌሎች የማይንቀሳቀስ የቤት ንብረት · `other-real-estate` · MoreHorizontal _(catch-all)_

## Services · አገልግሎቶች · `services` · icon Briefcase
- **Home & Cleaning Services** · የቤት እና የጽዳት አገልግሎቶች ✎ · `home-services` · Wrench — cleaning+laundry+garbage
- **Repair & Maintenance** · የጥገና እና የጥገና አገልግሎቶች · `repair-maintenance` · Hammer  ⤷ also under: electronics — electronic/appliance/machinery repair; phone repair(336,335)
- **Financial & Legal Services** · የፋይናንስ አገልግሎቶች · `financial-legal` · Banknote — banking/insurance/tax/audit; mortgage canonical here (L2 from RE)
- **Logistics, Cargo & Moving** · ሎጂስቲክስ፣ ጭነት እና ማጓጓዣ ✎ · `logistics-cargo` · Package
- **Events & Catering** · የዝግጅት ማደራጀት አገልግሎቶች · `events-services` · PartyPopper — R3: Events root folded; +Catering(4249)
- **Education & Tutoring** · ትምህርት እና ስልጠና · `education-training` · GraduationCap — R4: Education root folded; childcare here
- **Personal Care Services** · የግል እንክብካቤ አገልግሎቶች ✎ · `personal-care-services` · Scissors  ⤷ also under: beauty-personal-care — L2 canonical: salons/barbers/spa dupes collapse here
- **Printing, Photo & Design** · ህትመት፣ ፎቶ እና ዲዛይን ✎ · `printing-photography` · Printer — +AV(318)+photo services(326)
- **Professional & Office Services** · ሙያዊ እና የቢሮ አገልግሎቶች ✎ · `professional-services` · Briefcase
- **Health Services** · የጤና አገልግሎቶች ✎ · `health-services` · Stethoscope — clinics/diagnostics/homecare; NO pharmacy
- **Other Services** · ሌሎች አገልግሎቶች · `other-services` · MoreHorizontal _(catch-all)_

## Sports & Leisure · ስፖርት እና መዝናኛ ✎ · `sports-leisure` · icon Dumbbell
- **Fitness & Gym Equipment** · የአካል ብቃት መሣሪያዎች ✎ · `fitness-equipment` · Dumbbell
- **Sports Equipment** · የስፖርት እቃዎች ✎ · `sports-equipment` · Trophy — sport attr
- **Outdoor & Camping** · ካምፒንግ እና ውጪ መዝናኛ ✎ · `outdoor-recreation` · Mountain
- **Gyms & Fitness Centers** · የኩላሊት እና የሆርሞን መድኃኒቶች · `fitness-centers` · Activity  ⤷ also under: services
- **Books, Music & Media** · የመጻሕፍት መደብር እና የሙዚቃ ሱቆች · `books-media` · Book — Bookstore root folded to leaf
- **Other Sports & Leisure** · ሌሎች ስፖርት እና መዝናኛ ✎ · `other-sports-leisure` · MoreHorizontal _(catch-all)_

## Construction Material · የግንባታ እቃዎችና መሳርያዎች · `construction` · icon HardHat
- **Cement, Concrete & Masonry** · ኮንክሪት እና ሜሶነሪ · `cement-concrete` · Layers
- **Steel & Metals** · ብረታ ብረት ✎ · `steel-metals` · Anvil
- **Wood & Timber** · እንጨትና ጣውላ ✎ · `wood-timber` · TreePine
- **Plumbing & Sanitary** · የቧንቧ እቃዎች ✎ · `plumbing` · Droplets
- **Electrical & Lighting** · የኤሌክትሪክ እና የመብራት ቁሶች · `electrical-lighting` · Zap — generators here
- **Tiles, Paint & Finishing** · ንጣፎች፣ ቀለም እና ማጠናቀቂያ ✎ · `tiles-paint` · Paintbrush
- **Roofing, Doors & Windows** · ጣሪያ፣ በሮች እና መስኮቶች ✎ · `roofing-doors` · DoorOpen
- **Tools & Site Machinery** · መሣሪያዎችና የግንባታ ማሽነሪ ✎ · `construction-tools` · Drill  ⤷ also under: commercial-equipment — +Construction Services(62,215,216,217)→note: contractors under Services? kept here as attr provider_type
- **Other Construction Material** · ሌሎች የግንባታ እቃዎችና መሳርያዎች · `other-construction` · MoreHorizontal _(catch-all)_

## Travel & Accommodation · የጉዞ እና ማረፊያ አገልግሎቶች · `travel` · icon Plane
- **Hotels & Guesthouses** · ማረፊያ · `hotels-guesthouses` · Hotel
- **Resorts & Lodges** · ሪዞርቶች እና ሎጆች ✎ · `resorts-lodges` · Palmtree
- **Tours, Tickets & Travel Agents** · ጉብኝቶች፣ ትኬቶች እና ወኪሎች ✎ · `tours-tickets` · TicketsPlane
- **Restaurants, Cafés & Nightlife** · መመገቢያ እና መዝናኛዎች · `restaurants-cafes` · UtensilsCrossed — live Dinning branch + Restaurants(4251)
- **Attractions & Recreation** · የመዝናኛ አገልግሎቶች · `attractions` · FerrisWheel
- **Travel Documents & Services** · ከጉዞ ጋር የተያያዙ አገልግሎቶች እና እቃዎች · `travel-services` · FileCheck
- **Other Travel & Accommodation** · ሌሎች የጉዞ እና ማረፊያ አገልግሎቶች · `other-travel` · MoreHorizontal _(catch-all)_

## Agriculture & Farming · እርሻ እና ግብርና ✎ · `agriculture-farming` · icon Tractor
- **Farm Equipment & Machinery** · የእርሻ መሣሪያዎች ✎ · `farm-equipment` · Tractor
- **Livestock & Poultry** · የቀንድ ከብቶች እና ዶሮዎች ✎ · `livestock` · Beef
- **Grains, Produce & Coffee** · እህል፣ ምርት እና ቡና ✎ · `harvested-produce` · Coffee — coffee named — Ethiopian market
- **Seeds, Feed & Inputs** · ዘር፣ መኖ እና ግብዓቶች ✎ · `seeds-inputs` · Sprout
- **Other Agriculture & Farming** · ሌሎች እርሻ እና ግብርና ✎ · `other-agriculture-farming` · MoreHorizontal _(catch-all)_

## Pets & Animals · የቤት እንስሳት ✎ · `pets-animals` · icon PawPrint
- **Dogs & Cats** · ውሾች እና ድመቶች ✎ · `dogs-cats` · Dog
- **Birds, Fish & Small Pets** · ወፎች እና ዓሣዎች ✎ · `birds-fish` · Bird
- **Pet Supplies & Services** · የቤት እንስሳት ቁሳቁስ ✎ · `pet-supplies-services` · Bone
- **Other Pets & Animals** · ሌሎች የቤት እንስሳት ✎ · `other-pets-animals` · MoreHorizontal _(catch-all)_

## Babies & Kids · ሕፃናት እና ልጆች ✎ · `babies-kids` · icon Baby
- **Kids & Baby Clothing** · የልጆች እና የሕፃናት ልብስ ✎ · `kids-clothing` · Shirt  ⤷ also under: fashion — canonical under Babies&Kids; pointer from Fashion (L2)
- **Toys & Games** · መጫወቻዎች ✎ · `toys-games` · Gamepad2
- **Strollers, Car Seats & Gear** · የሕፃን መገልገያዎች ✎ · `baby-gear` · BabyIcon
- **Other Babies & Kids** · ሌሎች ሕፃናት እና ልጆች ✎ · `other-babies-kids` · MoreHorizontal _(catch-all)_

## Commercial Equipment · የንግድ መሣሪያዎች ✎ · `commercial-equipment` · icon Factory
- **Restaurant & Café Equipment** · የምግብ ቤት መሣሪያዎች ✎ · `restaurant-equipment` · CookingPot — +commercial furniture(52)
- **Medical Equipment** · የሕክምና መሣሪያዎች አቅራቢዎች · `medical-equipment` · Stethoscope
- **Office & Shop Equipment** · የቢሮ መሣሪያዎች ✎ · `office-equipment` · Printer
- **Industrial Machinery** · የኢንዱስትሪ ማሽነሪዎች ✎ · `industrial-equipment` · Factory  ⤷ also under: construction
- **Other Commercial Equipment** · ሌሎች የንግድ መሣሪያዎች ✎ · `other-commercial-equipment` · MoreHorizontal _(catch-all)_

## Live-branch fates not visible above
Jobs & Vacancies (22 rows incl. Tenders) → RETIRE (REQ-017 amendment) · Pharmacy-with-Prescription (9) → RETIRE (REQ-017) · House Helps → RETIRE (domestic-labor recruitment, Jobs rationale) · Shops/Marts/Cafés root (3) → DROP (storefronts) · bare Others (2) → DROP (catch-all system supersedes) · Health & Fitness root → SPLIT three ways.

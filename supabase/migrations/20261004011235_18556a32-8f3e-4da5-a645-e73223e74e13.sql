-- bundle 3 M2 — the seller name (DEC-107, DEC-108; brief steps 14-24).
-- Lists (site/role/function words, protected names and handles, exact-only
-- words), the fold, the judge (rules a-f), check/suggest doors, alias history
-- with the change rule, the admin reason path, and the daily refused-name count.
-- e2e-areas: posting, routes, admin-users, account

-- ── 16. Tables (no client access) ─────────────────────────────────────────
CREATE TABLE public.site_words (
  word text PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('site', 'role', 'function'))
);
CREATE TABLE public.protected_names (
  id integer PRIMARY KEY,
  name_en text NOT NULL,
  name_am text,
  kind text NOT NULL,
  country text NOT NULL
);
CREATE TABLE public.protected_handles (
  handle_fold text PRIMARY KEY,
  name_id integer NOT NULL REFERENCES public.protected_names(id),
  handle text NOT NULL
);
CREATE TABLE public.exact_only_words (
  word text PRIMARY KEY
);
-- 20. Every name an account has held. Personal data: carries home_country_code (E3).
CREATE TABLE public.alias_history (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alias text NOT NULL,
  alias_fold text NOT NULL,
  taken_at timestamptz NOT NULL DEFAULT now(),
  released_at timestamptz,
  home_country_code character(2) REFERENCES public.countries(code)
);
CREATE INDEX alias_history_fold_idx ON public.alias_history (alias_fold);
CREATE INDEX alias_history_user_idx ON public.alias_history (user_id, taken_at);
CREATE UNIQUE INDEX alias_history_one_current ON public.alias_history (user_id) WHERE released_at IS NULL;
-- 23. Heartbeat of the daily refused-name count (same shape and access as catalog_find_sweep_runs).
CREATE TABLE public.seller_name_sweep_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  refused_count integer NOT NULL
);

DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_words','protected_names','protected_handles','exact_only_words','alias_history','seller_name_sweep_runs'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;
GRANT USAGE, SELECT ON SEQUENCE public.alias_history_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.seller_name_sweep_runs_id_seq TO service_role;
REVOKE ALL ON SEQUENCE public.alias_history_id_seq FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.seller_name_sweep_runs_id_seq FROM anon, authenticated;

-- ── Seeds ────────────────────────────────────────────────────────────────
INSERT INTO public.site_words (word, kind)
SELECT w, 'site' FROM unnest(string_to_array('about account accounts advertise advertising affiliate affiliates alerts android announcements answers api app apps archive article articles assets auction auctions auth billing blog blogs board bookmarks brand brands browse business businesses buyer buyers buying callback campaign campaigns career careers cart catalog catalogue categories category channel channels chat checkout cities city classifieds community companies company compare complaint complaints confirm contact contacts cookie cookies copyright countries country coupon coupons create customer customers dashboard deals delete delivery dev developer developers directory discount discounts discover dispute disputes docs donate download downloads draft drafts edit email emails error errors escrow ethiocom event events explore faq favorite favorites favourite favourites featured feed feedback feeds files filter filters follow followers following forgot forum forums fraud free gallery gift gifts group groups guide guidelines guides help helpdesk home homepage hotline image images inbox index info insights invite invoice invoices items jobs join language languages latest legal licence license listing listings live local location locations manage manifest map maps market marketplace markets me media member members membership message messages messaging mobile moderation money news newsletter notification notifications null offer offers office offline online order orders owner page pages partner partners pay payments payout payouts people photo photos plans policies policy popular portal post posts premium press price prices pricing privacy product products profile profiles promo promotion promotions public publish recent recover recovery redirect refund refunds region regions register registration rental rentals report reports request requests reset review reviews robots root rules safety sales saved search secure security sell seller sellers selling service services session sessions settings setup share shop shopping sitemap sponsor sponsored start static stats status store stores stories story subscribe subscription subscriptions success survey system tags team tender tenders terms test testing tools topic topics track tracking trade trending trust undefined update updates upgrade upload uploads user users vacancies vendor vendors verification video videos wallet wanted webhook webhooks welcome widget wishlist work www you', ' ')) w
UNION ALL SELECT w, 'role' FROM unnest(string_to_array('admin administrator support official verified moderator staff', ' ')) w
UNION ALL SELECT w, 'function' FROM unnest(string_to_array('login logout signin signup verify password payment', ' ')) w;

CREATE TEMP TABLE m2_names (id integer, name_en text, name_am text, kind text, country text, handles text);
INSERT INTO m2_names VALUES
(1,'Commercial Bank of Ethiopia','የኢትዮጵያ ንግድ ባንክ','bank','Ethiopia','commercial_bank_of_ethiopia|commercial_bank_ethiopia|cbe|cbe_bank|cbe_ethiopia|combanketh|ethiopia_nigd_bank|nigd_bank|cbe_noor|cbenoor'),
(2,'Development Bank of Ethiopia','የኢትዮጵያ ልማት ባንክ','bank','Ethiopia','development_bank_of_ethiopia|development_bank_ethiopia|dbe|dbe_bank|dbe_ethiopia|ethiopia_limat_bank|limat_bank'),
(3,'Awash Bank','አዋሽ ባንክ','bank','Ethiopia','awash_bank|awash|awashbank|awash_international_bank|awash_bank_sc'),
(4,'Dashen Bank','ዳሸን ባንክ','bank','Ethiopia','dashen_bank|dashen|dashenbank|dashen_bank_sc|dashen_bank_super_app'),
(5,'Bank of Abyssinia','አቢሲንያ ባንክ','bank','Ethiopia','bank_of_abyssinia|abyssinia_bank|bankofabyssinia|boa|boa_bank|boa_ethiopia|abysinia_bank|abyssinia_bank_sc'),
(6,'Wegagen Bank','ወጋገን ባንክ','bank','Ethiopia','wegagen_bank|wegagen|wegagenbank|wogagen_bank|wegagen_bank_sc'),
(7,'Hibret Bank','ሕብረት ባንክ','bank','Ethiopia','hibret_bank|hibretbank|hibret_bank_sc|united_bank|united_bank_sc|united_bank_ethiopia|hibrat_bank'),
(8,'Nib International Bank','ንብ ኢንተርናሽናል ባንክ','bank','Ethiopia','nib_international_bank|nib_bank|nibbank|nib_int_bank|nib_international_bank_sc|nib_bank_sc'),
(9,'Cooperative Bank of Oromia','የኦሮሚያ ኅብረት ሥራ ባንክ','bank','Ethiopia','cooperative_bank_of_oromia|cooperative_bank_oromia|coopbank|coop_bank|coopbank_oromia|oromia_cooperative_bank|cbo|cbo_bank|coopbank_alhuda'),
(10,'Anbesa Bank','አንበሳ ባንክ','bank','Ethiopia','anbesa_bank|anbesabank|anbessa_bank|anbesa_international_bank|lion_bank|lion_international_bank|lion_bank_sc|lib_bank'),
(11,'Oromia Bank','ኦሮሚያ ባንክ','bank','Ethiopia','oromia_bank|oromiabank|oromia_international_bank|oromia_bank_sc|oib|oib_bank|oroodigital'),
(12,'Zemen Bank','ዘመን ባንክ','bank','Ethiopia','zemen_bank|zemenbank|zemen_bank_sc'),
(13,'Bunna Bank','ቡና ባንክ','bank','Ethiopia','bunna_bank|bunnabank|bunna_international_bank|bunna_bank_sc|buna_bank'),
(14,'Berhan Bank','ብርሃን ባንክ','bank','Ethiopia','berhan_bank|berhanbank|berhan_international_bank|berhan_bank_sc|birhan_bank'),
(15,'Abay Bank','ዓባይ ባንክ','bank','Ethiopia','abay_bank|abaybank|abay_bank_sc|abbay_bank'),
(16,'Addis Bank','አዲስ ባንክ','bank','Ethiopia','addis_bank|addisbank|addis_international_bank|addis_bank_sc'),
(17,'Enat Bank','እናት ባንክ','bank','Ethiopia','enat_bank|enatbank|enat_bank_sc'),
(18,'Global Bank Ethiopia','ግሎባል ባንክ ኢትዮጵያ','bank','Ethiopia','global_bank_ethiopia|global_bank|globalbank|global_bank_sc|globalbankethiopia|debub_global_bank|dgb|dgb_bank'),
(19,'ZamZam Bank','ዘምዘም ባንክ','bank','Ethiopia','zamzam_bank|zamzambank|zam_zam_bank|zemzem_bank|zamzam_bank_sc'),
(20,'Shabelle Bank','ሸበሌ ባንክ','bank','Ethiopia','shabelle_bank|shabellebank|shebelle_bank|shebele_bank|shabele_bank|shabelle_bank_sc|somali_microfinance|h_cash|hcash'),
(21,'Goh Betoch Bank','ጎሕ ቤቶች ባንክ','bank','Ethiopia','goh_betoch_bank|goh_betoch|gohbetoch|gohbetochbank|goh_bank|gohbetbank|goh_betoch_bank_sc'),
(22,'Hijra Bank','ሂጅራ ባንክ','bank','Ethiopia','hijra_bank|hijrabank|hijra_bank_sc|hijira_bank|halalpay'),
(23,'Ahadu Bank','አሐዱ ባንክ','bank','Ethiopia','ahadu_bank|ahadubank|ahadu_bank_sc'),
(24,'Siinqee Bank','ሲንቄ ባንክ','bank','Ethiopia','siinqee_bank|siinqee|siinqeebank|sinqee_bank|sinqe_bank|siinqee_bank_sc|oromia_credit_and_saving|ocssco'),
(25,'Tsedey Bank','ፀደይ ባንክ','bank','Ethiopia','tsedey_bank|tsedeybank|tsedey_bank_sc|tsedei_bank|amhara_credit_and_saving_institution|acsi'),
(26,'Tsehay Bank','ፀሐይ ባንክ','bank','Ethiopia','tsehay_bank|tsehaybank|tsehay_bank_sc|tsehai_bank'),
(27,'Amhara Bank','አማራ ባንክ','bank','Ethiopia','amhara_bank|amharabank|amhara_bank_sc'),
(28,'Gadaa Bank','ገዳ ባንክ','bank','Ethiopia','gadaa_bank|gadaabank|gada_bank|gadaa_bank_sc'),
(29,'Omo Bank','ኦሞ ባንክ','bank','Ethiopia','omo_bank|omobank|omo_bank_sc|omo_microfinance'),
(30,'Sidama Bank','ሲዳማ ባንክ','bank','Ethiopia','sidama_bank|sidamabank|sidama_bank_sc|sidama_microfinance'),
(31,'Rammis Bank','ራሚስ ባንክ','bank','Ethiopia','rammis_bank|rammis|rammisbank|ramis_bank|rammis_bank_sc'),
(32,'Siket Bank','ስኬት ባንክ','bank','Ethiopia','siket_bank|siketbank|siket_bank_sc|sket_bank|addis_credit_and_saving_institution|adcsi'),
(33,'Ethiopian Insurance Corporation','የኢትዮጵያ መድን ድርጅት','insurer','Ethiopia','ethiopian_insurance_corporation|ethiopian_insurance|eic|eic_ethiopia|eic_insurance|medin_dirijit|ethiopia_medin_dirijit'),
(34,'National Insurance Company of Ethiopia','ብሔራዊ የኢትዮጵያ ኢንሹራንስ ኩባንያ','insurer','Ethiopia','national_insurance_company_of_ethiopia|national_insurance_company|national_insurance_ethiopia|nice_insurance|nice_ethiopia'),
(35,'Awash Insurance','አዋሽ ኢንሹራንስ','insurer','Ethiopia','awash_insurance|awashinsurance|awash_insurance_company|awash_insurance_sc'),
(36,'Africa Insurance Company','አፍሪካ ኢንሹራንስ','insurer','Ethiopia','africa_insurance|africainsurance|africa_insurance_company|africa_insurance_sc'),
(37,'Nyala Insurance','ኒያላ ኢንሹራንስ','insurer','Ethiopia','nyala_insurance|nyalainsurance|nyala_insurance_sc|nisco|nisco_insurance'),
(38,'Nile Insurance Company','ናይል ኢንሹራንስ','insurer','Ethiopia','nile_insurance|nileinsurance|nile_insurance_company|nile_insurance_sc'),
(39,'Global Insurance Company','ግሎባል ኢንሹራንስ ኩባንያ','insurer','Ethiopia','global_insurance|globalinsurance|global_insurance_company|global_insurance_sc|gic_insurance'),
(40,'United Insurance Company','ሕብረት ኢንሹራንስ','insurer','Ethiopia','united_insurance|united_insurance_company|united_insurance_sc|unic|unic_ethiopia|unic_insurance|hibret_insurance'),
(41,'Nib Insurance Company','ንብ ኢንሹራንስ','insurer','Ethiopia','nib_insurance|nibinsurance|nib_insurance_company|nib_insurance_sc'),
(42,'Lion Insurance Company','አንበሳ ኢንሹራንስ','insurer','Ethiopia','lion_insurance|lioninsurance|lion_insurance_company|lion_insurance_sc|anbessa_insurance|anbesa_insurance'),
(43,'Ethio-Life & General Insurance','ኢትዮ ላይፍ ኤንድ ጄኔራል ኢንሹራንስ','insurer','Ethiopia','ethio_life_and_general_insurance|ethio_life_general_insurance|ethio_life_insurance|ethio_life|ethiolife|ethiolife_insurance|elig'),
(44,'Oromia Insurance','ኦሮሚያ ኢንሹራንስ','insurer','Ethiopia','oromia_insurance|oromiainsurance|oromia_insurance_company|oromia_insurance_sc|oic_insurance'),
(45,'Abay Insurance','ዓባይ ኢንሹራንስ','insurer','Ethiopia','abay_insurance|abayinsurance|abay_insurance_sc|abbay_insurance'),
(46,'Berhan Insurance','ብርሃን ኢንሹራንስ','insurer','Ethiopia','berhan_insurance|berhaninsurance|berhan_insurance_sc|birhan_insurance'),
(47,'Tsehay Insurance','ፀሐይ ኢንሹራንስ','insurer','Ethiopia','tsehay_insurance|tsehayinsurance|tsehay_insurance_sc|tsehai_insurance'),
(48,'Lucy Insurance','ሉሲ ኢንሹራንስ','insurer','Ethiopia','lucy_insurance|lucyinsurance|lucy_insurance_sc'),
(49,'Bunna Insurance','ቡና ኢንሹራንስ','insurer','Ethiopia','bunna_insurance|bunnainsurance|bunna_insurance_sc|buna_insurance'),
(50,'Zemen Insurance','ዘመን ኢንሹራንስ','insurer','Ethiopia','zemen_insurance|zemeninsurance|zemen_insurance_sc'),
(51,'Ethiopian Reinsurance Share Company','የኢትዮጵያ ጠለፋ መድን','insurer','Ethiopia','ethiopian_reinsurance|ethiopianreinsurance|ethiopian_reinsurance_sc|ethiopian_re|ethiopianre|ethio_re|ethiore'),
(52,'Ethio telecom','ኢትዮ ቴሌኮም','telecom','Ethiopia','ethio_telecom|ethiotelecom|ethio_tele|ethiotel|ethio_tel|ethiopian_telecom|ethiopian_telecommunications_corporation|ethio_telecom_sc|zemen_gebeya|zemengebeya'),
(53,'Safaricom Ethiopia','ሳፋሪኮም ኢትዮጵያ','telecom','Ethiopia','safaricom_ethiopia|safaricom|safaricomethiopia|safaricom_et|safaricom_ethiopia_plc|safaricom_telecommunications_ethiopia'),
(54,'telebirr','ቴሌብር','mobile money','Ethiopia','telebirr|tele_birr|telebir|telebirr_superapp|telebirr_super_app|ethio_telecom_telebirr'),
(55,'M-PESA','ኤም-ፔሳ','mobile money','Ethiopia','mpesa|m_pesa|mpesa_ethiopia|m_pesa_ethiopia|safaricom_mpesa|safaricom_m_pesa|mpesa_safaricom|safari_mpesa|safaricom_m_pesa_mobile_financial_services'),
(56,'Kacha Digital Financial Services','ካቻ','mobile money','Ethiopia','kacha|kacha_digital|kacha_digital_financial_services|kacha_wallet|kacha_dfs|kachadfs'),
(57,'Yaya Payment Instrument Issuer','ያያ ዋሌት','mobile money','Ethiopia','yaya_wallet|yayawallet|yaya_pay|yayapay|yaya_payment|yaya_payment_instrument_issuer'),
(58,'ToloPay Financial Technology','ቶሎፔይ','mobile money','Ethiopia','tolopay|tolo_pay|tollo_pay|tollopay|tolopay_financial_technology'),
(59,'Vitabirr Financial Services','ቪታብር','mobile money','Ethiopia','vitabirr|vita_birr|vitabirr_financial_services'),
(60,'EthSwitch','ኢትስዊች','mobile money','Ethiopia','ethswitch|eth_switch|ethswitch_sc|ethiopay|ethio_pay|ethswitch_ethiopay'),
(61,'Premier Switch Solution','ፕሪሚየር ስዊች ሶሉሽንስ','mobile money','Ethiopia','premier_switch_solution|premier_switch_solutions|premier_switch|pss_ethiopia|pss_switch'),
(62,'Arifpay Financial Technologies','አሪፍፔይ','mobile money','Ethiopia','arifpay|arif_pay|arifpay_financial_technologies|arif_pay_financial_technology'),
(63,'Chapa Financial Technologies','ቻፓ','mobile money','Ethiopia','chapa|chapa_pay|chapapay|chapa_financial_technology|chapa_financial_technologies|chapa_co'),
(64,'Santim Pay Financial Technology','ሳንቲምፔይ','mobile money','Ethiopia','santimpay|santim_pay|santimpay_financial_technology|santim_pay_financial_technology'),
(65,'Addis Pay Financial Technology','አዲስፔይ','mobile money','Ethiopia','addispay|addis_pay|addispay_financial_technology|addis_pay_financial_technology'),
(66,'Yagout Pay Financial Technology','ያጉት ፔይ','mobile money','Ethiopia','yagoutpay|yagout_pay|yagutpay|yagut_pay|yagout_pay_financial_technology'),
(67,'Fenanpay Solutions','ፈናንፔይ','mobile money','Ethiopia','fenanpay|fenan_pay|fenanpay_solutions'),
(68,'PawaPay Digital Financial Services','ፓዋፔይ','mobile money','Ethiopia','pawapay|pawa_pay|pawapay_ethiopia|pawapay_digital_financial_services'),
(69,'Cashflow Financial Technologies','ካሽፍሎው ፋይናንሻል ቴክኖሎጂስ','mobile money','Ethiopia','cashflow_financial_technologies|cashflow_financial_technology|cashflow_fintech|cashflow_pay'),
(70,'LakiPay Financial Technologies','ላኪፔይ','mobile money','Ethiopia','lakipay|laki_pay|lakipay_financial_technologies'),
(71,'StarPay Financial Service','ስታርፔይ','mobile money','Ethiopia','starpay|star_pay|starpay_financial_service|starpay_financial_services|starpay_financial_technologies'),
(72,'BirrLink Financial Technologies','ብርሊንክ','mobile money','Ethiopia','birrlink|birr_link|birrlink_financial_technologies|birrlink_remittance|birrlink_remit'),
(73,'KisPay Financial Solutions','ኪስፔይ','mobile money','Ethiopia','kispay|kis_pay|kispay_financial_solutions'),
(74,'Timeless Pay Tech Solutions','ታይምለስ ፔይ','mobile money','Ethiopia','timeless_pay|timelesspay|timeless_pay_tech_solutions'),
(75,'AfroPay Digital Financial Technology','አፍሮፔይ','mobile money','Ethiopia','afropay|afro_pay|afropay_digital_financial_technology'),
(76,'Beqelal Financial Technology','በቀላል ፋይናንሻል ቴክኖሎጂ','mobile money','Ethiopia','beqelal_financial_technology|beqelal_pay|beqelalpay|beqelal_fintech'),
(77,'EPay Financial Services','ኢፔይ ፋይናንሻል ሰርቪስስ','mobile money','Ethiopia','epay_financial_services|epay_ethiopia|epay_et'),
(78,'FinPay Digital Financial Solution','ፊንፔይ','mobile money','Ethiopia','finpay|fin_pay|finpay_digital_financial_solution|finpay_ethiopia'),
(79,'AdmasPay Financial Technology','አድማስፔይ','mobile money','Ethiopia','admaspay|admas_pay|admaspay_financial_technology'),
(80,'CBE Birr','ሲቢኢ ብር','mobile money','Ethiopia','cbe_birr|cbebirr|cbe_birr_wallet|cbe_birr_plus'),
(81,'Amole','አሞሌ','mobile money','Ethiopia','amole|amole_wallet|amole_digital_wallet|amole_dashen|dashen_amole'),
(82,'HelloCash','ሄሎካሽ','mobile money','Ethiopia','hellocash|hello_cash|hellocash_ethiopia|belcash|bel_cash'),
(83,'eBirr','ኢብር','mobile money','Ethiopia','ebirr|e_birr|ebirr_wallet|ebirr_ethiopia'),
(84,'COOPay-Ebirr','ኩፔይ ኢብር','mobile money','Ethiopia','coopay_ebirr|coopayebirr|coopay|coopay_e_birr|coop_ebirr'),
(85,'AwashBIRR-Pro','አዋሽ ብር','mobile money','Ethiopia','awashbirr|awash_birr|awashbirr_pro|awash_birr_pro|awash_mobile_wallet'),
(86,'Ethiopian Airlines','የኢትዮጵያ አየር መንገድ','airline','Ethiopia','ethiopian_airlines|ethiopianairlines|ethiopian_airlines_group|ethiopian_air_lines|ethiopian_airline|fly_ethiopian|flyethiopian|eal|et_airlines|ethiopia_ayer_menged|yeityopia_ayer_menged|ethiopian_mro|ethiopian_ground_services|ethiopian_airports|sheba_duty_free'),
(87,'ShebaMiles','ሼባ ማይልስ','airline','Ethiopia','shebamiles|sheba_miles|ethiopian_shebamiles|shebamiles_ethiopian'),
(88,'Ethiopian Holidays','የኢትዮጵያ ሆሊደይስ','airline','Ethiopia','ethiopian_holidays|ethiopianholidays|et_holidays|etholidays'),
(89,'Ethiopian Skylight Hotel','የኢትዮጵያ ስካይላይት ሆቴል','airline','Ethiopia','ethiopian_skylight_hotel|ethiopian_skylight|skylight_hotel|skylight_hotel_addis'),
(90,'Ethiopian Cargo & Logistics Services','የኢትዮጵያ ካርጎና ሎጂስቲክስ አገልግሎት','airline','Ethiopia','ethiopian_cargo|ethiopian_cargo_and_logistics_services|ethiopian_cargo_and_logistics|ethiopian_airlines_cargo|et_cargo|ethiopian_cargo_and_logistics_service'),
(91,'Ethiopian Aviation University','የኢትዮጵያ አቪዬሽን ዩኒቨርሲቲ','airline','Ethiopia','ethiopian_aviation_university|ethiopian_aviation_academy|ethiopian_airlines_aviation_university|ethiopian_airlines_aviation_academy'),
(92,'Ethiopian Electric Power','የኢትዮጵያ ኤሌክትሪክ ኃይል','utility','Ethiopia','ethiopian_electric_power|eep|eep_ethiopia|ethiopian_electric_power_corporation|eepco|eelpa|ethiopia_electric_hail|ethiopia_electric_hayl'),
(93,'Ethiopian Electric Utility','የኢትዮጵያ ኤሌክትሪክ አገልግሎት','utility','Ethiopia','ethiopian_electric_utility|eeu|eeu_ethiopia|ethiopian_electric_service|mebrat_hail|mebrat_hayl|ethiopia_mebrat_hail|ethiopia_electric_agelglot'),
(94,'Addis Ababa Water and Sewerage Authority','የአዲስ አበባ ውሀና ፍሳሽ ባለስልጣን','utility','Ethiopia','addis_ababa_water_and_sewerage_authority|aawsa|addis_ababa_water_and_sewerage|addis_abeba_water_and_sewerage_authority|addis_ababa_water|addis_ababa_wuha_ena_fisash|wuha_ena_fisash|wuha_fisash'),
(95,'Ethiopost (Ethiopian Postal Service)','የኢትዮጵያ ፖስታ አገልግሎት','utility','Ethiopia','ethiopost|ethio_post|ethiopian_postal_service|ethiopian_postal_service_enterprise|ethiopia_post|ethiopian_post|ethio_posta|ethiopia_posta|posta_bet|ems_ethiopia|post_gebeya|postgebeya'),
(96,'Ethiopian Petroleum Supply Enterprise','የኢትዮጵያ ነዳጅ አቅራቢ ድርጅት','utility','Ethiopia','ethiopian_petroleum_supply_enterprise|epse|epse_ethiopia|ethiopian_petroleum_enterprise|ethiopian_petroleum|ethiopia_nedaj_akrabi|nedaj_akrabi_dirijit'),
(97,'Ethiopian Shipping and Logistics','የኢትዮጵያ የባሕር ትራንስፖርትና ሎጂስቲክስ','utility','Ethiopia','ethiopian_shipping_and_logistics|esl|esl_ethiopia|ethiopian_shipping_and_logistics_services_enterprise|eslse|ethiopian_shipping_lines|ethiopian_shipping|ethiopia_bahir_transport'),
(98,'Ethiopian Railways Corporation','የኢትዮጵያ ምድር ባቡር ኮርፖሬሽን','utility','Ethiopia','ethiopian_railways_corporation|ethiopian_railway_corporation|erc|erc_ethiopia|ethiopian_railways|ethiopian_railway|ethiopia_midir_babur|midir_babur'),
(99,'Ethio-Djibouti Standard Gauge Railway Share Company','የኢትዮ-ጅቡቲ ምድር ባቡር አክሲዮን ማኅበር','utility','Ethiopia','ethio_djibouti_railway|ethio_djibouti_standard_gauge_railway|ethio_djibouti_standard_gauge_railway_share_company|edr|edr_ethiopia|ethio_djibouti_railways|addis_djibouti_railway|ethio_djibouti_midir_babur|ethio_djibouti_babur'),
(100,'Ethiopian Toll Roads Enterprise','የኢትዮጵያ የክፍያ መንገዶች ኢንተርፕራይዝ','utility','Ethiopia','ethiopian_toll_roads_enterprise|ethiopian_toll_roads|ethiopian_toll_road_enterprise|ethiopian_toll_road|etre|etre_ethiopia|addis_adama_expressway|yekifya_mengedoch_enterprise'),
(101,'Anbessa City Bus Service Enterprise','አንበሳ የከተማ አውቶቡስ አገልግሎት ድርጅት','utility','Ethiopia','anbessa_city_bus_service_enterprise|anbessa_city_bus|anbessa_bus|anbessa_autobus|acbse|anbesa_city_bus|anbesa_bus|addis_ababa_city_bus|addis_ababa_city_bus_service_enterprise'),
(102,'Sheger Mass Transportation Services Enterprise','ሸገር የብዙኃን ትራንስፖርት አገልግሎት ድርጅት','utility','Ethiopia','sheger_mass_transportation_services_enterprise|sheger_mass_transport_service_enterprise|sheger_mass_transport|sheger_bus|sheger_city_bus|sheger_autobus|sheger_yebizuhan_transport'),
(103,'Addis Ababa Light Rail','የአዲስ አበባ ቀላል ባቡር','utility','Ethiopia','addis_ababa_light_rail|addis_ababa_light_rail_transit|addis_ababa_light_rail_transit_service|aalrt|aa_lrt|addis_ababa_lrt|addis_light_rail|addis_ababa_kelal_babur|kelal_babur'),
(104,'National Bank of Ethiopia','የኢትዮጵያ ብሔራዊ ባንክ','government body','Ethiopia','national_bank_of_ethiopia|national_bank_ethiopia|nbe|nbe_ethiopia|ethiopia_national_bank|biherawi_bank|ethiopia_biherawi_bank'),
(105,'Government of the Federal Democratic Republic of Ethiopia','የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ መንግሥት','government body','Ethiopia','federal_democratic_republic_of_ethiopia|fdre|government_of_ethiopia|ethiopian_government|ethiopia_government|federal_government_of_ethiopia|efdri|ethiopia_mengist|ye_ethiopia_mengist'),
(106,'Office of the Prime Minister','የጠቅላይ ሚኒስትር ጽሕፈት ቤት','government body','Ethiopia','office_of_the_prime_minister|office_of_prime_minister|fdre_office_of_the_prime_minister|prime_minister_office|prime_ministers_office|pmo|pmo_ethiopia|teklay_minister_tsihfet_bet|teklay_minister'),
(107,'Ministry of Agriculture','የግብርና ሚኒስቴር','government body','Ethiopia','ministry_of_agriculture|moa|moa_ethiopia|ministry_of_agriculture_ethiopia|gibrina_minister'),
(108,'Ministry of Industry','የኢንዱስትሪ ሚኒስቴር','government body','Ethiopia','ministry_of_industry|moi_ethiopia|ministry_of_industry_ethiopia|industry_minister'),
(109,'Ministry of Trade and Regional Integration','የንግድና ቀጣናዊ ትስስር ሚኒስቴር','government body','Ethiopia','ministry_of_trade_and_regional_integration|motri|motri_ethiopia|ministry_of_trade|ministry_of_trade_ethiopia|ministry_of_trade_and_industry|moti|nigd_minister|nigdina_ketenawi_tisisir_minister'),
(110,'Ministry of Mines','የማዕድን ሚኒስቴር','government body','Ethiopia','ministry_of_mines|mom_ethiopia|ministry_of_mines_ethiopia|ministry_of_mines_and_petroleum|momp|maeden_minister'),
(111,'Ministry of Tourism','የቱሪዝም ሚኒስቴር','government body','Ethiopia','ministry_of_tourism|ministry_of_tourism_ethiopia|tourism_ethiopia|ministry_of_culture_and_tourism|tourism_minister'),
(112,'Ministry of Labor and Skills','የሥራና ክህሎት ሚኒስቴር','government body','Ethiopia','ministry_of_labor_and_skills|ministry_of_labour_and_skills|ministry_of_labor_and_skill|mols|mols_ethiopia|ministry_of_labour_and_social_affairs|molsa|sirana_kihilot_minister|sira_ena_kihilot_minister'),
(113,'Ministry of Finance','የገንዘብ ሚኒስቴር','government body','Ethiopia','ministry_of_finance|mof|mof_ethiopia|ministry_of_finance_ethiopia|fdre_ministry_of_finance|ministry_of_finance_and_economic_development|mofed|mofec|genzeb_minister'),
(114,'Ministry of Revenues','የገቢዎች ሚኒስቴር','government body','Ethiopia','ministry_of_revenues|ministry_of_revenue|mor|mor_ethiopia|ministry_of_revenues_ethiopia|gebiwoch_minister|ethiopian_revenues_and_customs_authority|erca'),
(115,'Ministry of Planning and Development','የፕላንና ልማት ሚኒስቴር','government body','Ethiopia','ministry_of_planning_and_development|mopd|mopd_ethiopia|ministry_of_planning|planning_and_development_commission|plan_ena_limat_minister'),
(116,'Ministry of Innovation and Technology','የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር','government body','Ethiopia','ministry_of_innovation_and_technology|mint_ethiopia|mint_gov_et|ministry_of_innovation|ministry_of_science_and_technology|ministry_of_communication_and_information_technology|mcit|innovation_ena_technology_minister'),
(117,'Ministry of Transport and Logistics','የትራንስፖርትና ሎጂስቲክስ ሚኒስቴር','government body','Ethiopia','ministry_of_transport_and_logistics|motl|motl_ethiopia|ministry_of_transport|ministry_of_transport_ethiopia|federal_transport_authority|fta_ethiopia|transport_minister|transport_ena_logistics_minister'),
(118,'Ministry of Urban and Infrastructure','የከተማና መሠረተ ልማት ሚኒስቴር','government body','Ethiopia','ministry_of_urban_and_infrastructure|mui_ethiopia|ministry_of_urban_development_and_infrastructure|ministry_of_urban_and_infrastructure_development|ministry_of_urban_development_and_housing|ministry_of_urban_development_and_construction|ketema_ena_meseret_limat_minister'),
(119,'Ministry of Water and Energy','የውሃና ኢነርጂ ሚኒስቴር','government body','Ethiopia','ministry_of_water_and_energy|mowe|mowe_ethiopia|ministry_of_water_and_energy_ethiopia|ministry_of_water_irrigation_and_energy|mowie|wuha_ena_energy_minister'),
(120,'Ministry of Irrigation and Lowlands','የመስኖና ቆላማ አካባቢ ሚኒስቴር','government body','Ethiopia','ministry_of_irrigation_and_lowlands|ministry_of_irrigation_and_lowland|ministry_of_irrigation_and_lowland_areas_development|mills_ethiopia|moil|mesno_ena_kolama_minister'),
(121,'Ministry of Education','የትምህርት ሚኒስቴር','government body','Ethiopia','ministry_of_education|moe|moe_ethiopia|ministry_of_education_ethiopia|fdre_ministry_of_education|ministry_of_science_and_higher_education|moshe|timhirt_minister'),
(122,'Ministry of Health','የጤና ሚኒስቴር','government body','Ethiopia','ministry_of_health|moh|fmoh|moh_ethiopia|ministry_of_health_ethiopia|federal_ministry_of_health|tena_minister|tena_tibeka_minister'),
(123,'Ministry of Women and Social Affairs','የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር','government body','Ethiopia','ministry_of_women_and_social_affairs|mowsa|mowsa_ethiopia|ministry_of_women_children_and_youth|mowcy|setoch_ena_mahiberawi_guday_minister'),
(124,'Ministry of Culture and Sport','የባህልና ስፖርት ሚኒስቴር','government body','Ethiopia','ministry_of_culture_and_sport|ministry_of_culture_and_sports|mocs|mocs_ethiopia|bahil_ena_sport_minister'),
(125,'Ministry of Defense','የመከላከያ ሚኒስቴር','government body','Ethiopia','ministry_of_defense|ministry_of_defence|mod_ethiopia|ministry_of_defense_ethiopia|fdre_ministry_of_defense|ethiopian_national_defense_force|endf|mekelakeya_minister|mekelakeya_serawit'),
(126,'Ministry of Foreign Affairs','የውጭ ጉዳይ ሚኒስቴር','government body','Ethiopia','ministry_of_foreign_affairs|mfa|mofa|mfa_ethiopia|mofa_ethiopia|ministry_of_foreign_affairs_ethiopia|wuch_guday_minister'),
(127,'Ministry of Justice','የፍትሕ ሚኒስቴር','government body','Ethiopia','ministry_of_justice|moj|moj_ethiopia|ministry_of_justice_ethiopia|federal_attorney_general|attorney_general_ethiopia|fitih_minister'),
(128,'Ministry of Peace','የሰላም ሚኒስቴር','government body','Ethiopia','ministry_of_peace|mop_ethiopia|ministry_of_peace_ethiopia|selam_minister'),
(129,'Ethiopian Customs Commission','የኢትዮጵያ ጉምሩክ ኮሚሽን','government body','Ethiopia','ethiopian_customs_commission|ecc|ecc_ethiopia|ethiopian_customs|ethiopia_customs|customs_commission|ethiopian_customs_authority|gumruk_commission|ethiopia_gumruk|ye_ethiopia_gumruk_commission'),
(130,'Immigration and Citizenship Service','የኢሚግሬሽንና ዜግነት አገልግሎት','government body','Ethiopia','immigration_and_citizenship_service|immigration_and_citizenship_services|ics_ethiopia|ics_gov_et|ethiopian_immigration|immigration_ethiopia|immigration_nationality_and_vital_events_agency|invea|main_department_for_immigration_and_nationality_affairs|ethiopian_passport_office|ethiopian_evisa|evisa_ethiopia|immigration_ena_zeginet_agelglot'),
(131,'Document Authentication and Registration Service','የሰነዶች ማረጋገጫና ምዝገባ አገልግሎት','government body','Ethiopia','document_authentication_and_registration_service|documents_authentication_and_registration_service|dars|dars_ethiopia|documents_authentication_and_registration_agency|dara_ethiopia|document_authentication_ethiopia|senedoch_maregagecha_ena_mizgeba|senedoch_maregagecha|wul_ena_mastreja|wulna_mastreja'),
(132,'Ethiopian Investment Commission','የኢትዮጵያ ኢንቨስትመንት ኮሚሽን','government body','Ethiopia','ethiopian_investment_commission|ethiopia_investment_commission|investment_commission_ethiopia|invest_ethiopia|investethiopia|ethiopian_investment_agency|eic_investment'),
(133,'Ethiopian Communications Authority','የኢትዮጵያ ኮሚዩኒኬሽን ባለሥልጣን','government body','Ethiopia','ethiopian_communications_authority|ethiopian_communication_authority|eca|eca_ethiopia|ethiopia_communications_authority|communications_authority_ethiopia'),
(134,'Information Network Security Administration','የኢንፎርሜሽን መረብ ደህንነት አስተዳደር','government body','Ethiopia','information_network_security_administration|insa|insa_ethiopia|ethiopian_insa|information_network_security_agency'),
(135,'Ethiopian Food and Drug Authority','የኢትዮጵያ ምግብና መድኃኒት ባለስልጣን','government body','Ethiopia','ethiopian_food_and_drug_authority|efda|efda_ethiopia|ethiopian_food_and_drug_administration|ethiopian_fda|fmhaca|migibna_medhanit_balesiltan|migib_ena_medhanit_balesiltan'),
(136,'Ethiopian Federal Police','የኢትዮጵያ ፌደራል ፖሊስ','government body','Ethiopia','ethiopian_federal_police|federal_police|federal_police_commission|ethiopian_federal_police_commission|efp|efpc|ethiopia_federal_police|federal_polis'),
(137,'National ID Program (Fayda)','የብሔራዊ መታወቂያ ፕሮግራም (ፋይዳ)','government body','Ethiopia','fayda|national_id_program|national_id|national_id_ethiopia|ethiopian_national_id|nidp|national_id_office|fayda_id|fayda_national_id|fayda_ethiopia|fayda_digital_id|id_gov_et|biherawi_metawekiya|fayda_metawekiya'),
(138,'Ethiopian Civil Aviation Authority','የኢትዮጵያ ሲቪል አቪዬሽን ባለሥልጣን','government body','Ethiopia','ethiopian_civil_aviation_authority|ecaa|ecaa_ethiopia|civil_aviation_authority_ethiopia|ethiopian_civil_aviation|civil_aviation_ethiopia'),
(139,'Federal Supreme Court of Ethiopia','የፌዴራል ጠቅላይ ፍርድ ቤት','government body','Ethiopia','federal_supreme_court|federal_supreme_court_of_ethiopia|ethiopian_federal_supreme_court|fsc_ethiopia|federal_courts_of_ethiopia|federal_teklay_fird_bet|teklay_fird_bet'),
(140,'Institute of Ethiopian Standards','የኢትዮጵያ ደረጃዎች ኢንስቲትዩት','government body','Ethiopia','institute_of_ethiopian_standards|ies_ethiopia|ethiopian_standards_institute|ethiopian_standards_agency|esa_ethiopia|ethiopian_standards|ethiopia_derejawoch_institute'),
(141,'Ethiopian Conformity Assessment Enterprise','የኢትዮጵያ የተስማሚነት ምዘና ድርጅት','government body','Ethiopia','ethiopian_conformity_assessment_enterprise|ecae|ecae_ethiopia|ethiopian_conformity_assessment|quality_and_standards_authority_of_ethiopia|qsae|tesmaminet_mizena_dirijit'),
(142,'Ethiopian Accreditation Service','የኢትዮጵያ አክሬዲቴሽን አገልግሎት','government body','Ethiopia','ethiopian_accreditation_service|eas_ethiopia|ethiopian_national_accreditation_office|enao|ethiopia_accreditation_service'),
(143,'Ethiopian Metrology Institute','የኢትዮጵያ ሥነ-ልክ ኢንስቲትዩት','government body','Ethiopia','ethiopian_metrology_institute|emi_ethiopia|national_metrology_institute_of_ethiopia|nmie|ethiopia_metrology_institute'),
(144,'Ethiopia Commodity Exchange','የኢትዮጵያ ምርት ገበያ','government body','Ethiopia','ethiopia_commodity_exchange|ethiopian_commodity_exchange|ecx|ecx_ethiopia|ethiopia_mirt_gebeya|mirt_gebeya'),
(145,'Ethiopian Capital Market Authority','የኢትዮጵያ ካፒታል ገበያ ባለሥልጣን','government body','Ethiopia','ethiopian_capital_market_authority|ecma|ecma_ethiopia|ethiopia_capital_market_authority|capital_market_authority_ethiopia|capital_gebeya_balesiltan'),
(146,'Ethiopian Intellectual Property Authority','የኢትዮጵያ አእምሯዊ ንብረት ባለሥልጣን','government body','Ethiopia','ethiopian_intellectual_property_authority|eipa|eipa_ethiopia|ethiopian_intellectual_property_office|eipo|aemirawi_nibret_balesiltan'),
(147,'Ethiopian Broadcasting Corporation','የኢትዮጵያ ብሮድካስቲንግ ኮርፖሬሽን','government body','Ethiopia','ethiopian_broadcasting_corporation|ebc|ebc_ethiopia|etv|etv_ethiopia|ethiopian_television|ethiopian_radio|ethiopian_radio_and_television_agency|erta'),
(148,'Road Safety and Insurance Fund Service','የመንገድ ደህንነትና መድን ፈንድ አገልግሎት','government body','Ethiopia','road_safety_and_insurance_fund_service|rsifs|road_safety_and_insurance_fund|insurance_fund_service|national_road_safety_council|menged_dehninet_ena_medin_fund'),
(149,'Petroleum and Energy Authority','የነዳጅና ኢነርጂ ባለሥልጣን','government body','Ethiopia','petroleum_and_energy_authority|pea_ethiopia|ethiopian_petroleum_and_energy_authority|ethiopian_energy_authority|eea_ethiopia|nedaj_ena_energy_balesiltan'),
(150,'Ethiopian Media Authority','የኢትዮጵያ መገናኛ ብዙኃን ባለሥልጣን','government body','Ethiopia','ethiopian_media_authority|ema_ethiopia|ethiopia_media_authority|ethiopian_broadcasting_authority|eba_ethiopia|megenagna_bizuhan_balesiltan'),
(151,'House of Peoples'' Representatives','የኢ.ፌ.ዲ.ሪ የህዝብ ተወካዮች ምክር ቤት','government body','Ethiopia','house_of_peoples_representatives|house_of_peoples_representatives_of_ethiopia|hopr|hpr_ethiopia|ethiopian_parliament|parliament_of_ethiopia|yehizb_tewekayoch_mikir_bet|tewekayoch_mikir_bet'),
(152,'National Election Board of Ethiopia','የኢትዮጵያ ብሔራዊ ምርጫ ቦርድ','government body','Ethiopia','national_election_board_of_ethiopia|national_electoral_board_of_ethiopia|nebe|nebe_ethiopia|ethiopian_election_board|election_board_of_ethiopia|biherawi_mircha_board|mircha_board'),
(153,'Ethiopian Human Rights Commission','የኢትዮጵያ ሰብአዊ መብቶች ኮሚሽን','government body','Ethiopia','ethiopian_human_rights_commission|ehrc|ehrc_ethiopia|ethiopia_human_rights_commission|isemeko|sebawi_mebtoch_commission'),
(154,'Federal Ethics and Anti-Corruption Commission','የኢትዮጵያ የፌዴራል የስነ-ምግባርና የፀረ ሙስና ኮሚሽን','government body','Ethiopia','federal_ethics_and_anti_corruption_commission|ethiopian_federal_ethics_and_anti_corruption_commission|feacc|feacc_ethiopia|anti_corruption_commission_ethiopia|tsere_musina_commission|sine_migbar_ena_tsere_musina_commission'),
(155,'Education and Training Authority','የትምህርትና ሥልጠና ባለሥልጣን','government body','Ethiopia','education_and_training_authority|eta_ethiopia|ethiopian_education_and_training_authority|higher_education_relevance_and_quality_agency|herqa|timhirt_ena_siltena_balesiltan'),
(156,'Educational Assessment and Examinations Service','የትምህርት ምዘናና ፈተናዎች አገልግሎት','government body','Ethiopia','educational_assessment_and_examinations_service|education_assessment_and_examination_service|eaes|eaes_ethiopia|national_educational_assessment_and_examinations_agency|neaea|national_examination_agency_of_ethiopia|timhirt_mizena_ena_fetenawoch_agelglot'),
(157,'Ethiopian Public Health Institute','የኢትዮጵያ የኅብረተሰብ ጤና ኢንስቲትዩት','government body','Ethiopia','ethiopian_public_health_institute|ephi|ephi_ethiopia|ethiopia_public_health_institute|hibreteseb_tena_institute'),
(158,'Ethiopia Technology Authority','የኢትዮጵያ ቴክኖሎጂ ባለሥልጣን','government body','Ethiopia','ethiopia_technology_authority|ethiopian_technology_authority|eta_gov_et|technology_authority_ethiopia'),
(159,'Private Organizations Employees Social Security Administration','የግል ድርጅት ሠራተኞች ማህበራዊ ዋስትና አስተዳደር','government body','Ethiopia','private_organizations_employees_social_security_administration|poessa|poessa_ethiopia|private_organizations_employees_social_security_agency|private_organization_employees_pension|yegil_dirijit_serategnoch_mahiberawi_wastina'),
(160,'Public Servant Social Security Administration','የመንግስት ሠራተኞች ማህበራዊ ዋስትና አስተዳደር','government body','Ethiopia','public_servants_social_security_administration|public_servant_social_security_administration|psssa|psssa_ethiopia|public_servants_social_security_agency|social_security_agency_ethiopia|yemengist_serategnoch_mahiberawi_wastina'),
(161,'Ethiopian Health Insurance Service','የኢትዮጵያ ጤና መድን አገልግሎት','government body','Ethiopia','ethiopian_health_insurance_service|ehis|ehis_ethiopia|ethiopian_health_insurance_agency|ehia|ethiopian_health_insurance|ethiopia_tena_medin'),
(162,'Authority for Civil Society Organizations','የሲቪል ማህበረሰብ ድርጅቶች ባለስልጣን','government body','Ethiopia','authority_for_civil_society_organizations|acso|acso_ethiopia|agency_for_civil_society_organizations|charities_and_societies_agency|chsa|civil_mahibereseb_dirijitoch_balesiltan'),
(163,'Ethiopian Agriculture Authority','የኢትዮጵያ ግብርና ባለሥልጣን','government body','Ethiopia','ethiopian_agriculture_authority|ethiopian_agricultural_authority|eaa|eaa_ethiopia|ethiopia_agriculture_authority|gibrina_balesiltan'),
(164,'Ethiopian Pharmaceuticals Supply Service','የኢትዮጵያ መድኃኒት አቅራቢ አገልግሎት','government body','Ethiopia','ethiopian_pharmaceuticals_supply_service|ethiopian_pharmaceutical_supply_service|epss|epss_ethiopia|ethiopian_pharmaceuticals_supply_agency|epsa|pharmaceuticals_fund_and_supply_agency|pfsa|medhanit_akrabi_agelglot'),
(165,'Industrial Parks Development Corporation','የኢንዱስትሪ ፓርኮች ልማት ኮርፖሬሽን','government body','Ethiopia','industrial_parks_development_corporation|industry_parks_development_corporation|ipdc|ipdc_ethiopia|ethiopian_industrial_parks'),
(166,'Ethiopian News Agency','የኢትዮጵያ ዜና አገልግሎት','government body','Ethiopia','ethiopian_news_agency|ena_ethiopia|ethiopia_news_agency|ezea|ethiopia_zena_agelglot'),
(167,'Ethiopian Artificial Intelligence Institute','የኢትዮጵያ አርቲፊሻል ኢንተለጀንስ ኢንስቲትዩት','government body','Ethiopia','ethiopian_artificial_intelligence_institute|eaii|eaii_ethiopia|ethiopian_ai_institute|aii_ethiopia|artificial_intelligence_institute_ethiopia'),
(168,'Ethiopian Diaspora Service','የኢትዮጵያ ዳያስፖራ አገልግሎት','government body','Ethiopia','ethiopian_diaspora_service|eds_ethiopia|ethiopian_diaspora_agency|eda_ethiopia|diaspora_service_ethiopia|ethiopia_diaspora_agelglot'),
(169,'Ethiopian Investment Holdings','የኢትዮጵያ ኢንቨስትመንት ሆልዲንግስ','government body','Ethiopia','ethiopian_investment_holdings|eih|eih_ethiopia|ethiopia_investment_holdings'),
(170,'Ethiopian Lottery Service','የኢትዮጵያ ሎተሪ አገልግሎት','government body','Ethiopia','ethiopian_lottery_service|els_ethiopia|ethio_lottery|ethiolottery|ethiopian_lottery|national_lottery_administration|ethiopian_national_lottery_administration|enla|national_lottery_ethiopia|biherawi_lottery|biherawi_lottery_astedader'),
(171,'National Intelligence and Security Service','የብሔራዊ መረጃና ደህንነት አገልግሎት','government body','Ethiopia','national_intelligence_and_security_service|niss|niss_ethiopia|ethiopian_intelligence_service|biherawi_mereja_ena_dehninet'),
(172,'Government Communication Service','የመንግሥት ኮሙዩኒኬሽን አገልግሎት','government body','Ethiopia','government_communication_service|fdre_government_communication_service|gcs_ethiopia|government_communication_affairs_office|gcao|mengist_communication_agelglot'),
(173,'Environment Protection Authority','የአካባቢ ጥበቃ ባለሥልጣን','government body','Ethiopia','environment_protection_authority|environmental_protection_authority|epa_ethiopia|ethiopian_environmental_protection_authority|fdre_environment_protection_authority|akababi_tibeka_balesiltan'),
(174,'Ethiopian Meteorological Institute','የኢትዮጵያ ሚቲዎሮሎጂ ኢንስቲትዩት','government body','Ethiopia','ethiopian_meteorological_institute|ethiopian_meteorology_institute|ethiomet|ethiopia_meteorology|national_meteorology_agency|nma_ethiopia'),
(175,'Addis Ababa City Administration','የአዲስ አበባ ከተማ አስተዳደር','government body','Ethiopia','addis_ababa_city_administration|addis_abeba_city_administration|aaca|addis_ababa_city_government|city_government_of_addis_ababa|addis_ababa_mayor_office|addis_ababa_city_council|addis_ababa_ketema_astedader|addis_abeba_ketema_astedader'),
(176,'Addis Ababa Revenue Bureau','የአዲስ አበባ ከተማ አስተዳደር ገቢዎች ቢሮ','government body','Ethiopia','addis_ababa_revenue_bureau|addis_ababa_revenues_bureau|addis_abeba_revenue_bureau|addis_ababa_city_revenue_bureau|addis_ababa_revenue_authority|aarb|addis_ababa_gebiwoch_biro'),
(177,'Addis Ababa Trade Bureau','የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ','government body','Ethiopia','addis_ababa_trade_bureau|addis_abeba_trade_bureau|addis_ababa_city_trade_bureau|addis_ababa_trade_and_industry_bureau|addis_ababa_nigd_biro'),
(178,'Addis Ababa Land Development and Administration Bureau','የአዲስ አበባ ከተማ አስተዳደር የመሬት ልማትና አስተዳደር ቢሮ','government body','Ethiopia','addis_ababa_land_development_and_administration_bureau|addis_abeba_land_development_and_administration_bureau|addis_ababa_land_bureau|addis_ababa_land_administration|addis_ababa_land_development_and_management_bureau|addis_ababa_meret_limat_ena_astedader_biro|addis_ababa_meret_astedader'),
(179,'Addis Ababa Driver and Vehicle Licensing and Control Authority','የአዲስ አበባ ከተማ አሽከርካሪና ተሽከርካሪ ፈቃድና ቁጥጥር ባለሥልጣን','government body','Ethiopia','addis_ababa_driver_and_vehicle_licensing_and_control_authority|addis_abeba_driver_and_vehicle_licensing_and_control_authority|aadvlca|dvlca|addis_ababa_driver_and_vehicle_licensing|addis_ababa_driver_vehicle_permit_and_control_authority|ashkerkari_ena_teshkerkari_balesiltan|addis_ababa_ashkerkari_teshkerkari'),
(180,'Civil Registration and Residency Service Agency','የአዲስ አበባ ከተማ አስተዳደር የሲቪል ምዝገባና የነዋሪነት አገልግሎት ኤጀንሲ','government body','Ethiopia','civil_registration_and_residency_service_agency|civil_registration_and_residency_services_agency|crrsa|aacrrsa|addis_ababa_civil_registration_and_residency_service_agency|addis_ababa_civil_registration|addis_ababa_kebele_id|civil_mizgeba_ena_yenewarinet_agelglot'),
(181,'Addis Ababa Police Commission','የአዲስ አበባ ፖሊስ ኮሚሽን','government body','Ethiopia','addis_ababa_police_commission|addis_abeba_police_commission|addis_ababa_police|addis_abeba_police|aapc|addis_ababa_federal_police|addis_ababa_traffic_police|addis_police|addis_ababa_polis_commission'),
(182,'Addis Ababa Transport Bureau','የአዲስ አበባ ከተማ አስተዳደር ትራንስፖርት ቢሮ','government body','Ethiopia','addis_ababa_transport_bureau|addis_abeba_transport_bureau|addis_ababa_city_transport_bureau|addis_ababa_road_and_transport_bureau|addis_ababa_transport_biro'),
(183,'Addis Ababa Traffic Management Authority','የአዲስ አበባ ከተማ ትራፊክ ማኔጅመንት ባለሥልጣን','government body','Ethiopia','addis_ababa_traffic_management_authority|addis_abeba_traffic_management_authority|aatma|addis_ababa_traffic_management_agency|addis_ababa_traffic_management|tma_addis_ababa'),
(184,'Addis Ababa City Roads Authority','የአዲስ አበባ ከተማ መንገዶች ባለሥልጣን','government body','Ethiopia','addis_ababa_city_roads_authority|addis_abeba_city_roads_authority|aacra|addis_ababa_roads_authority|addis_ababa_mengedoch_balesiltan'),
(185,'Addis Ababa Housing Development Corporation','የአዲስ አበባ ቤቶች ልማት ኮርፖሬሽን','government body','Ethiopia','addis_ababa_housing_development_corporation|addis_abeba_housing_development_corporation|aahdc|addis_ababa_housing_corporation|addis_ababa_condominium|addis_ababa_betoch_limat_corporation'),
(186,'Federal Housing Corporation','የፌዴራል ቤቶች ኮርፖሬሽን','government body','Ethiopia','federal_housing_corporation|fhc_ethiopia|federal_housing_corporation_ethiopia|federal_betoch_corporation|kiray_betoch'),
(187,'Ethiopian Roads Administration','የኢትዮጵያ መንገዶች አስተዳደር','government body','Ethiopia','ethiopian_roads_administration|era_ethiopia|ethiopian_roads_authority|ethiopia_roads_administration|ethiopia_mengedoch_astedader'),
(188,'RIDE','ራይድ','delivery or ride service','Ethiopia','ride|ride_ethiopia|ride_8294|ride8294|ride_et|ride_addis|ride_taxi_ethiopia|ride_hybrid_designs|hybrid_designs|hybrid_designs_plc'),
(189,'Feres','ፈረስ','delivery or ride service','Ethiopia','feres|feres_transport|feres_ride|feres_taxi|feres_et|feres_ethiopia|feres_app|feres_6090'),
(190,'ZayRide','ዛይራይድ','delivery or ride service','Ethiopia','zayride|zay_ride|zayride_ethiopia|zayride_taxi|zaytech|zaytech_solutions'),
(191,'Taxiye','ታክሲዬ','delivery or ride service','Ethiopia','taxiye|taxiye_ethiopia|taxiye_ride|taxiye_et'),
(192,'Yango','ያንጎ','delivery or ride service','Ethiopia','yango|yango_ethiopia|yango_ride|yango_et|yango_addis'),
(193,'Little Ethiopia','ሊትል ኢትዮጵያ','delivery or ride service','Ethiopia','little_ethiopia|little_ride_ethiopia'),
(194,'Seregela','ሰረገላ','delivery or ride service','Ethiopia','seregela|seregela_ride|seregela_taxi|seregela_ethiopia|seregela_app'),
(195,'Adika','አዲካ','delivery or ride service','Ethiopia','adika|adika_taxi|adika_ride|adika_ethiopia|adika_taxi_service'),
(196,'Deliver Addis','ዴሊቨር አዲስ','delivery or ride service','Ethiopia','deliver_addis|deliveraddis|deliver_addis_ethiopia|roadrunner_technology_solutions'),
(197,'beU Delivery','ቢዩ ዴሊቨሪ','delivery or ride service','Ethiopia','beu_delivery|beudelivery|beu_ethiopia|beu_app|beu_food_delivery'),
(198,'ZMall','ዚሞል','delivery or ride service','Ethiopia','zmall|z_mall|zmall_delivery|zmall_ethiopia|zmall_app'),
(199,'Tikus Delivery','ትኩስ ዴሊቨሪ','delivery or ride service','Ethiopia','tikus_delivery|tikusdelivery|tikus_delivery_ethiopia|tikus_app'),
(200,'Eshi Express','እሺ ኤክስፕረስ','delivery or ride service','Ethiopia','eshi_express|eshiexpress|eshi_delivery|eshi_express_ethiopia'),
(201,'EthioDirect','ኢትዮዳይሬክት','money transfer','Ethiopia','ethiodirect|ethio_direct|cbe_ethiodirect|cbe_ethio_direct'),
(202,'CBE Connect','ሲቢኢ ኮኔክት','money transfer','Ethiopia','cbe_connect|cbeconnect'),
(203,'AwashRemit','አዋሽ ሬሚት','money transfer','Ethiopia','awashremit|awash_remit'),
(204,'Coopremit','ኩፕ ሬሚት','money transfer','Ethiopia','coopremit|coop_remit|coopbank_remit'),
(205,'Telebirr Remit','ቴሌብር ሬሚት','money transfer','Ethiopia','telebirr_remit|telebirrremit|tele_birr_remit'),
(206,'Kacha Remit','ካቻ ሬሚት','money transfer','Ethiopia','kacha_remit|kacharemit'),
(207,'Chapa Remit','ቻፓ ሬሚት','money transfer','Ethiopia','chapa_remit|chaparemit'),
(208,'Arif Remit','አሪፍ ሬሚት','money transfer','Ethiopia','arif_remit|arifremit|arifpay_remit'),
(209,'Laki Remit','ላኪ ሬሚት','money transfer','Ethiopia','laki_remit|lakiremit|lakipay_remit'),
(210,'FrankRemit','ፍራንክ ሬሚት','money transfer','Ethiopia','frankremit|frank_remit|francremit|franc_remit|santimpay_remit'),
(211,'CashGo','ካሽጎ','money transfer','Ethiopia','cashgo|cash_go|cashgo_app|cashgo_ethiopia'),
(212,'MamaPays','ማማ ፔይ','money transfer','Ethiopia','mamapays|mama_pays|mamapay|mama_pay'),
(213,'Mela Finance Inc','መላ ፋይናንስ','money transfer','Ethiopia','mela_finance|melafinance|mela_finance_inc|mela_app'),
(214,'Wegen Send','ወገን ሴንድ','money transfer','Ethiopia','wegen_send|wegensend|wegen_tech'),
(215,'Abyssinia Remit','አቢሲንያ ሬሚት','money transfer','Ethiopia','abyssinia_remit|abyssiniaremit|abysinia_remit'),
(216,'Abbaa Fardaa Remit','አባ ፈርዳ ሬሚት','money transfer','Ethiopia','abbaa_fardaa_remit|abbaa_fardaa|abbaafardaa|abba_farda_remit|abba_farda'),
(217,'Ethio Dash','ኢትዮ ዳሽ','money transfer','Ethiopia','ethio_dash|ethiodash|ethiodash_llc'),
(218,'Ethio Solutions Inc (Ethio Pay)','ኢትዮ ሶሉሽንስ','money transfer','Ethiopia','ethio_solutions|ethiosolutions|ethio_solutions_inc'),
(219,'Fastpay LLC (FastpayEt)','ፋስትፔይ','money transfer','Ethiopia','fastpayet|fastpay_et|fastpay_llc|fastpay_ethiopia'),
(220,'Selam Express','ሰላም ኤክስፕረስ','money transfer','Ethiopia','selam_express|selamexpress'),
(221,'Destta, INC.','ደስታ','money transfer','Ethiopia','destta|destta_inc|destta_remit'),
(222,'Bole Atlantic International','ቦሌ አትላንቲክ ኢንተርናሽናል','money transfer','Ethiopia','bole_atlantic|boleatlantic|bole_atlantic_international'),
(223,'Minte International Corp.','ምንቴ ኢንተርናሽናል','money transfer','Ethiopia','minte_international|minteinternational|minte_international_corp'),
(224,'KCB Bank Kenya','የኬንያ ንግድ ባንክ (ኬሲቢ)','bank','Kenya','kenya_commercial_bank|kcb|kcb_bank|kcb_bank_kenya|kcb_kenya|kcb_group'),
(225,'Equity Bank Kenya','ኢኩዊቲ ባንክ ኬንያ','bank','Kenya','equity_bank|equity_bank_kenya|equitybank|equity_group|equity_bank_limited'),
(226,'Co-operative Bank of Kenya','የኬንያ ኅብረት ሥራ ባንክ','bank','Kenya','cooperative_bank_of_kenya|co_operative_bank_of_kenya|coop_bank_kenya|co_op_bank_kenya|co_op_bank|coop_bank_of_kenya'),
(227,'NCBA Bank Kenya','ኤንሲቢኤ ባንክ ኬንያ','bank','Kenya','ncba|ncba_bank|ncba_bank_kenya|ncba_kenya|ncba_group'),
(228,'Absa Bank Kenya','አብሳ ባንክ ኬንያ','bank','Kenya','absa_bank_kenya|absa_kenya|absa_bank|absa'),
(229,'Stanbic Bank Kenya','ስታንቢክ ባንክ ኬንያ','bank','Kenya','stanbic_bank_kenya|stanbic_bank|stanbic_kenya|stanbic'),
(230,'I&M Bank','አይ ኤንድ ኤም ባንክ','bank','Kenya','i_and_m_bank|im_bank|i_m_bank|iandm_bank|i_and_m_bank_kenya'),
(231,'Standard Chartered Bank Kenya','ስታንዳርድ ቻርተርድ ባንክ ኬንያ','bank','Kenya','standard_chartered_bank_kenya|standard_chartered_kenya|standard_chartered_bank|standard_chartered|stanchart|stanchart_kenya'),
(232,'Britam','ብሪታም','insurer','Kenya','britam|britam_insurance|britam_kenya|britam_holdings|britam_life'),
(233,'Jubilee Insurance','ጁቢሊ ኢንሹራንስ','insurer','Kenya','jubilee_insurance|jubilee_insurance_kenya|jubilee_holdings|jubilee_health_insurance|jubilee_life_insurance'),
(234,'ICEA LION','አይሲኢኤ ላየን','insurer','Kenya','icea_lion|icealion|icea_lion_insurance|icea_lion_group|icea'),
(235,'CIC Insurance Group','ሲአይሲ ኢንሹራንስ ግሩፕ','insurer','Kenya','cic_insurance|cic_insurance_group|cic_group|cic_kenya|cic_general_insurance'),
(236,'APA Insurance','ኤፒኤ ኢንሹራንስ','insurer','Kenya','apa_insurance|apa_insurance_kenya|apa_life|apa_kenya'),
(237,'Safaricom','ሳፋሪኮም','telecom','Kenya','safaricom_plc|safaricom_kenya|safaricom_care'),
(238,'Airtel Kenya','ኤርቴል ኬንያ','telecom','Kenya','airtel_kenya|airtel|airtel_ke|airtelkenya|airtel_networks_kenya'),
(239,'Telkom Kenya','ቴልኮም ኬንያ','telecom','Kenya','telkom_kenya|telkom|telkom_ke|telkomkenya'),
(240,'Equitel','ኢኩዊቴል','telecom','Kenya','equitel|equitel_kenya|finserve|finserve_africa'),
(241,'Jamii Telecommunications','ጃሚ ቴሌኮሙኒኬሽንስ (ጄቲኤል)','telecom','Kenya','jamii_telecommunications|jamii_telecom|jtl_kenya|jtl_faiba|faiba'),
(242,'M-PESA (Kenya)','ኤም-ፔሳ (ኬንያ)','mobile money','Kenya','m_pesa_kenya|mpesa_kenya|safaricom_mpesa_kenya'),
(243,'Airtel Money','ኤርቴል መኒ','mobile money','Kenya','airtel_money|airtelmoney|airtel_money_kenya'),
(244,'T-Kash','ቲ-ካሽ','mobile money','Kenya','t_kash|tkash|telkom_t_kash|t_kash_kenya'),
(245,'Kenya Airways','የኬንያ አየር መንገድ','airline','Kenya','kenya_airways|kenyaairways|kenya_airways_kq|kq_kenya_airways'),
(246,'Jambojet','ጃምቦጄት','airline','Kenya','jambojet|jambo_jet|jambojet_kenya'),
(247,'Kenya Power','የኬንያ ኤሌክትሪክ ኃይል ኩባንያ (ኬንያ ፓወር)','utility','Kenya','kenya_power|kplc|kenya_power_and_lighting_company|kenya_power_and_lighting|kenyapower|kenya_power_care'),
(248,'Postal Corporation of Kenya','የኬንያ ፖስታ ኮርፖሬሽን (ፖስታ ኬንያ)','utility','Kenya','postal_corporation_of_kenya|posta_kenya|postakenya|kenya_post|ems_kenya'),
(249,'Nairobi City Water and Sewerage Company','የናይሮቢ ከተማ ውሃና ፍሳሽ ኩባንያ','utility','Kenya','nairobi_city_water_and_sewerage_company|nairobi_water|nairobiwater|ncwsc|nairobi_city_water'),
(250,'Central Bank of Kenya','የኬንያ ማዕከላዊ ባንክ','government body','Kenya','central_bank_of_kenya|cbk|cbk_kenya|centralbank_kenya'),
(251,'Kenya Revenue Authority','የኬንያ ገቢዎች ባለሥልጣን','government body','Kenya','kenya_revenue_authority|kra|kra_kenya|kra_care|kenya_revenue'),
(252,'eCitizen','ኢ-ሲቲዝን ኬንያ','government body','Kenya','ecitizen|e_citizen|ecitizen_kenya|ecitizen_go_ke|gava_mkononi'),
(253,'Department of Immigration','የኬንያ ኢሚግሬሽን መምሪያ','government body','Kenya','department_of_immigration_kenya|kenya_immigration|immigration_kenya|directorate_of_immigration_services|department_of_immigration_services|immigration_department_kenya'),
(254,'National Transport and Safety Authority','የኬንያ ብሔራዊ የትራንስፖርትና ደህንነት ባለሥልጣን','government body','Kenya','national_transport_and_safety_authority|ntsa|ntsa_kenya'),
(255,'National Police Service','የኬንያ ብሔራዊ ፖሊስ አገልግሎት','government body','Kenya','national_police_service_kenya|national_police_service|nps_kenya|kenya_police|kenya_police_service'),
(256,'Huduma Kenya (Huduma Centres)','ሁዱማ ኬንያ','government body','Kenya','huduma_kenya|hudumakenya|huduma_centre|huduma_center|huduma_centres'),
(257,'Social Health Authority','የኬንያ ማኅበራዊ ጤና ባለሥልጣን','government body','Kenya','social_health_authority|social_health_authority_kenya|sha_kenya'),
(258,'Higher Education Loans Board','የኬንያ ከፍተኛ ትምህርት ብድር ቦርድ','government body','Kenya','higher_education_loans_board|helb|helb_kenya'),
(259,'Little','ሊትል','delivery or ride service','Kenya','little_cab|littlecab|little_app|little_ride|little_kenya'),
(260,'Fargo Courier','ፋርጎ ኩሪየር','delivery or ride service','Kenya','fargo_courier|fargocourier|fargo_courier_kenya|fargo_courier_limited'),
(261,'Pick-Up Mtaani','ፒክአፕ ምታኒ','delivery or ride service','Kenya','pick_up_mtaani|pickup_mtaani|pickupmtaani'),
(262,'Upesi Money Transfer','ኡፔሲ ገንዘብ ማስተላለፊያ','money transfer','Kenya','upesi_money_transfer|upesi_money|upesi_kenya'),
(263,'Commercial Bank of Eritrea','የኤርትራ ንግድ ባንክ','bank','Eritrea','commercial_bank_of_eritrea|cber|cbe_eritrea'),
(264,'Housing and Commerce Bank of Eritrea','የኤርትራ የቤቶችና ንግድ ባንክ','bank','Eritrea','housing_and_commerce_bank_of_eritrea|housing_and_commerce_bank|housing_and_commercial_bank_of_eritrea|hcbe|hcb_eritrea'),
(265,'Eritrean Investment and Development Bank','የኤርትራ ኢንቨስትመንትና ልማት ባንክ','bank','Eritrea','eritrean_investment_and_development_bank|eidb|eidb_eritrea|eritrea_development_bank'),
(266,'National Insurance Corporation of Eritrea','የኤርትራ ብሔራዊ ኢንሹራንስ ኮርፖሬሽን','insurer','Eritrea','national_insurance_corporation_of_eritrea|nice_eritrea|niceritrea|nic_eritrea'),
(267,'EriTel (Eritrea Telecommunication Services Corporation)','ኤሪቴል','telecom','Eritrea','eritel|eri_tel|eritel_eritrea|eritrea_telecommunication_services_corporation|eritrean_telecommunications_corporation|eritrea_telecom'),
(268,'Eritrean Airlines','የኤርትራ አየር መንገድ','airline','Eritrea','eritrean_airlines|eritreanairlines|eritrea_airlines|eritrean_air'),
(269,'Eritrean Electricity Corporation','የኤርትራ ኤሌክትሪክ ኮርፖሬሽን','utility','Eritrea','eritrean_electricity_corporation|eritrean_electric_corporation|eritrea_electric_corporation|eritrea_electricity_corporation|eritrean_electricity_authority|eec_eritrea'),
(270,'Eritrean Postal Service','የኤርትራ ፖስታ አገልግሎት','utility','Eritrea','eritrean_postal_service|eritrea_postal_service|eritrea_post|eritrean_post|eps_eritrea'),
(271,'Bank of Eritrea','የኤርትራ ባንክ','government body','Eritrea','bank_of_eritrea|central_bank_of_eritrea|boe_eritrea'),
(272,'Ministry of Finance (Eritrea)','የኤርትራ የገንዘብ ሚኒስቴር','government body','Eritrea','ministry_of_finance_eritrea|eritrea_ministry_of_finance|ministry_of_finance_and_national_development_eritrea'),
(273,'Himbol Financial Services','ሂምቦል የፋይናንስ አገልግሎት','money transfer','Eritrea','himbol|himbol_financial_services|himbol_money_transfer|himbol_exchange'),
(274,'Banque pour le Commerce et l''Industrie – Mer Rouge (BCIMR)','የንግድና ኢንዱስትሪ ባንክ – ቀይ ባሕር (ቢሲአይኤምአር)','bank','Djibouti','banque_pour_le_commerce_et_l_industrie_mer_rouge|bcimr|bci_mr|bcimr_djibouti|bci_mer_rouge|bank_for_commerce_and_industry_red_sea'),
(275,'Bank of Africa Mer Rouge','ባንክ ኦፍ አፍሪካ – ቀይ ባሕር','bank','Djibouti','bank_of_africa_mer_rouge|boa_mer_rouge|boa_djibouti|bank_of_africa_djibouti|bank_of_africa_red_sea'),
(276,'CAC International Bank','ካክ ኢንተርናሽናል ባንክ','bank','Djibouti','cac_international_bank|cac_bank|cacbank|cac_bank_djibouti'),
(277,'Salaam African Bank','ሰላም አፍሪካን ባንክ','bank','Djibouti','salaam_african_bank|salaam_bank_djibouti|salaam_african_bank_djibouti'),
(278,'Saba African Bank','ሳባ አፍሪካን ባንክ','bank','Djibouti','saba_african_bank|saba_bank|saba_islamic_bank|saba_bank_djibouti'),
(279,'GXA Assurances','ጂኤክስኤ ኢንሹራንስ','insurer','Djibouti','gxa_assurances|gxa|gxa_assurance|gxa_insurance|gxa_djibouti'),
(280,'Assurance AMERGA','አሜርጋ ኢንሹራንስ','insurer','Djibouti','amerga|assurance_amerga|amerga_assurances|amerga_insurance'),
(281,'Djibouti Telecom','ጅቡቲ ቴሌኮም','telecom','Djibouti','djibouti_telecom|djiboutitelecom|djibouti_telecom_sa|djib_telecom'),
(282,'D-Money','ዲ-መኒ','mobile money','Djibouti','d_money|dmoney|d_money_djibouti|djibouti_money'),
(283,'Air Djibouti','ኤር ጅቡቲ','airline','Djibouti','air_djibouti|airdjibouti|air_djibouti_airlines|djibouti_airlines'),
(284,'Electricité de Djibouti','የጅቡቲ ኤሌክትሪክ ኃይል (ኢዲዲ)','utility','Djibouti','electricite_de_djibouti|edd_djibouti|electricity_of_djibouti|djibouti_electricity'),
(285,'Office National de l''Eau et de l''Assainissement de Djibouti (ONEAD)','የጅቡቲ ብሔራዊ የውሃና ፍሳሽ አገልግሎት ጽሕፈት ቤት (ኦኔአድ)','utility','Djibouti','onead|onead_djibouti|office_national_de_l_eau_et_de_l_assainissement_de_djibouti|djibouti_water|national_office_of_water_and_sanitation_djibouti'),
(286,'La Poste de Djibouti','የጅቡቲ ፖስታ','utility','Djibouti','la_poste_de_djibouti|poste_de_djibouti|poste_djibouti|djibouti_post|djibouti_post_office'),
(287,'Banque Centrale de Djibouti','የጅቡቲ ማዕከላዊ ባንክ','government body','Djibouti','banque_centrale_de_djibouti|central_bank_of_djibouti|bcd_djibouti|banque_centrale_djibouti'),
(288,'Ministère de l''Économie et des Finances','የጅቡቲ ኢኮኖሚና ፋይናንስ ሚኒስቴር','government body','Djibouti','ministere_de_l_economie_et_des_finances_djibouti|ministere_economie_finances_djibouti|ministry_of_economy_and_finance_djibouti|mefi_djibouti'),
(289,'Ministère de l''Intérieur','የጅቡቲ የአገር ውስጥ ጉዳይ ሚኒስቴር','government body','Djibouti','ministere_de_l_interieur_djibouti|ministere_interieur_djibouti|ministry_of_interior_djibouti|ministry_of_the_interior_djibouti'),
(290,'Police nationale','የጅቡቲ ብሔራዊ ፖሊስ','government body','Djibouti','police_nationale_djibouti|police_nationale|djibouti_police|djibouti_national_police|national_police_djibouti'),
(291,'Agence nationale des systèmes d''information de l''Etat (ANSIE)','የጅቡቲ ብሔራዊ የመንግሥት መረጃ ሥርዓቶች ኤጀንሲ (አንሲ)','government body','Djibouti','ansie|ansie_djibouti|agence_nationale_des_systemes_d_information_de_l_etat|national_agency_for_state_information_systems'),
(292,'Caisse Nationale de Sécurité Sociale (CNSS)','የጅቡቲ ብሔራዊ የማኅበራዊ ዋስትና ፈንድ (ሲኤንኤስኤስ)','government body','Djibouti','cnss_djibouti|cnss|caisse_nationale_de_securite_sociale|national_social_security_fund_djibouti'),
(293,'International Bank of Somalia (IBS)','የሶማሊያ ዓለም አቀፍ ባንክ (አይቢኤስ)','bank','Somalia','international_bank_of_somalia|ibs_bank|ibs_somalia|ibsbank'),
(294,'Premier Bank','ፕሪሚየር ባንክ','bank','Somalia','premier_bank|premier_bank_somalia|premierbank'),
(295,'Salaam Somali Bank','ሰላም ሶማሊ ባንክ','bank','Somalia','salaam_somali_bank|salaam_bank|salaam_bank_somalia|salaamsomalibank'),
(296,'Dahabshil Bank International','ዳሃብሺል ባንክ ኢንተርናሽናል','bank','Somalia','dahabshil_bank_international|dahabshiil_bank_international|dahabshiil_international_bank|dahabshiil_bank|dahabshil_bank'),
(297,'Amal Bank','አማል ባንክ','bank','Somalia','amal_bank|amal_bank_somalia|amalbank'),
(298,'First Somali Takaful Insurance','ፈርስት ሶማሊ ታካፉል ኢንሹራንስ','insurer','Somalia','first_somali_takaful_insurance|first_somali_takaful|first_somali_insurance'),
(299,'Amanah Insurance','አማና ኢንሹራንስ','insurer','Somalia','amanah_insurance|amanah_insurance_somalia|amanah_takaful'),
(300,'Baraka Takaful Insurance','ባራካ ታካፉል ኢንሹራንስ','insurer','Somalia','baraka_takaful_insurance|baraka_takaful|baraka_insurance'),
(301,'Salmaster Insurance','ሳልማስተር ኢንሹራንስ','insurer','Somalia','salmaster_insurance|salmaster'),
(302,'Hormuud Telecom','ሆርሙድ ቴሌኮም','telecom','Somalia','hormuud_telecom|hormuud|hormud|hormud_telecom|hormuud_telecom_somalia'),
(303,'Somtel','ሶምቴል','telecom','Somalia','somtel|somtel_network|somtel_somalia|somtel_international'),
(304,'Telesom','ቴሌሶም','telecom','Somalia','telesom|telesom_somaliland|telesom_company'),
(305,'Golis Telecom','ጎሊስ ቴሌኮም','telecom','Somalia','golis_telecom|golis|golis_telecom_somalia'),
(306,'EVC Plus','ኢቪሲ ፕላስ','mobile money','Somalia','evc_plus|evcplus|evc|hormuud_evc|evc_hormuud'),
(307,'Zaad','ዛድ','mobile money','Somalia','zaad|zaad_service|telesom_zaad|zaad_somaliland'),
(308,'Sahal','ሳሃል','mobile money','Somalia','sahal_service|golis_sahal|sahal_golis|sahal_mobile_money'),
(309,'e-Dahab','ኢ-ዳሃብ','mobile money','Somalia','edahab|e_dahab|edahab_somalia|e_dahab_service'),
(310,'Premier Wallet','ፕሪሚየር ዋሌት','mobile money','Somalia','premier_wallet|premierwallet'),
(311,'WAAFI','ዋፊ','mobile money','Somalia','waafi|waafi_app|waafi_pay|waafi_somalia|waafi_djibouti'),
(312,'Daallo Airlines','ዳሎ አየር መንገድ','airline','Somalia','daallo_airlines|daallo|daallo_airline|dallo_airlines'),
(313,'Jubba Airways','ጁባ ኤርዌይስ','airline','Somalia','jubba_airways|jubbaairways|jubba_airlines|juba_airways'),
(314,'BECO (Benadir Electric Company)','ቤኮ (የበናዲር ኤሌክትሪክ ኩባንያ)','utility','Somalia','beco|beco_somalia|benadir_electric_company|benadir_energy_company'),
(315,'NECSOM','ኔክሶም','utility','Somalia','necsom|necsom_puntland|necsom_somalia'),
(316,'Sompower','ሶምፓወር','utility','Somalia','sompower|som_power|sompower_hargeisa'),
(317,'Somali Postal Service','የሶማሊያ ፖስታ አገልግሎት','utility','Somalia','somali_postal_service|somalia_postal_service|somali_post|somalia_post'),
(318,'Central Bank of Somalia','የሶማሊያ ማዕከላዊ ባንክ','government body','Somalia','central_bank_of_somalia|cbs_somalia|centralbank_somalia'),
(319,'Bank of Somaliland','የሶማሊላንድ ባንክ','government body','Somalia','bank_of_somaliland|central_bank_of_somaliland|baanka_somaliland'),
(320,'National Identification and Registration Authority (NIRA)','የሶማሊያ ብሔራዊ የመታወቂያና ምዝገባ ባለሥልጣን (ኒራ)','government body','Somalia','national_identification_and_registration_authority|nira|nira_somalia'),
(321,'Immigration and Citizenship Agency (ICA)','የሶማሊያ ኢሚግሬሽንና ዜግነት ኤጀንሲ','government body','Somalia','immigration_and_citizenship_agency|ica_somalia|somalia_immigration|immigration_somalia|somali_immigration'),
(322,'Rikaab','ሪካብ','delivery or ride service','Somalia','rikaab|rikaab_app|rikaab_taxi'),
(323,'Dhaweeye','ዳዌዬ','delivery or ride service','Somalia','dhaweeye|dhaweye|dhaweeye_taxi|dhaweeye_app'),
(324,'Gulivery','ጉሊቨሪ','delivery or ride service','Somalia','gulivery|gulivery_delivery|gulivery_app'),
(325,'Dahabshiil','ዳሃብሺል','money transfer','Somalia','dahabshiil|dahabshil|dahabshill|dahabshiil_money_transfer|dahabshiil_group'),
(326,'Amal Express','አማል ኤክስፕረስ','money transfer','Somalia','amal_express|amal_express_money_transfer|amal_money_transfer'),
(327,'Tawakal Express','ታዋካል ኤክስፕረስ','money transfer','Somalia','tawakal_express|tawakal_money_transfer|tawakal_money_express'),
(328,'Kaah Express','ካህ ኤክስፕረስ','money transfer','Somalia','kaah_express|kaah_money_transfer|kaah_express_money_transfer'),
(329,'Iftin Express','ኢፍቲን ኤክስፕረስ','money transfer','Somalia','iftin_express|iftin_money_transfer|iftin_express_money_transfer'),
(330,'Taaj Money Transfer','ታጅ ገንዘብ ማስተላለፊያ','money transfer','Somalia','taaj_money_transfer|taaj_services|taaj_financial_services|taaj_express'),
(331,'Juba Express','ጁባ ኤክስፕረስ','money transfer','Somalia','juba_express|juba_express_money_transfer|jubba_express'),
(332,'Bakaal Express','ባካል ኤክስፕረስ','money transfer','Somalia','bakaal_express|bakaal_money_transfer|bakaal_express_money_transfer|bakal_express'),
(333,'DHL','ዲኤችኤል','delivery or ride service','International','dhl|dhl_express|dhlexpress|dhl_global|dhl_global_forwarding|dhl_ecommerce|dhl_delivery|dhl_courier|dhl_support|dhl_official|dhl_ethiopia'),
(334,'FedEx','ፌዴክስ','delivery or ride service','International','fedex|fed_ex|federal_express|fedex_express|fedex_delivery|fedex_courier|fedex_support|fedex_official|fedex_ethiopia'),
(335,'UPS','ዩፒኤስ','delivery or ride service','International','ups|ups_courier|ups_delivery|ups_express|ups_shipping|ups_parcel|ups_logistics|ups_worldwide_express|united_parcel_service|unitedparcelservice'),
(336,'Aramex','አራሜክስ','delivery or ride service','International','aramex|aramex_express|aramex_delivery|aramex_courier|aramex_support|aramex_official|aramex_ethiopia'),
(337,'EMS','ኢኤምኤስ','delivery or ride service','International','ems|ems_post|ems_express|ems_express_mail|ems_courier|ems_delivery|ems_international|express_mail_service'),
(338,'USPS','ዩኤስፒኤስ','delivery or ride service','International','usps|us_postal_service|united_states_postal_service|usps_delivery|usps_tracking|usps_support|usps_official'),
(339,'DPD','ዲፒዲ','delivery or ride service','International','dpd|dpd_group|dpd_delivery|dpd_parcel|deutscher_paketdienst|dpd_support|dpd_official'),
(340,'Uber','ኡበር','delivery or ride service','International','uber|uber_ride|uber_taxi|uber_driver|uber_eats|ubereats|uber_support|uber_official|uber_ethiopia'),
(341,'Bolt','ቦልት','delivery or ride service','International','bolt|bolt_ride|bolt_taxi|bolt_app|bolt_driver|bolt_food|bolt_eu|bolt_support|bolt_official|taxify'),
(342,'Glovo','ግሎቮ','delivery or ride service','International','glovo|glovo_app|glovo_delivery|glovo_courier|glovo_support|glovo_official|glovo_ethiopia'),
(343,'Western Union','ዌስተርን ዩኒየን','money transfer','International','western_union|westernunion|wu|wu_money_transfer|western_union_money_transfer|western_union_ethiopia|westernunion_ethiopia|western_union_support|western_union_official|western_union_agent'),
(344,'MoneyGram','መኒግራም','money transfer','International','moneygram|money_gram|moneygram_international|moneygram_money_transfer|moneygram_ethiopia|moneygram_support|moneygram_official|moneygram_agent'),
(345,'WorldRemit','ወርልድሬሚት','money transfer','International','worldremit|world_remit|worldremit_ethiopia|worldremit_support|worldremit_official'),
(346,'Remitly','ሬሚትሊ','money transfer','International','remitly|remitly_money_transfer|remitly_ethiopia|remitly_support|remitly_official'),
(347,'Ria Money Transfer','ሪያ መኒ ትራንስፈር','money transfer','International','ria|ria_money_transfer|riamoneytransfer|ria_money|ria_transfer|ria_financial|ria_ethiopia|ria_support|ria_official|ria_financial_services'),
(348,'Wise','ዋይዝ','money transfer','International','wise|wise_transfer|wise_money|wise_money_transfer|transferwise|transfer_wise|wise_com|wise_payments|wise_support|wise_official'),
(349,'Sendwave','ሴንድዌቭ','money transfer','International','sendwave|send_wave|sendwave_app|sendwave_support|sendwave_official'),
(350,'Taptap Send','ታፕታፕ ሴንድ','money transfer','International','taptap_send|taptapsend|tap_tap_send|taptap|taptap_send_ethiopia|taptap_send_support|taptap_send_official'),
(351,'Xoom','ዙም','money transfer','International','xoom|xoom_money_transfer|xoom_paypal|xoom_ethiopia|xoom_support|xoom_official'),
(352,'TransferGo','ትራንስፈርጎ','money transfer','International','transfergo|transfer_go|transfergo_support|transfergo_official'),
(353,'Paysend','ፔይሴንድ','money transfer','International','paysend|pay_send|paysend_money_transfer|paysend_support|paysend_official'),
(354,'LemFi','ሌምፋይ','money transfer','International','lemfi|lem_fi|lemonade_finance|lemfi_support|lemfi_official'),
(355,'ACE Money Transfer','ኤይስ መኒ ትራንስፈር','money transfer','International','ace_money_transfer|acemoneytransfer|ace_money|ace_money_transfer_official'),
(356,'Transfast','ትራንስፋስት','money transfer','International','transfast|trans_fast|transfast_money_transfer|transfast_ethiopia|transfast_official'),
(357,'Xpress Money','ኤክስፕረስ መኒ','money transfer','International','xpress_money|xpressmoney|xpress_money_transfer|express_money_transfer|xpress_money_ethiopia|xpress_money_official'),
(358,'Golden Money Transfer','ጎልደን መኒ ትራንስፈር','money transfer','International','golden_money_transfer|goldenmoneytransfer|golden_money|golden_money_transfer_ethiopia'),
(359,'Al Ansari Exchange','አል አንሳሪ ኤክስቼንጅ','money transfer','International','al_ansari_exchange|alansari_exchange|alansariexchange|al_ansari_money_transfer|al_ansari_exchange_official'),
(360,'Afriex','አፍሪኤክስ','money transfer','International','afriex|afri_ex|afriex_app|afriex_support|afriex_official'),
(361,'TalkRemit','ቶክሬሚት','money transfer','International','talkremit|talk_remit|talkremit_support|talkremit_official'),
(362,'Botim','ቦቲም','money transfer','International','botim|botim_app|botim_money|botim_support|botim_official'),
(363,'Walmart2World','ዎልማርት ቱ ወርልድ','money transfer','International','walmart2world|walmart_2_world|walmart_to_world|walmart_money_transfer'),
(364,'STC Pay','ኤስቲሲ ፔይ','money transfer','International','stc_pay|stcpay|stc_pay_support|stc_pay_official'),
(365,'WhatsApp','ዋትስአፕ','online platform','International','whatsapp|whats_app|watsapp|whatsap|whatsapp_support|whatsapp_official|whatsapp_business|whatsapp_team|whatsapp_help|whatsapp_ethiopia'),
(366,'Telegram','ቴሌግራም','online platform','International','telegram|telegram_support|telegramsupport|telegram_official|telegram_team|telegram_messenger|telegram_premium|telegram_security|telegram_ethiopia'),
(367,'Facebook','ፌስቡክ','online platform','International','facebook|face_book|fb|facebook_support|fb_support|facebook_official|facebook_security|facebook_team|facebook_help|facebook_ethiopia'),
(368,'Messenger','ሜሴንጀር','online platform','International','messenger|facebook_messenger|facebookmessenger|fb_messenger|messenger_app|meta_messenger|messenger_support|messenger_official'),
(369,'Instagram','ኢንስታግራም','online platform','International','instagram|insta_gram|instagram_support|instagram_official|instagram_help|instagram_team|ig_support|ig_official'),
(370,'TikTok','ቲክቶክ','online platform','International','tiktok|tik_tok|tiktok_support|tiktok_official|tiktok_shop|tiktok_team|tiktok_ethiopia'),
(371,'X (Twitter)','ኤክስ (ትዊተር)','online platform','International','x_twitter|twitter_x|twitter|x_com|x_corp|twitter_support|twitter_official|x_support|x_official'),
(372,'YouTube','ዩቲዩብ','online platform','International','youtube|you_tube|youtube_support|youtube_official|youtube_team|youtube_premium|yt_support'),
(373,'Snapchat','ስናፕቻት','online platform','International','snapchat|snap_chat|snapchat_support|snapchat_official|snapchat_team|snap_inc'),
(374,'LinkedIn','ሊንክድኢን','online platform','International','linkedin|linked_in|linkedin_support|linkedin_official|linkedin_jobs|linkedin_team'),
(375,'Viber','ቫይበር','online platform','International','viber|viber_support|viber_official|viber_team|viber_messenger|rakuten_viber'),
(376,'imo','ኢሞ','online platform','International','imo|imo_app|imo_messenger|imo_im|imoim|imo_official|imo_support|imo_video_call'),
(377,'WeChat','ዊቻት','online platform','International','wechat|we_chat|weixin|wechat_support|wechat_official|wechat_team'),
(378,'Signal','ሲግናል','online platform','International','signal|signal_app|signalapp|signal_messenger|signal_private_messenger|signal_support|signal_official'),
(379,'Pinterest','ፒንተረስት','online platform','International','pinterest|pinterest_support|pinterest_official|pinterest_team'),
(380,'Reddit','ሬዲት','online platform','International','reddit|reddit_support|reddit_official|reddit_admin|reddit_team'),
(381,'Discord','ዲስኮርድ','online platform','International','discord|discord_app|discord_support|discord_official|discord_nitro|discord_team'),
(382,'Threads','ትሬድስ','online platform','International','threads|threads_app|threads_meta|threads_instagram|threads_net|threads_official|threads_support'),
(383,'Meta','ሜታ','online platform','International','meta|meta_platforms|meta_inc|meta_support|meta_official|meta_business|meta_verified|meta_security|facebook_meta'),
(384,'PayPal','ፔይፓል','online platform','International','paypal|pay_pal|paypall|paypal_support|paypal_official|paypal_service|paypal_payments|paypal_security|paypal_ethiopia'),
(385,'Visa','ቪዛ','online platform','International','visa|visa_card|visacard|visa_credit_card|visa_inc|visa_international|visa_payment|visa_payments|visa_direct'),
(386,'Mastercard','ማስተርካርድ','online platform','International','mastercard|master_card|mastercard_support|mastercard_official|mastercard_international|mastercard_payments|mastercard_ethiopia'),
(387,'American Express','አሜሪካን ኤክስፕረስ','online platform','International','american_express|americanexpress|amex|amex_support|amex_official|american_express_support|american_express_official'),
(388,'Stripe','ስትራይፕ','online platform','International','stripe|stripe_payments|stripe_pay|stripe_inc|stripe_com|stripe_support|stripe_official'),
(389,'Payoneer','ፔዮኒር','online platform','International','payoneer|payoneer_support|payoneer_official|payoneer_team|payoneer_ethiopia'),
(390,'Skrill','ስክሪል','online platform','International','skrill|skrill_support|skrill_official|skrill_money_transfer|skrill_ethiopia'),
(391,'Neteller','ኔቴለር','online platform','International','neteller|neteller_support|neteller_official'),
(392,'Cash App','ካሽ አፕ','online platform','International','cash_app|cashapp|cash_app_support|cashapp_support|cash_app_official|cashapp_official|square_cash'),
(393,'Zelle','ዜል','online platform','International','zelle|zelle_pay|zellepay|zelle_support|zelle_official|zelle_payments'),
(394,'Venmo','ቬንሞ','online platform','International','venmo|venmo_support|venmo_official|venmo_payments'),
(395,'Apple Pay','አፕል ፔይ','online platform','International','apple_pay|applepay|apple_pay_support|apple_pay_official|apple_wallet'),
(396,'Google Pay','ጉግል ፔይ','online platform','International','google_pay|googlepay|gpay|g_pay|google_pay_support|google_pay_official|google_wallet'),
(397,'Alipay','አሊፔይ','online platform','International','alipay|ali_pay|alipay_plus|alipay_support|alipay_official'),
(398,'WeChat Pay','ዊቻት ፔይ','online platform','International','wechat_pay|wechatpay|weixin_pay|wechat_pay_support|wechat_pay_official'),
(399,'UnionPay','ዩኒየንፔይ','online platform','International','unionpay|union_pay|china_unionpay|unionpay_international|unionpay_support|unionpay_official'),
(400,'Revolut','ሬቮሉት','online platform','International','revolut|revolut_support|revolut_official|revolut_bank|revolut_business'),
(401,'Binance','ባይናንስ','online platform','International','binance|binance_support|binance_official|binance_team|binance_customer_service|binance_exchange|binance_p2p|binance_pay|binance_ethiopia'),
(402,'Coinbase','ኮይንቤዝ','online platform','International','coinbase|coin_base|coinbase_support|coinbase_official|coinbase_wallet|coinbase_exchange'),
(403,'Bybit','ባይቢት','online platform','International','bybit|by_bit|bybit_support|bybit_official|bybit_exchange|bybit_p2p'),
(404,'OKX','ኦኬኤክስ','online platform','International','okx|okex|okx_support|okx_official|okx_exchange|okx_p2p'),
(405,'Trust Wallet','ትረስት ዋሌት','online platform','International','trust_wallet|trustwallet|trust_wallet_support|trustwallet_support|trust_wallet_official'),
(406,'MetaMask','ሜታማስክ','online platform','International','metamask|meta_mask|metamask_support|metamask_official|metamask_wallet'),
(407,'Netflix','ኔትፍሊክስ','online platform','International','netflix|net_flix|netflix_support|netflix_official|netflix_account|netflix_premium|netflix_ethiopia'),
(408,'Spotify','ስፖቲፋይ','online platform','International','spotify|spotify_support|spotify_official|spotify_premium'),
(409,'Dropbox','ድሮፕቦክስ','online platform','International','dropbox|drop_box|dropbox_support|dropbox_official'),
(410,'ChatGPT','ቻትጂፒቲ','online platform','International','chatgpt|chat_gpt|openai|open_ai|chatgpt_plus|chatgpt_support|chatgpt_official|openai_support|openai_official'),
(411,'eBay','ኢቤይ','online platform','International','ebay|e_bay|ebay_support|ebay_official|ebay_motors|ebay_buyer_protection|ebay_payments|ebay_store|ebay_ethiopia'),
(412,'AliExpress','አሊኤክስፕረስ','online platform','International','aliexpress|ali_express|aliexpress_support|aliexpress_official|aliexpress_store|aliexpress_ethiopia'),
(413,'Alibaba','አሊባባ','online platform','International','alibaba|alibaba_com|alibabacom|alibaba_group|alibaba_official|alibaba_support|alibaba_trade_assurance|alibaba_express|alibaba_ethiopia'),
(414,'Temu','ቴሙ','online platform','International','temu|temu_app|temu_store|temu_support|temu_official|temu_ethiopia'),
(415,'Jiji','ጂጂ','online platform','International','jiji|jiji_ethiopia|jiji_com_et|jiji_et|jijiet|jiji_ng|jiji_africa|jiji_support|jiji_official'),
(416,'Jumia','ጁሚያ','online platform','International','jumia|jumia_support|jumia_official|jumia_pay|jumia_food|jumia_express|jumia_deals|jumia_ethiopia'),
(417,'OLX','ኦኤልኤክስ','online platform','International','olx|olx_group|olx_support|olx_official|olx_ethiopia'),
(418,'craigslist','ክሬግስሊስት','online platform','International','craigslist|craigs_list|craigslist_support|craigslist_official'),
(419,'Facebook Marketplace','ፌስቡክ ማርኬትፕሌስ','online platform','International','facebook_marketplace|facebookmarketplace|fb_marketplace|meta_marketplace|marketplace_facebook|facebook_marketplace_support'),
(420,'Etsy','ኤትሲ','online platform','International','etsy|etsy_shop|etsy_payments|etsy_support|etsy_official'),
(421,'dubizzle','ዱቢዝል','online platform','International','dubizzle|dubizzle_uae|dubizzle_motors|dubizzle_property|dubizzle_support|dubizzle_official'),
(422,'Booking.com','ቡኪንግ ዶት ኮም','online platform','International','booking_com|bookingcom|booking_dot_com|booking_holdings|booking_com_support|bookingcom_support|booking_com_official'),
(423,'Airbnb','ኤርቢኤንቢ','online platform','International','airbnb|air_bnb|airbnb_support|airbnb_official|airbnb_host|airbnb_ethiopia'),
(424,'Expedia','ኤክስፔዲያ','online platform','International','expedia|expedia_group|expedia_travel|expedia_support|expedia_official'),
(425,'Escrow.com','ኤስክሮው ዶት ኮም','online platform','International','escrow_com|escrowcom|escrow_dot_com|escrow_com_support|escrow_com_official|escrow_com_payments'),
(426,'Gmail','ጂሜይል','email provider','International','gmail|g_mail|gmail_com|google_mail|googlemail|gmail_support|gmail_official|gmail_team|gmail_security'),
(427,'Outlook','አውትሉክ','email provider','International','outlook|outlook_mail|outlook_com|outlook_live|microsoft_outlook|outlook_support|outlook_official|outlook_team|windows_live|live_mail|live_com|msn_mail'),
(428,'Hotmail','ሆትሜይል','email provider','International','hotmail|hot_mail|hotmail_com|msn_hotmail|windows_live_hotmail|hotmail_support|hotmail_official|hotmail_team'),
(429,'Yahoo Mail','ያሁ ሜይል','email provider','International','yahoo_mail|yahoomail|yahoo|yahoo_com|ymail|rocketmail|yahoo_support|yahoo_mail_support|yahoo_official|yahoo_team'),
(430,'iCloud Mail','አይክላውድ ሜይል','email provider','International','icloud|i_cloud|icloud_mail|icloud_com|apple_icloud|icloud_support|icloud_official|icloud_security'),
(431,'Proton Mail','ፕሮቶን ሜይል','email provider','International','proton|proton_mail|protonmail|proton_me|proton_mail_support|protonmail_support|proton_mail_official|protonmail_official'),
(432,'AOL','ኤኦኤል','email provider','International','aol|aol_mail|aolmail|aol_com|america_online|aol_support|aol_official'),
(433,'Zoho Mail','ዞሆ ሜይል','email provider','International','zoho_mail|zohomail|zoho|zoho_support|zoho_mail_support|zoho_official'),
(434,'GMX','ጂኤምኤክስ','email provider','International','gmx|gmx_mail|gmxmail|gmx_net|gmx_com|gmx_support|gmx_official'),
(435,'Yandex Mail','ያንዴክስ ሜይል','email provider','International','yandex_mail|yandexmail|yandex|yandex_ru|yandex_support|yandex_official');
INSERT INTO public.protected_names (id, name_en, name_am, kind, country)
SELECT id, name_en, name_am, kind, country FROM m2_names;
-- Where two rows fold to the same handle, the first row in the file keeps it.
INSERT INTO public.protected_handles (handle_fold, name_id, handle)
SELECT DISTINCT ON (f) f, id, h
  FROM (SELECT n.id, x.h, x.o,
               replace(translate(replace(lower(x.h), '_', ''), '01345', 'oleas'), 'rn', 'm') AS f
          FROM m2_names n, unnest(string_to_array(n.handles, '|')) WITH ORDINALITY AS x(h, o)
         WHERE x.h <> '') s
 ORDER BY f, id, o;
DO $seedsum$ BEGIN
  ASSERT (SELECT md5(string_agg(concat_ws('|', id, name_en, coalesce(name_am, ''), kind, country, handles), E'\n' ORDER BY id)) FROM m2_names) = '5f3c00c0d275589e33aa387e46f45648', 'reserved-names seed differs from docs/data/reserved-names-v3.csv';
END $seedsum$;
DROP TABLE m2_names;

INSERT INTO public.exact_only_words (word)
SELECT DISTINCT w FROM unnest(string_to_array('awash dashen wegagen fayda ride feres seregela ups ems bolt ria wise messenger imo signal threads meta visa stripe alibaba outlook proton ambo assault astro babile beats butterfly cactus case citizen coast crown delta deluxe essence falcon genesis habesha hero highland hills jack lee leo lincoln lux mac man marshall mini monster must national nothing nova omega orbit origin pearl pioneer predator radar rational reflex sharp singer stanley superstar tiger top total universal valve vans wilson yes york', ' ')) w;

-- Existing names enter the history as each account's first name (kept, never re-judged).
INSERT INTO public.alias_history (user_id, alias, alias_fold, taken_at, home_country_code)
SELECT p.user_id, lower(p.seller_alias),
       replace(translate(replace(lower(p.seller_alias), '_', ''), '01345', 'oleas'), 'rn', 'm'),
       p.created_at, d.home_country_code
  FROM public.profiles p LEFT JOIN public.user_directory d ON d.user_id = p.user_id
 WHERE p.seller_alias IS NOT NULL;

-- ── 15. The fold (never stored on profiles; alias_history keeps it for lookups) ──
CREATE FUNCTION public.name_fold(p text)
 RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE SET search_path TO 'public'
AS $$ SELECT replace(translate(replace(lower(coalesce(p, '')), '_', ''), '01345', 'oleas'), 'rn', 'm') $$;

-- Latin letters and digits only (business names, catalogue labels, place names).
CREATE FUNCTION public.name_fold_latin(p text)
 RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE SET search_path TO 'public'
AS $$ SELECT public.name_fold(regexp_replace(lower(coalesce(p, '')), '[^a-z0-9]', '', 'g')) $$;

-- Amharic: spaces and punctuation removed; ሐ/ኀ→ሀ, ሠ→ሰ, ዐ→አ, ፀ→ጸ in every order.
CREATE FUNCTION public.name_fold_am(p text)
 RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE SET search_path TO 'public'
AS $$ SELECT translate(regexp_replace(coalesce(p, ''), '[^ሀ-ፚ]', '', 'g'), 'ሐሑሒሓሔሕሖሗኀኁኂኃኄኅኆሠሡሢሣሤሥሦሧዐዑዒዓዔዕዖፀፁፂፃፄፅፆ', 'ሀሁሂሃሄህሆሇሀሁሂሃሄህሆሰሱሲሳሴስሶሷአኡኢኣኤእኦጸጹጺጻጼጽጾ') $$;

-- ── 17. Catalogue brand names, folded ───────────────────────────────────
CREATE FUNCTION public.name_brand_folds()
 RETURNS SETOF text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT DISTINCT public.name_fold_latin(o->>'label_en')
    FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
   WHERE (a.attr_key ~ '(^|[-_])(brand|make)([-_]|$)' OR a.preset = 'brand_name')
     AND a.attr_key <> 'traditional_make'
     AND coalesce(o->>'value', '') <> 'other'
     AND public.name_fold_latin(o->>'label_en') <> ''
$$;

-- Protected for rule e: brand names and protected handles that are not exact-only words.
CREATE FUNCTION public.name_protected_folds()
 RETURNS SETOF text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT f FROM (SELECT public.name_brand_folds() AS f
                 UNION SELECT handle_fold FROM public.protected_handles) s
   WHERE f NOT IN (SELECT public.name_fold(word) FROM public.exact_only_words)
$$;

-- Claim words: the fixed list, every country code and English country name,
-- and the English name of every city in an open market.
CREATE FUNCTION public.name_claim_folds()
 RETURNS SETOF text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT unnest(ARRAY['official','original','genuine','real','authentic','store','shop','shops',
    'market','mart','outlet','dealer','dealers','agent','agents','agency','distributor','sales',
    'service','services','care','center','centre','hq','team','group','company','plc','ltd','inc',
    'online','global','international','africa','addis','com','net','org','the'])
  UNION SELECT lower(c.code) FROM public.countries c
  UNION SELECT public.name_fold_latin(c.name_en) FROM public.countries c
  UNION SELECT public.name_fold_latin(l.name_en)
          FROM public.locations l JOIN public.countries c ON c.code = l.country_code
         WHERE l.level = 'city' AND c.is_active
$$;

-- ── 18. The judge for a seller name: 'a'..'e' or NULL (rule f is alias_taken).
-- p_shape = false skips rule a (the daily count of existing names).
CREATE FUNCTION public.alias_rule(p_alias text, p_shape boolean DEFAULT true)
 RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v      text := lower(btrim(coalesce(p_alias, '')));
  v_f    text;
  v_parts text[];
  v_kept text[];
BEGIN
  IF p_shape AND (char_length(v) NOT BETWEEN 5 AND 30
      OR v !~ '^[a-z][a-z0-9_]*$'
      OR char_length(regexp_replace(v, '[^a-z]', '', 'g')) < 3
      OR v ~ '[0-9]{7}' OR v ~ '_$' OR v ~ '__') THEN
    RETURN 'a';
  END IF;
  v_f := public.name_fold(v);
  IF v_f = '' THEN RETURN 'a'; END IF;
  IF position('ethio' IN v_f) > 0 THEN RETURN 'b'; END IF;

  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(string_to_array(v, '_')) WITH ORDINALITY AS u(x, o) WHERE x <> '';

  IF EXISTS (SELECT 1 FROM public.site_words w
              WHERE w.kind IN ('role', 'function')
                AND (public.name_fold(w.word) = ANY (v_parts)
                     OR left(v_f, char_length(public.name_fold(w.word))) = public.name_fold(w.word)
                     OR right(v_f, char_length(public.name_fold(w.word))) = public.name_fold(w.word))) THEN
    RETURN 'c';
  END IF;

  IF EXISTS (SELECT 1 FROM public.site_words w WHERE public.name_fold(w.word) = v_f)
     OR EXISTS (SELECT 1 FROM public.categories c
                 WHERE public.name_fold_latin(c.slug) = v_f OR public.name_fold_latin(c.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.locations l WHERE public.name_fold_latin(l.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.countries k WHERE public.name_fold_latin(k.name_en) = v_f)
     OR EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_f)
     OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_f) THEN
    RETURN 'd';
  END IF;

  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE p NOT IN (SELECT public.name_claim_folds());
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
              WHERE char_length(v_f) >= char_length(c.w) + 5
                AND ((right(v_f, char_length(c.w)) = c.w
                      AND left(v_f, char_length(v_f) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                  OR (left(v_f, char_length(c.w)) = c.w
                      AND right(v_f, char_length(v_f) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
    RETURN 'e';
  END IF;
  RETURN NULL;
END $function$;

-- The business name: rules b, d (brands, handles, protected names en+am) and e.
CREATE FUNCTION public.business_name_rule(p_name text)
 RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_lat   text := public.name_fold_latin(p_name);
  v_am    text := public.name_fold_am(p_name);
  v_parts text[];
  v_kept  text[];
BEGIN
  IF position('ethio' IN v_lat) > 0 OR position('ኢትዮ' IN v_am) > 0 THEN RETURN 'b'; END IF;
  IF (v_lat <> '' AND (EXISTS (SELECT 1 FROM public.name_brand_folds() b(f) WHERE b.f = v_lat)
                       OR EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = v_lat)
                       OR EXISTS (SELECT 1 FROM public.protected_names n WHERE public.name_fold_latin(n.name_en) = v_lat)))
     OR (v_am <> '' AND EXISTS (SELECT 1 FROM public.protected_names n
                                 WHERE n.name_am IS NOT NULL AND public.name_fold_am(n.name_am) = v_am)) THEN
    RETURN 'd';
  END IF;
  IF v_lat = '' THEN RETURN NULL; END IF;
  SELECT array_agg(public.name_fold(x) ORDER BY o) INTO v_parts
    FROM unnest(regexp_split_to_array(lower(p_name), '[^a-z0-9]+')) WITH ORDINALITY AS u(x, o) WHERE x <> '';
  SELECT array_agg(p ORDER BY o) INTO v_kept
    FROM unnest(v_parts) WITH ORDINALITY AS u(p, o)
   WHERE p NOT IN (SELECT public.name_claim_folds());
  IF coalesce(cardinality(v_kept), 0) BETWEEN 1 AND cardinality(v_parts) - 1
     AND array_to_string(v_kept, '') IN (SELECT public.name_protected_folds()) THEN
    RETURN 'e';
  END IF;
  IF EXISTS (SELECT 1 FROM public.name_claim_folds() c(w)
              WHERE char_length(v_lat) >= char_length(c.w) + 5
                AND ((right(v_lat, char_length(c.w)) = c.w
                      AND left(v_lat, char_length(v_lat) - char_length(c.w)) IN (SELECT public.name_protected_folds()))
                  OR (left(v_lat, char_length(c.w)) = c.w
                      AND right(v_lat, char_length(v_lat) - char_length(c.w)) IN (SELECT public.name_protected_folds())))) THEN
    RETURN 'e';
  END IF;
  RETURN NULL;
END $function$;

-- Rule f: another account holds the name now or held it before.
CREATE FUNCTION public.alias_taken(p_alias text, p_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p
                  WHERE p.user_id IS DISTINCT FROM p_uid AND p.seller_alias IS NOT NULL
                    AND public.name_fold(p.seller_alias) = public.name_fold(p_alias))
      OR EXISTS (SELECT 1 FROM public.alias_history h
                  WHERE h.user_id IS DISTINCT FROM p_uid AND h.alias_fold = public.name_fold(p_alias))
$$;

-- 20. When the next counted change is allowed (NULL = now). The first name is
-- free; one change in 30 days; within 24 h of a change one uncounted correction.
CREATE FUNCTION public.alias_next_change_at(p_uid uuid)
 RETURNS timestamptz LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  r          record;
  v_i        integer := 0;
  v_prev_t   timestamptz;
  v_prev_corr boolean := false;
  v_corr     boolean;
  v_counted  timestamptz;
BEGIN
  FOR r IN SELECT h.taken_at FROM public.alias_history h WHERE h.user_id = p_uid ORDER BY h.taken_at, h.id LOOP
    IF v_i = 0 THEN
      v_corr := false;
    ELSIF NOT v_prev_corr AND r.taken_at - v_prev_t < interval '24 hours' THEN
      v_corr := true;
    ELSE
      v_corr := false;
      v_counted := r.taken_at;
    END IF;
    v_prev_t := r.taken_at; v_prev_corr := v_corr; v_i := v_i + 1;
  END LOOP;
  IF v_i = 0 THEN RETURN NULL; END IF;
  IF NOT v_prev_corr AND now() - v_prev_t < interval '24 hours' THEN RETURN NULL; END IF;
  IF v_counted IS NOT NULL AND now() - v_counted < interval '30 days' THEN
    RETURN v_counted + interval '30 days';
  END IF;
  RETURN NULL;
END $function$;

CREATE FUNCTION public.alias_reason(p_rule text)
 RETURNS text LANGUAGE sql IMMUTABLE SET search_path TO 'public'
AS $$ SELECT CASE p_rule WHEN 'a' THEN 'aliasShape' WHEN 'b' THEN 'aliasEthio' WHEN 'c' THEN 'aliasRole'
                         WHEN 'd' THEN 'aliasReserved' WHEN 'e' THEN 'aliasClaim' END $$;
CREATE FUNCTION public.business_reason(p_rule text)
 RETURNS text LANGUAGE sql IMMUTABLE SET search_path TO 'public'
AS $$ SELECT CASE p_rule WHEN 'b' THEN 'businessEthio' WHEN 'd' THEN 'businessReserved'
                         WHEN 'e' THEN 'businessClaim' END $$;

-- The full answer for a name the caller wants (rules a-f, then the change rule).
CREATE FUNCTION public.alias_verdict(p_alias text, p_uid uuid)
 RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v      text := lower(btrim(coalesce(p_alias, '')));
  v_cur  text;
  v_rule text;
  v_next timestamptz;
BEGIN
  SELECT lower(seller_alias) INTO v_cur FROM public.profiles WHERE user_id = p_uid;
  IF v = v_cur THEN RETURN jsonb_build_object('ok', true); END IF;
  v_rule := public.alias_rule(v);
  IF v_rule IS NOT NULL THEN
    RETURN jsonb_build_object('ok', false, 'field', 'alias', 'reason', public.alias_reason(v_rule));
  END IF;
  IF public.alias_taken(v, p_uid) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'alias', 'reason', 'aliasTaken');
  END IF;
  IF v_cur IS NOT NULL THEN
    v_next := public.alias_next_change_at(p_uid);
    IF v_next IS NOT NULL THEN
      RETURN jsonb_build_object('ok', false, 'field', 'alias', 'reason', 'aliasTooSoon', 'detail', v_next);
    END IF;
  END IF;
  RETURN jsonb_build_object('ok', true);
END $function$;

-- ── 19. Checking writes nothing to the profile ─────────────────────────
CREATE FUNCTION public.check_seller_alias(p_alias text)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('alias_check');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'rate', 'reason', 'rateLimited',
                              'resets_at', v_rate->>'resets_at');
  END IF;
  RETURN public.alias_verdict(p_alias, v_uid);
END $function$;

-- 21. Three free names from the business name, else first and last name, Latin only.
CREATE FUNCTION public.suggest_seller_aliases(p_business_name text DEFAULT NULL,
                                              p_first_name text DEFAULT NULL,
                                              p_last_name text DEFAULT NULL)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_rate  jsonb;
  v_src   text;
  v_words text[];
  v_bases text[] := ARRAY[]::text[];
  v_out   text[] := ARRAY[]::text[];
  v_base  text;
  v_try   text;
  n       integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('alias_check');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'rate', 'reason', 'rateLimited',
                              'resets_at', v_rate->>'resets_at');
  END IF;
  v_src := coalesce(nullif(btrim(coalesce(p_business_name, '')), ''),
                    nullif(btrim(coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, '')), ''));
  IF v_src IS NULL OR v_src ~ '[^A-Za-z .''-]' THEN
    RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
  END IF;
  SELECT array_agg(w ORDER BY o) INTO v_words
    FROM unnest(regexp_split_to_array(lower(v_src), '[^a-z]+')) WITH ORDINALITY AS u(w, o) WHERE w <> '';
  IF coalesce(cardinality(v_words), 0) = 0 THEN
    RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
  END IF;
  -- Forms without an underscore first.
  v_bases := v_bases || array_to_string(v_words, '');
  IF cardinality(v_words) > 1 THEN
    v_bases := v_bases || (v_words[1] || left(v_words[cardinality(v_words)], 1))
                       || (v_words[cardinality(v_words)] || v_words[1])
                       || array_to_string(v_words, '_');
  END IF;
  FOREACH v_base IN ARRAY v_bases LOOP
    EXIT WHEN cardinality(v_out) >= 3;
    v_base := left(v_base, 28);
    FOR n IN 0..99 LOOP
      v_try := v_base || CASE WHEN n = 0 THEN '' ELSE n::text END;
      CONTINUE WHEN v_try = ANY (v_out);
      IF public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
        v_out := v_out || v_try;
        EXIT;
      END IF;
      -- A refusal by a rule other than taken is not cured by digits (shape aside).
      EXIT WHEN public.alias_rule(v_try) IS NOT NULL AND public.alias_rule(v_try) <> 'a';
    END LOOP;
  END LOOP;
  -- Fill up with further numbered forms of the first base.
  n := 1;
  WHILE cardinality(v_out) < 3 AND n <= 99 LOOP
    v_try := left(v_bases[1], 28) || n::text;
    IF NOT v_try = ANY (v_out) AND public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
      v_out := v_out || v_try;
    END IF;
    n := n + 1;
  END LOOP;
  RETURN jsonb_build_object('ok', true, 'suggestions', to_jsonb(v_out));
END $function$;

-- 20. The seller line: the name, "previously" for 365 days, member since.
CREATE FUNCTION public.my_seller_line()
 RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_p   public.profiles%ROWTYPE;
  v_prev text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_p FROM public.profiles WHERE user_id = v_uid;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = v_uid AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_p.seller_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  RETURN jsonb_build_object('alias', v_p.seller_alias, 'previous_alias', v_prev,
                            'member_since', v_p.created_at);
END $function$;

-- ── 19/20. save_posting_identity, whole from live. Changes: rate_gate('identity')
-- first; a new or changed name is judged by rules a-f and the change rule; a new
-- or changed business name by rules b, d, e; the history records every name.
CREATE OR REPLACE FUNCTION public.save_posting_identity(p_alias text DEFAULT NULL::text, p_seller_type text DEFAULT NULL::text, p_business_name text DEFAULT NULL::text, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_contact_pref jsonb DEFAULT NULL::jsonb, p_home_country_code character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_ref      jsonb := '[]'::jsonb;
  v_alias    text := lower(btrim(coalesce(p_alias, '')));
  v_type     text := nullif(btrim(coalesce(p_seller_type, '')), '');
  v_biz      text := nullif(btrim(coalesce(p_business_name, '')), '');
  v_first    text := nullif(btrim(coalesce(p_first_name, '')), '');
  v_last     text := nullif(btrim(coalesce(p_last_name, '')), '');
  v_country  char(2) := upper(nullif(btrim(coalesce(p_home_country_code, '')), ''));
  v_source   text;
  v_home     char(2);
  v_row      public.profiles%ROWTYPE;
  v_cur      public.profiles%ROWTYPE;
  v_rate     jsonb;
  v_verdict  jsonb;
  v_rule     text;
  v_alias_changed boolean := false;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('identity');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  SELECT * INTO v_cur FROM public.profiles WHERE user_id = v_uid;

  -- ---- alias: existing names are kept; a new or changed name is judged ----
  IF v_alias <> '' AND v_alias IS DISTINCT FROM lower(v_cur.seller_alias) THEN
    v_verdict := public.alias_verdict(v_alias, v_uid);
    IF NOT (v_verdict->>'ok')::boolean THEN
      v_ref := v_ref || jsonb_build_array(v_verdict - 'ok');
    ELSE
      v_alias_changed := true;
    END IF;
  END IF;

  -- ---- seller type / business name ----
  IF v_type IS NOT NULL AND v_type NOT IN ('person','business') THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','seller_type','reason','badValue','detail',v_type));
  END IF;
  IF coalesce(v_type, v_cur.seller_type) = 'business' THEN
    IF coalesce(v_biz, v_cur.business_name) IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
    END IF;
  END IF;
  IF v_biz IS NOT NULL AND char_length(v_biz) NOT BETWEEN 2 AND 80 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','badLength'));
  ELSIF v_biz IS NOT NULL AND v_biz IS DISTINCT FROM v_cur.business_name THEN
    v_rule := public.business_name_rule(v_biz);
    IF v_rule IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason',public.business_reason(v_rule)));
    END IF;
  END IF;

  -- ---- D17 — the seller's own name, refused BY FIELD when too long ----
  IF v_first IS NOT NULL AND char_length(v_first) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','first_name','reason','badLength'));
  END IF;
  IF v_last IS NOT NULL AND char_length(v_last) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','last_name','reason','badLength'));
  END IF;

  -- ---- contact preferences: the same shape the draft door enforces ----
  IF p_contact_pref IS NOT NULL THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- declared home country (never the observed fact) ----
  IF v_country IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = v_country) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','unknownCountry','detail',v_country));
    ELSE
      SELECT d.country_source, d.home_country_code INTO v_source, v_home
        FROM public.user_directory d WHERE d.user_id = v_uid;
      IF v_source = 'user_confirmed' AND v_home IS DISTINCT FROM v_country THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','countryAlreadyConfirmed','detail',v_home));
      END IF;
    END IF;
  END IF;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- Every field is optional: a NULL leaves the stored value alone.
  UPDATE public.profiles SET
    seller_alias  = coalesce(nullif(v_alias, ''), seller_alias),
    seller_type   = coalesce(v_type, seller_type),
    business_name = CASE WHEN coalesce(v_type, seller_type) = 'person' AND v_type = 'person'
                         THEN NULL ELSE coalesce(v_biz, business_name) END,
    first_name    = coalesce(v_first, first_name),
    last_name     = coalesce(v_last, last_name),
    contact_prefs = coalesce(p_contact_pref, contact_prefs),
    updated_at    = now()
  WHERE user_id = v_uid;

  IF v_alias_changed THEN
    UPDATE public.alias_history SET released_at = now()
     WHERE user_id = v_uid AND released_at IS NULL;
    INSERT INTO public.alias_history (user_id, alias, alias_fold, home_country_code)
    VALUES (v_uid, v_alias, public.name_fold(v_alias),
            (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid));
  END IF;

  IF v_country IS NOT NULL AND coalesce(v_source, 'unknown') <> 'user_confirmed' THEN
    PERFORM public.confirm_home_country(v_country);
  END IF;

  SELECT * INTO v_row FROM public.profiles WHERE user_id = v_uid;
  RETURN jsonb_build_object(
    'ok', true,
    'alias', v_row.seller_alias,
    'seller_type', v_row.seller_type,
    'business_name', v_row.business_name,
    'first_name', v_row.first_name,
    'last_name', v_row.last_name,
    'contact_prefs', v_row.contact_prefs,
    'home_country_code', v_row.home_country_code
  );
END $function$;

-- ── 22. admin_update_profile, whole from live plus p_reason. The signature
-- changes, so the function is dropped and recreated with its grants restated.
DROP FUNCTION public.admin_update_profile(uuid, text, text, character);
CREATE FUNCTION public.admin_update_profile(p_user_id uuid, p_display_name text, p_seller_alias text DEFAULT NULL::text, p_home_country_code character DEFAULT NULL::bpchar, p_reason text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old   record;
  v_name  text;
  v_alias text;
  v_rule  text;
  v_meta  jsonb := '{}'::jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('profiles', 'update');

  v_name  := btrim(COALESCE(p_display_name, ''));
  IF v_name = '' THEN
    RAISE EXCEPTION 'display name is required';
  END IF;
  v_alias := lower(NULLIF(btrim(COALESCE(p_seller_alias, '')), ''));

  IF p_home_country_code IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.countries c
                      WHERE c.code = p_home_country_code AND c.is_active) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;

  SELECT display_name, seller_alias, home_country_code
    INTO v_old
    FROM public.profiles
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  -- A new or changed name: shape and taken always apply; rules b-e can be
  -- overruled only with a reason of at least ten characters.
  IF v_alias IS NOT NULL AND v_alias IS DISTINCT FROM lower(v_old.seller_alias) THEN
    v_rule := public.alias_rule(v_alias);
    IF v_rule = 'a' THEN
      RAISE EXCEPTION 'seller alias refused: shape' USING ERRCODE = '22023';
    END IF;
    IF public.alias_taken(v_alias, p_user_id) THEN
      RAISE EXCEPTION 'seller alias already taken' USING ERRCODE = '23505';
    END IF;
    IF v_rule IS NOT NULL AND char_length(btrim(coalesce(p_reason, ''))) < 10 THEN
      RAISE EXCEPTION 'seller alias needs a reason: %', v_rule
        USING ERRCODE = '22023', HINT = 'reason_required';
    END IF;
  END IF;

  UPDATE public.profiles
     SET display_name      = v_name,
         seller_alias      = v_alias,
         home_country_code = COALESCE(p_home_country_code, home_country_code),
         updated_at        = now()
   WHERE user_id = p_user_id;

  IF lower(v_old.seller_alias) IS DISTINCT FROM v_alias THEN
    UPDATE public.alias_history SET released_at = now()
     WHERE user_id = p_user_id AND released_at IS NULL;
    IF v_alias IS NOT NULL THEN
      INSERT INTO public.alias_history (user_id, alias, alias_fold, home_country_code)
      VALUES (p_user_id, v_alias, public.name_fold(v_alias),
              (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = p_user_id));
    END IF;
  END IF;

  IF v_old.display_name IS DISTINCT FROM v_name THEN
    v_meta := v_meta || jsonb_build_object('display_name',
      jsonb_build_object('old', v_old.display_name, 'new', v_name));
  END IF;
  IF v_old.seller_alias IS DISTINCT FROM v_alias THEN
    v_meta := v_meta || jsonb_build_object('seller_alias',
      jsonb_build_object('old', v_old.seller_alias, 'new', v_alias));
  END IF;
  IF p_home_country_code IS NOT NULL
     AND v_old.home_country_code IS DISTINCT FROM p_home_country_code THEN
    v_meta := v_meta || jsonb_build_object('home_country_code',
      jsonb_build_object('old', v_old.home_country_code, 'new', p_home_country_code));
  END IF;

  PERFORM public.log_audit('user.profile_edit', 'profiles', p_user_id::text, v_meta);
  IF v_rule IS NOT NULL THEN
    PERFORM public.log_audit('user.alias_assigned', 'profiles', p_user_id::text,
      jsonb_build_object('alias', v_alias, 'rule', v_rule, 'reason', btrim(p_reason)));
  END IF;
END $function$;

-- ── 23. Daily count of names refused today by rules b-d ────────────────
CREATE FUNCTION public.seller_name_sweep()
 RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  SELECT count(*) INTO v_n FROM public.profiles p
   WHERE p.seller_alias IS NOT NULL
     AND public.alias_rule(p.seller_alias, false) IN ('b', 'c', 'd');
  INSERT INTO public.seller_name_sweep_runs (refused_count) VALUES (v_n);
  DELETE FROM public.seller_name_sweep_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_n;
END $function$;

DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'seller-name-sweep') THEN
    PERFORM cron.unschedule('seller-name-sweep');
  END IF;
  PERFORM cron.schedule('seller-name-sweep', '23 2 * * *', 'SELECT public.seller_name_sweep()');
END $cron$;

-- ── Closers ─────────────────────────────────────────────────────────────
DO $closers$
DECLARE f text;
BEGIN
  FOREACH f IN ARRAY ARRAY[
    'public.name_fold(text)', 'public.name_fold_latin(text)', 'public.name_fold_am(text)',
    'public.name_brand_folds()', 'public.name_protected_folds()', 'public.name_claim_folds()',
    'public.alias_rule(text, boolean)', 'public.business_name_rule(text)',
    'public.alias_taken(text, uuid)', 'public.alias_next_change_at(uuid)',
    'public.alias_reason(text)', 'public.business_reason(text)',
    'public.alias_verdict(text, uuid)', 'public.seller_name_sweep()'] LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', f);
    EXECUTE format('GRANT ALL ON FUNCTION %s TO service_role', f);
  END LOOP;
  FOREACH f IN ARRAY ARRAY[
    'public.check_seller_alias(text)', 'public.suggest_seller_aliases(text, text, text)',
    'public.my_seller_line()',
    'public.save_posting_identity(text, text, text, text, text, jsonb, character)',
    'public.admin_update_profile(uuid, text, text, character, text)'] LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon', f);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', f);
    EXECUTE format('GRANT ALL ON FUNCTION %s TO service_role', f);
  END LOOP;
END $closers$;

-- ── Proofs (behaviour; scratch rows rolled back inside the block) ──────────
DO $proof$
DECLARE
  r text[];
  v_cat uuid; v_attr uuid; v_loc uuid;
BEGIN
  -- Seeds.
  ASSERT (SELECT count(*) FROM public.site_words) = 331, 'site_words count';
  ASSERT (SELECT md5(string_agg(word, E'\n' ORDER BY word COLLATE "C")) FROM public.site_words) = '620e4c6692ecc9d74ff9dad4d1213a50', 'site words differ from scripts/site-words.txt';
  ASSERT (SELECT count(*) FROM public.site_words WHERE kind = 'role') = 7, 'role words';
  ASSERT (SELECT count(*) FROM public.site_words WHERE kind = 'function') = 7, 'function words';
  ASSERT (SELECT count(*) FROM public.protected_names) = 435, 'protected_names count';
  ASSERT (SELECT count(*) FROM public.protected_handles) = 2162, 'protected_handles count';
  ASSERT (SELECT h.name_id FROM public.protected_handles h WHERE h.handle_fold = 'coopbank') = 9, 'coopbank kept by row 9, not 226';
  ASSERT (SELECT count(*) FROM public.exact_only_words) = 78, 'exact_only_words count';

  -- The fold.
  ASSERT public.name_fold('Te1e_b1rr') = 'telebl' || 'rr', 'fold digits';
  ASSERT public.name_fold('turn') = 'tum', 'fold rn';
  ASSERT public.name_fold_am('ሐበሻ ሠ!') = 'ሀበሻሰ', 'fold amharic';

  -- 18. The judge: must be refused, with the rule.
  FOREACH r SLICE 1 IN ARRAY ARRAY[
    ['ethio_coffee','b'],['abebe_ethio','b'],['ethi0_coffee','b'],['admin_abebe','c'],
    ['abebeadmin','c'],['abebe_support','c'],['telebirr_official','c'],['login_help','c'],
    ['account','d'],['settings','d'],['telebirr','d'],['gmail_com','d'],['kenya','d'],
    ['telebirr_store','e'],['store_telebirr','e'],['telebirrstore','e'],['te1ebirr_store','e'],
    ['telebirr_agent','e'],['cbe_agent','e'],['cbe_kenya','e'],['telebirr_et','e'],
    ['abc_1234567','a'],['abel','a'],['_abebe','a'],['abebe__shop','a'],['12345abc','a']] LOOP
    ASSERT public.alias_rule(r[1]) IS NOT DISTINCT FROM r[2],
      format('judge %s: expected %s, got %s', r[1], r[2], public.alias_rule(r[1]));
  END LOOP;
  -- Must pass.
  FOREACH r SLICE 1 IN ARRAY ARRAY[['badminton_shop'],['selam_telebirr'],['abebe_kenya'],['abebe_et'],
    ['made_by_us'],['tiger_store'],['awash_market'],['abebe_phones'],['abebephones'],['selam2shop'],
    ['mekdes_boutique'],['hana_store']] LOOP
    ASSERT public.alias_rule(r[1]) IS NULL, format('judge %s should pass, got %s', r[1], public.alias_rule(r[1]));
  END LOOP;

  -- Business names.
  FOREACH r SLICE 1 IN ARRAY ARRAY[['Ethio Coffee','b'],['ኢትዮ ቡና','b'],['Telebirr','d'],['Awash Bank','d'],
    ['አዋሽ ባንክ','d'],['Telebirr Agent','e']] LOOP
    ASSERT public.business_name_rule(r[1]) IS NOT DISTINCT FROM r[2],
      format('business %s: expected %s, got %s', r[1], r[2], public.business_name_rule(r[1]));
  END LOOP;
  FOREACH r SLICE 1 IN ARRAY ARRAY[['Selam Telebirr Shop'],['Awash Coffee'],['Hana Boutique']] LOOP
    ASSERT public.business_name_rule(r[1]) IS NULL, format('business %s should pass', r[1]);
  END LOOP;

  -- Live-catalogue and live-place rules on scratch rows, rolled back.
  BEGIN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('e2e_m2_brand', 'E2E M2 Brand', 'single_select',
            '[{"value":"zorblax","label_en":"Zorblax","label_am":"ዞርብላክስ"}]'::jsonb)
    RETURNING id INTO v_attr;
    INSERT INTO public.categories (name_en, slug) VALUES ('Qwyxcat', 'e2e-m2-qwyxcat') RETURNING id INTO v_cat;
    INSERT INTO public.locations (level, country_code, name_en, slug)
    VALUES ('country', 'ET', 'Vrendolia', 'e2e-m2-vrendolia') RETURNING id INTO v_loc;
    ASSERT public.alias_rule('zorblax') = 'd', 'scratch brand exact';
    ASSERT public.alias_rule('zorblax_store') = 'e', 'scratch brand beside store';
    ASSERT public.alias_rule('selam_zorblax') IS NULL, 'scratch brand beside selam passes';
    ASSERT public.alias_rule('qwyxcat') = 'd', 'scratch category name exact';
    ASSERT public.alias_rule('vrendolia') = 'd', 'scratch place name exact';
    RAISE EXCEPTION 'm2 scratch rollback' USING ERRCODE = 'P0R99';
  EXCEPTION WHEN SQLSTATE 'P0R99' THEN NULL;
  END;
  ASSERT NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = 'e2e_m2_brand'), 'scratch attribute left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-m2-qwyxcat'), 'scratch category left';
  ASSERT NOT EXISTS (SELECT 1 FROM public.locations WHERE slug = 'e2e-m2-vrendolia'), 'scratch place left';

  -- History seeded from every existing name.
  ASSERT (SELECT count(*) FROM public.alias_history)
       = (SELECT count(*) FROM public.profiles WHERE seller_alias IS NOT NULL), 'history seeded';

  -- ACL read-backs.
  ASSERT NOT has_table_privilege('anon', 'public.alias_history', 'SELECT'), 'anon reads history';
  ASSERT NOT has_table_privilege('authenticated', 'public.alias_history', 'SELECT'), 'auth reads history';
  ASSERT NOT has_table_privilege('authenticated', 'public.protected_handles', 'SELECT'), 'auth reads handles';
  ASSERT NOT has_table_privilege('authenticated', 'public.site_words', 'SELECT'), 'auth reads site words';
  ASSERT NOT has_table_privilege('authenticated', 'public.seller_name_sweep_runs', 'SELECT'), 'auth reads sweep';
  ASSERT NOT has_function_privilege('authenticated', 'public.alias_rule(text, boolean)', 'EXECUTE'), 'auth runs alias_rule';
  ASSERT NOT has_function_privilege('anon', 'public.check_seller_alias(text)', 'EXECUTE'), 'anon runs check';
  ASSERT has_function_privilege('authenticated', 'public.check_seller_alias(text)', 'EXECUTE'), 'auth cannot check';
  ASSERT has_function_privilege('authenticated', 'public.admin_update_profile(uuid, text, text, character, text)', 'EXECUTE'), 'admin door grant';
  ASSERT NOT has_function_privilege('anon', 'public.admin_update_profile(uuid, text, text, character, text)', 'EXECUTE'), 'anon admin door';
  ASSERT NOT has_function_privilege('anon', 'public.save_posting_identity(text, text, text, text, text, jsonb, character)', 'EXECUTE'), 'anon identity door';
  ASSERT NOT has_function_privilege('authenticated', 'public.seller_name_sweep()', 'EXECUTE'), 'auth runs sweep';
  ASSERT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'seller-name-sweep' AND schedule = '23 2 * * *'), 'sweep scheduled';
  ASSERT (SELECT pg_get_function_arguments('public.save_posting_identity(text, text, text, text, text, jsonb, character)'::regprocedure))
       = 'p_alias text DEFAULT NULL::text, p_seller_type text DEFAULT NULL::text, p_business_name text DEFAULT NULL::text, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_contact_pref jsonb DEFAULT NULL::jsonb, p_home_country_code character DEFAULT NULL::bpchar',
       'identity door arguments';
END $proof$;

-- The comment-only file 20261004010309_60b466e2 (applied in error, executes nothing) gets its ledger row here.
INSERT INTO public.migration_marks (version) VALUES ('20261004010309') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks (version) VALUES ('20261004020000') ON CONFLICT DO NOTHING;
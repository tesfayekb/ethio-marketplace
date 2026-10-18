-- Bundle 20 turn 1, part 1 of 2 (2026-10-18). Tier A. DEC-198, DEC-202 — M1a: THE NAME LISTS OF v4 AND THE ACCENT FOLD.
-- e2e-areas: posting, admin-users
-- The operator's rulings of 2026-10-18 ("All as recommended", 00:28 local — DEC-198; DEC-202 07:22; DEC-203 07:37) on
-- the curator's reserved-names v4 research, built as ONE engine change before the v4 list (R9), in two tool-sized parts
-- (DEC-189): this part brings the lists and the folds; part 2 (20261019000000) changes the rules that read them. Between
-- the two the rules are M9's, reading the larger lists. Idempotent; a re-run changes nothing.
-- A. NEW name_rule_words (claim, institution, allow, allow_am) and protected_handles_am (Amharic short forms, filled by
--    the v4 seed): no client access — RLS on with deny policies (M2's pattern). Not personal data; no user id.
-- B. protected_names gains country_code (ISO, from countries) and international (DEC-202): a label that travels with
--    the row to its country's partition; no rule reads it — a name is checked for every seller in every country
--    (DEC-203, one global register).
-- C. The seed of docs/data/name-rules-v4.csv (88 rows): 68 to name_rule_words; the 11 exact-only words (R8, R13) to
--    exact_only_words; the 9 dropped handles (R8, R13) removed from protected_handles.
-- D. NEW name_unaccent; name_fold_latin reads accents as plain letters (R10).
-- E. name_claim_folds also reads the claim words of the list (R1, R3).
-- F. name_folds_rebuild also reads handle_am, allow, allow_am and institution; the lists rebuilt.
-- P. Proofs on literals and on this file's own seed (G27). M. The mark 20261018230000.
-- Applied on ethio-prod by the executor's migration tool on save; the operator applies the saved file on ethio-staging
-- and reads back the mark.

-- ===== A — the two list tables =====
CREATE TABLE IF NOT EXISTS public.name_rule_words (
  list text NOT NULL CHECK (list IN ('claim', 'institution', 'allow', 'allow_am')),
  word text NOT NULL,
  reason text NOT NULL,
  source text NOT NULL DEFAULT '',
  PRIMARY KEY (list, word)
);
CREATE TABLE IF NOT EXISTS public.protected_handles_am (
  handle_am_fold text PRIMARY KEY,
  name_id integer NOT NULL REFERENCES public.protected_names(id),
  handle_am text NOT NULL
);
DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['name_rule_words','protected_handles_am'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_deny_select', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_deny_insert', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_deny_update', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_deny_delete', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;

-- ===== B — the country code of every reserved name (DEC-202) =====
ALTER TABLE public.protected_names
  ADD COLUMN IF NOT EXISTS country_code character(2) REFERENCES public.countries(code),
  ADD COLUMN IF NOT EXISTS international boolean NOT NULL DEFAULT false;
UPDATE public.protected_names SET international = true WHERE country = 'International' AND NOT international;
UPDATE public.protected_names n SET country_code = c.code
  FROM public.countries c WHERE n.country <> 'International' AND c.name_en = n.country AND n.country_code IS NULL;
DO $chk$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'protected_names_country_code_chk') THEN
    ALTER TABLE public.protected_names ADD CONSTRAINT protected_names_country_code_chk
      CHECK ((international AND country_code IS NULL) OR (NOT international AND country_code IS NOT NULL));
  END IF;
END $chk$;

-- ===== C — the seed of docs/data/name-rules-v4.csv =====
CREATE TEMP TABLE b20_rules (ord integer, list text, word text, reason text, source text);
INSERT INTO b20_rules VALUES
(1, 'claim', 'eth', 'R1: the short form and three-letter code of Ethiopia, which the "ethio" rule does not reach ("cbe_eth", "commercial_bank_eth")', ''),
(2, 'claim', 'etiopia', 'R1: Ethiopia as Italian, Spanish and Norwegian write it (Italy and Norway are diaspora markets)', ''),
(3, 'claim', 'etiopien', 'R1: Ethiopia in Swedish and Danish (Sweden is a diaspora market)', ''),
(4, 'claim', 'athiopien', 'R1: Äthiopien (German) written without the umlaut', ''),
(5, 'claim', 'ityopya', 'R1: a transliteration of ኢትዮጵያ', ''),
(6, 'claim', 'prize', 'R3: case: CBE "80th anniversary" prize quiz; fake Safaricom Ethiopia prize page', 'https://haqcheck.org/november-monthly-information-disorder-summary/'),
(7, 'claim', 'reward', 'R3: case: Telegram account in Awash Bank''s name, "Invite and get a reward"', 'https://pesacheck-ui.dev.codeforafrica.org/fact-checks/english/fake-this-telegram-account-doesn-t-belong-to-awash-bank'),
(8, 'claim', 'gift', 'R3: case: "$8,000 Eid al-Adha gift" in Ethiopian Airlines'' name', 'https://ethiopiacheck.org/ethiopianairlineseidscam%e1%8b%a8%e1%8a%a2%e1%89%b5%e1%8b%ae%e1%8c%b5%e1%8b%ab-%e1%8a%a0%e1%8b%a8%e1%88%ad-%e1%88%98%e1%8a%95%e1%8c%88%e1%8b%b5/'),
(9, 'claim', 'bonus', 'R3: case: "50% airtime top-up bonus" in ethio telecom''s name', 'https://haqcheck.org/scam-ethio-telecom-is-not-offering-bonus-for-topping-up-airtime-using-new-mmi-codes/'),
(10, 'claim', 'giveaway', 'R3: pattern: "cash give out" in Ethiopian Airlines'' name (PesaCheck title; page not opened)', ''),
(11, 'claim', 'free', 'R3: case: fake "free travel to America" post; pattern: free tickets, free internet (PesaCheck titles)', 'https://globalvoices.org/2025/11/12/when-algorithms-bless-the-scammers-how-facebook-and-tiktok-are-failing-ethiopias-poor/'),
(12, 'claim', 'discount', 'R3: pattern: "50% discount" in ethio telecom''s name (PesaCheck titles; pages not opened)', ''),
(13, 'claim', 'topup', 'R3: case: airtime top-up bonus in ethio telecom''s name', 'https://haqcheck.org/scam-ethio-telecom-is-not-offering-bonus-for-topping-up-airtime-using-new-mmi-codes/'),
(14, 'claim', 'loan', 'R3: case: Facebook page "Mpesa Ethiopia" offering loans up to 50,000 birr', 'https://ethiopiacheck.org/scam-alert-fake-facebook-page-impersonating-safaricom-ethiopias-m-pesa-service/'),
(15, 'claim', 'job', 'R3: case: "20,000 US jobs" on a Telegram channel named for the US Embassy', 'https://haqcheck.org/monthly-disinformation-analysis-may-2022/'),
(16, 'claim', 'jobs', 'R3: case: same; and a fake UNICEF Ethiopia ad for 2,800 jobs', 'https://haqcheck.org/monthly-disinformation-analysis-may-2022/'),
(17, 'claim', 'vacancy', 'R3: case: the fake UNICEF Ethiopia job ad with a form fee', 'https://ethiopiacheck.org/scamalert/'),
(18, 'claim', 'recruitment', 'R3: case: an "aviation institute" claiming Ethiopian Airlines let it recruit', 'https://ethiopiacheck.org/ethiopianairlinesjobwebsite/'),
(19, 'claim', 'hiring', 'R3: pattern: the job lure, next to "job", "vacancy" and "recruitment"', ''),
(20, 'claim', 'registration', 'R3: case: "35,000 ETB financial aid" registration with a deposit', 'https://haqcheck.org/does-the-government-call-for-citizens-to-register-to-get-financial-aid/'),
(21, 'claim', 'visa', 'R3: case: social-media ads claiming to speed up US visa appointments', 'https://ethiopiacheck.org/the-u-s-embassy-in-addis-ababa-issued-a-public-alert-warning-against-social-media-and-digital-advertisements-claiming-to-expedite-visa-appointments-for-ethiopians-%e1%8a%a0%e1%88%9c%e1%88%aa-2/'),
(22, 'claim', 'lottery', 'R3: case: "Norway Visa Lottery Application Form"', 'https://haqcheck.org/is-there-a-visa-lottery-application-for-norway/'),
(23, 'claim', 'passport', 'R3: case: a "verified" Telegram channel selling 2–15-day passports in the immigration service''s name', 'https://ethiopiacheck.org/scamimmigration%e1%8b%a8%e1%88%9b%e1%8c%ad%e1%89%a0%e1%88%ad%e1%89%a0%e1%88%ad/'),
(24, 'claim', 'aid', 'R3: case: "UN aid through its channel"; "financial aid" registration', 'https://ethiopiacheck.org/telegram-message-which-claims-that-the-un-is-providing-assistance-to-ethiopians-through-its-telegram-channel-is-false-%e1%89%b4%e1%88%8c%e1%8c%8d%e1%88%ab%e1%88%9d/'),
(25, 'claim', 'donation', 'R3: case: faceless "charity" videos asking for donations', 'https://globalvoices.org/2025/11/12/when-algorithms-bless-the-scammers-how-facebook-and-tiktok-are-failing-ethiopias-poor/'),
(26, 'claim', 'customer', 'R3: case: Telegram bot "Telebirr Online customer servive" (sic)', 'https://ethiopiacheck.org/telebirr-online-scam-alert-%e1%89%b4%e1%88%8c-%e1%89%a5%e1%88%ad/'),
(27, 'claim', 'help', 'R3: pattern: "help desk" beside a protected name, as "customer" and "service" are used', ''),
(28, 'claim', 'update', 'R3: case: the fake telebirr bot offered to "upgrade" the account; CBE warns of "update" calls', 'https://ethiopiacheck.org/commercialbankofethiopiaaccountscam%e1%8b%a8%e1%8a%a2%e1%89%b5%e1%8b%ae%e1%8c%b5%e1%8b%ab%e1%8a%95%e1%8c%8d%e1%8b%b5%e1%89%a3%e1%8a%95%e1%8a%ad/'),
(29, 'claim', 'result', 'R3: pattern: fake national exam results sites (PesaCheck titles; pages not opened)', ''),
(30, 'claim', 'results', 'R3: pattern: same', ''),
(31, 'claim', 'mobile', 'R3: the banks'' own product word ("CBE Mobile Banking")', 'https://apps.apple.com/app/id1534203410'),
(32, 'claim', 'app', 'R3: the banks'' own product word ("Merchant App", "CBE Fuel App")', 'https://combanketh.et/ways-of-banking/applications'),
(33, 'claim', 'digital', 'R3: the banks'' own product word ("Apollo Digital Bank", "Siinqee Digital")', ''),
(34, 'claim', 'plus', 'R3: the banks'' own product word ("Dashen Plus", "Anbesa Plus")', 'https://dashenbanksc.com/app-downloads/'),
(35, 'claim', 'wallet', 'R3: the banks'' own product word ("Awash Wallet")', 'https://awashbank.com/wp-content/uploads/2024/10/Awash-Bank-Digital-Product-Catalogue.pdf'),
(36, 'claim', 'pay', 'R3: the banks'' own product word ("Awash Pay", "DubePay")', 'https://awashbank.com/wp-content/uploads/2024/10/Awash-Bank-Digital-Product-Catalogue.pdf'),
(37, 'claim', 'merchant', 'R3: the banks'' own product word ("DubeAle Merchant", "Chapa Merchant")', 'https://dashenbanksc.com/app-downloads/'),
(38, 'institution', 'embassy', 'R5: case: Telegram channel "US Embassy Addis Ababa"', 'https://haqcheck.org/monthly-disinformation-analysis-may-2022/'),
(39, 'institution', 'consulate', 'R5: ruled with embassy (no case of its own)', ''),
(40, 'institution', 'visa', 'R5: case: "Norway Visa Lottery"', 'https://haqcheck.org/is-there-a-visa-lottery-application-for-norway/'),
(41, 'institution', 'immigration', 'R5: case: TikTok account promising immigration to Canada', 'https://haqcheck.org/exposed-the-deceptive-tactics-of-a-scam-tiktok-account-promising-immigration-to-canada/'),
(42, 'institution', 'government', 'R5: ruled (no country-named case of its own)', ''),
(43, 'institution', 'agency', 'case: TikTok account "canada.agency.098" with a forged ministry letter (added under R5''s "only with a case")', 'https://haqcheck.org/false-the-letter-does-not-show-a-legal-representation-of-the-agency-by-the-ministry-of-foreign-affairs-and-has-been-altered/'),
(44, 'exact_only', 'amole', 'R8: an ordinary word (the salt bar); "amole_shop" is refused today', ''),
(45, 'exact_only', 'siinqee', 'R8: an Oromo word and women''s institution', ''),
(46, 'exact_only', 'golis', 'R8: the Golis mountain range; a common Somali business name', ''),
(47, 'exact_only', 'waafi', 'R8: an ordinary Somali word', ''),
(48, 'exact_only', 'hormuud', 'R8: a Somali clan name', ''),
(49, 'exact_only', 'destta', 'R8: one letter from Desta (ደስታ), a common name and word', 'https://forebears.io/ethiopia/surnames'),
(50, 'exact_only', 'kacha', 'R11: «ቃጫ» (fibre) and «ካቻ», both in the geezorg phone-book list; "kacha_shop" passes', 'https://github.com/geezorg/data (amharic/toponymic/BA-SGC-PhoneBook-SingleNames-Merged)'),
(51, 'exact_only', 'chapa', 'R11: an ordinary Swahili word (print, brand; 37 times in the Swahili news corpus)', 'https://github.com/masakhane-io/masakhane-news (data/swa)'),
(52, 'exact_only', 'faiba', 'R11: the Swahili word for fibre, used by other operators too ("Faiba hutumia nyaya…", Vodacom Tanzania)', 'https://vodafibre.vodacom.co.tz/SelfService/Content/Documents/Vodacom_Tanz/FAQs_Swahili.pdf'),
(53, 'exact_only', 'amerga', 'R11: a given name in the geezorg phone-book list («አመርጋ»)', 'https://github.com/geezorg/data (amharic/toponymic/BA-SGC-PhoneBook-SingleNames-Merged)'),
(54, 'exact_only', 'jiji', 'R11: an ordinary Swahili word ("city"; 172 times in the Swahili news corpus)', 'https://github.com/masakhane-io/masakhane-news (data/swa)'),
(55, 'drop_handle', 'moshe', 'R8: the old abbreviation of the Ministry of Science and Higher Education, merged into Education in 2021; it refuses the given name Moshe', ''),
(56, 'drop_handle', 'dars', 'R11: the Arabic word for a lesson (Somali «darsi»); DARS keeps dars_ethiopia, dara_ethiopia and its full names', 'curator''s own word list'),
(57, 'drop_handle', 'esl', 'R11: the common acronym "ESL" (English as a second language); the row keeps eslse, esl_ethiopia and its full names', 'English top 40,000 (wordfreq)'),
(58, 'drop_handle', 'hormud', 'R11: the clan name with the double vowel written single, as names often are; the row''s one exact-only word is hormuud (R8), and hormud_telecom stays', 'https://github.com/masakhane-io/masakhane-news (data/som)'),
(59, 'drop_handle', 'moa', 'R11: a given name («ሞኣ», geezorg phone-book list); the Ministry keeps moa_ethiopia, gibrina_minister and its full names', 'https://github.com/geezorg/data (amharic/toponymic/BA-SGC-PhoneBook-SingleNames-Merged)'),
(60, 'drop_handle', 'moe', 'R11: the given name Moe; the Ministry keeps moe_ethiopia, timhirt_minister and its full names', 'English top 40,000 (wordfreq)'),
(61, 'drop_handle', 'mofa', 'R11: Oromo «moofaa» (old; 5 times in the Oromo news corpus); the Ministry keeps mfa, mofa_ethiopia and its full names', 'https://github.com/masakhane-io/masakhane-news (data/orm)'),
(62, 'drop_handle', 'moti', 'R11: Oromo «mootii» (king; 83 times in the Oromo news corpus), also a given name; the Ministry keeps motri, motri_ethiopia and its full names', 'https://github.com/masakhane-io/masakhane-news (data/orm)'),
(63, 'drop_handle', 'wu', 'R11: the surname Wu; Western Union keeps western_union, westernunion and its full names', 'English top 40,000 (wordfreq)'),
(64, 'allow', 'banked', 'one letter from bankmed (BankMed)', 'English top 40,000 (wordfreq)'),
(65, 'allow', 'barclay', 'one letter from barclays (Barclays)', 'English top 40,000 (wordfreq)'),
(66, 'allow', 'bolted', 'one letter from bolteu (Bolt)', 'English top 40,000 (wordfreq)'),
(67, 'allow', 'citizen', 'one letter from ecitizen (eCitizen)', 'English top 40,000 (wordfreq)'),
(68, 'allow', 'cloud', 'one letter from icloud (iCloud Mail)', 'English top 40,000 (wordfreq)'),
(69, 'allow', 'dahab', 'one letter from edahab (e-Dahab)', 'curator''s own word list'),
(70, 'allow', 'discard', 'one letter from discord (Discord)', 'English top 40,000 (wordfreq)'),
(71, 'allow', 'finance', 'one letter from binance (Binance)', 'English top 40,000 (wordfreq)'),
(72, 'allow', 'finlay', 'one letter from finpay (FinPay Digital Financial Solution)', 'English top 40,000 (wordfreq)'),
(73, 'allow', 'firsthand', 'one letter from firstrand (First National Bank (FNB))', 'English top 40,000 (wordfreq)'),
(74, 'allow', 'interest', 'one letter from pinterest (Pinterest)', 'English top 40,000 (wordfreq)'),
(75, 'allow', 'invested', 'one letter from investec (Investec)', 'English top 40,000 (wordfreq)'),
(76, 'allow', 'money', 'one letter from dmoney (D-Money)', 'English top 40,000 (wordfreq)'),
(77, 'allow', 'papal', 'one letter from paypal (PayPal)', 'English top 40,000 (wordfreq)'),
(78, 'allow', 'radeet', 'one letter from rideet (RIDE)', 'https://github.com/geezorg/data (amharic/toponymic/BA-SingleNames)'),
(79, 'allow', 'remit', 'one letter from uremit (U Remit International)', 'English top 40,000 (wordfreq)'),
(80, 'allow', 'revolt', 'one letter from revolut (Revolut)', 'English top 40,000 (wordfreq)'),
(81, 'allow', 'shrill', 'one letter from skrill (Skrill)', 'English top 40,000 (wordfreq)'),
(82, 'allow', 'skill', 'one letter from skrill (Skrill)', 'English top 40,000 (wordfreq)'),
(83, 'allow', 'telecom', 'one letter from telesom (Telesom)', 'English top 40,000 (wordfreq)'),
(84, 'allow', 'tunes', 'one letter from thunes (Thunes (Transfer to Mobile Financial Service Ltd))', 'English top 40,000 (wordfreq)'),
(85, 'allow', 'twister', 'one letter from twitter (X (Twitter))', 'English top 40,000 (wordfreq)'),
(86, 'allow', 'youtuber', 'one letter from youtube (YouTube)', 'English top 40,000 (wordfreq)'),
(87, 'allow_am', 'ኤክስፔሪያ', 'one letter from ኤክስፔዲያ (Expedia)', 'ethio.com catalogue labels (definitions_51)'),
(88, 'allow_am', 'ጎልድስታር', 'one letter from ጎልድስታክ (Goldstack Technologies)', 'ethio.com catalogue labels (definitions_51)');
DO $seedsum$ BEGIN
  IF (SELECT md5(string_agg(concat_ws('|', list, word, reason, source), E'\n' ORDER BY ord)) FROM b20_rules) <> 'bc0207b40c83962391d423384647f96b' THEN
    RAISE EXCEPTION 'B20M1a C: the seed differs from docs/data/name-rules-v4.csv';
  END IF;
END $seedsum$;
INSERT INTO public.name_rule_words (list, word, reason, source)
SELECT list, word, reason, source FROM b20_rules WHERE list IN ('claim', 'institution', 'allow', 'allow_am')
ON CONFLICT (list, word) DO NOTHING;
INSERT INTO public.exact_only_words (word)
SELECT word FROM b20_rules WHERE list = 'exact_only' ON CONFLICT (word) DO NOTHING;
DELETE FROM public.protected_handles
 WHERE handle_fold IN (SELECT public.name_fold(word) FROM b20_rules WHERE list = 'drop_handle');
DROP TABLE b20_rules;

-- ===== D — the accent fold (R10) =====
CREATE OR REPLACE FUNCTION public.name_unaccent(p text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE PARALLEL SAFE
 SET search_path TO 'public'
AS $function$
  -- R10 (DEC-198): Latin letters with accents become their plain letter before any business-name rule reads them
  -- ("Télébirr" is "telebirr"); lower-cased; æ, œ and ß become two letters. Every other character is kept.
  SELECT replace(replace(replace(translate(lower(coalesce(p, '')),
    'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžøØđĐłŁħĦıŧŦ',
    'aaaaaaceeeeiiiinooooouuuuyaaaaaaceeeeiiiinooooouuuuyyaaaaaaccccccccddeeeeeeeeeegggggggghhiiiiiiiiijjkkllllllnnnnnnoooooorrrrrrssssssssttttuuuuuuuuuuuuwwyyyzzzzzzooddllhhitt'), 'æ', 'ae'), 'œ', 'oe'), 'ß', 'ss')
$function$;
REVOKE ALL ON FUNCTION public.name_unaccent(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_unaccent(text) TO service_role;

CREATE OR REPLACE FUNCTION public.name_fold_latin(p text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE PARALLEL SAFE
 SET search_path TO 'public'
AS $function$
  -- Latin letters and digits only (business names, catalogue labels, place names). R10: accents folded first.
  SELECT public.name_fold(regexp_replace(public.name_unaccent(coalesce(p, '')), '[^a-z0-9]', '', 'g'))
$function$;
REVOKE ALL ON FUNCTION public.name_fold_latin(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_fold_latin(text) TO service_role;

-- ===== E — the claim words =====
CREATE OR REPLACE FUNCTION public.name_claim_folds()
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
  -- DEC-198 R1, R3: the claim words of docs/data/name-rules-v4.csv (eth, etiopia, the lure words …).
  UNION SELECT public.name_fold(w.word) FROM public.name_rule_words w WHERE w.list = 'claim'
$$;
REVOKE ALL ON FUNCTION public.name_claim_folds() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_claim_folds() TO service_role;

-- ===== F — the lists' rebuild, and the lists rebuilt =====
CREATE OR REPLACE FUNCTION public.name_folds_rebuild()
 RETURNS integer
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rows integer;
BEGIN
  -- One rebuild at a time; the whole table is replaced in this transaction,
  -- so a reader sees the old set or the new one, never a half.
  PERFORM pg_advisory_xact_lock(hashtext('name_folds_rebuild'));
  -- M7 / INC-432 — WHERE true: the API connection's safe-update refuses a bare DELETE.
  DELETE FROM public.name_folds WHERE true;
  INSERT INTO public.name_folds (kind, fold)
  SELECT DISTINCT s.kind, s.fold FROM (
              SELECT 'site'::text AS kind, public.name_fold(w.word) AS fold FROM public.site_words w
    UNION ALL SELECT 'role', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'role'
    UNION ALL SELECT 'function', public.name_fold(w.word) FROM public.site_words w WHERE w.kind = 'function'
    UNION ALL SELECT 'category', public.name_fold_latin(c.slug) FROM public.categories c
    UNION ALL SELECT 'category', public.name_fold_latin(c.name_en) FROM public.categories c
    UNION ALL SELECT 'place', public.name_fold_latin(l.name_en) FROM public.locations l
    UNION ALL SELECT 'country', public.name_fold_latin(k.name_en) FROM public.countries k
    UNION ALL SELECT 'brand', b.f FROM public.name_brand_folds() b(f)
    UNION ALL SELECT 'handle', h.handle_fold FROM public.protected_handles h
    UNION ALL SELECT 'exact_only', public.name_fold(e.word) FROM public.exact_only_words e
    UNION ALL SELECT 'claim', c.f FROM public.name_claim_folds() c(f)
    UNION ALL SELECT 'name_latin', public.name_fold_latin(n.name_en) FROM public.protected_names n
    UNION ALL SELECT 'name_am', public.name_fold_am(n.name_am) FROM public.protected_names n
               WHERE n.name_am IS NOT NULL
    -- DEC-198 R2, R4, R5: the Amharic short forms, the never-refused words and the institution words.
    UNION ALL SELECT 'handle_am', h.handle_am_fold FROM public.protected_handles_am h
    UNION ALL SELECT 'allow', public.name_fold(w.word) FROM public.name_rule_words w WHERE w.list = 'allow'
    UNION ALL SELECT 'allow_am', public.name_fold_am(w.word) FROM public.name_rule_words w WHERE w.list = 'allow_am'
    UNION ALL SELECT 'institution', public.name_fold(w.word) FROM public.name_rule_words w WHERE w.list = 'institution'
  ) s
  WHERE s.fold IS NOT NULL;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  INSERT INTO public.name_folds_runs (rows) VALUES (v_rows);
  DELETE FROM public.name_folds_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_rows;
END $function$;
REVOKE ALL ON FUNCTION public.name_folds_rebuild() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_folds_rebuild() TO service_role;
SELECT public.name_folds_rebuild();

-- ===== P — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_t   text;
BEGIN
  -- P1. Every new or redeclared body by fingerprint (DEC-190), with its header.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_unaccent(text)'::regprocedure;
  IF v_md5 <> '94c7cabb2dfa30d5cac494eb60a41bbd' OR v_vol <> 'i' OR v_def <> false OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1a P1.1: name_unaccent(text) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_fold_latin(text)'::regprocedure;
  IF v_md5 <> '1234da31e495585eeb88b0fbabbcf33e' OR v_vol <> 'i' OR v_def <> false OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1a P1.2: name_fold_latin(text) is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_claim_folds()'::regprocedure;
  IF v_md5 <> 'b9d92d1b3070400f6966140591531659' OR v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1a P1.3: name_claim_folds() is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_md5, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.name_folds_rebuild()'::regprocedure;
  IF v_md5 <> '2fdda2d171c71626a82a94ad713c6ef0' OR v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B20M1a P1.4: name_folds_rebuild() is not the one written (fingerprint %, volatile %, definer %, config %)', v_md5, v_vol, v_def, v_cfg;
  END IF;
  -- P2. Closed to the browser roles: the functions, and the two new tables (RLS on, no grant).
  FOREACH v_t IN ARRAY ARRAY['public.name_unaccent(text)', 'public.name_fold_latin(text)', 'public.name_claim_folds()', 'public.name_folds_rebuild()'] LOOP
    IF has_function_privilege('anon', v_t, 'EXECUTE') OR has_function_privilege('authenticated', v_t, 'EXECUTE') THEN
      RAISE EXCEPTION 'B20M1a P2: % is executable by a browser role', v_t;
    END IF;
  END LOOP;
  FOREACH v_t IN ARRAY ARRAY['public.name_rule_words', 'public.protected_handles_am'] LOOP
    IF has_table_privilege('anon', v_t, 'SELECT') OR has_table_privilege('authenticated', v_t, 'SELECT')
       OR NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = v_t::regclass) THEN
      RAISE EXCEPTION 'B20M1a P2: % is open to a browser role or has no row-level security', v_t;
    END IF;
  END LOOP;
  -- P3. The seed landed as the file says (this file's own rows), and the rebuild reads it.
  IF (SELECT count(*) FROM public.name_rule_words WHERE list = 'claim') <> 37
     OR (SELECT count(*) FROM public.name_rule_words WHERE list = 'institution') <> 6
     OR (SELECT count(*) FROM public.name_rule_words WHERE list = 'allow') <> 23
     OR (SELECT count(*) FROM public.name_rule_words WHERE list = 'allow_am') <> 2 THEN
    RAISE EXCEPTION 'B20M1a P3: name_rule_words does not hold 37 claim, 6 institution, 23 allow and 2 allow_am words';
  END IF;
  IF EXISTS (SELECT 1 FROM unnest(ARRAY['amole', 'siinqee', 'golis', 'waafi', 'hormuud', 'destta', 'kacha', 'chapa', 'faiba', 'amerga', 'jiji']) w
              WHERE NOT EXISTS (SELECT 1 FROM public.exact_only_words e WHERE e.word = w)) THEN
    RAISE EXCEPTION 'B20M1a P3: an exact-only word of the file is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM unnest(ARRAY['moshe', 'dars', 'esl', 'hormud', 'moa', 'moe', 'mofa', 'moti', 'wu']) w
              WHERE EXISTS (SELECT 1 FROM public.protected_handles h WHERE h.handle_fold = public.name_fold(w))) THEN
    RAISE EXCEPTION 'B20M1a P3: a dropped handle is still protected';
  END IF;
  IF (SELECT count(*) FROM public.name_folds WHERE kind = 'institution') <> 6
     OR (SELECT count(*) FROM public.name_folds WHERE kind = 'allow_am') <> 2
     OR NOT EXISTS (SELECT 1 FROM public.name_folds WHERE kind = 'claim' AND fold = 'eth') THEN
    RAISE EXCEPTION 'B20M1a P3: the rebuild did not read the new lists';
  END IF;
  -- P4. Every reserved name is international or carries its country's code (DEC-202).
  IF EXISTS (SELECT 1 FROM public.protected_names
              WHERE NOT ((international AND country_code IS NULL) OR (NOT international AND country_code IS NOT NULL))) THEN
    RAISE EXCEPTION 'B20M1a P4: a reserved name has no country code';
  END IF;
  -- P5. The accent fold, on literals.
  IF public.name_unaccent('Télébírr') <> 'telebirr' OR public.name_unaccent('ÄTHIOPIEN') <> 'athiopien'
     OR public.name_unaccent('Straße Œuvre') <> 'strasse oeuvre' OR public.name_fold_latin('Côte d''Ivoire') <> 'cotedivoire'
     OR public.name_unaccent('ሰላም Shop') <> 'ሰላም shop' THEN
    RAISE EXCEPTION 'B20M1a P5: the accent fold is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018230000') ON CONFLICT (version) DO NOTHING;

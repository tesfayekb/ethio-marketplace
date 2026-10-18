-- Bundle 20 turn 2, part 2 of 3 (2026-10-18). Tier A. DEC-198, DEC-202 - THE v4 RESERVED NAMES (rows 641-762).
-- e2e-areas: posting, admin-users
-- The curator's reserved-names-v4.csv (762 organisations, audited 2026-10-18; saved as docs/data/reserved-names-v4.csv)
-- as its own seed, in 3 tool-sized parts (DEC-189), each gated on the one before. ADDITIVE ONLY: the 435 v3 rows are
-- the file's first 435, unchanged, and are never rewritten; the 327 new rows take ids 436-762 in file order, each with
-- its country's ISO code or marked international (DEC-202); a handle is added only when no row holds its fold yet (the
-- first row in the file keeps a shared fold - v3's rule). Nothing is updated or deleted; a re-run changes nothing.
-- No rule changes (turn 1 changed them). Applied on ethio-prod by the executor's migration tool on save; the operator
-- applies the saved file on ethio-staging and reads back the mark 20261019070000.

DO $gate$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019060000') THEN
    RAISE EXCEPTION 'B20S2: part 1 (20261019060000) has not landed';
  END IF;
END $gate$;

-- The rows of this part: a new organisation carries its name; a v3 row (name NULL) only the handles it adds.
DROP TABLE IF EXISTS b20_seed;
CREATE TEMP TABLE b20_seed (id integer, name_en text, name_am text, kind text, country text, handles text);
INSERT INTO b20_seed VALUES
(641, 'UN Office on Drugs and Crime (UNODC)', E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u1218\u1295\u130D\u1225\u1273\u1275 \u12E8\u12A0\u12F0\u1295\u12DB\u12E5 \u12D5\u1345\u1293 \u12E8\u12C8\u1295\u1300\u120D \u1218\u12A8\u120B\u12A8\u120D \u133D\u1215\u1348\u1275 \u1264\u1275', 'international organisation', 'International', 'unodc|united_nations_office_on_drugs_and_crime'),
(642, 'UN Office for Project Services (UNOPS)', E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u1218\u1295\u130D\u1225\u1273\u1275 \u12E8\u1355\u122E\u1300\u12AD\u1275 \u12A0\u1308\u120D\u130D\u120E\u1276\u127D \u133D\u1215\u1348\u1275 \u1264\u1275', 'international organisation', 'International', 'unops|united_nations_office_for_project_services'),
(643, 'World Food Programme (WFP)', E'\u12E8\u12D3\u1208\u121D \u12E8\u121D\u130D\u1265 \u1355\u122E\u130D\u122B\u121D', 'international organisation', 'International', 'wfp|world_food_programme|world_food_program|un_wfp'),
(644, 'World Health Organization (WHO)', E'\u12E8\u12D3\u1208\u121D \u1324\u1293 \u12F5\u122D\u1305\u1275', 'international organisation', 'International', 'world_health_organization'),
(645, 'UNHCR, the UN Refugee Agency', E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u1218\u1295\u130D\u1225\u1273\u1275 \u12E8\u1235\u12F0\u1270\u129E\u127D \u12A8\u134D\u1270\u129B \u12AE\u121A\u123D\u1290\u122D', 'international organisation', 'International', 'unhcr|un_refugee_agency|united_nations_high_commissioner_for_refugees'),
(646, 'African Union Commission (AUC)', E'\u12E8\u12A0\u134D\u122A\u12AB \u1285\u1265\u1228\u1275 \u12AE\u121A\u123D\u1295', 'international organisation', 'International', 'african_union|african_union_commission|auc|au_commission'),
(647, 'Intergovernmental Authority on Development (IGAD)', E'\u12E8\u1260\u12ED\u1290 \u1218\u1295\u130D\u1225\u1273\u1275 \u12E8\u120D\u121B\u1275 \u1263\u1208\u1225\u120D\u1323\u1295 (\u12A2\u130B\u12F5)', 'international organisation', 'International', 'igad|intergovernmental_authority_on_development'),
(648, 'International Committee of the Red Cross (ICRC)', E'\u12D3\u1208\u121D \u12A0\u1240\u134D \u12E8\u1240\u12ED \u1218\u1235\u1240\u120D \u12AE\u121A\u1274', 'international organisation', 'International', 'icrc|international_committee_of_the_red_cross'),
(649, 'International Federation of Red Cross and Red Crescent Societies (IFRC)', E'\u12D3\u1208\u121D \u12A0\u1240\u134D \u12E8\u1240\u12ED \u1218\u1235\u1240\u120D\u1293 \u12E8\u1240\u12ED \u1328\u1228\u1243 \u121B\u1285\u1260\u122B\u1275 \u134C\u12F4\u122C\u123D\u1295', 'international organisation', 'International', 'ifrc|international_federation_of_red_cross_and_red_crescent_societies'),
(650, 'Ethiopian Red Cross Society', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u1240\u12ED \u1218\u1235\u1240\u120D \u121B\u1205\u1260\u122D', 'international organisation', 'Ethiopia', 'ercs'),
(651, 'World Vision', E'\u12C8\u122D\u120D\u12F5 \u126A\u12E5\u1295', 'international organisation', 'International', 'world_vision|world_vision_international|wvi'),
(652, 'Save the Children', E'\u1234\u126D \u12D8 \u127D\u120D\u12F5\u1228\u1295', 'international organisation', 'International', 'save_the_children|save_the_children_international'),
(653, 'Norwegian Refugee Council (NRC)', E'\u12E8\u1296\u122D\u12CC\u12ED \u12E8\u1235\u12F0\u1270\u129E\u127D \u121D\u12AD\u122D \u1264\u1275', 'international organisation', 'International', 'norwegian_refugee_council'),
(654, 'CARE International', E'\u12AC\u122D \u12A2\u1295\u1270\u122D\u1293\u123D\u1293\u120D', 'international organisation', 'International', 'care_international'),
(655, 'Plan International', E'\u1355\u120B\u1295 \u12A2\u1295\u1270\u122D\u1293\u123D\u1293\u120D', 'international organisation', 'International', 'plan_international'),
(656, 'International Rescue Committee (IRC)', E'\u12D3\u1208\u121D \u12A0\u1240\u134D \u12E8\u1290\u134D\u1235 \u12A0\u12F5\u1295 \u12AE\u121A\u1274', 'international organisation', 'International', 'international_rescue_committee'),
(657, 'Prosper Global (formerly Mercy Corps)', E'\u1355\u122E\u1235\u1350\u122D \u130D\u120E\u1263\u120D (\u12E8\u1240\u12F5\u121E\u12CD \u1218\u122D\u1232 \u12AE\u122D\u1355\u1235)', 'international organisation', 'International', 'prosper_global|mercy_corps'),
(658, 'Catholic Relief Services (CRS)', E'\u12AB\u1276\u120A\u12AD \u122A\u120A\u134D \u1230\u122D\u126A\u1235\u1235', 'international organisation', 'International', 'catholic_relief_services'),
(659, 'U.S. Embassy in Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12A0\u121C\u122A\u12AB \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'United States', 'us_embassy|us_embassy_addis|us_embassy_addis_ababa|american_embassy|embassy_of_the_united_states|us_visa|us_visa_appointment|american_visa'),
(660, 'British Embassy Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12A5\u1295\u130D\u120A\u12DD \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'United Kingdom', 'british_embassy|british_embassy_addis|british_embassy_addis_ababa|uk_embassy|uk_embassy_addis'),
(661, 'Embassy of Canada to Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12AB\u1293\u12F3 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Canada', 'canadian_embassy|canadian_embassy_addis|embassy_of_canada'),
(662, 'German Embassy Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1300\u122D\u1218\u1295 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Germany', 'german_embassy|german_embassy_addis|deutsche_botschaft|deutsche_botschaft_addis_abeba'),
(663, 'Embassy of Italy in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1323\u120A\u12EB\u1295 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Italy', 'italian_embassy|italian_embassy_addis|ambasciata_d_italia'),
(664, 'Embassy of France in Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1348\u1228\u1295\u1233\u12ED \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'France', 'french_embassy|french_embassy_addis|ambassade_de_france'),
(665, 'Embassy of the Netherlands in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1294\u12D8\u122D\u120B\u1295\u12F5\u1235 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Netherlands', 'dutch_embassy|dutch_embassy_addis|embassy_of_the_netherlands'),
(666, 'Embassy of Sweden in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1235\u12CA\u12F5\u1295 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Sweden', 'swedish_embassy|swedish_embassy_addis|sveriges_ambassad'),
(667, 'Royal Norwegian Embassy in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1296\u122D\u12CC\u12ED \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Norway', 'norwegian_embassy|royal_norwegian_embassy|norwegian_embassy_addis'),
(668, 'Embassy of Belgium in Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1264\u120D\u1302\u12E8\u121D \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Belgium', 'belgian_embassy|belgian_embassy_addis'),
(669, 'Embassy of Denmark in Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12F4\u1295\u121B\u122D\u12AD \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Denmark', 'danish_embassy|royal_danish_embassy|danish_embassy_addis'),
(670, 'Embassy of Israel in Ethiopia', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12A5\u1235\u122B\u12A4\u120D \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Israel', 'israeli_embassy|israeli_embassy_addis'),
(671, 'Royal Embassy of Saudi Arabia in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1233\u12D1\u12F2 \u12D3\u1228\u1262\u12EB \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Saudi Arabia', 'saudi_embassy|saudi_arabian_embassy|royal_saudi_embassy|ksa_embassy'),
(672, 'Embassy of the United Arab Emirates in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u1270\u1263\u1260\u1229\u1275 \u12D3\u1228\u1265 \u12A4\u121D\u122C\u1276\u127D \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'United Arab Emirates', 'uae_embassy|emirati_embassy|uae_embassy_addis'),
(673, 'Embassy of the State of Kuwait in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12A9\u12CC\u1275 \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Kuwait', 'kuwaiti_embassy|kuwaiti_embassy_addis'),
(674, 'Embassy of the State of Qatar in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12B3\u1273\u122D \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'Qatar', 'qatari_embassy|qatari_embassy_addis'),
(675, 'Embassy of South Africa in Addis Ababa', E'\u1260\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E8\u12F0\u1261\u1265 \u12A0\u134D\u122A\u12AB \u12A4\u121D\u1263\u1232', 'embassy or visa service', 'South Africa', 'south_african_embassy|sa_embassy|south_african_embassy_addis'),
(676, 'VFS Global', E'\u126A\u12A4\u134D\u12A4\u1235 \u130D\u120E\u1263\u120D', 'embassy or visa service', 'International', 'vfs_global|vfs_global_services|vfs_visa_centre'),
(677, 'TLScontact', E'\u1272\u12A4\u120D\u12A4\u1235 \u12AE\u1295\u1273\u12AD\u1275', 'embassy or visa service', 'International', 'tlscontact'),
(678, 'U.S. Department of State Visa Appointment Service', E'\u12E8\u12A0\u121C\u122A\u12AB \u12CD\u132D \u1309\u12F3\u12ED \u121A\u1292\u1235\u1274\u122D \u12E8\u126A\u12DB \u1240\u1320\u122E \u12A0\u1308\u120D\u130D\u120E\u1275', 'embassy or visa service', 'United States', 'usvisa_info|ais_usvisa_info|us_visa_appointment_service'),
(679, 'Diversity Visa Program (DV Lottery)', E'\u12E8\u12F3\u12ED\u1268\u122D\u1232\u1272 \u126A\u12DB \u1355\u122E\u130D\u122B\u121D (\u12F2\u126A \u120E\u1270\u122A)', 'embassy or visa service', 'United States', 'diversity_visa|diversity_visa_program|diversity_visa_lottery|dv_lottery|dv_program|green_card_lottery'),
(680, 'British Council', E'\u1265\u122A\u1272\u123D \u12AB\u12CD\u1295\u1235\u120D', 'education or exam body', 'United Kingdom', 'british_council|british_council_ielts'),
(681, 'IELTS', E'\u12A0\u12ED\u12A4\u120D\u1275\u1235', 'education or exam body', 'International', 'ielts|ielts_test|ielts_exam'),
(682, 'IDP Education', E'\u12A0\u12ED\u12F2\u1352 \u12A4\u12F1\u12AC\u123D\u1295', 'education or exam body', 'International', 'idp_education|idp_ielts'),
(683, 'ETS (TOEFL, GRE)', E'\u12A2\u1272\u12A4\u1235 (\u1276\u134D\u120D\u1363 \u1302\u12A0\u122D\u12A2)', 'education or exam body', 'United States', 'educational_testing_service|ets_toefl|toefl|toefl_ibt|ets_gre'),
(684, 'Pearson PTE', E'\u1352\u122D\u1230\u1295 \u1352\u1272\u12A2', 'education or exam body', 'United Kingdom', 'pearson_pte|pte_academic|pearson_vue'),
(685, 'Duolingo English Test', E'\u12F1\u12A6\u120A\u1295\u130E \u12E8\u12A5\u1295\u130D\u120A\u12DD\u129B \u1348\u1270\u1293', 'education or exam body', 'United States', 'duolingo_english_test|duolingo'),
(686, 'Population and Immigration Authority (Israel)', E'\u12E8\u12A5\u1235\u122B\u12A4\u120D \u12E8\u1215\u12DD\u1265\u1293 \u12E8\u12A2\u121A\u130D\u122C\u123D\u1295 \u1263\u1208\u1225\u120D\u1323\u1295', 'government body', 'Israel', 'population_and_immigration_authority|israel_immigration_authority|piba'),
(687, 'Israel Tax Authority', E'\u12E8\u12A5\u1235\u122B\u12A4\u120D \u12E8\u130D\u1265\u122D \u1263\u1208\u1225\u120D\u1323\u1295', 'government body', 'Israel', 'israel_tax_authority'),
(688, 'National Insurance Institute of Israel (Bituah Leumi)', E'\u12E8\u12A5\u1235\u122B\u12A4\u120D \u1265\u1214\u122B\u12CA \u1218\u12F5\u1295 \u1270\u124B\u121D', 'government body', 'Israel', 'national_insurance_institute|bituah_leumi|btl_gov'),
(689, 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)', E'\u12E8\u1270\u1263\u1260\u1229\u1275 \u12D3\u1228\u1265 \u12A4\u121D\u122C\u1276\u127D \u12E8\u1218\u1273\u12C8\u1242\u12EB\u1363 \u12E8\u12DC\u130D\u1290\u1275\u1363 \u12E8\u1309\u121D\u1229\u12AD\u1293 \u12E8\u12C8\u12F0\u1265 \u12F0\u1285\u1295\u1290\u1275 \u1263\u1208\u1225\u120D\u1323\u1295', 'government body', 'United Arab Emirates', 'federal_authority_for_identity_citizenship_customs_and_port_security|icp_uae|uae_icp'),
(690, 'General Directorate of General Security (Lebanon)', E'\u12E8\u120A\u1263\u1296\u1235 \u1320\u1245\u120B\u120B \u12F0\u1285\u1295\u1290\u1275', 'government body', 'Lebanon', 'lebanese_general_security|general_security_lebanon'),
(691, 'Afriwork', E'\u12A0\u134D\u122A\u12C8\u122D\u12AD', 'online platform', 'Ethiopia', 'afriwork'),
(692, 'Federal High Court', E'\u12E8\u134C\u12F0\u122B\u120D \u12A8\u134D\u1270\u129B \u134D\u122D\u12F5 \u1264\u1275', 'government body', 'Ethiopia', 'federal_high_court'),
(693, 'Federal First Instance Court', E'\u12E8\u134C\u12F0\u122B\u120D \u12E8\u1218\u1300\u1218\u122A\u12EB \u12F0\u1228\u1303 \u134D\u122D\u12F5 \u1264\u1275', 'government body', 'Ethiopia', 'federal_first_instance_court'),
(694, 'Federal Prison Commission', E'\u12E8\u134C\u12F4\u122B\u120D \u121B\u1228\u121A\u12EB \u1264\u1275 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'federal_prison_commission|federal_prisons_administration'),
(695, 'Federal Public Procurement and Property Authority', E'\u12E8\u1218\u1295\u130D\u1235\u1275 \u130D\u12E5\u1293 \u1295\u1265\u1228\u1275 \u1263\u1208\u1235\u120D\u1323\u1295', 'government body', 'Ethiopia', 'federal_public_procurement_and_property_authority|public_procurement_and_property_authority|fppa|public_procurement_and_property_administration_agency|pppaa|public_procurement_and_property_disposal_service|pppds'),
(696, 'Refugees and Returnees Service (RRS)', E'\u12E8\u1235\u12F0\u1270\u129E\u127D\u1293 \u1270\u1218\u120B\u123E\u127D \u12A0\u1308\u120D\u130D\u120E\u1275', 'government body', 'Ethiopia', 'refugees_and_returnees_service|refugee_and_returnee_service|rrs|agency_for_refugee_and_returnee_affairs|administration_for_refugee_and_returnee_affairs'),
(697, 'Ethiopian Diaspora Trust Fund (EDTF)', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12F3\u12EB\u1235\u1356\u122B \u1275\u1228\u1235\u1275 \u1348\u1295\u12F5', 'government body', 'Ethiopia', 'edtf|diaspora_trust_fund'),
(698, 'Oromia Police Commission', E'\u12E8\u12A6\u122E\u121A\u12EB \u1356\u120A\u1235 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'oromia_police_commission|oromia_police'),
(699, 'Amhara Regional State Police Commission', E'\u12E8\u12A0\u121B\u122B \u12AD\u120D\u120D \u1356\u120A\u1235 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'amhara_regional_state_police_commission|amhara_police_commission|amhara_police'),
(700, 'Tigray Police Commission', E'\u12E8\u1275\u130D\u122B\u12ED \u1356\u120A\u1235 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'tigray_police_commission|tigray_police'),
(701, 'Afar Regional Police Commission', E'\u12E8\u12A0\u134B\u122D \u12AD\u120D\u120D \u1356\u120A\u1235 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'afar_regional_police_commission|afar_police_commission|afar_police'),
(702, 'Gambella Police Commission', E'\u12E8\u130B\u121D\u1264\u120B \u1356\u120A\u1235 \u12AE\u121A\u123D\u1295', 'government body', 'Ethiopia', 'gambella_police_commission|gambella_police'),
(703, 'Oromia Occupational Competence Assurance Agency (OOCAA)', E'\u12E8\u12A6\u122E\u121A\u12EB \u12E8\u1219\u12EB \u1265\u1243\u1275 \u121B\u1228\u130B\u1308\u132B \u12A4\u1300\u1295\u1232', 'education or exam body', 'Ethiopia', 'oromia_occupational_competence_assurance_agency|oocaa|oromia_coc_agency'),
(704, 'Ethiopian Orthodox Tewahedo Church', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12A6\u122D\u1276\u12F6\u12AD\u1235 \u1270\u12CB\u1215\u12F6 \u1264\u1270 \u12AD\u122D\u1235\u1272\u12EB\u1295', 'religious body', 'Ethiopia', 'eotc|eotc_patriarchate'),
(705, 'Mahibere Kidusan', E'\u121B\u1285\u1260\u1228 \u1245\u12F1\u1233\u1295', 'religious body', 'Ethiopia', 'mahibere_kidusan|eotcmk'),
(706, 'Ethiopian Islamic Affairs Supreme Council', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12A5\u1235\u120D\u121D\u1293 \u1309\u12F3\u12EE\u127D \u1320\u1245\u120B\u12ED \u121D\u12AD\u122D \u1264\u1275', 'religious body', 'Ethiopia', 'eiasc|islamic_affairs_supreme_council'),
(707, 'Catholic Bishops'' Conference of Ethiopia', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12AB\u1276\u120A\u12AB\u12CA\u1275 \u1264\u1270 \u12AD\u122D\u1235\u1272\u12EB\u1295 \u1333\u1333\u1233\u1275 \u1309\u1263\u12A4', 'religious body', 'Ethiopia', 'cbce'),
(708, 'Ethiopian Evangelical Church Mekane Yesus (EECMY)', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12C8\u1295\u130C\u120B\u12CA\u1275 \u1264\u1270 \u12AD\u122D\u1235\u1272\u12EB\u1295 \u1218\u12AB\u1290 \u12A2\u12E8\u1231\u1235', 'religious body', 'Ethiopia', 'eecmy|mekane_yesus'),
(709, 'Ethiopian Kale Heywet Church', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u1243\u1208 \u1215\u12ED\u12C8\u1275 \u1264\u1270-\u12AD\u122D\u1235\u1272\u12EB\u1295', 'religious body', 'Ethiopia', 'ekhc|kale_heywet'),
(710, 'Evangelical Churches Fellowship of Ethiopia (ECFE)', E'\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u12C8\u1295\u130C\u120B\u12CD\u12EB\u1295 \u12A0\u1265\u12EB\u1270 \u12AD\u122D\u1235\u1272\u12EB\u1293\u1275 \u1285\u1265\u1228\u1275', 'religious body', 'Ethiopia', 'ecfe'),
(711, 'Adama Science and Technology University', E'\u12A0\u12F3\u121B \u1233\u12ED\u1295\u1235\u1293 \u1274\u12AD\u1296\u120E\u1302 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'adama_science_and_technology_university|astu'),
(712, 'Addis Ababa Science and Technology University', E'\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u1233\u12ED\u1295\u1235\u1293 \u1274\u12AD\u1296\u120E\u1302 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'addis_ababa_science_and_technology_university|aastu'),
(713, 'Addis Ababa University', E'\u12A0\u12F2\u1235 \u12A0\u1260\u1263 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'addis_ababa_university|university_of_addis_ababa|aau|aau_edu_et'),
(714, 'Adigrat University', E'\u12A0\u12F2\u130D\u122B\u1275 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'adigrat_university|university_of_adigrat'),
(715, 'Aksum University', E'\u12A0\u12AD\u1231\u121D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'aksum_university|university_of_aksum'),
(716, 'Ambo University', E'\u12A0\u121D\u1266 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'ambo_university|university_of_ambo'),
(717, 'Arba Minch University', E'\u12A0\u122D\u1263 \u121D\u1295\u132D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'arba_minch_university|university_of_arba_minch'),
(718, 'Arsi University', E'\u12A0\u122D\u1232 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'arsi_university|university_of_arsi'),
(719, 'Assosa University', E'\u12A0\u1236\u1233 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'assosa_university|university_of_assosa'),
(720, 'Bahir Dar University', E'\u1263\u1205\u122D \u12F3\u122D \u12E9\u1292\u1268\u122D\u1235\u1272', 'education or exam body', 'Ethiopia', 'bahir_dar_university|university_of_bahir_dar|bdu'),
(721, 'Bonga University', E'\u1266\u1295\u130B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'bonga_university|university_of_bonga'),
(722, 'Borena University', E'\u1266\u1228\u1293 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'borena_university|university_of_borena'),
(723, 'Bule Hora University', E'\u1261\u120C \u1206\u122B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'bule_hora_university|university_of_bule_hora'),
(724, 'Debark University', E'\u12F0\u1263\u122D\u1245 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'debark_university|university_of_debark'),
(725, 'Debre Birhan University', E'\u12F0\u1265\u1228 \u1265\u122D\u1203\u1295 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'debre_birhan_university|university_of_debre_birhan'),
(726, 'Debre Markos University', E'\u12F0\u1265\u1228 \u121B\u122D\u1246\u1235 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'debre_markos_university|university_of_debre_markos'),
(727, 'Debre Tabor University', E'\u12F0\u1265\u1228 \u1273\u1266\u122D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'debre_tabor_university|university_of_debre_tabor'),
(728, 'Dembi Dolo University', E'\u12F0\u121D\u1262 \u12F6\u120E \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'dembi_dolo_university|university_of_dembi_dolo'),
(729, 'Dilla University', E'\u12F2\u120B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'dilla_university|university_of_dilla'),
(730, 'Dire Dawa University', E'\u12F5\u122C\u12F3\u12CB \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'dire_dawa_university|university_of_dire_dawa'),
(731, 'Gambella University', E'\u130B\u121D\u1264\u120B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'gambella_university|university_of_gambella'),
(732, 'Haramaya University', E'\u1200\u1228\u121B\u12EB \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'haramaya_university|university_of_haramaya'),
(733, 'Hawassa University', E'\u1200\u12CB\u1233 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'hawassa_university|university_of_hawassa'),
(734, 'Injibara University', E'\u12A5\u1295\u1305\u1263\u122B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'injibara_university|university_of_injibara'),
(735, 'Jigjiga University', E'\u1305\u1305\u130B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'jigjiga_university|university_of_jigjiga'),
(736, 'Jimma University', E'\u1305\u121B \u12E9\u1292\u1268\u122D\u1235\u1272', 'education or exam body', 'Ethiopia', 'jimma_university|university_of_jimma'),
(737, 'Jinka University', E'\u1302\u1295\u12AB \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'jinka_university|university_of_jinka'),
(738, 'Kebri Dehar University', E'\u1240\u1265\u122A \u12F0\u1203\u122D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'kebri_dehar_university|university_of_kebri_dehar'),
(739, 'Kotebe University of Education', E'\u12AE\u1270\u1264 \u12E8\u1275\u121D\u1205\u122D\u1275 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'kotebe_university_of_education|kotebe_education_university|kue'),
(740, 'Madda Walabu University', E'\u1218\u12F0 \u12C8\u120B\u1261 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'madda_walabu_university|university_of_madda_walabu'),
(741, 'Mattu University', E'\u1218\u1271 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'mattu_university|university_of_mattu'),
(742, 'Mekdela Amba University', E'\u1218\u1245\u12F0\u120B \u12A0\u121D\u1263 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'mekdela_amba_university|university_of_mekdela_amba'),
(743, 'Mekelle University', E'\u1218\u1250\u1208 \u12E9\u1292\u1268\u122D\u1235\u1272', 'education or exam body', 'Ethiopia', 'mekelle_university|university_of_mekelle'),
(744, 'Mizan-Tepi University', E'\u121A\u12DB\u1295 \u1274\u1352 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'mizan_tepi_university|university_of_mizan_tepi'),
(745, 'Oda Bultum University', E'\u12A6\u12F3 \u1261\u120D\u1271\u121D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'oda_bultum_university|university_of_oda_bultum'),
(746, 'Oromia State University', E'\u12A6\u122E\u121A\u12EB \u1235\u1274\u1275 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'oromia_state_university'),
(747, 'Raya University', E'\u122B\u12EB \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'raya_university|university_of_raya'),
(748, 'Rift Valley University', E'\u122A\u134D\u1275 \u126B\u120A \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'rift_valley_university|university_of_rift_valley'),
(749, 'Samara University', E'\u1230\u1218\u122B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'samara_university|university_of_samara'),
(750, 'Selale University', E'\u1230\u120B\u120C \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'selale_university|university_of_selale'),
(751, 'Unity University', E'\u12E9\u1292\u1272 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'unity_university|university_of_unity'),
(752, 'University of Gondar', E'\u130E\u1295\u12F0\u122D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'university_of_gondar|gondar_university|uog'),
(753, 'Wachamo University', E'\u12CB\u127B\u121E \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'wachamo_university|university_of_wachamo'),
(754, 'Werabe University', E'\u12C8\u122B\u1264 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'werabe_university|university_of_werabe'),
(755, 'Wolaita Sodo University', E'\u12C8\u120B\u12ED\u1273 \u1236\u12F6 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'wolaita_sodo_university|university_of_wolaita_sodo'),
(756, 'Woldia University', E'\u12C8\u120D\u12F5\u12EB \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'woldia_university|university_of_woldia'),
(757, 'Wolkite University', E'\u12C8\u120D\u1242\u1324 \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'wolkite_university|university_of_wolkite'),
(758, 'Wollega University', E'\u12C8\u1208\u130B \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'wollega_university|university_of_wollega'),
(759, 'Wollo University', E'\u12C8\u120E \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'wollo_university|university_of_wollo'),
(760, 'St. Mary''s University', E'\u1245\u12F5\u1235\u1275 \u121B\u122D\u12EB\u121D \u12E9\u1292\u1268\u122D\u1232\u1272', 'education or exam body', 'Ethiopia', 'st_marys_university'),
(761, 'Admas University College', E'\u12A0\u12F5\u121B\u1235 \u12E9\u1292\u1268\u122D\u1232\u1272 \u12AE\u120C\u1305', 'education or exam body', 'Ethiopia', 'admas_university_college|admas_university'),
(762, 'HiLCoE School of Computer Science & Technology', E'\u1202\u120D\u12AE \u12E8\u12AE\u121D\u1352\u12CD\u1270\u122D \u1233\u12ED\u1295\u1235\u1293 \u1274\u12AD\u1296\u120E\u1302 \u1275\u121D\u1205\u122D\u1275 \u1264\u1275', 'education or exam body', 'Ethiopia', 'hilcoe_school_of_computer_science_and_technology|hilcoe|hilcoe_school');
DO $sum$ BEGIN
  IF (SELECT md5(string_agg(concat_ws('|', id, coalesce(name_en, ''), coalesce(name_am, ''), coalesce(kind, ''), coalesce(country, ''), handles), E'\n' ORDER BY id)) FROM b20_seed) <> 'd0a5988595786848563877a6ed83610b' THEN
    RAISE EXCEPTION 'B20S2: this part''s rows differ from the ones built from docs/data/reserved-names-v4.csv';
  END IF;
  IF EXISTS (SELECT 1 FROM b20_seed s WHERE s.name_en IS NOT NULL AND s.country <> 'International'
              AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.name_en = s.country)) THEN
    RAISE EXCEPTION 'B20S2: a country of the file is not in countries';
  END IF;
  IF EXISTS (SELECT 1 FROM b20_seed s WHERE s.name_en IS NULL AND NOT EXISTS (SELECT 1 FROM public.protected_names p WHERE p.id = s.id)) THEN
    RAISE EXCEPTION 'B20S2: a v3 row is missing';
  END IF;
  -- A new row already present (this part re-run) must be the same organisation.
  IF EXISTS (SELECT 1 FROM b20_seed s JOIN public.protected_names p ON p.id = s.id
              WHERE s.name_en IS NOT NULL
                AND (p.name_en, coalesce(p.name_am, ''), p.kind, p.country) IS DISTINCT FROM (s.name_en, s.name_am, s.kind, s.country)) THEN
    RAISE EXCEPTION 'B20S2: a stored reserved name differs from the file';
  END IF;
END $sum$;
INSERT INTO public.protected_names (id, name_en, name_am, kind, country, country_code, international)
SELECT s.id, s.name_en, s.name_am, s.kind, s.country,
       (SELECT c.code FROM public.countries c WHERE c.name_en = s.country), s.country = 'International'
  FROM b20_seed s
 WHERE s.name_en IS NOT NULL
 ORDER BY s.id
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.protected_handles (handle_fold, name_id, handle)
SELECT DISTINCT ON (x.f) x.f, x.id, x.h
  FROM (SELECT s.id, h.h, h.o, public.name_fold(h.h) AS f
          FROM b20_seed s, unnest(string_to_array(s.handles, '|')) WITH ORDINALITY AS h(h, o)
         WHERE h.h <> '') x
 ORDER BY x.f, x.id, x.o
ON CONFLICT (handle_fold) DO NOTHING;
DROP TABLE b20_seed;

INSERT INTO public.migration_marks (version) VALUES ('20261019070000') ON CONFLICT (version) DO NOTHING;

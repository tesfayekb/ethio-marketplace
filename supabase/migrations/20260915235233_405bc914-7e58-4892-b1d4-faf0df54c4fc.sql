-- =============================================================================
-- LOCATIONS ERA L2b-S — the ISO 3166-1 country seed.
-- Purpose: insert every officially assigned ISO 3166-1 alpha-2 country as a
--          CLOSED market (is_active = false) with its unit system, primary
--          ISO 4217 currency and display_order 0. The L2b-M trigger
--          (countries_anchor_on_insert) gives each new row its INACTIVE
--          `locations` anchor, so a market is curatable before it opens.
--          ON CONFLICT DO NOTHING: the six pre-existing rows are never touched.
-- locations-era-spec §5 + operator rulings 2026-09-15; DEC-022: declared mark
-- 20260916010000. No function is created or changed, so no closers apply.
-- =============================================================================

-- BEFORE-STATE of the six pre-existing rows (proved unchanged at the end).
CREATE TEMP TABLE l2bs_before AS
SELECT code, name_en, is_active, unit_system, currency_code FROM public.countries;

INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
VALUES
  ('AD', 'Andorra', false, 'metric', 'EUR', 0),
  ('AE', 'United Arab Emirates', false, 'metric', 'AED', 0),
  ('AF', 'Afghanistan', false, 'metric', 'AFN', 0),
  ('AG', 'Antigua and Barbuda', false, 'metric', 'XCD', 0),
  ('AI', 'Anguilla', false, 'metric', 'XCD', 0),
  ('AL', 'Albania', false, 'metric', 'ALL', 0),
  ('AM', 'Armenia', false, 'metric', 'AMD', 0),
  ('AO', 'Angola', false, 'metric', 'AOA', 0),
  ('AQ', 'Antarctica', false, 'metric', NULL, 0),
  ('AR', 'Argentina', false, 'metric', 'ARS', 0),
  ('AS', 'American Samoa', false, 'metric', 'USD', 0),
  ('AT', 'Austria', false, 'metric', 'EUR', 0),
  ('AU', 'Australia', false, 'metric', 'AUD', 0),
  ('AW', 'Aruba', false, 'metric', 'AWG', 0),
  ('AX', 'Åland Islands', false, 'metric', 'EUR', 0),
  ('AZ', 'Azerbaijan', false, 'metric', 'AZN', 0),
  ('BA', 'Bosnia and Herzegovina', false, 'metric', 'BAM', 0),
  ('BB', 'Barbados', false, 'metric', 'BBD', 0),
  ('BD', 'Bangladesh', false, 'metric', 'BDT', 0),
  ('BE', 'Belgium', false, 'metric', 'EUR', 0),
  ('BF', 'Burkina Faso', false, 'metric', 'XOF', 0),
  ('BG', 'Bulgaria', false, 'metric', 'EUR', 0),
  ('BH', 'Bahrain', false, 'metric', 'BHD', 0),
  ('BI', 'Burundi', false, 'metric', 'BIF', 0),
  ('BJ', 'Benin', false, 'metric', 'XOF', 0),
  ('BL', 'Saint Barthélemy', false, 'metric', 'EUR', 0),
  ('BM', 'Bermuda', false, 'metric', 'BMD', 0),
  ('BN', 'Brunei', false, 'metric', 'BND', 0),
  ('BO', 'Bolivia', false, 'metric', 'BOB', 0),
  ('BQ', 'Caribbean Netherlands', false, 'metric', 'USD', 0),
  ('BR', 'Brazil', false, 'metric', 'BRL', 0),
  ('BS', 'Bahamas', false, 'metric', 'BSD', 0),
  ('BT', 'Bhutan', false, 'metric', 'BTN', 0),
  ('BV', 'Bouvet Island', false, 'metric', NULL, 0),
  ('BW', 'Botswana', false, 'metric', 'BWP', 0),
  ('BY', 'Belarus', false, 'metric', 'BYN', 0),
  ('BZ', 'Belize', false, 'metric', 'BZD', 0),
  ('CA', 'Canada', false, 'metric', 'CAD', 0),
  ('CC', 'Cocos (Keeling) Islands', false, 'metric', 'AUD', 0),
  ('CD', 'DR Congo', false, 'metric', 'CDF', 0),
  ('CF', 'Central African Republic', false, 'metric', 'XAF', 0),
  ('CG', 'Congo', false, 'metric', 'XAF', 0),
  ('CH', 'Switzerland', false, 'metric', 'CHF', 0),
  ('CI', 'Ivory Coast', false, 'metric', 'XOF', 0),
  ('CK', 'Cook Islands', false, 'metric', 'NZD', 0),
  ('CL', 'Chile', false, 'metric', 'CLP', 0),
  ('CM', 'Cameroon', false, 'metric', 'XAF', 0),
  ('CN', 'China', false, 'metric', 'CNY', 0),
  ('CO', 'Colombia', false, 'metric', 'COP', 0),
  ('CR', 'Costa Rica', false, 'metric', 'CRC', 0),
  ('CU', 'Cuba', false, 'metric', 'CUP', 0),
  ('CV', 'Cape Verde', false, 'metric', 'CVE', 0),
  ('CW', 'Curaçao', false, 'metric', 'ANG', 0),
  ('CX', 'Christmas Island', false, 'metric', 'AUD', 0),
  ('CY', 'Cyprus', false, 'metric', 'EUR', 0),
  ('CZ', 'Czechia', false, 'metric', 'CZK', 0),
  ('DE', 'Germany', false, 'metric', 'EUR', 0),
  ('DJ', 'Djibouti', false, 'metric', 'DJF', 0),
  ('DK', 'Denmark', false, 'metric', 'DKK', 0),
  ('DM', 'Dominica', false, 'metric', 'XCD', 0),
  ('DO', 'Dominican Republic', false, 'metric', 'DOP', 0),
  ('DZ', 'Algeria', false, 'metric', 'DZD', 0),
  ('EC', 'Ecuador', false, 'metric', 'USD', 0),
  ('EE', 'Estonia', false, 'metric', 'EUR', 0),
  ('EG', 'Egypt', false, 'metric', 'EGP', 0),
  ('EH', 'Western Sahara', false, 'metric', 'MAD', 0),
  ('ER', 'Eritrea', false, 'metric', 'ERN', 0),
  ('ES', 'Spain', false, 'metric', 'EUR', 0),
  ('ET', 'Ethiopia', false, 'metric', 'ETB', 0),
  ('FI', 'Finland', false, 'metric', 'EUR', 0),
  ('FJ', 'Fiji', false, 'metric', 'FJD', 0),
  ('FK', 'Falkland Islands', false, 'metric', 'FKP', 0),
  ('FM', 'Micronesia', false, 'metric', 'USD', 0),
  ('FO', 'Faroe Islands', false, 'metric', 'DKK', 0),
  ('FR', 'France', false, 'metric', 'EUR', 0),
  ('GA', 'Gabon', false, 'metric', 'XAF', 0),
  ('GB', 'United Kingdom', false, 'metric', 'GBP', 0),
  ('GD', 'Grenada', false, 'metric', 'XCD', 0),
  ('GE', 'Georgia', false, 'metric', 'GEL', 0),
  ('GF', 'French Guiana', false, 'metric', 'EUR', 0),
  ('GG', 'Guernsey', false, 'metric', 'GBP', 0),
  ('GH', 'Ghana', false, 'metric', 'GHS', 0),
  ('GI', 'Gibraltar', false, 'metric', 'GIP', 0),
  ('GL', 'Greenland', false, 'metric', 'DKK', 0),
  ('GM', 'Gambia', false, 'metric', 'GMD', 0),
  ('GN', 'Guinea', false, 'metric', 'GNF', 0),
  ('GP', 'Guadeloupe', false, 'metric', 'EUR', 0),
  ('GQ', 'Equatorial Guinea', false, 'metric', 'XAF', 0),
  ('GR', 'Greece', false, 'metric', 'EUR', 0),
  ('GS', 'South Georgia', false, 'metric', 'SHP', 0),
  ('GT', 'Guatemala', false, 'metric', 'GTQ', 0),
  ('GU', 'Guam', false, 'metric', 'USD', 0),
  ('GW', 'Guinea-Bissau', false, 'metric', 'XOF', 0),
  ('GY', 'Guyana', false, 'metric', 'GYD', 0),
  ('HK', 'Hong Kong', false, 'metric', 'HKD', 0),
  ('HM', 'Heard Island and McDonald Islands', false, 'metric', NULL, 0),
  ('HN', 'Honduras', false, 'metric', 'HNL', 0),
  ('HR', 'Croatia', false, 'metric', 'EUR', 0),
  ('HT', 'Haiti', false, 'metric', 'HTG', 0),
  ('HU', 'Hungary', false, 'metric', 'HUF', 0),
  ('ID', 'Indonesia', false, 'metric', 'IDR', 0),
  ('IE', 'Ireland', false, 'metric', 'EUR', 0),
  ('IL', 'Israel', false, 'metric', 'ILS', 0),
  ('IM', 'Isle of Man', false, 'metric', 'GBP', 0),
  ('IN', 'India', false, 'metric', 'INR', 0),
  ('IO', 'British Indian Ocean Territory', false, 'metric', 'USD', 0),
  ('IQ', 'Iraq', false, 'metric', 'IQD', 0),
  ('IR', 'Iran', false, 'metric', 'IRR', 0),
  ('IS', 'Iceland', false, 'metric', 'ISK', 0),
  ('IT', 'Italy', false, 'metric', 'EUR', 0),
  ('JE', 'Jersey', false, 'metric', 'GBP', 0),
  ('JM', 'Jamaica', false, 'metric', 'JMD', 0),
  ('JO', 'Jordan', false, 'metric', 'JOD', 0),
  ('JP', 'Japan', false, 'metric', 'JPY', 0),
  ('KE', 'Kenya', false, 'metric', 'KES', 0),
  ('KG', 'Kyrgyzstan', false, 'metric', 'KGS', 0),
  ('KH', 'Cambodia', false, 'metric', 'KHR', 0),
  ('KI', 'Kiribati', false, 'metric', 'AUD', 0),
  ('KM', 'Comoros', false, 'metric', 'KMF', 0),
  ('KN', 'Saint Kitts and Nevis', false, 'metric', 'XCD', 0),
  ('KP', 'North Korea', false, 'metric', 'KPW', 0),
  ('KR', 'South Korea', false, 'metric', 'KRW', 0),
  ('KW', 'Kuwait', false, 'metric', 'KWD', 0),
  ('KY', 'Cayman Islands', false, 'metric', 'KYD', 0),
  ('KZ', 'Kazakhstan', false, 'metric', 'KZT', 0),
  ('LA', 'Laos', false, 'metric', 'LAK', 0),
  ('LB', 'Lebanon', false, 'metric', 'LBP', 0),
  ('LC', 'Saint Lucia', false, 'metric', 'XCD', 0),
  ('LI', 'Liechtenstein', false, 'metric', 'CHF', 0),
  ('LK', 'Sri Lanka', false, 'metric', 'LKR', 0),
  ('LR', 'Liberia', false, 'imperial', 'LRD', 0),
  ('LS', 'Lesotho', false, 'metric', 'LSL', 0),
  ('LT', 'Lithuania', false, 'metric', 'EUR', 0),
  ('LU', 'Luxembourg', false, 'metric', 'EUR', 0),
  ('LV', 'Latvia', false, 'metric', 'EUR', 0),
  ('LY', 'Libya', false, 'metric', 'LYD', 0),
  ('MA', 'Morocco', false, 'metric', 'MAD', 0),
  ('MC', 'Monaco', false, 'metric', 'EUR', 0),
  ('MD', 'Moldova', false, 'metric', 'MDL', 0),
  ('ME', 'Montenegro', false, 'metric', 'EUR', 0),
  ('MF', 'Saint Martin', false, 'metric', 'EUR', 0),
  ('MG', 'Madagascar', false, 'metric', 'MGA', 0),
  ('MH', 'Marshall Islands', false, 'metric', 'USD', 0),
  ('MK', 'North Macedonia', false, 'metric', 'MKD', 0),
  ('ML', 'Mali', false, 'metric', 'XOF', 0),
  ('MM', 'Myanmar', false, 'imperial', 'MMK', 0),
  ('MN', 'Mongolia', false, 'metric', 'MNT', 0),
  ('MO', 'Macau', false, 'metric', 'MOP', 0),
  ('MP', 'Northern Mariana Islands', false, 'metric', 'USD', 0),
  ('MQ', 'Martinique', false, 'metric', 'EUR', 0),
  ('MR', 'Mauritania', false, 'metric', 'MRU', 0),
  ('MS', 'Montserrat', false, 'metric', 'XCD', 0),
  ('MT', 'Malta', false, 'metric', 'EUR', 0),
  ('MU', 'Mauritius', false, 'metric', 'MUR', 0),
  ('MV', 'Maldives', false, 'metric', 'MVR', 0),
  ('MW', 'Malawi', false, 'metric', 'MWK', 0),
  ('MX', 'Mexico', false, 'metric', 'MXN', 0),
  ('MY', 'Malaysia', false, 'metric', 'MYR', 0),
  ('MZ', 'Mozambique', false, 'metric', 'MZN', 0),
  ('NA', 'Namibia', false, 'metric', 'NAD', 0),
  ('NC', 'New Caledonia', false, 'metric', 'XPF', 0),
  ('NE', 'Niger', false, 'metric', 'XOF', 0),
  ('NF', 'Norfolk Island', false, 'metric', 'AUD', 0),
  ('NG', 'Nigeria', false, 'metric', 'NGN', 0),
  ('NI', 'Nicaragua', false, 'metric', 'NIO', 0),
  ('NL', 'Netherlands', false, 'metric', 'EUR', 0),
  ('NO', 'Norway', false, 'metric', 'NOK', 0),
  ('NP', 'Nepal', false, 'metric', 'NPR', 0),
  ('NR', 'Nauru', false, 'metric', 'AUD', 0),
  ('NU', 'Niue', false, 'metric', 'NZD', 0),
  ('NZ', 'New Zealand', false, 'metric', 'NZD', 0),
  ('OM', 'Oman', false, 'metric', 'OMR', 0),
  ('PA', 'Panama', false, 'metric', 'PAB', 0),
  ('PE', 'Peru', false, 'metric', 'PEN', 0),
  ('PF', 'French Polynesia', false, 'metric', 'XPF', 0),
  ('PG', 'Papua New Guinea', false, 'metric', 'PGK', 0),
  ('PH', 'Philippines', false, 'metric', 'PHP', 0),
  ('PK', 'Pakistan', false, 'metric', 'PKR', 0),
  ('PL', 'Poland', false, 'metric', 'PLN', 0),
  ('PM', 'Saint Pierre and Miquelon', false, 'metric', 'EUR', 0),
  ('PN', 'Pitcairn Islands', false, 'metric', 'NZD', 0),
  ('PR', 'Puerto Rico', false, 'metric', 'USD', 0),
  ('PS', 'Palestine', false, 'metric', 'ILS', 0),
  ('PT', 'Portugal', false, 'metric', 'EUR', 0),
  ('PW', 'Palau', false, 'metric', 'USD', 0),
  ('PY', 'Paraguay', false, 'metric', 'PYG', 0),
  ('QA', 'Qatar', false, 'metric', 'QAR', 0),
  ('RE', 'Réunion', false, 'metric', 'EUR', 0),
  ('RO', 'Romania', false, 'metric', 'RON', 0),
  ('RS', 'Serbia', false, 'metric', 'RSD', 0),
  ('RU', 'Russia', false, 'metric', 'RUB', 0),
  ('RW', 'Rwanda', false, 'metric', 'RWF', 0),
  ('SA', 'Saudi Arabia', false, 'metric', 'SAR', 0),
  ('SB', 'Solomon Islands', false, 'metric', 'SBD', 0),
  ('SC', 'Seychelles', false, 'metric', 'SCR', 0),
  ('SD', 'Sudan', false, 'metric', 'SDG', 0),
  ('SE', 'Sweden', false, 'metric', 'SEK', 0),
  ('SG', 'Singapore', false, 'metric', 'SGD', 0),
  ('SH', 'Saint Helena, Ascension and Tristan da Cunha', false, 'metric', 'GBP', 0),
  ('SI', 'Slovenia', false, 'metric', 'EUR', 0),
  ('SJ', 'Svalbard and Jan Mayen', false, 'metric', 'NOK', 0),
  ('SK', 'Slovakia', false, 'metric', 'EUR', 0),
  ('SL', 'Sierra Leone', false, 'metric', 'SLE', 0),
  ('SM', 'San Marino', false, 'metric', 'EUR', 0),
  ('SN', 'Senegal', false, 'metric', 'XOF', 0),
  ('SO', 'Somalia', false, 'metric', 'SOS', 0),
  ('SR', 'Suriname', false, 'metric', 'SRD', 0),
  ('SS', 'South Sudan', false, 'metric', 'SSP', 0),
  ('ST', 'São Tomé and Príncipe', false, 'metric', 'STN', 0),
  ('SV', 'El Salvador', false, 'metric', 'USD', 0),
  ('SX', 'Sint Maarten', false, 'metric', 'ANG', 0),
  ('SY', 'Syria', false, 'metric', 'SYP', 0),
  ('SZ', 'Eswatini', false, 'metric', 'SZL', 0),
  ('TC', 'Turks and Caicos Islands', false, 'metric', 'USD', 0),
  ('TD', 'Chad', false, 'metric', 'XAF', 0),
  ('TF', 'French Southern and Antarctic Lands', false, 'metric', 'EUR', 0),
  ('TG', 'Togo', false, 'metric', 'XOF', 0),
  ('TH', 'Thailand', false, 'metric', 'THB', 0),
  ('TJ', 'Tajikistan', false, 'metric', 'TJS', 0),
  ('TK', 'Tokelau', false, 'metric', 'NZD', 0),
  ('TL', 'Timor-Leste', false, 'metric', 'USD', 0),
  ('TM', 'Turkmenistan', false, 'metric', 'TMT', 0),
  ('TN', 'Tunisia', false, 'metric', 'TND', 0),
  ('TO', 'Tonga', false, 'metric', 'TOP', 0),
  ('TR', 'Türkiye', false, 'metric', 'TRY', 0),
  ('TT', 'Trinidad and Tobago', false, 'metric', 'TTD', 0),
  ('TV', 'Tuvalu', false, 'metric', 'AUD', 0),
  ('TW', 'Taiwan', false, 'metric', 'TWD', 0),
  ('TZ', 'Tanzania', false, 'metric', 'TZS', 0),
  ('UA', 'Ukraine', false, 'metric', 'UAH', 0),
  ('UG', 'Uganda', false, 'metric', 'UGX', 0),
  ('UM', 'United States Minor Outlying Islands', false, 'metric', 'USD', 0),
  ('US', 'United States', false, 'imperial', 'USD', 0),
  ('UY', 'Uruguay', false, 'metric', 'UYU', 0),
  ('UZ', 'Uzbekistan', false, 'metric', 'UZS', 0),
  ('VA', 'Vatican City', false, 'metric', 'EUR', 0),
  ('VC', 'Saint Vincent and the Grenadines', false, 'metric', 'XCD', 0),
  ('VE', 'Venezuela', false, 'metric', 'VES', 0),
  ('VG', 'British Virgin Islands', false, 'metric', 'USD', 0),
  ('VI', 'United States Virgin Islands', false, 'metric', 'USD', 0),
  ('VN', 'Vietnam', false, 'metric', 'VND', 0),
  ('VU', 'Vanuatu', false, 'metric', 'VUV', 0),
  ('WF', 'Wallis and Futuna', false, 'metric', 'XPF', 0),
  ('WS', 'Samoa', false, 'metric', 'WST', 0),
  ('YE', 'Yemen', false, 'metric', 'YER', 0),
  ('YT', 'Mayotte', false, 'metric', 'EUR', 0),
  ('ZA', 'South Africa', false, 'metric', 'ZAR', 0),
  ('ZM', 'Zambia', false, 'metric', 'ZMW', 0),
  ('ZW', 'Zimbabwe', false, 'metric', 'ZWG', 0)
ON CONFLICT (code) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PROOFS
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  v_countries int;
  v_anchors   int;
  v_bad       int;
  v_dupes     int;
  v_changed   int;
  v_open      int;
BEGIN
  SELECT count(*) INTO v_countries FROM public.countries;
  IF v_countries <> 249 THEN
    RAISE EXCEPTION 'P1 failed: % countries, expected 249', v_countries;
  END IF;

  SELECT count(*) INTO v_bad FROM public.countries WHERE code !~ '^[A-Z]{2}$';
  IF v_bad <> 0 THEN
    RAISE EXCEPTION 'P2 failed: % codes are not two upper-case letters', v_bad;
  END IF;

  SELECT count(*) INTO v_dupes
    FROM (SELECT name_en FROM public.countries GROUP BY name_en HAVING count(*) > 1) d;
  IF v_dupes <> 0 THEN
    RAISE EXCEPTION 'P3 failed: % duplicated country names', v_dupes;
  END IF;

  SELECT count(*) INTO v_anchors FROM public.locations WHERE level = 'country';
  IF v_anchors <> 249 THEN
    RAISE EXCEPTION 'P4 failed: % country anchors, expected 249', v_anchors;
  END IF;

  SELECT count(*) INTO v_changed
    FROM l2bs_before b
    JOIN public.countries c ON c.code = b.code
   WHERE c.name_en IS DISTINCT FROM b.name_en
      OR c.is_active IS DISTINCT FROM b.is_active
      OR c.unit_system IS DISTINCT FROM b.unit_system
      OR c.currency_code IS DISTINCT FROM b.currency_code;
  IF v_changed <> 0 THEN
    RAISE EXCEPTION 'P5 failed: % pre-existing country rows were modified', v_changed;
  END IF;

  SELECT count(*) INTO v_open
    FROM public.locations WHERE level = 'country' AND is_active;
  IF v_open <> 2 THEN
    RAISE EXCEPTION 'P6 failed: % active anchors, expected exactly ET and US', v_open;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations
                  WHERE level = 'country' AND is_active AND country_code = 'ET')
     OR NOT EXISTS (SELECT 1 FROM public.locations
                     WHERE level = 'country' AND is_active AND country_code = 'US') THEN
    RAISE EXCEPTION 'P6 failed: the two active anchors are not ET and US';
  END IF;

  RAISE NOTICE 'L2b-S OK: 249 countries, 249 anchors, 2 open (ET, US), six seed rows untouched.';
END $$;

DROP TABLE l2bs_before;

-- Self-mark (DEC-022).
INSERT INTO public.migration_marks(version) VALUES ('20260916010000') ON CONFLICT DO NOTHING;
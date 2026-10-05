Source: supervisor thread, turn 1232, Sat 2026-10-03 12:38 New York.
Status at 2026-10-04: carried out: the curator delivered all three on 2026-10-03 15:09 (batch 19; the reserved-names list, 435 names and 2,427 handles; the price-period note); batch 19 imported 2026-10-03 15:19; the standing rule on keys remains in force.
Related: C27 batch 19, DEC-107, DEC-109, reserved names v3, INC-374, INC-381, DEC-094.

Batch 18 is imported live as delivered: categories 9 changed, definitions 5
changed, links 1 changed, 1,467 unchanged. Your base is now your batch-18
merged state (168 categories, 555 definitions, 1,468 link rows).

For your files:
- own_place: a new ad in that category does not carry over the seller's last
  pin, directions and location details. map_pin is no longer read by anything;
  the map is offered on every category.
- Two capabilities in one cell are written with a pipe: map_pin|own_place.

TASK 1 — batch 19 (import files). Remove the "Negotiable" option from the
services pricing list (pricing_type). The price page has its own "Price is
negotiable" tick box, so the option duplicates it.
- Take the value negotiable out of the pricing_type options.
- Take it out of every link scope that lists it. I count 13: pet-services,
  realtor-services, construction-trades, education-training, events-services,
  financial-legal, home-services, logistics-cargo, personal-care-services,
  printing-photography, repair-maintenance, tailoring-services,
  vehicle-services. No link has it as its default. Check my count against
  your state.
- Nothing else changes. Deliver the definitions file, the links file and your
  note with the expected previews, as before.

TASK 2 — research list, NOT an import file. Names a seller must not take as
their seller name, because buyers would mistake them for the real
organisation. One CSV with these columns:
  name_en, name_am, kind, country, handles, source
- kind: bank, insurer, telecom, mobile money, airline, utility, government
  body, delivery or ride service, money transfer, online platform, email
  provider.
- handles: the forms someone would type as a seller name, pipe-separated,
  small Latin letters, digits and underscore only. Give the full name, the
  usual abbreviation and common spellings, for example
  commercial_bank_of_ethiopia|cbe|cbe_birr.
- Ethiopia in full: every licensed bank and insurer, telecoms and mobile
  money, the airline, power, water and post, federal ministries and
  authorities people deal with (revenue, customs, immigration, documents,
  transport, trade), the Addis Ababa city administration.
- Then the leading few of each kind for Kenya, Eritrea, Djibouti and Somalia.
- Then the international names most often impersonated: the large messaging,
  social, payment and money-transfer platforms and the main email providers.
- Leave out product brands already on the catalogue's brand lists; those are
  protected from the live lists automatically.
- One source link per row.

TASK 3 — a short note, NOT an import file. For the categories that can be
rented or hired, say from real ads which price periods sellers actually use
and which one is most common:
- the six real-estate leaves with Offer Type rent or lease;
- the eight equipment leaves with Offer Type sale or hire;
- the three clothing leaves with Sale or Rent;
- short-term-rentals and vehicle-hire.
Give per group: periods seen (per hour, day, night, week, month, year, per
event), the most common one, and how sellers state a minimum term or payment
schedule. Do not build rows for this; the form change comes first.

STANDING RULE from now on. These keys have a fixed meaning the posting form
will rely on. Do not rename them, and use these exact keys when a new category
needs the same question: every unit_of_sale key, every pricing_type key,
net_weight_g, volume_ml, pack_quantity, quantity_available, lease_term,
payment_frequency, payment_plan, min_hire_days.

Still waiting for the engine, unchanged: INC-374, INC-381, DEC-094.

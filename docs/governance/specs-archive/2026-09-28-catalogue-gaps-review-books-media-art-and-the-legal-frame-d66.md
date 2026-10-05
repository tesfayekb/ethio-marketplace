Source: supervisor thread, turn 853, Mon 2026-09-28 00:45 New York.
Status at 2026-10-05: research and proposals answered by the operator on 2026-09-28 00:52 (Study C25 chartered in turn 855; D66 approved in principle; Jobs deferred deliberately); C25 was delivered and imported (catalogue 167 categories); D66 (publish attestation, rights_basis door rule, authentic_original extension, policy doc) was never specified as a prompt and is not built; the Prohibited & Restricted Items policy exists only as the curator's DRAFT awaiting counsel; not in the repo.
Related: Study C25, D66, DEC-083 (reserved for D66 at the time; later used for the server-error census), REQ-021, Jobs decision.

Good instinct — the catalogue is deep where it started (vehicles, property, food, traditional wear) and thin exactly where you're pointing: books, media, art, collectibles, and the legal frame around selling other people's work. Review against the live exports (162 categories · 485 attributes · 1,366 links):

## 1 · Books & education

**What exists:** one leaf, Sports & Leisure › **Books & Media**, with `book_genre` (textbook, exam prep, academic, language, fiction, children, religious, business, magazines), `book_language` (Amharic, English, Afaan Oromo, Tigrinya, Somali, Afar, Sidama, Arabic, French), `book_format` (paperback, hardcover, digital), `level`, condition. Babies & Kids › School & Learning covers school bags, stationery, children's books, learning materials.

**Gaps:**
- No **author**, **publisher/year**, **edition**, or **set/volume** fields — a textbook seller today has to put "Grade 9 Physics, new curriculum, 2023" in the title. Add `author` (text), `grade` (KG, 1–12, preparatory, university, adult), `curriculum` (new / old), `publication_year`, `set_or_single`.
- `book_language` lacks **Ge'ez** (ግዕዝ) — religious texts are a real market.
- Books & Media is not reachable from Babies & Kids or from Education & Tutoring; surface it there (a pointer, one line in a categories file).
- **Digital books** are allowed by `book_format = digital` with no rights rule — that's the piracy door (PDF copies of textbooks are the most common IP problem in this market). Rule: digital copies only by the publisher/author; see §4.

## 2 · Music, film, cassettes

**What exists:** nothing. "Books & Media" has only book-shaped attributes; a cassette, CD, vinyl or DVD seller has no format, no artist, no genre. Musical Instruments is well done (krar, masinko, begena, washint, kebero).

**Proposal — new leaf "Music, Film & Media"** (Sports & Leisure; surfaced under Electronics › Audio & Sound): `media_type` (cassette, CD, vinyl, VCD/DVD, digital), `media_genre` (Ethiopian traditional, Amharic pop, Tigrigna, Oromo, Gurage, Somali, mezmur/gospel, nasheed, Ethio-jazz, international, film, documentary, other), `artist` (text), `release_era` (decade), condition, and a **rights basis** (§4). Vintage 80s–90s cassettes are collectibles in the diaspora; `release_era` and condition carry that.

## 3 · Art, crafts, memorabilia

**What exists:** a painting is "wall art" under Home Décor (colour, size, room — nothing about artist, medium or originality); `hobby_type` has `art_supplies` and `collectibles` as single values.

**Proposal — new leaf "Art & Collectibles"** (Sports & Leisure; surfaced under Home & Garden › Home Décor): `artwork_type` (painting, drawing, print/poster, sculpture, photography, church/icon art, woodwork, basketry & weaving, calligraphy, collectible), `medium` (oil, acrylic, watercolour, mixed, digital print), **`originality` — required** (original by the seller · original by another artist · numbered limited print · open print · reproduction/replica), `artist` (text) with `artist_is_seller` (yes/no), `signed`, `framed`, `width_cm`/`height_cm` (exist), `year`, `certificate_of_authenticity`. For collectibles: `collectible_type` (coins & banknotes — old series only, stamps, medals, vintage photographs, sports memorabilia, antiques), `era`, `authenticity`.

**Legal caution here is real:** Ethiopia's cultural-heritage law restricts trade in antiquities, manuscripts, church crosses, icons and similar heritage objects, and their export. The policy should be: no heritage antiquities, no manuscripts; modern-made replicas allowed and **labelled** `reproduction`. Old banknotes/coins as collectibles are fine; **current currency is not a listing** (see §4 — FX trading).

## 4 · The legal frame (this is the part that protects you)

Today the only rights-shaped attribute is `authentic_original` (fashion, jewelry, audio: "tick only for an original; copies leave it unticked"). There is no seller attestation and no prohibited-items policy the wizard shows. Four layers, cheapest first:

1. **Publish attestation, every listing (spec D66, Tier A, small):** a required checkbox on Review — "I own this item or am authorised to sell it, and this listing follows the Prohibited & Restricted Items policy" — stored on the listing (`attested_at`, `policy_version`); `publish_listing` refuses without it. Standard practice on every serious classifieds site.
2. **Rights basis on creative-work leaves** (music/film, books when `digital`, art prints, software): a required attribute `rights_basis` — I am the creator/rights holder · authorised copy (label/publisher) · used original physical copy · reproduction, clearly labelled. Rule enforced by the door: `digital` + anything but "creator/rights holder" is refused; the wizard says why in one sentence.
3. **Counterfeit flag consistency:** `authentic_original` today on fashion, jewelry and audio only — extend to phones, electronics accessories, cosmetics/fragrances (fake cosmetics are a health issue) and toys; keep "Master quality / high copy / AAA = leave unticked" wording; the screening gateway (REQ-021) gets those words as flags.
4. **Prohibited & Restricted Items policy** (a doc + screening terms in Amharic and English), Ethiopia and diaspora together: weapons; drugs; **khat** (legal in Ethiopia, illegal in the US, UK, Canada and most of Europe — with `excluded_country_codes` we could scope it, but I'd prohibit it outright); prescription medicines; **foreign-currency exchange and birr trading** (NBE rules — "ዶላር ልውውጥ" listings are the classic abuse); wildlife products; heritage antiquities and manuscripts; alcohol/tobacco (age-gated or out); adult content; IDs, passports, government documents; gambling/lottery; counterfeit goods; pirated media; stolen goods (phones without receipt — screening signal). Land is already framed correctly (`title_status`: lease title, old holding, condo certificate, kebele house, rural use certificate) — add one policy line: land listings are usage-right transfers, not freehold.

I'm not a lawyer; the specific proclamations (Copyright 410/2004, Cultural Heritage 209/2000, NBE FX directives) should get a counsel pass before the policy text is published — but the mechanics above are right regardless.

## 5 · Other gaps worth a look

- **Jobs** — the biggest absence: no vacancies, no job-seekers. Every Ethiopian classifieds site has it, and it is also the biggest scam surface (fees for "visa jobs"). This is a product decision, not a curator file: a Jobs root with employer verification and no-fee rules, or leave it to the job sites. **Your call; I lean "later, deliberately."**
- **Solar & backup power** is split across Commercial › Generators (`solar_hybrid`, UPS) and Construction › Electrical (`solar_panel`, `inverter_battery`). Home solar kits are a huge off-grid market — a dedicated leaf under Home & Garden (surfaced under Electronics and Construction) with panel W, battery Ah, inverter kVA, kit vs component.
- **Religious & cultural items**: modern church goods (crosses, tsinatsil, prayer books), Islamic items (prayer rugs, qamis, tasbih), holiday goods (Meskel, Timket, Genna, Fasika, Eid) — today scattered (incense in Beauty › Traditional, coffee ceremony in Kitchen). A "Religious & Cultural Items" leaf under Home & Garden, with the heritage rule from §3.
- **Tailoring & fashion services** (dressmakers, habesha kemis makers, alterations) have no service leaf — common and legitimate.
- **Water tanks & pumps** (Roto tanks, submersibles) — check whether Plumbing's material types cover them; if not, add.
- **Wholesale/bulk**: `quantity_available` and units exist in agriculture, construction and food; fine for now.
- Present and good: Bajaj, plate codes and customs status on vehicles; injera mitad; coffee ceremony sets; holiday livestock; teff, kolo, fasting-friendly and halal flags; gabi ply; regional traditional wear; eucalyptus timber.

**Proposed next steps (say "go" or adjust):**
1. **Study C25** to the curator: the three new leaves (Music/Film/Media; Art & Collectibles; Religious & Cultural Items), Solar & Backup Power, Tailoring services, the Books additions (author, grade, curriculum, year, Ge'ez), the `authentic_original` extension, and the `rights_basis`/`originality` attributes — files after C22-style approval.
2. **Spec D66** (attestation + rights rule + policy doc + screening terms) — I write it after D62-2/DEC-082, before D65 photo studio, since D65 also needs the policy hook.
3. **Jobs**: your decision, no rush.

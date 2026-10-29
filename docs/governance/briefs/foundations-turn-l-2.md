````text
RULING — Foundations turn L-2: BUILD your plan (Part 0, Part A, Part B) with the rulings below. Base: dev 5d61def7 (CI SUCCESS, run on 5d61def7; main promoted). Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2.md, in one fenced block opened and closed with four backticks (it contains a ```json block), and prove its sha256 equals the value after END. Roadmap line 3 names it.
- The STRINGS block below is extracted from the saved file by script, never retyped. Its sha256 (the bytes between its ```json line and its closing ``` line) is d41a33d0754356f636d2e70ac065f2aa9aceaebbfcc473276ecf632e9468ab0b, 7889 bytes. Prove it.

CI FIRST: the newest completed run, 5d61def7, is SUCCESS. If a newer completed run is red, fix it first.

PART 0 — approved as planned (0.1 with the added self-test case, 0.2, 0.3), built first.

PART A — approved, with these rulings.
A1. Where the helpers live (performance). formatCountryName and collatorFor do NOT go into format.ts.
  - format.ts is one shared chunk (0.8 KiB).
  - legal-kinds.ts rides every page's first download (your L-1b measurement), and place-order.ts rides the shell's location selector (src/components/shell/location-selector.tsx). Either helper in format.ts would put the whole formatter on every page.
  - Each helper is its own small module, taking its locale from formatLocale:
    - src/lib/country-name.ts holds formatCountryName;
    - src/lib/collator.ts holds collatorFor, moved from place-order.ts :11–:20 with its options unchanged.
  - The concern's mechanism is formatLocale with format.ts, country-name.ts and collator.ts. Register row 16 names all of them, and CF-FMT-1 allows Intl.DisplayNames and Intl.Collator only in them.
  - Part A's own growth on any page is at most 0.1 KiB, measured, with its cause. More is a STOP with the measurement.
A2. compareCodes in src/lib/compare-codes.ts is approved.
  - For each machine-order site, the report names the kind of value sorted (uuid, code, slug, ISO timestamp, feature id) and confirms it is single-case ASCII.
  - A site whose values are mixed-case or human text is not machine order: it goes to collatorFor or compareNames instead.
  - Every test that pins these lists' order stays green, unchanged.
A3. FIXED_ORDER_LOCALE in locale.ts is approved. Your K2 (the database collation for non-Latin names) becomes a roadmap line.
A4. languages-page.tsx :62 (the autonym) and cut-text.tsx's Segmenter are allowlisted with your reasons, each `key | reason | 2027-04-30`.
A5. CF-FMT-1's widening, with planted cases a/b/c under CF-FMT-2, is approved. FMT-9…11 are free at 5d61def7.

PART B — approved, with these rulings.
B1. NO ENGLISH TEXT CHANGES. Every route's title and description keep today's English word for word.
  - A pattern key is used only where today's text is an exact instance of it.
  - The report's route table lists per route today's literal and the rendered English, and they are equal.
  - Rejected: the plan's new copy — head.site.description "Buy and sell…", the home title with {country}, head.member.description "{name} on ethio.com.", head.ad.description and head.legal.description. New wording is not part of INC-990.
  - The home title stays "ethio.com — Ethiopia's marketplace": no {country} and no settings read.
  - c.$slug keeps "Category — ethio.com". Its route has no loader data, and a head never adds a request. A category-name title becomes a roadmap line.
B2. THE KEYS are the STRINGS block below: 44 new keys by layer, EN and AM.
  - They are added by script into en-/am-base.ts, en-/am-member.ts and en-/am-admin.ts, each in its file's own key order.
  - The am-script guard and the i18n coverage test must pass.
  - Paste each new key with its English and its Amharic as committed, read back from the files (G43).
  - Reused keys, read from their layer at 5d61def7:
    - app.name ("ethio.com", the root title);
    - panel.admin ("Admin", admin.tsx's name in the site pattern);
    - nav.overview (admin index);
    - nav.locations (admin locations);
    - admin.section.<x>.title for ai, attributes, audit, categories, countries, coverage, images, listings ("All listings"), places, roles, screening, translations and users;
    - account.overview.title, myLegal.title, nav.saved, nav.myListings, post.edit.title and post.title (member pages);
    - auth.signIn and auth.resetTitle (auth);
    - legal.accept.title, legal.kind.privacy, legal.kind.terms and legal.kind.publishing.
  - If any reused key's English differs from today's page name, it is a STOP for that route, never a silent new wording.
  - post.head.title (en-base.ts :480, read nowhere at 5d61def7) is retired in this turn (D5), in both languages.
B3. legal.$kind (the E2E-only scratch seam, DEC-018) and dev.* are allowlisted in CF-HEAD-1, each `key | reason | 2027-04-30`. legal.$kind's title is not rebuilt.
B4. LANGUAGE.
  - No router.invalidate(): it re-runs every active loader on a language pick. The re-title after a pick is the one client effect owned by page-head.ts, your plan's fallback.
  - The laws, each proven:
    (a) the server's HTML head is in the reader's language (PGH-E1);
    (b) after hydration, document.title and the description still equal the server's, with no flip to English (PGH-E1 checks after hydration too);
    (c) a pick re-titles with the URL unchanged, and no request goes to a route's server function during the pick (PGH-E2 records the requests).
B5. WEIGHT.
  - Member and admin head keys live in their layers, at no base cost.
  - The 15 base keys are on the first paint by right: the head is part of every first paint, and the hydrating head renders the server's text.
  - Raise each affected ceiling to its next whole KiB with that cause (L-1b's rule).
  - Growth above 0.5 KiB on any page is a STOP with the measurement.
B6. TESTS: PGH-1…6, PGH-E1 and PGH-E2 are free at 5d61def7.
  - PGH-E1's admin page uses an admin pool lease (J9), never a real account. Its ad is a J1 scratch ad.
  - e2e/page-head.spec.ts joins the selector's existing "routes" area (src/routes/**). src/lib/page-head.ts matches no area, so a change to it prints ALL. No page-head area is added (Part 0.1's lesson).
B7. The guard CF-HEAD-1 is as planned, proven on a planted literal and wired.
  - Its allowlist holds only B3's lines.
  - seller-head.ts becomes a pageHead consumer.

NOT IN THIS TURN: anything that needs a migration; L-5's t(key, values), for which fillOne is the placeholder.

HOW TO WORK
- CI FIRST; K1–K6.
- `bun run checks` before every push, with its last line pasted. NEAR lines are raised in the same turn with their cause.
- Each touched spec file is run whole, both projects, 0 retries.
- Run the i18n maps.
- If the platform's time limit nears, stop at the split your plan named: Part 0 and Part A landed green, then Part B. Report the three lines.

Push, and END THE TURN with the report:
- the CI line;
- step 0's sha256 and the STRINGS sha256;
- Part 0, A1–A5 and B1–B7, each done or not;
- the route table (before and after English);
- the 44 keys as committed;
- the first-download growth per page with causes;
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only 5d61def7.

STRINGS (layer → key → en, am):
```json
{
  "base": {
    "head.site.pattern.title": {
      "en": "{name} — ethio.com",
      "am": "{name} — ethio.com"
    },
    "head.site.description": {
      "en": "Ethiopia's marketplace — coming soon.",
      "am": "የኢትዮጵያ ገበያ — በቅርቡ ይመጣል።"
    },
    "head.home.title": {
      "en": "ethio.com — Ethiopia's marketplace",
      "am": "ethio.com — የኢትዮጵያ ገበያ"
    },
    "head.home.description": {
      "en": "Browse listings from sellers near you. Free to post, free to browse.",
      "am": "በአቅራቢያዎ ካሉ ሻጮች ማስታወቂያዎችን ይመልከቱ። መለጠፍም መመልከትም ነጻ ነው።"
    },
    "head.category.title": {
      "en": "Category",
      "am": "ምድብ"
    },
    "head.category.description": {
      "en": "Browse listings in this category from sellers near you.",
      "am": "በዚህ ምድብ ውስጥ በአቅራቢያዎ ካሉ ሻጮች ማስታወቂያዎችን ይመልከቱ።"
    },
    "head.seller.description": {
      "en": "Ads by {name} on ethio.com.",
      "am": "በ ethio.com ላይ የ{name} ማስታወቂያዎች።"
    },
    "head.privacy.description": {
      "en": "The Privacy Policy of ethio.com, the version in force and the next one.",
      "am": "የ ethio.com የግላዊነት መመሪያ፣ በሥራ ላይ ያለው ስሪት እና ቀጣዩ።"
    },
    "head.terms.description": {
      "en": "The Terms of Service of ethio.com, the version in force and the next one.",
      "am": "የ ethio.com የአገልግሎት ውሎች፣ በሥራ ላይ ያለው ስሪት እና ቀጣዩ።"
    },
    "head.publishing.description": {
      "en": "The publishing statement every seller certifies before an ad goes live.",
      "am": "እያንዳንዱ ሻጭ ማስታወቂያው በቀጥታ ከመውጣቱ በፊት የሚያረጋግጠው የማስታወቂያ ማረጋገጫ ቃል።"
    },
    "head.auth.description": {
      "en": "Sign in or create your free ethio.com account.",
      "am": "ይግቡ ወይም ነጻ የ ethio.com አካውንትዎን ይፍጠሩ።"
    },
    "head.authCallback.title": {
      "en": "Confirm your email",
      "am": "ኢሜይልዎን ያረጋግጡ"
    },
    "head.authCallback.description": {
      "en": "Finish confirming your ethio.com account.",
      "am": "የ ethio.com አካውንትዎን ማረጋገጥ ይጨርሱ።"
    },
    "head.authReset.description": {
      "en": "Choose a new password for your ethio.com account.",
      "am": "ለ ethio.com አካውንትዎ አዲስ የይለፍ ቃል ይምረጡ።"
    },
    "head.legalAccept.description": {
      "en": "Accept the Terms of Service and the Privacy Policy.",
      "am": "የአገልግሎት ውሎቹን እና የግላዊነት መመሪያውን ይቀበሉ።"
    }
  },
  "member": {
    "head.settings.title": {
      "en": "Account settings",
      "am": "የአካውንት ቅንብሮች"
    },
    "head.settings.description": {
      "en": "Manage your ethio.com sign-in methods and security.",
      "am": "የ ethio.com መግቢያ መንገዶችዎን እና ደህንነትዎን ያስተዳድሩ።"
    },
    "head.account.description": {
      "en": "Review your ethio.com account and listing activity.",
      "am": "የ ethio.com አካውንትዎን እና የማስታወቂያ እንቅስቃሴዎን ይመልከቱ።"
    },
    "head.myLegal.description": {
      "en": "The legal documents you accepted on ethio.com.",
      "am": "በ ethio.com ላይ የተቀበሏቸው ሕጋዊ ሰነዶች።"
    },
    "head.myLegalDocument.title": {
      "en": "A legal document",
      "am": "ሕጋዊ ሰነድ"
    },
    "head.myLegalDocument.description": {
      "en": "A legal document you accepted on ethio.com.",
      "am": "በ ethio.com ላይ የተቀበሉት ሕጋዊ ሰነድ።"
    },
    "head.saved.description": {
      "en": "Your saved ads on ethio.com.",
      "am": "በ ethio.com ላይ ያስቀመጧቸው ማስታወቂያዎች።"
    },
    "head.myListings.description": {
      "en": "Your ads on ethio.com: live, in review, closed and sold.",
      "am": "በ ethio.com ላይ ያሉ ማስታወቂያዎችዎ፦ በቀጥታ ያሉ፣ በግምገማ ላይ ያሉ፣ የተዘጉ እና የተሸጡ።"
    },
    "head.myListing.title": {
      "en": "My listing",
      "am": "የእኔ ማስታወቂያ"
    },
    "head.myListing.description": {
      "en": "One of your ads on ethio.com: its state, history and actions.",
      "am": "በ ethio.com ላይ ካሉ ማስታወቂያዎችዎ አንዱ፦ ሁኔታው፣ ታሪኩ እና እርምጃዎቹ።"
    },
    "head.editAd.description": {
      "en": "Change one of your ads on ethio.com, step by step.",
      "am": "በ ethio.com ላይ ካሉ ማስታወቂያዎችዎ አንዱን ደረጃ በደረጃ ይቀይሩ።"
    },
    "head.post.description": {
      "en": "Post what you are selling on ethio.com in a few short steps.",
      "am": "የሚሸጡትን በጥቂት አጭር ደረጃዎች በ ethio.com ላይ ይለጥፉ።"
    },
    "head.continuePost.title": {
      "en": "Continue your listing",
      "am": "ማስታወቂያዎን ይቀጥሉ"
    },
    "head.continuePost.description": {
      "en": "Finish the listing you started on ethio.com.",
      "am": "በ ethio.com ላይ የጀመሩትን ማስታወቂያ ይጨርሱ።"
    }
  },
  "admin": {
    "head.admin.pattern.title": {
      "en": "{name} — ethio.com Admin",
      "am": "{name} — ethio.com አስተዳደር"
    },
    "head.admin.pattern.description": {
      "en": "{name} in the ethio.com staff panel.",
      "am": "{name} በ ethio.com የሠራተኞች ክፍል ውስጥ።"
    },
    "head.admin.panel.description": {
      "en": "Administration panel for ethio.com staff.",
      "am": "ለ ethio.com ሠራተኞች የአስተዳደር ክፍል።"
    },
    "head.admin.impersonation.title": {
      "en": "Impersonation session",
      "am": "የመወከል ክፍለ ጊዜ"
    },
    "head.admin.legal.title": {
      "en": "Legal documents",
      "am": "ሕጋዊ ሰነዶች"
    },
    "head.admin.legal.description": {
      "en": "Manage legal document versions and publishing facts on ethio.com.",
      "am": "በ ethio.com ላይ የሕጋዊ ሰነዶችን ስሪቶች እና ሲታተሙ የሚቀመጡ መረጃዎችን ያስተዳድሩ።"
    },
    "head.admin.legalVersion.title": {
      "en": "Legal version",
      "am": "የሕጋዊ ሰነድ ስሪት"
    },
    "head.admin.legalVersion.description": {
      "en": "Read a legal document version and its frozen facts on ethio.com.",
      "am": "በ ethio.com ላይ የሕጋዊ ሰነድ ስሪትን እና ሲታተም የተቀመጡ መረጃዎቹን ያንብቡ።"
    },
    "head.admin.legalDraft.title": {
      "en": "Legal draft",
      "am": "የሕጋዊ ሰነድ ረቂቅ"
    },
    "head.admin.legalDraft.description": {
      "en": "Write and publish bilingual legal document drafts on ethio.com.",
      "am": "በ ethio.com ላይ ባለ ሁለት ቋንቋ የሕጋዊ ሰነድ ረቂቆችን ይጻፉ እና ያትሙ።"
    },
    "head.admin.listing.title": {
      "en": "Listing",
      "am": "ማስታወቂያ"
    },
    "head.admin.editListing.title": {
      "en": "Edit listing",
      "am": "ማስታወቂያውን ያርትዑ"
    },
    "head.admin.languageStrings.title": {
      "en": "Language strings",
      "am": "የቋንቋ ሐረጎች"
    },
    "head.admin.user.title": {
      "en": "User",
      "am": "ተጠቃሚ"
    },
    "head.admin.role.title": {
      "en": "Role",
      "am": "ሚና"
    }
  }
}
```
````

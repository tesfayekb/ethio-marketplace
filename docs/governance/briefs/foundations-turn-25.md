# Foundations — turn 25: speed S2 — the ad page's first picture named in its server HTML and asked for first; one signer for public photos; category pictures small and kept a year (D234; INC-900): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 25 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97). Tier A (a door that hands out photo links: signPublicPhotos signs with the service role, and the census of every direct signing lands with it). No migration. No new string. No package change. AGENTS.md unchanged. Base: dev f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97 (Foundations turn 24's final commit; its CI run: A1). Before sending, every new line was read against every line of AGENTS.md and against the platform rules you quoted on 25 Oct: no new control (so no raw <button>); no map read by an outside key; no silent catch — the one logged fallback (B2) names its precedent; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first, and turn 24's one limit; STEP 0; B — the ad page's first picture and the one signer for public photos; C — category pictures; D — docs, register, roadmap, changelog.
BASE: f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/conformance/photo-signing.test.ts
scripts/conformance/photo-signing-allowlist.txt
src/server/media/links.ts
src/server/media/links.test.ts
src/server/ad-page.ts
src/server/ad-page.test.ts
src/server/ad-photo.ts
src/routes/l.photo.test.ts
src/routes/l.$slug.tsx
src/features/posting/use-photo-links.ts
src/features/posting/use-photo-links.test.ts
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/photo-gallery.tsx
src/features/admin-categories/category-image-variants.ts
src/features/admin-categories/category-image-variants.test.ts
src/features/admin-categories/category-images-service.ts
src/components/shell/date-field.test.tsx
e2e/ad-page.spec.ts
SCOPE-END

THE SYSTEM (G0) — two concerns.
CONCERN 1: a public page's largest first picture is named in the server's HTML and asked for first — never after hydration, never lazily.
MECHANISM 1: the photo-link signer, src/server/media/links.ts (readAndSignPhotoLinks :94, DEC-195: the rows read as the caller, then signed), gains signPublicPhotos (B1): the photos of a public listing document — which public_listing already filtered by the public read policy's own predicate (public_listing_json: exif_stripped AND NOT unscreened) — signed as they stand, with no second read, at most MAX_LINK_PHOTOS (:33). usePhotoLinks (src/features/posting/use-photo-links.ts :26) takes the server's links as its preset (B3). First-picture priority is ListingPicture's `priority` (src/components/marketplace/listing-picture.tsx :111, :169-:170; DEC-195) and, for the gallery, its main image's own attributes (B4).
CONSUMERS 1 (every public page's first picture, at BASE): the feed's first six cards (src/components/marketplace/feed.tsx :218), the seller page's (src/features/seller/seller-page.tsx :104) and the saved page's (src/features/account/saved-page.tsx :98) — use (their links arrive with the answer, DEC-195; priority on the first six); the similar ads — below the fold, no priority (DEC-195) — correct as they are; the ad page's gallery main photo (src/features/posting/preview/photo-gallery.tsx :147) — bypasses: its link is asked after hydration by POST /api/media/photo-links, and the image has no priority — moves in B2–B4; the photo-less ad's category picture (src/features/posting/preview/listing-detail.tsx :646, ListingPicture without `priority`, so loading="lazy") — bypasses: it is the baseline's 6.0 s LCP element — moves in B4. Photo-link signing, every door at BASE: readAndSignPhotoLinks — /api/media/photo-links (src/routes/api/media/photo-links.ts :82) and /api/feed (src/routes/api/feed.ts :126) — use; signPhotoRows called directly — src/server/ad-photo.ts :38 (the share image, from the public document's cover) — moves onto signPublicPhotos in B5; src/routes/api/listings/assist.ts :119 (its rows read as the caller first) and src/routes/api/listings/background.ts :170 (ownership asserted as the caller first) — allowances with their proof (B0).
CONCERN 2: a category picture a buyer downloads is small and kept by the phone: the card and the thumb are WebP, and every picture is stored under its versioned name with a one-year cache.
MECHANISM 2: makeVariants (src/features/admin-categories/category-image-variants.ts :234) cuts the pictures and generateCategoryImage (src/features/admin-categories/category-images-service.ts, the upload loop :133) stores them — the one place category pictures are made.
CONSUMERS 2: the staff images dialog (generate and regenerate) — moves in C1–C2; e2e CI-4b (e2e/category-image-routes.spec.ts) uploads its own PNG through the gated persist — unchanged (the readers and admin_set_category_images accept any name).
COVERED HERE: concern 1 whole on the ad page and the share image, and the census of every direct signing; concern 2 for every picture made from now on. LEFT: the pictures already stored stay PNG with a one-hour cache — on production 171 card pictures, 127.5 KiB on average (storage.objects, read 25 Oct) — until each is regenerated or a staff "re-cut" action exists (it needs new strings) — INC-900 (stored category pictures are PNG of about 128 KiB with a one-hour cache), Tesfaye's choice. SIBLING: raw <button> elements, the gallery's own among them (photo-gallery.tsx :137) — INC-899, not touched in this turn (A1).
CONFORMANCE GUARD: concern 1 — NEW scripts/conformance/photo-signing.test.ts SIGN-1/SIGN-2: every call of signPhotoRows or readLinks outside src/server/media/links.ts and storage.ts needs a line in NEW scripts/conformance/photo-signing-allowlist.txt naming its caller-scoped proof (`key | reason | until`); SIGN-2 catches a planted direct signing and passes the signer's own entries. First-picture priority is proven page by page — AP-49 (the feed, today), AP-51 and AP-52 (the ad page, NEW, B6); a census by shape cannot tell a hero picture from any other — guard debt for the records turn. Concern 2 — CIV-1 (C1).
EXCEPTIONS: assist.ts and background.ts sign directly after their own caller-scoped proof — the two allowlist lines (DEC-195).
FIVE LENSES — security: signPublicPhotos signs only the photos public_listing returned to the anonymous client, whose photo set is the public read policy's own predicate — the set /api/media/photo-links signs for any visitor, and the share image already signed this way; the HTML (a no-cache page) carries links that expire in an hour (PHOTO_LINK_SECONDS); the signing rides the page read's own dial (listingReadAddress); SIGN-1 fails CI on any new door that signs keys without a named proof · performance: the ad page's first photo no longer waits for hydration plus one more request (on the lab's slow 4G every request carries 562 ms of latency) and is fetched at high priority; the photo-less ad's picture loads at once; the server read adds one storage signing call (ESTIMATE 50–150 ms of server time) and about 8–12 KB of compressed links in the page that the browser fetched after hydration before (ESTIMATE); first downloads unchanged (/l/$slug 327.5 of 331 KiB on the supervisor's build); a new category card is WebP — ESTIMATE a quarter or less of the 127.5 KiB PNG — and kept a year · failure modes: a signing that fails or answers nothing leaves the page whole — no links, one [ad-links] line, and the browser asks /api/media/photo-links as before (the feed's coverLinks answer the same way, DEC-195, feed.ts :129-:135); a browser that cannot encode WebP stores PNG under a .png name · consistency: every public page's first picture is named by the server and asked for first; one signer for public documents (the ad page, the share image), one for every other door · future growth: a public page with a hero photo uses signPublicPhotos and the preset; a door that signs keys gets an allowlist line with its proof or fails SIGN-1.
FORWARD-SCAN: edge caching of public pages (a DEC with Tesfaye) must keep its window under PHOTO_LINK_SECONDS — links inside a cached page then stay valid; stable card-photo URLs (a DEC with Tesfaye) would change signing for public documents inside signPublicPhotos alone; the font decision; S3 (the feed's first page in the server's HTML). REGISTER: docs/governance/mechanisms.md — NEW rows 43 and 44 (D3).

WHY
- The phone-lab baseline (docs/perf/baseline-2026-10-25-*.json): the ad page's LCP is 6.0 s, and its LCP element is the category picture of a photo-less ad, loaded lazily (a 128 KiB PNG). An ad with photos shows its main photo only after the page has hydrated and asked /api/media/photo-links for the links — one more request on a slow phone before the photo's own download can start.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-25.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-25.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-25.md (Foundations turn 25: speed S2 — the ad page's first picture in its server HTML; one signer for public photos; category pictures small and kept a year — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 24 (docs/governance/briefs/foundations-turn-24", add `  - [ ] Turn 25 (docs/governance/briefs/foundations-turn-25.md; no migration) — speed S2: the ad page's photo links signed in its server read (signPublicPhotos), its first picture asked for first; the photo-signing census (SIGN-1); category pictures as WebP under versioned names cached a year (D234; INC-900).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds two tests, AP-51 and AP-52 (B6), exactly as written; any other spec change you find necessary is a STOP with the test and line reported.
- Run no stateful git command. Edits with your file-editing tool. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-25.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-25.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each step whole (a new function and its callers together). After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 (and at times EXH-11) times out in your sandbox (INC-890; they pass in CI). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's specs through `bun run e2e:local -- <spec file> --grep "<pattern>"` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: the ad page draws as it does today, its first photo sooner; a photo-less ad's category picture loads at once; the share image redirects as today; a category picture generated from now on is WebP (card, thumb) and PNG (the link-preview picture). Nothing else changes.
- Knowledge K: K1 the two mechanisms above; K2 the report lists (file:line) every call of signPhotoRows or readLinks outside src/server/media/links.ts and storage.ts after this turn (it must equal the allowlist), every <img> on the ad page (listing-detail.tsx, photo-gallery.tsx and the components they render) with its loading and fetchpriority, and every raw <button> left in a file this turn touches; K3 SIGN-1/SIGN-2 land in the same part as signPublicPhotos; K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row — AP-52 writes the picture of its own scratch branch's parent, which scratchSeller created and its cleanup destroys; no assertion loosened; red-first for SIGN-1 (B0's two files land first: paste SIGN-1's one finding then — src/server/ad-photo.ts :38, nothing else — and passing after B5) and for UPL-4 (B3's test edit lands before use-photo-links.ts's: paste UPL-4 failing, then passing).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97). A red on f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97 is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.
A2. src/components/shell/date-field.test.tsx, this edit (your turn-24 full run: the warm-up hook that transforms the calendar module outran the 10-second hook default under the whole suite's load; it gets 30 seconds, the cause named in its comment — no assertion changes):
EDIT src/components/shell/date-field.test.tsx #1
OLD-BEGIN
  // the first test's wait is the field's, not the test runner compiling the module.
  beforeAll(async () => {
    await import("./date-calendar");
  });
  beforeEach(() => {
OLD-END
NEW-BEGIN
  // the first test's wait is the field's, not the test runner compiling the module.
  // D234 S2 — under the whole suite's load that first transform (react-day-picker)
  // outran the 10-second hook default (turn 24's full run); it gets 30 seconds.
  beforeAll(async () => {
    await import("./date-calendar");
  }, 30_000);
  beforeEach(() => {
NEW-END

PART B — THE AD PAGE'S FIRST PICTURE; ONE SIGNER FOR PUBLIC PHOTOS (CONCERN 1).
B0. NEW scripts/conformance/photo-signing.test.ts (sha256 adca82304e7a46c742a93134f65580eb7ba67227a79f571ad63fe8e7fe149a55):
FILE-BEGIN scripts/conformance/photo-signing.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * D234 speed turn S2 (DEC-195, G54 a) — A PHOTO'S LINK IS SIGNED BY THE ONE SIGNER,
 * FOR ROWS THE CALLER COULD READ. Links come from src/server/media/links.ts:
 * `readAndSignPhotoLinks` (the rows read as the caller first) or `signPublicPhotos`
 * (the public document's own photos, which the public policy already admitted). A
 * call of the lower-level `signPhotoRows` or `readLinks` anywhere else signs keys
 * the door itself must prove the caller may see, so it needs an allowlist line
 * naming that proof (key | reason | until).
 */
const LOW_LEVEL = new Set(["signPhotoRows", "readLinks"]);
const SIGNER = new Set(["src/server/media/links.ts", "src/server/media/storage.ts"]);

type Finding = { file: string; line: number; what: string };

export function directSigning(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    if (SIGNER.has(file)) continue;
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node)) return;
      const callee = node.expression;
      const name = ts.isIdentifier(callee)
        ? callee.text
        : ts.isPropertyAccessExpression(callee)
          ? callee.name.text
          : null;
      if (name === null || !LOW_LEVEL.has(name)) return;
      found.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `signs photo links directly (${name})`,
      });
    });
  }
  return found;
}

const domain = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true });
const census = directSigning(domain);
const ALLOWLIST = "scripts/conformance/photo-signing-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  census.map((hit) => hit.file),
);

describe("photo links come from the one signer (DEC-195, D234)", () => {
  it(
    "SIGN-1 every direct signing outside src/server/media/links.ts has a live allowance",
    () => {
      console.log(
        `[SIGN-1] direct signing outside the signer: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(report(census.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("SIGN-2 the census sees a planted direct signing and passes the signer's own entries", () => {
    const dir = "node_modules/.cache/photo-signing";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/ps-bad.ts`;
    const good = `${dir}/ps-good.ts`;
    try {
      writeFileSync(
        bad,
        'import { signPhotoRows } from "@/server/media/links";\nawait signPhotoRows(admin, rows);\n',
      );
      writeFileSync(
        good,
        'import { signPublicPhotos } from "@/server/media/links";\nawait signPublicPhotos(doc.photos);\n',
      );
      expect(report(directSigning([bad, good]))).toBe(
        `${bad}:2 signs photo links directly (signPhotoRows)`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/photo-signing.test.ts
NEW scripts/conformance/photo-signing-allowlist.txt (sha256 671114c80cde19e7fa72dae0554a18a98a3ebf289e343dabf88db957a4e8ed5d):
FILE-BEGIN scripts/conformance/photo-signing-allowlist.txt
# D234 S2 (DEC-195, G54 a): a door that signs photo keys itself, outside src/server/media/links.ts. <path> | <the proof the caller may see the rows> | <until>
src/routes/api/listings/assist.ts | the photo rows are read as the caller (the route's own client; listing_photos' policies) before signPhotoRows | DEC-195
src/routes/api/listings/background.ts | ownership is asserted as the caller (ownListing) before the cover is signed | DEC-195
FILE-END scripts/conformance/photo-signing-allowlist.txt
B1. src/server/media/links.ts, this edit (signPublicPhotos, directly above signPhotoRows):
EDIT src/server/media/links.ts #1
OLD-BEGIN
}

/**
 * Signs every readable variant of the given rows: `{ [photoId]: { [variant]: link } }`.
OLD-END
NEW-BEGIN
}

/**
 * D234 speed turn S2 — THE PHOTOS OF A PUBLIC LISTING DOCUMENT. `public_listing`,
 * read as the caller (the anonymous client), answers only the photos the public
 * policy admits — stripped and not held (`public_listing_json`, the predicate of
 * `listing_photos_public_read`) — so its rows are signed as they stand, with no
 * second read: the ad page's photos in its server HTML, the share image's
 * redirect. At most MAX_LINK_PHOTOS. Every other door reads its rows as the
 * caller first (readAndSignPhotoLinks).
 */
export async function signPublicPhotos(
  photos: readonly { id: string; paths: unknown }[],
  variants: readonly string[] = READ_VARIANTS,
): Promise<Record<string, Record<string, string>>> {
  const rows = photos
    .filter((photo) => photo.id !== "")
    .slice(0, MAX_LINK_PHOTOS)
    .map((photo) => ({ id: photo.id, paths: photo.paths, exif_stripped: true }));
  if (rows.length === 0) return {};
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return signPhotoRows(supabaseAdmin, rows, variants);
}

/**
 * Signs every readable variant of the given rows: `{ [photoId]: { [variant]: link } }`.
NEW-END
src/server/media/links.test.ts, these edits (LK-6; the service client signPublicPhotos imports is a fake with storage only, so a table read would throw):
EDIT src/server/media/links.test.ts #1
OLD-BEGIN
import { describe, expect, it } from "vitest";

OLD-END
NEW-BEGIN
import { describe, expect, it, vi } from "vitest";

NEW-END
EDIT src/server/media/links.test.ts #2
OLD-BEGIN

import { MAX_LINK_PHOTOS, photoIdsOf, signPhotoRows, variantRefs, variantsOf } from "./links";

OLD-END
NEW-BEGIN

import {
  MAX_LINK_PHOTOS,
  photoIdsOf,
  signPhotoRows,
  signPublicPhotos,
  variantRefs,
  variantsOf,
} from "./links";

// D234 S2 — the service client signPublicPhotos signs with: storage only, no table reads.
const admin = vi.hoisted(() => ({ asked: [] as string[][] }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        createSignedUrls: async (keys: string[]) => {
          admin.asked.push(keys);
          return {
            data: keys.map((key) => ({
              path: key,
              signedUrl: `https://signed/${key}`,
              error: null,
            })),
            error: null,
          };
        },
      }),
    },
  },
}));

NEW-END
EDIT src/server/media/links.test.ts #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("LK-6 a public document's photos are signed as they stand, with no row read, at most thirty (D234)", async () => {
    const photos = Array.from({ length: MAX_LINK_PHOTOS + 1 }, (_, index) => ({
      id: `p${index}`,
      paths: { card: { partition: "default", key: `default/u/l/p${index}/card.webp` } },
    }));
    const links = await signPublicPhotos(photos, ["card"]);
    expect(Object.keys(links)).toHaveLength(MAX_LINK_PHOTOS);
    expect(links).toMatchObject({ p0: { card: "https://signed/default/u/l/p0/card.webp" } });
    expect(admin.asked).toHaveLength(1);
    expect(admin.asked[0]).toHaveLength(MAX_LINK_PHOTOS);
    expect(await signPublicPhotos([], ["card"])).toEqual({});
    expect(admin.asked).toHaveLength(1);
  });
});
NEW-END
B2. src/server/ad-page.ts, these edits (the ad answer carries the photo links signed from its own document; a failed or empty signing answers no links and one [ad-links] line, as the feed's coverLinks do):
EDIT src/server/ad-page.ts #1
OLD-BEGIN
import { anonymousClient } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";

export type AdPageAnswer =
  | { kind: "ad"; doc: PublicListingDoc; canonical: string }
  | { kind: "gone" }
  | { kind: "rate" };
OLD-END
NEW-BEGIN
import { anonymousClient } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";
import type { PhotoLinks } from "@/features/posting/photo-links";
import { signPublicPhotos } from "@/server/media/links";

export type AdPageAnswer =
  | { kind: "ad"; doc: PublicListingDoc; canonical: string; photoLinks: PhotoLinks | null }
  | { kind: "gone" }
  | { kind: "rate" };
NEW-END
EDIT src/server/ad-page.ts #2
OLD-BEGIN
    if (data === null) return { kind: "gone" };
    const doc = data as unknown as PublicListingDoc;
    return { kind: "ad", doc, canonical: listingPath(doc.title, doc.public_id) };
  } catch (error) {
    console.error("[ssr-error] /l", errorText(error));
OLD-END
NEW-BEGIN
    if (data === null) return { kind: "gone" };
    const doc = data as unknown as PublicListingDoc;
    return {
      kind: "ad",
      doc,
      canonical: listingPath(doc.title, doc.public_id),
      photoLinks: await signedPhotoLinks(doc),
    };
  } catch (error) {
    console.error("[ssr-error] /l", errorText(error));
NEW-END
EDIT src/server/ad-page.ts #3
OLD-BEGIN
  }
}
OLD-END
NEW-BEGIN
  }
}

/**
 * D234 S2 — the ad's photo links, signed from the page's own public read: the
 * document holds only the photos the public policy admits, so they are signed as
 * they stand (signPublicPhotos, src/server/media/links.ts — no second read). A
 * failed or empty signing never fails the page: the answer carries no links (one
 * [ad-links] line) and the browser asks /api/media/photo-links as before — the
 * feed's `coverLinks` answer the same way (DEC-195, src/routes/api/feed.ts).
 */
async function signedPhotoLinks(doc: PublicListingDoc): Promise<PhotoLinks | null> {
  if (doc.photos.length === 0) return null;
  try {
    const links = await signPublicPhotos(doc.photos);
    if (Object.keys(links).length > 0) return links;
    console.error("[ad-links] /l signing answered no links");
  } catch (error) {
    console.error("[ad-links] /l", errorText(error));
  }
  return null;
}
NEW-END
NEW src/server/ad-page.test.ts (sha256 930531c3d52fe575e3f4c68bcde2e38b740c9914b1996986f45396ef9379a302):
FILE-BEGIN src/server/ad-page.test.ts
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * D234 S2 — the ad page's server read signs the ad's photo links from its own public
 * document (signPublicPhotos: no second read); a failed signing never fails the page.
 */
const { rpc, signPublicPhotos } = vi.hoisted(() => ({
  rpc: vi.fn(),
  signPublicPhotos: vi.fn(),
}));
vi.mock("@/server/supabase/user-client", () => ({ anonymousClient: () => ({ rpc }) }));
vi.mock("@/server/dials", () => ({ spend: async () => ({ allowed: true }) }));
vi.mock("@/server/catalog-find.server", () => ({ clientAddress: () => "203.0.113.9" }));
vi.mock("@/server/media/links", () => ({ signPublicPhotos }));

const { readAdPage } = await import("./ad-page");

const doc = (photos: string[]) => ({
  public_id: "abc2345678",
  title: "A bicycle",
  photos: photos.map((id, index) => ({
    id,
    display_order: index,
    paths: null,
    width: null,
    height: null,
  })),
});
const request = new Request("https://example.test/l/a-bicycle-abc2345678");

afterEach(() => vi.resetAllMocks());

describe("the ad page's server read (D234)", () => {
  it("ADP-1 an ad with photos answers with their signed links", async () => {
    rpc.mockResolvedValue({ data: doc(["p1", "p2"]), error: null });
    const links = { p1: { card: "https://example.test/signed-1" } };
    signPublicPhotos.mockResolvedValue(links);
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind).toBe("ad");
    expect(answer.kind === "ad" ? answer.photoLinks : undefined).toEqual(links);
    expect(signPublicPhotos).toHaveBeenCalledWith(doc(["p1", "p2"]).photos);
  });

  it("ADP-2 a failed signing answers the ad without links and one [ad-links] line", async () => {
    rpc.mockResolvedValue({ data: doc(["p1"]), error: null });
    signPublicPhotos.mockRejectedValue(new Error("sign failed"));
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind === "ad" ? answer.photoLinks : "not an ad").toBeNull();
    expect(errors).toHaveBeenCalledWith("[ad-links] /l", "sign failed");
    errors.mockRestore();
  });

  it("ADP-3 an ad without photos asks for no signing", async () => {
    rpc.mockResolvedValue({ data: doc([]), error: null });
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind === "ad" ? answer.photoLinks : "not an ad").toBeNull();
    expect(signPublicPhotos).not.toHaveBeenCalled();
  });
});
FILE-END src/server/ad-page.test.ts
B3. src/features/posting/use-photo-links.test.ts, these edits (UPL-4, UPL-5 — land them first, for the red-first run):
EDIT src/features/posting/use-photo-links.test.ts #1
OLD-BEGIN
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readPhotoLinks } from "./use-photo-links";

// The transport is the route client (Foundations turn 14); the tests mock IT —
OLD-END
NEW-BEGIN
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readPhotoLinks, usePhotoLinks } from "./use-photo-links";

// The transport is the route client (Foundations turn 14); the tests mock IT —
NEW-END
EDIT src/features/posting/use-photo-links.test.ts #2
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });
});

/** D234 S2 — links a server read already signed seed the hook: no second request. */
describe("photo links preset by the page's server read", () => {
  const wrapper = () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return ({ children }: { children: ReactNode }) =>
      createElement(QueryClientProvider, { client }, children);
  };

  it("UPL-4 preset links are the answer at once, and nothing is asked", async () => {
    const preset = { photo: { card: "https://example.com/signed.jpg" } };
    const { result } = renderHook(() => usePhotoLinks([{ id: "photo" }], preset), {
      wrapper: wrapper(),
    });
    expect(result.current).toEqual(preset);
    await new Promise((done) => setTimeout(done, 20));
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UPL-5 without a preset the links are asked for, as before", async () => {
    const { result } = renderHook(() => usePhotoLinks([{ id: "photo" }]), { wrapper: wrapper() });
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toEqual(links));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});
NEW-END
src/features/posting/use-photo-links.ts, these edits (the links a server read already signed seed the query):
EDIT src/features/posting/use-photo-links.ts #1
OLD-BEGIN
 * photo as "no photo" (the category's picture), never a broken image.
 */
export function usePhotoLinks(photos: readonly { id: string }[]): PhotoLinks | undefined {
  const ids = [...new Set(photos.map((photo) => photo.id).filter((id) => id !== ""))]
OLD-END
NEW-BEGIN
 * photo as "no photo" (the category's picture), never a broken image.
 *
 * D234 S2 — `preset` is the links a server read already signed (the buyer's ad
 * page signs them with the page's own read, the DEC-195 pattern): they seed the
 * query, so the first photo is in the server's HTML and the browser asks no
 * second request; the same 45 minutes then apply.
 */
export function usePhotoLinks(
  photos: readonly { id: string }[],
  preset: PhotoLinks | null = null,
): PhotoLinks | undefined {
  const ids = [...new Set(photos.map((photo) => photo.id).filter((id) => id !== ""))]
NEW-END
EDIT src/features/posting/use-photo-links.ts #2
OLD-BEGIN
    retry: 2,
  }).data;
OLD-END
NEW-BEGIN
    retry: 2,
    ...(preset === null ? {} : { initialData: preset }),
  }).data;
NEW-END
B4. src/routes/l.$slug.tsx, these edits:
EDIT src/routes/l.$slug.tsx #1
OLD-BEGIN
  const navigate = useNavigate();
  const { doc, canonical } = Route.useLoaderData();
  const countedId = useRef<string | null>(null);
OLD-END
NEW-BEGIN
  const navigate = useNavigate();
  const { doc, canonical, photoLinks } = Route.useLoaderData();
  const countedId = useRef<string | null>(null);
NEW-END
EDIT src/routes/l.$slug.tsx #2
OLD-BEGIN
        {...view}
        share={
OLD-END
NEW-BEGIN
        {...view}
        photoLinks={photoLinks}
        share={
NEW-END
src/features/posting/preview/listing-detail.tsx, these edits (the view carries the server's links; the photo-less picture has priority):
EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { dealLines } from "../deal-lines";
import { galleryPhotos } from "../photo-links";
import { usePhotoLinks } from "../use-photo-links";
OLD-END
NEW-BEGIN
import { dealLines } from "../deal-lines";
import { galleryPhotos, type PhotoLinks } from "../photo-links";
import { usePhotoLinks } from "../use-photo-links";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN
  photos: DraftPhotoRow[];
  /** The nearest ancestor category's picture, shown when there is no photo. */
OLD-END
NEW-BEGIN
  photos: DraftPhotoRow[];
  /**
   * D234 S2 — the photos' links signed with the page's own server read (the buyer's
   * ad page), so the first photo is in the HTML and asks no second request after
   * hydration; absent or null = the links are read in the browser as before.
   */
  photoLinks?: PhotoLinks | null;
  /** The nearest ancestor category's picture, shown when there is no photo. */
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
  // with its card size for the page, its cover for the viewer and its thumb.
  const links = usePhotoLinks(view.photos);
  const images = galleryPhotos(view.photos, links);
OLD-END
NEW-BEGIN
  // with its card size for the page, its cover for the viewer and its thumb.
  const links = usePhotoLinks(view.photos, view.photoLinks ?? null);
  const images = galleryPhotos(view.photos, links);
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #4
OLD-BEGIN
                categoryUrl={view.illustrationUrl}
                photosSoon={view.photosSoon === true}
OLD-END
NEW-BEGIN
                categoryUrl={view.illustrationUrl}
                priority
                photosSoon={view.photosSoon === true}
NEW-END
src/features/posting/preview/photo-gallery.tsx, this edit (the main photo loads at once, first):
EDIT src/features/posting/preview/photo-gallery.tsx #1
OLD-BEGIN
              height={360}
              className="h-full w-full object-contain @min-[32rem]:object-top"
OLD-END
NEW-BEGIN
              height={360}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-contain @min-[32rem]:object-top"
NEW-END
B5. src/server/ad-photo.ts, these edits (the share image signs its cover through signPublicPhotos):
EDIT src/server/ad-photo.ts #1
OLD-BEGIN
import { signPhotoRows } from "@/server/media/links";
OLD-END
NEW-BEGIN
import { signPublicPhotos } from "@/server/media/links";
NEW-END
EDIT src/server/ad-photo.ts #2
OLD-BEGIN
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const links = await signPhotoRows(
    supabaseAdmin,
    [{ id: cover.id, paths: cover.paths, exif_stripped: true }],
    ["card"],
  );
OLD-END
NEW-BEGIN
  // D234 S2 — the document's own photos are signed as they stand (signPublicPhotos).
  const links = await signPublicPhotos([cover], ["card"]);
NEW-END
src/routes/l.photo.test.ts, these edits (the route's test mocks the signer it now calls, and PHR-3 checks what it signs):
EDIT src/routes/l.photo.test.ts #1
OLD-BEGIN
}));
vi.mock("@/server/media/links", () => ({ signPhotoRows: state.sign }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

OLD-END
NEW-BEGIN
}));
vi.mock("@/server/media/links", () => ({ signPublicPhotos: state.sign }));

NEW-END
EDIT src/routes/l.photo.test.ts #2
OLD-BEGIN
  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
});
OLD-END
NEW-BEGIN
  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  // D234 S2 — the document's cover is signed as it stands, its card size only.
  expect(state.sign).toHaveBeenCalledWith([{ id: "p1", paths: {} }], ["card"]);
});
NEW-END
B6. e2e/ad-page.spec.ts, this edit (AP-51 and AP-52, directly before AP-50):
EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN

  test("AP-50 the seller card fills the right column", async ({ page }, testInfo) => {
OLD-END
NEW-BEGIN

  test("AP-51 the first photo is in the server's page at its signed link, loads at once with high priority, and asks no second request (D234)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    await seedPhotos(ad.id);
    const { canonical } = await address(ad);
    const photoLinkPosts: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/media/photo-links") && request.method() === "POST")
        photoLinkPosts.push(request.url());
    });
    // The server's own HTML already names the first photo by its signed link.
    const html = await (await page.request.get(canonical)).text();
    expect(html).toMatch(/\/storage\/v1\/object\/sign\//);
    await gotoReady(page, canonical);
    const main = page.getByTestId("gallery-main").locator("img");
    await expect(main).toHaveAttribute("src", /\/storage\/v1\/object\/sign\//);
    await expect(main).toHaveAttribute("loading", "eager");
    await expect(main).toHaveAttribute("fetchpriority", "high");
    expect(photoLinkPosts).toEqual([]);
  });

  test("AP-52 an ad without photos loads its category picture at once with high priority (D234)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    // The scratch branch's own parent carries the picture (a scratch row, never a real one).
    const pictured = await adminClient()
      .from("categories")
      .update({ image_url: "https://example.invalid/e2e-ad-picture.jpg" })
      .eq("id", seller.parentId);
    expect(pictured.error).toBeNull();
    const ad = await seed(seller, "active");
    await gotoReady(page, (await address(ad)).canonical);
    const box = page.getByTestId("listing-detail-illustration");
    await expect(box).toHaveAttribute("data-picture", "category");
    await expect(box.locator("img")).toHaveAttribute("loading", "eager");
    await expect(box.locator("img")).toHaveAttribute("fetchpriority", "high");
  });

  test("AP-50 the seller card fills the right column", async ({ page }, testInfo) => {
NEW-END

PART C — CATEGORY PICTURES (CONCERN 2).
C1. src/features/admin-categories/category-image-variants.ts, these edits (the card and the thumb are cut as WebP; the name and cache helpers):
EDIT src/features/admin-categories/category-image-variants.ts #1
OLD-BEGIN

function drawWatermarks(
OLD-END
NEW-BEGIN

/**
 * D234 S2 — the card and the thumb are what a buyer's phone downloads (the feed's
 * photo-less cards, the ad page's picture), so they are WebP: a flat illustration
 * at this quality is a fraction of the PNG (the measured card was 138 KB). A
 * browser that cannot encode WebP answers PNG; the caller names the file by the
 * blob's own type. The OG picture stays PNG for the link previews of other sites.
 */
export const PICTURE_WEBP_QUALITY = 0.82;

/**
 * D234 S2 — category pictures are named by version (`card-<genTs>.<ext>`), so a
 * name is never rewritten and may be kept by phones and the CDN for a year; the
 * extension follows the blob's own type (WebP, or PNG from a browser that cannot
 * encode WebP).
 */
export const PICTURE_CACHE_SECONDS = "31536000";

export function pictureExtension(blob: Blob): "webp" | "png" {
  return blob.type === "image/webp" ? "webp" : "png";
}

function toWebp(el: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    el.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("canvas webp encode failed"));
      },
      "image/webp",
      PICTURE_WEBP_QUALITY,
    );
  });
}

function drawWatermarks(
NEW-END
EDIT src/features/admin-categories/category-image-variants.ts #2
OLD-BEGIN

/** Decodes the provider image and cuts the three PNG variants. */
export async function makeVariants(source: Blob): Promise<Variants> {
OLD-END
NEW-BEGIN

/** Decodes the provider image and cuts the three variants: card and thumb WebP (D234), the OG PNG. */
export async function makeVariants(source: Blob): Promise<Variants> {
NEW-END
EDIT src/features/admin-categories/category-image-variants.ts #3
OLD-BEGIN

  const [cardPng, thumbPng, ogPng] = await Promise.all([toPng(card), toPng(thumb), toPng(og)]);
  return { card: cardPng, thumb: thumbPng, og: ogPng };
}
OLD-END
NEW-BEGIN

  const [cardWebp, thumbWebp, ogPng] = await Promise.all([toWebp(card), toWebp(thumb), toPng(og)]);
  return { card: cardWebp, thumb: thumbWebp, og: ogPng };
}
NEW-END
src/features/admin-categories/category-image-variants.test.ts, these edits (CIV-1):
EDIT src/features/admin-categories/category-image-variants.test.ts #1
OLD-BEGIN
  OG_FILL_RATIO,
  OG_HEIGHT,
  OG_WIDTH,
  watermarkCentres,
  WATERMARK_ANGLE,
  WATERMARK_TEXT,
OLD-END
NEW-BEGIN
  OG_FILL_RATIO,
  OG_HEIGHT,
  OG_WIDTH,
  PICTURE_CACHE_SECONDS,
  PICTURE_WEBP_QUALITY,
  pictureExtension,
  watermarkCentres,
  WATERMARK_ANGLE,
  WATERMARK_TEXT,
NEW-END
EDIT src/features/admin-categories/category-image-variants.test.ts #2
OLD-BEGIN
    expect(WATERMARK_ANGLE).toBe(-30);
  });
});
OLD-END
NEW-BEGIN
    expect(WATERMARK_ANGLE).toBe(-30);
  });
});

/** D234 S2 — what a buyer's phone downloads for a category picture. */
describe("category picture files (D234)", () => {
  it("CIV-1 a WebP blob is named .webp and any other .png; a versioned name is kept a year", () => {
    expect(pictureExtension(new Blob([], { type: "image/webp" }))).toBe("webp");
    expect(pictureExtension(new Blob([], { type: "image/png" }))).toBe("png");
    expect(pictureExtension(new Blob([]))).toBe("png");
    expect(PICTURE_CACHE_SECONDS).toBe(String(365 * 24 * 60 * 60));
    expect(PICTURE_WEBP_QUALITY).toBeGreaterThan(0.7);
    expect(PICTURE_WEBP_QUALITY).toBeLessThan(0.95);
  });
});
NEW-END
C2. src/features/admin-categories/category-images-service.ts, these edits (each picture is named by its own type and stored with a one-year cache):
EDIT src/features/admin-categories/category-images-service.ts #1
OLD-BEGIN
  const { makeVariants } = await import("./category-image-variants");
OLD-END
NEW-BEGIN
  const { makeVariants, pictureExtension, PICTURE_CACHE_SECONDS } =
    await import("./category-image-variants");
NEW-END
EDIT src/features/admin-categories/category-images-service.ts #2
OLD-BEGIN
  const names = { card: `card-${genTs}.png`, thumb: `thumb-${genTs}.png`, og: `og-${genTs}.png` };
OLD-END
NEW-BEGIN
  const names = {
    card: `card-${genTs}.${pictureExtension(variants.card)}`,
    thumb: `thumb-${genTs}.${pictureExtension(variants.thumb)}`,
    og: `og-${genTs}.${pictureExtension(variants.og)}`,
  };
NEW-END
EDIT src/features/admin-categories/category-images-service.ts #3
OLD-BEGIN
    const { error } = await storage.upload(path, blob, { contentType: "image/png", upsert: true });
OLD-END
NEW-BEGIN
    // D234 S2 — a versioned name is never rewritten, so phones and the CDN keep it a year.
    const { error } = await storage.upload(path, blob, {
      contentType: blob.type,
      cacheControl: PICTURE_CACHE_SECONDS,
      upsert: true,
    });
NEW-END

PART D — DOCS.
D1. docs/features/performance-strategy.md: a new section at the end, "## 8. The first picture (D234, Foundations turn 25)": a public page's largest first picture is named in its server HTML and asked for first — the feed's first cards (DEC-195), now the ad page: its photos signed from its own document (signPublicPhotos) and handed to usePhotoLinks as the preset, the gallery's main photo and the photo-less picture at high priority; why it matters on the lab's phone (the baseline's 6.0 s LCP element; one request less after hydration); category pictures WebP under versioned names cached a year; the stored PNGs left under INC-900.
D2. docs/features/ci-guards.md: a new section at the end, "## D234 — one signer for photo links (Foundations turn 25)": SIGN-1/SIGN-2, what they read (every call of signPhotoRows or readLinks outside src/server/media/links.ts and storage.ts) and the allowlist's two lines.
D3. docs/governance/mechanisms.md: two NEW rows directly after row 42 (the row that begins "| 42 | Below-the-fold work on a public page"), exactly these lines:
   | 43 | A photo's link is signed by the one signer, for rows the caller could read (DEC-195) | `src/server/media/links.ts` — `readAndSignPhotoLinks` (the rows read as the caller, then signed) and `signPublicPhotos` (a public document's own photos, already filtered by the public read policy's predicate) | `scripts/conformance/photo-signing.test.ts` (SIGN-1, SIGN-2) | `scripts/conformance/photo-signing-allowlist.txt` (assist.ts, background.ts: each signs after its own caller-scoped proof) | a new door is one call of either signer, or an allowlist line naming its proof | Foundations turn 25 |
   | 44 | A public page's largest first picture is named in the server's HTML and asked for first (D234) | the answer's own links (DEC-195: the feed's `coverLinks`; the ad page's `photoLinks` through `usePhotoLinks`' preset) + `ListingPicture`'s `priority` and the gallery's main image | AP-49, AP-51, AP-52 (no census: guard debt) | the similar ads, below the fold (DEC-195) | a new public page with a hero picture passes its links and its priority the same way | Foundations turn 25 |
D4. docs/_changelog.md one entry "Foundations turn 25 (2026-10-25)"; roadmap.md the turn-25 line `[x]` with the final HEAD and the unit totals.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
2c09a270d21108dd51a008a7fcf59589be015c6c99da1208a645b07d94c86656  src/components/shell/date-field.test.tsx
8762c8fd98463c15317337ae60116d1ade97cb57c92f02dbfd53374abe9e8533  src/server/media/links.ts
e52dceb0368a160eb5407a3ac3b1949cb3eecfbfbadb53ec35bb371561c1d29e  src/server/media/links.test.ts
1455d04cfed46589e7802962e0fae7d5d57b3697e07d0b0fd0cd6541f71eec51  src/server/ad-page.ts
2c0a1d07c556a434f4858868c4ac44190e81d44e71ad310bbf44139951dc8de7  src/features/posting/use-photo-links.test.ts
8ce6acfa6bd4724d22c1b87c8a1cdfce3134d205c878172fa155cfaa410de641  src/features/posting/use-photo-links.ts
bd8589e1d3cdc02ed88c842c1ed1cd6de7eb848f0dba6490b07d9cdd68224c50  src/routes/l.$slug.tsx
fe7cfeeb146950b9b4bfaa174c023d5eaa1723b0cbfdb9df49db690961dedfa7  src/features/posting/preview/listing-detail.tsx
41c5c799c1deb6454f3aae2a8e7526ede28a34893231b02695e194025e0aefec  src/features/posting/preview/photo-gallery.tsx
951b41ab89596e8ec517530819726feeb70bd7d9eb7746d88ef26a33ff6aac79  src/server/ad-photo.ts
86c4fdbe6b6313891fde5da1b9ae59bbddc725b8d960fcfab6d8f553dafeaa21  src/routes/l.photo.test.ts
fa7805a8b80b8a0961eb990076c7bb6e0d023221b5849b557ec5f90d0ae0a911  e2e/ad-page.spec.ts
349ed8ad53f0101a6a2f5f1f775ae74abe3a6b7229e23996ceeff39f8f74d862  src/features/admin-categories/category-image-variants.ts
be2555c41b3a9b165a34acef7d9d75f2078dd2cc6d6bb37fbd125e9101b53e16  src/features/admin-categories/category-image-variants.test.ts
aab7b297db44f4c4eea0740b8eae1f3ca2fb5641bcda742d4d5d01f6a31de3e1  src/features/admin-categories/category-images-service.ts
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — unchanged); `bun run test:unit` (paste totals and the SIGN-, LK-, ADP-, UPL-, PHR- and CIV- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- <spec file> --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/ad-page.spec.ts by `--grep "AP-9 |AP-19 |AP-49 |AP-51 |AP-52 "` (the photo page, the share image, the feed's links, the two new tests); e2e/admin-categories-images.spec.ts by `--grep "CI-4 "` (the dialog generates and stores a picture, now WebP); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-25.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; the red-first lines for SIGN-1 and UPL-4; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```

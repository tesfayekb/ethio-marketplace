STOP — investigation-photos question 1: the published site is ethio-prod, and these rules forbid me from reaching it
DONE: orient, record (brief saved, sha256 4338996298576073a4f6db607239a35f38634f53703876a41b73f3676935f6de equal to the stated value; roadmap line 3), the census (below), the repository-build half of question 2 (three production builds compared)
LEFT: question 1 (the published site's measurements), the screen half of question 2, questions 3–5 as findings, the report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `6457836f3ed9d73fcb74a60866fb63de907be825` (short `6457836`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T19:06:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43282804733
  (two-step check: SUCCESS, and the reported commit equals the base `6457836f3` = origin/dev = origin/main)
FILES:
docs/governance/briefs/investigation-photos.md
docs/governance/reports/investigation-photos.stop-1.md
roadmap.md

## The conflict

Question 1 asks me to measure the published site "signed in as an ordinary test seller who has ads with photos". The published site runs on ethio-prod (`docs/governance/system-state.md:69`: "Prod = published site (human testers). Staging = ethio-staging (automated suite only …)"; DEC-146 as quoted in `docs/governance/handoffs/2026-10-10-bundle10-followups-running-record.md:151`: "never against ethio-prod or the published site"). Rule 50 says:

- "You never ask for a secret and never sign in to production or the published site."
- "You never connect to ethio-prod in any way."

Even an anonymous visit to the published site has my browser call ethio-prod's data API, so neither half of question 1 is open to me.

Question 2's screen half (the same screens signed in as a seller with photos, at three commits, against one backend) needs a seller account with photos on ethio-staging. Rule 50: "the only database writes you cause are the browser tests' own scratch rows on ethio-staging (J1, J3), made and removed by the harness". The brief's scope forbids any change under `e2e/`, so I cannot add a measuring spec. Opening ethio-staging's public ad pages by hand is not clean either: an ad page view may write a view row outside the harness. So I did not do that.

## What the census and the builds show so far (no database touched)

1. Both symptoms come from ONE component. A category picture appears in exactly one way: as `ListingPicture`'s fallback when an ad has no drawable photo (`src/features/categories/category-tree.ts:535`, `nearestCategoryPicture`; `imageUrl` has no other reader outside the admin category screens). `ListingPicture` (`src/components/marketplace/listing-picture.tsx:139–255`) draws My listings' pictures (`src/features/my-listings/my-listings-page.tsx:237–253`, an 80 px box `w-20`, `fill crop`, used as the table cell at :552 and the card lead at :705, `cardUntil="xl"` at :702) and every feed card (`src/components/marketplace/listing-card.tsx:126`). The ad page's large photo is `PhotoGallery` (`src/features/posting/preview/photo-gallery.tsx:128–262`), whose layout is container queries (`@container`, `@min-[32rem]:…`).
2. The picture's size depends on container units. For a category picture or an uncropped photo, the frame is `{ aspectRatio, width: min(100cqw, ${75 * ratio}cqw) }` (`listing-picture.tsx:188–191`); `cqw` resolves against the nearest ancestor with `container-type` (the outer box's `@container`, :195). Where no such ancestor applies, `cqw` falls back to the viewport, so the frame grows with the screen's width. That is a mechanism that would show only at large widths. This is a HYPOTHESIS to test on the published site, not a finding.
3. The repository's build did not change across the bundles. The production builds (`bun run build`, the cloudflare preset Lovable publishes) at `2b11a9d29` and `db13e13b7` emit a byte-identical stylesheet (`styles-rjco4YkJ.css`; `cmp` equal). At `6457836f3` (`styles-AbgqDMlm.css`) the only differences are classes of code that PR #35 deleted: `.my-0\.5`, `.aspect-video`, `.w-1`, `.rounded-\[2px\]`, `.border-\[1\.5px\]`, `.border-\(--color-border\)`, `.border-border\/50`, `.bg-\(--color-bg\)`, `.shadow-xl`, the recharts selectors and `[&>svg]:h-2.5/h-3/w-2.5/w-3`, plus the `--aspect-video` token. Every class the picture code uses is present in the base build: `.\@container{container-type:inline-size}`, `.aspect-4\/3,.aspect-\[4\/3\]{aspect-ratio:4/3}`, `.max-w-80`, `.object-contain`, `.object-cover`, `.bg-photo-empty`. `src/styles.css` is unchanged from `2b11a9d29` to `6457836f3`.
4. The picture code did not change in either bundle. From `2b11a9d29` to `6457836f3`, `my-listings-page.tsx`, `my-listing-page.tsx` and `photo-gallery.tsx` changed only in import lines (`git diff 2b11a9d29 6457836f3`); `listing-picture.tsx` last changed in `45686917b` (2026-11-01); `photo-links.ts`, `use-photo-links.ts` and `category-tree.ts` have no commit in the range. No image address passes through `safeHref` or `siteHref`: their consumers are the maps, share, contact, legal and canonical links only (`rg 'safeHref|siteHref' src`).
5. So, from the repository alone: if the defect is in the repository's code, it predates `2b11a9d29` and the housekeeping bundles did not cause it. Otherwise it is in the data (the stored photos and category images on ethio-prod) or in what the published build serves. Only the published site can tell which.

## The question

Which path do you rule? Each one keeps rule 50 as written unless the ruling amends it.

(a) The operator measures the published site, following the INC-592 precedent ("the operator's browser Network read"). He opens each screen at 1280, 1024 and 360 wide (DevTools device toolbar), runs the read-only snippet below in the Console, and pastes the table plus the Network tab's Img rows (status, type, size) into the chat. I then write questions 1, 3, 4 and 5 from his measurements and the repository. The snippet prints no token: it drops each address's query string and last path segment.

```js
(() => {
    const entries = new Map(
        performance.getEntriesByType("resource").map((e) => [e.name, e]),
    );
    const css_files = [...document.styleSheets].map(
        (s) => (s.href ?? "inline").split("/").pop(),
    );
    const has_container_rule = [...document.styleSheets].some((s) => {
        try {
            return [...s.cssRules].some((r) =>
                r.cssText.includes("container-type: inline-size"),
            );
        } catch {
            return false;
        }
    });
    const rows = [...document.querySelectorAll("img")].map((img) => {
        const url = new URL(img.currentSrc || img.src, location.href);
        const entry = entries.get(img.currentSrc || img.src);
        const drawn = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        const frame = img.parentElement;
        const box = img.closest("[data-picture]");
        return {
            test_id: img.dataset.testid ?? "",
            src: url.origin + url.pathname.replace(/[^/]+$/, "…"),
            natural: `${img.naturalWidth}x${img.naturalHeight}`,
            drawn: `${Math.round(drawn.width)}x${Math.round(drawn.height)}`,
            object_fit: style.objectFit,
            frame_style: frame ? frame.getAttribute("style") ?? "" : "",
            frame_px: frame
                ? `${Math.round(frame.getBoundingClientRect().width)}`
                : "",
            box_px: box ? `${Math.round(box.getBoundingClientRect().width)}` : "",
            box_container: box ? getComputedStyle(box).containerType : "",
            status: entry?.responseStatus ?? "",
            bytes: entry?.encodedBodySize ?? "",
        };
    });
    console.log({ width: innerWidth, css_files, has_container_rule });
    console.table(rows);
})();
```

`css_files` decides the platform question by itself. The repository's build at `6457836f3` names its stylesheet `styles-AbgqDMlm.css`; a different name on the published site means Lovable served a build other than the repository's. `box_container` and `frame_px` against `box_px` test the container-unit hypothesis in point 2.

(b) A ruling that amends rule 50 for this one turn, letting me open the published site's public pages anonymously (an ad page with photos, the home feed). Signed-in screens would still be out (My listings, the post wizard).

(c) For question 2's screen half: a ruling that widens the scope to one temporary measuring spec under `e2e/`, run through `bun run e2e:local` against ethio-staging at the three commits. The harness would make and remove a seller with photos and record the same table as the snippet.

Scratch, the operator's to remove: `/tmp/ethio-scratch/investigation-photos/` (the trees at `2b11a9d29` and `db13e13b7` built by `git show` from `git diff --name-only`, each copy proven equal for `src/`, `vite.config.ts` and `package.json`; the three build logs; the three stylesheets). The repository's own `dist/` was rebuilt at the base (build output, ignored).

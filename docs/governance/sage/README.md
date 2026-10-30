<!-- Imported 2026-10-30 (turn P0) from the designer's bundle "ethio-sage-files"; no word below is changed. The boards it lists (boards/*.dc.html, about 420 KB of canvas files) are not in the repository: they stay on the canvas "ethio.com — Sage 3D design", and the spec (sage-3d-style-change-spec.md, turn P1) and sage-tokens.css carry their values. -->

# ethio.com — Sage 3D design files

Spec: "ethio.com — Sage 3D style change spec" (shared doc, sections 1–14). Canvas: "ethio.com — Sage 3D design", page "Sage 3D — agreed design".

Rule for every page: placement and structure stay exactly as live; only colour, shadow, radius and type change, plus the mini flag, the satin status ribbon and the tier tag.

| File | What it is |
| --- | --- |
| sage-tokens.css | Every new token: light set in :root, Sage dark set in .dark; paid-card rule (data-tier); ribbon palettes; Premium ad-page accents; menu and dialog shadows. Convert colours to oklch before merging into src/styles.css. |
| tier-tab-premium.svg | Premium mini flag: white, gold border, two gold stars (400×300 picture units). |
| tier-tab-featured.svg | Featured mini flag: white, green border, one green star. |
| status-ribbon-pearl.svg | Satin status ribbon for a regular ad, light mode. |
| status-ribbon-pearl-dark.svg | Same, dark mode (softer pearl). |
| status-ribbon-gold.svg | Satin status ribbon for a Premium ad (both modes). |
| status-ribbon-sage.svg | Satin status ribbon for a Featured ad (both modes). |
| boards/SageRefined.dc.html | Home, desktop 1440. |
| boards/SageTablet.dc.html | Home, tablet 834. |
| boards/SagePhone.dc.html | Home, phone 390 (compact category strip, bottom bar). |
| boards/SageDark.dc.html | Home, desktop 1440, dark mode. |
| boards/DetailPremiumTitle.dc.html | Ad page, Premium, desktop 1440: title box tinted, gold frames, gold accents in the ad body. |
| boards/DetailFeaturedTitle.dc.html | Ad page, Featured, desktop 1440. |
| boards/DetailPhone.dc.html | Ad page, Premium, phone 390. |
| boards/DetailPremiumTitleDark.dc.html | Ad page, Premium, dark mode. |
| boards/DetailFeaturedTitleDark.dc.html | Ad page, Featured, dark mode. |
| boards/Overlays.dc.html | Language and location dropdowns, Report and Share dialogs, light and dark. |
| boards/RibbonTiers.dc.html | Ribbon colour by card type, light and dark, enlarged and real size. |

The board files are design references: open them on the canvas (they need the canvas runtime) or read them for exact values. Sample listings, words in sample data and photos are not part of the change.

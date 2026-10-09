# Bundle 9 — cut-names census (Part C2m)

Accepted census at `a2b46f66`, source lines from `2d5c4d85`. Turn-15 ruling narrows C2m.2 to 20 class-A lines outside admin/dev paths; the unused sidebar's two rows are class B. Total: 59 A, 6 B, 2 excluded, 67 matches. Admin/dev class-A rows are deferred to Part D shared table/card blocks.

## C2m.0(a): full census

Class A is conservative: no provable five-grapheme floor. Maximum widths are not minimum widths. Primary/secondary DataTable cells also render in the mobile card twin without their desktop column width. Detail cells are desktop-only (hidden below lg), listed as B under the brief's desktop-column exception. No browser measurements are claimed. app-header:255 is A, not B: md-only plus max-w-[10rem] does not establish a minimum width.

| File:line | Cuts | Class | Width reason |
|---|---|---|---|
| `src/routes/admin.roles.tsx:14` | Roles heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/routes/settings.tsx:325` | Display name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/routes/settings.tsx:329` | Email | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/routes/settings.tsx:336` | Device-language value | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/routes/dev.primitives.tsx:59` | Fixture prose; not a CSS class | Excluded | No runtime truncation. |
| `src/routes/dev.primitives.tsx:166` | Fixture name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/routes/dev.primitives.tsx:188` | Fixture description | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/components/ui/sidebar.tsx:504` | Menu-button child label | B | Unused: imported by no file (turn-15 ruling); no runtime cut label. |
| `src/components/ui/sidebar.tsx:706` | Submenu-button child label | B | Unused: imported by no file (turn-15 ruling); no runtime cut label. |
| `src/features/posting/wizard.tsx:744` | Reachable step name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/posting/wizard.tsx:749` | Unreached step name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/routes/admin.users.tsx:23` | Users heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/panel-tabs.tsx:59` | Panel label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/panel-header.tsx:45` | Single-panel heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/panel-header.tsx:62` | Panel switcher label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/panel-header.tsx:80` | Panel menu option | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/location-selector.tsx:84` | Place name / fallback label | A | Known A: 6ch includes padding/arrow, not five name characters (INC-509). |
| `src/components/shell/bottom-bar.tsx:52` | Destination label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/posting/step-category.tsx:253` | Used-before chip name | A | Known A: shrinking chip capped at 45%, with no name floor. |
| `src/components/shell/data-table.tsx:30` | Comment; not a CSS class | Excluded | No runtime truncation. |
| `src/components/language-switcher.tsx:97` | Language menu option name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/marketplace/listing-card.tsx:81` | Listing title | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/marketplace/listing-card.tsx:106` | Location name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/app-rail.tsx:185` | Navigation label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/app-rail.tsx:601` | Sign-out label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/components/shell/app-rail.tsx:729` | Drawer identity | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/posting/phone-number-field.tsx:311` | Dial-code country name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin-categories/categories-page.tsx:410` | Category name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin-categories/categories-page.tsx:418` | Category slug | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/components/shell/app-header.tsx:255` | Account display name | A | max-w-[10rem] is only a cap; md:inline is not a width floor. |
| `src/features/admin/impersonation/impersonation-view.tsx:70` | Listing title | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/impersonation/impersonation-view.tsx:116` | Page heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/users/users-list.tsx:91` | User display name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/users/user-detail.tsx:72` | Loading/error heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/users/user-detail.tsx:119` | User display name heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/users/user-detail.tsx:371` | Activity metadata JSON | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/users/user-detail.tsx:567` | Identity field value | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/roles/roles-list.tsx:36` | Role name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/roles/roles-list.tsx:47` | Role display name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/data-scope.tsx:274` | Entity label | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/data-scope.tsx:287` | Entity identifier | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/data-scope.tsx:302` | Entity type | B | Detail column, lg-only, 14% desktop table width. |
| `src/features/admin/translations/data-scope.tsx:313` | Source value | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/data-scope.tsx:326` | Translated value | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/strings-page.tsx:230` | Language strings heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/translations/strings-page.tsx:502` | String key | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/strings-page.tsx:513` | Source value | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/strings-page.tsx:526` | Translated value | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/strings-page.tsx:563` | Provenance | B | Detail column, lg-only desktop column width. |
| `src/features/admin/audit/audit-page.tsx:137` | Event time | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/audit/audit-page.tsx:148` | Actor name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/audit/audit-page.tsx:180` | Metadata JSON | B | Detail column, lg-only, 20% desktop table width. |
| `src/features/admin/audit/audit-page.tsx:191` | Audit heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/audit/audit-page.tsx:237` | Chart tick label | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/translations/language-picker.tsx:86` | Language name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/section-page.tsx:21` | Section heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin-attributes/attribute-dialogs.tsx:711` | Merge-source attribute name/key/usage | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin-attributes/category-attributes-dialog.tsx:241` | Linked attribute name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin-attributes/category-attributes-dialog.tsx:374` | Inherited attribute name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin-attributes/attributes-page.tsx:242` | Attribute name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin-attributes/attributes-page.tsx:247` | Attribute key | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin-attributes/attributes-page.tsx:255` | Inherited badge label | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin-attributes/attributes-page.tsx:352` | Used-by category name | A | Primary/secondary card-twin content; desktop column width is not a mobile floor. |
| `src/features/admin/translations/languages-page.tsx:105` | Translations heading | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |
| `src/features/admin/translations/languages-page.tsx:297` | Native language name | A | Native-name flex item shares card/column space with code and badges; no minimum. |
| `src/features/admin/translations/languages-page.tsx:320` | English language name | B | Detail column, lg-only desktop table; English-name width capped at 7rem. |
| `src/features/admin/translations/languages-page.tsx:821` | Country name | A | No explicit five-character minimum; flex/grid or min-w-0 ancestor permits compression. |

## C2m.0(b): test reads and search findings

Search covered test IDs, accessible names, and translation keys in E2E and unit sources. References below distinguish direct text/box reads from nearby assertions. A container-only assertion does not prove the cut span was read.

| Class-A source | Direct text/box reads; nearby coverage |
|---|---|
| `src/features/posting/step-category.tsx:253` | `e2e/post-wizard-recent.spec.ts:78–98,133`: chip IDs/data-category, title/full names, chip bounding boxes and row/label geometry; label key `post.category.recentLabel` at :83. :48 defines chip locator. `post-wizard-category.spec.ts:174,199,222` concerns different category-chip elements, not this recent chip. |
| `src/components/shell/location-selector.tsx:84` | `e2e/shell.spec.ts:2242–2250`: accessible names (`location.region`, `location.city`) and title; location IDs/boxes read in :256–319, :2152–2199, :2234–2312, :2418–2526, :2585, :2662–2668, :2721–2763. Row labels/geometry: :338–339, :2256–2268; keys `location.rowLabel` and `location.rowLabelShort`. `location-selector-order.test.tsx:74,91,98` renders/order-checks only. |
| `src/components/shell/panel-header.tsx:45,62` | `e2e/shell.spec.ts:1430,1445–1455,1528` reads panel title/name/geometry; `e2e/auth-signout.spec.ts:82` checks `panel.marketplace` title. |
| `src/components/shell/panel-header.tsx:80` | `e2e/shell.spec.ts:1451` clicks option-account; no direct option text/box assertion found. |
| `src/components/shell/app-rail.tsx:729` | `e2e/shell.spec.ts:1285–1287` reads nonempty drawer-identity text; :1498 reads viewport containment. |
| `src/components/language-switcher.tsx:97` | `e2e/shell.spec.ts:217–218` locates menu options by accessible names `language.english` / `language.amharic` and checks visibility/click. :215,228,784,1554 read the separate trigger label, not this cut menu span. |
| `src/components/shell/panel-tabs.tsx:59` | `shell.spec.ts:1340` click; `rbac.spec.ts:42,53`, `admin-shell.spec.ts:277` presence/count. No direct span text/box assertion found. |
| `src/components/shell/bottom-bar.tsx:52` | `shell.spec.ts:878–879` checks neighboring pill count. No direct label text/box assertion found. |
| `src/components/shell/app-rail.tsx:185,601` | No direct cut-label text/box assertion identified. |
| `src/components/shell/app-header.tsx:255` | No direct span text/box assertion identified; account-menu-identity is a separate element. |
| `src/components/marketplace/listing-card.tsx:81,106` | No direct title/location read identified; `post-wizard-pricing.spec.ts:458` uses price sub-element. |
| `src/components/ui/sidebar.tsx:504,706` | Generic unused menu primitives; no direct test match found. |
| `src/features/admin-attributes/attribute-dialogs.tsx:711` | `admin-attributes-library.spec.ts:315`, `admin-attributes-safety.spec.ts:260` click neighboring merge-source checkbox; no direct name read identified. |
| `src/features/admin-attributes/category-attributes-dialog.tsx:241,374` | Tests use link containers/sibling controls; no direct cut-span read identified. |
| `src/features/admin-attributes/attributes-page.tsx:242,247,255,352` | `admin-attributes-library.spec.ts:354,400,491,522,544` used-by visibility/count; no direct cut text read identified. |
| `src/features/admin-categories/categories-page.tsx:410,418` | `admin-categories-console.spec.ts:622,624,650,652` reads different parent-name siblings; no direct name/slug span read identified. |
| `src/features/admin/audit/audit-page.tsx:137,148,191,237` | `admin-audit.spec.ts:93,112–114` reads chart presence and expansion IDs; no direct text/box read of these spans identified. |
| `src/features/admin/impersonation/impersonation-view.tsx:70,116` | `admin-audit.spec.ts:148,173` checks view presence; no direct span read identified. |
| `src/features/admin/roles/roles-list.tsx:36,47`; `src/routes/admin.roles.tsx:14`; `src/features/admin/section-page.tsx:21` | `admin-roles.spec.ts:154,163` section presence/count; no direct heading/row text read identified. |
| `src/features/admin/users/user-detail.tsx:72,119,371,567`; `src/features/admin/users/users-list.tsx:91`; `src/routes/admin.users.tsx:23` | `admin-users.spec.ts:111,232` view/identity-card presence; no direct cut field/heading text read identified, including `user-email`. |
| `src/features/admin/translations/data-scope.tsx:274,287,313,326` | No direct text/box read identified for entity identifiers/source or these spans. |
| `src/features/admin/translations/strings-page.tsx:230,502,513,526` | `admin-translations-console.spec.ts:180,184` approved chip; governance :564–565 orphaned count badge; different elements, no direct cut-span read identified. |
| `src/features/admin/translations/languages-page.tsx:105,297,821` | governance :1274,1283 checks public badges; console :131,238–254 reads source/public-gate siblings; no direct cut-name read identified. |
| `src/features/admin/translations/language-picker.tsx:86` | `admin-translations-console.spec.ts:986` selects add-option by ID; no direct cut text/box read identified. |
| `src/features/posting/phone-number-field.tsx:311` | `post-wizard-bundle2.spec.ts:650–653` option/check visibility; no direct country-name text read identified. |
| `src/features/posting/wizard.tsx:744,749` | `post-wizard-pricing.spec.ts:864` checks step-6 list-item visibility; no direct cut-span text/box read identified. |
| `src/routes/dev.primitives.tsx:166,188` | No direct fixture-span test match identified. |
| `src/routes/settings.tsx:325,329,336` | No direct text/box match identified for display-name/email cut values or settings-device-language. Sign-in assertions concern separate UI. |

## C2m.0(c): complete callers around the two rows

| Row/component | Caller and surrounding flow |
|---|---|
| Used-before row, `src/features/posting/step-category.tsx:222–254` | `StepCategory` defined :117, exported :449. Sole production import `src/features/posting/wizard.tsx:22`. Full body wrapper :1081; step section :1085–1094; conditional step-1 render :1095; full `StepCategory` call :1096–1120. Above it :1060–1078 renders Next/unreachable/blocked messages. Label :226–228; chip :234–254. |
| Location row, `src/components/shell/location-selector.tsx:193–260` | `LocationSelector` defined :100, exported :261. Internal `Picker` function :51–98 holds cut span :84; country call :227–233; deeper-cascade calls :234–249; label spans :200–211. Sole production import `src/components/app-shell.tsx:25`; call :748 inside shell-stack :728–757, following subband/tabs/breadcrumbs :735–743; gating comment :744–747 requires feed route + marketplace panel; main follows :750–756. Test-only dynamic import `location-selector-order.test.tsx:74`, render calls :91,98. |

Cited known line ranges still match. Corrections to investigator output: app-header's maximum is not a floor; drawer identity has a nonempty-text assertion; trigger-language text is not the truncated language-option span; category chip-path is not the recent-chip span. These corrections preserve the accepted full census; the turn-15 ruling replaces the full-census STOP with the 20-line narrowed subset.

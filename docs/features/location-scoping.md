# Feature: location-scoping — the geographic axis of the marketplace

## Status

| Layer                                              | State                                                    |
| -------------------------------------------------- | -------------------------------------------------------- |
| `public.locations` tree (country / region / city)  | LIVE (P2-a)                                              |
| Per-country tree route (ETag, cached)              | LIVE (L1c)                                               |
| Open-markets route (ETag, cached)                  | LIVE (L4b)                                               |
| Shell picker on the cached routes (no table read)  | LIVE (L4b)                                               |
| Visitor's area guessed from the edge               | LIVE, city-level when the edge gives coordinates (L4b-2) |
| Saved area (`ethio_area` cookie, one year)         | LIVE (L4b)                                               |
| Chosen area written into shell state / `useFeed`   | LIVE (accepted, not applied)                             |
| Automatic city → region → country → world widening | NOT BUILT — U7                                           |
| Feed / category / subcategory narrowing by area    | NOT BUILT — U7                                           |

The control exists and cascades over real seeded geography; **choosing an area
does not yet change which listings appear.** That is deliberate and is the
whole content of the pre-launch location-scoping feature described below.

## What L4b landed

**The reads.** The picker no longer touches `public.locations` from the browser.
It reads two cached public routes instead: `GET /api/locations` (the OPEN
markets — `get_open_countries`) and `GET /api/locations/<code>` (that market's
visible tree). Both carry an ETag and `public, max-age=300`, so a repeat costs a
304 or nothing; the browser's default cache is used, never a cache-busting query
parameter. The routes serve `name_en` only — every rendered name still resolves
through the entity bundle first (D3). A failed read renders the translated
caption beside the controls and never a blank picker (C4/F4).

**The guess (L4b-2).** The root's SSR context reads the WHOLE judgement from the
shared judge (`src/server/geo/guess.ts`) — country, region code, city name and
coordinates — and hands it to the shell; no database call was added to the root.
When that country is an OPEN market the shell resolves the guess over the tree it
has already cached (`resolveGuess`): the nearest curated metro within 60 km (a
sub-city only within 8 km), else the region by ISO code, else a city by slugified
name, else the market anchor. The caption names the chosen node — "Showing
listings near {area} — change?" — and a NEW key carries it, because the string's
meaning changed (D3). A closed market, or nothing the edge could say, guesses
nothing: there is no default market. Production stays country-level until the
ethio.com cutover behind the operator's zone (see `geography.md`).

**The saved area.** A pick writes the cookie `ethio_area` as `<CC>:<node id>`
for one year, so the country is known before the tree loads; clearing the
country forgets it. The GUESS IS NEVER WRITTEN (law 10) — only a choice is.

**Sub-city.** The cascade renders one step per level that exists in the data, so
a market with sub-city rows gains a fourth step with no code change (LS-1).

## What A1-R changed (INC-211 + L4b-3)

**The stale tree (INC-211).** `useCountryTree` empties its rows the moment the
country changes and only then fetches, so no consumer ever sees the previous
market's tree under the new country. The shell's "a market picked lands on its
anchor" effect additionally requires the tree in hand to BE that market's tree
(`treeCountry === locationCountry` and non-empty — the tree payload carries no
country field, so the reset is what guarantees it), and the saved-area cookie is
written only then. Picking a second market therefore renders its own region step
with no reload, and the cookie can never name a node of the market just left.

**The auto-select law (L4b-3, operator ruling 2026-09-16).** A level with exactly
ONE option is not a choice: the path extends into it by itself, recursively down
the levels (one region → one city → one sub-city). It is implemented in ONE
place, `autoExtendPath` in `location-data.ts`, applied by the shell's path
derivation over the tree it has already cached — NO fetch was added. The control
still renders that single option, so the resolution stays changeable; the deepest
selected picker names the resolved place (INC-041 — never a second copy of it);
and the guess caption follows the deepest resolved node. Auto-select never writes
the saved-area cookie: only a deliberate pick does (law 10).

Tests: LS-11 (market switch without reload; cookie's node belongs to the picked
market, checked through the service client), LS-12 (a scratch market with one
region and one city resolves to the city, both single options still offered),
LS-13 (a second city stops the walk at the region).

## The model the feature will implement

**Starting area.** On first visit the user's area is resolved from their IP to
the finest level the data supports (city where known, otherwise region,
otherwise country). The resolution is a guess and is recorded as such —
never written into a personal-data field as though the user stated it
(the INC-022 lesson: no fabricated provenance).

**The widening ladder.** The feed asks for listings at the user's finest level
and climbs until it finds a level with enough listings to fill a feed:

```text
city  ->  state/region  ->  country  ->  world
```

It stops at the FIRST level that satisfies the threshold. `world` means all
active listings with no geographic restriction, and is the guaranteed
fallback: a user in Idaho or in Chad, where nothing is posted, sees the world
feed rather than an empty page. The level actually used is shown to the user,
so a widened feed never looks like a local one.

**Manual override.** The location row lets the user pick ANY country, state /
region, city, or sub-city, at any time, overriding the resolved area. The
override is sticky for the session and outranks the ladder (no silent
re-widening under a deliberate choice; if the override yields nothing the user
is told, and offered the next level up).

**Sub-city.** `sub_city` is a FUTURE level of `public.locations`. The picker
renders one level per level that actually exists in the data, so the day
sub-city rows are seeded the control gains a fourth step with no code change.

**The two-dimensional filter.** Location is one axis; the category /
subcategory sidebar is the other. They COMBINE — "Lady shoes × Dire Dawa" is a
single query, not two views — and the combination applies uniformly across the
feed, a category view, and a subcategory view. Breadcrumbs continue to describe
the category axis; the location row describes the geographic one.

## What this task stubbed (and where the seam is)

- `src/components/shell/location-selector.tsx` — reads the live tree and walks
  it as a STRICT cascade: `country -> region -> city -> sub_city`, one picker
  per level, each level's options being the children of the level above's
  selection. A level whose parent is unselected, or which has no rows in the
  data (sub-city today), is not rendered at all. The pickers are the ONLY
  display of the selection — the deepest selected picker IS the chosen area, so
  no area label is echoed anywhere else (INC-041). Contains the comment marking
  everything above as out of scope.
- `src/components/app-shell.tsx` — `locationPath` / `setLocationPath` on the
  shell context: the single place the chosen area lives.
- `src/features/feed/use-feed.ts` — accepts `locationNodeId` alongside
  `categoryId` in the SAME query pass and re-runs when it changes. The
  `.eq("location_id", …)` and the ladder go exactly there. `categoryId` IS
  applied today.
- `src/features/feed/ranking.ts` — `LocationScope` already models the ladder's
  rungs (`city | region | country | world`) and is accepted by `rankListings`.

Nothing else needs to move when the feature lands: the UI, the state, and the
query seam are already in the shape the backend work expects.

# Feature: location-scoping — the geographic axis of the marketplace

## Status

| Layer                                              | State                        |
| -------------------------------------------------- | ---------------------------- |
| `public.locations` tree (country / region / city)  | LIVE (P2-a)                  |
| Shell location row + cascading picker              | LIVE (built-visible)         |
| Chosen area written into shell state / `useFeed`   | LIVE (accepted, not applied) |
| IP resolution of the visitor's starting area       | NOT BUILT — this feature     |
| Automatic city → region → country → world widening | NOT BUILT — this feature     |
| Feed / category / subcategory narrowing by area    | NOT BUILT — this feature     |

The control exists and cascades over real seeded geography; **choosing an area
does not yet change which listings appear.** That is deliberate and is the
whole content of the pre-launch location-scoping feature described below.

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


# Catalog finder

## D37-1 — Index, RPC and route

The catalog finder is the server-side search foundation for later wizard and synonyms-console landings. This landing adds no client UI.

- `pg_trgm` was already enabled; no package or database extension was added.
- `catalog_find_index` and `catalog_find_terms` are private: RLS on, with explicit deny-all policies (SELECT, INSERT, UPDATE, DELETE for `anon` and `authenticated`, `USING (false)` / `WITH CHECK (false)`), so clients read zero rows and cannot write; `service_role` bypasses RLS. Public reads use only the bounded `catalog_find` RPC (E1 corrective, mark `20260924091500`).
- A rebuild indexes published category names and paths, attribute labels, option labels, option aliases and numeric unit forms in each published language. Option terms are attached to every effective listing leaf.
- No write path rebuilds the finder (INC-273). Category, category-link and entity-translation saves only move the catalog version. The first `catalog_find` call that sees a stale index rebuilds it through `catalog_find_refresh`, serialized by `pg_advisory_xact_lock(hashtext('catalog_find_rebuild'))`; callers that waited reuse the finished rebuild. A failed rebuild is logged as a warning, rolled back and the last good index is served. `catalog_find` is therefore VOLATILE.
- `GET /api/catalog/find?q=…&lang=…` accepts 2–64 characters and a 2–3 letter language code. It returns at most eight rows and trims the lowest-ranked rows to stay inside a 2 KB response budget.
- Results cache for 60 seconds by normalized query, language and catalog version. Requests are rate-limited per hashed edge IP through `consume_rate_limit`; the raw address is never stored.
- Exact aliases rank above prefixes and trigram matches. Language-local hits rank before fallback languages; categories rank before identity-fold options, then other options and synonyms. Active listing count breaks remaining leaf ties.

The current rebuild contains 4,911 leaf-bound rows from 3,730 distinct terms across the enabled languages. This is bounded by catalog terms multiplied by published languages and linked leaves; it does not grow with searches or users.

### Performance contract

The RPC returns no more than eight rows and the route trims the lowest-ranked rows until the response fits the 2 KB budget (INC-273); it never fails a search for size. Migration proof profiles the current catalog and confirms the fuzzy candidate pass reads the distinct-term lexicon rather than the larger leaf-bound index.

## Forward scan — U7 marketplace filters

The marketplace landing must consume the returned `leaf_id` plus `matches` attribute key/value pairs as a proposed filter contract. It must revalidate every filter against the selected leaf's effective links and current options before changing a feed query; finder scores are ranking evidence, never authorization or validation authority.

## Operations

`catalog_find_rebuild()` is the administrative repair door. It forces a serialized rebuild. Normal freshness comes from the lazy rebuild on the first stale read; a rebuild never runs inside, or fails, a catalog save. Never wire an index rebuild into a write path.

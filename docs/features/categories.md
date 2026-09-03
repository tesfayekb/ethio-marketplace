# Categories

Status: Category Era in progress (spec: /docs/governance/category-era-spec.md, RATIFIED 2026-09-02).

Model: canonical nodes + pointer tree (REQ-017). One canonical node may appear on multiple browse paths (pointer edges); leaf = no child pointers. Roots are browse containers (allow_listings=false); posting is leaf-only, including catch-alls.

Taxonomy of record: /docs/spec/category-era/c1-target-taxonomy.md (113 nodes = 14 roots + 85 leaves + 14 catch-alls), ratified 2026-09-02, produced from the live WordPress export (DEC-003 item, closed) diffed against the apex donor and current prod seed; full per-row fates in c1-dispositions.csv and c1-current-prod-dispositions.csv beside it. The tree is admin-dynamic; counts are advisory.

Visibility: nodes carry is_active, optional visible_from/visible_until window, and per-country exclusion rows; browse paths require full-path visibility; posting is server-gated on visibility; listing detail pages are never gated. Catch-alls ("Other <Root>", is_catchall) sort last, hide from browse while empty, and always show to posters.

Names: entity_translations is the sole runtime source for category names (D3); name_am columns retire at era gate. Transaction type (sale/rent/lease/hire) is the offer_type attribute, never a category (L1). Brand/make is an attribute, never an entity.

Images: every node carries thumbnail / card 512 / large 1200×630; the card image is the display fallback for photo-less listings (REQ-019). Superseded plans: the pre-rebuild "authoritative WooCommerce import" task is closed by the C1 ratified tree.

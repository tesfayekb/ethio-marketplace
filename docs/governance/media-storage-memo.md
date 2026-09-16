# MEDIA STORAGE — RESEARCH MEMO AND RECOMMENDATION (2026-09-16; DEC-075 candidate)

Question: the lightest, fastest, cheapest way to store and serve listing photos, that can partition by country so Ethiopian data stays in Ethiopia when the platform is licensed there (operator ruling 2026-09-16: single partition at launch; partition on the licensing trigger).

## 1 · The law, read
Proclamation No. 1321/2024 (in force 24 July 2024): every data controller/processor must store **personal data collected or obtained locally on a server or data centre located in Ethiopia**; the Authority (ECA) may designate "critical" data that must also be **processed** in Ethiopia; cross-border transfer needs adequacy or safeguards, and sensitive data needs the Authority's prior approval; controllers must register their processing purposes with the ECA. (Sources: the proclamation text; Mondaq compliance guide 2026; Digital Policy Alert; Haymanot & Advocates Q&A.)
Consequences for us: (a) the Ethiopia partition of REQ-033 is not optional at launch for Ethiopian users' personal data — database and files; (b) a listing photo is personal data whenever it identifies a person or a home, so photos follow the same partition as the listing; (c) whether a CDN cache copy outside Ethiopia counts as a transfer is a counsel question (Q-014) — the design below lets the answer be either.

## 2 · What exists in Ethiopia (in-country hosting)
- **Ethio Telecom Cloud** — IaaS on Ethio Telecom's Tier III-ready data centres (Huawei-built), offering compute and "file, block or object" storage on HDD and SSD tiers. Object storage exists; **S3-API compatibility must be confirmed with them** (Huawei OBS is S3-compatible in general).
- **Wingu.Africa (Ethio ICT Park)** — carrier-neutral Tier III colocation, 10 MW, hosts Ethiopia's first Internet Exchange; Ethio Telecom, Safaricom, Websprix at the meet-me room. Colocation only: we would run our own S3-compatible node (MinIO) and Postgres there.
- **Raxio ET1 (Ethio ICT Park)** — Tier III certified colocation, 800 racks, IFC-backed. Same model as Wingu.
- No hyperscaler region in Ethiopia (AWS/GCP/Azure); the nearest are Cape Town and Johannesburg — **outside the country, so not compliant for the Ethiopia partition**.

## 3 · Global options, measured
| Option | Storage | Egress | Residency | Fit |
|---|---|---|---|---|
| **Cloudflare R2** | $0.015/GB/mo; ops $4.50/M writes, $0.36/M reads; 10 GB free | **$0** | Jurisdiction pins for EU and FedRAMP only; "auto" placement otherwise; US company (CLOUD Act) | Best for the rest-of-world partition: S3 API, zero egress, our app already runs on Cloudflare; not for Ethiopia |
| **Supabase Storage** (today, us-east-1) | Pro: 100 GB included, then $0.021/GB | 250 GB included, then $0.09/GB (cached $0.03/GB); image transforms extra | Region = the project's region; no Ethiopia | Works now (bucket + ownership policies proven); egress is the cost risk for an image-heavy site |
| **Bunny Storage + CDN** | $0.01/GB/region (Johannesburg region exists, $0.005 additional) | CDN delivery: NA/EU $0.005/GB, **Africa $0.06/GB** | EU company; regions incl. Johannesburg; no Ethiopia | Good fallback; Africa delivery is the dear line |
| **AWS S3 af-south-1 / GCP Johannesburg** | ~$0.027/GB | ~$0.15/GB | Africa, not Ethiopia | Expensive egress; no compliance gain |
| **Cloudflare Images** | per image stored/delivered | included | none | Not needed: variants are made on the phone |

## 4 · The speed lever is the edge, not the bucket
Cloudflare serves ethio.com from its Addis Ababa data centre (ADD appears in your DNS analytics). With the zone proxied, public listing images are cached at ADD for Ethiopian visitors whatever the origin bucket's location; a cache hit never touches the origin. So: **residency is decided by the origin bucket; speed by the edge cache.** Whether that edge copy may exist outside Ethiopia is the counsel point in §1(c); Cloudflare can restrict caching for a hostname if the answer is no.

## 5 · Recommendation (DEC-075) — operator ruling 2026-09-16: ONE partition at launch (images included) for as long as the platform operates without an Ethiopian licence (ESTIMATE 1–3 years); the day licensing decides partitioning, the split must be a configuration and a copy, never a redesign. The design below is built for that day and runs single-partition until then.
1. **A storage adapter with partition routing, from U6-B.** One server module owns every media write and every URL: `storage_targets(partition → provider, endpoint, bucket, public_base)`; object keys `<partition>/<user_id>/<listing_id>/<photo_id>/<variant>.<ext>`; the database stores partition + key, never a provider URL; the strip route (B1) is the only writer, with the provider's credentials on the server. Switching a partition's provider is configuration, not code.
2. **Rest-of-world partition → Cloudflare R2** (S3 API from the strip route; public variants behind `img.ethio.com` on your zone with edge caching): the cheapest line on every row, no egress bill for an image-heavy site, no client-side storage policies needed because the server is the only writer. Supabase Storage stays for admin assets (category illustrations) as today.
3. **Ethiopia partition — designed now, stood up on the licensing trigger, not at launch (operator ruling 2026-09-16):** in-country object storage beside an in-country database (Ethio Telecom object storage if its S3 API checks out — a quote and an API test are the first actions when the trigger nears — else MinIO on Wingu/Raxio colocation), served through `img-et.ethio.com` and cached at ADD, caching scope per counsel. Until then every listing and photo lives in the single partition; the split is a copy by predicate (`home_country_code = 'ET'`, keys under `et/`) plus one adapter entry — keys and URLs never change. REQ-033's launch shape is amended accordingly (one partition at launch; the wall on the licensing trigger).
4. **Weight law for media:** three variants made on the phone (cover ≤ 1600 px, card 480 px, thumb 160 px, WebP where supported); the feed shows card variants only; ten photos ≈ 2–3 MB of the seller's data; no server image library on the Worker; no paid transformation service.
5. **Cost model (ESTIMATE):** 10,000 listings × 3 photos × (300 + 45 + 8 KB) ≈ 10.6 GB → R2 ≈ $0.16/month, egress $0; at 100,000 listings ≈ 106 GB → ≈ $1.60/month. Supabase for the same: storage within Pro's 100 GB at first, but egress past 250 GB/month at $0.09/GB is where an image site pays. Ethio Telecom pricing: by quote.

## 6 · Operator items opened by this memo
- Q-014 to counsel: (a) are listing photos personal data for §1's storage rule; (b) does a CDN edge copy outside Ethiopia constitute a transfer; (c) registration with the ECA (purposes) before launch.
- Ethio Telecom Cloud: request object-storage pricing and confirm S3 API compatibility (endpoint, signature v4, bucket policies).
- Cloudflare account: R2 enabled (free tier to start), an API token scoped to one bucket, kept in the Lovable/Supabase secret store per F1.
- Launch gate: the Ethiopia partition (database + storage) moves from the launch gate to a **licensing-trigger checklist** (REQ-033 amended): stand up the in-country pair, run the copy job, flip the adapter and the partition function, verify with the residency proofs — a rehearsal of that copy on staging is the only launch-gate item that remains (proves the split is one configuration and one copy).

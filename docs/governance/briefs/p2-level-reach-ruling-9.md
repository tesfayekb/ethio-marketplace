# P-2 turn (a) — ruling 9 (staging holds all eight files; the types; the paste lesson; continue the turn)

Base: cursor/p2-plan at 32554d24e

````
RULING — P-2 (a), ruling 9: staging holds all eight files; the types; the paste lesson; continue the turn. Base: cursor/p2-plan 32554d24e. Save as docs/governance/briefs/p2-level-reach-ruling-9.md.
**MODEL — Claude Fable 5.1 (High)**

0. STATE: run 41981330085 re-run is SUCCESS on 32554d24e (19 lanes green; preflight green). ethio-staging holds the eight files, marks 20261104200000 … 20261104213000 read back; level_ranks regular 0, featured 1, premium 2; admin_set_listing_tier(uuid,text,text,text,integer); feed_tier_rank gone.

1. TYPES: the attached p2a-types.patch (regenerated from ethio-staging; PostgrestVersion kept "14.5"). Apply with `git apply p2a-types.patch` from the repository root; the resulting src/integrations/supabase/types.ts has sha256 5909de6202fa03f302d078ee485b2947e8255221ea45c758671dfc00bdd6226d — check it, paste the line. Commit it alone ("p2-level-reach: types.ts from ethio-staging (the supervisor's regeneration)").

2. INC-1056 — fbffa284's operator paste into the staging SQL editor failed at proof (b) ("a staff-door fragment occurs 0 times") while every CI lane applied the same file: the proofs strip chr(13) from prosrc but not from their own fragment literals, so a file carried by paste (CRLF) fails a proof CI passes. The ethio-prod applies are operator pastes, so this must not recur. FIX: in every proof of this branch that compares text against prosrc (fbffa284 (b), 0ce62d98 (b), c072fd66 (b) — census the rest), normalise BOTH sides: each fragment and each replacement literal through replace(…, chr(13), '') before it is counted or replaced. Proof text only — no schema statement, mark or grant changes; say so in each file's header (one line). Law 13 in docs/governance/migrations.md (bold): a byte-comparison proof normalises line endings on both sides. CI re-proves the files; staging keeps its applies (the schema is identical).

3. Report correction (ruling 8 §A3): stop-4 §8's ATR-6 lines read :2602 (before) and :2607 (after).

4. CONTINUE TURN (a) as its LEFT line says, against ruling 1 and ruling 2 §4, plan first only where the census finds something the rulings did not foresee:
   a. M-1c — the sweep (extend listing-expiry-sweep's core, DEC-332 heartbeat-only, four counters): a level ended → back to the baseline when the seller has a free slot in the ad's country (seller_regular_live < free_regular_ads), else pause through transition_listing (service); a reach ended → DEC-330 (CONFIRMED by the operator): trim the ad's places back to the market's included reach — the primary place kept, then the seller's places in their saved order up to the included caps — the removed places recorded in the revision row, nothing else of the ad touched; a level ending within 3 days → one seller_notices row (D306), once per end. Every write through transition_listing or a WHERE'd UPDATE (G39 — the sweep runs under pg_cron, but the rule binds every path). The edit doors accept 'paused' (ruling 2 §4) — census the status lists. Laws 11, 12, 13 and CF-SQL-1 hold. The mark above 20261104213000 and at or after the UTC hour of the push (G39's rule). STOP after the push with the pairing line; I apply it on staging through the connector.
   b. After my "continue": the app minimum (typed readers of the new fields through the patched types; setAdminListingTier passes days; the refusal keys EN — post every new key with its English at the stop, the Amharic is mine), CF-TIER-5 (listing-designation.ts, planted bypass, wired), the tests (SWP-, FSL-, the level-door spec under a free prefix — grep-checked), docs, checks, report, PR ready, every check green, END.

Tolerances as before: a red is a STOP when its body or server log touches a path this turn changed; a refusal that leaves a row, a revision, an audit line or a spent dial is a STOP; a reader answering `?? 'regular'` or `?? 'city'` on the new columns is a STOP. --- a/src/integrations/supabase/types.ts	2026-11-05 02:40:08.886749429 -0500
+++ b/src/integrations/supabase/types.ts	2026-11-05 02:40:08.888435255 -0500
@@ -1816,6 +1816,29 @@
           },
         ]
       }
+      level_ranks: {
+        Row: {
+          feed_rank: number
+          key: string
+        }
+        Insert: {
+          feed_rank: number
+          key: string
+        }
+        Update: {
+          feed_rank?: number
+          key?: string
+        }
+        Relationships: [
+          {
+            foreignKeyName: "level_ranks_key_fkey"
+            columns: ["key"]
+            isOneToOne: true
+            referencedRelation: "listing_packages"
+            referencedColumns: ["key"]
+          },
+        ]
+      }
       listing_certifications: {
         Row: {
           action: string
@@ -2003,6 +2026,7 @@
           days: number
           enabled: boolean
           extends_lifetime: boolean
+          is_baseline: boolean
           key: string
           kind: string
           max_photos: number | null
@@ -2021,6 +2045,7 @@
           days: number
           enabled?: boolean
           extends_lifetime?: boolean
+          is_baseline?: boolean
           key: string
           kind: string
           max_photos?: number | null
@@ -2039,6 +2064,7 @@
           days?: number
           enabled?: boolean
           extends_lifetime?: boolean
+          is_baseline?: boolean
           key?: string
           kind?: string
           max_photos?: number | null
@@ -2428,6 +2454,9 @@
           public_id: string
           published_at: string | null
           published_first_at: string | null
+          reach: string | null
+          reach_source: string | null
+          reach_until: string | null
           renewed_at: string | null
           renewed_count: number
           reserved_at: string | null
@@ -2439,6 +2468,8 @@
           status: string
           street_address: string | null
           tier: string
+          tier_source: string | null
+          tier_until: string | null
           title: string
           updated_at: string
           video_url: string | null
@@ -2483,6 +2514,9 @@
           public_id?: string
           published_at?: string | null
           published_first_at?: string | null
+          reach?: string | null
+          reach_source?: string | null
+          reach_until?: string | null
           renewed_at?: string | null
           renewed_count?: number
           reserved_at?: string | null
@@ -2494,6 +2528,8 @@
           status?: string
           street_address?: string | null
           tier?: string
+          tier_source?: string | null
+          tier_until?: string | null
           title: string
           updated_at?: string
           video_url?: string | null
@@ -2538,6 +2574,9 @@
           public_id?: string
           published_at?: string | null
           published_first_at?: string | null
+          reach?: string | null
+          reach_source?: string | null
+          reach_until?: string | null
           renewed_at?: string | null
           renewed_count?: number
           reserved_at?: string | null
@@ -2549,6 +2588,8 @@
           status?: string
           street_address?: string | null
           tier?: string
+          tier_source?: string | null
+          tier_until?: string | null
           title?: string
           updated_at?: string
           video_url?: string | null
@@ -2582,6 +2623,20 @@
             referencedRelation: "shown_locations"
             referencedColumns: ["id"]
           },
+          {
+            foreignKeyName: "listings_reach_fkey"
+            columns: ["reach"]
+            isOneToOne: false
+            referencedRelation: "listing_packages"
+            referencedColumns: ["key"]
+          },
+          {
+            foreignKeyName: "listings_tier_fkey"
+            columns: ["tier"]
+            isOneToOne: false
+            referencedRelation: "listing_packages"
+            referencedColumns: ["key"]
+          },
         ]
       }
       location_import_revisions: {
@@ -5107,6 +5162,7 @@
       }
       admin_set_listing_tier: {
         Args: {
+          p_days?: number
           p_listing_id: string
           p_note?: string
           p_reason: string
@@ -5419,6 +5475,7 @@
         Args: { p_attribute_id: string; p_link_id?: string; p_value?: string }
         Returns: number
       }
+      baseline_level_key: { Args: never; Returns: string }
       begin_impersonation: {
         Args: { p_reason: string; p_target: string }
         Returns: {
@@ -5620,13 +5677,16 @@
         Args: { p_category_ids: string[] }
         Returns: number
       }
+      feed_reindex_enqueue_listings: {
+        Args: { p_listing_ids: string[] }
+        Returns: number
+      }
       feed_reindex_enqueue_places: {
         Args: { p_location_ids: string[] }
         Returns: number
       }
       feed_reindex_sweep: { Args: { p_limit?: number }; Returns: number }
       feed_reindex_wake: { Args: never; Returns: undefined }
-      feed_tier_rank: { Args: { p_tier: string }; Returns: number }
       geo_distance_km: {
         Args: { lat1: number; lat2: number; lng1: number; lng2: number }
         Returns: number
@@ -5925,6 +5985,29 @@
         Returns: number
       }
       mark_sold: { Args: { p_listing_id: string }; Returns: Json }
+      market_settings_for: {
+        Args: { p_country_code: string }
+        Returns: {
+          country_code: string | null
+          created_at: string
+          created_by: string | null
+          free_regular_ads: number
+          id: string
+          included_reach: string
+          launch_credits: number | null
+          launch_days: number | null
+          paid_levels: boolean
+          paid_levels_since: string | null
+          updated_at: string
+          updated_by: string | null
+        }
+        SetofOptions: {
+          from: "*"
+          to: "market_settings"
+          isOneToOne: true
+          isSetofReturn: false
+        }
+      }
       merge_attributes_impl: {
         Args: { p_sources: string[]; p_target: string }
         Returns: Json
@@ -6134,6 +6217,7 @@
         Args: { p_request_country: string; p_user_id: string }
         Returns: string
       }
+      resume_listing: { Args: { p_listing_id: string }; Returns: Json }
       reveal_listing_contact: { Args: { p_public_id: string }; Returns: Json }
       revoke_role: {
         Args: { p_role_name: string; p_target_user: string }
@@ -6168,6 +6252,10 @@
         Args: { p_profile: string }
         Returns: string
       }
+      seller_regular_live: {
+        Args: { p_country_code: string; p_seller: string }
+        Returns: number
+      }
       set_cover_photo: {
         Args: { p_listing_id: string; p_photo_id: string }
         Returns: Json
@@ -6176,6 +6264,10 @@
         Args: { p_codes: string[] }
         Returns: undefined
       }
+      set_listing_level: {
+        Args: { p_level_key: string; p_listing_id: string }
+        Returns: Json
+      }
       set_listing_photos_soon: {
         Args: { p_listing_id: string; p_on: boolean }
         Returns: Json
@@ -6204,6 +6296,10 @@
         }
         Returns: Json
       }
+      set_listing_reach: {
+        Args: { p_listing_id: string; p_reach_key: string }
+        Returns: Json
+      }
       set_listing_reserved: {
         Args: { p_listing_id: string; p_reserved: boolean }
         Returns: Json
````

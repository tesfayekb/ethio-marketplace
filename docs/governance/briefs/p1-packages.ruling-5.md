# P-1 — ruling 5 (stop 2: the generated client types; the overview card)

Saved byte for byte from the operator's paste.

````text
RULING — P-1, stop 2 (the generated client types; the overview card). Base: dev 94249bf8; branch head 137d0956.
**MODEL — Claude Fable 5.1 (High), unchanged.**

1. The generator's text (DEC-320): I ran Supabase's type generator against ethio-staging, which holds M1a, M1b and M1c, and diffed its output against dev's `src/integrations/supabase/types.ts` (the `PostgrestVersion` line kept as the repository has it). The result is the unified diff between the markers below — 174 added lines, nothing removed: the three `coverage_plans` columns in Row/Insert/Update, `listing_packages` and `package_prices` whole (Row, Insert, Update, Relationships), `admin_set_coverage_plan`'s four new Args, `package_price_for`, and the three doors — every entry at the generator's own position. `git apply --check` passes on dev; your branch has not touched the file, so it passes there too.
   Apply it by script, never by retyping: extract the text between the markers (exclusive) to a file outside the repository, e.g. `/tmp/types-p1.patch`, with a trailing newline exactly as between the markers; `sha256sum` must print `833cf8e1a90e323cb7c87586686dbb74318cb079c962ea59b9ae43d9b3619930`; then `git apply --check /tmp/types-p1.patch && git apply /tmp/types-p1.patch`; `git diff --stat` shows `src/integrations/supabase/types.ts | 174 +` and nothing else. Commit it on its own: `p1-packages: client types — the generator's entries from ethio-staging (DEC-320)`. The file stays under `.prettierignore`.
2. `src/features/admin-overview/locations-overview.tsx` joins the scope: the overview card reads `admin.section.plans.*` like the menu and the page, and the old `admin.section.coverage.*` pair is deleted from every layer (a renamed string is a new key; `i18n:usage` regenerated).
3. Then continue: Part B's second half and Part C with the types in place, the rest as ruled.

-----BEGIN types-p1.patch-----
--- a/src/integrations/supabase/types.ts
+++ b/src/integrations/supabase/types.ts
@@ -901,6 +901,9 @@
       coverage_plans: {
         Row: {
           allow_everywhere: boolean
+          default_days: number
+          label_key: string | null
+          max_active_ads: number | null
           max_cities: number
           max_countries: number
           max_photos: number
@@ -911,6 +914,9 @@
         }
         Insert: {
           allow_everywhere?: boolean
+          default_days?: number
+          label_key?: string | null
+          max_active_ads?: number | null
           max_cities: number
           max_countries: number
           max_photos?: number
@@ -921,6 +927,9 @@
         }
         Update: {
           allow_everywhere?: boolean
+          default_days?: number
+          label_key?: string | null
+          max_active_ads?: number | null
           max_cities?: number
           max_countries?: number
           max_photos?: number
@@ -1902,6 +1911,56 @@
             isOneToOne: false
             referencedRelation: "shown_locations"
             referencedColumns: ["id"]
+          },
+        ]
+      }
+      listing_packages: {
+        Row: {
+          created_at: string
+          days: number
+          enabled: boolean
+          extends_lifetime: boolean
+          key: string
+          label_key: string | null
+          self_serve: boolean
+          sort: number
+          tier: string
+          updated_at: string
+          updated_by: string | null
+        }
+        Insert: {
+          created_at?: string
+          days: number
+          enabled?: boolean
+          extends_lifetime?: boolean
+          key: string
+          label_key?: string | null
+          self_serve?: boolean
+          sort?: number
+          tier: string
+          updated_at?: string
+          updated_by?: string | null
+        }
+        Update: {
+          created_at?: string
+          days?: number
+          enabled?: boolean
+          extends_lifetime?: boolean
+          key?: string
+          label_key?: string | null
+          self_serve?: boolean
+          sort?: number
+          tier?: string
+          updated_at?: string
+          updated_by?: string | null
+        }
+        Relationships: [
+          {
+            foreignKeyName: "listing_packages_updated_by_fkey"
+            columns: ["updated_by"]
+            isOneToOne: false
+            referencedRelation: "profiles"
+            referencedColumns: ["user_id"]
           },
         ]
       }
@@ -2690,6 +2749,84 @@
         }
         Relationships: []
       }
+      package_prices: {
+        Row: {
+          amount: number
+          category_id: string | null
+          country_code: string | null
+          created_at: string
+          currency: string
+          id: string
+          package_key: string
+          updated_at: string
+          updated_by: string | null
+          valid_from: string
+          valid_to: string | null
+        }
+        Insert: {
+          amount: number
+          category_id?: string | null
+          country_code?: string | null
+          created_at?: string
+          currency: string
+          id?: string
+          package_key: string
+          updated_at?: string
+          updated_by?: string | null
+          valid_from?: string
+          valid_to?: string | null
+        }
+        Update: {
+          amount?: number
+          category_id?: string | null
+          country_code?: string | null
+          created_at?: string
+          currency?: string
+          id?: string
+          package_key?: string
+          updated_at?: string
+          updated_by?: string | null
+          valid_from?: string
+          valid_to?: string | null
+        }
+        Relationships: [
+          {
+            foreignKeyName: "package_prices_category_id_fkey"
+            columns: ["category_id"]
+            isOneToOne: false
+            referencedRelation: "categories"
+            referencedColumns: ["id"]
+          },
+          {
+            foreignKeyName: "package_prices_country_code_fkey"
+            columns: ["country_code"]
+            isOneToOne: false
+            referencedRelation: "countries"
+            referencedColumns: ["code"]
+          },
+          {
+            foreignKeyName: "package_prices_currency_fkey"
+            columns: ["currency"]
+            isOneToOne: false
+            referencedRelation: "currencies"
+            referencedColumns: ["code"]
+          },
+          {
+            foreignKeyName: "package_prices_package_key_fkey"
+            columns: ["package_key"]
+            isOneToOne: false
+            referencedRelation: "listing_packages"
+            referencedColumns: ["key"]
+          },
+          {
+            foreignKeyName: "package_prices_updated_by_fkey"
+            columns: ["updated_by"]
+            isOneToOne: false
+            referencedRelation: "profiles"
+            referencedColumns: ["user_id"]
+          },
+        ]
+      }
       permissions: {
         Row: {
           action: string
@@ -3922,6 +4059,10 @@
           p_note?: string
           p_reason: string
         }
+        Returns: Json
+      }
+      admin_end_package_price: {
+        Args: { p_id: string; p_valid_to?: string }
         Returns: Json
       }
       admin_entity_translation_stats: {
@@ -4593,6 +4734,31 @@
         }
         Returns: Json
       }
+      admin_save_listing_package: {
+        Args: {
+          p_days: number
+          p_enabled: boolean
+          p_extends_lifetime: boolean
+          p_key: string
+          p_label_key?: string
+          p_self_serve: boolean
+          p_sort?: number
+          p_tier: string
+        }
+        Returns: Json
+      }
+      admin_save_package_price: {
+        Args: {
+          p_amount: number
+          p_category_id?: string
+          p_country_code?: string
+          p_currency: string
+          p_package_key: string
+          p_valid_from?: string
+          p_valid_to?: string
+        }
+        Returns: Json
+      }
       admin_save_translation: {
         Args: { p_key: string; p_lang: string; p_value: string }
         Returns: undefined
@@ -4655,7 +4821,11 @@
       }
       admin_set_coverage_plan: {
         Args: {
+          p_ads_unlimited?: boolean
           p_allow_everywhere: boolean
+          p_default_days?: number
+          p_label_key?: string
+          p_max_active_ads?: number
           p_max_cities: number
           p_max_countries: number
           p_max_photos?: number
@@ -5587,6 +5757,10 @@
       name_unaccent: { Args: { p: string }; Returns: string }
       new_public_id: { Args: never; Returns: string }
       next_language_sort: { Args: never; Returns: number }
+      package_price_for: {
+        Args: { p_listing_id: string; p_package_key: string }
+        Returns: Json
+      }
       peek_rate_limit: {
         Args: {
           p_action: string
-----END types-p1.patch-----
````

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          meta: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          meta?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          meta?: Json
        }
        Relationships: []
      }
      categories: {
        Row: {
          allow_listings: boolean
          created_at: string
          description_am: string | null
          description_en: string | null
          display_order: number
          expiry_days: number | null
          icon: string | null
          id: string
          image_generation_prompt: string | null
          image_thumb_url: string | null
          image_url: string | null
          is_active: boolean
          is_catchall: boolean
          is_restricted: boolean
          name_am: string | null
          name_en: string
          og_image_url: string | null
          price_enabled: boolean
          slug: string
          updated_at: string
          visible_from: string | null
          visible_until: string | null
        }
        Insert: {
          allow_listings?: boolean
          created_at?: string
          description_am?: string | null
          description_en?: string | null
          display_order?: number
          expiry_days?: number | null
          icon?: string | null
          id?: string
          image_generation_prompt?: string | null
          image_thumb_url?: string | null
          image_url?: string | null
          is_active?: boolean
          is_catchall?: boolean
          is_restricted?: boolean
          name_am?: string | null
          name_en: string
          og_image_url?: string | null
          price_enabled?: boolean
          slug: string
          updated_at?: string
          visible_from?: string | null
          visible_until?: string | null
        }
        Update: {
          allow_listings?: boolean
          created_at?: string
          description_am?: string | null
          description_en?: string | null
          display_order?: number
          expiry_days?: number | null
          icon?: string | null
          id?: string
          image_generation_prompt?: string | null
          image_thumb_url?: string | null
          image_url?: string | null
          is_active?: boolean
          is_catchall?: boolean
          is_restricted?: boolean
          name_am?: string | null
          name_en?: string
          og_image_url?: string | null
          price_enabled?: boolean
          slug?: string
          updated_at?: string
          visible_from?: string | null
          visible_until?: string | null
        }
        Relationships: []
      }
      category_attributes: {
        Row: {
          attr_key: string
          attr_type: string
          category_id: string
          created_at: string
          default_value: Json | null
          display_order: number
          help_text_am: string | null
          help_text_en: string | null
          id: string
          inherit_from_parent: boolean
          is_filterable: boolean
          is_required: boolean
          is_searchable: boolean
          name_am: string | null
          name_en: string
          options: Json | null
          updated_at: string
          validation: Json | null
        }
        Insert: {
          attr_key: string
          attr_type: string
          category_id: string
          created_at?: string
          default_value?: Json | null
          display_order?: number
          help_text_am?: string | null
          help_text_en?: string | null
          id?: string
          inherit_from_parent?: boolean
          is_filterable?: boolean
          is_required?: boolean
          is_searchable?: boolean
          name_am?: string | null
          name_en: string
          options?: Json | null
          updated_at?: string
          validation?: Json | null
        }
        Update: {
          attr_key?: string
          attr_type?: string
          category_id?: string
          created_at?: string
          default_value?: Json | null
          display_order?: number
          help_text_am?: string | null
          help_text_en?: string | null
          id?: string
          inherit_from_parent?: boolean
          is_filterable?: boolean
          is_required?: boolean
          is_searchable?: boolean
          name_am?: string | null
          name_en?: string
          options?: Json | null
          updated_at?: string
          validation?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "category_attributes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_country_exclusions: {
        Row: {
          category_id: string
          country_code: string
          created_at: string
          created_by: string
        }
        Insert: {
          category_id: string
          country_code: string
          created_at?: string
          created_by: string
        }
        Update: {
          category_id?: string
          country_code?: string
          created_at?: string
          created_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_country_exclusions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_country_exclusions_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      category_tree_pointers: {
        Row: {
          child_id: string
          created_at: string
          display_order: number
          id: string
          parent_id: string | null
        }
        Insert: {
          child_id: string
          created_at?: string
          display_order?: number
          id?: string
          parent_id?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string
          display_order?: number
          id?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_tree_pointers_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_tree_pointers_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string
          is_active: boolean
          name_en: string
        }
        Insert: {
          code: string
          created_at?: string
          is_active?: boolean
          name_en: string
        }
        Update: {
          code?: string
          created_at?: string
          is_active?: boolean
          name_en?: string
        }
        Relationships: []
      }
      entity_translations: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          entity_id: string
          entity_type: string
          field: string
          flag_note: string | null
          flagged: boolean
          lang_code: string
          machine: boolean
          status: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          field: string
          flag_note?: string | null
          flagged?: boolean
          lang_code: string
          machine?: boolean
          status?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          field?: string
          flag_note?: string | null
          flagged?: boolean
          lang_code?: string
          machine?: boolean
          status?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      impersonation_sessions: {
        Row: {
          actor_id: string
          ended_at: string | null
          ended_reason: string | null
          expires_at: string
          id: string
          reason: string
          started_at: string
          target_id: string
        }
        Insert: {
          actor_id: string
          ended_at?: string | null
          ended_reason?: string | null
          expires_at: string
          id?: string
          reason: string
          started_at?: string
          target_id: string
        }
        Update: {
          actor_id?: string
          ended_at?: string | null
          ended_reason?: string | null
          expires_at?: string
          id?: string
          reason?: string
          started_at?: string
          target_id?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          code: string
          country_codes: string[]
          created_at: string
          enabled_admin: boolean
          enabled_public: boolean
          is_base: boolean
          name_en: string
          name_native: string
          rtl: boolean
          sort: number
          updated_at: string
        }
        Insert: {
          code: string
          country_codes?: string[]
          created_at?: string
          enabled_admin?: boolean
          enabled_public?: boolean
          is_base?: boolean
          name_en: string
          name_native: string
          rtl?: boolean
          sort?: number
          updated_at?: string
        }
        Update: {
          code?: string
          country_codes?: string[]
          created_at?: string
          enabled_admin?: boolean
          enabled_public?: boolean
          is_base?: boolean
          name_en?: string
          name_native?: string
          rtl?: boolean
          sort?: number
          updated_at?: string
        }
        Relationships: []
      }
      listing_locations: {
        Row: {
          created_at: string
          id: string
          lat: number | null
          listing_id: string
          lng: number | null
          location_id: string
          map_visible: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          lat?: number | null
          listing_id: string
          lng?: number | null
          location_id: string
          map_visible?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          lat?: number | null
          listing_id?: string
          lng?: number | null
          location_id?: string
          map_visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "listing_locations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_photos: {
        Row: {
          created_at: string
          display_order: number
          exif_stripped: boolean
          id: string
          listing_id: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          exif_stripped?: boolean
          id?: string
          listing_id: string
          storage_path: string
        }
        Update: {
          created_at?: string
          display_order?: number
          exif_stripped?: boolean
          id?: string
          listing_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_photos_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          attributes: Json
          category_id: string
          created_at: string
          description: string
          expires_at: string | null
          home_country_code: string
          id: string
          location_id: string
          price_amount: number | null
          price_currency: string | null
          price_mode: string
          published_at: string | null
          seller_id: string
          status: string
          tier: string
          title: string
          updated_at: string
        }
        Insert: {
          attributes?: Json
          category_id: string
          created_at?: string
          description: string
          expires_at?: string | null
          home_country_code: string
          id?: string
          location_id: string
          price_amount?: number | null
          price_currency?: string | null
          price_mode?: string
          published_at?: string | null
          seller_id: string
          status?: string
          tier?: string
          title: string
          updated_at?: string
        }
        Update: {
          attributes?: Json
          category_id?: string
          created_at?: string
          description?: string
          expires_at?: string | null
          home_country_code?: string
          id?: string
          location_id?: string
          price_amount?: number | null
          price_currency?: string | null
          price_mode?: string
          published_at?: string | null
          seller_id?: string
          status?: string
          tier?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_home_country_code_fkey"
            columns: ["home_country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "listings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          center_lat: number | null
          center_lng: number | null
          country_code: string
          created_at: string
          id: string
          is_active: boolean
          level: string
          name_am: string | null
          name_en: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          center_lat?: number | null
          center_lng?: number | null
          country_code: string
          created_at?: string
          id?: string
          is_active?: boolean
          level: string
          name_am?: string | null
          name_en: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          center_lat?: number | null
          center_lng?: number | null
          country_code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          level?: string
          name_am?: string | null
          name_en?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "locations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      migration_marks: {
        Row: {
          marked_at: string
          version: string
        }
        Insert: {
          marked_at?: string
          version: string
        }
        Update: {
          marked_at?: string
          version?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          assignable: boolean
          created_at: string
          description: string | null
          id: string
          requires_step_up: boolean
          resource_id: string
        }
        Insert: {
          action: string
          assignable?: boolean
          created_at?: string
          description?: string | null
          id?: string
          requires_step_up?: boolean
          resource_id: string
        }
        Update: {
          action?: string
          assignable?: boolean
          created_at?: string
          description?: string | null
          id?: string
          requires_step_up?: boolean
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string
          avatar_url: string | null
          contact_phone: string | null
          contact_prefs: Json
          contact_telegram: string | null
          contact_whatsapp: boolean
          country_source: string
          created_at: string
          default_post_location_id: string | null
          display_name: string
          home_country_code: string | null
          notification_prefs: Json
          preferred_language: string | null
          seller_alias: string | null
          show_phone: boolean
          show_telegram: boolean
          status_changed_at: string | null
          status_reason: string | null
          updated_at: string
          user_id: string
          viewing_location: Json | null
        }
        Insert: {
          account_status?: string
          avatar_url?: string | null
          contact_phone?: string | null
          contact_prefs?: Json
          contact_telegram?: string | null
          contact_whatsapp?: boolean
          country_source?: string
          created_at?: string
          default_post_location_id?: string | null
          display_name: string
          home_country_code?: string | null
          notification_prefs?: Json
          preferred_language?: string | null
          seller_alias?: string | null
          show_phone?: boolean
          show_telegram?: boolean
          status_changed_at?: string | null
          status_reason?: string | null
          updated_at?: string
          user_id: string
          viewing_location?: Json | null
        }
        Update: {
          account_status?: string
          avatar_url?: string | null
          contact_phone?: string | null
          contact_prefs?: Json
          contact_telegram?: string | null
          contact_whatsapp?: boolean
          country_source?: string
          created_at?: string
          default_post_location_id?: string | null
          display_name?: string
          home_country_code?: string | null
          notification_prefs?: Json
          preferred_language?: string | null
          seller_alias?: string | null
          show_phone?: boolean
          show_telegram?: boolean
          status_changed_at?: string | null
          status_reason?: string | null
          updated_at?: string
          user_id?: string
          viewing_location?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_default_post_location_id_fkey"
            columns: ["default_post_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_home_country_code_fkey"
            columns: ["home_country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "profiles_preferred_language_fkey"
            columns: ["preferred_language"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          description: string | null
          display_name: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          conditions: Json | null
          granted_at: string
          id: string
          is_core: boolean
          permission_id: string
          role_id: string
        }
        Insert: {
          conditions?: Json | null
          granted_at?: string
          id?: string
          is_core?: boolean
          permission_id: string
          role_id: string
        }
        Update: {
          conditions?: Json | null
          granted_at?: string
          id?: string
          is_core?: boolean
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          display_name: string | null
          id: string
          is_system: boolean
          name: string
          parent_role_id: string | null
          priority: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          id?: string
          is_system?: boolean
          name: string
          parent_role_id?: string | null
          priority?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          id?: string
          is_system?: boolean
          name?: string
          parent_role_id?: string | null
          priority?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_parent_role_id_fkey"
            columns: ["parent_role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      translator_languages: {
        Row: {
          created_at: string
          lang_code: string
          user_id: string
        }
        Insert: {
          created_at?: string
          lang_code: string
          user_id: string
        }
        Update: {
          created_at?: string
          lang_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "translator_languages_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      ui_translation_revisions: {
        Row: {
          action: string
          batch_id: string | null
          changed_at: string
          changed_by: string | null
          id: string
          key: string
          lang_code: string
          post_value: string | null
          prev_machine: boolean
          prev_status: string | null
          prev_value: string | null
        }
        Insert: {
          action: string
          batch_id?: string | null
          changed_at?: string
          changed_by?: string | null
          id?: string
          key: string
          lang_code: string
          post_value?: string | null
          prev_machine?: boolean
          prev_status?: string | null
          prev_value?: string | null
        }
        Update: {
          action?: string
          batch_id?: string | null
          changed_at?: string
          changed_by?: string | null
          id?: string
          key?: string
          lang_code?: string
          post_value?: string | null
          prev_machine?: boolean
          prev_status?: string | null
          prev_value?: string | null
        }
        Relationships: []
      }
      ui_translations: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          context: string | null
          created_at: string
          flag_note: string | null
          flagged: boolean
          key: string
          lang_code: string
          machine: boolean
          origin: string
          orphaned: boolean
          status: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          context?: string | null
          created_at?: string
          flag_note?: string | null
          flagged?: boolean
          key: string
          lang_code: string
          machine?: boolean
          origin?: string
          orphaned?: boolean
          status?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          context?: string | null
          created_at?: string
          flag_note?: string | null
          flagged?: boolean
          key?: string
          lang_code?: string
          machine?: boolean
          origin?: string
          orphaned?: boolean
          status?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ui_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      user_directory: {
        Row: {
          account_status: string
          country_source: string
          created_at: string
          handle: string | null
          home_country_code: string | null
          user_id: string
        }
        Insert: {
          account_status?: string
          country_source?: string
          created_at?: string
          handle?: string | null
          home_country_code?: string | null
          user_id: string
        }
        Update: {
          account_status?: string
          country_source?: string
          created_at?: string
          handle?: string | null
          home_country_code?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_directory_home_country_code_fkey"
            columns: ["home_country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string
          id: string
          role_id: string
          scope_country: string | null
          scope_type: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role_id: string
          scope_country?: string | null
          scope_type?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role_id?: string
          scope_country?: string | null
          scope_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_add_category_pointer: {
        Args: { p_child_id: string; p_parent_id: string }
        Returns: string
      }
      admin_approve_all_entity_translations: {
        Args: { p_lang: string }
        Returns: Json
      }
      admin_approve_all_translations: {
        Args: { p_lang: string }
        Returns: Json
      }
      admin_audit_facets: {
        Args: never
        Returns: {
          kind: string
          value: string
        }[]
      }
      admin_audit_stats: {
        Args: { p_days?: number }
        Returns: {
          active_impersonations: number
          count_24h: number
          count_7d: number
          days: Json
          top_actions: Json
        }[]
      }
      admin_create_category: {
        Args: {
          p_allow_listings?: boolean
          p_icon?: string
          p_name_en: string
          p_parent_id?: string
          p_slug?: string
        }
        Returns: string
      }
      admin_create_role: {
        Args: {
          p_description?: string
          p_display_name?: string
          p_name: string
        }
        Returns: string
      }
      admin_delete_category: {
        Args: { p_confirm_slug: string; p_id: string }
        Returns: undefined
      }
      admin_delete_language: { Args: { p_code: string }; Returns: Json }
      admin_delete_role: { Args: { p_role_id: string }; Returns: undefined }
      admin_entity_translation_stats: {
        Args: { p_lang?: string }
        Returns: {
          approved: number
          edited: number
          lang_code: string
          machine_count: number
          total: number
          untranslated: number
        }[]
      }
      admin_get_role: {
        Args: { p_role_id: string }
        Returns: {
          action: string
          assignable: boolean
          description: string
          display_name: string
          granted: boolean
          is_core: boolean
          is_system: boolean
          member_count: number
          name: string
          permission_id: string
          requires_step_up: boolean
          resource: string
          role_id: string
          user_baseline: boolean
        }[]
      }
      admin_get_translator_scope: {
        Args: { p_target: string }
        Returns: {
          eligible: boolean
          languages: string[]
        }[]
      }
      admin_get_user: {
        Args: { p_user_id: string }
        Returns: {
          account_status: string
          contact_whatsapp: boolean
          created_at: string
          display_name: string
          email: string
          home_country_code: string
          last_sign_in_at: string
          roles: string[]
          seller_alias: string
          show_phone: boolean
          show_telegram: boolean
          status_changed_at: string
          status_reason: string
          user_id: string
        }[]
      }
      admin_import_translations: {
        Args: { p_items: Json; p_lang: string }
        Returns: Json
      }
      admin_language_delete_preview: { Args: { p_code: string }; Returns: Json }
      admin_list_audit: {
        Args: {
          p_action?: string
          p_entity_type?: string
          p_from?: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_to?: string
        }
        Returns: {
          action: string
          actor_id: string
          actor_name: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          meta: Json
          total_count: number
        }[]
      }
      admin_list_categories: {
        Args: never
        Returns: {
          allow_listings: boolean
          display_order: number
          excluded_country_codes: string[]
          exclusion_count: number
          expiry_days: number
          has_image: boolean
          icon: string
          id: string
          is_active: boolean
          is_catchall: boolean
          listing_count: number
          name_en: string
          parent_id: string
          price_enabled: boolean
          slug: string
          visible_from: string
          visible_until: string
        }[]
      }
      admin_list_category_pointers: {
        Args: { p_category_id: string }
        Returns: {
          display_order: number
          parent_id: string
          parent_name_en: string
          parent_slug: string
          pointer_id: string
        }[]
      }
      admin_list_entity_translations: {
        Args: {
          p_lang: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_status?: string
        }
        Returns: {
          approved_at: string
          approved_by: string
          entity_id: string
          entity_type: string
          field: string
          flag_note: string
          flagged: boolean
          label: string
          machine: boolean
          source_value: string
          status: string
          total_count: number
          updated_at: string
          updated_by: string
          value: string
        }[]
      }
      admin_list_languages: {
        Args: never
        Returns: {
          code: string
          created_at: string
          enabled_admin: boolean
          enabled_public: boolean
          is_base: boolean
          name_en: string
          name_native: string
          rtl: boolean
          sort: number
          updated_at: string
        }[]
      }
      admin_list_roles: {
        Args: never
        Returns: {
          display_name: string
          is_system: boolean
          name: string
          priority: number
        }[]
      }
      admin_list_roles_detailed: {
        Args: never
        Returns: {
          description: string
          display_name: string
          id: string
          is_system: boolean
          member_count: number
          name: string
          permission_count: number
        }[]
      }
      admin_list_translation_revisions: {
        Args: { p_key: string; p_lang: string; p_limit?: number }
        Returns: {
          action: string
          changed_at: string
          changed_by: string
          changed_by_name: string
          id: string
          prev_machine: boolean
          prev_status: string
          prev_value: string
        }[]
      }
      admin_list_translations: {
        Args: {
          p_flagged?: boolean
          p_lang: string
          p_limit?: number
          p_offset?: number
          p_orphaned?: boolean
          p_search?: string
          p_status?: string
        }
        Returns: {
          approved_at: string
          approved_by: string
          context: string
          flag_note: string
          flagged: boolean
          key: string
          lang_code: string
          machine: boolean
          orphaned: boolean
          source_value: string
          status: string
          total_count: number
          updated_at: string
          updated_by: string
          value: string
        }[]
      }
      admin_list_users: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_role?: string
          p_search?: string
          p_status?: string
        }
        Returns: {
          account_status: string
          created_at: string
          display_name: string
          email: string
          home_country_code: string
          roles: string[]
          total_count: number
          user_id: string
        }[]
      }
      admin_machine_entity_translation: {
        Args: {
          p_field: string
          p_id: string
          p_lang: string
          p_type: string
          p_value: string
        }
        Returns: undefined
      }
      admin_machine_translation: {
        Args: { p_key: string; p_lang: string; p_value: string }
        Returns: undefined
      }
      admin_move_category_pointer: {
        Args: { p_new_parent_id: string; p_pointer_id: string }
        Returns: undefined
      }
      admin_reactivate_category: { Args: { p_id: string }; Returns: undefined }
      admin_remove_category_pointer: {
        Args: { p_pointer_id: string }
        Returns: undefined
      }
      admin_reorder_categories: {
        Args: { p_ordered_child_ids: string[]; p_parent_id: string }
        Returns: undefined
      }
      admin_retire_category: {
        Args: { p_id: string; p_reassign_to: string }
        Returns: undefined
      }
      admin_save_entity_translation: {
        Args: {
          p_field: string
          p_id: string
          p_lang: string
          p_type: string
          p_value: string
        }
        Returns: undefined
      }
      admin_save_translation: {
        Args: { p_key: string; p_lang: string; p_value: string }
        Returns: undefined
      }
      admin_set_account_status: {
        Args: { p_reason?: string; p_status: string; p_user_id: string }
        Returns: undefined
      }
      admin_set_category_window: {
        Args: { p_id: string; p_visible_from: string; p_visible_until: string }
        Returns: undefined
      }
      admin_set_country_exclusions: {
        Args: { p_country_codes: string[]; p_id: string }
        Returns: undefined
      }
      admin_set_entity_translation_status: {
        Args: {
          p_action: string
          p_field: string
          p_id: string
          p_lang: string
          p_type: string
        }
        Returns: undefined
      }
      admin_set_key_context: {
        Args: { p_context: string; p_key: string }
        Returns: undefined
      }
      admin_set_language_flags: {
        Args: {
          p_code: string
          p_enabled_admin: boolean
          p_enabled_public: boolean
        }
        Returns: undefined
      }
      admin_set_language_order: {
        Args: { p_codes: string[] }
        Returns: undefined
      }
      admin_set_role_permission: {
        Args: { p_granted: boolean; p_permission_id: string; p_role_id: string }
        Returns: undefined
      }
      admin_set_translation_status: {
        Args: { p_action: string; p_key: string; p_lang: string }
        Returns: undefined
      }
      admin_set_translator_languages: {
        Args: { p_langs: string[]; p_user: string }
        Returns: undefined
      }
      admin_sync_ui_keys: { Args: { p_am?: Json; p_en: Json }; Returns: Json }
      admin_translation_stats: {
        Args: { p_lang?: string }
        Returns: {
          approved: number
          edited: number
          flagged: number
          lang_code: string
          machine_count: number
          orphaned: number
          reviewable: number
          total: number
          untranslated: number
        }[]
      }
      admin_undo_import: { Args: { p_batch: string }; Returns: Json }
      admin_update_category: {
        Args: {
          p_allow_listings: boolean
          p_display_order: number
          p_expiry_days: number
          p_icon: string
          p_id: string
          p_name_en: string
          p_price_enabled: boolean
        }
        Returns: undefined
      }
      admin_update_profile: {
        Args: {
          p_display_name: string
          p_home_country_code?: string
          p_seller_alias?: string
          p_user_id: string
        }
        Returns: undefined
      }
      admin_update_role: {
        Args: {
          p_description?: string
          p_display_name?: string
          p_role_id: string
        }
        Returns: undefined
      }
      admin_upsert_language: {
        Args: {
          p_code: string
          p_country_codes?: string[]
          p_name_en: string
          p_name_native: string
          p_rtl?: boolean
        }
        Returns: undefined
      }
      admin_user_activity: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          action: string
          actor_id: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          meta: Json
        }[]
      }
      approve_all_entity_translations_impl: {
        Args: { p_lang: string }
        Returns: Json
      }
      approve_all_translations_impl: { Args: { p_lang: string }; Returns: Json }
      assign_role: {
        Args: {
          p_role_name: string
          p_scope_country?: string
          p_target_user: string
        }
        Returns: undefined
      }
      begin_impersonation: {
        Args: { p_reason: string; p_target: string }
        Returns: {
          expires_at: string
          session_id: string
        }[]
      }
      category_slug_candidate: { Args: { p_name: string }; Returns: string }
      confirm_home_country: { Args: { p_country: string }; Returns: undefined }
      e2e_migration_ledger: { Args: never; Returns: string[] }
      end_impersonation: { Args: { p_session: string }; Returns: undefined }
      entity_source_value: {
        Args: { p_field: string; p_id: string; p_type: string }
        Returns: string
      }
      expire_stale_listings: { Args: never; Returns: number }
      get_active_impersonation: {
        Args: never
        Returns: {
          expires_at: string
          id: string
          target_id: string
          target_name: string
        }[]
      }
      get_browse_tree: {
        Args: { p_country_code: string }
        Returns: {
          allow_listings: boolean
          display_order: number
          icon: string
          id: string
          is_catchall: boolean
          parent_id: string
          slug: string
        }[]
      }
      get_category_attributes: {
        Args: { p_category_id: string; p_include_inherited?: boolean }
        Returns: {
          attr_key: string
          attr_type: string
          category_id: string
          category_name: string
          default_value: Json
          display_order: number
          help_text_am: string
          help_text_en: string
          id: string
          inherited_from: string
          inherited_from_name: string
          is_filterable: boolean
          is_required: boolean
          is_searchable: boolean
          name_am: string
          name_en: string
          options: Json
          validation: Json
        }[]
      }
      get_entity_bundle: { Args: { p_lang: string }; Returns: Json }
      get_my_permissions: {
        Args: never
        Returns: {
          permission: string
        }[]
      }
      get_my_translator_languages: {
        Args: never
        Returns: {
          lang_code: string
        }[]
      }
      get_role_hierarchy: { Args: { p_role_id: string }; Returns: string[] }
      get_ui_bundle: { Args: { p_lang: string }; Returns: Json }
      get_ui_bundle_version: { Args: { p_lang: string }; Returns: string }
      has_password: { Args: never; Returns: boolean }
      has_permission: {
        Args: { p_action: string; p_resource: string; p_user_id: string }
        Returns: boolean
      }
      impersonated_get_profile: {
        Args: { p_session: string }
        Returns: {
          account_status: string
          created_at: string
          display_name: string
          home_country_code: string
          seller_alias: string
          target_id: string
        }[]
      }
      impersonated_list_listings: {
        Args: { p_limit?: number; p_offset?: number; p_session: string }
        Returns: {
          created_at: string
          id: string
          price_amount: number
          price_currency: string
          status: string
          title: string
          total_count: number
        }[]
      }
      impersonation_target: { Args: { p_session: string }; Returns: string }
      is_super_admin: { Args: { p_user_id: string }; Returns: boolean }
      log_audit: {
        Args: {
          p_action: string
          p_entity_id: string
          p_entity_type: string
          p_meta: Json
        }
        Returns: undefined
      }
      next_language_sort: { Args: never; Returns: number }
      promote_to_super_admin: {
        Args: { p_target_user: string }
        Returns: undefined
      }
      remove_own_password: { Args: never; Returns: undefined }
      require_step_up_if_needed: {
        Args: { p_action: string; p_resource: string }
        Returns: undefined
      }
      revoke_role: {
        Args: { p_role_name: string; p_target_user: string }
        Returns: undefined
      }
      set_language_order_impl: {
        Args: { p_codes: string[] }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      submit_listing: {
        Args: {
          p_attributes?: Json
          p_category_id: string
          p_description: string
          p_home_country_code: string
          p_listing_id?: string
          p_location_id: string
          p_price_amount?: number
          p_price_currency?: string
          p_price_mode?: string
          p_seller_id: string
          p_status?: string
          p_title: string
        }
        Returns: string
      }
      transition_listing: {
        Args: { p_listing_id: string; p_new_status: string }
        Returns: undefined
      }
      translation_placeholders: { Args: { p_text: string }; Returns: string[] }
      translation_scope_ok: { Args: { p_lang: string }; Returns: boolean }
      ui_sync_mark_orphans: { Args: { p_en: Json }; Returns: Json }
      ui_translation_reviewable: {
        Args: { p_flagged: boolean; p_orphaned: boolean; p_status: string }
        Returns: boolean
      }
      user_has_translation_permission: {
        Args: { p_target: string }
        Returns: boolean
      }
      user_set_preferred_language: { Args: { p_code: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

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
          created_at: string
          display_order: number
          expiry_days: number
          id: string
          is_active: boolean
          is_restricted: boolean
          name_am: string | null
          name_en: string
          price_enabled: boolean
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          expiry_days?: number
          id?: string
          is_active?: boolean
          is_restricted?: boolean
          name_am?: string | null
          name_en: string
          price_enabled?: boolean
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          expiry_days?: number
          id?: string
          is_active?: boolean
          is_restricted?: boolean
          name_am?: string | null
          name_en?: string
          price_enabled?: boolean
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      category_attributes: {
        Row: {
          attr_key: string
          attr_type: string
          category_id: string
          created_at: string
          display_order: number
          id: string
          is_required: boolean
          name_am: string | null
          name_en: string
          options: Json | null
          updated_at: string
        }
        Insert: {
          attr_key: string
          attr_type: string
          category_id: string
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          name_am?: string | null
          name_en: string
          options?: Json | null
          updated_at?: string
        }
        Update: {
          attr_key?: string
          attr_type?: string
          category_id?: string
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          name_am?: string | null
          name_en?: string
          options?: Json | null
          updated_at?: string
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
      permissions: {
        Row: {
          action: string
          created_at: string
          description: string | null
          id: string
          requires_step_up: boolean
          resource_id: string
        }
        Insert: {
          action: string
          created_at?: string
          description?: string | null
          id?: string
          requires_step_up?: boolean
          resource_id: string
        }
        Update: {
          action?: string
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
          avatar_url: string | null
          contact_prefs: Json
          country_source: string
          created_at: string
          display_name: string
          home_country_code: string | null
          notification_prefs: Json
          preferred_language: string
          updated_at: string
          user_id: string
          viewing_location: Json | null
        }
        Insert: {
          avatar_url?: string | null
          contact_prefs?: Json
          country_source?: string
          created_at?: string
          display_name: string
          home_country_code?: string | null
          notification_prefs?: Json
          preferred_language?: string
          updated_at?: string
          user_id: string
          viewing_location?: Json | null
        }
        Update: {
          avatar_url?: string | null
          contact_prefs?: Json
          country_source?: string
          created_at?: string
          display_name?: string
          home_country_code?: string | null
          notification_prefs?: Json
          preferred_language?: string
          updated_at?: string
          user_id?: string
          viewing_location?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_home_country_code_fkey"
            columns: ["home_country_code"]
            isOneToOne: false
            referencedRelation: "countries"
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
      assign_role: {
        Args: {
          p_role_name: string
          p_scope_country?: string
          p_target_user: string
        }
        Returns: undefined
      }
      confirm_home_country: { Args: { p_country: string }; Returns: undefined }
      expire_stale_listings: { Args: never; Returns: number }
      get_my_permissions: {
        Args: never
        Returns: {
          permission: string
        }[]
      }
      get_role_hierarchy: { Args: { p_role_id: string }; Returns: string[] }
      has_password: { Args: never; Returns: boolean }
      has_permission: {
        Args: { p_action: string; p_resource: string; p_user_id: string }
        Returns: boolean
      }
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
      promote_to_super_admin: {
        Args: { p_target_user: string }
        Returns: undefined
      }
      remove_own_password: { Args: never; Returns: undefined }
      revoke_role: {
        Args: { p_role_name: string; p_target_user: string }
        Returns: undefined
      }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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

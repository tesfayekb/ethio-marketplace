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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      confirm_home_country: { Args: { p_country: string }; Returns: undefined }
      has_password: { Args: never; Returns: boolean }
      remove_own_password: { Args: never; Returns: undefined }
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

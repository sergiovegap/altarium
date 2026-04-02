export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      altar_boy_items: {
        Row: {
          altar_boy_id: string
          item_id: string
        }
        Insert: {
          altar_boy_id: string
          item_id: string
        }
        Update: {
          altar_boy_id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "altar_boy_items_altar_boy_id_fkey"
            columns: ["altar_boy_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "altar_boy_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "liturgical_items"
            referencedColumns: ["id"]
          },
        ]
      }
      altar_boy_mass_items: {
        Row: {
          altar_boy_id: string
          id: string
          item_id: string
          mass_id: string
        }
        Insert: {
          altar_boy_id: string
          id?: string
          item_id: string
          mass_id: string
        }
        Update: {
          altar_boy_id?: string
          id?: string
          item_id?: string
          mass_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "altar_boy_mass_items_altar_boy_id_fkey"
            columns: ["altar_boy_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "altar_boy_mass_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "liturgical_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "altar_boy_mass_items_mass_id_altar_boy_id_fkey"
            columns: ["mass_id", "altar_boy_id"]
            isOneToOne: false
            referencedRelation: "altar_boys_masses"
            referencedColumns: ["mass_id", "altar_boy_id"]
          },
          {
            foreignKeyName: "altar_boy_mass_items_mass_id_fkey"
            columns: ["mass_id"]
            isOneToOne: false
            referencedRelation: "masses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "altar_boy_mass_items_mass_id_item_id_fkey"
            columns: ["mass_id", "item_id"]
            isOneToOne: false
            referencedRelation: "mass_items"
            referencedColumns: ["mass_id", "item_id"]
          },
        ]
      }
      altar_boys_masses: {
        Row: {
          altar_boy_id: string
          mass_id: string
        }
        Insert: {
          altar_boy_id: string
          mass_id: string
        }
        Update: {
          altar_boy_id?: string
          mass_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "altar_boys_masses_altar_boy_id_fkey"
            columns: ["altar_boy_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "altar_boys_masses_mass_id_fkey"
            columns: ["mass_id"]
            isOneToOne: false
            referencedRelation: "masses"
            referencedColumns: ["id"]
          },
        ]
      }
      liturgical_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          photo: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          photo?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          photo?: string | null
        }
        Relationships: []
      }
      mass_items: {
        Row: {
          item_id: string
          mass_id: string
          quantity: number | null
        }
        Insert: {
          item_id: string
          mass_id: string
          quantity?: number | null
        }
        Update: {
          item_id?: string
          mass_id?: string
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mass_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "liturgical_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mass_items_mass_id_fkey"
            columns: ["mass_id"]
            isOneToOne: false
            referencedRelation: "masses"
            referencedColumns: ["id"]
          },
        ]
      }
      masses: {
        Row: {
          created_at: string
          day: string
          id: string
          parish_id: string
          priest_id: string | null
          time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day: string
          id?: string
          parish_id: string
          priest_id?: string | null
          time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day?: string
          id?: string
          parish_id?: string
          priest_id?: string | null
          time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "masses_parish_id_fkey"
            columns: ["parish_id"]
            isOneToOne: false
            referencedRelation: "parishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masses_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      parish_mass_schedule: {
        Row: {
          created_at: string
          day: string
          id: string
          parish_id: string
          priest_id: string | null
          time: string
        }
        Insert: {
          created_at?: string
          day: string
          id?: string
          parish_id: string
          priest_id?: string | null
          time: string
        }
        Update: {
          created_at?: string
          day?: string
          id?: string
          parish_id?: string
          priest_id?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "parish_mass_schedule_parish_id_fkey"
            columns: ["parish_id"]
            isOneToOne: false
            referencedRelation: "parishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parish_mass_schedule_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      parishes: {
        Row: {
          address: string
          created_at: string
          id: string
          name: string
          photo: string | null
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          name: string
          photo?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          name?: string
          photo?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      priests: {
        Row: {
          created_at: string
          id: string
          last_name: string
          name: string
          parish_id: string
          photo: string | null
          religious_order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_name: string
          name: string
          parish_id: string
          photo?: string | null
          religious_order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_name?: string
          name?: string
          parish_id?: string
          photo?: string | null
          religious_order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "priests_parish_id_fkey"
            columns: ["parish_id"]
            isOneToOne: false
            referencedRelation: "parishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "priests_religious_order_id_fkey"
            columns: ["religious_order_id"]
            isOneToOne: false
            referencedRelation: "religious_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birthday: string | null
          created_at: string
          email: string
          id: string
          last_name: string
          name: string
          parish_id: string
          photo: string | null
          role: Database["public"]["Enums"]["user_role_type"]
          updated_at: string
        }
        Insert: {
          birthday?: string | null
          created_at?: string
          email: string
          id: string
          last_name: string
          name: string
          parish_id: string
          photo?: string | null
          role: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string
        }
        Update: {
          birthday?: string | null
          created_at?: string
          email?: string
          id?: string
          last_name?: string
          name?: string
          parish_id?: string
          photo?: string | null
          role?: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_parish_id_fkey"
            columns: ["parish_id"]
            isOneToOne: false
            referencedRelation: "parishes"
            referencedColumns: ["id"]
          },
        ]
      }
      religious_orders: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_parish: { Args: never; Returns: string }
      get_user_role: { Args: never; Returns: string }
    }
    Enums: {
      user_role_type: "Ministro Extraordinario" | "Monaguillo"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role_type: ["Ministro Extraordinario", "Monaguillo"],
    },
  },
} as const


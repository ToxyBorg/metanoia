export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
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
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
      all_items: {
        Row: {
          category: Database["public"]["Enums"]["categories"]
          created_at: string | null
          description: string
          item_id: string
          mainImageURL: string
          price: number
          secondaryImagesURLS: string[]
          stock: number | null
          tags: string[]
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["categories"]
          created_at?: string | null
          description: string
          item_id?: string
          mainImageURL: string
          price: number
          secondaryImagesURLS: string[]
          stock?: number | null
          tags: string[]
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["categories"]
          created_at?: string | null
          description?: string
          item_id?: string
          mainImageURL?: string
          price?: number
          secondaryImagesURLS?: string[]
          stock?: number | null
          tags?: string[]
          title?: string
        }
      }
      orders: {
        Row: {
          created_at: string | null
          delivery: Database["public"]["Enums"]["delivery"]
          id: string
          in_person_delivery_info:
            | Database["public"]["CompositeTypes"]["in_person_delivery_info"]
            | null
          items: string[]
          shipping_delivery_info:
            | Database["public"]["CompositeTypes"]["shipping_delivery_info"]
            | null
        }
        Insert: {
          created_at?: string | null
          delivery: Database["public"]["Enums"]["delivery"]
          id: string
          in_person_delivery_info?:
            | Database["public"]["CompositeTypes"]["in_person_delivery_info"]
            | null
          items: string[]
          shipping_delivery_info?:
            | Database["public"]["CompositeTypes"]["shipping_delivery_info"]
            | null
        }
        Update: {
          created_at?: string | null
          delivery?: Database["public"]["Enums"]["delivery"]
          id?: string
          in_person_delivery_info?:
            | Database["public"]["CompositeTypes"]["in_person_delivery_info"]
            | null
          items?: string[]
          shipping_delivery_info?:
            | Database["public"]["CompositeTypes"]["shipping_delivery_info"]
            | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categories: "earrings" | "rings" | "necklaces" | "bracelets"
      delivery: "in-person" | "postal-service"
      payment_method: "cash" | "bank-transfer"
    }
    CompositeTypes: {
      in_person_delivery_info: {
        name: string
        wilaya: string
        street_address: string
        phone: string
        google_maps_link: string
        message: string
        instagram_link: string
      }
      shipping_delivery_info: {
        name: string
        wilaya: string
        street_address: string
        house_number: string
        phone: string
        google_maps_link: string
        message: string
        instagram_link: string
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

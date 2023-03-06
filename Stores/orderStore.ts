import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";

/**             ORDER ITEMS TYPE */
export type OrderData = Database['public']["Tables"]['orders']['Row'][]


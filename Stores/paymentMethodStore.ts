import { atom } from "jotai"
import { Database } from "../services/supabase/lib/database.types"


export type paymentMethodType = Database['public']["Tables"]['orders']['Row']['payment'] | null

export const paymentMethodAtom = atom<paymentMethodType>(null)

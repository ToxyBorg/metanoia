import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";

/**             ORDER ITEMS TYPE */
export type OrderData = Database['public']["Tables"]['orders']['Row'][]

export type OrderItems = Database['public']["Tables"]['orders']['Row']['items']

const orderItemsDataInitAtom = atom<OrderItems>([])

export const orderItemsDataAtom = atom<OrderItems, [data: OrderItems], OrderItems | void>(
    (get) => get(orderItemsDataInitAtom),
    (_get, set, data) => {
        set(orderItemsDataInitAtom, data)
    }
)

/*
type OrderItems = {
    id: string;
    number: number;
    measurements: string;
}[]
*/
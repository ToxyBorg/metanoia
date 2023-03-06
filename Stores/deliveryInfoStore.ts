import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";
// import { SingleItemData } from "./itemDataStore";


// export type deliveryType = {
//     id: Database['public']["Tables"]['orders']['Row']['order_id'],
//     delivery: Database['public']["Tables"]['orders']['Row']['delivery'],
//     in_person_delivery_info: Database['public']["Tables"]['orders']['Row']['in_person_delivery_info'],
//     shipping_delivery_info: Database['public']["Tables"]['orders']['Row']['shipping_delivery_info'],
// } | null


export type in_person_delivery = Database['public']["Tables"]['orders']['Row']['in_person_delivery_info']
export const in_person_deliveryAtom = atom<in_person_delivery>({
    required: {
        name: '',
        wilaya: '',
        street_address: '',
        phone: '',
    },
    not_required: {
        google_maps_link: '',
        message: '',
        instagram_link: ''
    }
})


export type shipping_delivery = Database['public']["Tables"]['orders']['Row']['shipping_delivery_info']
export const shipping_deliveryAtom = atom<shipping_delivery>({
    required: {
        name: '',
        wilaya: '',
        street_address: '',
        house_number: '',
        phone: '',
    },
    not_required: {
        google_maps_link: '',
        message: '',
        instagram_link: ''
    }
})

export type delivery = Database['public']["Tables"]['orders']['Row']['delivery']
export type deliveryInfo = {
    delivery: delivery,
    data: in_person_delivery | shipping_delivery
} | null

export const deliveryAtom = atom<deliveryInfo>(null)
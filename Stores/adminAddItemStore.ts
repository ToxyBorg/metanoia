import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";


// export type adminAddItemType = {
//     category: "earrings" | "rings" | "necklaces" | "bracelets",
//     created_at: string | null,
//     description: string,
//     item_id: string,
//     mainImageURL: File | null,
//     price: number,
//     secondaryImagesURLS: [File | null, File | null, File | null],
//     stock: number,
//     tags: string[],
//     title: string
// }
export type adminAddItemType = {
    category: Database['public']["Tables"]['all_items']['Row']['category'],
    created_at: Database['public']["Tables"]['all_items']['Row']['created_at'],
    description: Database['public']["Tables"]['all_items']['Row']['description'],
    item_id: Database['public']["Tables"]['all_items']['Row']['item_id'],
    mainImageURL: File | null,
    price: Database['public']["Tables"]['all_items']['Row']['price'],
    secondaryImagesURLS: [File | null, File | null, File | null],
    stock: Database['public']["Tables"]['all_items']['Row']['stock'],
    tags: Database['public']["Tables"]['all_items']['Row']['tags'],
    title: Database['public']["Tables"]['all_items']['Row']['title'],
    allow_measurements: Database['public']["Tables"]['all_items']['Row']['allow_measurements']
}

const adminAddItemInitAtom = atom<adminAddItemType>({
    category: "earrings", // required
    description: '', // required
    created_at: null,
    item_id: '',
    mainImageURL: null, // required
    price: 0, // required
    secondaryImagesURLS: [null, null, null], // required
    stock: 1, // required
    tags: [], // required
    title: '', // required,
    allow_measurements: 'DEFAULT',
})

export const adminAddItemAtom = atom<adminAddItemType, [data: adminAddItemType], adminAddItemType | void>(
    (get) => get(adminAddItemInitAtom),
    (_get, set, data) => {
        set(adminAddItemInitAtom, data)

        if (typeof window !== "undefined") {
            window.localStorage.setItem("admin_item_added", JSON.stringify(data));
        }

    }
)
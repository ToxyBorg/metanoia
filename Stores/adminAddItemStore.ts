import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";
import { SingleItemData } from "./itemDataStore";

// export type adminAddItemType = SingleItemData

// export type adminAddItemType = {
//     category: "earrings" | "rings" | "necklaces" | "bracelets",
//     created_at: string | null,
//     description: string,
//     item_id: string,
//     mainImageURL: FileWithPath[] | null,
//     price: number,
//     secondaryImagesURLS: [FileWithPath[] | null, FileWithPath[] | null, FileWithPath[] | null],
//     stock: number,
//     tags: string[],
//     title: string
// }

export type adminAddItemType = {
    category: "earrings" | "rings" | "necklaces" | "bracelets",
    created_at: string | null,
    description: string,
    item_id: string,
    mainImageURL: File | null,
    price: number,
    secondaryImagesURLS: [File | null, File | null, File | null],
    stock: number,
    tags: string[],
    title: string
}

// export const adminAddItemInitAtom = atom<adminAddItemType>({
//     category: "earrings", // required
//     description: '', // required
//     created_at: null,
//     item_id: '',
//     mainImageURL: '', // required
//     price: 0, // required
//     secondaryImagesURLS: ['', '', ''], // required
//     stock: 1, // required
//     tags: [], // required
//     title: '', // required
// })

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
    title: '', // required
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
import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";
import { SingleItemData } from "./itemDataStore";


export type adminEditItemType = {

    item_id: string,
    created_at: string | null,

    category: {
        newData: Database['public']["Tables"]['all_items']['Row']['category']
        // oldData: string,
        modified: boolean
    },
    description: {
        newData: Database['public']["Tables"]['all_items']['Row']['description'],
        // oldData: string,
        modified: boolean
    },
    mainImageURL: {
        newData: File | null,
        oldData: Database['public']["Tables"]['all_items']['Row']['mainImageURL'],
        modified: boolean
    },
    price: {
        newData: Database['public']["Tables"]['all_items']['Row']['price'],
        // oldData: number,
        modified: boolean
    },
    secondaryImagesURLS: {
        newData: File | null,
        oldData: Database['public']["Tables"]['all_items']['Row']['secondaryImagesURLS'][0],
        modified: boolean,
        removed: boolean
    }[],
    // secondaryImagesURLS: [File | null, File | null, File | null]
    stock: {
        newData: Database['public']["Tables"]['all_items']['Row']['stock'],
        // oldData: number,
        modified: boolean
    },
    tags: {
        newData: Database['public']["Tables"]['all_items']['Row']['tags'],
        // oldData: string[],
        modified: boolean
    },
    title: {
        newData: Database['public']["Tables"]['all_items']['Row']['title'],
        // oldData: string,
        modified: boolean
    },
    allow_measurements: {
        newData: Database['public']["Tables"]['all_items']['Row']['allow_measurements'],
        // oldData: string,
        modified: boolean
    }
}

export const defaultEditDataAtom: adminEditItemType = {
    item_id: '',
    created_at: null,

    category: {
        newData: "earrings",
        // oldData: '',
        modified: false
    },
    description: {
        newData: '',
        // oldData: '',
        modified: false
    },
    mainImageURL: {
        newData: null,
        oldData: '',
        modified: false
    },
    price: {
        newData: 0,
        // oldData: 0,
        modified: false
    },
    secondaryImagesURLS: [
        {
            newData: null,
            oldData: '',
            modified: false,
            removed: false
        },
        {
            newData: null,
            oldData: '',
            modified: false,
            removed: false
        },
        {
            newData: null,
            oldData: '',
            modified: false,
            removed: false
        }
    ],
    stock: {
        newData: 1,
        // oldData: 1,
        modified: false
    },
    tags: {
        newData: [],
        // oldData: [],
        modified: false
    },
    title: {
        newData: '',
        // oldData: '',
        modified: false
    },
    allow_measurements: {
        newData: "DEFAULT",
        modified: false
    }
}
const adminEditItemInitAtom = atom<adminEditItemType>(defaultEditDataAtom)



// export type adminEditItemType = {
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

// const adminEditItemInitAtom = atom<adminEditItemType>({
//     category: "earrings", // required
//     description: '', // required
//     created_at: null,
//     item_id: '',
//     mainImageURL: null, // required
//     price: 0, // required
//     secondaryImagesURLS: [null, null, null], // required
//     stock: 1, // required
//     tags: [], // required
//     title: '', // required
// })

export const adminEditItemAtom = atom<adminEditItemType, [data: adminEditItemType], adminEditItemType | void>(
    (get) => get(adminEditItemInitAtom),
    (_get, set, data) => {
        set(adminEditItemInitAtom, data)
    }
)
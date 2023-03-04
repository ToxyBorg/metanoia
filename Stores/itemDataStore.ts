import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";
import { bracelets, earrings, IconInfo, necklaces, rings } from "../Shared/icons";


/**             ITEMS TYPE */
export type AllItemsData = Database['public']["Tables"]['all_items']['Row'][]


export type CategorizedItemsData = {
    "rings": { data: Database['public']["Tables"]['all_items']['Row'][], icon: IconInfo },
    "bracelets": { data: Database['public']["Tables"]['all_items']['Row'][], icon: IconInfo },
    "necklaces": { data: Database['public']["Tables"]['all_items']['Row'][], icon: IconInfo },
    "earrings": { data: Database['public']["Tables"]['all_items']['Row'][], icon: IconInfo },
}

export type CategoriesType = "rings" | "bracelets" | "necklaces" | "earrings"

export type SingleItemData = Database['public']["Tables"]["all_items"]["Row"]

//////////////////////////////////////////////////////////////////////////////////////


const categorizedItemsDataInitAtom = atom<CategorizedItemsData>(
    {
        "rings": { data: [], icon: rings },
        "bracelets": { data: [], icon: bracelets },
        "necklaces": { data: [], icon: necklaces },
        "earrings": { data: [], icon: earrings },
    }
)

export const categorizedItemsDataAtom = atom<CategorizedItemsData, [data: CategorizedItemsData], CategorizedItemsData | void>(
    (get) => get(categorizedItemsDataInitAtom),
    (_get, set, data) => {

        set(categorizedItemsDataInitAtom, data)

    }
)

//////////////////////////////////////////////////////////////////////////////////////

const allItemsDataInitAtom = atom<AllItemsData>([])

export const allItemsDataAtom = atom<AllItemsData, [data: AllItemsData], AllItemsData | void>(
    (get) => get(allItemsDataInitAtom),
    (_get, set, data) => {

        set(allItemsDataInitAtom, data)

    }
)


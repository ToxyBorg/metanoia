import { atom } from "jotai";
import { SingleItemData } from "./itemDataStore";


export type cartType = {
    id: string,
    item: SingleItemData,
    itemNumber: number

}[]

export type SingleCartItemType = {
    id: string,
    item: SingleItemData,
    itemNumber: number

}

const cartItemsDataInitAtom = atom<cartType>([])

export const cartItemsDataAtom = atom<cartType, [data: cartType], cartType | void>(
    (get) => get(cartItemsDataInitAtom),
    (_get, set, data) => {
        set(cartItemsDataInitAtom, data)
    }
)
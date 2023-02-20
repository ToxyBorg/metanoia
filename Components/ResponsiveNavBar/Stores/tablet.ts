import { atom } from "jotai"

const tabletNavLockerInitAtom = atom<boolean>(false)
export const tabletNavLockerAtom = atom(
    (get) => get(tabletNavLockerInitAtom),
    (get, set, updater: boolean) => set(tabletNavLockerInitAtom, updater)
)

import { useIntersection } from "@mantine/hooks";
import { atom, useAtomValue } from "jotai";
import { MutableRefObject, Ref, useRef } from "react";


const containerRefInitAtom = atom<MutableRefObject<undefined> | null>(null)
export const containerRefAtom = atom(
    (get) => get(containerRefInitAtom),
    (_get, set, refHook: MutableRefObject<undefined>) => {
        set(containerRefInitAtom, refHook)
    }
)

const refDataInitAtom = atom<{ ref: ((element: any) => void) | null, entry: IntersectionObserverEntry | null }>({
    ref: null, entry: null
})
export const refDataAtom = atom(
    (get) => get(refDataInitAtom),
    (_get, set, refDataHook: { ref: ((element: any) => void), entry: IntersectionObserverEntry }) => {
        set(refDataInitAtom, refDataHook)
    }
)


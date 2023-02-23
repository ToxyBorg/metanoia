import { useIntersection } from "@mantine/hooks";
import { atom, useAtomValue } from "jotai";
import { MutableRefObject, Ref, useRef } from "react";

/**             HERO SECTION REF TYPE */
type heroSectionRefType = {
    data: {
        containerRef: MutableRefObject<null> | null | undefined,
        observedRef: {
            ref: null | ((element: any) => void),
            entry: null | IntersectionObserverEntry
        }
    }
}

/**             HERO SECTION REF INIT ATOM */
const heroSectionRefInitAtom = atom<heroSectionRefType>(
    {
        data: {
            containerRef: undefined,
            observedRef: {
                ref: null,
                entry: null,
            }
        }
    }
)


/**             HERO SECTION REF EXPORTED ATOM */
const heroSectionRefAtom = atom<heroSectionRefType, [], heroSectionRefType | void>(
    (get) => get(heroSectionRefInitAtom),
    (_get, set) => {
        const containerRef = useRef(null);
        const { ref, entry } = useIntersection({
            root: containerRef.current,
            threshold: 1,
        });

        const data = {
            containerRef: containerRef,
            observedRef: { ref: ref, entry: entry }
        }

        set(heroSectionRefInitAtom, { data: data })

    }
)

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
import { atom } from "jotai"
import { MutableRefObject } from "react"

type heroScrollIntoViewType = {
    targetRef: MutableRefObject<HTMLDivElement>
} | null

export const heroScrollIntoViewAtom = atom<heroScrollIntoViewType>(null)
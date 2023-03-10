import { atom } from "jotai"
import { MutableRefObject } from "react"

type heroScrollIntoViewType = {
    targetRef: MutableRefObject<HTMLDivElement>
} | null

const heroScrollIntoViewAtom = atom<heroScrollIntoViewType>(null)
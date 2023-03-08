import { atom } from "jotai";
import { MutableRefObject } from "react";

const xMousePosAtom = atom<{ xMousePosRef: MutableRefObject<any> | null, x: number }>(
    { xMousePosRef: null, x: 0 }
)
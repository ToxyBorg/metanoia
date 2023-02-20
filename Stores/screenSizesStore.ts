import { useMediaQuery } from "@mantine/hooks";
import { atom } from "jotai";
import { mobileSizes, tabletSizes } from "../Shared/screenSizes";

/**              SCREEN SIZES TYPE */
export type allSizes = "OUT_OF_RANGE" | "MOBILE" | "TABLET" | "DESKTOP"

/**              MOBILE SCREEN SIZES */
const screenSizesInitAtom = atom<allSizes>("OUT_OF_RANGE")
const screenSizesAtom = atom(
    (get) => get(screenSizesInitAtom),
    (get, set) => {
        let validRange: allSizes = "OUT_OF_RANGE"

        const mobileMinSize = useMediaQuery(mobileSizes.minSize);
        const mobileMaxSize = useMediaQuery(mobileSizes.maxSize);

        const tabletMinSize = useMediaQuery(tabletSizes.minSize);
        const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);


        if (mobileMinSize && mobileMaxSize) {
            validRange = "MOBILE"
        }
        else if (tabletMinSize && tabletMaxSize) { validRange = "TABLET" }
        else { validRange = "OUT_OF_RANGE" }

        set(screenSizesInitAtom, validRange)
    }
)
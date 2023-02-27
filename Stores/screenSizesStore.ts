import { useMediaQuery } from "@mantine/hooks";
import { atom } from "jotai";
import { desktopSizes, mobileSizes } from "../Shared/screenSizes";

/**              SCREEN SIZES TYPE */
// type allSizes = "OUT_OF_RANGE" | "MOBILE" | "TABLET" | "DESKTOP"
type allSizes = "OUT_OF_RANGE" | "MOBILE" | "DESKTOP"


/**              MOBILE SCREEN SIZES */
const screenSizesInitAtom = atom<allSizes>("OUT_OF_RANGE")
export const screenSizesAtom = atom<allSizes, [], allSizes | void>(
    (get) => get(screenSizesInitAtom),
    (get, set) => {
        let validRange: allSizes = "OUT_OF_RANGE"

        const mobileMinSize = useMediaQuery(mobileSizes.minSize);
        const mobileMaxSize = useMediaQuery(mobileSizes.maxSize);

        // const tabletMinSize = useMediaQuery(tabletSizes.minSize);
        // const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);

        const desktopMinSize = useMediaQuery(desktopSizes.minSize);

        if (mobileMinSize && mobileMaxSize) { validRange = "MOBILE" }
        // else if (tabletMinSize && tabletMaxSize) { validRange = "TABLET" }
        else if (desktopMinSize) { validRange = "DESKTOP" }

        set(screenSizesInitAtom, validRange)
    }
)
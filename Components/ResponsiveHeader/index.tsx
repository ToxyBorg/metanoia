"use client"

import { useAtomValue } from "jotai";
import { navBarLockedAtom } from "../../Stores/navBarLockStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";
import MobileHeader from "./headers/MobileHeader";


const ResponsiveHeader = () => {
    const navBarLocked = useAtomValue(navBarLockedAtom)
    const scrollDirection = useAtomValue(windowScrollDirectionAtom)
    const screenSizes = useAtomValue(screenSizesAtom)

    if (screenSizes == "MOBILE" || screenSizes == "TABLET") {
        return <MobileHeader mobileBreakpoints={screenSizes == "MOBILE" || screenSizes == "TABLET"}
            showMobileNavBar={!(scrollDirection == "DOWN" && !navBarLocked)}
        />
    }
    else return <></>
}

export default ResponsiveHeader
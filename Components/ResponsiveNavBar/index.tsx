// import "server-only"
"use client"

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { desktopSizes, mobileSizes, tabletSizes } from "../../Shared/screenSizes";
import { xMousePosAtom } from "../../Stores/leftSideHover";
import { navBarLockedAtom } from "../../Stores/navBarLockStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import DesktopNav from "./navBars/DesktopNav";

const ResponsiveNavBar = () => {

    // const tabletMinSize = useMediaQuery(tabletSizes.minSize);
    // const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);

    // const desktopMinSize = useMediaQuery(desktopSizes.minSize);

    const screenSizes = useAtomValue(screenSizesAtom)
    const xMousePos = useAtomValue(xMousePosAtom)
    const navBarLocked = useAtomValue(navBarLockedAtom)


    // if (screenSizes == "TABLET") {
    //     return <TabletNav tabletBreakpoints={screenSizes == "TABLET"} />
    // }
    // else if (screenSizes == "DESKTOP") {
    //     return <DesktopNav desktopBreakpoints={screenSizes == "DESKTOP"} />
    // }
    // else return <></>

    if (screenSizes == "DESKTOP") {
        return <DesktopNav desktopBreakpoints={screenSizes == "DESKTOP"} showDesktopNavBar={xMousePos.x <= 20 || navBarLocked} />
    }
    else return <></>

}



export default ResponsiveNavBar
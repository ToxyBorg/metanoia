// import "server-only"
"use client"

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { desktopSizes, mobileSizes, tabletSizes } from "../../Shared/screenSizes";
import DesktopNav from "./components/navBars/DesktopNav";
import TabletNav from "./components/navBars/TabletNav";

const ResponsiveNavBar = () => {

    const tabletMinSize = useMediaQuery(tabletSizes.minSize);
    const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);

    const desktopMinSize = useMediaQuery(desktopSizes.minSize);

    if ((tabletMinSize && tabletMaxSize)) {
        return <TabletNav tabletBreakpoints={(tabletMinSize && tabletMaxSize)} />
    }
    else if (desktopMinSize) {
        return <DesktopNav desktopBreakpoints={desktopMinSize} />
    }
    else return <></>
}



export default ResponsiveNavBar
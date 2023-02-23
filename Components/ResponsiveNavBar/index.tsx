// import "server-only"
"use client"

import { useAtom } from "jotai";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";
import DesktopNav from "./components/navBars/DesktopNav";
import TabletNav from "./components/navBars/TabletNav";

const ResponsiveNavBar = () => {

    const [windowScrollDirection, windowScrollDirectionSetter] = useAtom(windowScrollDirectionAtom)
    windowScrollDirectionSetter()

    const [screenSizes, screenSizesSetter] = useAtom(screenSizesAtom)
    screenSizesSetter()

    // const mobileMinSize = useMediaQuery(mobileSizes.minSize);
    // const mobileMaxSize = useMediaQuery(mobileSizes.maxSize);

    // const tabletMinSize = useMediaQuery(tabletSizes.minSize);
    // const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);

    // const desktopMinSize = useMediaQuery(desktopSizes.minSize);


    if ((screenSizes == "TABLET") && (windowScrollDirection == "UP")) {
        return <TabletNav tabletBreakpoints={screenSizes == "TABLET"} />
    }
    else if ((screenSizes == "DESKTOP") && (windowScrollDirection == "UP")) {
        return <DesktopNav desktopBreakpoints={screenSizes == "DESKTOP"} />
    }
    else return <></>


    // if ((mobileMinSize && mobileMaxSize) && (windowScrollDirection == "UP")) {
    //     return <MobileNav mobileBreakpoints={(mobileMinSize && mobileMaxSize)} />
    // }
    // else if ((tabletMinSize && tabletMaxSize) && (windowScrollDirection == "UP")) {
    //     return <TabletNav tabletBreakpoints={(tabletMinSize && tabletMaxSize)} />
    // }
    // else if (desktopMinSize && (windowScrollDirection == "UP")) {
    //     return <DesktopNav desktopBreakpoints={desktopMinSize} />
    // }
    // else return <></>
}



export default ResponsiveNavBar
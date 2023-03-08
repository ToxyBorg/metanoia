// import "server-only";
"use client"

import { AppShell, Container } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import ResponsiveFooter from "../../Components/appshellCompnents/ResponsiveFooter";
import ResponsiveHeader from "../../Components/appshellCompnents/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/appshellCompnents/ResponsiveNavBar";
// import { containerRefAtom, refDataAtom } from "../../Stores/heroOutOfViewStore";

interface Props {
    children: React.ReactNode
}

const AppShellWrapper = (props: Props) => {

    // const xMousePos = useAtomValue(xMousePosAtom)
    // const scrollPastRootContainer = useAtomValue(containerRefAtom)

    // const mergedRef = useMergedRef(xMousePos.xMousePosRef, scrollPastRootContainer?.current!)


    // const navBarLocked = useAtomValue(navBarLockedAtom)

    // const scrollDirection = useAtomValue(windowScrollDirectionAtom)

    // console.log("MOUSE X : ", xMousePos.x, " navbar locked? ", navBarLocked)
    return (

        <AppShell
            // header={scrollDirection == "DOWN" && !navBarLocked ? undefined : <ResponsiveHeader />}
            header={<ResponsiveHeader />}

            // navbar={scrollDirection == "DOWN" && !navBarLocked  ? undefined : <ResponsiveNavBar />}
            // navbar={xMousePos.x >= 20 && !navBarLocked ? undefined : <ResponsiveNavBar />}
            navbar={<ResponsiveNavBar />}
            footer={
                <ResponsiveFooter />
            }
            padding={0}

        // ref={xMousePos.xMousePosRef}
        >
            {/* <Container ref={xMousePos.xMousePosRef}> */}
            {props.children}
            {/* </Container> */}
        </AppShell>
    )
}

export default AppShellWrapper
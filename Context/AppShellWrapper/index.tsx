// import "server-only";
"use client"

import { AppShell } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import ResponsiveFooter from "../../Components/ResponsiveFooter";
import ResponsiveHeader from "../../Components/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/ResponsiveNavBar";
import { containerRefAtom, refDataAtom } from "../../Stores/heroOutOfViewStore";
import { xMousePosAtom } from "../../Stores/leftSideHover";

interface Props {
    children: React.ReactNode
}

const AppShellWrapper = (props: Props) => {

    const xMousePos = useAtomValue(xMousePosAtom)
    const scrollPastRootContainer = useAtomValue(containerRefAtom)

    const mergedRef = useMergedRef(xMousePos.xMousePosRef, scrollPastRootContainer?.current!)


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

        >
            <div ref={mergedRef}>
                {props.children}
            </div>
        </AppShell>
    )
}

export default AppShellWrapper
// import "server-only";
"use client"

import { AppShell, Container, Transition } from "@mantine/core";
import { useMergedRef, useTimeout, useViewportSize } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import ResponsiveFooter from "../../Components/appshellCompnents/ResponsiveFooter";
import ResponsiveHeader from "../../Components/appshellCompnents/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/appshellCompnents/ResponsiveNavBar";
// import { containerRefAtom, refDataAtom } from "../../Stores/heroOutOfViewStore";
import Confetti from 'react-confetti'
import { lastStepReachedAtom } from "../../Stores/lastStepStore";
import BackgroundParticles from "../../Components/MainPage/BackgroundParticles";


interface Props {
    children: React.ReactNode
}

const AppShellWrapper = (props: Props) => {

    const [lastStepReachedAtomValue, lastStepReachedAtomSetter] = useAtom(lastStepReachedAtom)


    // const xMousePos = useAtomValue(xMousePosAtom)
    // const scrollPastRootContainer = useAtomValue(containerRefAtom)

    // const mergedRef = useMergedRef(xMousePos.xMousePosRef, scrollPastRootContainer?.current!)


    // const navBarLocked = useAtomValue(navBarLockedAtom)

    // const scrollDirection = useAtomValue(windowScrollDirectionAtom)

    // console.log("MOUSE X : ", xMousePos.x, " navbar locked? ", navBarLocked)

    // const { height, width } = useViewportSize();

    const { start, clear } = useTimeout(() => lastStepReachedAtomSetter(false), 6000);

    if (lastStepReachedAtomValue) {
        start()

    } else {
        clear()
    }

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

        // zIndex={1}
        // pos={"relative"}

        // ref={xMousePos.xMousePosRef}
        >
            <Transition mounted={lastStepReachedAtomValue} transition="fade" duration={500} timingFunction="ease">
                {(styles) =>
                    <Confetti style={{ ...styles, width: "100vw", height: "100%" }} />
                }
            </Transition>
            {/* {lastStepReachedAtomValue && <Confetti style={{ width: "100vw", height: "100%" }} />} */}

            <BackgroundParticles />

            {props.children}
            {/* </Container> */}
        </AppShell>
    )
}

export default AppShellWrapper
// import "server-only";
"use client"

import { AppShell, Footer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import ResponsiveFooter from "../../Components/ResponsiveFooter";
import ResponsiveHeader from "../../Components/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/ResponsiveNavBar";
import { desktopSizes, tabletSizes } from "../../Shared/screenSizes";

interface Props {
    children: React.ReactNode
}

const AppShellWrapper = (props: Props) => {

    // const containerRefSetter = useSetAtom(containerRefAtom)
    // containerRefSetter(useRef())

    // const { ref, entry } = useIntersection({
    //     root: useAtomValue(containerRefAtom)?.current,
    //     threshold: 0.85,
    // });

    // const refDataSetter = useSetAtom(refDataAtom)
    // refDataSetter({ ref: ref, entry: entry })

    // const containerRef = useAtomValue(containerRefAtom)


    const [open, handlers] = useDisclosure(true)
    useEffect(() => {

        let windowScrollPos = scrollY;

        window.onscroll = () => {

            if (scrollY < windowScrollPos) { // Scrolling up
                handlers.open()

            } else if (scrollY > windowScrollPos) { // Scrolling down
                handlers.close()
            }

            windowScrollPos = scrollY
        }

    }, [handlers])

    return (
        <AppShell
            header={open ? <ResponsiveHeader /> : undefined}
            navbar={open ? <ResponsiveNavBar /> : undefined}
            footer={
                <ResponsiveFooter />
            }
            padding={0}
        >
            {props.children}
        </AppShell>
    )
}

export default AppShellWrapper
// import "server-only";
"use client"

import { AppShell } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { MutableRefObject, RefObject, useRef } from "react";
import ResponsiveHeader from "../../Components/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/ResponsiveNavBar";
import { containerRefAtom, refDataAtom } from "../../Stores/heroOutOfViewStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";

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

    return (
        <AppShell
            header={<ResponsiveHeader />}
            navbar={<ResponsiveNavBar />}
            padding={0}
        >
            {props.children}
        </AppShell>
    )
}

export default AppShellWrapper
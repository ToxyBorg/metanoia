"use client"

import { ActionIcon, Group, Header, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { darkThemeIcon, lightThemeIcon } from "../../Shared/icons";
import { refDataAtom } from "../../Stores/heroOutOfViewStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";
import MobileHeader from "./headers/MobileHeader";

interface Props { }

const ResponsiveHeader: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [windowScrollDirection, windowScrollDirectionSetter] = useAtom(windowScrollDirectionAtom)
    windowScrollDirectionSetter()

    const [screenSizes, screenSizesSetter] = useAtom(screenSizesAtom)
    screenSizesSetter()



    if ((screenSizes == "MOBILE") && (windowScrollDirection == "UP")) {
        return <MobileHeader mobileBreakpoints={screenSizes == "MOBILE"} />
    }
    else return <></>
}

export default ResponsiveHeader
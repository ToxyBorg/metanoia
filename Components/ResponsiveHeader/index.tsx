"use client"

import { ActionIcon, Group, Header, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useEffect } from "react";
import { darkThemeIcon, lightThemeIcon } from "../../Shared/icons";
import { mobileSizes } from "../../Shared/screenSizes";
import MobileHeader from "./headers/MobileHeader";


const ResponsiveHeader = () => {

    // const [open, handlers] = useDisclosure(true)
    // useEffect(() => {

    //     let windowScrollPos = scrollY;

    //     window.onscroll = () => {

    //         if (scrollY < windowScrollPos) { // Scrolling up
    //             handlers.open()

    //         } else if (scrollY > windowScrollPos) { // Scrolling down
    //             handlers.close()
    //         }

    //         windowScrollPos = scrollY
    //     }

    // }, [handlers])

    const mobileMinSize = useMediaQuery(mobileSizes.minSize);
    const mobileMaxSize = useMediaQuery(mobileSizes.maxSize);



    if ((mobileMinSize && mobileMaxSize)) {
        return <MobileHeader mobileBreakpoints={(mobileMinSize && mobileMaxSize)} />
    }
    else return <></>
}

export default ResponsiveHeader
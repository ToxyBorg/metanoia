import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useAtom, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { navSlideLeft, navSlideRight } from "../../../Shared/icons";
import { windowScrollDirectionAtom } from "../../../Stores/windowScrollStore";

interface Props { }

const NavBarHide: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    // const [navBarSlide, SetNavBarSlide] = useAtom(navBarSlideInAtom)
    const scrollDirectionSetter = useSetAtom(windowScrollDirectionAtom)

    return (

        <ActionIcon variant="transparent"
            onClick={() => scrollDirectionSetter("DOWN")}
            w={"100%"} h={"100%"}
            mx={"auto"}
            title={navSlideLeft.name}

        >
            <navSlideLeft.icon />
        </ActionIcon>

    )
}

export default NavBarHide
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useAtom, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { navSlideLeft, navSlideRight } from "../../../Shared/icons";
import { windowScrollDirectionAtom } from "../../../Stores/windowScrollStore";

interface Props { }

const NavBarShow: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    // const [navBarSlide, SetNavBarSlide] = useAtom(navBarSlideInAtom)
    const scrollDirectionSetter = useSetAtom(windowScrollDirectionAtom)
    // const [scrollDirection, scrollDirectionSetter] = useAtom(windowScrollDirectionAtom)


    return (
        <ActionIcon variant="transparent"
            onClick={() => scrollDirectionSetter("UP")}
            w={"100%"} h={"100%"}
            mx={"auto"}
            title={navSlideRight.name}

        >
            <navSlideRight.icon />
        </ActionIcon>
    )


}

export default NavBarShow
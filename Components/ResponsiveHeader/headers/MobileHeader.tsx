"use client"

import { ActionIcon, Group, Header, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../../Shared/colors";
import style from "../../../Shared/css/styles.module.css";
import { mobileNavIconSizes, mobileNavRadius, mobileNavWidthHeight } from "../../../Shared/sizes";
import { Cart } from "../../buttons/navigationButtons/Cart";
import { Categories } from "../../buttons/navigationButtons/Categories";
import { Home } from "../../buttons/navigationButtons/Home";
import { Search } from "../../buttons/navigationButtons/Search";
import { Settings } from "../../buttons/navigationButtons/Settings";

interface Props {
    mobileBreakpoints: boolean,
    showMobileNavBar: boolean,
}

const MobileHeader: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: "clamp(5vw, 1.75rem , 10vw)"
            }}>

            <Transition
                mounted={props.mobileBreakpoints && props.showMobileNavBar}
                transition="slide-up" duration={800}
            >
                {(styles) =>

                    <Header
                        style={styles}

                        w={"100%"} height={""}
                        fixed
                        position={{ bottom: 0 }}
                        bg={"hsla(0, 0%, 100%, 0%)"}
                    >

                        <Group noWrap grow
                            sx={{
                                borderRadius: mobileNavRadius.navbarBorderRadius,
                                backdropFilter: "blur(2px)",
                                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,

                            }}
                            mx={"auto"} my={"xs"} px={"0.75rem"}
                            w={mobileNavWidthHeight.width} h={"clamp(5vh, 4rem , 15vh)"}
                            bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                            className={style.Animated_Background_Gradient}

                        >

                            <Categories />
                            <Search />
                            <Home />
                            <Cart />
                            <Settings />

                        </Group >
                    </Header>
                }
            </Transition>
        </IconContext.Provider>

    )
}

export default MobileHeader
"use client"

import { ActionIcon, Group, Header, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../../Shared/colors";
import { mobileNavIconSizes, mobileNavRadius, mobileNavWidthHeight } from "../../../Shared/sizes";
import { MobileCartButton } from "../../ResponsiveNavBar/components/buttons/mainButtons/Cart";
import { MobileCategories } from "../../ResponsiveNavBar/components/buttons/mainButtons/Categories";
import { MobileHome } from "../../ResponsiveNavBar/components/buttons/mainButtons/Home";
import { MobileSearch } from "../../ResponsiveNavBar/components/buttons/mainButtons/Search";
import { MobileSettingsButton } from "../../ResponsiveNavBar/components/buttons/mainButtons/Settings";

interface Props {
    mobileBreakpoints: boolean
}

const MobileHeader: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: mobileNavIconSizes.InnerIconSize
            }}>

            <Header
                w={"100%"} height={""}
                fixed
                position={{ bottom: 0 }}
                bg={"hsla(0, 0%, 100%, 0%)"}
            >

                <Group noWrap grow
                    sx={{
                        borderRadius: mobileNavRadius.navbarBorderRadius, backdropFilter: "blur(2px)",
                        border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                        // overflowX: "scroll", scrollbarWidth: "none"
                    }}
                    mx={"auto"} my={"xs"} px={"0.75rem"}
                    w={mobileNavWidthHeight.width} h={mobileNavWidthHeight.height}
                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                >

                    <MobileCategories mobileScreenSize={props.mobileBreakpoints} />
                    <MobileSearch mobileScreenSize={props.mobileBreakpoints} />
                    <MobileHome />
                    <MobileCartButton mobileScreenSize={props.mobileBreakpoints} />
                    <MobileSettingsButton mobileScreenSize={props.mobileBreakpoints} />

                </Group >
            </Header>
        </IconContext.Provider>

    )
}

export default MobileHeader
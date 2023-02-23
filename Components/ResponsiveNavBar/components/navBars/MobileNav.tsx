"use client"

import { Group, useMantineColorScheme } from "@mantine/core";
import { NavBarColors } from "../../../../Shared/colors";

import { mobileNavIconSizes, mobileNavRadius, mobileNavWidthHeight } from "../../../../Shared/sizes";
import { IconContext } from "react-icons";
import { MobileCartButton } from "../buttons/mainButtons/Cart";
import { MobileCategories } from "../buttons/mainButtons/Categories";
import { MobileHome } from "../buttons/mainButtons/Home";
import { MobileSearch } from "../buttons/mainButtons/Search";
import { MobileUserButton } from "../buttons/mainButtons/User";
import { useColorScheme } from "@mantine/hooks";
import { MobileSettingsButton } from "../buttons/mainButtons/Settings";

interface Props {
    mobileBreakpoints: boolean
}

const MobileNav = (props: Props) => {

    const { colorScheme, } = useMantineColorScheme();

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: mobileNavIconSizes.InnerIconSize
            }}>
            <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100%" }}>

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

            </nav>

        </IconContext.Provider>
    )
}

// export default MobileNav

/*
        <Transition
            mounted={props.mobileBreakpoints}
            transition="slide-up" duration={500} timingFunction="ease-in-out"
        >
            {(styles) =>
                <IconContext.Provider value={{ color: IconBgColor, size: mobileNavIconSizes.InnerIconSize }}>
                    <nav
                        style={{
                            ...styles,
                            position: "fixed",
                            bottom: 0,
                            left: 0, right: 0,
                            width: "100vw",
                        }}
                    >

                        <Group grow noWrap spacing={"xs"}
                            sx={{
                                borderRadius: 50, backdropFilter: "blur(4px)",
                                overflowX: "scroll", scrollbarWidth: "none"
                            }}
                            mx={"auto"} my={"xs"} px={"lg"}
                            w={mobileNavWidthHeight.width} h={mobileNavWidthHeight.height}
                            bg={NavBgColor}
                        >

                            <MobileCategories mobileScreenSize={props.mobileBreakpoints} />
                            <MobileSearch mobileScreenSize={props.mobileBreakpoints} />
                            <MobileHome />
                            <MobileCartButton mobileScreenSize={props.mobileBreakpoints} />
                            <MobileUserButton mobileScreenSize={props.mobileBreakpoints} />

                        </Group >

                    </nav>

                </IconContext.Provider>
            }
        </Transition>

*/


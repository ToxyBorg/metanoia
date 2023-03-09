// import "server-only"
"use client"

import { Container, Divider, Navbar, ScrollArea, Stack, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../Shared/colors";
import style from "../../Shared/css/styles.module.css";
import { desktopNavIconSizes, desktopNavRadius, desktopNavWidthHeight } from "../../Shared/sizes";
import { navBarLockedAtom } from "../../Stores/navBarLockStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";
import Checkout from "../buttons/extraButtons/Checkout";
import NavBarHide from "../buttons/extraButtons/NavBarHide";
import NavBarShow from "../buttons/extraButtons/NavBarShow";
import { Cart } from "../buttons/navigationButtons/Cart";
import { Categories } from "../buttons/navigationButtons/Categories";
import { ContactInfo } from "../buttons/navigationButtons/ContactInfo";
import { Home } from "../buttons/navigationButtons/Home";
import { Search } from "../buttons/navigationButtons/Search";
import { Settings } from "../buttons/navigationButtons/Settings";

const ResponsiveNavBar = () => {

    const screenSizes = useAtomValue(screenSizesAtom)
    // const xMousePos = useAtomValue(xMousePosAtom)
    const navBarLocked = useAtomValue(navBarLockedAtom)
    // const scrollPastRootContainerChildData = useAtomValue(refDataAtom)
    const scrollDirection = useAtomValue(windowScrollDirectionAtom)


    const { colorScheme, } = useMantineColorScheme();

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: desktopNavIconSizes.InnerIconSize
            }}>

            <Transition
                // mounted={screenSizes == "DESKTOP" && ((xMousePos.x <= 100 || navBarLocked))}
                mounted={screenSizes == "DESKTOP" && ((!navBarLocked && scrollDirection == "DOWN"))}
                transition="slide-down" duration={800}

            >
                {(styles) =>

                    <Container
                        style={styles}
                        pos={"fixed"}
                        top={0}
                        m={"lg"}
                        // w={"fit-content"}

                        className={style.Animated_Background_Gradient}

                        sx={{
                            borderRadius: desktopNavRadius.navbarBorderRadius,
                            backdropFilter: "blur(2px)",
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical,
                            // backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight,
                            // backgroundSize: "200% 200%",

                            // animation: `${style.AnimateBG} 7s ease infinite`,
                            zIndex: 2,

                            // ":hover": {
                            //     border: "2px solid black"
                            // }

                        }}

                    >
                        <NavBarShow />
                    </Container>
                }

            </Transition>


            <Transition
                // mounted={screenSizes == "DESKTOP" && ((xMousePos.x <= 100 || navBarLocked))}
                mounted={screenSizes == "DESKTOP" && ((navBarLocked || scrollDirection == "UP"))}
                transition="slide-right" duration={800}
            >
                {(styles) =>


                    <Navbar
                        style={styles}
                        hiddenBreakpoint={0}
                        fixed
                        w={desktopNavWidthHeight.width}
                        height={desktopNavWidthHeight.height}
                        top={0}
                        px={"auto"}
                        py={"lg"}
                        ml={"md"} mr={"lg"}
                        my={"auto"}

                        // bg={colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical}
                        className={style.Animated_Background_Gradient}

                        sx={{
                            borderRadius: desktopNavRadius.navbarBorderRadius,
                            backdropFilter: "blur(2px)",
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical,
                            // backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight,
                            // backgroundSize: "200% 200%",

                            // animation: `${style.AnimateBG} 7s ease infinite`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        }}
                    >

                        <Navbar.Section my={"lg"}>
                            <Home />
                        </Navbar.Section>

                        <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                            color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                        />

                        <ScrollArea type={"never"} h={"100%"} >
                            <Navbar.Section my={"xl"} grow >
                                <Stack spacing="xl">
                                    <NavBarHide />
                                    <Search />
                                    <Categories />
                                    <Cart />
                                    <Checkout />
                                </Stack>
                            </Navbar.Section>
                        </ScrollArea>

                        <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                            color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                        />

                        <Navbar.Section my={"lg"}>
                            <Stack spacing="md">
                                <ContactInfo />
                                <Settings />
                            </Stack>

                        </Navbar.Section>

                    </Navbar>
                }
            </Transition>
        </IconContext.Provider>
    )

}



export default ResponsiveNavBar
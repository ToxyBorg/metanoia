"use client"

import { Group, Header, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import { IconContext } from "react-icons";
import { navBarLockedAtom } from "../../Stores/navBarLockStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import { windowScrollDirectionAtom } from "../../Stores/windowScrollStore";
import { Cart } from "../buttons/navigationButtons/Cart";
import { Categories } from "../buttons/navigationButtons/Categories";
import { Home } from "../buttons/navigationButtons/Home";
import { Search } from "../buttons/navigationButtons/Search";
import { Settings } from "../buttons/navigationButtons/Settings";
import style from "../../Shared/css/styles.module.css";
import { NavBarColors } from "../../Shared/colors";
import { mobileNavRadius, mobileNavWidthHeight } from "../../Shared/sizes";


const ResponsiveHeader = () => {
    const navBarLocked = useAtomValue(navBarLockedAtom)
    const scrollDirection = useAtomValue(windowScrollDirectionAtom)
    const screenSizes = useAtomValue(screenSizesAtom)

    const { colorScheme, } = useMantineColorScheme();


    // if (screenSizes == "MOBILE" || screenSizes == "TABLET") {
    //     return <MobileHeader mobileBreakpoints={screenSizes == "MOBILE" || screenSizes == "TABLET"}
    //         showMobileNavBar={!(scrollDirection == "DOWN" && !navBarLocked)}
    //     />
    // }

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: "clamp(5vw, 1.75rem , 10vw)"
            }}>

            <Transition
                mounted={screenSizes == "MOBILE" && (!(scrollDirection == "DOWN" && !navBarLocked))}
                transition="slide-up" duration={800}
            >
                {(styles) =>

                    <Header
                        style={styles}

                        w={"100%"} height={"auto"}
                        fixed
                        position={{ bottom: 0 }}
                        bg={"hsla(0, 0%, 100%, 0%)"}
                    // bg={"hsla(0, 0%, 100%, 0%)"}
                    >


                        <Group noWrap grow
                            sx={{
                                borderRadius: mobileNavRadius.navbarBorderRadius,
                                backdropFilter: "blur(2px)",
                                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,

                            }}
                            mx={"auto"} my={"md"} px={"0.75rem"}
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

export default ResponsiveHeader
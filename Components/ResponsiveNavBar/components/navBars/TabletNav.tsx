import { Divider, Navbar, ScrollArea, useMantineColorScheme } from "@mantine/core";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../../../Shared/colors";
import { tabletNavIconSizes, tabletNavRadius, tabletNavWidthHeight } from "../../../../Shared/sizes";
import { TabletCartButton } from "../buttons/mainButtons/Cart";
import { TabletCategories } from "../buttons/mainButtons/Categories";
import { TabletHome } from "../buttons/mainButtons/Home";
import { TabletSearch } from "../buttons/mainButtons/Search";
import { TabletSettingsButton } from "../buttons/mainButtons/Settings";



interface Props {
    tabletBreakpoints: boolean
}


const TabletNav = (props: Props) => {
    const { colorScheme, } = useMantineColorScheme();


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: tabletNavIconSizes.InnerIconSize
            }}>
            <Navbar
                hiddenBreakpoint={0}
                fixed
                height={tabletNavWidthHeight.height}
                w={tabletNavWidthHeight.width}
                // width={{ base: tabletNavWidthHeight.width }}
                top={0}
                px={"auto"}
                py={"lg"}
                ml={"md"}
                my={"auto"}

                sx={{
                    borderRadius: tabletNavRadius.navbarBorderRadius,
                    backdropFilter: "blur(2px)",
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                    // alignItems: "center"
                }}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
            >

                <Navbar.Section my={"lg"} >
                    <TabletHome />
                </Navbar.Section>

                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <ScrollArea type={"never"} h={"100%"}>

                    <Navbar.Section my={"xl"} >
                        <TabletSearch tabletScreenSize={props.tabletBreakpoints} />
                    </Navbar.Section>

                    <Navbar.Section my={"xl"}>
                        <TabletCategories tabletScreenSize={props.tabletBreakpoints} />
                    </Navbar.Section>

                    <Navbar.Section my={"xl"} grow >
                        <TabletCartButton tabletScreenSize={props.tabletBreakpoints} />
                    </Navbar.Section>

                </ScrollArea>

                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <Navbar.Section my={"lg"}>
                    <TabletSettingsButton tabletScreenSize={props.tabletBreakpoints} />
                </Navbar.Section>

            </Navbar>
        </IconContext.Provider >

    )
}

export default TabletNav

/**
        <IconContext.Provider value={{ color: IconBgColor, size: "60%" }}>
            <Transition
                mounted={props.tabletBreakpoints}
                transition="slide-right" duration={800} timingFunction="ease-in-out"
            >
                {(styles) =>

                    <Navbar
                        hiddenBreakpoint={"sm"}
                        fixed
                        p={"xs"}
                        height={"100vh"} width={{ base: 70 }}
                        style={styles}
                        bg={NavBgColor}
                    >

                        <Divider color={NavDividerColor} />

                    </Navbar>

                }
            </Transition>
        </IconContext.Provider>
 */


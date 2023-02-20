import { Divider, Navbar, ScrollArea, useMantineColorScheme } from "@mantine/core";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../../../Shared/colors";
import { desktopNavIconSizes, desktopNavRadius, desktopNavWidthHeight } from "../../../../Shared/sizes";
import { DesktopCartButton } from "../buttons/mainButtons/Cart";
import { DesktopCategories } from "../buttons/mainButtons/Categories";
import { DesktopHome } from "../buttons/mainButtons/Home";
import { DesktopSearch } from "../buttons/mainButtons/Search";
import { DesktopSettingsButton } from "../buttons/mainButtons/Settings";



interface Props {
    desktopBreakpoints: boolean
}


const DesktopNav = (props: Props) => {
    const { colorScheme, } = useMantineColorScheme();


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: desktopNavIconSizes.InnerIconSize
            }}>

            <Navbar
                hiddenBreakpoint={0}
                fixed
                height={desktopNavWidthHeight.height} width={{ base: desktopNavWidthHeight.width }}
                py={"lg"}
                ml={"md"} my={"xl"}

                sx={{
                    borderRadius: desktopNavRadius.navbarBorderRadius,
                    backdropFilter: "blur(2px)",
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                    // alignItems: "center"
                    // overflowY: "scroll", scrollbarWidth: "none", WebkitScrollSnapType: ""

                }}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
            >

                <Navbar.Section my={"lg"}>
                    <DesktopHome />
                </Navbar.Section>

                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <ScrollArea type={"never"} h={"100%"}>
                    <Navbar.Section my={"xl"}  >
                        <DesktopSearch desktopScreenSize={props.desktopBreakpoints} />
                    </Navbar.Section>

                    <Navbar.Section my={"xl"}  >
                        <DesktopCategories desktopScreenSize={props.desktopBreakpoints} />
                    </Navbar.Section>

                    <Navbar.Section my={"xl"} grow >
                        <DesktopCartButton desktopScreenSize={props.desktopBreakpoints} />
                    </Navbar.Section>
                </ScrollArea>


                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <Navbar.Section my={"lg"}>
                    <DesktopSettingsButton desktopScreenSize={props.desktopBreakpoints} />
                </Navbar.Section>

            </Navbar>

        </IconContext.Provider>

    )
}

export default DesktopNav

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


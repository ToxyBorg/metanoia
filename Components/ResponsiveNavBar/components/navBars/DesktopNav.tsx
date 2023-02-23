import { Divider, Navbar, ScrollArea, Stack, Transition, useMantineColorScheme } from "@mantine/core";
import { IconContext } from "react-icons";
import { NavBarColors } from "../../../../Shared/colors";
import { desktopNavIconSizes, desktopNavRadius, desktopNavWidthHeight } from "../../../../Shared/sizes";
import { DesktopCartButton } from "../buttons/mainButtons/Cart";
import { DesktopCategories } from "../buttons/mainButtons/Categories";
import { DesktopContactInfo } from "../buttons/mainButtons/ContactInfo";
import { DesktopHome } from "../buttons/mainButtons/Home";
import { DesktopSearch } from "../buttons/mainButtons/Search";
import { DesktopSettingsButton } from "../buttons/mainButtons/Settings";



interface Props {
    desktopBreakpoints: boolean,
    // showDesktopNavBar: boolean,
}


const DesktopNav = (props: Props) => {
    const { colorScheme, } = useMantineColorScheme();

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: desktopNavIconSizes.InnerIconSize
            }}>

            {/* <Transition
                mounted={props.desktopBreakpoints && props.showDesktopNavBar}
                transition="slide-right" duration={1500}
            >
                {(styles) => */}


            <Navbar
                // style={styles}
                hiddenBreakpoint={0}
                fixed
                w={desktopNavWidthHeight.width}
                height={desktopNavWidthHeight.height}
                top={0}
                px={"auto"}
                py={"lg"}
                ml={"md"}
                my={"auto"}

                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}

                sx={{
                    borderRadius: desktopNavRadius.navbarBorderRadius,
                    backdropFilter: "blur(2px)",
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                    // alignItems: "center"

                }}
            >

                <Navbar.Section my={"lg"}>
                    <DesktopHome />
                </Navbar.Section>

                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <ScrollArea type={"never"} h={"100%"} >
                    <Navbar.Section my={"xl"} grow >
                        <Stack spacing="xl">
                            <DesktopSearch desktopScreenSize={props.desktopBreakpoints} />
                            <DesktopCategories desktopScreenSize={props.desktopBreakpoints} />
                            <DesktopCartButton desktopScreenSize={props.desktopBreakpoints} />
                        </Stack>
                    </Navbar.Section>
                </ScrollArea>

                <Divider my="xs" mx={"auto"} size={"md"} w={"2rem"}
                    color={colorScheme === "dark" ? NavBarColors.navDividerColorDark : NavBarColors.navDividerColorLight}
                />

                <Navbar.Section my={"lg"}>
                    <Stack spacing="md">
                        <DesktopContactInfo desktopScreenSize={props.desktopBreakpoints} />
                        <DesktopSettingsButton desktopScreenSize={props.desktopBreakpoints} />
                    </Stack>

                </Navbar.Section>

            </Navbar>
            {/* }
            </Transition> */}
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


import { ActionIcon, Container, Menu, Transition, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import { NavBarColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { adminOptions, plusIcon } from "../../../Shared/icons";
import { desktopNavRadius } from "../../../Shared/sizes";

interface Props { }

const OptionsButton: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [showAdminOptions, setShowAdminOptions] = useDisclosure(closed)
    const { colorScheme, } = useMantineColorScheme();

    return (
        <Transition
            // mounted={screenSizes == "DESKTOP" && ((xMousePos.x <= 100 || navBarLocked))}
            mounted={showAdminOptions}
            transition="slide-down" duration={800}

        >
            {(styles) =>


                <Menu shadow="md" width={200} >
                    <Menu.Target>
                        <Container
                            pos={"fixed"}
                            top={0}
                            m={"lg"}
                            // w={"fit-content"}
                            style={styles}

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
                            <ActionIcon variant="transparent"
                                w={"100%"} h={"100%"}
                                mx={"auto"}
                                title={adminOptions.name}

                            >
                                <adminOptions.icon />
                            </ActionIcon>
                        </Container>


                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Admin Menu</Menu.Label>
                        <Menu.Item icon={<plusIcon.icon size={14} />}>Settings</Menu.Item>
                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item>Transfer my data</Menu.Item>
                        <Menu.Item color="red">Delete my account</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            }
        </Transition>

    )
}

export default OptionsButton
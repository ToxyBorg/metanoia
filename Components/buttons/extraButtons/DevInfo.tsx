import { ActionIcon, Grid, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { MetanoiaSVG, devDiscord, devGithub, devInstagram, devMail, developerInfo } from "../../../Shared/icons";
import { ModalColors, NavBarColors } from "../../../Shared/colors";
import ResponsiveModalContext from "../../UI/ResponsiveModalContext";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import style from "../../../Shared/css/style";

interface Props {
    version: "Default" | "Settings"
}


const DevInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    const allButtons = [devMail, devInstagram, devDiscord, devGithub]

    return (

        <>

            {props.version == "Default" &&
                <ActionIcon variant="transparent"
                    size={"3.5rem"}
                    title={"Dev Contact Info"}
                    onClick={() => {
                        handlers.toggle()

                    }}
                >

                    <MetanoiaSVG
                        lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                        strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                        name={"Developer Contact Info"}
                        strokeWidth={20}

                    />

                </ ActionIcon>


            }

            {props.version == "Settings" &&
                <ActionIcon
                    bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                    w={"100%"} h={"100%"}

                    onClick={() => {
                        handlers.toggle()
                        // if (props.parent_modal_handlers) {
                        // props.parent_modal_handlers?.toggle()
                        // }
                    }}

                    // mx={"auto"}
                    title={developerInfo.name}

                    variant="outline"
                    radius={"md"}
                    p={"xs"}

                    sx={(theme) => ({
                        // backgroundImage: colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",

                    })}

                    className={style.Animated_Background_Gradient}

                >

                    <Stack align="center" spacing={"xs"} >
                        <developerInfo.icon title={developerInfo.name} style={{ alignSelf: "center", }} />


                        <Text
                            color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                            fz={"clamp(0.85rem, 2vw , 5rem)"}

                        >
                            {developerInfo.name}
                        </Text>

                    </Stack>
                </ActionIcon>
            }

            <ResponsiveModalContext zIndex={250} size={"xl"} responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"DEV CONTACT INFO"}>

                <Grid justify={"space-evenly"}>

                    {allButtons.map(button => {
                        return (
                            <Grid.Col span={6} key={button.name}>

                                <ActionIcon onClick={() => handlers.toggle()}
                                    bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                    w={"100%"} h={"100%"}

                                    title={button.name}
                                    variant="outline"
                                    component={Link} href={button.link!}
                                    radius={"md"}
                                    p={"xs"}

                                    sx={{
                                        border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                                        WebkitBackdropFilter: "blur(2px)",
                                        boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                                    }}

                                    className={style.Animated_Background_Gradient}

                                >
                                    <Stack align="center" spacing={"xs"} >
                                        <button.icon title={button.name} style={{ alignSelf: "center", }} />

                                        <Text
                                            color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                            fz={"clamp(0.85rem, 2vw , 5rem)"}
                                        // mx={"2rem"}
                                        >
                                            {button.name}
                                        </Text>
                                    </Stack>
                                </ActionIcon>


                            </Grid.Col>
                        )
                    })}

                </Grid>

            </ResponsiveModalContext>

        </>


    )
}

export default DevInfo
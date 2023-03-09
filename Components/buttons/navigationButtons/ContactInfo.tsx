"use client"
import { ActionIcon, Center, Grid, Modal, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconContext } from "react-icons";
import { ModalColors } from "../../../Shared/colors";
import { contactInfo, instagram, mail } from "../../../Shared/icons";
import style from "../../../Shared/css/styles.module.css";
import ResponsiveModalContext from "../../UI/ResponsiveModalContext";


export const ContactInfo = () => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    const allButtons = [mail, instagram]
    // const allSizes = getAllSizes[screenSizes]

    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={contactInfo.name}

            >
                <contactInfo.icon title={contactInfo.name} />
            </ActionIcon>

            <ResponsiveModalContext size={"xl"} responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"CONTACT INFO"}>



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




"use client"
import { ActionIcon, Center, Grid, Modal, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { IconContext } from "react-icons";
import { ModalColors, NavBarColors } from "../../../Shared/colors";
import { darkThemeIcon, instagram, lightThemeIcon, mail, navLock, navUnlock, settings } from "../../../Shared/icons";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import style from "../../../Shared/css/styles.module.css";
import NavBarLock from "../extraButtons/NavBarLock";
import { navBarLockedAtom } from "../../../Stores/navBarLockStore";
import ResponsiveModalContext from "../../UI/ResponsiveModalContext";


export const Settings = () => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    const allButtons = [mail, instagram]
    const screenSizes = useAtomValue(screenSizesAtom)


    const [navBarLocked, SetNavBarLocked] = useAtom(navBarLockedAtom)



    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={settings.name}
            >
                <settings.icon title={settings.name} />
            </ActionIcon>


            <ResponsiveModalContext size={"xl"} responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"SETTINGS"}>

                <Grid justify={"space-around"} >

                    <Grid.Col span={6}>
                        <ActionIcon
                            w={"100%"} h={"100%"}
                            bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}

                            variant="outline"
                            radius={"md"}
                            p={"xs"}

                            title="Toggle color scheme"

                            sx={{
                                border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                                // borderRadius: 15,
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                            }}
                            onClick={
                                () => {
                                    toggleColorScheme();
                                }
                            }

                            className={style.Animated_Background_Gradient}

                        >
                            <Stack align="center" spacing={"xs"} >
                                {colorScheme === "dark" ?
                                    <lightThemeIcon.icon title={lightThemeIcon.name} style={{ alignSelf: "center", }} />
                                    : <darkThemeIcon.icon title={darkThemeIcon.name} style={{ alignSelf: "center", }} />}
                                <Text
                                    color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                    fz={"clamp(0.85rem, 2vw , 5rem)"}

                                >
                                    {colorScheme === "dark" ? lightThemeIcon.name : darkThemeIcon.name}
                                </Text>

                            </Stack>
                        </ActionIcon>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <ActionIcon
                            bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                            w={"100%"} h={"100%"}

                            onClick={() => SetNavBarLocked(!navBarLocked)}
                            // mx={"auto"}
                            title={navBarLocked ? navUnlock.name : navLock.name}

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
                                {navBarLocked ?
                                    <navUnlock.icon title={navUnlock.name} style={{ alignSelf: "center", }} /> :
                                    <navLock.icon title={navLock.name} style={{ alignSelf: "center", }} />
                                }

                                <Text
                                    color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                    fz={"clamp(0.85rem, 2vw , 5rem)"}

                                >
                                    {navBarLocked ? navUnlock.name : navLock.name}
                                </Text>

                            </Stack>
                        </ActionIcon>
                    </Grid.Col>

                    {(screenSizes == "MOBILE") && allButtons.map(button => {
                        return (
                            <Grid.Col span={6} key={button.name}>
                                <ActionIcon
                                    w={"100%"} h={"100%"}
                                    bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}

                                    variant="outline"
                                    radius={"md"}
                                    p={"xs"}

                                    sx={{
                                        border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                                        WebkitBackdropFilter: "blur(2px)",
                                        boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                                    }}
                                    title={button.name}
                                    component={Link} href={button.link!}

                                    className={style.Animated_Background_Gradient}

                                >
                                    <Stack align="center" spacing={"xs"} >
                                        <button.icon title={button.name} style={{ alignSelf: "center", }} />

                                        <Text
                                            color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                            fz={"clamp(0.85rem, 2vw , 5rem)"}
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

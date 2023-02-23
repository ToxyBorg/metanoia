"use client"
import { ActionIcon, Grid, Modal, Text, useMantineColorScheme } from "@mantine/core"

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { IconContext } from "react-icons";
import { ModalColors, NavBarColors } from "../../../../../Shared/colors";
import { darkThemeIcon, lightThemeIcon, settings } from "../../../../../Shared/icons";
import { desktopNavIconSizes, desktopNavRadius, mobileNavIconSizes, mobileNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";
// import { screenSizesAtom } from "../../../../../Stores/screenSizesStore";

// interface Props {
//     mobileScreenSize?: boolean,
//     tabletScreenSize?: boolean,
//     desktopScreenSize?: boolean
// }

export const MobileSettingsButton = (mobileScreenSize: { mobileScreenSize?: boolean }) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    // const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const getScreenSize = useAtomValue(screenSizesAtom)

    if (!mobileScreenSize) {
        handlers.close()
    }


    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={mobileNavIconSizes.ActionIconSize}
                sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
                title={settings.name}
            // mx={"auto"}
            >
                <settings.icon title={settings.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="SETTINGS" size={"md"} overlayBlur={3}

                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        borderRadius: 15,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 10,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "1.75rem"
                    }}>

                    <Grid justify={"space-around"}>

                        <Grid.Col span={5} m={"xs"}>

                            <ActionIcon
                                size={50} m={"auto"}
                                bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                variant="outline"
                                // color={colorScheme === "dark" ? 'yellow' : 'blue'}
                                sx={{
                                    borderRadius: 10,
                                    border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
                                }}
                                onClick={
                                    () => {
                                        toggleColorScheme();
                                        // window.location.reload()
                                    }
                                }
                                title="Toggle color scheme"
                            >
                                {colorScheme === "dark" ? <lightThemeIcon.icon title={lightThemeIcon.name} /> : <darkThemeIcon.icon title={darkThemeIcon.name} />}
                            </ActionIcon>


                        </Grid.Col>

                    </Grid>

                </IconContext.Provider>
            </Modal>
        </>
    )
}

export const TabletSettingsButton = (tabletScreenSize: { tabletScreenSize: boolean }) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    // const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const getScreenSize = useAtomValue(screenSizesAtom)

    if (!tabletScreenSize) {
        handlers.close()
    }


    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={settings.name}

            >
                <settings.icon title={settings.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="SETTINGS" size={"md"} overlayBlur={3}

                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        borderRadius: 15,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 10,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "2rem"
                    }}>

                    <Grid justify={"space-around"}>

                        <Grid.Col span={5} m={"xs"} >

                            <ActionIcon
                                size={60} m={"auto"}
                                bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                variant="outline"
                                // color={colorScheme === "dark" ? 'yellow' : 'blue'}
                                sx={{
                                    borderRadius: 10,
                                    border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
                                }}
                                onClick={
                                    () => {
                                        toggleColorScheme();
                                        // window.location.reload()
                                    }
                                }
                                title="Toggle color scheme"
                            >
                                {colorScheme === "dark" ? <lightThemeIcon.icon title={lightThemeIcon.name} /> : <darkThemeIcon.icon title={darkThemeIcon.name} />}
                            </ActionIcon>


                        </Grid.Col>

                    </Grid>

                </IconContext.Provider>
            </Modal>
        </>
    )
}

export const DesktopSettingsButton = (desktopScreenSize: { desktopScreenSize: boolean }) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    // const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const getScreenSize = useAtomValue(screenSizesAtom)

    if (!desktopScreenSize) {
        handlers.close()
    }


    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={desktopNavIconSizes.ActionIconSize}
                sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={settings.name}
            // bg={colorScheme === "dark" ? NavBarColors.iconsBackgroundColorDark : NavBarColors.iconsBackgroundColorLight}
            >
                <settings.icon title={settings.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="SETTINGS" size={"md"} overlayBlur={3}

                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        borderRadius: 15,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 10,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "2rem"
                    }}>

                    <Grid justify={"space-around"}>

                        <Grid.Col span={5} m={"xs"} >

                            <ActionIcon
                                size={60} m={"auto"}
                                bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                variant="outline"
                                // color={colorScheme === "dark" ? 'yellow' : 'blue'}
                                sx={{
                                    borderRadius: 10,
                                    border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
                                }}
                                onClick={
                                    () => {
                                        toggleColorScheme();
                                        // window.location.reload()
                                    }
                                }
                                title={colorScheme === "dark" ? "Toggle Light Theme" : "Toggle Dark Theme"}
                            >
                                {colorScheme === "dark" ? <lightThemeIcon.icon /> : <darkThemeIcon.icon />}
                            </ActionIcon>

                        </Grid.Col>

                    </Grid>

                </IconContext.Provider>
            </Modal>
        </>
    )
}

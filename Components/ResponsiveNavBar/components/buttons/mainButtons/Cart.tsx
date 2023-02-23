"use client"
import { ActionIcon, Modal, Text, useMantineColorScheme } from "@mantine/core"

import { cart } from "../../../../../Shared/icons"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { desktopNavIconSizes, desktopNavRadius, mobileNavIconSizes, mobileNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";
import { ModalColors } from "../../../../../Shared/colors";
import { IconContext } from "react-icons";
// import { useAtomValue } from "jotai";
// import { screenSizesAtom } from "../../../../../Stores/screenSizesStore";

// interface Props {
//     mobileScreenSize?: boolean,
//     tabletScreenSize?: boolean,
// }

export const MobileCartButton = (mobileScreenSize: { mobileScreenSize?: boolean }) => {

    const [opened, handlers] = useDisclosure(false);

    const { colorScheme, } = useMantineColorScheme();


    if (!mobileScreenSize) {
        handlers.close()
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={mobileNavIconSizes.ActionIconSize}
                sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
                title={cart.name}
            >
                <cart.icon title={cart.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CART" size={"md"} overlayBlur={3}

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

                    <Text>Cart</Text>

                </IconContext.Provider>
            </Modal>
        </>
    )
}

export const TabletCartButton = (tabletScreenSize: { tabletScreenSize: boolean }) => {

    const [opened, handlers] = useDisclosure(false);

    const { colorScheme, } = useMantineColorScheme();


    if (!tabletScreenSize) {
        handlers.close()
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={cart.name}
            >
                <cart.icon title={cart.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CART" size={"md"} overlayBlur={3}

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

                    <Text>Cart</Text>


                </IconContext.Provider>
            </Modal>
        </>
    )
}

export const DesktopCartButton = (desktopScreenSize: { desktopScreenSize: boolean }) => {

    const [opened, handlers] = useDisclosure(false);

    const { colorScheme, } = useMantineColorScheme();


    if (!desktopScreenSize) {
        handlers.close()
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={desktopNavIconSizes.ActionIconSize}
                sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={cart.name}
            >
                <cart.icon title={cart.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CART" size={"md"} overlayBlur={3}

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

                    <Text>Cart</Text>

                </IconContext.Provider>
            </Modal>
        </>
    )
}
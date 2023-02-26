"use client"
import { ActionIcon, Modal, Text, useMantineColorScheme } from "@mantine/core"

import { cart } from "../../../Shared/icons"
import { useDisclosure } from "@mantine/hooks";
import { ModalColors } from "../../../Shared/colors";
import { IconContext } from "react-icons";
import { useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import style from "../../../Shared/css/styles.module.css";


export const Cart = () => {

    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    // const screenSizes = useAtomValue(screenSizesAtom)
    // const allSizes = getAllSizes[screenSizes]

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}

                title={cart.name}
            >
                <cart.icon title={cart.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CART" radius={"md"}

                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 7,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto",

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },
                    title: {
                        fontSize: "clamp(0.85rem, 2vw , 5rem)"
                    }

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "clamp(6vw, 6rem , 15vw)"
                    }}>

                    <Text>Cart</Text>

                </IconContext.Provider>
            </Modal>
        </>
    )
}


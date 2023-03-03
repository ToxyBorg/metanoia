import { ActionIcon, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { CardContainerColors } from "../../../Shared/colors";
import { cartEmpty } from "../../../Shared/icons";
import { cartItemsDataAtom, cartType, SingleCartItemType } from "../../../Stores/cartStore";
import style from "../../../Shared/css/styles.module.css";

interface Props {
    // cartItemsDataAtomValue: cartType,
    // info: SingleCartItemType,
}

const ClearCart: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();
    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)

    return (
        <ActionIcon variant="transparent" title={cartEmpty.name}
            onClick={

                () => {

                    cartItemsDataAtomSetter([])


                    const Message = () => {

                        return (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Text fw={"bolder"}>
                                We have emptied your cart
                            </Text>
                        )
                    }



                    showNotification({

                        color: "black",
                        radius: "md",
                        title: 'Cart notification',
                        message: <b>We have emptied your cart</b>,

                        styles: (theme) => ({


                            root: {
                                background: colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight,
                                backgroundSize: "300% 300%",
                                animation: `${style.AnimateBG} 7s ease infinite`,

                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                            },

                            title: {

                                background: colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight,
                                backgroundSize: "300% 300%",
                                animation: `${style.AnimateBG} 7s ease infinite`,


                                // border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                padding: "0.5rem",
                                borderRadius: 5,

                                fontWeight: "bolder",
                                color: colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight
                            },
                            description: {
                                fontStyle: "italic",

                                color: colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight
                            },
                            closeButton: {
                                color: colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight,

                                '&:hover': {
                                    backgroundColor: "black"
                                },
                            },
                        }),

                    })

                }

            }
        >
            <cartEmpty.icon />
        </ActionIcon>
    )
}

export default ClearCart
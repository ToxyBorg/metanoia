import { cartRemove } from "../../../Shared/icons";

import { ActionIcon, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { NextComponentType, NextPageContext } from "next";
import { CardContainerColors } from "../../../Shared/colors";
import { cartAdd } from "../../../Shared/icons";
import { cartItemsDataAtom, cartType, SingleCartItemType } from "../../../Stores/cartStore";
import style from "../../../Shared/css/styles.module.css";
import { useAtom, useSetAtom, WritableAtom } from "jotai";

interface Props {
    cartItemsDataAtomValue: cartType,
    info: SingleCartItemType,
}

const RemoveFromCart: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)

    return (
        <ActionIcon variant="transparent" title={cartRemove.name}
            onClick={
                () => {

                    const newArr = props.cartItemsDataAtomValue.map(obj => {
                        if (obj.item.item_id === props.info.item.item_id) {

                            return {
                                ...obj,
                                itemNumber: obj.itemNumber > 0 ? obj.itemNumber - 1 : obj.itemNumber - 0
                            };
                        }
                        return obj;
                    });

                    if (props.info.itemNumber <= 1) {
                        const indexOfObject = newArr.findIndex((object) => {
                            return object.id === props.info.id;
                        });
                        if (indexOfObject !== -1) {
                            newArr.splice(indexOfObject, 1);
                        }
                    }
                    cartItemsDataAtomSetter(newArr)


                    const Message = () => {

                        return (
                            <Text>
                                We have removed one
                                <Text fw={"bolder"}>
                                    {props.info.item.title}
                                </Text>
                                from your cart.
                            </Text>
                        )
                    }

                    props.info.itemNumber > 0 && showNotification({

                        color: "red",
                        radius: "md",
                        title: 'Cart notification',
                        message: <p>We have removed one <b>{props.info.item.title}</b> from your cart.</p>,

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
                                    backgroundColor: "red"
                                },
                            },
                        }),

                    });


                }
            }
        >
            <cartRemove.icon />
        </ActionIcon>
    )
}

export default RemoveFromCart
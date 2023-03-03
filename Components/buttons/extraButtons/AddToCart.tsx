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

const AddToCart: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)
    // const [cartItemsDataAtomValue, cartItemsDataAtomSetter] = useAtom(cartItemsDataAtom)



    return (
        <ActionIcon variant="transparent" title={cartAdd.name}
            onClick={

                () => {

                    const newArr = props.cartItemsDataAtomValue.map(obj => {
                        if (obj.item.item_id === props.info.id) {

                            return {
                                ...obj,
                                itemNumber: obj.itemNumber != props.info.item.stock ? obj.itemNumber + 1 : obj.itemNumber + 0
                            };
                        }
                        return obj;
                    });
                    cartItemsDataAtomSetter(newArr)


                    const Message = () => {

                        return (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Text>
                                We have added one
                                <Text fw={"bolder"}>
                                    {props.info.item.title}
                                </Text>
                                to your cart. Go check it out!
                            </Text>
                        )
                    }



                    props.info.item.stock > props.info.itemNumber && showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Cart notification',
                        message: <p>We have added one <b>{props.info.item.title}</b> to your cart. Go check it out!</p>,

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
                                    backgroundColor: "green"
                                },
                            },
                        }),

                    })

                }

            }
        >
            <cartAdd.icon />
        </ActionIcon>
    )
}

export default AddToCart
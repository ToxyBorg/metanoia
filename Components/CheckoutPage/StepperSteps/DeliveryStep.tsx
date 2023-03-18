import { ActionIcon, Group, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { Database } from "../../../services/supabase/lib/database.types";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext } from "../../../Shared/icons";
import { delivery, deliveryAtom, in_person_delivery, in_person_deliveryAtom, shipping_delivery, shipping_deliveryAtom } from "../../../Stores/deliveryInfoStore";
import In_person_delivery from "../stepperComponents/DeliveryInfo/In_person_delivery";
import Shipping_delivery from "../stepperComponents/DeliveryInfo/Shipping_delivery";

interface Props {
    nextStep: () => void
}

const DeliveryStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const [visible, setVisible] = useState<delivery>();

    const in_person_deliveryAtomValue = useAtomValue(in_person_deliveryAtom)
    const shipping_deliveryAtomValue = useAtomValue(shipping_deliveryAtom)

    const deliveryAtomSetter = useSetAtom(deliveryAtom)


    return (
        <Stack>
            <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 'sm', cols: 1, spacing: 'md' },
                ]}>

                <In_person_delivery visible={visible} setVisible={setVisible} />
                <Shipping_delivery visible={visible} setVisible={setVisible} />

            </SimpleGrid>


            <ActionIcon
                variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
                mx={"auto"} mb={"sm"} py={"xs"} radius={"md"} px={"lg"}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                className={style.Animated_Background_Gradient}
                onClick={() => {

                    if (visible == "in-person") {
                        let required_keys: keyof in_person_delivery['required']

                        let fieldsHaveBeenFilled: boolean = true
                        for (required_keys in in_person_deliveryAtomValue.required) {
                            if (in_person_deliveryAtomValue.required[required_keys] == null
                                || in_person_deliveryAtomValue.required[required_keys] == undefined
                                || in_person_deliveryAtomValue.required[required_keys].length <= 0) {
                                fieldsHaveBeenFilled = false
                            }
                        }

                        // console.log("in-person delivery: ", in_person_deliveryAtomValue)

                        if (fieldsHaveBeenFilled == false) {

                            showNotification({

                                color: "red",
                                radius: "md",
                                title: "In person delivery Error",
                                message: <p>One or More fields have been left blank!</p>,
                                // icon: <errorIcon.icon />,

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

                            })
                        }
                        else {

                            // deliveryAtomSetter({
                            //     delivery: visible,
                            //     // data: in_person_deliveryAtomValue
                            // })
                            deliveryAtomSetter(visible)
                            props.nextStep()
                        }

                    }

                    else if (visible == "shipping") {

                        let required_keys: keyof shipping_delivery['required']

                        let fieldsHaveBeenFilled: boolean = true
                        for (required_keys in shipping_deliveryAtomValue.required) {
                            if (shipping_deliveryAtomValue.required[required_keys] == null
                                || shipping_deliveryAtomValue.required[required_keys] == undefined
                                || shipping_deliveryAtomValue.required[required_keys].length <= 0) {
                                fieldsHaveBeenFilled = false
                            }
                        }

                        // console.log("shipping delivery: ", shipping_deliveryAtomValue)

                        if (fieldsHaveBeenFilled == false) {

                            showNotification({

                                color: "red",
                                radius: "md",
                                title: "Shipping delivery Error",
                                message: <p>One or More fields have been left blank!</p>,
                                // icon: <errorIcon.icon />,

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

                            })
                        }
                        else {
                            // deliveryAtomSetter({
                            //     delivery: visible,
                            //     // data: shipping_deliveryAtomValue
                            // })
                            deliveryAtomSetter(visible)
                            props.nextStep()
                        }

                    }

                }}
                sx={{
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
            >
                <Group>
                    <arrowNext.icon />
                    <Text size={"md"}
                        color={colorScheme === "dark"
                            ? StepperColors.iconsLineColorDark
                            : StepperColors.iconsLineColorLight
                        }
                    >
                        Confirm your delivery
                    </Text>
                </Group>
            </ActionIcon>


        </Stack>
    )
}

export default DeliveryStep

////////////////////////////////////////////////////////////////////
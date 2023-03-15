import { ActionIcon, Button, Center, Group, LoadingOverlay, PinInput, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { browser } from "process";
import { useState } from "react";
import { useSupabase } from "../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { arrowNext } from "../../../../Shared/icons";
import { cartItemsDataAtom } from "../../../../Stores/cartStore";
import { deliveryAtom, in_person_deliveryAtom, shipping_deliveryAtom } from "../../../../Stores/deliveryInfoStore";
import { orderItemsDataAtom } from "../../../../Stores/orderStore";
import { paymentMethodAtom } from "../../../../Stores/paymentMethodStore";

interface Props {
    nextStep: () => void
    email: string
    pinOpened: boolean
}

const ValidatePin: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const orderItemsDataAtomValue = useAtomValue(orderItemsDataAtom)
    const deliveryAtomValue = useAtomValue(deliveryAtom)
    const in_person_deliveryAtomValue = useAtomValue(in_person_deliveryAtom)
    const shipping_deliveryAtomValue = useAtomValue(shipping_deliveryAtom)
    const paymentMethodAtomValue = useAtomValue(paymentMethodAtom)

    const { colorScheme, } = useMantineColorScheme();

    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);


    const [tokenValue, setTokenValue] = useState('');



    const { supabase, } = useSupabase()

    const handleEmailPin = async () => {


        const { data: magicLinkTokenData, error: magicLinkTokenError } = await supabase.auth.verifyOtp({
            email: props.email,
            token: tokenValue,
            type: "magiclink"
        })

        if (magicLinkTokenError) {


            const { data: signUpTokenData, error: signUpTokenError } = await supabase.auth.verifyOtp({
                email: props.email,
                token: tokenValue,
                type: "signup"
            })

            if (signUpTokenError) {

                showNotification({

                    color: "red",
                    radius: "md",
                    title: 'Pin Confirmation Error',
                    message: <p>The pin entered is wrong, expired or you got disconnected. Try again!</p>,
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
                loadingOverlayVisibleHandlers.close()

            } else {

                showNotification({

                    color: "green",
                    radius: "md",
                    title: 'Pin Confirmation Accepted',
                    message: <p>Email confirmed</p>,
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
                                backgroundColor: "green"
                            },
                        },
                    }),

                })
                loadingOverlayVisibleHandlers.close()

                const { data, error: insertError } = await supabase
                    .from('orders')
                    .insert([
                        {
                            items: orderItemsDataAtomValue,
                            email: props.email,
                            delivery: deliveryAtomValue,
                            payment: paymentMethodAtomValue,
                            in_person_delivery_info: in_person_deliveryAtomValue,
                            shipping_delivery_info: shipping_deliveryAtomValue
                        },
                    ])

                if (insertError) {
                    // console.log('signUpTokenError insertError : ', insertError)
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: 'Order Confirmation Error',
                        message: <p>Your order could not be uploaded to our servers. Please try again!</p>,
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

                } else {

                    const { error } = await supabase.auth.signOut()

                    props.nextStep()
                }
            }


        }
        else {
            showNotification({

                color: "green",
                radius: "md",
                title: 'Pin Confirmation Accepted',
                message: <p>Email confirmed</p>,
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
                            backgroundColor: "green"
                        },
                    },
                }),

            })
            loadingOverlayVisibleHandlers.close()

            const { data, error: insertError } = await supabase
                .from('orders')
                .insert([
                    {
                        items: orderItemsDataAtomValue,
                        email: props.email,
                        delivery: deliveryAtomValue,
                        payment: paymentMethodAtomValue,
                        in_person_delivery_info: in_person_deliveryAtomValue,
                        shipping_delivery_info: shipping_deliveryAtomValue
                    },
                ])

            if (insertError) {
                // console.log('magicLinkTokenError insertError : ', insertError)

                showNotification({

                    color: "red",
                    radius: "md",
                    title: 'Order Confirmation Error',
                    message: <p>Your order could not be uploaded to our servers. Please try again!</p>,
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

            } else {

                const { error } = await supabase.auth.signOut()

                props.nextStep()
            }

        }
    }


    return (
        <Center>
            <Transition mounted={props.pinOpened} transition="slide-down" duration={400} timingFunction="ease">
                {(styles) =>

                    <Stack
                        style={styles}
                        sx={(theme) => ({
                            maxWidth: "1500px",
                            border: `2px solid ${theme.colorScheme === "dark"
                                ? CardContainerColors.borderColorDark
                                : CardContainerColors.borderColorLight}`,
                            borderRadius: 15,
                            overflow: "hidden",
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        })}

                        bg={colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight
                        }

                        className={style.Animated_Background_Gradient}
                        p={"xl"}
                        pos={"relative"}

                    >
                        <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} />


                        <PinInput
                            length={6}
                            oneTimeCode
                            type="number"
                            mt="md"
                            required
                            onChange={(value) => { setTokenValue(value) }}
                        // sx={{
                        //     WebkitBackdropFilter: "blur(2px)",
                        //     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        // }}
                        />

                        <Transition mounted={tokenValue.length == 6} transition="slide-down" duration={400} timingFunction="ease">
                            {(styles) =>

                                <ActionIcon
                                    style={styles}
                                    variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
                                    mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                                    className={style.Animated_Background_Gradient}
                                    onClick={() => {
                                        loadingOverlayVisibleHandlers.open()
                                        handleEmailPin()
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
                                            Verify Pin
                                        </Text>
                                    </Group>
                                </ActionIcon>

                                // <Button
                                //     style={styles}

                                //     onClick={() => {
                                //         loadingOverlayVisibleHandlers.open()
                                //         handleEmailPin()
                                //     }}
                                // >
                                //     Verify Pin
                                // </Button>

                            }
                        </Transition>

                    </Stack>}
            </Transition>
        </Center>



    )
}

export default ValidatePin
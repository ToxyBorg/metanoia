import { ActionIcon, Center, Group, LoadingOverlay, PinInput, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { arrowNext } from "../../../../../Shared/icons";
import { currentSessionUserIsAdmin } from "../../../../../Stores/adminSpecialButtonsStore";

interface Props {
    email: string
    pinOpened: boolean
}

const AdminLoginPinConfirmation: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {



    const { colorScheme, } = useMantineColorScheme();

    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);
    const currentSessionUserIsAdminSetter = useSetAtom(currentSessionUserIsAdmin)


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

                if (signUpTokenData.user !== null) {
                    if (process.env.NEXT_PUBLIC_ADMIN_EMAILS) {

                        const LIST = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS);

                        if (Array.isArray(LIST)) {
                            if (LIST.includes(signUpTokenData.user.email)) {
                                currentSessionUserIsAdminSetter(true)
                            }
                        }
                    }
                } else {
                    currentSessionUserIsAdminSetter(false)
                }

                loadingOverlayVisibleHandlers.close()
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
            if (magicLinkTokenData.user !== null) {
                if (process.env.NEXT_PUBLIC_ADMIN_EMAILS) {

                    const LIST = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS);

                    if (Array.isArray(LIST)) {
                        if (LIST.includes(magicLinkTokenData.user.email)) {
                            currentSessionUserIsAdminSetter(true)
                        }
                    }
                }
            } else {
                currentSessionUserIsAdminSetter(false)
            }
            loadingOverlayVisibleHandlers.close()
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
                        // p={"xl"}
                        pos={"relative"}


                    >
                        <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} />


                        <PinInput
                            styles={{
                                input: {
                                    // margin: "0.5rem"
                                    height: "2rem"
                                }
                            }}
                            size={"fit"}
                            maw={"20rem"}

                            length={6}
                            oneTimeCode
                            type="number"
                            // m={0}
                            m={"md"}
                            // mt="md"
                            required
                            spacing={"0.1rem"}
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
                                    mx={"auto"} mb={"xl"} py={"xs"} radius={"md"} px={"lg"}
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
                            }
                        </Transition>

                    </Stack>
                }
            </Transition>
        </Center>



    )
}

export default AdminLoginPinConfirmation
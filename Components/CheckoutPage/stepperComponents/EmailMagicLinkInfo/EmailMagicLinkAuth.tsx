import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../Context/SupabaseWrapper/supabase-provider";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { ActionIcon, Button, Center, Container, createStyles, Group, LoadingOverlay, PinInput, rem, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { ReactNode, useState } from "react";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../Shared/colors";
import { arrowDown, emailAtSymbol } from "../../../../Shared/icons";
import { emailAtom, emailSchema } from "../../../../Stores/orderEmailStore";
import { useAtom, useAtomValue } from "jotai";
import ValidatePin from "./ValidatePin";
import style from "../../../../Shared/css/style";
import { useDisclosure, useTimeout } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

interface Props {
    nextStep: () => void
}

const EmailMagicLinkAuth: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { start, clear } = useTimeout(() => loadingOverlayVisibleHandlers.close(), 60000);

    const { colorScheme, } = useMantineColorScheme();

    const { supabase, } = useSupabase()
    const emailAtomValue = useAtomValue(emailAtom)
    const [pinOpened, pinHandlers] = useDisclosure(false);
    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);

    const signInWithEmail = async () => {
        const { data: magicLinkData, error: magicLinkError } = await supabase.auth.signInWithOtp({
            email: emailAtomValue.value,
        })

        if (magicLinkError) {
            showNotification({

                color: "red",
                radius: "md",
                title: 'Email Confirmation Error',
                message: <p>The email entered is wrong or you got disconnected. Try again!</p>,
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
            pinHandlers.close()
            // loadingOverlayVisibleHandlers.close()

        }
        else {
            showNotification({

                color: "green",
                radius: "md",
                title: 'We have sent you a confirmation pin to your email address',
                message: <p>Please enter the pin and click on the confirmation button</p>,
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
            loadingOverlayVisibleHandlers.open()
            start()
            pinHandlers.open()
            // loadingOverlayVisibleHandlers.close()
        }

    }


    return (
        <Container
            sx={(theme) => ({
                maxWidth: "1500px",
                border: `2px solid ${theme.colorScheme === "dark"
                    ? CardContainerColors.borderColorDark
                    : CardContainerColors.borderColorLight}`,
                borderRadius: 15,
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            })}

            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }

            className={style.Animated_Background_Gradient}

            p={"xl"}
        >

            <Stack>

                <Stack
                    sx={(theme) => ({
                        maxWidth: "1500px",
                        border: `2px solid ${theme.colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        borderRadius: 15,
                        overflow: "hidden",
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        // textAlign: "center"

                    })}

                    bg={colorScheme === "dark"
                        ? CardContainerColors.backgroundColorDark
                        : CardContainerColors.backgroundColorLight
                    }

                    className={style.Animated_Background_Gradient}
                    p={"xl"}
                    pos={"relative"}

                >
                    <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} zIndex={3} />

                    <FloatingLabelInput pinHandlers={pinHandlers} loadingOverlayVisible={loadingOverlayVisible} />

                    <ActionIcon
                        disabled={loadingOverlayVisible}
                        variant="outline" title={arrowDown.name} w={"fit-content"} h={"100%"}
                        mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                        bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                        className={style.Animated_Background_Gradient}
                        onClick={() => {
                            if (emailAtomValue.isValid && emailAtomValue.value.length > 0) {
                                // loadingOverlayVisibleHandlers.open()
                                // emailResendAtomSetter(60)
                                signInWithEmail()
                            }
                            else {
                                showNotification({

                                    color: "red",
                                    radius: "md",
                                    title: 'Email Error',
                                    message: <p>The email entered is not a valid one. Try again!</p>,
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
                        }}
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <Group>
                            <arrowDown.icon />
                            <Text size={"md"}
                                color={colorScheme === "dark"
                                    ? StepperColors.iconsLineColorDark
                                    : StepperColors.iconsLineColorLight
                                }
                            >
                                Send a pin to your email
                            </Text>
                        </Group>
                    </ActionIcon>

                    {loadingOverlayVisible &&
                        <Center>

                            <Text fw={"bolder"} pos={"absolute"}
                                color={colorScheme === "dark"
                                    ? StepperColors.iconsLineColorDark
                                    : "black"
                                }
                                sx={{
                                    zIndex: 3,
                                    overflowWrap: "break-word",
                                }}
                            >
                                You can resend a Pin in 60 seconds. Please wait.
                            </Text>
                        </Center>
                    }
                </Stack>



                <ValidatePin
                    email={emailAtomValue.value}
                    pinOpened={pinOpened && emailAtomValue.isValid && emailAtomValue.value.length > 1}
                    nextStep={props.nextStep}
                />

            </Stack>

        </Container>

    )
}

export default EmailMagicLinkAuth


//////////////////////////////////////////////////////////////////////////


const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === "dark"
                ? CardContainerColors.textColorDark
                : CardContainerColors.textColorLight

            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[6],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: !floating ? 'transparent' : undefined,
        },
    },
}));

interface InputProps {
    pinHandlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },
    loadingOverlayVisible: boolean
}
export function FloatingLabelInput(inputProps: InputProps) {
    const [focused, setFocused] = useState(false);
    const [emailAtomValue, emailAtomSetter] = useAtom(emailAtom)

    const { classes } = useStyles({ floating: emailAtomValue.value.trim().length !== 0 || focused });
    const { colorScheme, } = useMantineColorScheme();


    return (
        <TextInput
            disabled={inputProps.loadingOverlayVisible}
            rightSection={
                <emailAtSymbol.icon
                    title={emailAtSymbol.name}
                    color={colorScheme === "dark"
                        ? StepperColors.iconsLineColorInputFieldDark
                        : StepperColors.iconsLineColorInputFieldLight
                    }
                />
            }
            label={"Confirm your order"}
            placeholder={"Enter your email"}
            required
            classNames={classes}
            value={emailAtomValue.value}

            onChange={(e) => {
                emailAtomSetter(e.target.value)
                inputProps.pinHandlers.close()
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"

            // error={!emailSchema.isValidSync(emailAtomValue.value)}
            error={!emailAtomValue.isValid}

            sx={{
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
        />
    );
}
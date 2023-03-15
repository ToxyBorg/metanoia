import { ActionIcon, Center, Container, createStyles, Group, LoadingOverlay, rem, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useTimeout } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminLogout, arrowDown, emailAtSymbol } from "../../../../../Shared/icons";
import { adminEmailAtom } from "../../../../../Stores/adminEmailStore";
import { currentSessionUserIsAdmin } from "../../../../../Stores/adminSpecialButtonsStore";
import AdminLoginPinConfirmation from "./AdminLoginPinConfirmation";

interface Props { }

const AdminLoginEmailConfirmation: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    // const { start, clear } = useTimeout(() => loadingOverlayVisibleHandlers.close(), 60000);

    const { colorScheme, } = useMantineColorScheme();

    const { supabase, } = useSupabase()
    const adminEmailAtomValue = useAtomValue(adminEmailAtom)
    const [pinOpened, pinHandlers] = useDisclosure(false);
    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);

    const [currentSessionUserIsAdminValue, currentSessionUserIsAdminSetter] = useAtom(currentSessionUserIsAdmin)

    const signInWithEmail = async () => {
        const { data: magicLinkData, error: magicLinkError } = await supabase.auth.signInWithOtp({
            email: adminEmailAtomValue.value,
        })

        if (magicLinkError) {
            showNotification({

                color: "red",
                radius: "md",
                title: 'Email Confirmation Error',
                message: <p>Connection error. Try again!</p>,
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
            loadingOverlayVisibleHandlers.close()
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
            loadingOverlayVisibleHandlers.close()
            // start()
            pinHandlers.open()
            // loadingOverlayVisibleHandlers.close()
        }
    }

    const handleAdminLogout = async () => {
        // loadingOverlayVisibleHandlers.open()

        const { error } = await supabase.auth.signOut()


        if (error) {
            showNotification({

                color: "red",
                radius: "md",
                title: 'Logout Error',
                message: <p>Could not Log you out. Try again!</p>,
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
        }
        else {
            currentSessionUserIsAdminSetter(false)
            loadingOverlayVisibleHandlers.close()
        }
    }

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                size: "1.5rem"
            }}>

            {!currentSessionUserIsAdminValue &&
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
                                    if (adminEmailAtomValue.isValid && adminEmailAtomValue.value.length > 0) {

                                        if (process.env.NEXT_PUBLIC_ADMIN_EMAILS) {

                                            const LIST = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS);


                                            if (Array.isArray(LIST)) {
                                                if (LIST.includes(adminEmailAtomValue.value)) {
                                                    loadingOverlayVisibleHandlers.open()
                                                    signInWithEmail()
                                                }
                                                else if (!LIST.includes(adminEmailAtomValue.value)) {
                                                    pinHandlers.close()
                                                    showNotification({

                                                        color: "red",
                                                        radius: "md",
                                                        title: 'Email Error',
                                                        message: <p>Admin email is not valid!</p>,

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
                                            }

                                            // signInWithEmail()


                                        }
                                        else if (process.env.NEXT_PUBLIC_ADMIN_EMAILS == undefined) {
                                            showNotification({

                                                color: "red",
                                                radius: "md",
                                                title: 'Email Error',
                                                message: <p>Admin emails have not been initiated. Contact an admin to fix this!</p>,

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



                        <AdminLoginPinConfirmation
                            email={adminEmailAtomValue.value}
                            pinOpened={pinOpened && adminEmailAtomValue.isValid && adminEmailAtomValue.value.length > 1}
                        />

                    </Stack>

                </Container>
            }

            {/** /////////////////////////////////////////////////////////////////////////////// */}


            {currentSessionUserIsAdminValue &&
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
                    <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} zIndex={3} />

                    <ActionIcon
                        disabled={loadingOverlayVisible}
                        variant="outline" title={adminLogout.name} w={"fit-content"} h={"100%"}
                        mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                        bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                        className={style.Animated_Background_Gradient}

                        onClick={() => {
                            loadingOverlayVisibleHandlers.open()
                            handleAdminLogout()
                        }}
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <Stack spacing={"xl"}>
                            <adminLogout.icon size={"5rem"} />
                            <Text size={"xl"} sx={{ alignSelf: "center" }}
                                color={colorScheme === "dark"
                                    ? StepperColors.iconsLineColorDark
                                    : StepperColors.iconsLineColorLight
                                }
                            >
                                Logout
                            </Text>
                        </Stack>
                    </ActionIcon>

                </Container>

            }




        </IconContext.Provider>

    )
}

export default AdminLoginEmailConfirmation


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
    const [adminEmailAtomValue, adminEmailAtomSetter] = useAtom(adminEmailAtom)

    const { classes } = useStyles({ floating: adminEmailAtomValue.value.trim().length !== 0 || focused });
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
            label={"Admin Login"}
            placeholder={"Enter your email"}
            required
            classNames={classes}
            value={adminEmailAtomValue.value}

            onChange={(e) => {
                adminEmailAtomSetter(e.target.value)
                inputProps.pinHandlers.close()
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"

            // error={!emailSchema.isValidSync(emailAtomValue.value)}
            error={!adminEmailAtomValue.isValid}

            sx={{
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
        />
    );
}
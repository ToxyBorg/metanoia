import { ActionIcon, Button, Loader, LoadingOverlay, Popover, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors } from "../../../../../../Shared/colors";
import style from "../../../../../../Shared/css/style";
import { SingleOrderData } from "../../../../../../Stores/orderStore";
import { useState } from "react";
import { IconContext } from "react-icons";
import { adminDeleteOrder } from "../../../../../../Shared/icons";

interface Props {
    SingleOrderData: SingleOrderData
}

const DeleteOrder: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();
    const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);

    const { supabase, } = useSupabase()


    const handleOrderDeletion = async () => {

        setLoadingOverlayVisible(true)
        const { data, error } = await supabase
            .from('orders')
            .delete()
            .eq('order_id', props.SingleOrderData.order_id)

        if (error) {
            showNotification({

                color: "red",
                radius: "md",
                title: 'Order Deletion Error',
                message: <p>Order could not be deleted. Please try again!</p>,
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
            setLoadingOverlayVisible(false)

        }
        else {
            showNotification({

                color: "green",
                radius: "md",
                title: 'Order Deletion Accepted',
                message: <p>Order was successfully deleted from our servers.</p>,
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
            setLoadingOverlayVisible(false)

        }

    }
    return (
        <IconContext.Provider
            value={{
                // color: colorScheme === "dark"
                //     ? CardContainerColors.iconsLineColorDark
                //     : CardContainerColors.iconsLineColorLight,

                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,

                size: "1.5rem"
            }}
        >

            <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                <Popover.Target>
                    <ActionIcon
                        // loading={loadingOverlayVisible}
                        disabled={loadingOverlayVisible}
                        variant="outline" title={adminDeleteOrder.name} w={"fit-content"} h={"fit-content"}
                        // mx={"auto"}
                        py={"0.5rem"} radius={"md"} px={"0.5rem"}
                        bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                        className={style.Animated_Background_Gradient}

                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >

                        <adminDeleteOrder.icon />

                        <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} zIndex={2} loader={<Loader color="pink" size="xs" />} />

                    </ActionIcon>
                </Popover.Target>

                <Popover.Dropdown
                    bg={colorScheme === "dark"
                        ? CardContainerColors.backgroundColorDark
                        : CardContainerColors.backgroundColorLight
                    }
                    className={style.Animated_Background_Gradient}

                >
                    <Stack>

                        <Text size="sm"
                            color={
                                colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight
                            }
                        >
                            ARE YOU SURE?
                        </Text>

                        <Button color="red" radius="md" uppercase sx={{ alignContent: "center" }}
                            onClick={() => {

                                handleOrderDeletion()

                            }}
                        >
                            yes
                        </Button>
                    </Stack>

                </Popover.Dropdown>
            </Popover>
            {/* </div> */}

        </IconContext.Provider>
    )
}

export default DeleteOrder
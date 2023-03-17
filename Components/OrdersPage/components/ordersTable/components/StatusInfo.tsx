import type { NextComponentType, NextPageContext } from "next";
import { OrderStatus, SingleOrderData } from "../../../../../Stores/orderStore";
import { Loader, LoadingOverlay, Select, createStyles, rem, useMantineColorScheme } from "@mantine/core";
import { CardContainerColors } from "../../../../../Shared/colors";
import { useState } from "react";
import style from "../../../../../Shared/css/style";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { showNotification } from "@mantine/notifications";

interface Props {
    SingleOrderData: SingleOrderData
}

const StatusInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { supabase, } = useSupabase()


    const handleStatusChange = async () => {

        setLoadingOverlayVisible(true)
        const { data, error } = await supabase
            .from('orders')
            .update({ 'status': searchValue })
            .eq('order_id', props.SingleOrderData.order_id)

        if (error) {
            showNotification({

                color: "red",
                radius: "md",
                title: 'Order Status Error',
                message: <p>Order status could not be updated. Please try again!</p>,
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
                title: 'Order Status Change Accepted',
                message: <p>Order status change has been updated in our servers.</p>,
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
    const { colorScheme, } = useMantineColorScheme();



    const [searchValue, onSearchChange] = useState(props.SingleOrderData.status);

    const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);
    // const [focused, setFocused] = useState(false);
    // const { classes } = useStyles({ floating: searchValue!.trim().length !== 0 || focused });
    return (

        <div style={{ position: "relative" }}>
            <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} zIndex={2} loader={<Loader color="pink" size="xs" />} />
            <Select

                disabled={loadingOverlayVisible}
                // classNames={classes}
                // onFocus={() => setFocused(true)}
                // onBlur={() => setFocused(false)}

                dropdownPosition={"flip"}
                // required
                // label="Category"
                placeholder="Pick one"
                onChange={(event: OrderStatus) => {

                    //   const newArr = adminAddItemAtomValue

                    //   newArr['category'] = event

                    //   adminAddItemAtomSetter(newArr)

                    onSearchChange(event)
                    handleStatusChange()

                }}
                value={searchValue}
                nothingFound="No options"
                data={testData}

                transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                withinPortal

                sx={{

                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}

                styles={{

                    dropdown: {
                        border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        // borderRadius: 15,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        backgroundImage: colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`

                    },

                }}

            />
        </div>

    )
}

export default StatusInfo

////////////////////////////////////////////////////////////////////

const testData: OrderStatus[] = [
    "pending", "confirmed", "done", "cancelled", "refund", "refunded"
]

////////////////////////////////////////////////////////////////////

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
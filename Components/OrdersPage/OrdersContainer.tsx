"use client"

import { ActionIcon, Center, Container, Stack, Title, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { CardContainerColors, NavBarColors } from "../../Shared/colors";
import style from "../../Shared/css/style";
import { MetanoiaSVG } from "../../Shared/icons";
import { OrderData, ordersDataAtom } from "../../Stores/orderStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import OrdersTableContainer from "./components/ordersTable/OrdersTableContainer";

interface Props {
    OrderData: OrderData
}

const OrdersContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const ordersDataAtomSetter = useSetAtom(ordersDataAtom)
    ordersDataAtomSetter(props.OrderData)

    const screenSizes = useAtomValue(screenSizesAtom)
    const { colorScheme, } = useMantineColorScheme();


    if (props.OrderData.length <= 0) {
        return (
            <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-right" duration={1500} timingFunction="ease">
                {(styles) =>
                    <Container py={"xl"}
                        style={styles}

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
                        mx={"auto"} my={"xl"}
                    >
                        <Stack>

                            <Center>
                                <Title order={1}>
                                    There are currently no orders. Come back later!
                                </Title>
                            </Center>


                            <ActionIcon variant="transparent" component={Link} href={"/"}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}

                                w={"15rem"} h={"15rem"}

                                title={"Home"}
                                mx={"auto"}

                                radius={"lg"}
                                sx={{
                                    // borderRadius: 15,
                                    WebkitBackdropFilter: "blur(2px)",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                                    border: `2px solid ${colorScheme === "dark"
                                        ? CardContainerColors.borderColorDark
                                        : CardContainerColors.borderColorLight}`,
                                }}

                            >
                                {/* <home.icon title={home.name} /> */}
                                <MetanoiaSVG
                                    lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                    strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                    strokeWidth={5}

                                />

                            </ ActionIcon>
                        </Stack>


                    </Container>
                }
            </Transition >
        )
    }

    return (


        <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-left" duration={1500} timingFunction="ease">
            {(styles) =>
                <Container my={"xl"} style={styles}>
                    <OrdersTableContainer />
                </Container>}
        </Transition>


    )
}

export default OrdersContainer
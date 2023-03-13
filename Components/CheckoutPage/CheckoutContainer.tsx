"use client"
import { redirect } from 'next/navigation';
import { ActionIcon, Center, Container, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { cartItemsDataAtom } from "../../Stores/cartStore";
import { CardContainerColors, NavBarColors } from '../../Shared/colors';
import ResponsiveCheckoutStepper from './CheckoutStepper';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import style from '../../Shared/css/style';
import Link from 'next/link';
import { MetanoiaSVG } from '../../Shared/icons';

interface Props { }

const CheckoutContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    // const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)
    const { colorScheme, } = useMantineColorScheme();
    const screenSizes = useAtomValue(screenSizesAtom)
    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)

    if (cartItemsDataAtomValue.length < 1) return (

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
                            <h1>
                                Your cart is empty. Please Head back to the main page and add items to your cart.
                            </h1>
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

    else return (

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
                    <ResponsiveCheckoutStepper cartItemsDataAtomValue={cartItemsDataAtomValue} />
                </Container>
            }
        </Transition >






    )

}

export default CheckoutContainer
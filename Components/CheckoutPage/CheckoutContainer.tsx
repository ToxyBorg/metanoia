"use client"
import { redirect } from 'next/navigation';
import { Container, Text, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { cartItemsDataAtom } from "../../Stores/cartStore";
import ResponsiveCheckoutStepper from "../ResponsiveCheckoutStepper/ResponsiveCheckoutStepper";
import { CardContainerColors } from '../../Shared/colors';
import styles from '../../Shared/css/styles.module.css';

interface Props { }

const CheckoutContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    // const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)
    const { colorScheme, } = useMantineColorScheme();


    return (
        <Container py={"xl"}

            sx={(theme) => ({
                maxWidth: "1500px",
                border: `2px solid ${theme.colorScheme === "dark"
                    ? CardContainerColors.borderColorDark
                    : CardContainerColors.borderColorLight}`,
                borderRadius: 15,
            })}

            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }

            className={styles.Animated_Background_Gradient}
            m={"auto"} >
            <ResponsiveCheckoutStepper />
        </Container>



    )

}

export default CheckoutContainer
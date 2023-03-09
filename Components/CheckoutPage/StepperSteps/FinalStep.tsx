import { Button, Center, Container, Text, useMantineColorScheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import Confetti from 'react-confetti'
import { CardContainerColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { lastStepReachedAtom } from "../../../Stores/lastStepStore";

interface Props { }

const FinalStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    // const { height, width } = useViewportSize();
    const { colorScheme, } = useMantineColorScheme();

    const lastStepReachedAtomSetter = useSetAtom(lastStepReachedAtom)

    lastStepReachedAtomSetter(true)

    return (
        <Center
            sx={(theme) => ({
                border: `2px solid ${theme.colorScheme === "dark"
                    ? CardContainerColors.borderColorDark
                    : CardContainerColors.borderColorLight}`,
                borderRadius: 15,
                // WebkitBackdropFilter: "blur(2px)",
                // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            })}

            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }

            className={style.Animated_Background_Gradient}

            h={"50vh"}
        >
            <Text size={"xl"} fw={"bolder"} fs={"italic"}>
                Congratulations! Your order has been added.
                We will contact you soon with further information.
            </Text>
        </Center>
    )
}

export default FinalStep
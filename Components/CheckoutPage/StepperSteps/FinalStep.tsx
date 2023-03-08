import { Center, Container, Text, useMantineColorScheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import Confetti from 'react-confetti'
import { CardContainerColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";

interface Props { }

const FinalStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { height, width } = useViewportSize();
    const { colorScheme, } = useMantineColorScheme();

    return (
        <>
            <Confetti width={width} height={height} />
            {/* <Container h={"50vh"} sx={{ border: "2px solid red" }} > */}
            <Center
                sx={(theme) => ({
                    border: `2px solid ${theme.colorScheme === "dark"
                        ? CardContainerColors.borderColorDark
                        : CardContainerColors.borderColorLight}`,
                    borderRadius: 15,
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
                    We will contact you soon for further information.
                </Text>
            </Center>
            {/* </Container> */}
        </>
    )
}

export default FinalStep
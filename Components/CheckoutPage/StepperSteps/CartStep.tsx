import { ActionIcon, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext } from "../../../Shared/icons";
import { cartType } from "../../../Stores/cartStore";
import ResponsiveCartCarousel from "../../UI/ResponsiveCartCarousel";
import { useSetAtom } from "jotai";


interface Props {
    cartItemsDataAtomValue: cartType,
    nextStep: () => void
}

const CartStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();



    return (
        <Stack>
            <ResponsiveCartCarousel cartItemsDataAtomValue={props.cartItemsDataAtomValue} />


            <ActionIcon variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
                mx={"auto"} mb={"sm"} py={"xs"} radius={"md"} px={"lg"}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                className={style.Animated_Background_Gradient}
                onClick={() => {
                    props.nextStep()
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
                        Confirm your cart
                    </Text>
                </Group>
            </ActionIcon>


        </Stack>
    )
}

export default CartStep
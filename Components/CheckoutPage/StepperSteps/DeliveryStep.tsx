import { ActionIcon, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext } from "../../../Shared/icons";
import DeliveryInfo from "../components/DeliveryInfo";

interface Props {
    nextStep: () => void
}

const DeliveryStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    return (
        <Stack>
            {/* <ResponsiveCartCarousel cartItemsDataAtomValue={props.cartItemsDataAtomValue} /> */}
            <DeliveryInfo />


            <ActionIcon
                variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
                mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                className={style.Animated_Background_Gradient}
                onClick={props.nextStep}
                sx={{
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
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
                        Confirm your delivery
                    </Text>
                </Group>
            </ActionIcon>


        </Stack>
    )
}

export default DeliveryStep
import { ActionIcon, Container, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext } from "../../../Shared/icons";
import { cartItemsDataAtom } from "../../../Stores/cartStore";
import { orderItemsDataAtom } from "../../../Stores/orderStore";
import EmailMagicLinkAuth from "../stepperComponents/EmailMagicLinkInfo/EmailMagicLinkAuth";

interface Props {
    nextStep: () => void
}
const EmailOrderStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)
    const [orderItemsDataAtomValue, orderItemsDataAtomSetter] = useAtom(orderItemsDataAtom)

    const newArr = orderItemsDataAtomValue;
    cartItemsDataAtomValue.map((info) => {
        const isInArray = newArr.some(animal => animal.id === info.id)

        if (isInArray) {
            const index = newArr.findIndex(item => item.id === info.id);
            newArr[index] = {
                id: info.id,
                number: info.itemNumber,
                measurements: info.measurements == null ? '' : info.measurements
            }
        } else {
            newArr.push({
                id: info.id,
                number: info.itemNumber,
                measurements: info.measurements == null ? '' : info.measurements
            })
        }
    })

    orderItemsDataAtomSetter(newArr)

    // if (orderConfirmedValue) {
    //     console.log("orderConfirmedValue : ", orderConfirmedValue)
    //     props.nextStep()
    // }

    return (
        <Container>
            <EmailMagicLinkAuth nextStep={props.nextStep} />


            {/* <ActionIcon variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
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
                        SKIP
                    </Text>
                </Group>
            </ActionIcon> */}


        </Container>
    )
}

export default EmailOrderStep
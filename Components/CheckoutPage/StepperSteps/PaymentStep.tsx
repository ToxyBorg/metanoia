import { ActionIcon, Group, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext } from "../../../Shared/icons";
import { paymentMethodAtom, paymentMethodType } from "../../../Stores/paymentMethodStore";
import BankTransferPayment from "../components/PaymentInfo/BankTransferPayment";
import CashPayment from "../components/PaymentInfo/CashPayment";

interface Props {
    nextStep: () => void
}

const PaymentStep: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const [visible, setVisible] = useState<paymentMethodType>();

    const paymentMethodAtomSetter = useSetAtom(paymentMethodAtom)

    return (
        <Stack>
            <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 'sm', cols: 1, spacing: 'md' },
                ]}>

                <CashPayment visible={visible} setVisible={setVisible} />
                <BankTransferPayment visible={visible} setVisible={setVisible} />

            </SimpleGrid>


            <ActionIcon
                variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
                mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                className={style.Animated_Background_Gradient}
                onClick={() => {

                    if (visible == "cash") {

                        paymentMethodAtomSetter(visible)
                        props.nextStep()

                    }

                    else if (visible == "bank-transfer") {

                        paymentMethodAtomSetter(visible)
                        props.nextStep()

                    }

                }}
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
                        Confirm your payment method
                    </Text>
                </Group>
            </ActionIcon>


        </Stack>
    )
}

export default PaymentStep
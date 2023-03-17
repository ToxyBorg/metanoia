import { Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";

import MoreInfoContainer from "./Shared/MoreInfoContainer";
import { SingleOrderData, ordersDataAtom } from "../../../../../Stores/orderStore";
import { useAtomValue } from "jotai";
import { in_person_delivery } from "../../../../../Stores/deliveryInfoStore";
import { CardContainerColors } from "../../../../../Shared/colors";

interface Props {
    SingleOrderData: SingleOrderData
}

const DeliveryInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();


    if (props.SingleOrderData.delivery == "in-person") {
        return (

            <MoreInfoContainer>
                <Stack
                    sx={{
                        color: colorScheme === "dark"
                            ? CardContainerColors.iconsLineColorDark
                            : CardContainerColors.iconsLineColorLight,
                    }}
                >
                    <Title order={5}>
                        In-person delivery data
                    </Title>

                    <Stack>
                        {Object.entries(props.SingleOrderData.in_person_delivery_info.required).map(([key, value]) => {

                            return (
                                <Text key={key}>
                                    {key} : {value}
                                </Text>
                            )

                        })}
                    </Stack>
                    <Stack>
                        {Object.entries(props.SingleOrderData.in_person_delivery_info.not_required).map(([key, value]) => {

                            return (
                                <>
                                    {value.length > 0
                                        ?
                                        <Text key={key}>
                                            {key} : {value}
                                        </Text>
                                        :
                                        <></>
                                    }
                                </>
                            )

                        })}
                    </Stack>
                </Stack>

            </MoreInfoContainer>
        )
    }

    else {
        return (
            <MoreInfoContainer>
                <Stack
                    sx={{
                        color: colorScheme === "dark"
                            ? CardContainerColors.iconsLineColorDark
                            : CardContainerColors.iconsLineColorLight,
                    }}
                >
                    <Title order={5}>
                        Shipping delivery data
                    </Title>

                    <Stack>
                        {Object.entries(props.SingleOrderData.shipping_delivery_info.required).map(([key, value]) => {

                            return (
                                <Text key={key}>
                                    {key} : {value}
                                </Text>
                            )

                        })}
                    </Stack>
                    <Stack>
                        {Object.entries(props.SingleOrderData.shipping_delivery_info.not_required).map(([key, value]) => {

                            return (
                                <>
                                    {value.length > 0
                                        ?
                                        <Text key={key}>
                                            {key} : {value}
                                        </Text>
                                        :
                                        <></>
                                    }
                                </>
                            )

                        })}
                    </Stack>
                </Stack>
            </MoreInfoContainer>
        )
    }
}

export default DeliveryInfo
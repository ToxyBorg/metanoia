import { Badge, Container, Group, ScrollArea, Space, Table, Text, Title, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { ordersDataAtom } from "../../../../Stores/orderStore";
import DeliveryInfo from "./components/DeliveryInfo";
import ItemsInfo from "./components/ItemsInfo";
import StatusInfo from "./components/StatusInfo";
import DeleteOrder from "./components/Shared/DeleteOrder";

interface Props { }

const OrdersTableMantine: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const ordersDataAtomValue = useAtomValue(ordersDataAtom)
    const { colorScheme, } = useMantineColorScheme();

    const rows = ordersDataAtomValue.map((order) => (

        <tr key={order.order_id}
            style={{
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
        >

            <td>
                {order.created_at
                    ?
                    <Group >
                        <Text>
                            {order.created_at.slice(0, order.created_at.indexOf("T"))}
                        </Text>

                        <Text>
                            {order.created_at.slice(order.created_at.indexOf("T") + 1, order.created_at.indexOf("."))}
                        </Text>
                    </Group>
                    :
                    'Error'
                }
            </td>

            <td>
                <ItemsInfo SingleOrderData={order} />
            </td>


            <td>{order.email}</td>
            <td>
                <Group>
                    {order.delivery}
                    <DeliveryInfo SingleOrderData={order} />
                </Group>
            </td>
            <td>{order.payment}</td>
            <td><StatusInfo SingleOrderData={order} /> </td>
            <td><DeleteOrder SingleOrderData={order} /> </td>
        </tr>
    ));
    const rowNames = ["Date", "Items", "Email", "Delivery Type", "Payment", "Status", "Delete"]


    return (

        <Table highlightOnHover

            miw={850}
        >
            <thead>
                <tr
                    style={{
                        borderBottom: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,

                        background: colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight,
                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`
                    }}
                >
                    {rowNames.map((rowName) => (
                        <th
                            key={rowName}
                            style={{
                                color: colorScheme === "dark"
                                    ? CardContainerColors.iconsLineColorDark
                                    : CardContainerColors.iconsLineColorLight,

                                textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <Title order={4}>
                                {rowName}
                            </Title>
                        </th>
                    ))}

                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>

    );
}

export default OrdersTableMantine
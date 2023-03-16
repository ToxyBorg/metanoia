import { Container, ScrollArea, Table, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { ordersDataAtom } from "../../../../Stores/orderStore";

interface Props { }

const OrdersTableContainer: NextComponentType<NextPageContext, {}, Props> = (
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
            <td>{order.email}</td>
            <td>{order.delivery}</td>
            <td>{order.payment}</td>
        </tr>
    ));

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

            <Container

                sx={(theme) => ({
                    border: `2px solid ${colorScheme === "dark"
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

                mih={"100vh"}
                py={"xl"}
                mt={"5rem"}
                fluid
                maw={1500}
            >


                <ScrollArea
                    sx={{
                        border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        borderRadius: 15,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Table highlightOnHover withColumnBorders>
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        color: colorScheme === "dark"
                                            ? CardContainerColors.iconsLineColorDark
                                            : CardContainerColors.iconsLineColorLight,
                                    }}
                                >
                                    Email
                                </th>

                                <th
                                    style={{
                                        color: colorScheme === "dark"
                                            ? CardContainerColors.iconsLineColorDark
                                            : CardContainerColors.iconsLineColorLight,
                                    }}
                                >
                                    Delivery Type
                                </th>

                                <th
                                    style={{
                                        color: colorScheme === "dark"
                                            ? CardContainerColors.iconsLineColorDark
                                            : CardContainerColors.iconsLineColorLight,
                                    }}
                                >
                                    Payment Method
                                </th>

                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>

            </Container>

        </IconContext.Provider>
    );
}

export default OrdersTableContainer
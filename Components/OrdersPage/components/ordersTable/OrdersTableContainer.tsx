import { Container, ScrollArea, Table, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { ordersDataAtom } from "../../../../Stores/orderStore";
import OrdersTableMantine from "./OrdersTableMantine";

interface Props { }

const OrdersTableContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();


    return (

        <ScrollArea
            type={"auto"}
            sx={{
                border: `2px solid ${colorScheme === "dark"
                    ? CardContainerColors.borderColorDark
                    : CardContainerColors.borderColorLight}`,
                borderRadius: 15,
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                height: "80vh"
            }}
            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }

            className={style.Animated_Background_Gradient}

        // h={750}

        >
            {/* <OrdersTableMUI /> */}
            <OrdersTableMantine />
        </ScrollArea>


    );
}

export default OrdersTableContainer
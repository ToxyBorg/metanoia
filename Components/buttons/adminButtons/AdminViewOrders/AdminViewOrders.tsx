import { ActionIcon, Group, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { CardContainerColors } from "../../../../Shared/colors";
import { adminViewOrdersButton } from "../../../../Shared/icons";

interface Props { }

const AdminViewOrders: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {


    const { colorScheme, } = useMantineColorScheme();



    return (
        <ActionIcon
            variant="transparent"
            // onClick={() => handlers.toggle()}
            w={"100%"} h={"100%"}
            mx={"auto"}
            title={adminViewOrdersButton.name}

            component={Link}
            href={"/orders"}

        >
            <Group align={"center"} spacing={"xs"}>

                <adminViewOrdersButton.icon />

                <Text
                    color={
                        colorScheme === "dark"
                            ? CardContainerColors.textColorDark
                            : CardContainerColors.textColorLight
                    }
                    mr={"md"}
                >
                    {adminViewOrdersButton.name}
                </Text>

            </Group>

        </ActionIcon>


    )
}

export default AdminViewOrders
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { cartCheck } from "../../../Shared/icons";
import { cartItemsDataAtom } from "../../../Stores/cartStore";

interface Props {
    handlers?: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    }
}

const Checkout: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)

    if (cartItemsDataAtomValue.length < 1) return <></>
    return (
        <ActionIcon variant="transparent"

            w={"100%"} h={"100%"}
            mx={"auto"}
            title={cartCheck.name}

            component={Link}

            href={"/checkout"}
            onClick={
                () => {
                    props.handlers?.toggle();

                }
            }
        >
            <cartCheck.icon title={cartCheck.name} />
        </ActionIcon>


    )
}

export default Checkout
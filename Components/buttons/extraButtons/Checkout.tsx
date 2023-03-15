import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { cartStep } from "../../../Shared/icons";
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
    else return (
        <ActionIcon variant="transparent"

            w={"100%"} h={"100%"}
            mx={"auto"}
            title={cartStep.name}

            component={Link}

            href={"/checkout"}
            onClick={
                () => {
                    props.handlers?.toggle();
                }
            }
        >
            <cartStep.icon title={cartStep.name} />
        </ActionIcon>


    )
}

export default Checkout
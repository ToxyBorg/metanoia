import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { cartCheck } from "../../../Shared/icons";
import { switchToCheckout } from "../../../Stores/checkoutStore";
import ResponsiveCheckoutStepper from "../../ResponsiveCheckoutStepper/ResponsiveCheckoutStepper";
import ResponsiveModalContext from "../../ResponsiveModalContext/ResponsiveModalContext";

interface Props {
    handlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    }
}

const Checkout: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const switchToCheckoutSetter = useSetAtom(switchToCheckout)

    return (
        <ActionIcon variant="transparent"

            w={"100%"} h={"100%"}
            mx={"auto"}
            title={cartCheck.name}

            onClick={
                () => {
                    props.handlers.toggle();
                    switchToCheckoutSetter(true)
                }
            }
        >
            <cartCheck.icon title={cartCheck.name} />
        </ActionIcon>


    )
}

export default Checkout
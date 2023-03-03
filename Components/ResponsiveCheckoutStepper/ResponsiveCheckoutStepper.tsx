
import { Button, Group, ScrollArea, Stepper, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { IconContext } from "react-icons";
import { ModalColors } from "../../Shared/colors";
import { cart, cartCheck } from "../../Shared/icons";
import { cartType } from "../../Stores/cartStore";
import ResponsiveCartCarousel from "../ResponsiveCartCarousel/ResponsiveCartCarousel";
import style from "../../Shared/css/styles.module.css"
import { switchToCheckout } from "../../Stores/checkoutStore";
import { useSetAtom } from "jotai";

interface Props {
    // cartItemsDataAtomValue: cartType,
}

const ResponsiveCheckoutStepper: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const { colorScheme, } = useMantineColorScheme();
    const switchToCheckoutSetter = useSetAtom(switchToCheckout)

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                size: "1.1rem"
            }}>



            <Stepper active={active} breakpoint={"xs"}
                styles={{
                    stepIcon: {
                        backgroundImage: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight

                    },
                    stepDescription: {
                        fontStyle: "italic",
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight
                    },
                    stepLabel: {
                        fontWeight: "bolder",
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight
                    },
                    separator: {

                    }

                }}
                onStepClick={(index) => {
                    if (index == 0) {
                        switchToCheckoutSetter(false)

                    }
                }}
            >

                <Stepper.Step
                    icon={<cart.icon title={cart.name} />}
                    label="First step"
                    description="Check your cart"

                    completedIcon={<cartCheck.icon title={cartCheck.name} />}

                // allowStepClick
                // onClick={() => {
                //     console.log("CLICKED STEPPER")
                //     switchToCheckoutSetter(false)
                // }}
                >
                    Step 1 content: Check your cart

                </Stepper.Step>

                <Stepper.Step label="Second step" description="Verify email">
                    Step 2 content: Verify email
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Get full access">
                    Step 3 content: Get full access
                </Stepper.Step>

                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>

            </Stepper>


        </IconContext.Provider>
    );
}

export default ResponsiveCheckoutStepper
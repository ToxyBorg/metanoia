
import { ActionIcon, Button, Group, Stack, Stepper, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { IconContext } from "react-icons";
import { cart, cartCheck, arrowNext, arrowPrevious, checkoutStepChecked, cartStepChecked, deliveryStep, deliveryStepChecked, measurementsStep, measurementsStepChecked } from "../../Shared/icons";
import style from "../../Shared/css/styles.module.css"
import { redirect } from "next/navigation";
import Link from "next/link";
import ResponsiveCartCarousel from "../UI/ResponsiveCartCarousel";
import { cartType } from "../../Stores/cartStore";
import { useCounter } from "@mantine/hooks";
import { NavBarColors, StepperColors } from "../../Shared/colors";
import { mobileNavRadius } from "../../Shared/sizes";
import { atom, useAtomValue } from "jotai";
import CartStep from "./StepperSteps/CartStep";
import DeliveryStep from "./StepperSteps/DeliveryStep";
import MeasurementsStep from "./StepperSteps/MeasurementsStep";

export type StepStateType = "stepInactive" | "stepProgress" | "stepCompleted" | undefined

interface Props {
    cartItemsDataAtomValue: cartType,
}

const ResponsiveCheckoutStepper: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    // const [count, handlers] = useCounter(0, { min: 0, max: 3 });


    const { colorScheme, } = useMantineColorScheme();

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                size: "1.5rem"
            }}>



            <Stepper active={active} breakpoint={"xs"}

                styles={{
                    stepIcon: {
                        backgroundImage: colorScheme === "dark" ? StepperColors.stepperBackgroundColorDark : StepperColors.stepperBackgroundColorLight,
                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,
                        color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                        border: `2px solid ${colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight}`

                    },
                    separator: {
                        background: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight
                    },
                    stepDescription: {
                        fontStyle: "italic",
                        color: colorScheme === "dark" ? StepperColors.stepperHeaderTextColorDark : StepperColors.stepperHeaderTextColorLight
                    },
                    stepLabel: {
                        fontWeight: "bolder",
                        color: colorScheme === "dark" ? StepperColors.stepperHeaderTextColorDark : StepperColors.stepperHeaderTextColorLight
                    },
                    steps: {
                        border: `2px solid ${colorScheme === "dark" ? StepperColors.iconsBorderColorDark : StepperColors.iconsBorderColorLight}`,
                        backgroundImage: colorScheme === "dark" ? StepperColors.stepperBackgroundColorDark : StepperColors.stepperBackgroundColorLight,
                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,
                        padding: "1rem",
                        borderRadius: 15,

                    },
                    content: {
                        color: colorScheme === "dark" ? StepperColors.iconsBorderColorDark : StepperColors.iconsBorderColorLight,
                    }


                }}
                onStepClick={setActive}
                allowNextStepsSelect={false}
                radius={"md"}
                color={"green"}
            >

                <Stepper.Step
                    icon={<cartCheck.icon title={"cart hasn't been checked yet."} />}
                    label="First step"
                    description="Check your cart"
                    completedIcon={<cartStepChecked.icon title={"uncheck your cart?"} />}
                >
                    <CartStep cartItemsDataAtomValue={props.cartItemsDataAtomValue} nextStep={nextStep} />

                </Stepper.Step>

                <Stepper.Step
                    icon={<measurementsStep.icon title={"measurements have not been entered yet."} />}
                    label="Second step"
                    description="Your measurements"
                    completedIcon={<measurementsStepChecked.icon title={"enter different measurements?"} />}
                >
                    <MeasurementsStep cartItemsDataAtomValue={props.cartItemsDataAtomValue} nextStep={nextStep} />
                </Stepper.Step>

                <Stepper.Step
                    icon={<deliveryStep.icon title={"delivery option hasn't been selected yet."} />}
                    label="Third step"
                    description="Choose a delivery option"
                    completedIcon={<deliveryStepChecked.icon title={"choose a different delivery option?"} />}
                >
                    <DeliveryStep nextStep={nextStep} />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Get full access">
                    Step 4 content: Get full access
                </Stepper.Step>

                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>

            </Stepper>

            {/* <Group noWrap position="apart"
                sx={{
                    borderRadius: mobileNavRadius.navbarBorderRadius,
                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,

                }}
                mx={"auto"} mt={"sm"}
                p={"0.75rem"}
                w={"clamp(15%, 250px, 75%)"}
                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                className={style.Animated_Background_Gradient}

            >

                <ActionIcon variant="outline" title={arrowPrevious.name} w={"100%"} h={"100%"}
                    mx={"auto"} py={"xs"} radius={"md"}
                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                    className={style.Animated_Background_Gradient}
                    onClick={handlers.decrement}
                    sx={{
                        border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                    }}
                >
                    <Stack spacing={0}>
                        <arrowPrevious.icon />
                        <Text size={"xs"}
                            color={colorScheme === "dark"
                                ? StepperColors.iconsLineColorDark
                                : StepperColors.iconsLineColorLight
                            }
                        >
                            Previous
                        </Text>
                    </Stack>
                </ActionIcon>

                <ActionIcon variant="outline" title={arrowNext.name} w={"100%"} h={"100%"}
                    mx={"auto"} py={"xs"} radius={"md"}
                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                    className={style.Animated_Background_Gradient}
                    onClick={handlers.increment}
                    sx={{
                        border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                    }}
                >
                    <Stack spacing={0}>
                        <arrowNext.icon />
                        <Text size={"xs"}
                            color={colorScheme === "dark"
                                ? StepperColors.iconsLineColorDark
                                : StepperColors.iconsLineColorLight
                            }
                        >
                            Next
                        </Text>
                    </Stack>
                </ActionIcon>

            </Group> */}


        </IconContext.Provider>
    );
}

export default ResponsiveCheckoutStepper
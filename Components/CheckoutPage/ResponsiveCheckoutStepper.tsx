
import { ActionIcon, Button, Group, Stack, Stepper, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { IconContext } from "react-icons";
import { cart, cartCheck, checkoutNext, checkoutPrevious } from "../../Shared/icons";
import style from "../../Shared/css/styles.module.css"
import { redirect } from "next/navigation";
import Link from "next/link";
import ResponsiveCartCarousel from "../UI/ResponsiveCartCarousel";
import { cartType } from "../../Stores/cartStore";
import { useCounter } from "@mantine/hooks";
import { NavBarColors, StepperColors } from "../../Shared/colors";
import { mobileNavRadius } from "../../Shared/sizes";

interface Props {
    cartItemsDataAtomValue: cartType,
}

const ResponsiveCheckoutStepper: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    // const [active, setActive] = useState(0);
    // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [count, handlers] = useCounter(0, { min: 0, max: 3 });

    const { colorScheme, } = useMantineColorScheme();

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                size: "1.5rem"
            }}>



            <Stepper active={count} breakpoint={"xs"}
                styles={{
                    stepIcon: {
                        backgroundImage: colorScheme === "dark" ? StepperColors.stepperBackgroundColorDark : StepperColors.stepperBackgroundColorLight,
                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,
                        // color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
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

                radius={"md"}
                // onStepClick={(index) => {
                //     // if (index == 0) {
                //     //     redirect("/")

                //     // }
                // }}
                color={"green"}
            >

                <Stepper.Step
                    icon={<cartCheck.icon title={cartCheck.name} />}
                    label="First step"
                    description="Check your cart"


                // completedIcon={
                //     // <ActionIcon variant="transparent" component={Link} href={"/"}>
                //     <cartCheck.icon title={"Cart has been checked"} />
                //     // </ActionIcon>
                // }
                >
                    {/* Step 1 content: Check your cart */}
                    <ResponsiveCartCarousel cartItemsDataAtomValue={props.cartItemsDataAtomValue} />

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

            <Group noWrap position="apart"
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

                {/* <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                        size: "1.5rem"
                    }}> */}


                <ActionIcon variant="outline" title={checkoutPrevious.name} w={"100%"} h={"100%"}
                    mx={"auto"} py={"xs"} radius={"md"}
                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                    className={style.Animated_Background_Gradient}
                    onClick={handlers.decrement}
                    sx={{
                        border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                    }}
                >
                    <Stack spacing={0}>
                        <checkoutPrevious.icon />
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

                <ActionIcon variant="outline" title={checkoutNext.name} w={"100%"} h={"100%"}
                    mx={"auto"} py={"xs"} radius={"md"}
                    bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                    className={style.Animated_Background_Gradient}
                    onClick={handlers.increment}
                    sx={{
                        border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                    }}
                >
                    <Stack spacing={0}>
                        <checkoutNext.icon />
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
                {/* </IconContext.Provider> */}

            </Group>


        </IconContext.Provider>
    );
}

export default ResponsiveCheckoutStepper
import { ActionIcon, Button, Container, Divider, Grid, Group, Overlay, SimpleGrid, Space, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { ReactNode, useState } from 'react';
import { TextInput, createStyles, rem } from '@mantine/core';
import { inPersonDelivery, shippingDelivery } from "../../../Shared/icons";
import style from "../../../Shared/css/style";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../Shared/colors";

interface Props { }

const DeliveryInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const [visible, setVisible] = useState<"in_person_delivery_info" | "shipping_delivery_info">();

    return (
        <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[
                { maxWidth: 'sm', cols: 1, spacing: 'md' },
            ]}>
            <Container
                p={"lg"} w={"100%"}
                pos={"relative"}
                sx={(theme) => ({
                    maxWidth: "1500px",
                    border: `2px solid ${theme.colorScheme === "dark"
                        ? CardContainerColors.borderColorDark
                        : CardContainerColors.borderColorLight}`,
                    borderRadius: 15,
                })}

                bg={colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight
                }

                className={style.Animated_Background_Gradient}
            >

                <Stack>
                    <Divider my="xs" label="Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Recipient's name"} placeholder={"Enter the name of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's Wilaya"} placeholder={"Enter the Wilaya of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's  street address"} placeholder={"Enter the address where we should deliver"} required={true} />
                    <FloatingLabelInput label={"Recipient's  phone number"} placeholder={"Enter the recipient's phone number"} required={true} />

                    {/* <Space h="md" /> */}

                    <Divider my="xs" label="Not Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Google Maps link"} placeholder={"Enter the address copied from Google Maps"} required={false} />
                    <FloatingLabelInput label={"Recipient's  message"} placeholder={"Enter a message to be written for the recipient"} required={false} />
                    <FloatingLabelInput label={"Recipient's  Instagram"} placeholder={"Enter the recipient's instagram username"} required={false} />

                    {visible != "in_person_delivery_info" && (
                        <Overlay blur={15} center radius={15}>
                            <ActionIcon
                                title={inPersonDelivery.name}
                                onClick={() => setVisible("in_person_delivery_info")}

                                variant="outline" w={"fit-content"} h={"fit-content"}
                                mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                                className={style.Animated_Background_Gradient}
                                sx={{
                                    color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                                }}
                            >
                                <Stack align={"center"}>

                                    <inPersonDelivery.icon size={"3rem"} />

                                    <Text>
                                        In-person delivery
                                    </Text>
                                </Stack>
                            </ActionIcon>

                        </Overlay>
                    )}
                </Stack>
            </Container>


            <Container
                p={"lg"} w={"100%"}
                pos={"relative"}
                sx={(theme) => ({
                    maxWidth: "1500px",
                    border: `2px solid ${theme.colorScheme === "dark"
                        ? CardContainerColors.borderColorDark
                        : CardContainerColors.borderColorLight}`,
                    borderRadius: 15,
                })}

                bg={colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight
                }

                className={style.Animated_Background_Gradient}
            >
                <Stack>
                    <Divider my="xs" label="Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Recipient's name"} placeholder={"Enter the name of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's Wilaya"} placeholder={"Enter the Wilaya of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's  street address"} placeholder={"Enter the address where we should deliver"} required={true} />
                    <FloatingLabelInput label={"Recipient's  house number"} placeholder={"Enter the house number to where we should deliver"} required={true} />
                    <FloatingLabelInput label={"Recipient's  phone number"} placeholder={"Enter the recipient's phone number"} required={true} />

                    {/* <Space h="md" /> */}

                    <Divider my="xs" label="Not Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Google Maps link"} placeholder={"Enter the address copied from Google Maps"} required={false} />
                    <FloatingLabelInput label={"Recipient's  message"} placeholder={"Enter a message to be written for the recipient"} required={false} />
                    <FloatingLabelInput label={"Recipient's  Instagram"} placeholder={"Enter the recipient's instagram username"} required={false} />

                    {visible != "shipping_delivery_info" && (
                        <Overlay blur={15} center radius={15}>
                            <ActionIcon
                                title={shippingDelivery.name}
                                onClick={() => setVisible("shipping_delivery_info")}

                                variant="outline" w={"fit-content"} h={"fit-content"}
                                mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
                                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                                className={style.Animated_Background_Gradient}
                                sx={{
                                    color: colorScheme === "dark" ? StepperColors.iconsLineColorDark : StepperColors.iconsLineColorLight,
                                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
                                }}
                            >
                                <Stack align={"center"}>
                                    <shippingDelivery.icon size={"3rem"} />
                                    <Text>
                                        Shipping delivery
                                    </Text>
                                </Stack>
                            </ActionIcon>
                        </Overlay>
                    )}
                </Stack>
            </Container>

        </SimpleGrid>
    )
}

export default DeliveryInfo



const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === "dark"
                ? CardContainerColors.textColorDark
                : CardContainerColors.textColorLight

            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[6],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: !floating ? 'transparent' : undefined,
        },
    },
}));

interface InputProps {
    label: ReactNode,
    placeholder: string | undefined,
    required: boolean
}
export function FloatingLabelInput(inputProps: InputProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

    return (
        <TextInput
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"

        />
    );
}
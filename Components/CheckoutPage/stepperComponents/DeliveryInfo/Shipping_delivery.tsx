import { ActionIcon, Container, createStyles, Divider, Overlay, rem, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { shippingDelivery } from "../../../../Shared/icons";
import { delivery, shipping_delivery, shipping_deliveryAtom } from "../../../../Stores/deliveryInfoStore";

interface Props {
    visible: delivery | undefined,
    setVisible: Dispatch<SetStateAction<delivery | undefined>>
}

const Shipping_delivery: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    return (
        <Container
            p={"lg"} w={"100%"}
            pos={"relative"}
            sx={(theme) => ({
                maxWidth: "1500px",
                border: `2px solid ${theme.colorScheme === "dark"
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
        >
            <Stack>
                <Divider my="xs" label="Required Fields" labelPosition="center" />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's name"} placeholder={"Enter the name of the person receiving the package"} required={true} requiredName={"name"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's Wilaya"} placeholder={"Enter the Wilaya of the person receiving the package"} required={true} requiredName={"wilaya"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's  street address"} placeholder={"Enter the address where we should deliver"} required={true} requiredName={"street_address"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's  house number"} placeholder={"Enter the house number to where we should deliver"} required={true} requiredName={"house_number"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's  phone number"} placeholder={"Enter the recipient's phone number"} required={true} requiredName={"phone"} />

                {/* <Space h="md" /> */}

                <Divider my="xs" label="Not Required Fields" labelPosition="center" />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Google Maps link"} placeholder={"Enter the address copied from Google Maps"} required={false} notRequiredName={"google_maps_link"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's  message"} placeholder={"Enter a message to be written for the recipient"} required={false} notRequiredName={"message"} />
                <FloatingLabelInput disabled={props.visible != 'shipping'} label={"Recipient's  Instagram"} placeholder={"Enter the recipient's instagram username"} required={false} notRequiredName={"instagram_link"} />

                {props.visible != "shipping" && (
                    <Overlay blur={15} center radius={15}>
                        <ActionIcon
                            title={shippingDelivery.name}
                            onClick={() => props.setVisible("shipping")}

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
    )
}

export default Shipping_delivery


////////////////////////////////////////////////////////////////////////////////


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
    required: boolean,
    requiredName?: keyof shipping_delivery['required'],
    notRequiredName?: keyof shipping_delivery['not_required'],
    disabled: boolean

}
export function FloatingLabelInput(inputProps: InputProps) {

    const [shipping_deliveryAtomValue, shipping_deliveryAtomSetter] = useAtom(shipping_deliveryAtom)

    const initialValue = inputProps.required
        ? shipping_deliveryAtomValue.required[inputProps.requiredName!]
        : shipping_deliveryAtomValue.not_required[inputProps.notRequiredName!]

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(initialValue != null && initialValue != undefined ? initialValue : "");

    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

    return (
        <TextInput
            disabled={inputProps.disabled}
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}
            onChange={
                (event) => {

                    const newArr = shipping_deliveryAtomValue

                    if (inputProps.required) {
                        newArr.required[inputProps.requiredName!] = event.currentTarget.value
                    }

                    else {
                        newArr.not_required[inputProps.notRequiredName!] = event.currentTarget.value
                    }

                    shipping_deliveryAtomSetter(newArr)

                    setValue(event.currentTarget.value)
                }
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"
            sx={{
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}

        />
    );
}
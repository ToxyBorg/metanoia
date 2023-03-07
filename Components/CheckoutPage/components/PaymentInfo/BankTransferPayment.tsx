import { ActionIcon, Badge, Container, Group, Overlay, Stack, Tabs, Text, ThemeIcon, Timeline, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { bankTransferPayment, IconInfo, multiplicationIcon, paymentStep, paypalIcon, plusIcon, PostalServiceSVG } from "../../../../Shared/icons";
import { cartItemsDataAtom } from "../../../../Stores/cartStore";
import { deliveryAtom } from "../../../../Stores/deliveryInfoStore";
import { categorizedItemsDataAtom } from "../../../../Stores/itemDataStore";
import { paymentMethodType } from "../../../../Stores/paymentMethodStore";

interface Props {
    visible: paymentMethodType | undefined,
    setVisible: Dispatch<SetStateAction<paymentMethodType | undefined>>
}

const BankTransferPayment: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)
    const categorizedItemsDataAtomValue = useAtomValue(categorizedItemsDataAtom)
    const deliveryAtomValue = useAtomValue(deliveryAtom)

    let pricing: number = 0

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
            })}

            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }

            className={style.Animated_Background_Gradient}
        >

            <Stack>
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? CardContainerColors.iconsLineColorDark : CardContainerColors.iconsLineColorLight,
                        size: "1.5rem"
                    }}>


                    <Timeline active={999} bulletSize={"2rem"} lineWidth={"0.5rem"}
                        styles={{

                            itemBody: {
                                border: `2px solid ${colorScheme === "dark"
                                    ? CardContainerColors.borderColorDark
                                    : CardContainerColors.borderColorLight}`,
                                paddingBlock: "0.5rem",
                                paddingInline: "1rem",
                                borderRadius: 15,

                                backgroundImage: colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight,

                                backgroundSize: "300% 300%",
                                animation: `${style.AnimateBG} 7s ease infinite`,
                            },


                        }}
                        color={colorScheme === "dark"
                            ? "pink.8"
                            : "grape.8"
                        }
                    >
                        {cartItemsDataAtomValue.map((info) => {

                            let icon: IconInfo | undefined = undefined
                            if (info.item.category in categorizedItemsDataAtomValue) {
                                icon = categorizedItemsDataAtomValue[info.item.category].icon
                            }

                            pricing += (info.item.price * info.itemNumber)

                            const Title = () => {
                                return (
                                    <Text
                                        fw={"bolder"}
                                        fs={"italic"}
                                        color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                    >
                                        {info.item.title}
                                    </Text>
                                )
                            }

                            return (
                                <Timeline.Item key={info.id}
                                    title={<Title />}
                                    bullet={icon != undefined ? <icon.icon /> : undefined}
                                    radius={"md"}
                                >
                                    <Group>
                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark"
                                                    ? CardContainerColors.borderColorDark
                                                    : CardContainerColors.borderColorLight}`,
                                                // fontSize: 
                                            }}
                                            bg={colorScheme === "dark"
                                                ? CardContainerColors.backgroundColorDark
                                                : CardContainerColors.backgroundColorLight
                                            }
                                            className={style.Animated_Background_Gradient}
                                            size={"lg"}
                                        >
                                            {info.item.price} DA
                                        </Badge>

                                        <multiplicationIcon.icon title={multiplicationIcon.name} />

                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark"
                                                    ? CardContainerColors.borderColorDark
                                                    : CardContainerColors.borderColorLight}`,
                                                // fontSize: 
                                            }}
                                            bg={colorScheme === "dark"
                                                ? CardContainerColors.backgroundColorDark
                                                : CardContainerColors.backgroundColorLight
                                            }
                                            className={style.Animated_Background_Gradient}
                                            size={"lg"}
                                        >
                                            {info.itemNumber}
                                        </Badge>

                                    </Group>
                                </Timeline.Item>
                            )
                        })}

                        <Timeline.Item
                            title={
                                <Text
                                    fw={"bolder"}
                                    fs={"italic"}
                                    color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                >
                                    Pricing
                                </Text>
                            }
                            radius={"md"}
                            bullet={<paymentStep.icon />}
                        >
                            <Group>
                                <Badge variant="gradient"
                                    sx={{
                                        border: `2px solid ${colorScheme === "dark"
                                            ? CardContainerColors.borderColorDark
                                            : CardContainerColors.borderColorLight}`,
                                        // fontSize: 
                                    }}
                                    bg={colorScheme === "dark"
                                        ? CardContainerColors.backgroundColorDark
                                        : CardContainerColors.backgroundColorLight
                                    }
                                    className={style.Animated_Background_Gradient}
                                    size={"lg"}
                                >
                                    {pricing} DA
                                </Badge>

                                {deliveryAtomValue?.delivery == "in-person" &&
                                    <>
                                        <plusIcon.icon title={plusIcon.name} />

                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark"
                                                    ? CardContainerColors.borderColorDark
                                                    : CardContainerColors.borderColorLight}`,
                                                // fontSize: 
                                            }}
                                            bg={colorScheme === "dark"
                                                ? CardContainerColors.backgroundColorDark
                                                : CardContainerColors.backgroundColorLight
                                            }
                                            className={style.Animated_Background_Gradient}
                                            size={"lg"}
                                        >
                                            Delivery fee
                                        </Badge>
                                    </>

                                }

                            </Group>
                        </Timeline.Item>

                        <Timeline.Item
                            title={
                                <Text
                                    fw={"bolder"}
                                    fs={"italic"}
                                    color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                >
                                    Pricing
                                </Text>
                            }
                            radius={"md"}
                            bullet={<bankTransferPayment.icon />}
                        >
                            <Tabs defaultValue="first" variant="outline"

                                styles={{
                                    panel: {
                                        border: `2px solid ${colorScheme === "dark"
                                            ? CardContainerColors.borderColorDark
                                            : CardContainerColors.borderColorLight}`,
                                        paddingBlock: "0.5rem",
                                        paddingInline: "1rem",
                                        marginBlock: "1rem",
                                        borderRadius: 15,

                                        backgroundImage: colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight,

                                        backgroundSize: "300% 300%",
                                        animation: `${style.AnimateBG} 7s ease infinite`,
                                    }
                                }}
                                color={colorScheme === "dark"
                                    ? "pink.8"
                                    : "grape.8"
                                }
                                radius={"md"}
                            >
                                <Tabs.List grow position="center">

                                    <Tabs.Tab

                                        icon=
                                        {
                                            <ActionIcon variant="transparent"
                                                w={"1.5rem"} h={"1.5rem"}
                                                title={"Postal Service"}
                                                mx={"auto"}
                                            >
                                                <PostalServiceSVG
                                                    lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                                    strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                                    strokeWidth={12}
                                                />
                                            </ActionIcon>
                                        }
                                        value="first">
                                        <Text
                                            fw={"bolder"}
                                            fs={"italic"}
                                            color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                        >
                                            Postal Service
                                        </Text>
                                    </Tabs.Tab>

                                    <Tabs.Tab
                                        icon={<paypalIcon.icon title={paypalIcon.name} />}
                                        value="second"
                                    >
                                        <Text
                                            fw={"bolder"}
                                            fs={"italic"}
                                            color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                        >
                                            Paypal
                                        </Text>

                                    </Tabs.Tab>



                                </Tabs.List>

                                <Tabs.Panel value="first" >Postal service payment info panel</Tabs.Panel>
                                <Tabs.Panel value="second" >Paypal payment info panel</Tabs.Panel>
                            </Tabs>
                        </Timeline.Item>
                    </Timeline>

                </IconContext.Provider>

                {props.visible != "bank-transfer" && (
                    <Overlay blur={15} center radius={15}>
                        <ActionIcon
                            title={bankTransferPayment.name}
                            onClick={() => props.setVisible("bank-transfer")}

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

                                <bankTransferPayment.icon size={"3rem"} />

                                <Text>
                                    Bank transfer payment method
                                </Text>
                            </Stack>
                        </ActionIcon>

                    </Overlay>
                )}
            </Stack>
        </Container>
    )
}

export default BankTransferPayment
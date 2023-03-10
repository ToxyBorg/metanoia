import { ActionIcon, Badge, Container, createStyles, Group, Overlay, rem, Stack, Text, Timeline, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import { NextComponentType, NextPageContext } from "next";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { IconContext, IconType } from "react-icons";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { cashPayment, equalsIcon, IconInfo, multiplicationIcon, paymentStep, plusIcon } from "../../../../Shared/icons";
import { cartItemsDataAtom } from "../../../../Stores/cartStore";
import { deliveryAtom } from "../../../../Stores/deliveryInfoStore";
import { CategoriesType, categorizedItemsDataAtom } from "../../../../Stores/itemDataStore";
import { paymentMethodType } from "../../../../Stores/paymentMethodStore";

interface Props {

    visible: paymentMethodType | undefined,
    setVisible: Dispatch<SetStateAction<paymentMethodType | undefined>>
}

const CashPayment: NextComponentType<NextPageContext, {}, Props> = (
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
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                            },
                            itemBullet: {
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                            }


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
                                                WebkitBackdropFilter: "blur(2px)",
                                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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
                                                WebkitBackdropFilter: "blur(2px)",
                                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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
                                        WebkitBackdropFilter: "blur(2px)",
                                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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

                                {deliveryAtomValue == "in-person" &&
                                    <>
                                        <plusIcon.icon title={plusIcon.name} />

                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark"
                                                    ? CardContainerColors.borderColorDark
                                                    : CardContainerColors.borderColorLight}`,
                                                WebkitBackdropFilter: "blur(2px)",
                                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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

                                {deliveryAtomValue == "shipping" &&
                                    <>
                                        <plusIcon.icon title={plusIcon.name} />

                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark"
                                                    ? CardContainerColors.borderColorDark
                                                    : CardContainerColors.borderColorLight}`,
                                                WebkitBackdropFilter: "blur(2px)",
                                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                                // fontSize: 
                                            }}
                                            bg={colorScheme === "dark"
                                                ? CardContainerColors.backgroundColorDark
                                                : CardContainerColors.backgroundColorLight
                                            }
                                            className={style.Animated_Background_Gradient}
                                            size={"lg"}
                                        >
                                            Shipping fee
                                        </Badge>
                                    </>

                                }

                            </Group>
                        </Timeline.Item>
                    </Timeline>

                </IconContext.Provider>

                {props.visible != "cash" && (
                    <Overlay blur={15} center radius={15}>
                        <ActionIcon
                            title={cashPayment.name}
                            onClick={() => props.setVisible("cash")}

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

                                <cashPayment.icon size={"3rem"} />

                                <Text>
                                    Cash payment method
                                </Text>
                            </Stack>
                        </ActionIcon>

                    </Overlay>
                )}
            </Stack>
        </Container>
    )
}

export default CashPayment


////////////////////////////////////////////////////////////////////////////////


import type { NextComponentType, NextPageContext } from "next";
import { SingleOrderData } from "../../../../../Stores/orderStore";
import { AspectRatio, Badge, Card, Center, Group, Loader, LoadingOverlay, ScrollArea, Stack, Text, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import { allItemsDataAtom, categorizedItemsDataAtom } from "../../../../../Stores/itemDataStore";
import MoreInfoContainer from "./Shared/MoreInfoContainer";
import style from "../../../../../Shared/css/style";
import Link from "next/link";
import { CardContainerColors } from "../../../../../Shared/colors";
import { useState } from "react";
import Image from "next/image";
import { IconInfo, multiplicationIcon } from "../../../../../Shared/icons";
import { IconContext } from "react-icons";

interface Props {
    SingleOrderData: SingleOrderData
}

const ItemsInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const allItemsDataAtomValue = useAtomValue(allItemsDataAtom)
    const categorizedItemsDataAtomValue = useAtomValue(categorizedItemsDataAtom)

    const { colorScheme, } = useMantineColorScheme();
    const [mainImageLoading, setMainImageLoading] = useState(true);

    // let pricing: number = 0

    let tempPricing = 0

    const Items = props.SingleOrderData.items.map(item => {

        const found = allItemsDataAtomValue.find((obj) => {
            return obj.item_id === item.id;
        })


        if (found) {

            let icon: IconInfo | undefined = undefined
            if (found.category in categorizedItemsDataAtomValue) {
                icon = categorizedItemsDataAtomValue[found.category].icon
            }

            tempPricing += (found.price * item.number)

            return (
                <UnstyledButton

                    p={"xs"}
                    key={item.id}
                    component={Link}
                    href={`${found.category}/${found.item_id}`}
                    className={style.Animated_Background_Gradient}
                    bg={colorScheme === "dark"
                        ? CardContainerColors.backgroundColorDark
                        : CardContainerColors.backgroundColorLight
                    }
                    sx={{
                        border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        // color: colorScheme === "dark"
                        //     ? CardContainerColors.iconsLineColorDark
                        //     : CardContainerColors.iconsLineColorLight,
                        // background: colorScheme === "dark"
                        //     ? CardContainerColors.backgroundColorDark
                        //     : CardContainerColors.backgroundColorLight,
                        // backgroundSize: "300% 300%",
                        // animation: `${style.AnimateBG} 7s ease infinite`,
                        borderRadius: 15,

                    }}
                >

                    <Group noWrap>

                        <Center>

                            <Card pos={"relative"} shadow="md"
                                sx={{
                                    border: `2px solid ${colorScheme === "dark"
                                        ? CardContainerColors.borderColorDark
                                        : CardContainerColors.borderColorLight}`,
                                    WebkitBackdropFilter: "blur(2px)",
                                    boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                                    width: "5rem",
                                }}
                                radius={"md"}

                            >
                                <Card.Section >
                                    <AspectRatio ratio={10 / 16} >
                                        <LoadingOverlay visible={mainImageLoading} overlayBlur={5} radius={"xs"}
                                            loader={<Loader color="pink" size="xl" />}
                                        />
                                        <Image fill={true} src={found.mainImageURL} alt={found.title} loading='lazy'
                                            onLoadingComplete={() => setMainImageLoading(false)}
                                        />
                                    </AspectRatio>
                                </Card.Section>
                            </Card>
                        </Center>


                        <Stack style={{ flex: 1 }}>

                            <Group position="apart">
                                <Text
                                    fw={"bolder"}
                                    fs={"italic"}
                                    color={colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight}
                                >
                                    {found.title}
                                </Text>

                                {icon &&
                                    <Badge
                                        size={"xl"}

                                        variant={"gradient"}
                                        sx={{
                                            border: `2px solid ${colorScheme === "dark"
                                                ? CardContainerColors.borderColorDark
                                                : CardContainerColors.borderColorLight}`,
                                            borderRadius: 10,
                                            WebkitBackdropFilter: "blur(2px)",
                                            boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                                        }}
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }

                                        className={style.Animated_Background_Gradient}
                                    >
                                        <Center>
                                            {<icon.icon
                                                style={{
                                                    alignSelf: "center",
                                                }}
                                            />}
                                        </Center>
                                    </Badge>
                                }
                            </Group>


                            <Group position="apart">

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
                                        {found.price} DA
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
                                        {item.number}
                                    </Badge>

                                </Group>

                            </Group>

                        </Stack>

                    </Group>

                </UnstyledButton>
            )

        }

        return (
            <Text key={item.id}>
                Item does not exist
            </Text>
        )
    })


    // console.log(tempPricing)
    // setPricing(tempPricing)

    return (



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
                {tempPricing} DA
            </Badge>

            <MoreInfoContainer>

                <IconContext.Provider
                    value={{
                        // color: colorScheme === "dark"
                        //     ? CardContainerColors.iconsLineColorDark
                        //     : CardContainerColors.iconsLineColorLight,

                        color: colorScheme === "dark"
                            ? CardContainerColors.iconsLineColorDark
                            : CardContainerColors.iconsLineColorLight,

                        size: "1.5rem"
                    }}
                >

                    <ScrollArea
                        offsetScrollbars
                        type="auto"
                        h={250}
                    // w={250}
                    // w={300}
                    >
                        <Stack>

                            {Items}

                        </Stack>
                    </ScrollArea>


                </IconContext.Provider>
            </MoreInfoContainer>

        </Group>

    )
}

export default ItemsInfo



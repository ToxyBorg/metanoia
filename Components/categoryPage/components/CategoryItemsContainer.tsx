"use client"

import { ActionIcon, Badge, Center, Container, Grid, Group, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IconContext } from "react-icons";
import { CardContainerColors, NavBarColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext, MetanoiaSVG } from "../../../Shared/icons";
import { CategoriesType, categorizedItemsDataAtom } from "../../../Stores/itemDataStore";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import Cards from "../../MainPage/ResponsiveItemsContainer/components/Cards";

interface Props {
    category: CategoriesType
}

const CategoryItemsContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const categorizedItemsDataAtomValue = useAtomValue(categorizedItemsDataAtom)
    const { colorScheme, } = useMantineColorScheme();

    const allDataFromCategory = categorizedItemsDataAtomValue[props.category]


    const slugCategoryCards = allDataFromCategory.data.map(info => {
        return <Cards key={info.item_id} SingleItemData={info} clickGoToItemPage={true} />
    })

    const screenSizes = useAtomValue(screenSizesAtom)


    if ((slugCategoryCards.length <= 0 || slugCategoryCards == null)) {

        return (

            <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-right" duration={1500} timingFunction="ease">
                {(styles) =>
                    <Container py={"xl"}
                        style={styles}
                        fluid

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
                        mx={"auto"} my={"xl"}
                    >
                        <Stack>

                            <h1>
                                This category currently has no items. Please try something else or head back home.
                            </h1>

                            <ActionIcon variant="transparent" component={Link} href={"/"}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}

                                w={"15rem"} h={"15rem"}

                                title={"Home"}
                                mx={"auto"}

                                radius={"lg"}
                                sx={{
                                    // borderRadius: 15,
                                    WebkitBackdropFilter: "blur(2px)",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                }}

                            >
                                {/* <home.icon title={home.name} /> */}
                                <MetanoiaSVG
                                    lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                    strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                    strokeWidth={5}

                                />

                            </ ActionIcon>
                        </Stack>


                    </Container>
                }
            </Transition >
        )
    }

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>
            <Stack
                sx={(theme) => ({
                    border: `2px solid ${colorScheme === "dark"
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

                py={"xl"}
            >
                <Center>
                    <Badge
                        bg={colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight
                        }
                        className={style.Animated_Background_Gradient}
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ?
                                CardContainerColors.borderColorDark
                                : CardContainerColors.borderColorLight}`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        }}
                        p={"0.5rem"}
                        w={"fit-content"} h={"fit-content"}
                        radius="md"
                    >
                        <Group align={"center"} spacing={"xs"}>

                            <allDataFromCategory.icon.icon />

                            <Text fz={"clamp(0.85rem, 2vw , 5rem)"}
                                color={
                                    colorScheme === "dark"
                                        ? CardContainerColors.textColorDark
                                        : CardContainerColors.textColorLight
                                }
                                mr={"md"}
                            >
                                {allDataFromCategory.icon.name.toUpperCase()}
                            </Text>

                        </Group>
                    </Badge>
                </Center>

                <Grid>
                    {slugCategoryCards.map(card => {
                        return (
                            <Grid.Col span="auto" key={card.key}>
                                <Center>
                                    {card}
                                </Center>
                            </Grid.Col>)
                    })}


                </Grid>
            </Stack>

        </IconContext.Provider>
    )
}

export default CategoryItemsContainer
import { Badge, Center, Container, Grid, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../Shared/colors";
import style from "../../Shared/css/style";
import { SingleItemData } from "../../Stores/itemDataStore";
import Cards from "../MainPage/ResponsiveItemsContainer/components/Cards";

interface Props {
    item: SingleItemData
}

const ShowItem: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

            <Grid

                py={"lg"}
                sx={(theme) => ({
                    border: `2px solid ${colorScheme === "dark"
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
                <Grid.Col span="auto" >
                    <Center>
                        <Cards SingleItemData={props.item} clickGoToItemPage={false} />
                    </Center>
                </Grid.Col>

                <Grid.Col span="auto" >
                    <Container h={"100%"} >
                        <Center
                            p={"sm"}
                            sx={{
                                border: `2px solid ${colorScheme === "dark"
                                    ? CardContainerColors.borderColorDark
                                    : CardContainerColors.borderColorLight}`,
                                borderRadius: 15,
                            }}
                            bg={colorScheme === "dark"
                                ? CardContainerColors.backgroundColorDark
                                : CardContainerColors.backgroundColorLight
                            }

                            className={style.Animated_Background_Gradient}

                        >
                            <Stack

                            >
                                <Text
                                    color={
                                        colorScheme === "dark"
                                            ? CardContainerColors.textColorDark
                                            : CardContainerColors.textColorLight
                                    }
                                >
                                    <h1>
                                        {props.item.title}
                                    </h1>
                                </Text>

                                <Text
                                    color={
                                        colorScheme === "dark"
                                            ? CardContainerColors.textColorDark
                                            : CardContainerColors.textColorLight
                                    }

                                    fs={"italic"}
                                >
                                    {props.item.description}
                                </Text>
                                <Grid>
                                    {props.item.tags.map(tag => (
                                        <Grid.Col key={tag} span={"content"}>
                                            <Badge
                                                variant={"gradient"}
                                                sx={{
                                                    border: `2px solid ${colorScheme === "dark"
                                                        ? CardContainerColors.borderColorDark
                                                        : CardContainerColors.borderColorLight}`,
                                                    borderRadius: 15,
                                                }}
                                                bg={colorScheme === "dark"
                                                    ? CardContainerColors.backgroundColorDark
                                                    : CardContainerColors.backgroundColorLight
                                                }

                                                className={style.Animated_Background_Gradient}
                                            >
                                                {tag}
                                            </Badge>
                                        </Grid.Col>

                                    ))}
                                </Grid>

                            </Stack>
                        </Center>
                    </Container>

                </Grid.Col>

            </Grid>

        </IconContext.Provider>
    )
}

export default ShowItem
import { Badge, Center, Container, Grid, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../Shared/colors";
import style from "../../Shared/css/style";
import { SingleItemData } from "../../Stores/itemDataStore";
import Cards from "../UI/Cards";

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
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                            }}
                            bg={colorScheme === "dark"
                                ? CardContainerColors.backgroundColorDark
                                : CardContainerColors.backgroundColorLight
                            }

                            className={style.Animated_Background_Gradient}

                        >
                            <Stack>
                                <Group position="apart" spacing={"1rem"}>


                                    <Text
                                        sx={{
                                            textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
                                        }}
                                        color={
                                            colorScheme === "dark"
                                                ? CardContainerColors.textColorDark
                                                : CardContainerColors.textColorLight
                                        }
                                    >
                                        <Title order={1}>
                                            {props.item.title}
                                        </Title>
                                    </Text>

                                    <Badge

                                        component={Link}
                                        href={`/${props.item.category}`}
                                        size={"xl"}
                                        radius={"md"}
                                        variant={"gradient"}
                                        sx={{
                                            border: `2px solid ${colorScheme === "dark"
                                                ? CardContainerColors.borderColorDark
                                                : CardContainerColors.borderColorLight}`,
                                            // borderRadius: 15,
                                            WebkitBackdropFilter: "blur(2px)",
                                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                                            ":hover": {
                                                cursor: "pointer"
                                            }
                                        }}
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }

                                        className={style.Animated_Background_Gradient}
                                    >
                                        {props.item.category}
                                    </Badge>

                                </Group>


                                <Text
                                    color={
                                        colorScheme === "dark"
                                            ? CardContainerColors.textColorDark
                                            : CardContainerColors.textColorLight
                                    }
                                    sx={{
                                        textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
                                    }}

                                    fs={"italic"}
                                >
                                    {props.item.description}
                                </Text>
                                <Grid>
                                    {props.item.tags.map(tag => (
                                        <Grid.Col key={tag} span={"content"}>
                                            <Badge
                                                radius={"lg"}

                                                variant={"gradient"}
                                                sx={{
                                                    border: `2px solid ${colorScheme === "dark"
                                                        ? CardContainerColors.borderColorDark
                                                        : CardContainerColors.borderColorLight}`,
                                                    // borderRadius: 15,
                                                    WebkitBackdropFilter: "blur(2px)",
                                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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
"use client"

import { ActionIcon, AspectRatio, Badge, Button, Card, Collapse, Group, Indicator, Overlay, Popover, ScrollArea, Spoiler, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useCounter, useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image';
import { IconContext } from "react-icons";
import { CardContainerColors, NavBarColors } from "../../../Shared/colors";
import styles from "../../../Shared/css/styles.module.css";
import { cart, cartAdd, cartRemove, itemDescription, itemDescriptionShowLess, itemDescriptionShowMore, showAllImages } from "../../../Shared/icons";
import CardModal from "./CardModal";

interface Props {
    imageURL: string,
    imageName: string,
    description: string,
    price: number,
    secondaryImages: string[]
}

const Cards: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [count, countHandlers] = useCounter(0, { min: 0, max: 10 });
    const [opened, handlers] = useDisclosure(false);
    const [cardOverlayVisibility, cardOverlayVisibilityHandlers] = useDisclosure(false);
    const { colorScheme, } = useMantineColorScheme();

    const [cardModalOpened, cardModalHandlers] = useDisclosure(false);


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: "clamp(5vw, 1.75rem , 10vw)"
            }}>

            <CardModal
                imageURL={props.imageURL} imageName={props.imageName}
                secondaryImages={props.secondaryImages}
                cardModalOpened={cardModalOpened} cardModalHandlers={cardModalHandlers}
            />


            <Card pos={"relative"} shadow="md"
                sx={{
                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                    width: "clamp(15vw,400px,80vw)",
                }}
                radius={"md"}
            >

                <Card.Section pos={"relative"} >
                    <AspectRatio ratio={10 / 16} pos={"relative"}
                        onMouseOver={cardOverlayVisibilityHandlers.open}
                        onMouseOut={cardOverlayVisibilityHandlers.close}

                    // onTouchStart={cardOverlayVisibilityHandlers.toggle}
                    // onTouchEnd={cardOverlayVisibilityHandlers.close}

                    >
                        {cardOverlayVisibility &&
                            <Overlay opacity={0.6} color="#000" blur={2} zIndex={1}
                            // onMouseOut={cardOverlayVisibilityHandlers.close}
                            // onTouchStart={cardOverlayVisibilityHandlers.close}
                            // onClick={cardOverlayVisibilityHandlers.close}
                            // onTouchEnd={cardOverlayVisibilityHandlers.open}
                            />
                        }
                        <Image fill={true} src={props.imageURL} alt={props.imageName} loading='lazy'
                        // onMouseOver={cardOverlayVisibilityHandlers.open}
                        // onTouchStart={cardOverlayVisibilityHandlers.open}

                        // onMouseLeave
                        // onMouseLeave={cardOverlayVisibilityHandlers.close}
                        />
                    </AspectRatio>

                    <Stack
                        pos={"absolute"}
                        bottom={0}
                        w={"100%"}

                        // bg={"linear-gradient(to top, hsla(0, 0%, 0%, 80%) 0%, hsla(0, 0%, 50%, 0%) 100%)"}
                        bg={colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDarkTranslucid
                            : CardContainerColors.backgroundColorLightTranslucid
                        }
                        // className={styles.Animated_Background_Gradient}

                        sx={{
                            zIndex: 2
                        }}

                    >

                        <Group position="apart" p={"1rem"} h={"fit-content"} spacing={"xs"}> {/* h={"clamp(5vh, 4rem , 15vh)"} */}
                            <Badge variant="gradient"
                                sx={{
                                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                }}
                                bg={colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight
                                }
                                className={styles.Animated_Background_Gradient}
                                size={"xl"}
                            >
                                {props.price} DA
                            </Badge>

                            <Group>

                                <ActionIcon variant="transparent"
                                    onClick={cardModalHandlers.open}
                                    title={showAllImages.name}
                                >
                                    <showAllImages.icon style={{ alignSelf: "center" }} />
                                </ActionIcon>


                                <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                                    <Popover.Target>
                                        <Indicator label={count} showZero={false} dot={false} overflowCount={999} inline size={22}>
                                            <ActionIcon variant="transparent" title={cart.name}>
                                                <cart.icon style={{ alignSelf: "center" }} />
                                            </ActionIcon>
                                        </Indicator>
                                    </Popover.Target>
                                    <Popover.Dropdown
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }
                                        className={styles.Animated_Background_Gradient}
                                    >
                                        <Group>
                                            <ActionIcon variant="transparent" title={cartAdd.name} onClick={countHandlers.increment}>
                                                <cartAdd.icon style={{ alignSelf: "center" }} />
                                            </ActionIcon>
                                            <ActionIcon variant="transparent" title={cartRemove.name} onClick={countHandlers.decrement}>
                                                <cartRemove.icon style={{ alignSelf: "center" }} />
                                            </ActionIcon>
                                        </Group>
                                    </Popover.Dropdown>
                                </Popover>

                                <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                                    <Popover.Target>
                                        <Indicator label={count} showZero={false} dot={false} overflowCount={999} inline size={22}>
                                            <ActionIcon variant="transparent" title={itemDescription.name}>
                                                <itemDescription.icon style={{ alignSelf: "center" }} />
                                            </ActionIcon>
                                        </Indicator>
                                    </Popover.Target>
                                    <Popover.Dropdown
                                        // sx={{ border: "2px solid black" }}
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }
                                        className={styles.Animated_Background_Gradient}

                                    >
                                        <Spoiler maxHeight={120}
                                            showLabel={
                                                <ActionIcon variant="transparent" title={itemDescriptionShowMore.name} mt={"xs"}>
                                                    <itemDescriptionShowMore.icon />
                                                </ActionIcon>
                                            }
                                            hideLabel={
                                                < ActionIcon variant="transparent" title={itemDescriptionShowLess.name} mt={"xs"}>
                                                    <itemDescriptionShowLess.icon />
                                                </ActionIcon>
                                            }
                                        >
                                            <Text size="sm"
                                                color={
                                                    colorScheme === "dark"
                                                        ? CardContainerColors.textColorDark
                                                        : CardContainerColors.textColorLight
                                                }
                                            >
                                                {props.description}
                                            </Text>
                                        </Spoiler>
                                    </Popover.Dropdown>
                                </Popover>

                                {/* <ActionIcon variant="transparent"
                                    onClick={handlers.toggle}
                                    title={itemDescription.name}
                                >
                                    <itemDescription.icon style={{ alignSelf: "center" }} />
                                </ActionIcon> */}
                            </Group>


                        </Group>

                    </Stack>
                </Card.Section>

            </Card>




        </IconContext.Provider>

    )
}

export default Cards 
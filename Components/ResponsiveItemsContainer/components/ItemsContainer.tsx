"use client"

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { ActionIcon, Badge, Center, Container, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import styles from "../../../Shared/css/styles.module.css";
import { bracelets, earrings, necklaces, rings } from "../../../Shared/icons";
import { cardContainerSizes } from "../../../Shared/sizes";
import Cards from "../../ResponsiveItemCards/Cards";
import { bodyColors, CardContainerColors } from '../../../Shared/colors';
import Link from 'next/link';

const mockData = [
    {
        title: 'Top 10 places to visit in Norway this summer',
        image:
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 18, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        id: 1

    },
    {
        title: 'Best forests to visit in North America',
        image:
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 27, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        id: 2
    },
    {
        title: 'Hawaii beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 9, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        id: 3
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 12, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        id: 4
    },
];


interface Props {
    allCards: JSX.Element[]
}

const ItemCardsCarousel = (props: Props) => {
    // const autoplay = useRef(Autoplay({ delay: 5000 }));
    return (

        <Carousel slideGap={0}
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
        >
            {
                props.allCards.map((card) => {
                    return (
                        <Carousel.Slide key={card.key} >
                            <Center>

                                {card}

                            </Center>
                        </Carousel.Slide>
                    )
                })
            }
        </Carousel >
    )
}

const ItemsContainer = () => {

    const { colorScheme, } = useMantineColorScheme();


    const allCards = mockData.map((info) => (
        <Cards
            key={info.id}
            imageName={info.title} imageURL={info.image} description={info.description}
            cardWidthHeight={cardContainerSizes.mobile.cardWidthHeight} cardBorderRadius={cardContainerSizes.mobile.cardContainerBorderRadius.cardBorderRadius} />
    ))

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? CardContainerColors.iconsLineColorDark : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

            {/* <Center> */}
            {/* <Container w={"100%"}> */}
            <Stack spacing={"lg"} p={"xs"}
                sx={{
                    maxWidth: "1500px"
                }}
                m={"auto"}
            >

                {allButtons.map(button => {
                    return (

                        <Stack spacing={"lg"} key={button.name} py={"xl"}
                            sx={(theme) => ({
                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                borderRadius: cardContainerSizes.mobile.cardContainerBorderRadius.containerBorderRadius,
                                // backgroundImage: CardContainerColors.backgroun
                                // backgroundColor: theme.fn.rgba(theme.colors.dark[1], 0.2),
                                // backdropFilter: "blur(10px)",

                            })}

                            bg={colorScheme === "dark"
                                ? CardContainerColors.backgroundColorDark
                                : CardContainerColors.backgroundColorLight
                            }

                            className={styles.Animated_Background_Gradient}

                            pos={"relative"}
                        >
                            <ActionIcon
                                variant="transparent"
                                size={cardContainerSizes.mobile.cardIconSizes.ActionIconSize}
                                component={Link} href={`/${button.name}`}

                                bg={colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight
                                }
                                className={styles.Animated_Background_Gradient}
                                sx={{ border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}` }}
                                ml={"xl"} p={"0.5rem"}
                                w={"fit-content"} h={"fit-content"}
                                radius="md"

                            >
                                <Group align={"center"} spacing={"xs"}>

                                    <button.icon />

                                    <Text fz={"clamp(0.85rem, 2vw , 5rem)"}
                                        color={
                                            colorScheme === "dark"
                                                ? CardContainerColors.textColorDark
                                                : CardContainerColors.textColorLight
                                        }
                                    >
                                        {button.name}
                                    </Text>

                                </Group>


                            </ActionIcon>


                            <ItemCardsCarousel allCards={allCards} />

                        </Stack>
                    )
                })}

            </Stack>


            {/* </Container> */}

            {/* </Center> */}

        </IconContext.Provider >

    )
}

export default ItemsContainer

/* <SimpleGrid
                w={"100%"}
                cols={3}
                breakpoints={[
                    { minWidth: 0, maxWidth: "sm", cols: 1 },
                    { minWidth: "sm", maxWidth: "lg", cols: 2 },
                ]}>
                {allCards}
            </SimpleGrid> */



/* <Stack spacing={"lg"} sx={{ overflowX: "hidden" }} >

                {allButtons.map(button => {
                    return (

                        // <Container
                        //     p={"auto"}
                        //     w={"100%"}
                        //     key={button.name}
                        // >
                        <Stack spacing={"lg"} key={button.name} py={"xl"} my={"xl"} ml={"xl"} w={"110vw"}
                            sx={(theme) => ({
                                border: "2px solid white",
                                borderRadius: 15,
                                backgroundColor: theme.fn.rgba(theme.colors.dark[1], 0.2),
                                backdropFilter: "blur(10px)",

                            })}
                            pos={"relative"}
                        >
                            <Badge
                                pos={"fixed"} left={"2rem"}
                                className={styles.Animated_Background_Gradient}
                                sx={{ border: "2px solid white" }}
                                // m={"auto"}
                                variant={"gradient"}
                                w={"fit-content"}
                                size="xl" radius="xl"
                                leftSection={
                                    <ActionIcon variant="transparent" size={"sm"} title={button.name}>
                                        <button.icon title={button.name} />
                                    </ActionIcon>
                                }
                            >
                                {button.name}
                            </Badge>

                            <Carousel slideSize="30%" slideGap={"md"} align={"start"} dragFree pl={"2rem"} mt={"3rem"}>
                                {allCards.map((card) => {
                                    return (
                                        <Carousel.Slide key={card.key}>
                                            {card}
                                        </Carousel.Slide>
                                    )
                                })}
                            </Carousel>
                        </Stack>

                        // </Container>
                    )
                })}

            </Stack>
*/



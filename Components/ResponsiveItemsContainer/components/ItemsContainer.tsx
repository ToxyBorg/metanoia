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
import Cards from "./Cards";
import { bodyColors, CardContainerColors } from '../../../Shared/colors';
import Link from 'next/link';

const mockData = [
    {
        title: 'Top 10 places to visit in Norway this summer Best forests to visit in North America',
        image: "https://picsum.photos/id/1/600/800",
        secondaryImages: [
            "https://picsum.photos/id/2/600/800",
            "https://picsum.photos/id/3/600/800",
            "https://picsum.photos/id/4/600/800",
            "https://picsum.photos/id/5/600/800",
        ],
        date: 'August 18, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        price: 1580,
        id: 1

    },
    {
        title: 'Best forests to visit in North America Best forests to visit in North America',
        image:
            "https://picsum.photos/id/6/600/800",
        secondaryImages: [
            "https://picsum.photos/id/7/600/800",
            "https://picsum.photos/id/8/600/800",
            "https://picsum.photos/id/9/600/800",
        ],
        date: 'August 27, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        price: 2000,
        id: 2
    },
    {
        title: 'Hawaii beaches review: better than you think Best forests to visit in North America',
        image:
            "https://picsum.photos/id/10/600/800",
        secondaryImages: [
            "https://picsum.photos/id/11/600/800",
            "https://picsum.photos/id/12/600/800",
        ],
        date: 'September 9, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        price: 500,
        id: 3
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view Best forests to visit in North America',
        image: "https://picsum.photos/id/13/600/800",
        secondaryImages: [
            "https://picsum.photos/id/14/600/800",
            "https://picsum.photos/id/15/600/800",
            "https://picsum.photos/id/16/600/800",
        ],
        date: 'September 12, 2022',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
        price: 5854,
        id: 4
    },
];


interface Props {
    allCards: JSX.Element[]
}

const ItemCardsCarousel = (props: Props) => {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    return (

        <Carousel slideGap={0}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
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
            imageName={info.title} imageURL={info.image} description={info.description} price={info.price} secondaryImages={info.secondaryImages} />
    ))

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? CardContainerColors.iconsLineColorDark : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

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
                                        mr={"md"}
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

        </IconContext.Provider >

    )
}

export default ItemsContainer
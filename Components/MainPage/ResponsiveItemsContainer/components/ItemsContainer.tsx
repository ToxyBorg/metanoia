"use client"

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { ActionIcon, Center, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { IconContext } from "react-icons";
import Cards from "../../../UI/Cards";
import { CardContainerColors } from '../../../../Shared/colors';
import Link from 'next/link';
import { useAtom, useAtomValue } from 'jotai';
import { categorizedItemsDataAtom } from '../../../../Stores/itemDataStore';
import { cartItemsDataAtom } from '../../../../Stores/cartStore';
import style from '../../../../Shared/css/style';
import { arrowNext } from '../../../../Shared/icons';


const ItemsContainer = () => {


    const { colorScheme, } = useMantineColorScheme();
    const categorizedItemsDataAtomValue = useAtomValue(categorizedItemsDataAtom)


    const allCards = Object.entries(categorizedItemsDataAtomValue).map(([key, value]) => {

        const categoryCards = value.data.map((info) => (
            <Cards key={info.item_id} SingleItemData={info} clickGoToItemPage={true} />
        ))

        return { cards: categoryCards, icon: value.icon }
    })


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

            <Stack spacing={"xl"} p={0}
                sx={{
                    maxWidth: "1500px"
                }}
                m={"auto"}
            >

                {allCards.map(data => {

                    if ((data.cards.length <= 0 || data.cards == null)) return <></>

                    return (
                        <Stack spacing={"lg"} key={data.icon.name} py={"xl"}
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

                            pos={"relative"}
                        >
                            <ActionIcon
                                variant="transparent"

                                component={Link} href={`/${data.icon.name}`}

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
                                ml={"xl"} p={"0.5rem"}
                                w={"fit-content"} h={"fit-content"}
                                radius="md"

                            >
                                <Group align={"center"} spacing={"xs"}>

                                    <data.icon.icon />

                                    <Text fz={"clamp(0.85rem, 2vw , 5rem)"}
                                        color={
                                            colorScheme === "dark"
                                                ? CardContainerColors.textColorDark
                                                : CardContainerColors.textColorLight
                                        }
                                        mr={"md"}
                                    >
                                        {data.icon.name.toUpperCase()}
                                    </Text>
                                    <arrowNext.icon />

                                </Group>


                            </ActionIcon>


                            <ItemCardsCarousel allCards={data.cards} />

                        </Stack>
                    )
                })}

            </Stack>

        </IconContext.Provider >

    )
}

export default ItemsContainer

interface ItemCardsCarouselProps {
    allCards: JSX.Element[]
}

const ItemCardsCarousel = (props: ItemCardsCarouselProps) => {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    return (

        <Carousel
            withIndicators
            loop
            slideGap={0}
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
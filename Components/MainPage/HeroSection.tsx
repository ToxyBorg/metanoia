"use client"
import { createStyles, Overlay, Container, Title, Button, Text, Center, SimpleGrid, Transition, Stack, Group, useMantineColorScheme, ActionIcon, Spoiler } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { NavBarColors } from '../../Shared/colors';
import style from '../../Shared/css/style';
import { arrowDown, MetanoiaSVG } from '../../Shared/icons';
import { heroScrollIntoViewAtom } from '../../Stores/heroScrollIntoView';
import { goDownArrowSlideAtom, heroContainerFadeInAtom, heroTextSlideAtom, metanoiaIconSlideAtom, secondTitleSlideAtom, titleSlideAtom } from '../../Stores/heroSlidesStore';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import BackgroundParticles from './BackgroundParticles';


const HeroSection = () => {

    const { colorScheme, } = useMantineColorScheme();

    // const scrollPastRootContainerChildData = useAtomValue(refDataAtom)
    const screenSizes = useAtomValue(screenSizesAtom)
    const [heroContainerFadeInAtomValue, SetHeroContainerFadeInAtom] = useAtom(heroContainerFadeInAtom)
    const [titleSlide, setTitleSlide] = useAtom(titleSlideAtom)
    const [secondTitleSlide, setSecondTitleSlide] = useAtom(secondTitleSlideAtom)
    const [heroTextSlide, setHeroTextSlide] = useAtom(heroTextSlideAtom)
    const [metanoiaIconSlide, setMetanoiaIconSlide] = useAtom(metanoiaIconSlideAtom)
    const [goDownArrowSlide, setGoDownArrowSlide] = useAtom(goDownArrowSlideAtom)


    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        // offset: 60,
    });

    const heroScrollIntoViewAtomSetter = useSetAtom(heroScrollIntoViewAtom)
    heroScrollIntoViewAtomSetter({ targetRef: targetRef })

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                // size: "clamp(5vw, 1.75rem , 10vw)"
                size: "5rem"
            }}>


            <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-down" duration={1000} timingFunction="ease" onEntered={() => setHeroTextSlide(true)} >
                {(styles) =>

                    <Center
                        mb={"xl"}
                        h={"100vh"}

                        pos={"relative"}
                        style={styles}
                    // sx={{
                    //     border: "2px solid black"
                    // }}

                    >

                        <Transition mounted={goDownArrowSlide} transition="slide-down" duration={500} timingFunction="ease" onEntered={() => (true)}>
                            {(styles) =>
                                <ActionIcon
                                    style={styles}
                                    variant="transparent"
                                    title={"explore the site"}
                                    w={"fit-content"} h={"fit-content"}
                                    mx={"auto"}
                                    mb={"xl"}
                                    py={"xs"}
                                    px={"lg"}

                                    onClick={() =>
                                        scrollIntoView({
                                            alignment: 'start',
                                        })
                                    }

                                    pos={"fixed"} bottom={0}

                                >
                                    <arrowDown.icon />

                                </ActionIcon>
                            }
                        </Transition>

                        {/* <Transition mounted={heroContainerFadeInAtomValue} transition="fade" duration={1000} timingFunction="ease" >
                            {(styles) => */}
                        <Container
                            // style={styles}
                            pos={"relative"}
                            // sx={{


                            //     background: "rgba(255, 255, 255, 0.03)",
                            //     borderRadius: "15px",
                            //     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                            //     backdropFilter: "blur(5px)",
                            //     WebkitBackdropFilter: "blur(5px)",
                            //     border: "1px solid rgba(255, 255, 255, 0.3)",
                            //     color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight
                            // }}

                            sx={{
                                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                                // minWidth: 250,
                                // maxWidth: 1500,
                            }}

                        >


                            <Transition mounted={heroContainerFadeInAtomValue} transition="fade" duration={800} timingFunction="ease" onEntered={() => setGoDownArrowSlide(true)}>
                                {(styles) =>
                                    <Overlay color="#000" opacity={0.85}
                                        style={styles}
                                        zIndex={0}
                                        sx={{
                                            background: "rgba(255, 255, 255, 0.03)",
                                            borderRadius: "15px",
                                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                            backdropFilter: "blur(5px)",
                                            WebkitBackdropFilter: "blur(5px)",
                                            border: "1px solid rgba(255, 255, 255, 0.3)",

                                        }}
                                    />

                                }
                            </Transition>

                            {/* {heroContainerFadeInAtomValue &&
                               
                            } */}

                            <Stack spacing={"xl"}

                                p={"lg"}
                                pos={"relative"}
                            >

                                <Transition mounted={titleSlide} transition="slide-down" duration={800} timingFunction="ease" onEntered={() => SetHeroContainerFadeInAtom(true)} >
                                    {(styles) =>
                                        <Title order={1} style={styles}>Welcome To</Title>
                                    }
                                </Transition>

                                <Transition mounted={secondTitleSlide} transition="slide-down" duration={800} timingFunction="ease" onEntered={() => setTitleSlide(true)} >
                                    {(styles) =>

                                        <Title style={styles} order={2} >Metanoia</Title>
                                    }
                                </Transition>

                                <Transition mounted={heroTextSlide} transition="slide-down" duration={800} timingFunction="ease" onEntered={() => setSecondTitleSlide(true)} >
                                    {(styles) =>
                                        <Spoiler maxHeight={120} style={styles} showLabel="Show more" hideLabel="Hide">
                                            <Text size="xl" mt="xl" sx={{ overflowWrap: "break-word" }}>
                                                Welcome to our world of exquisite handmade jewelry! Each piece of our jewelry is crafted with utmost precision and care, making it a unique and special addition to your collection. Our designs are inspired by nature, art, and the beauty of the world around us. From delicate earrings to statement necklaces, every piece of our jewelry is a work of art that tells a story. We use only the finest materials, from gleaming gemstones to precious metals, to create jewelry that you will treasure for years to come. Browse our collection today and find the perfect piece to reflect your style and personality!                                            </Text>
                                        </Spoiler>

                                    }
                                </Transition>


                                {/* <Transition mounted={metanoiaIconSlide} transition="slide-down" duration={1800} timingFunction="ease" onEntered={() => setGoDownArrowSlide(true)} >
                                    {(styles) =>

                                        <ActionIcon variant="transparent"
                                            // onClick={() => {
                                            //     window.scrollTo({ top: 0, behavior: 'smooth' });
                                            // }}
                                            pos={"fixed"} top={0} right={0}
                                            style={styles}
                                            w={"5rem"} h={"5rem"}

                                            title={"Home"}
                                            m={"lg"}

                                            radius={"lg"}


                                        >
                                            <MetanoiaSVG
                                                lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                                strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                                strokeWidth={60}

                                            />

                                        </ ActionIcon>
                                    }
                                </Transition> */}


                            </Stack>
                        </Container>
                        {/* } */}
                        {/* </Transition> */}

                    </Center>

                }
            </Transition>

        </IconContext.Provider>

    );
}

export default HeroSection


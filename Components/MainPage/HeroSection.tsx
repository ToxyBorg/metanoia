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
import { goDownArrowSlideAtom, heroTextSlideAtom, metanoiaIconSlideAtom, secondTitleSlideAtom, titleSlideAtom } from '../../Stores/heroSlidesStore';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import BackgroundParticles from './BackgroundParticles';


const HeroSection = () => {

    const { colorScheme, } = useMantineColorScheme();

    // const scrollPastRootContainerChildData = useAtomValue(refDataAtom)
    const screenSizes = useAtomValue(screenSizesAtom)
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


            <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-right" duration={1000} timingFunction="ease" onEntered={() => setTitleSlide(true)} >
                {(styles) =>

                    <Center
                        mb={"xl"}
                        h={"100vh"}

                        pos={"relative"}
                        style={styles}
                    >

                        <Transition mounted={goDownArrowSlide} transition="slide-down" duration={1000} timingFunction="ease" >
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


                        <Container
                            sx={{

                                background: "rgba(255, 255, 255, 0.03)",
                                borderRadius: "16px",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight
                            }}

                        >


                            <Stack spacing={"xl"}

                                p={"lg"}
                                pos={"relative"}
                            >

                                <Transition mounted={titleSlide} transition="slide-left" duration={1800} timingFunction="ease" onEntered={() => setSecondTitleSlide(true)} >
                                    {(styles) =>
                                        <Title order={1} style={styles}>Welcome To</Title>
                                    }
                                </Transition>

                                <Transition mounted={secondTitleSlide} transition="slide-right" duration={1500} timingFunction="ease" onEntered={() => setHeroTextSlide(true)} >
                                    {(styles) =>

                                        <Title style={styles} order={2} >Metanoia</Title>
                                    }
                                </Transition>

                                <Transition mounted={heroTextSlide} transition="slide-up" duration={1500} timingFunction="ease" onEntered={() => setMetanoiaIconSlide(true)} >
                                    {(styles) =>
                                        <Spoiler maxHeight={120} style={styles} showLabel="Show more" hideLabel="Hide">
                                            <Text size="xl" mt="xl" sx={{ overflowWrap: "break-word" }}>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam esse suscipit laboriosam. Voluptates sint a quasi deserunt aperiam architecto eligendi excepturi. Suscipit eveniet cupiditate quidem repellendus quasi autem a accusamus aut exercitationem natus ab dignissimos doloremque nam distinctio odit ratione repudiandae, debitis ipsa, labore esse! Natus numquam perspiciatis illo ducimus.
                                            </Text>
                                        </Spoiler>

                                    }
                                </Transition>


                                <Transition mounted={metanoiaIconSlide} transition="slide-down" duration={1800} timingFunction="ease" onEntered={() => setGoDownArrowSlide(true)} >
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
                                </Transition>


                            </Stack>
                        </Container>

                    </Center>

                }
            </Transition>

        </IconContext.Provider>

    );
}

export default HeroSection


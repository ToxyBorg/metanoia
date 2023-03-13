"use client"
import { Container, Title, Text, Center, SimpleGrid, Transition, Stack, useMantineColorScheme, Spoiler, Card, AspectRatio } from '@mantine/core';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { NavBarColors } from '../../Shared/colors';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import heroImage from '../../public/olpntng-style-a-woman-in-a-sundress-is-floating-in-space-right-next-to-floating-gemstones.png';
import { olpntngStyleDATA_URL } from '../../Shared/dataURLS/olpntng-style-dataURL';

const HeroSection = () => {


    const { colorScheme, } = useMantineColorScheme();

    const screenSizes = useAtomValue(screenSizesAtom)

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                // size: "clamp(5vw, 1.75rem , 10vw)"
                size: "5rem"
            }}>


            <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-down" duration={1000} timingFunction="ease" >
                {(styles) =>

                    <Container
                        mt={"3rem"}
                        mb={"5rem"}

                        fluid
                        maw={1700}
                        mih={"100vh"}
                        style={styles}

                        sx={{
                            color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                        }}
                    >

                        {/* <Center> */}

                        <SimpleGrid
                            cols={2}
                            breakpoints={[
                                { maxWidth: 'xl', cols: 1, spacing: 'sm' },
                            ]}

                            sx={{
                                background: "rgba(255, 255, 255, 0.03)",
                                borderRadius: "15px",
                                boxShadow: "0 7px 30px rgba(0, 0, 0, 0.5)",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                                // border: "2px solid rgba(255, 255, 255, 0.3)",
                                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            }}
                            p={"sm"}

                        >

                            <Center>

                                <Card shadow="md"
                                    sx={{
                                        width: "clamp(90%, 800px,100%)",

                                        WebkitBackdropFilter: "blur(2px)",
                                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                    }}

                                    // pos={"relative"}
                                    radius={"lg"}

                                >

                                    <Card.Section  >


                                        <AspectRatio ratio={1 / 1} >

                                            <Image

                                                fill={true}
                                                src={heroImage}
                                                placeholder={"blur"}
                                                blurDataURL={olpntngStyleDATA_URL}
                                                alt="olpntng-style-a-woman-in-a-sundress-is-floating-in-space-right-next-to-floating-gemstones"
                                            />
                                        </AspectRatio>

                                    </Card.Section>

                                </Card>

                            </Center>


                            <Center>

                                <Stack spacing={"xl"}

                                    p={"md"}
                                >

                                    <Title sx={{ overflowWrap: "break-word", textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }} order={1} >Welcome</Title>



                                    <Title sx={{ overflowWrap: "break-word", textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }} order={2} >To Metanoia</Title>


                                    <Spoiler maxHeight={170} showLabel="Show more" hideLabel="Hide">
                                        <Text size="xl" mt="xl" sx={{ overflowWrap: "break-word", textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}>
                                            Welcome to our world of exquisite handmade jewelry! Each piece of our jewelry is crafted with utmost precision and care, making it a unique and special addition to your collection. Our designs are inspired by nature, art, and the beauty of the world around us. From delicate earrings to statement necklaces, every piece of our jewelry is a work of art that tells a story. We use only the finest materials, from gleaming gemstones to precious metals, to create jewelry that you will treasure for years to come. Browse our collection today and find the perfect piece to reflect your style and personality!
                                        </Text>
                                    </Spoiler>




                                </Stack>

                            </Center>


                        </SimpleGrid>

                        {/* </Center> */}


                    </Container>

                }
            </Transition>

        </IconContext.Provider>

    );
}

export default HeroSection

"use client"
import { createStyles, Overlay, Container, Title, Button, Text, Center, SimpleGrid, Transition } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import BackgroundParticles from './BackgroundParticles';


const HeroSection = () => {


    // const scrollPastRootContainerChildData = useAtomValue(refDataAtom)
    const screenSizes = useAtomValue(screenSizesAtom)


    return (

        <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-left" duration={1500} timingFunction="ease">
            {(styles) =>
                // <Container
                //     mb={"xl"}
                //     // mx={"xs"}
                //     h={"100vh"}
                //     fluid
                //     sx={{
                //         border: "2px solid black",
                //         borderTop: 0,
                //         borderRadius: "0 0 15px 15px"

                //     }}
                //     style={styles}
                // >

                <Center
                    mb={"xl"}
                    // mx={"xs"}
                    h={"100vh"}
                    // sx={{
                    //     border: "2px solid black",
                    //     borderTop: 0,
                    //     borderRadius: "0 0 15px 15px"

                    // }}
                    style={styles}
                >

                    <SimpleGrid
                        cols={4}
                        spacing="lg"
                        breakpoints={[
                            { maxWidth: 980, cols: 3, spacing: 'md' },
                            { maxWidth: 755, cols: 2, spacing: 'sm' },
                            { maxWidth: 600, cols: 1, spacing: 'sm' },
                        ]}
                    >

                        <Title>A fully featured React components library</Title>
                        <Text size="xl" mt="xl">
                            Build fully functional accessible web applications faster than ever – Mantine includes
                            more than 120 customizable components and hooks to cover you in any situation
                        </Text>

                        <Button variant="gradient" size="xl" radius="xl">
                            red
                        </Button>
                    </SimpleGrid>
                </Center>

                // </Container>
            }
        </Transition>


    );
}

export default HeroSection


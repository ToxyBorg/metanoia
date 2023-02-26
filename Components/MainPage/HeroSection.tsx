"use client"
import { createStyles, Overlay, Container, Title, Button, Text, Center, SimpleGrid } from '@mantine/core';
import { useAtomValue } from 'jotai';



const HeroSection = () => {


    // entry?.isIntersecting ? console.log("visible") : console.log("NOT visible")

    return (

        <Container w={"100svw"} h={"100vh"}>
            <Center>
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
        </Container>
    );
}

export default HeroSection
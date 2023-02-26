"use client"
import { createStyles, Overlay, Container, Title, Button, Text, Center } from '@mantine/core';
import { useAtomValue } from 'jotai';



const HeroSection = () => {


    // entry?.isIntersecting ? console.log("visible") : console.log("NOT visible")

    return (

        <Container w={"100svw"} h={"100vh"}>
            <Center>
                <Title>A fully featured React components library</Title>
                <Text size="xl" mt="xl">
                    Build fully functional accessible web applications faster than ever – Mantine includes
                    more than 120 customizable components and hooks to cover you in any situation
                </Text>

                <Button variant="gradient" size="xl" radius="xl">
                    red
                </Button>
            </Center>
        </Container>
    );
}

export default HeroSection
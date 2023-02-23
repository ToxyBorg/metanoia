"use client"

import { Badge, Button, Card, Container, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image';
import Cards from "./components/Cards";

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


interface Props { }

const Index: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const allCards = mockData.map((info) => (
        <Cards imageName={info.title} imageURL={info.image} description={info.description} key={info.id} />
    ))
    return (

        <Container m={"auto"} p={"xs"}
            sx={(theme) => ({
                border: "2px solid white",
                borderRadius: 15,
                backgroundColor: theme.fn.rgba(theme.colors.grape[5], 0.2),
                backdropFilter: "blur(5px)"
            })}
        >
            <SimpleGrid w={"100%"}
                cols={3}
                breakpoints={[
                    { minWidth: 0, maxWidth: "sm", cols: 1 },
                    { minWidth: "sm", maxWidth: "lg", cols: 2 },
                ]}>
                {allCards}
            </SimpleGrid>
        </Container>
    )
}

export default Index 
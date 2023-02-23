"use client"

import { AspectRatio, Badge, Button, Card, Collapse, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image';

interface Props {
    imageURL: string,
    imageName: string,
    description: string
}

const Index: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [opened, handlers] = useDisclosure(false);


    return (
        <Card pos={"relative"} shadow="sm" mx={"xs"} radius="lg"
            sx={{
                border: "2px solid white"
            }}
        >
            <Card.Section>
                <AspectRatio ratio={10 / 16} sx={{ maxWidth: 720 }} mx="auto">

                    {/* <Image
                        // src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        src={props.imageURL}
                        alt={props.imageName}
                        // height={"100%"} width={"100%"}
                        height={300}
                        fit={"cover"}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    /> */}

                    <Image
                        fill={true}
                        src={props.imageURL}
                        alt={props.imageName}

                        // width={50} height={100}
                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading='lazy'
                    />

                </AspectRatio>

                {/* <Collapse in={opened}>
                    <Text size="sm" color="dimmed" >
                        {props.description}
                    </Text>
                </Collapse> */}

                <Stack pos={"absolute"} bottom={0} w={"100%"} p={"xs"}
                    sx={(theme) => ({
                        // backgroundImage: theme.fn.linearGradient(
                        //     180,
                        //     theme.fn.rgba(theme.colors.dark[2], 0),
                        //     theme.colors.dark[2]
                        // ),
                        backgroundColor: theme.fn.rgba(theme.colors.grape[5], 0.2),
                        borderRadius: "15px 15px 0 0",
                        backdropFilter: "blur(5px)"

                    })}
                >
                    <Collapse in={opened} p={"xs"}
                    // sx={(theme) => ({
                    //     // backgroundImage: theme.fn.gradient(
                    //     //     {
                    //     //         from: theme.colors.blue[1],
                    //     //         to: theme.colors.teal[1],
                    //     //         deg: 180
                    //     //     }
                    //     // ),
                    //     // backgroundImage: theme.fn.linearGradient(
                    //     //     180,
                    //     //     theme.fn.rgba(theme.colors.dark[2], 0),
                    //     //     theme.colors.dark[2]
                    //     // ),
                    //     borderRadius: 10,
                    //     // backdropFilter: "blur(10px)"

                    // })}
                    >
                        <Text size="sm" color={"black"}>
                            {props.description}
                        </Text>
                    </Collapse>
                    <Group position="apart" p={"xs"}>
                        <Button onClick={handlers.toggle}>
                            Toggle
                        </Button>
                        <Button onClick={handlers.toggle}>
                            Toggle
                        </Button>
                    </Group>


                </Stack>
            </Card.Section>


            {/* <Text size="sm" color="dimmed" >
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text> */}

            {/* <Button variant="light" color="blue" fullWidth radius="md" pos={"absolute"} bottom={0}>
                Book classic tour now
            </Button> */}
        </Card>
    )
}

export default Index 
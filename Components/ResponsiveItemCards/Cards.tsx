"use client"

import { AspectRatio, Badge, Button, Card, Collapse, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image';
import { CardContainerColors } from "../../Shared/colors";

interface Props {
    imageURL: string,
    imageName: string,
    description: string,
    cardWidthHeight: {
        minWidth: number | string,
        maxWidth: number | string
    },
    cardBorderRadius: number | string,
}

const Cards: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [opened, handlers] = useDisclosure(false);
    const { colorScheme, } = useMantineColorScheme();


    return (
        <Card pos={"relative"} shadow="md"
            sx={{
                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                // minWidth: props.cardWidthHeight.minWidth,
                // maxWidth: props.cardWidthHeight.maxWidth,
                width: "clamp(15vw,400px,80vw)",
                borderRadius: props.cardBorderRadius
            }}
        // mx={"xs"}
        >
            <Card.Section>
                <AspectRatio ratio={10 / 16}>
                    <Image fill={true} src={props.imageURL} alt={props.imageName} loading='lazy' />
                </AspectRatio>

                <Stack pos={"absolute"} bottom={0} w={"100%"} p={"xs"}
                    sx={(theme) => ({
                        backgroundColor: theme.fn.rgba(theme.colors.grape[5], 0.2),
                        borderRadius: `${props.cardBorderRadius}px ${props.cardBorderRadius}px 0 0`,
                        backdropFilter: "blur(5px)"

                    })}
                >
                    <Collapse in={opened} p={"xs"}>
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

        </Card>
    )
}

export default Cards 
"use client"
import { ActionIcon, AspectRatio, Badge, Card, Center, createStyles, Group, rem, ScrollArea, Spoiler, Stack, Text, UnstyledButton, useMantineColorScheme } from "@mantine/core"

import { search } from "../../../Shared/icons"
import { CardContainerColors, SpotlightColors } from "../../../Shared/colors";
import { SpotlightProvider, SpotlightAction, SpotlightActionProps, openSpotlight } from '@mantine/spotlight';
import { useRouter } from 'next/navigation';
import style from "../../../Shared/css/styles.module.css";

import Image from 'next/image';
import { useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import { SpotlightContext } from "@mantine/spotlight/lib/Spotlight.context";
import { allItemsDataAtom, categorizedItemsDataAtom } from "../../../Stores/itemDataStore";


const useStyles = createStyles((theme) => ({
    action: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: `${rem(10)} ${rem(12)}`,
        borderRadius: theme.radius.md,
        backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
        // border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,

        ...theme.fn.hover({
            // backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
            border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
        }),

        '&[data-hovered]': {
            // backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
            border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,

        },
    },
}));


function CustomAction({
    action,
    styles,
    classNames,
    hovered,
    onTrigger,
    ...others
}: SpotlightActionProps) {
    const { classes, cx } = useStyles(undefined, { styles, classNames, name: 'Spotlight' });

    const router = useRouter();

    const { colorScheme, } = useMantineColorScheme();


    return (
        <UnstyledButton

            className={cx(classes.action, style.Animated_Background_Gradient)}
            data-hovered={hovered || undefined}

            onMouseDown={(event) => event.preventDefault()}
            onClick={() => router.push(`/${action.group}/${action.id}`)}
            {...others}
        >
            <Group noWrap>
                {action.image && (
                    <Center>

                        <Card pos={"relative"} shadow="md"
                            sx={{
                                border: `2px solid ${colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,

                                width: "5rem",
                            }}
                            radius={"md"}
                        >
                            <Card.Section >
                                <AspectRatio ratio={10 / 16}>
                                    <Image fill={true} src={action.image} alt={action.title} loading='lazy' />
                                </AspectRatio>
                            </Card.Section>
                        </Card>
                    </Center>
                )}

                <Stack style={{ flex: 1 }}>

                    <Text >
                        {action.title}
                    </Text>

                    <Group>
                        {action.description && (
                            <Spoiler maxHeight={50} showLabel="" hideLabel="">
                                <Text size="xs">
                                    {action.description}
                                </Text>
                            </Spoiler>

                        )}
                        <Badge>{action.price} DA</Badge>
                    </Group>

                </Stack>

            </Group>
        </UnstyledButton>
    );
}


export const Search = () => {

    const { colorScheme, } = useMantineColorScheme();


    const allItemsDataAtomValue = useAtomValue(allItemsDataAtom)

    const actions: SpotlightAction[] = allItemsDataAtomValue.map((info) => {


        return {
            id: info.item_id,
            group: info.category,
            title: info.title,
            description: info.description,
            image: info.mainImageURL,
            price: info.price,
            tags: info.tags,
            keywords: [...info.tags, info.category, info.price.toString(), info.item_id],
            onTrigger: () => { },
        }
    })

    return (

        <SpotlightProvider

            actions={actions}
            actionComponent={CustomAction}
            limit={4}

            searchIcon={<search.icon size={18} color={colorScheme === "dark" ? SpotlightColors.iconsLineColorDark : SpotlightColors.iconsLineColorLight} />}

            overlayProps={{
                blur: 0,
                opacity: 0.7,
            }}
            searchPlaceholder="Search..."
            shortcut="mod + k"
            nothingFoundMessage="Nothing found..."

            transitionProps={{
                duration: 300,
                transition: "slide-down"
            }}

            styles={(theme) => ({

                content: {
                    backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightBackgroundColorDark : SpotlightColors.spotlightBackgroundColorLight,
                    border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`

                },
                searchInput: {
                    background: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderBackgroundColorDark : SpotlightColors.spotlightHeaderBackgroundColorLight,
                    color: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderTextColorDark : SpotlightColors.spotlightHeaderTextColorLight,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`,
                },


            })}
        >

            <ActionIcon variant="transparent" onClick={() => openSpotlight()}
                w={"100%"} h={"100%"}
                title={search.name}
                mx={"auto"}

            >
                <search.icon title={search.name} />
            </ActionIcon>

        </SpotlightProvider>
    )

}


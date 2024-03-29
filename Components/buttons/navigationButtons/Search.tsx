"use client"
import { ActionIcon, AspectRatio, Badge, Card, Center, Container, createStyles, Group, Loader, LoadingOverlay, rem, ScrollArea, Skeleton, Spoiler, Stack, Text, UnstyledButton, useMantineColorScheme } from "@mantine/core"

import { search } from "../../../Shared/icons"
import { CardContainerColors, SpotlightColors } from "../../../Shared/colors";
import { SpotlightProvider, SpotlightAction, SpotlightActionProps, openSpotlight, closeSpotlight } from '@mantine/spotlight';
import { useRouter } from 'next/navigation';
import style from "../../../Shared/css/styles.module.css";

import Image from 'next/image';
import { useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import { SpotlightContext } from "@mantine/spotlight/lib/Spotlight.context";
import { allItemsDataAtom, categorizedItemsDataAtom } from "../../../Stores/itemDataStore";
import Link from "next/link";
import { useState } from "react";


const useStyles = createStyles((theme) => ({
    action: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: `${rem(10)} ${rem(12)}`,
        borderRadius: theme.radius.md,
        backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
        // border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
        color: theme.colorScheme === "dark" ? CardContainerColors.textColorDark : CardContainerColors.textColorLight,
        ...theme.fn.hover({
            // backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
            border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
        }),

        '&[data-hovered]': {
            // backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
            border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,

        },

        WebkitBackdropFilter: "blur(2px)",
        boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
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
    const [mainImageLoading, setMainImageLoading] = useState(true);


    return (
        // <Link href={`/${action.category}/${action.id}`}>
        <UnstyledButton

            className={cx(classes.action, style.Animated_Background_Gradient)}
            data-hovered={hovered || undefined}

            onMouseDown={(event) => event.preventDefault()}
            // onClick={() => router.push(`/${action.category}/${action.id}`)}
            onClick={() => {
                router.push(`/${action.category}/${action.id}`)
                closeSpotlight()
            }
            }
            {...others}
        >

            <Group noWrap >
                {action.image && (
                    <Center>

                        <Card pos={"relative"} shadow="md"
                            sx={{
                                border: `2px solid ${colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                                width: "5rem",
                            }}
                            radius={"md"}

                        >
                            <Card.Section >
                                <AspectRatio ratio={10 / 16} >
                                    <LoadingOverlay visible={mainImageLoading} overlayBlur={5} radius={"xs"}
                                        loader={<Loader color="pink" size="xl" />}
                                    />
                                    <Image fill={true} src={action.image} alt={action.title} loading='lazy'
                                        onLoadingComplete={() => setMainImageLoading(false)}
                                    />
                                </AspectRatio>
                            </Card.Section>
                        </Card>
                    </Center>
                )}

                <Stack style={{ flex: 1 }}>

                    <Badge
                        p={"xs"}
                        // maw={"35vw"}
                        maw={"clamp(20vw, 200px, 35vw)"}

                        variant="gradient"
                        sx={{
                            border: `2px solid ${colorScheme === "dark"
                                ? CardContainerColors.borderColorDark
                                : CardContainerColors.borderColorLight}`,
                            // fontSize: 
                            boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                            // overflow: "scroll"


                        }}
                        bg={colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight
                        }
                        className={style.Animated_Background_Gradient}

                    >


                        <Text
                            truncate
                            fw={"bolder"}
                            fs={"italic"}
                            color={colorScheme === "dark"
                                ? CardContainerColors.textColorDark
                                : CardContainerColors.textColorLight}
                        >

                            {action.title}

                        </Text>

                    </Badge>


                    <Group>
                        {action.description && (
                            <Spoiler maxHeight={50} showLabel={undefined} hideLabel={undefined}>
                                <Text size="xs">
                                    {action.description}
                                </Text>
                            </Spoiler>

                        )}
                        <Badge
                            variant={"gradient"}
                            sx={{
                                border: `2px solid ${colorScheme === "dark"
                                    ? CardContainerColors.borderColorDark
                                    : CardContainerColors.borderColorLight}`,
                                borderRadius: 15,
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                            }}
                            bg={colorScheme === "dark"
                                ? CardContainerColors.backgroundColorDark
                                : CardContainerColors.backgroundColorLight
                            }

                            className={style.Animated_Background_Gradient}
                        >
                            {action.price} DA
                        </Badge>
                    </Group>

                </Stack>

            </Group>
        </UnstyledButton>
        // </Link>
    );
}


export const Search = () => {

    const { colorScheme, } = useMantineColorScheme();

    const router = useRouter();

    const allItemsDataAtomValue = useAtomValue(allItemsDataAtom)

    const actions: SpotlightAction[] = allItemsDataAtomValue.map((info) => {


        return {
            id: info.item_id,
            category: info.category,
            title: info.title,
            description: info.description,
            image: info.mainImageURL,
            price: info.price,
            tags: info.tags,
            keywords: [...info.tags, info.category, info.price.toString(), info.item_id],
            onTrigger: () => { router.push(`/${info.category}/${info.item_id}`) },
        }
    })

    return (

        <SpotlightProvider

            closeOnActionTrigger
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

                // action: {
                //     width: 300,
                //     overflow: "scroll"
                // },
                content: {
                    backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightBackgroundColorDark : SpotlightColors.spotlightBackgroundColorLight,
                    border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`,
                    // width: "100%",
                    // WebkitBackdropFilter: "blur(2px)",
                    // boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",


                },
                searchInput: {
                    background: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderBackgroundColorDark : SpotlightColors.spotlightHeaderBackgroundColorLight,
                    color: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderTextColorDark : SpotlightColors.spotlightHeaderTextColorLight,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`,
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
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


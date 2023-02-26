"use client"
import { ActionIcon, AspectRatio, Badge, Center, createStyles, Group, Text, UnstyledButton, useMantineColorScheme } from "@mantine/core"

import { search } from "../../../Shared/icons"
import { SpotlightColors } from "../../../Shared/colors";
import { SpotlightProvider, SpotlightAction, SpotlightActionProps, openSpotlight } from '@mantine/spotlight';
import { useRouter } from 'next/navigation';
import style from "../../../Shared/css/styles.module.css";

import Image from 'next/image';
import { useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";

const actions: SpotlightAction[] = [
    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        title: 'Bender Bending Rodríguez',
        description: 'Fascinated with cooking, though has no sense of taste',
        new: true,
        onTrigger: () => { },
    },

    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        title: 'Carol Miller',
        description: 'One of the richest people on Earth',
        new: false,
        onTrigger: () => { },
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
        title: 'Homer Simpson',
        description: 'Overweight, lazy, and often ignorant',
        new: false,
        onTrigger: () => { },
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        title: 'Spongebob Squarepants',
        description: 'Not just a sponge',
        new: false,
        onTrigger: () => { },
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        title: 'Bender Bending Rodríguez',
        description: 'Fascinated with cooking, though has no sense of taste',
        new: true,
        onTrigger: () => { },
    },

    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        title: 'Carol Miller',
        description: 'One of the richest people on Earth',
        new: false,
        onTrigger: () => { },
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
        title: 'Homer Simpson',
        description: 'Overweight, lazy, and often ignorant',
        new: false,
        onTrigger: () => { },
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        title: 'Spongebob Squarepants',
        description: 'Not just a sponge',
        new: false,
        onTrigger: () => { },
    },
];

const useStyles = createStyles((theme) => ({
    action: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: '1rem 1.25rem',
        borderRadius: theme.radius.sm,
    },

    actionHovered: {
        backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightActionBackgroundColorDark : SpotlightColors.spotlightActionBackgroundColorLight,
        border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
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

    return (
        <UnstyledButton

            className={cx(classes.action, { [classes.actionHovered]: hovered }, style.Animated_Background_Gradient)}

            onMouseDown={(event) => event.preventDefault()}
            onClick={() => router.push(`/category/${action.id}`)}
            {...others}
        >
            <Group noWrap>
                {action.image && (
                    <Center>
                        <AspectRatio ratio={10 / 16}
                            sx={{
                                minWidth: 50,
                                maxWidth: 250,
                            }}
                        >
                            <Image fill={true} src={action.image} alt={action.title} loading='lazy' />
                        </AspectRatio>

                    </Center>
                )}

                <div style={{ flex: 1 }}>
                    <Text>{action.title}</Text>

                    {action.description && (
                        <Text size="xs">
                            {action.description}
                        </Text>
                    )}
                </div>

                {action.new && <Badge>new</Badge>}
            </Group>
        </UnstyledButton>
    );
}


export const Search = () => {

    const { colorScheme, } = useMantineColorScheme();

    const screenSizes = useAtomValue(screenSizesAtom)

    // const allSizes = getAllSizes[screenSizes]

    return (

        <SpotlightProvider

            actions={actions}
            actionComponent={CustomAction}
            limit={4}

            searchIcon={<search.icon size={18} color={colorScheme === "dark" ? SpotlightColors.iconsLineColorDark : SpotlightColors.iconsLineColorLight} />}
            overlayBlur={0} overlayOpacity={0.7}
            searchPlaceholder="Search..."
            shortcut="mod + k"
            nothingFoundMessage="Nothing found..."

            transitionDuration={300}
            transition="slide-down"

            // className={style.Animated_Background_Gradient}

            styles={(theme) => ({

                spotlight: {
                    backgroundImage: theme.colorScheme === "dark" ? SpotlightColors.spotlightBackgroundColorDark : SpotlightColors.spotlightBackgroundColorLight,
                    border: `2px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`

                },
                searchInput: {
                    background: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderBackgroundColorDark : SpotlightColors.spotlightHeaderBackgroundColorLight,
                    // borderBottom: `5px solid ${theme.colorScheme === "dark" ? SpotlightColors.spotlightBorderColorDark : SpotlightColors.spotlightBorderColorLight}`,
                    color: theme.colorScheme === "dark" ? SpotlightColors.spotlightHeaderTextColorDark : SpotlightColors.spotlightHeaderTextColorLight,
                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`,
                    // marginBottom: "0"
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

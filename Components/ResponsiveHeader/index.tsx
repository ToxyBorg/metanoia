"use client"

import { ActionIcon, Group, Header, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { darkThemeIcon, lightThemeIcon } from "../../Shared/icons";

interface Props { }

const ResponsiveHeader: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';


    return (
        <Header height={{ base: 70 }} p={"md"}>

            <Group noWrap spacing={"xs"}>
                <Text>Application header</Text>

                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={
                        () => {
                            toggleColorScheme();
                            // window.location.reload()
                        }
                    }
                    title="Toggle color scheme"
                >
                    {dark ? <lightThemeIcon.icon size={18} title={lightThemeIcon.name} /> : <darkThemeIcon.icon size={18} title={darkThemeIcon.name} />}
                </ActionIcon>


            </Group>
        </Header>
    )
}

export default ResponsiveHeader
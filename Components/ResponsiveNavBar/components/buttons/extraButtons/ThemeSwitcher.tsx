"use client"

import { ActionIcon, Group, Header, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { ModalColors } from "../../../../../Shared/colors";
import { darkThemeIcon, lightThemeIcon } from "../../../../../Shared/icons";

interface Props { }

export const ThemeSwitcher = (
    props: Props,
) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    // const dark = colorScheme === 'dark';


    return (
        <ActionIcon
            size={50} m={"auto"}
            bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
            variant="outline"
            // color={colorScheme === "dark" ? 'yellow' : 'blue'}
            sx={{
                borderRadius: 10,
                border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
            }}
            onClick={
                () => {
                    toggleColorScheme();
                    // window.location.reload()
                }
            }
            title="Toggle color scheme"
        >
            {colorScheme === "dark" ? <lightThemeIcon.icon size={18} title={lightThemeIcon.name} /> : <darkThemeIcon.icon size={18} title={darkThemeIcon.name} />}
        </ActionIcon>

    )
}

// export default ThemeSwitcher
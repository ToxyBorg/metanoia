import { ActionIcon, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { ModalColors } from "../../../Shared/colors";
import { navLock, navUnlock } from "../../../Shared/icons";
import { navBarLockedAtom } from "../../../Stores/navBarLockStore";
import style from "../../../Shared/css/styles.module.css";

interface Props { }

const NavBarLock: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();

    const [navBarLocked, SetNavBarLocked] = useAtom(navBarLockedAtom)

    return (
        <ActionIcon
            bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
            w={"100%"} h={"100%"}

            onClick={() => SetNavBarLocked(!navBarLocked)}
            // mx={"auto"}
            title={navBarLocked ? navUnlock.name : navLock.name}

            variant="outline"
            radius={"md"}
            p={"xs"}

            sx={(theme) => ({
                // backgroundImage: colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight,
                border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`

            })}

            className={style.Animated_Background_Gradient}


        >

            <Stack align="center" spacing={"xs"} >
                {navBarLocked ?
                    <navUnlock.icon title={navUnlock.name} style={{ alignSelf: "center", }} /> :
                    <navLock.icon title={navLock.name} style={{ alignSelf: "center", }} />
                }

                <Text
                    color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                    fz={"clamp(0.85rem, 1.5vw , 2rem)"}

                >
                    {navBarLocked ? navUnlock.name : navLock.name}
                </Text>

            </Stack>
        </ActionIcon>
    )
}

export default NavBarLock
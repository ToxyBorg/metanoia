import { ActionIcon, Collapse, Drawer, Grid, Modal, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { bracelets, earrings, necklaces, rings, categories } from "../../../../../Shared/icons"

import { useClickOutside, useDisclosure, useFocusTrap, useMergedRef } from "@mantine/hooks";
import { IconContext } from "react-icons";
import { DrawerColors, ModalColors, NavBarCollapseColors } from "../../../../../Shared/colors";
import Link from "next/link";
import { desktopNavIconSizes, desktopNavRadius, mobileNavIconSizes, mobileNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";

// interface Props {
//     mobileScreenSize?: boolean,
//     tabletScreenSize?: boolean,
//     desktopScreenSize?: boolean,
// }

export const MobileCategories = (mobileScreenSize: { mobileScreenSize?: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();


    const [opened, handlers] = useDisclosure(false);

    if (!mobileScreenSize) {
        handlers.close()
    }

    const allButtons = [bracelets, earrings, necklaces, rings]


    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={mobileNavIconSizes.ActionIconSize}
                sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
                title={categories.name}

            >
                <categories.icon title={categories.name} />
            </ActionIcon>

            <Drawer position="bottom" opened={opened} onClose={() => handlers.close()} size={"md"} title={"CATEGORIES"} padding={"xs"}
                overlayBlur={3}

                styles={(theme) => ({
                    drawer: {
                        background: colorScheme === "dark" ? DrawerColors.drawerBackgroundColorDark : DrawerColors.drawerBackgroundColorLight,
                        borderRadius: "15px 15px 0 0",
                        border: `2px solid ${colorScheme === "dark" ? DrawerColors.drawerBorderColorDark : DrawerColors.drawerBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? DrawerColors.drawerHeaderBackgroundColorDark : DrawerColors.drawerHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? DrawerColors.drawerHeaderTextColorDark : DrawerColors.drawerHeaderTextColorLight,
                        borderRadius: 10,
                        border: `2px solid ${colorScheme === "dark" ? DrawerColors.drawerHeaderBorderColorDark : DrawerColors.drawerHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    closeButton: {
                        color: colorScheme === "dark" ? DrawerColors.drawerHeaderTextColorDark : DrawerColors.drawerHeaderTextColorLight,
                    }

                })}
            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? DrawerColors.iconsLineColorDark : DrawerColors.iconsLineColorLight,
                        size: "4rem"
                    }}>

                    <Grid justify={"space-around"}>

                        {allButtons.map(button => {
                            return (
                                <Grid.Col span={5} key={button.name} m={"xs"}>

                                    <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                                        bg={colorScheme === "dark" ? DrawerColors.iconsBackgroundColorDark : DrawerColors.iconsBackgroundColorLight}
                                        size={95} m={"auto"}
                                        component={Link} href={`/${button.name.toLowerCase()}`}
                                        sx={{
                                            borderRadius: 10,
                                            border: `2px solid ${colorScheme === "dark" ? DrawerColors.iconsBorderColorDark : DrawerColors.iconsBorderColorLight}`
                                        }}
                                    >
                                        <Stack align="center" spacing={0}>
                                            <button.icon title={button.name} style={{ alignSelf: "center" }} />
                                            <Text
                                                color={colorScheme === "dark" ? DrawerColors.iconsLineColorDark : DrawerColors.iconsLineColorLight}>
                                                {button.name}
                                            </Text>
                                        </Stack>
                                    </ActionIcon>

                                </Grid.Col>
                            )
                        })}

                    </Grid>

                </IconContext.Provider>

            </Drawer>
        </>

    )
}

export const TabletCategories = (tabletScreenSize: { tabletScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    if (!tabletScreenSize) {
        handlers.close()
    }

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={categories.name}

            >
                <categories.icon title={categories.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CATEGORIES" size={"md"} overlayBlur={3}

                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        borderRadius: 15,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 10,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "5rem"
                    }}>

                    <Grid justify={"space-around"}>

                        {allButtons.map(button => {
                            return (
                                <Grid.Col span={5} key={button.name} m={"xs"}>

                                    <ActionIcon variant="outline" onClick={() => handlers.toggle()}
                                        bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                        size={120} m={"auto"}
                                        title={button.name}
                                        component={Link} href={`/${button.name.toLowerCase()}`}
                                        sx={{
                                            borderRadius: 10,
                                            border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
                                        }}
                                    >
                                        <Stack align="center" spacing={0}>
                                            <button.icon title={button.name} style={{ alignSelf: "center" }} />
                                            <Text
                                                color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}>
                                                {button.name}
                                            </Text>
                                        </Stack>
                                    </ActionIcon>

                                </Grid.Col>
                            )
                        })}

                    </Grid>

                </IconContext.Provider>
            </Modal>

        </>
    )

}

export const DesktopCategories = (desktopScreenSize: { desktopScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();


    const [opened, handlers] = useDisclosure(false);

    const useClickOutsideRef = useClickOutside(() => { handlers.close() });
    const focusTrapRef = useFocusTrap(opened ? true : false);
    const mergedRef = useMergedRef<HTMLDivElement>(useClickOutsideRef, focusTrapRef);

    if (!desktopScreenSize) {
        handlers.close()
    }

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <div ref={mergedRef}>

            {/* <Stack align="center" spacing={0}> */}
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={desktopNavIconSizes.ActionIconSize}
                sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={categories.name}
            >

                <categories.icon title={categories.name} />
            </ActionIcon>
            {/* <Text
                    color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}>
                    {categories.name}
                </Text> */}
            {/* </Stack> */}

            <IconContext.Provider
                value={{
                    color: colorScheme === "dark" ? NavBarCollapseColors.iconsLineColorDark : NavBarCollapseColors.iconsLineColorLight,
                    size: "2rem"
                }}>

                <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear"
                    bg={colorScheme === "dark" ? NavBarCollapseColors.collapseBackgroundColorDark : NavBarCollapseColors.collapseBackgroundColorLight}
                    // w={"100%"}
                    px={"xs"} py={"xs"}
                    sx={{ borderRadius: "0 0 10px 10px", border: `2px solid ${colorScheme === "dark" ? NavBarCollapseColors.collapseBackgroundColorDark : NavBarCollapseColors.collapseBackgroundColorLight}` }}

                >
                    <Stack align="center" >
                        {allButtons.map(button => {
                            return (
                                <ActionIcon variant="outline" onClick={() => handlers.toggle()}
                                    bg={colorScheme === "dark" ? NavBarCollapseColors.iconsBackgroundColorDark : NavBarCollapseColors.iconsBackgroundColorLight}
                                    size={"xl"} m={"auto"}
                                    title={button.name}
                                    component={Link} href={`/${button.name.toLowerCase()}`}
                                    sx={{
                                        borderRadius: 10,
                                        border: `2px solid ${colorScheme === "dark" ? NavBarCollapseColors.iconsBorderColorDark : NavBarCollapseColors.iconsBorderColorLight}`
                                    }}
                                    key={button.name}
                                >
                                    <button.icon title={button.name} style={{ alignSelf: "center" }} />
                                </ActionIcon>
                            )
                        })}
                    </Stack>
                </Collapse>
            </IconContext.Provider>


        </div>
    )

}

/*
export const TabletCategories = (props: Props) => {

    const { colorScheme, } = useMantineColorScheme();


    const [opened, handlers] = useDisclosure(false);

    const useClickOutsideRef = useClickOutside(() => { handlers.close() });
    const focusTrapRef = useFocusTrap(opened ? true : false);
    const mergedRef = useMergedRef<HTMLDivElement>(useClickOutsideRef, focusTrapRef);

    if (!props.tabletScreenSize) {
        handlers.close()
    }

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <div ref={mergedRef}>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
            >
                <categories.icon title={categories.name} />
            </ActionIcon>

            <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear"
                bg={colorScheme === "dark" ? TabletCollapseColors.collapseBackgroundColorDark : TabletCollapseColors.collapseBackgroundColorLight}
                // w={"100%"}
                px={"xs"} py={"xs"}
                sx={{ borderRadius: "0 0 10px 10px", border: `2px solid ${colorScheme === "dark" ? TabletCollapseColors.collapseBackgroundColorDark : TabletCollapseColors.collapseBackgroundColorLight}` }}

            >
                <Stack align="center" >
                    {allButtons.map(button => {
                        return (
                            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                                bg={colorScheme === "dark" ? TabletCollapseColors.iconsBackgroundColorDark : TabletCollapseColors.iconsBackgroundColorLight}
                                size={"xl"}
                                title={button.name}
                                component={Link} href={`/${button.name.toLowerCase()}`}
                                sx={{
                                    borderRadius: 10,
                                    border: `2px solid ${colorScheme === "dark" ? TabletCollapseColors.iconsBorderColorDark : TabletCollapseColors.iconsBorderColorLight}`
                                }}
                                key={button.name}
                            >
                                <button.icon title={button.name} style={{ alignSelf: "center" }} />
                            </ActionIcon>
                        )
                    })}
                </Stack>
            </Collapse>

        </div>
    )



}
*/


"use client"
import { ActionIcon, Container, Drawer, Input, Modal, Stack, Text, Tooltip, useMantineColorScheme } from "@mantine/core"

import { circleAlert, search } from "../../../../../Shared/icons"
import { useDebouncedState, useDisclosure, useFocusTrap, useInputState, useMediaQuery } from "@mantine/hooks";
import { desktopNavIconSizes, desktopNavRadius, mobileNavIconSizes, mobileNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";
import { DrawerColors, ModalColors } from "../../../../../Shared/colors";
// import { useAtomValue } from "jotai";
// import { screenSizesAtom } from "../../../../../Stores/screenSizesStore";

// interface Props {
//     mobileScreenSize?: boolean,
//     tabletScreenSize?: boolean,
// }

export const MobileSearch = (mobileScreenSize: { mobileScreenSize?: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    if (!mobileScreenSize) {
        handlers.close()
    }

    const [value, setValue] = useDebouncedState('', 500);


    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={mobileNavIconSizes.ActionIconSize}
                sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
                title={search.name}

            >
                <search.icon title={search.name} />
            </ActionIcon>

            <Drawer position="top" opened={opened} onClose={() => handlers.close()} size="md"
                title={"SEARCH"} padding={"sm"} overlayBlur={3}
                styles={(theme) => ({
                    drawer: {
                        background: colorScheme === "dark" ? DrawerColors.drawerBackgroundColorDark : DrawerColors.drawerBackgroundColorLight,
                        borderRadius: "0 0 15px 15px",
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

                <Stack
                    spacing={"xs"}
                    w={"100%"}
                    sx={{ height: "15rem" }}
                >

                    <Input

                        variant="default"
                        data-autofocus
                        icon={<search.icon size={16} color={colorScheme === "dark" ? DrawerColors.iconsLineColorDark : DrawerColors.iconsLineColorLight} />}

                        defaultValue={value}
                        onChange={(event) => setValue(event.currentTarget.value)}

                        rightSection={

                            <Tooltip
                                multiline
                                label="You can search for keywords here"
                                events={{ hover: true, focus: true, touch: true }}
                                width={200}
                                position={"bottom-start"}
                            >
                                <ActionIcon variant="transparent"
                                    bg={colorScheme === "dark" ? DrawerColors.drawerHeaderBackgroundColorDark : DrawerColors.drawerHeaderBackgroundColorLight}
                                    sx={{ border: `1px solid ${colorScheme === "dark" ? DrawerColors.drawerHeaderBorderColorDark : DrawerColors.drawerHeaderBorderColorLight}` }}
                                >
                                    <circleAlert.icon size={16} />
                                </ActionIcon>
                            </Tooltip>

                        }

                    />

                    <Container
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? DrawerColors.drawerHeaderBorderColorDark : DrawerColors.drawerHeaderBorderColorLight}`,
                            borderRadius: 5,
                            overflowY: "scroll", scrollbarWidth: "none",
                            flexGrow: 3, width: "100%"

                        }}
                        p={"xs"}
                        bg={colorScheme === "dark" ? DrawerColors.drawerHeaderBackgroundColorDark : DrawerColors.drawerHeaderBackgroundColorLight}

                    >

                        <Text
                            sx={{ hyphens: "manual", overflowWrap: "break-word" }}>
                            {value}
                        </Text>

                    </Container>

                </Stack>



            </Drawer>
        </>
    )

}

export const TabletSearch = (tabletScreenSize: { tabletScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const useClickOutsideRef = useClickOutside(() => { handlers.close() });
    // const focusTrapRef = useFocusTrap(opened ? true : false);
    // const mergedRef = useMergedRef<HTMLDivElement>(useClickOutsideRef, focusTrapRef);

    if (!tabletScreenSize) {
        handlers.close()
    }

    const [value, setValue] = useDebouncedState('', 500);


    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={search.name}

            >
                <search.icon title={search.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CATEGORIES" size={"lg"} overlayBlur={3}

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

                <Stack
                    spacing={"xs"}
                    w={"100%"}
                    sx={{ height: "15rem" }}
                >

                    <Input

                        variant="default"
                        data-autofocus
                        icon={<search.icon size={16} color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight} />}

                        defaultValue={value}
                        onChange={(event) => setValue(event.currentTarget.value)}

                        rightSection={

                            <Tooltip
                                multiline
                                label="You can search for keywords here"
                                events={{ hover: true, focus: true, touch: true }}
                                width={200}
                                position={"bottom-start"}
                            >
                                <ActionIcon variant="transparent"
                                    bg={colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight}
                                    sx={{ border: `1px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}` }}
                                >
                                    <circleAlert.icon size={16} />
                                </ActionIcon>
                            </Tooltip>

                        }

                    />

                    <Container
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                            borderRadius: 5,
                            overflowY: "scroll", scrollbarWidth: "none",
                            flexGrow: 3, width: "100%"

                        }}
                        p={"xs"}
                        bg={colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight}

                    >

                        <Text
                            sx={{ hyphens: "manual", overflowWrap: "break-word" }}>
                            {value}
                        </Text>

                    </Container>

                </Stack>

            </Modal>

        </>
    )



}

export const DesktopSearch = (desktopScreenSize: { desktopScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const useClickOutsideRef = useClickOutside(() => { handlers.close() });
    // const focusTrapRef = useFocusTrap(opened ? true : false);
    // const mergedRef = useMergedRef<HTMLDivElement>(useClickOutsideRef, focusTrapRef);

    if (!desktopScreenSize) {
        handlers.close()
    }

    const [value, setValue] = useDebouncedState('', 500);


    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={desktopNavIconSizes.ActionIconSize}
                sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={search.name}
            >
                <search.icon title={search.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="SEARCH" size={"xl"} overlayBlur={3}

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

                <Stack
                    spacing={"xs"}
                    w={"100%"}
                    sx={{ height: "15rem" }}
                >

                    <Input

                        variant="default"
                        data-autofocus
                        icon={<search.icon size={16} color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight} />}

                        defaultValue={value}
                        onChange={(event) => setValue(event.currentTarget.value)}

                        rightSection={

                            <Tooltip
                                multiline
                                label="You can search for keywords here"
                                events={{ hover: true, focus: true, touch: true }}
                                width={200}
                                position={"bottom-start"}
                            >
                                <ActionIcon variant="transparent"
                                    bg={colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight}
                                    sx={{ border: `1px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}` }}
                                >
                                    <circleAlert.icon size={16} />
                                </ActionIcon>
                            </Tooltip>

                        }

                    />

                    <Container
                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                            borderRadius: 5,
                            overflowY: "scroll", scrollbarWidth: "none",
                            flexGrow: 3, width: "100%"

                        }}
                        p={"xs"}
                        bg={colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight}

                    >

                        <Text
                            sx={{ hyphens: "manual", overflowWrap: "break-word" }}>
                            {value}
                        </Text>

                    </Container>

                </Stack>

            </Modal>

        </>
    )



}
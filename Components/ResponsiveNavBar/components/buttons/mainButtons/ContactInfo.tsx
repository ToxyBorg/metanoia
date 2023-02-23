"use client"
import { ActionIcon, Collapse, Grid, Modal, Stack, useMantineColorScheme } from "@mantine/core"

import { useClickOutside, useDisclosure, useFocusTrap, useMergedRef } from "@mantine/hooks";
import Link from "next/link";
import { IconContext } from "react-icons";
import { ModalColors, NavBarCollapseColors } from "../../../../../Shared/colors";
import { contactInfo, instagram, mail } from "../../../../../Shared/icons";
import { desktopNavIconSizes, desktopNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";


export const TabletContactInfo = (tabletScreenSize: { tabletScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();

    // const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    // const getScreenSize = useAtomValue(screenSizesAtom)

    if (!tabletScreenSize) {
        handlers.close()
    }

    const allButtons = [mail, instagram]


    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={tabletNavIconSizes.ActionIconSize}
                sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={contactInfo.name}

            >
                <contactInfo.icon title={contactInfo.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CONTACT US" size={"md"} overlayBlur={3}

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
                        size: "2rem"
                    }}>

                    <Grid justify={"space-around"}>

                        {allButtons.map(button => {
                            return (
                                <Grid.Col span={5} m={"xs"} key={button.name}>

                                    <ActionIcon
                                        size={60} m={"auto"}
                                        bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                        variant="outline"
                                        sx={{
                                            borderRadius: 10,
                                            border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`
                                        }}
                                        title={button.name}
                                        component={Link} href={button.link!}
                                    >
                                        <button.icon title={button.name} />
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

export const DesktopContactInfo = (desktopScreenSize: { desktopScreenSize: boolean }) => {

    const { colorScheme, } = useMantineColorScheme();


    const [opened, handlers] = useDisclosure(false);

    const useClickOutsideRef = useClickOutside(() => { handlers.close() });
    const focusTrapRef = useFocusTrap(opened ? true : false);
    const mergedRef = useMergedRef<HTMLDivElement>(useClickOutsideRef, focusTrapRef);

    if (!desktopScreenSize) {
        handlers.close()
    }

    const allButtons = [mail, instagram]

    return (

        <div ref={mergedRef}>

            <IconContext.Provider
                value={{
                    color: colorScheme === "dark" ? NavBarCollapseColors.iconsLineColorDark : NavBarCollapseColors.iconsLineColorLight,
                    size: "2rem"
                }}>

                <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear"
                    bg={colorScheme === "dark" ? NavBarCollapseColors.collapseBackgroundColorDark : NavBarCollapseColors.collapseBackgroundColorLight}
                    // w={"100%"}
                    px={"xs"} py={"xs"}
                    sx={{ borderRadius: 10, border: `2px solid ${colorScheme === "dark" ? NavBarCollapseColors.collapseBackgroundColorDark : NavBarCollapseColors.collapseBackgroundColorLight}` }}

                >
                    <Stack align="center" >
                        {allButtons.map(button => {
                            return (
                                <ActionIcon variant="outline" onClick={() => handlers.toggle()}
                                    bg={colorScheme === "dark" ? NavBarCollapseColors.iconsBackgroundColorDark : NavBarCollapseColors.iconsBackgroundColorLight}
                                    size={"xl"} m={"auto"}
                                    title={button.name}
                                    component={Link} href={button.link!}
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


            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={desktopNavIconSizes.ActionIconSize}
                sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
                mx={"auto"}
                title={contactInfo.name}
            >

                <contactInfo.icon title={contactInfo.name} />
            </ActionIcon>

        </div>
    )

}




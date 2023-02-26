import { ActionIcon, Grid, Modal, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { bracelets, earrings, necklaces, rings, categories } from "../../../Shared/icons"

import { useDisclosure } from "@mantine/hooks";
import { IconContext } from "react-icons";
import { ModalColors } from "../../../Shared/colors";
import Link from "next/link";
import style from "../../../Shared/css/styles.module.css";

export const Categories = () => {

    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    const allButtons = [bracelets, earrings, necklaces, rings]
    // const allButtons = [bracelets, earrings, necklaces, lightThemeIcon]

    // const screenSizes = useAtomValue(screenSizesAtom)
    // const allSizes = getAllSizes[screenSizes]

    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={categories.name}

            >
                <categories.icon title={categories.name} />
            </ActionIcon>


            <Modal opened={opened} onClose={() => handlers.close()} title="CATEGORIES" radius={"md"} size={"xl"}
                styles={(theme) => ({
                    modal: {

                        margin: "auto",
                        backgroundImage: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`

                    },
                    header: {
                        backgroundImage: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 7,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto",

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`

                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },
                    title: {
                        fontSize: "clamp(0.85rem, 2vw , 5rem)"
                    },


                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "clamp(6vw, 6rem , 15vw)"
                    }}>

                    <Grid justify={"space-evenly"}>

                        {allButtons.map(button => {
                            return (
                                <Grid.Col span={6} key={button.name}>

                                    <ActionIcon onClick={() => handlers.toggle()}
                                        bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                        w={"100%"} h={"100%"}

                                        title={button.name}
                                        variant="outline"
                                        component={Link} href={`/${button.name.toLowerCase()}`}
                                        radius={"md"}
                                        p={"xs"}

                                        sx={{
                                            border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                                        }}
                                        className={style.Animated_Background_Gradient}


                                    >
                                        <Stack align="center" spacing={"xs"} >
                                            <button.icon title={button.name} style={{ alignSelf: "center", }} />

                                            <Text
                                                color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                                fz={"clamp(0.85rem, 2vw , 5rem)"}
                                            >
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

/*

export const Categories = () => {

    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    const allButtons = [bracelets, earrings, necklaces, rings]

    // const screenSizes = useAtomValue(screenSizesAtom)
    // const allSizes = getAllSizes[screenSizes]

    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                
                size={allSizes.NavbarAndHeaderActionIconSize}
                sx={{ borderRadius: allSizes.NavbarAndHeaderActionIconBorderRadius }}
                mx={"auto"}
                title={categories.name}

            >
                <categories.icon title={categories.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="CATEGORIES" size={allSizes.ModalSize}


                styles={(theme) => ({
                    modal: {
                        margin: "auto",
                        background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                        borderRadius: allSizes.ModalBorderRadius,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`
                    },
                    header: {
                        background: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: allSizes.ModalHeaderBorderRadius,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        padding: "0.25rem", paddingInline: "1rem",
                        marginInline: "auto"
                    },
                    close: {
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                    },
                    title: {
                        fontSize: "clamp(0.85rem, 2vw , 5rem)"
                    }

                })}

            >
                <IconContext.Provider
                    value={{
                        color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                        size: "clamp(6vw, 6rem , 15vw)"
                    }}>

                    <Grid justify={"space-evenly"}>

                        {allButtons.map(button => {
                            return (
                                <Grid.Col span={allSizes.ModalGridSpanSize} key={button.name}>

                                    <ActionIcon onClick={() => handlers.toggle()}
                                        bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                        w={"100%"} h={"100%"}

                                        title={button.name}
                                        variant="outline"
                                        component={Link} href={`/${button.name.toLowerCase()}`}

                                        sx={{
                                            borderRadius: allSizes.ModalActionIconBorderRadius,
                                            border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                                        }}

                                    >
                                        <Stack align="center" spacing={"xs"} >
                                            <button.icon title={button.name} style={{ alignSelf: "center", }} />

                                            <Text
                                                color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                                                fz={"clamp(0.85rem, 2vw , 5rem)"}
                                            >
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

*/


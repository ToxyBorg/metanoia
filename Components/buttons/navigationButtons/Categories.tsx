import { ActionIcon, Center, Grid, Modal, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { bracelets, earrings, necklaces, rings, categories } from "../../../Shared/icons"

import { useDisclosure } from "@mantine/hooks";
import { IconContext } from "react-icons";
import { ModalColors } from "../../../Shared/colors";
import Link from "next/link";
import style from "../../../Shared/css/styles.module.css";
import ResponsiveModalContext from "../../UI/ResponsiveModalContext";

export const Categories = () => {

    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    const allButtons = [bracelets, earrings, necklaces, rings]

    return (

        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={categories.name}

            >
                <categories.icon title={categories.name} />
            </ActionIcon>

            <ResponsiveModalContext responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"CATEGORIES"}
                size={"xl"}
            >


                <Grid justify={"space-evenly"}>

                    {allButtons.map(button => {
                        return (
                            <Grid.Col span={6} key={button.name}>
                                {/* <Link href={`/${button.name.toLowerCase()}`}> */}

                                <ActionIcon

                                    bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}
                                    w={"100%"} h={"100%"}

                                    onClick={() => handlers.toggle()}

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
                                        // mx={"2rem"}

                                        >
                                            {button.name}
                                        </Text>
                                    </Stack>
                                </ActionIcon>
                                {/* </Link> */}

                            </Grid.Col>
                        )
                    })}

                </Grid>

            </ResponsiveModalContext>



        </>
    )
}

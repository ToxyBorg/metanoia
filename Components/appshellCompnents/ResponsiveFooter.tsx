// import "server-only"
"use client"

import { ActionIcon, Center, Footer, Group, Text, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { FooterColors } from "../../Shared/colors";
import { copyright, instagram, mail } from "../../Shared/icons";
import { footerIconSizes, footerWidthHeight } from "../../Shared/sizes";
import style from "../../Shared/css/styles.module.css";
import DevInfo from "../buttons/extraButtons/DevInfo";

const ResponsiveFooter = () => {

    const { colorScheme, } = useMantineColorScheme();


    const allButtons = [mail, instagram]

    return (

        <Footer
            // height={footerWidthHeight.height}
            height={"fit-content"}
            // w={footerWidthHeight.width}
            px="md"
            py={"0.2rem"}
            pos={"static"}
            mt={"5rem"}
            bg={colorScheme === "dark" ? FooterColors.backgroundColorDark : FooterColors.backgroundColorLight}
            sx={{
                borderTop: `2px solid ${colorScheme === "dark" ? FooterColors.borderColorDark : FooterColors.borderColorLight}`,
            }}
            className={style.Animated_Background_Gradient}

        >

            <IconContext.Provider
                value={{
                    color: colorScheme === "dark" ? FooterColors.iconsLineColorDark : FooterColors.iconsLineColorLight,
                    size: "2rem"
                }}>

                <Group position="apart" noWrap>

                    <Group>
                        {/* <Center mx={"auto"}> */}

                        <DevInfo version={"Default"} />
                        {/* </Center> */}

                        <Group noWrap>

                            <copyright.icon size={"clamp(0.85rem, 2vw , 1.5rem)"} />

                            <Text
                                // size={"1.5rem"}
                                fz={"clamp(0.85rem, 2vw , 1.5rem)"}
                                fs={"italic"}
                                sx={{
                                    color: colorScheme === "dark" ? FooterColors.iconsLineColorDark : FooterColors.iconsLineColorLight,
                                }}
                            >
                                Metanoia 2023
                            </Text>
                        </Group>

                    </Group>

                    <Group >

                        {allButtons.map(button => {
                            return (
                                <ActionIcon
                                    // size={footerIconSizes.ActionIconSize}
                                    // w={"100%"} h={"100%"}

                                    // bg={colorScheme === "dark" ? FooterColors.iconsBackgroundColorDark : FooterColors.iconsBackgroundColorLight}
                                    variant="transparent"
                                    mx={"auto"}
                                    // m={"auto"}
                                    size={"auto"}
                                    // sx={{
                                    //     borderRadius: 10,
                                    //     border: `2px solid ${colorScheme === "dark" ? FooterColors.iconsBorderColorDark : FooterColors.iconsBorderColorLight}`
                                    // }}
                                    title={button.name}
                                    component={Link} href={button.link!}
                                    key={button.name}
                                >
                                    <button.icon title={button.name} />
                                </ActionIcon>
                            )

                        })}
                    </Group>
                </Group>
            </IconContext.Provider>


        </Footer>

    )
}



export default ResponsiveFooter
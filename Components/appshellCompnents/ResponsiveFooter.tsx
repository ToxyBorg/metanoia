// import "server-only"
"use client"

import { ActionIcon, Footer, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { FooterColors } from "../../Shared/colors";
import { instagram, mail } from "../../Shared/icons";
import { footerIconSizes, footerWidthHeight } from "../../Shared/sizes";
import style from "../../Shared/css/styles.module.css";

const ResponsiveFooter = () => {

    const { colorScheme, } = useMantineColorScheme();


    const allButtons = [mail, instagram]

    return (

        <Footer
            height={footerWidthHeight.height} w={footerWidthHeight.width}
            p="md"
            pos={"static"}
            mt={"xl"}
            bg={colorScheme === "dark" ? FooterColors.backgroundColorDark : FooterColors.backgroundColorLight}
            sx={{
                borderTop: `2px solid ${colorScheme === "dark" ? FooterColors.borderColorDark : FooterColors.borderColorLight}`,
            }}
            className={style.Animated_Background_Gradient}
        // zIndex={2}

        >

            <IconContext.Provider
                value={{
                    color: colorScheme === "dark" ? FooterColors.iconsLineColorDark : FooterColors.iconsLineColorLight,
                    size: footerIconSizes.InnerIconSize
                }}>

                <Group position="apart" >

                    <Text
                        color={colorScheme === "dark" ? FooterColors.iconsLineColorDark : FooterColors.iconsLineColorLight}
                    >
                        THIS
                    </Text>

                    <Group position="center">

                        {allButtons.map(button => {
                            return (
                                <ActionIcon
                                    size={footerIconSizes.ActionIconSize}
                                    // bg={colorScheme === "dark" ? FooterColors.iconsBackgroundColorDark : FooterColors.iconsBackgroundColorLight}
                                    variant="transparent"
                                    m={"auto"}
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
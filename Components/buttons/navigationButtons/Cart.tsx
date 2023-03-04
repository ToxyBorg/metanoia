"use client"
import { ActionIcon, Box, Group, Indicator, ScrollArea, Stack, useMantineColorScheme } from "@mantine/core"

import { cart, categories } from "../../../Shared/icons"
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { cartItemsDataAtom } from "../../../Stores/cartStore";
import ResponsiveModalContext from "../../UI/ResponsiveModalContext";
import ResponsiveCartCarousel from "../../UI/ResponsiveCartCarousel";
import ResponsiveCheckoutStepper from "../../CheckoutPage/ResponsiveCheckoutStepper";
import { IconContext } from "react-icons";
import { ModalColors, NavBarColors } from "../../../Shared/colors";
import { mobileNavRadius, mobileNavWidthHeight } from "../../../Shared/sizes";
import style from "../../../Shared/css/styles.module.css";
import ClearCart from "../extraButtons/ClearCart";
import Checkout from "../extraButtons/Checkout";


export const Cart = () => {

    const { colorScheme, } = useMantineColorScheme();

    const [opened, handlers] = useDisclosure(false);

    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)

    let itemsCount = 0

    cartItemsDataAtomValue.map((item) => {
        itemsCount += item.itemNumber
    })

    return (
        <>

            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}

                title={cart.name}
            >
                <Indicator label={itemsCount} inline size={22} disabled={itemsCount <= 0}>
                    <cart.icon title={cart.name} />
                </Indicator>
            </ActionIcon>


            <ResponsiveModalContext responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"CART"}
                size={"xl"}
            >

                {cartItemsDataAtomValue.length > 0
                    ?

                    <Stack>
                        <ResponsiveCartCarousel cartItemsDataAtomValue={cartItemsDataAtomValue} />

                        <IconContext.Provider
                            value={{
                                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                                size: "2rem"
                            }}
                        >
                            <Group noWrap grow
                                sx={{
                                    borderRadius: mobileNavRadius.navbarBorderRadius,
                                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,

                                }}
                                mx={"auto"}
                                py={"0.75rem"}
                                w={"clamp(15%, 250px, 75%)"}
                                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                                className={style.Animated_Background_Gradient}


                            >
                                <ClearCart />
                                <Checkout handlers={handlers} />
                            </Group>
                        </IconContext.Provider>

                    </Stack>
                    :
                    <Stack>

                        <Box
                            sx={(theme) => ({
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                                borderRadius: theme.radius.md,
                            })}
                        >
                            Your cart is empty!
                        </Box>

                        <Box
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                                borderRadius: theme.radius.md,
                                cursor: 'pointer',

                                '&:hover': {
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                                },
                            })}
                        >
                            Head back to store.
                        </Box>
                    </Stack>

                }

            </ResponsiveModalContext>
        </>
    )
}

/*
<Stack>
                        <ResponsiveCartCarousel cartItemsDataAtomValue={cartItemsDataAtomValue} />
                        <Box
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                                borderRadius: theme.radius.md,
                                cursor: 'pointer',

                                '&:hover': {
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                                },
                            })}

                        >
                            Go to checkout!
                        </Box>
                    </Stack>
*/


/*
 <IconContext.Provider
                            value={{
                                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                                // size: "1.5rem"
                            }}>


                            <Group noWrap grow
                                sx={{
                                    borderRadius: mobileNavRadius.navbarBorderRadius,
                                    // backdropFilter: "blur(2px)",
                                    border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,

                                }}
                                // mx={"auto"} my={"md"} 
                                // py={"0.75rem"}
                                // w={mobileNavWidthHeight.width} h={"clamp(5vh, 4rem , 15vh)"}
                                bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                                className={style.Animated_Background_Gradient}

                            >
                                <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                                    w={"100%"} h={"100%"}
                                    // mx={"auto"}
                                    title={categories.name}

                                >
                                    <categories.icon title={categories.name} />
                                </ActionIcon>

                                <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                                    w={"100%"} h={"100%"}
                                    // mx={"auto"}
                                    title={categories.name}

                                >
                                    <categories.icon title={categories.name} />
                                </ActionIcon>

                                <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                                    w={"100%"} h={"100%"}
                                    // mx={"auto"}
                                    title={categories.name}

                                >
                                    <categories.icon title={categories.name} />
                                </ActionIcon>

                            </Group>
                        </IconContext.Provider> 
*/

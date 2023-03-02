"use client"
import { ActionIcon, AspectRatio, Badge, Box, Button, Card, Center, Container, Grid, Group, Indicator, Modal, ScrollArea, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core"

import { cart, cartAdd, cartRemove } from "../../../Shared/icons"
import { useDisclosure } from "@mantine/hooks";
import { CardContainerColors, ModalColors } from "../../../Shared/colors";
import { IconContext } from "react-icons";
import { useAtom, useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import style from "../../../Shared/css/styles.module.css";
import { cartItemsDataAtom } from "../../../Stores/cartStore";
import Image from 'next/image';
import { Carousel } from "@mantine/carousel";
import { showNotification } from "@mantine/notifications";
import ResponsiveModalContext from "../../ResponsiveModalContext/ResponsiveModalContext";


export const Cart = () => {

    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    const [cartItemsDataAtomValue, cartItemsDataAtomSetter] = useAtom(cartItemsDataAtom)

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

            <ResponsiveModalContext responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"CART"}>

                <Stack>
                    {cartItemsDataAtomValue.length > 0
                        ? <Carousel slideGap={"xl"} withIndicators>
                            {cartItemsDataAtomValue.map((info) => (
                                <Carousel.Slide key={info.item.item_id} >
                                    <Center>
                                        <Card pos={"relative"} shadow="md"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                // width: "50%",
                                                width: "clamp(50%, 350px, 100%)",
                                            }}
                                            radius={"md"}

                                        >

                                            <Card.Section>
                                                <AspectRatio ratio={10 / 16}>
                                                    <Image fill={true} src={info.item.mainImageURL} alt={info.item.title} loading='lazy' />
                                                </AspectRatio>
                                                <Stack
                                                    pos={"absolute"}
                                                    top={0}
                                                    w={"100%"}

                                                // bg={colorScheme === "dark"
                                                //     ? CardContainerColors.backgroundColorDarkTranslucid
                                                //     : CardContainerColors.backgroundColorLightTranslucid
                                                // }

                                                // sx={{
                                                //     zIndex: 2
                                                // }}

                                                >
                                                    <Group position="apart" p={"1rem"} h={"fit-content"} spacing={"xs"}>

                                                        <Badge variant="gradient"
                                                            sx={{
                                                                border: `2px solid ${colorScheme === "dark"
                                                                    ? CardContainerColors.borderColorDark
                                                                    : CardContainerColors.borderColorLight}`,
                                                                // fontSize: 
                                                            }}
                                                            bg={colorScheme === "dark"
                                                                ? CardContainerColors.backgroundColorDark
                                                                : CardContainerColors.backgroundColorLight
                                                            }
                                                            className={style.Animated_Background_Gradient}
                                                        // size={"xl"}
                                                        >
                                                            {info.item.title}
                                                        </Badge>

                                                        <Badge variant="gradient"
                                                            sx={{
                                                                border: `2px solid ${colorScheme === "dark"
                                                                    ? CardContainerColors.borderColorDark
                                                                    : CardContainerColors.borderColorLight}`,
                                                                // fontSize: 
                                                            }}
                                                            bg={colorScheme === "dark"
                                                                ? CardContainerColors.backgroundColorDark
                                                                : CardContainerColors.backgroundColorLight
                                                            }
                                                            className={style.Animated_Background_Gradient}
                                                        // size={"xl"}
                                                        >
                                                            {info.itemNumber}
                                                        </Badge>
                                                    </Group>


                                                </Stack>




                                                <Stack
                                                    pos={"absolute"}
                                                    bottom={0}
                                                    w={"100%"}

                                                    bg={colorScheme === "dark"
                                                        ? CardContainerColors.backgroundColorDarkTranslucid
                                                        : CardContainerColors.backgroundColorLightTranslucid
                                                    }

                                                // sx={{
                                                //     zIndex: 2
                                                // }}

                                                >
                                                    <Group position="apart" p={"1rem"} h={"fit-content"} spacing={"xs"}>

                                                        <Badge variant="gradient"
                                                            sx={{
                                                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                            }}
                                                            bg={colorScheme === "dark"
                                                                ? CardContainerColors.backgroundColorDark
                                                                : CardContainerColors.backgroundColorLight
                                                            }
                                                            className={style.Animated_Background_Gradient}
                                                            size={"xl"}
                                                        >
                                                            {info.item.price} DA
                                                        </Badge>

                                                        <Group position="center">
                                                            <ActionIcon variant="transparent" title={cartAdd.name}
                                                                onClick={

                                                                    () => {

                                                                        const newArr = cartItemsDataAtomValue.map(obj => {
                                                                            if (obj.item.item_id === info.id) {

                                                                                return {
                                                                                    ...obj,
                                                                                    itemNumber: obj.itemNumber != info.item.stock ? obj.itemNumber + 1 : obj.itemNumber + 0
                                                                                };
                                                                            }
                                                                            return obj;
                                                                        });
                                                                        cartItemsDataAtomSetter(newArr)




                                                                        info.item.stock > info.itemNumber && showNotification({

                                                                            color: "green",
                                                                            radius: "md",
                                                                            title: 'Cart notification',
                                                                            message: `We have added one ${info.item.title} to your cart.
                                            Go check it out!`,

                                                                            styles: (theme) => ({


                                                                                root: {
                                                                                    background: colorScheme === "dark"
                                                                                        ? CardContainerColors.backgroundColorDark
                                                                                        : CardContainerColors.backgroundColorLight,
                                                                                    backgroundSize: "300% 300%",
                                                                                    animation: `${style.AnimateBG} 7s ease infinite`,

                                                                                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                                                },

                                                                                title: {

                                                                                    background: colorScheme === "dark"
                                                                                        ? CardContainerColors.backgroundColorDark
                                                                                        : CardContainerColors.backgroundColorLight,
                                                                                    backgroundSize: "300% 300%",
                                                                                    animation: `${style.AnimateBG} 7s ease infinite`,


                                                                                    // border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                                                    padding: "0.5rem",
                                                                                    borderRadius: 5,

                                                                                    fontWeight: "bolder",
                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight
                                                                                },
                                                                                description: {
                                                                                    fontStyle: "italic",

                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight
                                                                                },
                                                                                closeButton: {
                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight,

                                                                                    '&:hover': {
                                                                                        backgroundColor: "green"
                                                                                    },
                                                                                },
                                                                            }),

                                                                        })

                                                                    }

                                                                }
                                                            >
                                                                <cartAdd.icon />
                                                            </ActionIcon>
                                                            <ActionIcon variant="transparent" title={cartRemove.name}
                                                                onClick={
                                                                    () => {




                                                                        const newArr = cartItemsDataAtomValue.map(obj => {
                                                                            if (obj.item.item_id === info.item.item_id) {

                                                                                return {
                                                                                    ...obj,
                                                                                    itemNumber: obj.itemNumber > 0 ? obj.itemNumber - 1 : obj.itemNumber - 0
                                                                                };
                                                                            }
                                                                            return obj;
                                                                        });

                                                                        if (info.itemNumber <= 1) {
                                                                            const indexOfObject = newArr.findIndex((object) => {
                                                                                return object.id === info.id;
                                                                            });
                                                                            if (indexOfObject !== -1) {
                                                                                newArr.splice(indexOfObject, 1);
                                                                            }
                                                                        }
                                                                        cartItemsDataAtomSetter(newArr)


                                                                        info.itemNumber > 0 && showNotification({

                                                                            color: "red",
                                                                            radius: "md",
                                                                            title: 'Cart notification',
                                                                            message: `We have removed one ${info.item.title} to your cart.`,

                                                                            styles: (theme) => ({


                                                                                root: {
                                                                                    background: colorScheme === "dark"
                                                                                        ? CardContainerColors.backgroundColorDark
                                                                                        : CardContainerColors.backgroundColorLight,
                                                                                    backgroundSize: "300% 300%",
                                                                                    animation: `${style.AnimateBG} 7s ease infinite`,

                                                                                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                                                },

                                                                                title: {
                                                                                    background: colorScheme === "dark"
                                                                                        ? CardContainerColors.backgroundColorDark
                                                                                        : CardContainerColors.backgroundColorLight,
                                                                                    backgroundSize: "300% 300%",
                                                                                    animation: `${style.AnimateBG} 7s ease infinite`,


                                                                                    // border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                                                    padding: "0.5rem",
                                                                                    borderRadius: 5,

                                                                                    fontWeight: "bolder",
                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight
                                                                                },
                                                                                description: {
                                                                                    fontStyle: "italic",
                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight
                                                                                },
                                                                                closeButton: {
                                                                                    color: colorScheme === "dark"
                                                                                        ? CardContainerColors.textColorDark
                                                                                        : CardContainerColors.textColorLight,

                                                                                    '&:hover': {
                                                                                        backgroundColor: "red"
                                                                                    },
                                                                                },
                                                                            }),

                                                                        });


                                                                    }
                                                                }
                                                            >
                                                                <cartRemove.icon />
                                                            </ActionIcon>
                                                        </Group>
                                                    </Group>


                                                </Stack>
                                            </Card.Section>

                                        </Card>

                                    </Center>
                                </Carousel.Slide>

                            ))}
                        </Carousel>

                        : <Box
                            sx={(theme) => ({
                                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                                borderRadius: theme.radius.md,
                                // cursor: 'pointer',

                                // '&:hover': {
                                //     backgroundColor:
                                //         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                                // },
                            })}
                        >
                            Your cart is empty!
                        </Box>
                    }



                    {cartItemsDataAtomValue.length > 0
                        ? <Box
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

                        : <Box
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
                    }
                </Stack>


            </ResponsiveModalContext>
        </>
    )
}

/*

 <ScrollArea style={{ height: "50vh", width: "100%" }}>
                        {cartItemsDataAtomValue.map(item => {

                            if (item.itemNumber <= 0) return null

                            else return (
                                <Grid

                                    sx={{
                                        border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                        // width: "100%",
                                    }}
                                    p={"xs"}
                                >
                                    <Grid.Col span={4}>
                                        <Card pos={"relative"} shadow="md"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                // width: "100%",
                                                // height: "100%",
                                                // width: "20%",

                                            }}
                                            radius={"md"}


                                        >
                                            <Card.Section>
                                                <AspectRatio ratio={10 / 16}>
                                                    <Image fill={true} src={item.item.mainImageURL} alt={item.item.title} loading='lazy' />
                                                </AspectRatio>
                                            </Card.Section>

                                        </Card>

                                    </Grid.Col>

                                    <Grid.Col span={8}>


<Stack sx={{
    border: "2px solid black"
}}>
    <Text sx={{ border: "2px solid black" }}>
        <Center>
            {item.item.item_id}
        </Center>
    </Text>
    <Group position="apart" grow >

        <Text sx={{ border: "2px solid black" }}>
            <Center>
                in cart: {item.itemNumber}
            </Center>
        </Text>
        <Text sx={{ border: "2px solid black" }}>
            <Center>

                x
            </Center>
        </Text>

        <Text sx={{ border: "2px solid black" }}>
            <Center>

                {item.item.price}
            </Center>
        </Text>
    </Group>
</Stack>

                                    </Grid.Col >
                                </Grid >
                            )

                        })}
                    </ScrollArea >
*/


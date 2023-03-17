"use client"

import { ActionIcon, AspectRatio, Badge, Card, Group, Indicator, Loader, LoadingOverlay, Popover, Skeleton, Space, Spoiler, Stack, Text, Transition, useMantineColorScheme } from "@mantine/core";
import { useCounter, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom } from "jotai";
import { IconContext } from "react-icons";
import { CardContainerColors, NavBarColors } from "../../Shared/colors";
import { cartItemsDataAtom, cartType, SingleCartItemType } from "../../Stores/cartStore";
import { SingleItemData } from "../../Stores/itemDataStore";
import { cart, cartAdd, cartRemove, itemDescription, itemDescriptionShowLess, itemDescriptionShowMore, showAllImages } from "../../Shared/icons";
import CardModal from "../MainPage/ResponsiveItemsContainer/components/CardModal";
import style from "../../Shared/css/style";
import Link from "next/link";
import AdminCardOptionsButton from "../buttons/adminButtons/AdminCardOptionsButton";
import Image from "next/image";
import { useState } from "react";

interface Props {
    SingleItemData: SingleItemData,
    clickGoToItemPage: boolean
}

const Cards = (props: Props) => {

    const [cartItemsDataAtomValue, cartItemsDataAtomSetter] = useAtom(cartItemsDataAtom)

    const [mainImageLoading, setMainImageLoading] = useState(true);
    const [secondaryImageLoading, setSecondaryImageLoading] = useState(true);


    let searched_obj: SingleCartItemType | undefined = cartItemsDataAtomValue.find(callback_func);

    // callback function returning the boolean value
    function callback_func(object: SingleCartItemType): boolean {

        // if the object color is green, return true; otherwise, return false for a particular object element
        if (object.id == props.SingleItemData.item_id) {
            return true;
        }
        return false;
    };

    const count = searched_obj == undefined ? 0 : searched_obj.itemNumber

    // const [count, countHandlers] = useCounter(searched_obj == undefined ? 0 : searched_obj.itemNumber, { min: 0, max: props.SingleItemData.stock });

    const [cardOverlayVisibility, cardOverlayVisibilityHandlers] = useDisclosure(false);
    const { colorScheme, } = useMantineColorScheme();

    const [cardModalOpened, cardModalHandlers] = useDisclosure(false);


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                size: "clamp(5vw, 1.75rem , 10vw)"
            }}>

            <CardModal
                imageURL={props.SingleItemData.mainImageURL} imageName={props.SingleItemData.title}
                secondaryImages={props.SingleItemData.secondaryImagesURLS}
                cardModalOpened={cardModalOpened} cardModalHandlers={cardModalHandlers}
            />


            <Card pos={"relative"} shadow="md"
                sx={{
                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                    width: "clamp(15vw,400px,80vw)",
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
                radius={"md"}
            >

                <Card.Section pos={"relative"} >

                    {props.clickGoToItemPage

                        ?
                        <Link href={`/${props.SingleItemData.category}/${props.SingleItemData.item_id}`}>
                            <AspectRatio ratio={10 / 16} pos={"relative"}
                                onMouseOver={cardOverlayVisibilityHandlers.open}
                                onMouseOut={cardOverlayVisibilityHandlers.close}

                            >
                                <Transition mounted={cardOverlayVisibility} transition="slide-down" duration={400} timingFunction="ease">
                                    {(styles) =>
                                        <>
                                            <LoadingOverlay visible={secondaryImageLoading} overlayBlur={5}
                                                zIndex={3}
                                                loader={<Loader color="pink" size="xl" />}
                                                style={styles} />

                                            <Image fill={true} src={props.SingleItemData.secondaryImagesURLS[0]} alt={props.SingleItemData.title} priority
                                                style={{ ...styles, zIndex: 2 }}

                                                onLoadingComplete={() => setSecondaryImageLoading(false)}
                                            />


                                        </>



                                    }

                                </Transition>


                                <LoadingOverlay visible={mainImageLoading} overlayBlur={5} zIndex={1}
                                    loader={<Loader color="pink" size="xl" />}
                                />

                                <Image fill={true} src={props.SingleItemData.mainImageURL} alt={props.SingleItemData.title} loading='lazy'
                                    onLoadingComplete={() => setMainImageLoading(false)}
                                />
                            </AspectRatio>
                        </Link>

                        :
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        <AspectRatio ratio={10 / 16} pos={"relative"}
                            onMouseOver={cardOverlayVisibilityHandlers.open}
                            onMouseOut={cardOverlayVisibilityHandlers.close}
                        >
                            <Transition mounted={cardOverlayVisibility} transition="slide-down" duration={400} timingFunction="ease">
                                {(styles) =>
                                    <>
                                        <LoadingOverlay visible={secondaryImageLoading} overlayBlur={5}
                                            zIndex={3}
                                            loader={<Loader color="pink" size="xl" />}
                                            style={styles} />


                                        <Image fill={true} src={props.SingleItemData.secondaryImagesURLS[0]} alt={props.SingleItemData.title} priority
                                            // style={{ ...styles, zIndex: 1 }}
                                            style={{ ...styles, zIndex: 2 }}

                                            onLoadingComplete={() => setSecondaryImageLoading(false)}

                                        />
                                    </>


                                }


                            </Transition>

                            <LoadingOverlay visible={mainImageLoading} overlayBlur={5} zIndex={1}
                                loader={<Loader color="pink" size="xl" />}
                            />

                            <Image fill={true} src={props.SingleItemData.mainImageURL} alt={props.SingleItemData.title} loading='lazy'
                                onLoadingComplete={() => setMainImageLoading(false)}
                            />

                        </AspectRatio>
                    }


                    <Stack
                        pos={"absolute"}
                        top={0}
                        w={"100%"}

                        // bg={colorScheme === "dark"
                        //     ? CardContainerColors.backgroundColorDarkTranslucid
                        //     : CardContainerColors.backgroundColorLightTranslucid
                        // }

                        sx={{
                            zIndex: 3
                        }}

                    >
                        <Group position="apart" p={"1rem"} h={"fit-content"}
                        // spacing={"xs"}
                        // grow
                        // sx={{
                        //     border: "2px solid black"
                        // }}
                        >

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
                                {props.SingleItemData.title}
                            </Badge>


                            <AdminCardOptionsButton SingleItemData={props.SingleItemData} />
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

                        sx={{
                            zIndex: 3
                        }}

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
                                {props.SingleItemData.price} DA
                            </Badge>

                            <Group>

                                <ActionIcon variant="transparent"
                                    onClick={cardModalHandlers.open}
                                    title={showAllImages.name}
                                >
                                    <showAllImages.icon style={{ alignSelf: "center" }} />
                                </ActionIcon>


                                <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                                    <Popover.Target>
                                        <Indicator label={count} inline size={22} disabled={count <= 0}>
                                            <ActionIcon variant="transparent" title={cart.name}>
                                                <cart.icon style={{ alignSelf: "center" }} />
                                            </ActionIcon>
                                        </Indicator>
                                    </Popover.Target>
                                    <Popover.Dropdown
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }
                                        className={style.Animated_Background_Gradient}
                                    >
                                        <Badge variant="gradient"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                            }}
                                            bg={colorScheme === "dark"
                                                ? CardContainerColors.backgroundColorDark
                                                : CardContainerColors.backgroundColorLight
                                            }
                                            className={style.Animated_Background_Gradient}
                                            size={"md"}
                                        >
                                            {props.SingleItemData.stock - count} in stock
                                            {/* {count} in stock */}

                                        </Badge>
                                        <Space h="sm" />
                                        <Group position="center">
                                            <ActionIcon variant="transparent" title={cartAdd.name}
                                                onClick={

                                                    () => {

                                                        let isIn = false;

                                                        for (const obj of cartItemsDataAtomValue) {
                                                            if (obj.item.item_id === props.SingleItemData.item_id) {
                                                                isIn = true;
                                                                break
                                                            }
                                                        }

                                                        if (isIn) {
                                                            const newArr = cartItemsDataAtomValue.map(obj => {
                                                                if (obj.item.item_id === props.SingleItemData.item_id) {

                                                                    return {
                                                                        ...obj,
                                                                        itemNumber: obj.itemNumber != props.SingleItemData.stock ? obj.itemNumber + 1 : obj.itemNumber + 0
                                                                    };
                                                                }
                                                                return obj;
                                                            });
                                                            cartItemsDataAtomSetter(newArr)
                                                        }
                                                        else {
                                                            const newArr = cartItemsDataAtomValue
                                                            newArr.push({
                                                                id: props.SingleItemData.item_id,
                                                                item: props.SingleItemData,
                                                                itemNumber: 1,
                                                                measurements: null
                                                            })
                                                            cartItemsDataAtomSetter(newArr)

                                                        }


                                                        props.SingleItemData.stock > count && showNotification({

                                                            color: "green",
                                                            radius: "md",
                                                            title: 'Cart notification',
                                                            // message: `We have added one ${props.SingleItemData.title} to your cart.Go check it out!`,
                                                            message: <p>We have added one <b>{props.SingleItemData.title}</b> to your cart.Go check it out!</p>,

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

                                                        // countHandlers.increment()


                                                    }

                                                }
                                            >
                                                <cartAdd.icon />
                                            </ActionIcon>
                                            <ActionIcon variant="transparent" title={cartRemove.name}
                                                onClick={
                                                    () => {

                                                        let isIn = false;

                                                        for (const obj of cartItemsDataAtomValue) {
                                                            if (obj.item.item_id === props.SingleItemData.item_id) {
                                                                isIn = true;
                                                                break
                                                            }
                                                        }


                                                        if (isIn) {


                                                            const newArr = cartItemsDataAtomValue.map(obj => {
                                                                if (obj.item.item_id === props.SingleItemData.item_id) {

                                                                    return {
                                                                        ...obj,
                                                                        itemNumber: obj.itemNumber > 0 ? count - 1 : count - 0
                                                                    };
                                                                }
                                                                return obj;
                                                            });

                                                            if (count <= 1) {
                                                                const indexOfObject = newArr.findIndex((object) => {
                                                                    return object.id === props.SingleItemData.item_id;
                                                                });
                                                                if (indexOfObject !== -1) {
                                                                    newArr.splice(indexOfObject, 1);
                                                                }
                                                            }
                                                            cartItemsDataAtomSetter(newArr)
                                                        }

                                                        count > 0 && showNotification({

                                                            color: "red",
                                                            radius: "md",
                                                            title: 'Cart notification',
                                                            message: <p>We have removed one <b>{props.SingleItemData.title}</b> from your cart.</p>,

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

                                                        // countHandlers.decrement()

                                                    }
                                                }
                                            >
                                                <cartRemove.icon />
                                            </ActionIcon>
                                        </Group>
                                    </Popover.Dropdown>
                                </Popover>

                                <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                                    <Popover.Target>
                                        <ActionIcon variant="transparent" title={itemDescription.name}>
                                            <itemDescription.icon style={{ alignSelf: "center" }} />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown
                                        bg={colorScheme === "dark"
                                            ? CardContainerColors.backgroundColorDark
                                            : CardContainerColors.backgroundColorLight
                                        }
                                        className={style.Animated_Background_Gradient}

                                    >
                                        <Spoiler maxHeight={120}
                                            showLabel={
                                                <ActionIcon variant="transparent" title={itemDescriptionShowMore.name} mt={"xs"}>
                                                    <itemDescriptionShowMore.icon />
                                                </ActionIcon>
                                            }
                                            hideLabel={
                                                < ActionIcon variant="transparent" title={itemDescriptionShowLess.name} mt={"xs"}>
                                                    <itemDescriptionShowLess.icon />
                                                </ActionIcon>
                                            }
                                        >
                                            <Text size="sm"
                                                color={
                                                    colorScheme === "dark"
                                                        ? CardContainerColors.textColorDark
                                                        : CardContainerColors.textColorLight
                                                }
                                            >
                                                {props.SingleItemData.description}
                                            </Text>
                                        </Spoiler>
                                    </Popover.Dropdown>
                                </Popover>

                            </Group>


                        </Group>

                    </Stack>
                </Card.Section>

            </Card>




        </IconContext.Provider >

    )
}

export default Cards 
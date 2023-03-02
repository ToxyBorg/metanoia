import { AspectRatio, Card, Center, Grid, Modal, ScrollArea, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { CardContainerColors, ModalColors } from "../../../Shared/colors";
import style from "../../../Shared/css/styles.module.css";
import Image from 'next/image';
import { Carousel } from "@mantine/carousel";


interface Props {
    imageURL: string,
    imageName: string,
    // itemId : string | number,
    cardModalOpened: boolean,
    cardModalHandlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },
    secondaryImages: string[]

}

const CardModal: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();


    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                size: "clamp(6vw, 6rem , 15vw)"
            }}>
            <Modal.Root opened={props.cardModalOpened} onClose={props.cardModalHandlers.close}
                returnFocus
                radius={"md"}
                size="xl"
                transitionProps={{
                    transition: "slide-down",
                    duration: 300,
                }}


            // styles={(theme) => ({
            //     content: {
            //         margin: "auto",
            //         background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
            //         border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

            //         backgroundSize: "300% 300%",
            //         animation: `${style.AnimateBG} 7s ease infinite`,
            //     },

            // })}

            >

                <Modal.Overlay />

                <Modal.Content sx={{


                    padding: "1rem",
                    margin: "auto",
                    backgroundImage: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                    border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                    // transitionTimingFunction: "ease-in-out",

                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`
                }}>

                    <Modal.Body p={0} m={"xs"}>


                        <Carousel slideGap={"xl"} withIndicators>

                            <Carousel.Slide key={props.imageURL} >
                                <Center>
                                    <Card pos={"relative"} shadow="md"
                                        sx={{
                                            border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                            // width: "100%",
                                            width: "clamp(60%, 400px, 100%)",

                                        }}
                                        radius={"md"}

                                    >
                                        <Card.Section>
                                            <AspectRatio ratio={10 / 16}>
                                                <Image fill={true} src={props.imageURL} alt={props.imageName} loading='lazy' />
                                            </AspectRatio>
                                        </Card.Section>

                                    </Card>

                                </Center>
                            </Carousel.Slide>

                            {props.secondaryImages.map((info) => (

                                <Carousel.Slide key={info} >
                                    <Center>
                                        <Card pos={"relative"} shadow="md"
                                            sx={{
                                                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                                // width: "100%",
                                                width: "clamp(60%, 400px, 100%)",

                                            }}
                                            radius={"md"}

                                        >
                                            <Card.Section>
                                                <AspectRatio ratio={10 / 16}>
                                                    <Image fill={true} src={info} alt={info} loading='lazy' />
                                                </AspectRatio>
                                            </Card.Section>

                                        </Card>

                                    </Center>
                                </Carousel.Slide>

                            ))}
                        </Carousel>

                    </Modal.Body>

                </Modal.Content>

            </Modal.Root>
        </IconContext.Provider>
    )
}

export default CardModal
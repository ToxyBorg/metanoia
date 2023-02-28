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
        <Modal opened={props.cardModalOpened} onClose={props.cardModalHandlers.close}

            radius={"md"}
            size="xl"
            transition="slide-down"
            transitionDuration={300}
            withCloseButton={false}
            styles={(theme) => ({
                modal: {
                    margin: "auto",
                    background: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                    border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`,
                },

            })}

        >
            <IconContext.Provider
                value={{
                    color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                    size: "clamp(6vw, 6rem , 15vw)"
                }}>

                <Carousel slideGap={"xl"}>

                    {props.secondaryImages.map((info) => (

                        <Carousel.Slide key={info} >
                            <Center>
                                <Card pos={"relative"} shadow="md"
                                    sx={{
                                        border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                        width: "100%",
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

            </IconContext.Provider>
        </Modal>
    )
}

export default CardModal
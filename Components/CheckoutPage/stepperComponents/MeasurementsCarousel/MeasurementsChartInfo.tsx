import { ActionIcon, AspectRatio, Card, Center, Loader, LoadingOverlay, Modal, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { moreInfoIcon } from "../../../../Shared/icons";
import { CategoriesType } from "../../../../Stores/itemDataStore";
import { IconContext } from "react-icons";
import { CardContainerColors, ModalColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import ringMeasurementsGuide from '../../../../public/ring_measurements_guide.webp'
import braceletMeasurementsGuide from '../../../../public/bracelet_measurements_guide.webp'
import necklaceMeasurementsGuide from '../../../../public/necklace_measurements_guide.jpg'
import earringMeasurementsGuide from '../../../../public/earring_measurements_guide.webp'
import { useState } from "react";

interface Props {
    CategoriesType: CategoriesType
}

const MeasurementsChartInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const [opened, handlers] = useDisclosure(false);

    const [mainImageLoading, setMainImageLoading] = useState(true);

    return (

        <IconContext.Provider
            value={{
                // color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                // size: "clamp(6vw, 6rem , 15vw)"
            }}>

            <ActionIcon variant="transparent" title={moreInfoIcon.name} onClick={handlers.toggle}>
                <moreInfoIcon.icon style={{ alignSelf: "center" }} />
            </ActionIcon>


            <Modal.Root opened={opened} onClose={handlers.close}
                returnFocus
                radius={"md"}
                size="md"
                transitionProps={{
                    transition: "slide-down",
                    duration: 300,
                }}
            >

                <Modal.Overlay />

                <Modal.Content sx={{


                    // padding: "1rem",
                    margin: "auto",
                    backgroundImage: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                    border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`
                }}>

                    <Modal.Body p={0} m={"xs"}>


                        <Center>
                            <Card pos={"relative"} shadow="md"
                                sx={{
                                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                    // width: "clamp(60%, 400px, 100%)",
                                    width: "100%"

                                }}
                                radius={"md"}

                            >
                                <Card.Section>
                                    <AspectRatio ratio={10 / 18}>

                                        <LoadingOverlay visible={mainImageLoading} overlayBlur={5} radius={"xs"}
                                            loader={<Loader color="pink" size="xl" />}
                                        />

                                        {props.CategoriesType == "rings" &&
                                            <Image fill={true} src={ringMeasurementsGuide} alt={"Ring measurements guide"} loading='lazy'
                                                onLoadingComplete={() => setMainImageLoading(false)}
                                            />
                                        }
                                        {props.CategoriesType == "bracelets" &&
                                            <Image fill={true} src={braceletMeasurementsGuide} alt={"Bracelet measurements guide"} loading='lazy'
                                                onLoadingComplete={() => setMainImageLoading(false)}
                                            />
                                        }

                                        {props.CategoriesType == "necklaces" &&
                                            <Image fill={true} src={necklaceMeasurementsGuide} alt={"Necklace measurements guide"} loading='lazy'
                                                onLoadingComplete={() => setMainImageLoading(false)}
                                            />
                                        }

                                        {props.CategoriesType == "earrings" &&

                                            <Image fill={true} src={earringMeasurementsGuide} alt={"Earring measurements guide"} loading='lazy'
                                                onLoadingComplete={() => setMainImageLoading(false)}
                                            />
                                        }

                                    </AspectRatio>
                                </Card.Section>

                            </Card>

                        </Center>


                    </Modal.Body>

                </Modal.Content>

            </Modal.Root>
        </IconContext.Provider>
    )
}

export default MeasurementsChartInfo
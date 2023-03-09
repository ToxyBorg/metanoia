import { Center, Grid, MantineNumberSize, Modal, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { ModalColors } from "../../Shared/colors";
import style from "../../Shared/css/styles.module.css";

interface Props {
    children: React.ReactNode,
    responsiveModalOpened: boolean,
    responsiveModalHandlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },
    modalTitle: string,
    size?: MantineNumberSize | undefined,
    fullScreen?: boolean,

}

const ResponsiveModalContext: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();
    // const [opened, handlers] = useDisclosure(false);

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight,
                size: "clamp(6vw, 6rem , 15vw)"
            }}>

            <Modal.Root opened={props.responsiveModalOpened} onClose={() => props.responsiveModalHandlers.close()} radius={"md"}
                size={props.size}
                fullScreen={props.fullScreen}
                transitionProps={{
                    transition: "slide-down",
                    duration: 300,
                }}

            >


                <Modal.Overlay />

                <Modal.Content sx={{


                    padding: "1rem",
                    // margin: "auto",
                    backgroundImage: colorScheme === "dark" ? ModalColors.modalBackgroundColorDark : ModalColors.modalBackgroundColorLight,
                    border: `2px solid ${colorScheme === "dark" ? ModalColors.modalBorderColorDark : ModalColors.modalBorderColorLight}`,

                    // transitionTimingFunction: "ease-in-out",

                    backgroundSize: "300% 300%",
                    animation: `${style.AnimateBG} 7s ease infinite`
                }}>

                    <Modal.Header sx={{
                        backgroundImage: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                        color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,
                        borderRadius: 7,
                        border: `2px solid ${colorScheme === "dark" ? ModalColors.modalHeaderBorderColorDark : ModalColors.modalHeaderBorderColorLight}`,
                        // padding: "0.25rem", paddingInline: "1rem",
                        // marginInline: "auto",
                        marginBottom: "0.5rem",

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,

                        zIndex: 2,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",

                    }}>

                        <Modal.Title fz={"clamp(0.85rem, 2vw , 5rem)"}>{props.modalTitle}</Modal.Title>

                        <Modal.CloseButton sx={{
                            color: colorScheme === "dark" ? ModalColors.modalHeaderTextColorDark : ModalColors.modalHeaderTextColorLight,

                            ":hover": {

                                backgroundImage: colorScheme === "dark" ? ModalColors.modalHeaderBackgroundColorDark : ModalColors.modalHeaderBackgroundColorLight,
                            }

                        }} />
                    </Modal.Header>

                    <Modal.Body p={0} m={"xs"}>
                        {/* <Center> */}

                        {props.children}
                        {/* </Center> */}

                    </Modal.Body>
                </Modal.Content>


            </Modal.Root>
        </IconContext.Provider>
    )
}

export default ResponsiveModalContext
import { AspectRatio, Card, Group, Transition, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminAddItem, adminRejectImageUpload, adminUploadImage } from "../../../../../Shared/icons";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

interface Props {
    SingleItemDataSecondaryImagesURLS: SingleItemData['secondaryImagesURLS']

}

const EditSecondaryImages: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();



    return (
        <Group position="center"

            sx={{
                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                // background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "15px",
                boxShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",
                // backdropFilter: "blur(5px)",
                // WebkitBackdropFilter: "blur(5px)",
            }}
            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }
            className={style.Animated_Background_Gradient}
            p={"sm"}
            mb={"lg"}
        >
            <SecondaryImagesUploaders index={0}
                SingleItemDataSecondaryImage={props.SingleItemDataSecondaryImagesURLS[0] !== undefined
                    ? props.SingleItemDataSecondaryImagesURLS[0]
                    : ""
                }
            />
            <SecondaryImagesUploaders index={1}
                SingleItemDataSecondaryImage={props.SingleItemDataSecondaryImagesURLS[1] !== undefined
                    ? props.SingleItemDataSecondaryImagesURLS[1]
                    : ""
                }
            />
            <SecondaryImagesUploaders index={2}
                SingleItemDataSecondaryImage={props.SingleItemDataSecondaryImagesURLS[2] !== undefined
                    ? props.SingleItemDataSecondaryImagesURLS[2]
                    : ""
                }
            />
        </Group>

    )
}

export default EditSecondaryImages

/////////////////////////////////////////////////////////////////////////////////////////////////

interface SecondaryImagesUploadersProps extends Partial<DropzoneProps> {
    index: number,
    // adminAddItemAtomValue: SingleItemData,
    SingleItemDataSecondaryImage: string
}

const SecondaryImagesUploaders = (props: SecondaryImagesUploadersProps) => {

    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)


    const [Loading, setLoading] = useState(false)

    const { colorScheme, } = useMantineColorScheme();
    const theme = useMantineTheme();


    const [imageUploaderOverlayVisibility, imageUploaderOverlayVisibilityHandlers] = useDisclosure(
        props.SingleItemDataSecondaryImage.length > 1
            ? false
            : true
    )
    const [selectedAnImage, selectedAnImageHandlers] = useDisclosure(false)


    const [ImageURL, setImageURL] = useState(props.SingleItemDataSecondaryImage)

    return (
        <Card shadow="md"
            sx={{

                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                // width: "clamp(15vw,50px,70vw)",
                width: "5rem",
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
            radius={"md"}

        >

            <Card.Section>

                <AspectRatio ratio={10 / 16} pos={"relative"}
                    onMouseOver={() => { imageUploaderOverlayVisibilityHandlers.open() }}
                    onMouseOut={() => { if (ImageURL.length > 1) imageUploaderOverlayVisibilityHandlers.close() }}
                >
                    <Transition mounted={imageUploaderOverlayVisibility} transition="slide-down" duration={500} timingFunction="ease">
                        {(styles) =>
                            <Dropzone
                                style={{ ...styles, zIndex: 1 }}
                                bg={colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight
                                }
                                className={style.Animated_Background_Gradient}

                                multiple={false}
                                maxFiles={1}
                                onDrop={(file) => {
                                    setLoading(true)
                                    const adminTempItem = adminEditItemAtomValue;
                                    // adminTempItem['secondaryImagesURLS'][props.index] = URL.createObjectURL(file[0])
                                    adminTempItem['secondaryImagesURLS'][props.index] = {
                                        newData: file[0],
                                        oldData: props.SingleItemDataSecondaryImage,
                                        modified: true
                                    }

                                    adminEditItemAtomSetter(adminTempItem)

                                    selectedAnImageHandlers.open()
                                    setImageURL(URL.createObjectURL(file[0]))

                                    imageUploaderOverlayVisibilityHandlers.close()


                                }}
                                onReject={(files) => {
                                    showNotification({

                                        color: "red",
                                        radius: "md",
                                        title: 'File Error',
                                        message: <p>The file selected is incompatible. Try again!</p>,
                                        // icon: <errorIcon.icon />,

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

                                    })
                                }}
                                maxSize={3 * 1024 ** 2}
                                accept={IMAGE_MIME_TYPE}

                                loading={Loading}

                                {...props}
                            >
                                <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>

                                    <Dropzone.Accept>
                                        <adminUploadImage.icon
                                            size="3.2rem"
                                            stroke={"1.5"}
                                            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                                        />
                                    </Dropzone.Accept>

                                    <Dropzone.Reject>
                                        <adminRejectImageUpload.icon
                                            size="3.2rem"
                                            stroke={"1.5"}
                                            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                                        />
                                    </Dropzone.Reject>

                                    <Dropzone.Idle>
                                        <adminAddItem.icon size="1.5rem" />
                                    </Dropzone.Idle>

                                </Group>

                            </Dropzone >
                        }
                    </Transition>

                    <Image
                        fill

                        src={selectedAnImage ? ImageURL : props.SingleItemDataSecondaryImage}
                        alt={selectedAnImage ? ImageURL : props.SingleItemDataSecondaryImage}

                        onLoadingComplete={() => {
                            if (selectedAnImage) {
                                URL.revokeObjectURL(ImageURL)
                            }
                            setLoading(false);
                        }}

                        loading='lazy'
                    />
                </AspectRatio>

            </Card.Section>

        </Card>


    )

} 
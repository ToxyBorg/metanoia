import { AspectRatio, Button, Card, Center, FileButton, Group, rem, SimpleGrid, Text, Transition, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminAddItem, adminRejectImageUpload, adminUploadImage } from "../../../../../Shared/icons";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";

interface Props extends Partial<DropzoneProps> {
    loadingOverlayVisible: boolean
}

const AddMainImage: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)

    const [Loading, setLoading] = useState(false)

    const { colorScheme, } = useMantineColorScheme();
    const theme = useMantineTheme();

    // const [imageUploaderOverlayVisibility, imageUploaderOverlayVisibilityHandlers] = useDisclosure(
    //     adminAddItemAtomValue.mainImageURL.length > 0
    //         ? false
    //         : true
    // )

    const [imageUploaderOverlayVisibility, imageUploaderOverlayVisibilityHandlers] = useDisclosure(
        adminAddItemAtomValue.mainImageURL != null
            ? false
            : true
    )

    const [ImageURL, setImageURL] = useState('')

    return (
        <Center>

            <Card shadow="md"
                sx={{

                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                    // width: "clamp(15vw,400px,60vw)",
                    width: "clamp(15vw,250px,60vw)",
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",
                }}
                radius={"md"}

            >

                <Card.Section>

                    <AspectRatio ratio={10 / 16} pos={"relative"}
                        onMouseOver={() => { imageUploaderOverlayVisibilityHandlers.open() }}
                        // onMouseOut={() => { if (adminAddItemAtomValue.mainImageURL.length > 0) imageUploaderOverlayVisibilityHandlers.close() }}
                        onMouseOut={() => { if (adminAddItemAtomValue.mainImageURL != null) imageUploaderOverlayVisibilityHandlers.close() }}
                    >
                        <Transition mounted={imageUploaderOverlayVisibility} transition="slide-down" duration={500} timingFunction="ease">
                            {(styles) =>
                                <Dropzone
                                    disabled={props.loadingOverlayVisible}
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
                                        const adminTempItem = adminAddItemAtomValue;
                                        // adminTempItem['mainImageURL'] = URL.createObjectURL(file[0])
                                        adminTempItem['mainImageURL'] = file[0]
                                        adminAddItemAtomSetter(adminTempItem)
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
                                            />console.log
                                        </Dropzone.Reject>

                                        <Dropzone.Idle>
                                            <adminAddItem.icon size="3.2rem" stroke={"1.5"} />
                                        </Dropzone.Idle>

                                        <div>
                                            <Text size="xl" inline>
                                                Drag images here or click to select a file
                                            </Text>
                                            <Text size="sm" color="dimmed" inline mt={7}>
                                                The image should not exceed 5mb
                                            </Text>
                                        </div>

                                    </Group>

                                </Dropzone >
                            }
                        </Transition>

                        <Image
                            fill

                            src={ImageURL}
                            alt={ImageURL}

                            onLoadingComplete={() => {
                                if (ImageURL.length > 1) {
                                    URL.revokeObjectURL(ImageURL)
                                }

                                setLoading(false);
                            }}

                            loading='lazy'
                        />
                    </AspectRatio>

                </Card.Section>

            </Card>

        </Center>

    )
}

export default AddMainImage
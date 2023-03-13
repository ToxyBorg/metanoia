import { AspectRatio, Button, Card, FileButton, Group, rem, SimpleGrid, Text, Transition, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { olpntngStyleDATA_URL } from "../../../../../Shared/dataURLS/olpntng-style-dataURL";
import { adminAddItem, adminRejectImageUpload, adminUploadImage } from "../../../../../Shared/icons";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

interface Props { }

const AddSecondaryImages: NextComponentType<NextPageContext, {}, Props> = (
    props: Props
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
            <SecondaryImagesUploaders index={0} />
            <SecondaryImagesUploaders index={1} />
            <SecondaryImagesUploaders index={2} />
        </Group>

    )
}


export default AddSecondaryImages

/////////////////////////////////////////////////////////////////////////////////////////////////

interface SecondaryImagesUploadersProps extends Partial<DropzoneProps> {
    index: number,
    // adminAddItemAtomValue: SingleItemData,
}

const SecondaryImagesUploaders = (props: SecondaryImagesUploadersProps) => {

    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)

    const [Loading, setLoading] = useState(false)

    const { colorScheme, } = useMantineColorScheme();
    const theme = useMantineTheme();


    const [imageUploaderOverlayVisibility, imageUploaderOverlayVisibilityHandlers] = useDisclosure(
        adminAddItemAtomValue.secondaryImagesURLS[props.index] != null
            ? false
            : true
    )

    const [ImageURL, setImageURL] = useState('')

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
                    onMouseOut={() => { if (adminAddItemAtomValue.secondaryImagesURLS[props.index] != null) imageUploaderOverlayVisibilityHandlers.close() }}
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
                                    const adminTempItem = adminAddItemAtomValue;
                                    // adminTempItem['secondaryImagesURLS'][props.index] = URL.createObjectURL(file[0])
                                    adminTempItem['secondaryImagesURLS'][props.index] = file[0]
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
                        // src={adminAddItemAtomValue.secondaryImagesURLS[props.index].length > 0
                        //     ? adminAddItemAtomValue.secondaryImagesURLS[props.index]
                        //     : ''
                        // }
                        // alt={adminAddItemAtomValue.secondaryImagesURLS[props.index].length > 0
                        //     ? adminAddItemAtomValue.secondaryImagesURLS[props.index]
                        //     : ''}

                        // src={adminAddItemAtomValue.secondaryImagesURLS[props.index] != null
                        //     ? URL.createObjectURL(adminAddItemAtomValue.secondaryImagesURLS[props.index]!)
                        //     : ''
                        // }
                        // alt={adminAddItemAtomValue.secondaryImagesURLS[props.index] != null
                        //     ? URL.createObjectURL(adminAddItemAtomValue.secondaryImagesURLS[props.index]!)
                        //     : ''}
                        // onLoadingComplete={() => {
                        //     setLoading(false);
                        // }}

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


    )

} 

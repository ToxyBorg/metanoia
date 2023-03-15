import { ActionIcon, AspectRatio, Button, Card, Group, LoadingOverlay, Popover, Stack, Text, Transition, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useState } from "react";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminAddItem, adminDeleteImage, adminRejectImageUpload, adminUploadImage } from "../../../../../Shared/icons";
import { secondaryImagesEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

interface Props {
    SingleItemDataSecondaryImagesURLS: SingleItemData['secondaryImagesURLS'],

}

const EditSecondaryImages: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    let firstSecondaryImage = ''
    let secondSecondaryImage = ''
    let thirdSecondaryImage = ''

    for (const image of props.SingleItemDataSecondaryImagesURLS) {

        if (image.length > 0) {
            const oldImageIndex = image[image.length - 1]

            if (oldImageIndex == '0') {
                firstSecondaryImage = image
            }
            else if (oldImageIndex == '1') {
                secondSecondaryImage = image
            }
            else if (oldImageIndex == '2') {
                thirdSecondaryImage = image
            }
        }
    }



    const secondaryImagesEditLoadingValue = useAtomValue(secondaryImagesEditLoading)


    return (
        <Group position="center"


            sx={{
                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                // background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "15px",
                boxShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",
                // backdropFilter: "blur(5px)",
                // WebkitBackdropFilter: "blur(5px)",
                // overflow: "hidden"
            }}
            bg={colorScheme === "dark"
                ? CardContainerColors.backgroundColorDark
                : CardContainerColors.backgroundColorLight
            }
            className={style.Animated_Background_Gradient}
            p={"sm"}
            mb={"lg"}

        // pos={"relative"}



        >

            <SecondaryImagesUploaders index={0} secondaryImagesEditLoadingValue={secondaryImagesEditLoadingValue}
                SingleItemDataSecondaryImage={firstSecondaryImage}
            />
            <SecondaryImagesUploaders index={1} secondaryImagesEditLoadingValue={secondaryImagesEditLoadingValue}
                SingleItemDataSecondaryImage={secondSecondaryImage}
            />
            <SecondaryImagesUploaders index={2} secondaryImagesEditLoadingValue={secondaryImagesEditLoadingValue}
                SingleItemDataSecondaryImage={thirdSecondaryImage}
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
    secondaryImagesEditLoadingValue: boolean
}

const SecondaryImagesUploaders = (props: SecondaryImagesUploadersProps) => {

    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)

    const adminTempItem = adminEditItemAtomValue;
    // adminTempItem['secondaryImagesURLS'][props.index] = URL.createObjectURL(file[0])
    adminTempItem['secondaryImagesURLS'][props.index] = {
        newData: adminTempItem.secondaryImagesURLS[props.index].newData,
        oldData: props.SingleItemDataSecondaryImage,
        modified: adminTempItem.secondaryImagesURLS[props.index].modified,
        removed: adminTempItem.secondaryImagesURLS[props.index].removed
    }
    adminEditItemAtomSetter(adminTempItem)

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
        <Stack>

            <Card shadow="md"
                sx={{

                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                    // width: "clamp(15vw,50px,70vw)",
                    width: "5rem",
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
                radius={"md"}
                pos={"relative"}

            >

                <Card.Section>

                    <LoadingOverlay radius={"md"} visible={props.secondaryImagesEditLoadingValue} overlayBlur={2} zIndex={2} />

                    <AspectRatio ratio={10 / 16} pos={"relative"}
                        onMouseOver={() => { imageUploaderOverlayVisibilityHandlers.open() }}
                        onMouseOut={() => { if (ImageURL.length > 1) imageUploaderOverlayVisibilityHandlers.close() }}
                    >
                        <Transition mounted={imageUploaderOverlayVisibility} transition="slide-down" duration={500} timingFunction="ease">
                            {(styles) =>
                                <Dropzone
                                    disabled={props.secondaryImagesEditLoadingValue}
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
                                            oldData: adminTempItem.secondaryImagesURLS[props.index].oldData,
                                            modified: true,
                                            removed: false,
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
                                    if (ImageURL.length > 1) {

                                        URL.revokeObjectURL(ImageURL)
                                    }
                                }
                                setLoading(false);
                            }}

                            loading='lazy'
                        />
                    </AspectRatio>

                </Card.Section>

            </Card>


            <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
                <Popover.Target>
                    <ActionIcon
                        disabled={props.secondaryImagesEditLoadingValue}
                        variant="outline" title={adminDeleteImage.name} w={"fit-content"} h={"fit-content"}
                        mx={"auto"}
                        py={"0.5rem"} radius={"md"} px={"0.5rem"}
                        bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                        className={style.Animated_Background_Gradient}

                        sx={{
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >

                        {/* <Group> */}
                        <adminDeleteImage.icon size={"1.5rem"} />
                        {/* <Text size={"md"}
                                color={colorScheme === "dark"
                                    ? StepperColors.iconsLineColorDark
                                    : StepperColors.iconsLineColorLight
                                }
                            >
                                Delete this image
                            </Text>
                        </Group> */}

                    </ActionIcon>
                </Popover.Target>

                <Popover.Dropdown
                    bg={colorScheme === "dark"
                        ? CardContainerColors.backgroundColorDark
                        : CardContainerColors.backgroundColorLight
                    }
                    className={style.Animated_Background_Gradient}

                >
                    <Stack>

                        <Text size="sm"
                            color={
                                colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight
                            }
                        >
                            ARE YOU SURE?
                        </Text>

                        <Button color="red" radius="md" uppercase sx={{ alignContent: "center" }}
                            onClick={() => {

                                if (adminEditItemAtomValue.secondaryImagesURLS[props.index].newData != null
                                    || adminTempItem.secondaryImagesURLS[props.index].oldData.length > 1) {

                                    const adminTempItem = adminEditItemAtomValue;
                                    // adminTempItem['secondaryImagesURLS'][props.index] = URL.createObjectURL(file[0])
                                    adminTempItem['secondaryImagesURLS'][props.index] = {
                                        newData: null,
                                        oldData: adminTempItem.secondaryImagesURLS[props.index].oldData,
                                        modified: true,
                                        removed: true,
                                    }

                                    adminEditItemAtomSetter(adminTempItem)

                                    selectedAnImageHandlers.open()
                                    setImageURL('')

                                    imageUploaderOverlayVisibilityHandlers.open()
                                }

                            }}
                        >
                            yes
                        </Button>
                    </Stack>

                </Popover.Dropdown>
            </Popover>

        </Stack>


    )

} 
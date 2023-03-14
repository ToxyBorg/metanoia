import { ActionIcon, Group, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { arrowNext } from "../../../../../Shared/icons";
import { adminAddItemAtom, adminAddItemType } from "../../../../../Stores/adminAddItemStore";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    loadingOverlayVisibleHandlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },

    handlers: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },
}

const AddItemConfirmationButton: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();
    const adminAddItemAtomValue = useAtomValue(adminAddItemAtom)

    const { supabase, } = useSupabase()

    const handleItemInsert = async () => {

        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {

            const item_id = uuidv4()
            const storageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/items`
            // const folderURL = `${item_id}`

            const mainImageName = 'main'
            const fullMainImagePath = `${storageURL}/${item_id}/${mainImageName}`

            const all_image_paths: { imagePath: string, file: File }[] = []
            all_image_paths.push({ imagePath: `${item_id}/${mainImageName}`, file: adminAddItemAtomValue.mainImageURL! })
            const secondaryImagesPaths: string[] = []

            let index = 0
            for (const image of adminAddItemAtomValue.secondaryImagesURLS) {

                if (image != null) {
                    // const index = adminAddItemAtomValue.secondaryImagesURLS.indexOf(image)

                    secondaryImagesPaths.push(`${storageURL}/${item_id}/${index}`)
                    all_image_paths.push({ imagePath: `${item_id}/${index}`, file: image })
                    index++
                }
            }

            const { data, error: insertError } = await supabase
                .from('all_items')
                .insert([
                    {
                        item_id: item_id,
                        category: adminAddItemAtomValue.category,
                        description: adminAddItemAtomValue.description,
                        mainImageURL: fullMainImagePath,
                        secondaryImagesURLS: secondaryImagesPaths,
                        price: adminAddItemAtomValue.price,
                        stock: adminAddItemAtomValue.stock,
                        title: adminAddItemAtomValue.title,
                        tags: adminAddItemAtomValue.tags
                    },
                ])

            let images_uploaded = true;
            const images_uploaded_URLS: string[] = []
            if (insertError == null) {

                for (const image of all_image_paths) {
                    const { error: uploadError } = await supabase.storage
                        .from('items')
                        .upload(image.imagePath, image.file
                            , { upsert: true }
                        )
                    if (uploadError) {
                        images_uploaded = false;
                        break;
                    }
                    else {
                        images_uploaded_URLS.push(image.imagePath)
                    }
                }

                if (images_uploaded) {
                    // ITEM INSERT SUCCESS
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item insertion confirmed',
                        message: <p>The item you added has been accepted. Try checking the main page to see it!</p>,
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
                                    backgroundColor: "green"
                                },
                            },
                        }),

                    })

                    props.loadingOverlayVisibleHandlers.close()
                    props.handlers.close()
                }

            }

            if (insertError || !images_uploaded) {
                // ERROR

                showNotification({

                    color: "red",
                    radius: "md",
                    title: 'Item insertion Error',
                    message: <p>Item could not be uploaded to our servers. Please try again!</p>,
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

                const { data, error } = await supabase
                    .from('all_items')
                    .delete()
                    .eq('item_id', item_id)

                // for (const image_uploaded_URL of images_uploaded_URLS) {

                //     const { data: mainImageDeleteData, error: mainImageDeleteError } = await supabase
                //         .storage
                //         .from('items')
                //         .remove([image_uploaded_URL])
                // }

                const { data: mainImageDeleteData, error: mainImageDeleteError } = await supabase
                    .storage
                    .from('items')
                    .remove(images_uploaded_URLS)

                props.loadingOverlayVisibleHandlers.close()
                props.handlers.close()

                // window.location.reload()

            }



        }
        else {
            // NEXT_PUBLIC_SUPABASE_URL ERROR

            showNotification({

                color: "red",
                radius: "md",
                title: "DB URL HASN'T BEEN GIVEN. ADD IT TO YOUR ENVIRONMENT VARIABLES!",
                message: <p>Contact Admin to add env variable for the DB storage URL!</p>,
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

            props.loadingOverlayVisibleHandlers.close()
            props.handlers.close()
        }
    }




    ////////////////////////////////////////////////////////////

    return (

        <ActionIcon
            variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
            mx={"auto"} mb={"5rem"} py={"xs"} radius={"md"} px={"lg"}
            bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
            className={style.Animated_Background_Gradient}
            onClick={() => {


                let fieldsHaveBeenFilled: boolean = true

                if (adminAddItemAtomValue.title.length <= 1) {
                    fieldsHaveBeenFilled = false
                }
                else if (adminAddItemAtomValue.description.length <= 1) {
                    fieldsHaveBeenFilled = false
                }
                // else if (adminAddItemAtomValue.mainImageURL.length <= 1) {
                //     fieldsHaveBeenFilled = false
                // }
                else if (adminAddItemAtomValue.mainImageURL == null) {
                    fieldsHaveBeenFilled = false
                }
                else if (adminAddItemAtomValue.price <= 0) {
                    fieldsHaveBeenFilled = false
                }
                // else if (adminAddItemAtomValue.secondaryImagesURLS.every((word) => word.trim().length == 0)) {
                //     fieldsHaveBeenFilled = false
                // }
                else if (adminAddItemAtomValue.secondaryImagesURLS.every((word) => word == null)) {
                    fieldsHaveBeenFilled = false
                }
                else if (adminAddItemAtomValue.stock == 0) {
                    fieldsHaveBeenFilled = false
                }
                else if (adminAddItemAtomValue.tags.length == 0) {
                    fieldsHaveBeenFilled = false
                }


                if (fieldsHaveBeenFilled == false) {

                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>One or More fields have been left blank!</p>,
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
                }
                else {
                    props.loadingOverlayVisibleHandlers.open()
                    handleItemInsert()

                }



            }}
            sx={{
                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Group>
                <arrowNext.icon size={"2rem"} />
                <Text size={"md"}
                    color={colorScheme === "dark"
                        ? StepperColors.iconsLineColorDark
                        : StepperColors.iconsLineColorLight
                    }
                >
                    Add this item
                </Text>
            </Group>
        </ActionIcon>


    )
}

export default AddItemConfirmationButton
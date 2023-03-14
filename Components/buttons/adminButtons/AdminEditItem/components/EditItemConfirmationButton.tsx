import { ActionIcon, Alert, createStyles, Group, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminUpdateButton, errorIcon } from "../../../../../Shared/icons";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

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

    SingleItemDataID: SingleItemData['item_id']

}

const EditItemConfirmationButton: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();
    const adminEditItemAtomValue = useAtomValue(adminEditItemAtom)

    const { supabase, } = useSupabase()

    const handleItemUpdate = async () => {

        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            let noItemModified = true

            const item_id = props.SingleItemDataID
            const storageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/items`
            const folderURL = `${storageURL}/${item_id}`

            if (adminEditItemAtomValue.mainImageURL.modified) {
                noItemModified = false
                const { data, error } = await supabase
                    .storage
                    .from('items')
                    .update(`${item_id}/main`, adminEditItemAtomValue.mainImageURL.newData!, {
                        cacheControl: '0',
                        // Overwrite file if it exis
                        upsert: true
                    })

                if (error) {
                    showNotification({
                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Main image update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item main image you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }



            const secondaryImagesToStoreInTable: string[] = []
            let secondaryImageToStoreIndex = 0
            for (const imageData of adminEditItemAtomValue.secondaryImagesURLS) {

                if (imageData.oldData.length > 0) {
                    secondaryImagesToStoreInTable.push(imageData.oldData)
                }

                // console.log("secondaryImagesToStoreInTable: ", secondaryImagesToStoreInTable)
                if (imageData.modified) {
                    // console.log("SECONDARY IMAGE MODIFIED: ", imageData.newData)
                    noItemModified = false

                    let oldImageIndex = ''
                    if (imageData.oldData.length > 0) {
                        oldImageIndex = imageData.oldData[imageData.oldData.length - 1]
                    }
                    // console.log("index => ", oldImageIndex)

                    if (oldImageIndex.length > 0) {
                        const { data, error } = await supabase
                            .storage
                            .from('items')
                            .update(`${item_id}/${oldImageIndex}`, imageData.newData!, {
                                cacheControl: '0',
                                // Overwrite file if it exis
                                upsert: true
                            })

                        if (error) {
                            showNotification({

                                color: "red",
                                radius: "md",
                                title: "Item insert Error",
                                message: <p>Secondary image {oldImageIndex} update error</p>,
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
                            secondaryImagesToStoreInTable[secondaryImageToStoreIndex] = `${folderURL}/${oldImageIndex}`
                            secondaryImageToStoreIndex++
                            showNotification({

                                color: "green",
                                radius: "md",
                                title: 'Item update confirmed',
                                message: <p>The item secondary image N{oldImageIndex} you updated has been accepted. Try checking the main page to see it!</p>,
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

                        }
                    }
                    else {

                        const newIndex = adminEditItemAtomValue.secondaryImagesURLS.findIndex(object => {
                            return object.newData === imageData.newData;
                        });
                        // console.log("UNDIFINED SO index => ", newIndex)

                        const { data, error } = await supabase
                            .storage
                            .from('items')
                            .upload(`${item_id}/${newIndex}`, imageData.newData!, {
                                cacheControl: '0',
                                upsert: true
                            })

                        if (error) {
                            showNotification({

                                color: "red",
                                radius: "md",
                                title: "Item insert Error",
                                message: <p>Secondary image {newIndex} update error</p>,
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
                            secondaryImagesToStoreInTable[secondaryImageToStoreIndex] = `${folderURL}/${newIndex}`
                            secondaryImageToStoreIndex++

                            showNotification({

                                color: "green",
                                radius: "md",
                                title: 'Item update confirmed',
                                message: <p>The item secondary image N{newIndex} you updated has been accepted. Try checking the main page to see it!</p>,
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
                        }
                    }

                    const { data, error } = await supabase
                        .from('all_items')
                        .update({ 'secondaryImagesURLS': secondaryImagesToStoreInTable })
                        .eq('item_id', item_id)

                    if (error) {
                        showNotification({

                            color: "red",
                            radius: "md",
                            title: "Item insert Error",
                            message: <p>Secondary images could not be added to the items table</p>,
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
                        showNotification({

                            color: "green",
                            radius: "md",
                            title: 'Item update confirmed',
                            message: <p>Secondary images added to the items table successfully</p>,
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
                    }


                }



            }


            if (adminEditItemAtomValue.title.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'title': adminEditItemAtomValue.title.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Title update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item title you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (adminEditItemAtomValue.description.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'description': adminEditItemAtomValue.description.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Description update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item description you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (adminEditItemAtomValue.category.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'category': adminEditItemAtomValue.category.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Category update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item category you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (adminEditItemAtomValue.price.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'price': adminEditItemAtomValue.price.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Item Price update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item price you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (adminEditItemAtomValue.stock.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'stock': adminEditItemAtomValue.stock.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Item Stock update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item stock you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (adminEditItemAtomValue.tags.modified) {
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'tags': adminEditItemAtomValue.tags.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Item Tags update error</p>,
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
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item tags you updated has been accepted. Try checking the main page to see it!</p>,
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
                }
            }

            if (noItemModified == true) {
                showNotification({

                    color: "red",
                    radius: "md",
                    title: "Item update Error!",
                    message: <p>You have modified nothing.</p>,
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


    return (
        <ActionIcon
            variant="outline" title={adminUpdateButton.name} w={"fit-content"} h={"100%"}
            mx={"auto"} mb={"5rem"} py={"xs"} radius={"md"} px={"lg"}
            bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
            className={style.Animated_Background_Gradient}
            onClick={() => {


                let fieldsHaveBeenFilled: boolean = true

                if (adminEditItemAtomValue.title.modified) {
                    if (adminEditItemAtomValue.title.newData.length <= 1) {
                        fieldsHaveBeenFilled = false
                    }
                }

                else if (adminEditItemAtomValue.description.modified) {
                    if (adminEditItemAtomValue.description.newData.length <= 1) {
                        fieldsHaveBeenFilled = false
                    }
                }

                else if (adminEditItemAtomValue.mainImageURL.modified) {
                    if (adminEditItemAtomValue.mainImageURL.newData == null) {
                        fieldsHaveBeenFilled = false
                    }
                }
                else if (adminEditItemAtomValue.price.modified) {
                    if (adminEditItemAtomValue.price.newData <= 0) {
                        fieldsHaveBeenFilled = false
                    }
                }

                else if (adminEditItemAtomValue.secondaryImagesURLS[0].modified) {
                    if (adminEditItemAtomValue.secondaryImagesURLS[0].newData == null) {
                        fieldsHaveBeenFilled = false
                    }
                }
                else if (adminEditItemAtomValue.secondaryImagesURLS[1].modified) {
                    if (adminEditItemAtomValue.secondaryImagesURLS[1].newData == null) {
                        fieldsHaveBeenFilled = false
                    }
                }
                else if (adminEditItemAtomValue.secondaryImagesURLS[2].modified) {
                    if (adminEditItemAtomValue.secondaryImagesURLS[2].newData == null) {
                        fieldsHaveBeenFilled = false
                    }
                }
                else if (adminEditItemAtomValue.stock.modified) {
                    if (adminEditItemAtomValue.stock.newData == 0) {
                        fieldsHaveBeenFilled = false
                    }
                }
                else if (adminEditItemAtomValue.tags.modified) {
                    if (adminEditItemAtomValue.tags.newData.length == 0) {
                        fieldsHaveBeenFilled = false
                    }
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

                    // props.loadingOverlayVisibleHandlers.open()
                    handleItemUpdate()

                }



            }}
            sx={{
                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Group>
                <adminUpdateButton.icon size={"2rem"} />
                <Text size={"md"}
                    color={colorScheme === "dark"
                        ? StepperColors.iconsLineColorDark
                        : StepperColors.iconsLineColorLight
                    }
                >
                    Update this item
                </Text>
            </Group>
        </ActionIcon>


    )
}

export default EditItemConfirmationButton

////////////////////////////////////////////////////

const useStyles = createStyles((theme) => ({
    root: {
        background: theme.colorScheme === "dark"
            ? CardContainerColors.backgroundColorDark
            : CardContainerColors.backgroundColorLight,
        backgroundSize: "300% 300%",
        animation: `${style.AnimateBG} 7s ease infinite`,

        border: `2px solid ${theme.colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
    },

    title: {

        background: theme.colorScheme === "dark"
            ? CardContainerColors.backgroundColorDark
            : CardContainerColors.backgroundColorLight,
        backgroundSize: "300% 300%",
        animation: `${style.AnimateBG} 7s ease infinite`,


        // border: `2px solid ${theme.colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
        padding: "0.5rem",
        borderRadius: 5,

        fontWeight: "bolder",
        color: theme.colorScheme === "dark"
            ? CardContainerColors.textColorDark
            : CardContainerColors.textColorLight
    },
    description: {
        fontStyle: "italic",

        color: theme.colorScheme === "dark"
            ? CardContainerColors.textColorDark
            : CardContainerColors.textColorLight
    },
    closeButton: {
        color: theme.colorScheme === "dark"
            ? CardContainerColors.textColorDark
            : CardContainerColors.textColorLight,

        '&:hover': {
            backgroundColor: "red"
        },
    },
}))
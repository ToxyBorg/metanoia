import { ActionIcon, Alert, createStyles, Group, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminUpdateButton, errorIcon } from "../../../../../Shared/icons";
import { allow_measurementsEditLoading, categoryEditLoading, descriptionEditLoading, mainImageEditLoading, priceEditLoading, secondaryImagesEditLoading, stockEditLoading, tagsEditLoading, titleEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";
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

    const secondaryImagesEditLoadingSetter = useSetAtom(secondaryImagesEditLoading)
    const mainImageEditLoadingSetter = useSetAtom(mainImageEditLoading)
    const titleEditLoadingSetter = useSetAtom(titleEditLoading)
    const descriptionEditLoadingSetter = useSetAtom(descriptionEditLoading)
    const categoryEditLoadingSetter = useSetAtom(categoryEditLoading)
    const priceEditLoadingValueSetter = useSetAtom(priceEditLoading)
    const stockEditLoadingSetter = useSetAtom(stockEditLoading)
    const tagsEditLoadingValueSetter = useSetAtom(tagsEditLoading)
    const allow_measurementsEditLoadingSetter = useSetAtom(allow_measurementsEditLoading)


    const { supabase, } = useSupabase()

    const handleItemUpdate = async () => {

        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            let noItemModified = true

            const item_id = props.SingleItemDataID
            const storageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/items`
            const folderURL = `${storageURL}/${item_id}`

            if (adminEditItemAtomValue.mainImageURL.modified) {
                mainImageEditLoadingSetter(true)

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
                    mainImageEditLoadingSetter(false)
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
                    mainImageEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            const ifSecondaryImagesHaveBeenModified = adminEditItemAtomValue.secondaryImagesURLS.map((image) => {
                if (image.modified) {
                    return true
                }
                return false
            })

            if (ifSecondaryImagesHaveBeenModified.includes(true)) {
                noItemModified = false;
                secondaryImagesEditLoadingSetter(true)

                const UnfilteredSecondaryImages: string[] = []

                let index = 0
                for (const image of adminEditItemAtomValue.secondaryImagesURLS) {

                    // console.log(`IMAGE ${index}`, image)

                    UnfilteredSecondaryImages.push('')
                    if (image.modified) {

                        // console.log(`IMAGE ${index} MODIFIED`)

                        // if (adminEditItemAtomValue.secondaryImagesURLS[0].oldData.length > 0) {
                        // const tempIndex = image.oldData[image.oldData.length - 1]
                        if (image.removed) {

                            const { data, error } = await supabase
                                .storage
                                .from('items')
                                .remove([`${item_id}/${index}`])

                            if (error) {
                                showNotification({

                                    color: "red",
                                    radius: "md",
                                    title: "Item update Error",
                                    message: <p>Secondary image {index} deletion error</p>,
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

                                UnfilteredSecondaryImages[index] = `${folderURL}/${index}`

                            }
                            else {
                                showNotification({

                                    color: "green",
                                    radius: "md",
                                    title: 'Item update confirmed',
                                    message: <p>The item secondary image N{index} you deleted has been accepted. Try checking the main page to see it!</p>,
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

                                // UnfilteredSecondaryImages[indx]
                            }
                        }
                        else {

                            const { data, error } = await supabase
                                .storage
                                .from('items')
                                .upload(`${item_id}/${index}`, image.newData!, {
                                    cacheControl: '0',
                                    upsert: true
                                })


                            if (error) {
                                showNotification({

                                    color: "red",
                                    radius: "md",
                                    title: "Item insert Error",
                                    message: <p>Secondary image {index} update error</p>,
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
                                    message: <p>The item secondary image N{index} you updated has been accepted. Try checking the main page to see it!</p>,
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

                            UnfilteredSecondaryImages[index] = `${folderURL}/${index}`

                        }


                    }

                    else if (image.oldData.length > 0) {
                        // console.log(`IMAGE ${index} NOT MODIFIED BUT HAS OLD DATA`)

                        UnfilteredSecondaryImages[index] = `${folderURL}/${index}`

                    }

                    index++

                    // console.log("UnfilteredSecondaryImages: ", UnfilteredSecondaryImages)
                }

                const FilteredSecondaryImages = UnfilteredSecondaryImages.filter((str) => str !== '');

                // console.log("FilteredSecondaryImages: ", FilteredSecondaryImages)

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'secondaryImagesURLS': FilteredSecondaryImages },

                    )
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
                    secondaryImagesEditLoadingSetter(false)
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
                    secondaryImagesEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            if (adminEditItemAtomValue.title.modified) {
                titleEditLoadingSetter(true)
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
                    titleEditLoadingSetter(false)
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
                    titleEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////
            if (adminEditItemAtomValue.description.modified) {
                descriptionEditLoadingSetter(true)
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
                    descriptionEditLoadingSetter(false)
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
                    descriptionEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            if (adminEditItemAtomValue.category.modified) {
                categoryEditLoadingSetter(true)
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
                    categoryEditLoadingSetter(false)
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
                    categoryEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            if (adminEditItemAtomValue.price.modified) {
                priceEditLoadingValueSetter(true)
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
                    priceEditLoadingValueSetter(false)
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
                    priceEditLoadingValueSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////


            if (adminEditItemAtomValue.stock.modified) {
                stockEditLoadingSetter(true)
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
                    stockEditLoadingSetter(false)
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
                    stockEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            if (adminEditItemAtomValue.tags.modified) {
                tagsEditLoadingValueSetter(true)
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
                    tagsEditLoadingValueSetter(false)
                }
                else {
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item tags you updated have been accepted. Try checking the main page to see it!</p>,
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
                    tagsEditLoadingValueSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////

            if (adminEditItemAtomValue.allow_measurements.modified) {
                allow_measurementsEditLoadingSetter(true)
                noItemModified = false

                const { data, error } = await supabase
                    .from('all_items')
                    .update({ 'allow_measurements': adminEditItemAtomValue.allow_measurements.newData })
                    .eq('item_id', item_id)

                if (error) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item insert Error",
                        message: <p>Item measurements update error</p>,
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
                    allow_measurementsEditLoadingSetter(false)
                }
                else {
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item update confirmed',
                        message: <p>The item measurement input you updated has been accepted. Try checking the main page to see it!</p>,
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
                    allow_measurementsEditLoadingSetter(false)
                }
            }

            ///////////////////////////////////////////////////////////////////////


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

            ///////////////////////////////////////////////////////////////////////

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


                let fieldsHaveBeenFilled: boolean = true;
                let fieldsAreWithinTheCharacterLimit = true;
                let tooManyCharactersMessage: string = 'Too many characters!';
                let secondaryImagesAllRemoved: boolean[] = []

                // let tagIsLessThan25Chars: boolean = true;
                // let titleIsLessThan100Chars: boolean = true;
                // let descriptionIsLessThan350Chars: boolean = true;
                // let stockIsLessThan999: boolean = true;
                // let priceIsLessThan99999: boolean = true;


                if (adminEditItemAtomValue.title.modified) {
                    if (adminEditItemAtomValue.title.newData.length <= 1) {
                        fieldsHaveBeenFilled = false
                    }
                    else if (adminEditItemAtomValue.title.newData.length > 100) {
                        fieldsAreWithinTheCharacterLimit = false
                        tooManyCharactersMessage = "This is a title... not a description. Try something less than 100 characters."
                    }
                }

                else if (adminEditItemAtomValue.description.modified) {
                    if (adminEditItemAtomValue.description.newData.length <= 1) {
                        fieldsHaveBeenFilled = false
                    }
                    else if (adminEditItemAtomValue.description.newData.length > 750) {
                        fieldsAreWithinTheCharacterLimit = false
                        tooManyCharactersMessage = "Description is too long! 750 characters max."
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
                    else if (adminEditItemAtomValue.price.newData > 99999) {
                        fieldsAreWithinTheCharacterLimit = false
                        tooManyCharactersMessage = "Too expensive! Try something less than 99999."
                    }
                }

                else if (adminEditItemAtomValue.stock.modified) {
                    if (adminEditItemAtomValue.stock.newData == 0) {
                        fieldsHaveBeenFilled = false
                    } else if (adminEditItemAtomValue.stock.newData > 999) {
                        fieldsAreWithinTheCharacterLimit = false
                        tooManyCharactersMessage = "That much stock? Really?!!!"
                    }
                }
                else if (adminEditItemAtomValue.tags.modified) {
                    if (adminEditItemAtomValue.tags.newData.length == 0) {
                        fieldsHaveBeenFilled = false
                    }

                    for (const tag of adminEditItemAtomValue.tags.newData) {
                        if (tag.length > 25) {
                            fieldsAreWithinTheCharacterLimit = false
                            tooManyCharactersMessage = "Each tag should be less than 25 characters"
                            break
                        }
                    }
                }


                for (const secondaryImage of adminEditItemAtomValue.secondaryImagesURLS) {
                    if (secondaryImage.removed && secondaryImage.newData == null) {
                        secondaryImagesAllRemoved.push(true)
                    }
                    else if (!secondaryImage.removed && secondaryImage.oldData.length < 1 && secondaryImage.newData == null) {
                        secondaryImagesAllRemoved.push(true)

                    }
                }

                // alert(secondaryImagesAllRemoved.toString())
                // console.log(secondaryImagesAllRemoved)
                if (secondaryImagesAllRemoved[0] == true && secondaryImagesAllRemoved[1] == true && secondaryImagesAllRemoved[2] == true) {
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
                else if (fieldsAreWithinTheCharacterLimit == false) {
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Too many characters Error",
                        message: <p>{tooManyCharactersMessage}</p>,
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
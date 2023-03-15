import { ActionIcon, Button, Group, LoadingOverlay, Popover, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import type { NextComponentType, NextPageContext } from "next";
import { useSupabase } from "../../../../Context/SupabaseWrapper/supabase-provider";
import { CardContainerColors, NavBarColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { adminDeleteImage } from "../../../../Shared/icons";
import { SingleItemData } from "../../../../Stores/itemDataStore";

interface Props {
    SingleItemData: SingleItemData

}

const AdminDeleteItem: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const { colorScheme, } = useMantineColorScheme();

    const [deletionDone, setDeletionDone] = useDisclosure(false)

    const { supabase, } = useSupabase()


    const handleItemDeletion = async () => {
        setDeletionDone.open()
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {

            const item_id = props.SingleItemData.item_id
            // const storageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/items`
            // const folderURL = `${storageURL}/${item_id}`

            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('items')
                .remove([`${item_id}/main`, `${item_id}/0`, `${item_id}/1`, `${item_id}/2`])

            if (storageError) {
                setDeletionDone.close()
                showNotification({

                    color: "red",
                    radius: "md",
                    title: "Images could not be deleted from the servers",
                    message: <p>Item images could not be deleted from storage! Try again or contact DB admin!</p>,
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
                const { data: tableData, error: tableError } = await supabase
                    .from('all_items')
                    .delete()
                    .eq('item_id', item_id)

                if (tableError) {
                    setDeletionDone.close()
                    showNotification({

                        color: "red",
                        radius: "md",
                        title: "Item info could not be deleted from the servers",
                        message: <p>Item info could not be deleted from the table! Try again or contact DB admin!</p>,
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
                    setDeletionDone.close()
                    showNotification({

                        color: "green",
                        radius: "md",
                        title: 'Item successfully deleted',
                        message: <p>The item deletion request you made has been accepted. Reload the page in a few seconds and it should be gone!</p>,
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
        else {
            setDeletionDone.close()
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

        }
    }

    return (
        <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"}>
            <LoadingOverlay visible={deletionDone} overlayBlur={2} zIndex={2} />

            <Popover.Target>
                <ActionIcon
                    // //   disabled={props.secondaryImagesEditLoadingValue}
                    // variant="outline" title={adminDeleteImage.name} w={"fit-content"} h={"fit-content"}
                    // mx={"auto"}
                    // py={"0.5rem"} radius={"md"} px={"0.5rem"}
                    // bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
                    // className={style.Animated_Background_Gradient}

                    // sx={{
                    //     border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                    //     WebkitBackdropFilter: "blur(2px)",
                    //     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    // }}
                    variant="transparent"
                    w={"100%"} h={"100%"}
                    mx={"auto"}
                    title={"Delete item"}

                >

                    <Group align={"center"} spacing={"xs"}>

                        <adminDeleteImage.icon size={"1.5rem"} />

                        <Text
                            color={
                                colorScheme === "dark"
                                    ? CardContainerColors.textColorDark
                                    : CardContainerColors.textColorLight
                            }
                            mr={"md"}
                        >
                            Delete this item
                        </Text>

                    </Group>

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
                            handleItemDeletion()
                        }}
                    >
                        yes
                    </Button>
                </Stack>

            </Popover.Dropdown>
        </Popover>
    )
}

export default AdminDeleteItem
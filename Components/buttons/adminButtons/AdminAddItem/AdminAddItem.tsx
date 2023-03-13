import { ActionIcon, Center, Container, Grid, Group, LoadingOverlay, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { CardContainerColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { adminAddItem } from "../../../../Shared/icons";
import { adminAddItemAtom } from "../../../../Stores/adminAddItemStore";
import ResponsiveModalContext from "../../../UI/ResponsiveModalContext";
import AddItemCategory from "./components/AddItemCategory";
import AddItemConfirmationButton from "./components/AddItemConfirmationButton";
import AddItemDescription from "./components/AddItemDescription";
import AddItemPrice from "./components/AddItemPrice";
import AddItemStock from "./components/AddItemStock";
import AddItemTags from "./components/AddItemTags";
import AddItemTitle from "./components/AddItemTitle";
import AddMainImage from "./components/AddMainImage";
import AddSecondaryImages from "./components/AddSecondaryImages";

interface Props { }

const AdminAddItem: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [opened, handlers] = useDisclosure(false);

    const { colorScheme, } = useMantineColorScheme();

    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);

    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)

    if (!opened) {
        const newArr = adminAddItemAtomValue
        newArr['mainImageURL'] = null
        newArr['secondaryImagesURLS'] = [null, null, null]
        adminAddItemAtomSetter(newArr)
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={adminAddItem.name}

            >
                <Group align={"center"} spacing={"xs"}>

                    <adminAddItem.icon />

                    <Text
                        color={
                            colorScheme === "dark"
                                ? CardContainerColors.textColorDark
                                : CardContainerColors.textColorLight
                        }
                        mr={"md"}
                    >
                        {adminAddItem.name}
                    </Text>

                </Group>

            </ActionIcon>

            <ResponsiveModalContext responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"ADD AN ITEM"}

                size={"auto"} contentMargin={"auto"}
            >
                <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} />

                <Stack spacing={"xl"} >

                    <Group my={"xl"}>

                        <Container >
                            <Center>
                                <Stack >
                                    <AddMainImage />
                                    <AddSecondaryImages />
                                </Stack>
                            </Center>
                        </Container>

                        <Container mb={"xl"}>
                            <Center
                                // p={'2rem'}
                                sx={{
                                    border: `2px solid ${colorScheme === "dark"
                                        ? CardContainerColors.borderColorDark
                                        : CardContainerColors.borderColorLight}`,
                                    borderRadius: 15,
                                    WebkitBackdropFilter: "blur(2px)",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                }}
                                bg={colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight
                                }

                                className={style.Animated_Background_Gradient}

                            >
                                <Stack spacing={"2rem"} p={"2rem"} >
                                    <AddItemTitle />
                                    <AddItemDescription />
                                    <AddItemCategory />
                                    <AddItemPrice />
                                    <AddItemStock />
                                    <AddItemTags />
                                </Stack>

                            </Center>
                        </Container>

                    </Group>

                    <AddItemConfirmationButton loadingOverlayVisibleHandlers={loadingOverlayVisibleHandlers} handlers={handlers} />
                </Stack>


            </ResponsiveModalContext>



        </>
    )
}

export default AdminAddItem

/*
<Grid py={"lg"}>

                    <Grid.Col span="auto" >
                        <Center>
                            <Stack >

                                <AddMainImage />

                                <AddSecondaryImages />
                            </Stack>
                        </Center>
                    </Grid.Col>


                    <Grid.Col span={"auto"} >
                        <Container fluid>
                            <Center
                                p={"sm"}
                                sx={{
                                    border: `2px solid ${colorScheme === "dark"
                                        ? CardContainerColors.borderColorDark
                                        : CardContainerColors.borderColorLight}`,
                                    borderRadius: 15,
                                    WebkitBackdropFilter: "blur(2px)",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                }}
                                bg={colorScheme === "dark"
                                    ? CardContainerColors.backgroundColorDark
                                    : CardContainerColors.backgroundColorLight
                                }

                                className={style.Animated_Background_Gradient}

                            >
                                <Stack>
                                    <AddItemTitle />
                                </Stack>

                            </Center>
                        </Container>
                    </Grid.Col>
                </Grid>
 */
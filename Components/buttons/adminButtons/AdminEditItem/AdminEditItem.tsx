import { ActionIcon, Center, Container, Group, LoadingOverlay, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { CardContainerColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { adminEditButton } from "../../../../Shared/icons";
import { adminEditItemAtom, defaultEditDataAtom } from "../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../Stores/itemDataStore";
import ResponsiveModalContext from "../../../UI/ResponsiveModalContext";
import EditItemCategory from "./components/EditItemCategory";
import EditItemConfirmationButton from "./components/EditItemConfirmationButton";
import EditItemDescription from "./components/EditItemDescription";
import EditItemPrice from "./components/EditItemPrice";
import EditItemStock from "./components/EditItemStock";
import EditItemTags from "./components/EditItemTags";
import EditItemTitle from "./components/EditItemTitle";
import EditMainImage from "./components/EditMainImage";
import EditSecondaryImages from "./components/EditSecondaryImages";

interface Props {
    SingleItemData: SingleItemData
}

const AdminEditItem: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [opened, handlers] = useDisclosure(false);

    const { colorScheme, } = useMantineColorScheme();

    const [loadingOverlayVisible, loadingOverlayVisibleHandlers] = useDisclosure(false);

    const adminEditItemAtomSetter = useSetAtom(adminEditItemAtom)

    if (!opened) {
        adminEditItemAtomSetter(defaultEditDataAtom)
    }
    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                w={"100%"} h={"100%"}
                mx={"auto"}
                title={adminEditButton.name}

            >
                <Group align={"center"} spacing={"xs"}>

                    <adminEditButton.icon />

                    <Text
                        color={
                            colorScheme === "dark"
                                ? CardContainerColors.textColorDark
                                : CardContainerColors.textColorLight
                        }
                        mr={"md"}
                    >
                        {adminEditButton.name}
                    </Text>

                </Group>

            </ActionIcon>

            <ResponsiveModalContext responsiveModalOpened={opened} responsiveModalHandlers={handlers} modalTitle={"EDIT ITEM"}

                size={"auto"} contentMargin={"auto"}
            >
                <LoadingOverlay visible={loadingOverlayVisible} overlayBlur={2} />

                <Stack spacing={"xl"} >

                    <Group my={"xl"}>

                        <Container >
                            <Center>
                                <Stack >
                                    <EditMainImage SingleItemDataMainImageURL={props.SingleItemData.mainImageURL} />
                                    <EditSecondaryImages SingleItemDataSecondaryImagesURLS={props.SingleItemData.secondaryImagesURLS} />
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
                                    <EditItemTitle SingleItemDataTitle={props.SingleItemData.title} />
                                    <EditItemDescription SingleItemDataDescription={props.SingleItemData.description} />
                                    <EditItemCategory SingleItemDataCategory={props.SingleItemData.category} />
                                    <EditItemPrice SingleItemDataPrice={props.SingleItemData.price} />
                                    <EditItemStock SingleItemDataStock={props.SingleItemData.stock} />
                                    <EditItemTags SingleItemDataTags={props.SingleItemData.tags} />
                                </Stack>

                            </Center>
                        </Container>

                    </Group>

                    <EditItemConfirmationButton loadingOverlayVisibleHandlers={loadingOverlayVisibleHandlers} handlers={handlers} SingleItemDataID={props.SingleItemData.item_id} />
                </Stack>


            </ResponsiveModalContext>



        </>
    )
}

export default AdminEditItem
import { ActionIcon, Container, Menu, Transition, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { IconContext } from "react-icons";
import { useSupabase } from "../../../Context/SupabaseWrapper/supabase-provider";
import { NavBarColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { adminAddItem, adminEditButton, plusIcon } from "../../../Shared/icons";
import { desktopNavIconSizes, desktopNavRadius } from "../../../Shared/sizes";
import { adminEditItemAtom } from "../../../Stores/adminEditItemStore";
import { currentSessionUserIsAdmin } from "../../../Stores/adminSpecialButtonsStore";
import { SingleItemData } from "../../../Stores/itemDataStore";
import AdminAddItem from "./AdminAddItem/AdminAddItem";
import AdminDeleteItem from "./AdminDeleteItem/AdminDeleteItem";
import AdminEditItem from "./AdminEditItem/AdminEditItem";

interface Props {
    SingleItemData: SingleItemData
}

const AdminCardOptionsButton: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const showAdminOptions = useAtomValue(currentSessionUserIsAdmin)
    const { colorScheme, } = useMantineColorScheme();

    // const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)

    // const newArr = adminEditItemAtomValue
    // newArr['category'] = props.SingleItemData.category
    // newArr['description'] = props.SingleItemData.description
    // newArr['price'] = props.SingleItemData.price
    // newArr['stock'] = props.SingleItemData.stock
    // newArr['tags'] = props.SingleItemData.tags
    // newArr['title'] = props.SingleItemData.title
    // newArr['secondaryImagesURLS'] = props.SingleItemData.secondaryImagesURLS
    // newArr['mainImageURL'] = props.SingleItemData.mainImageURL
    // newArr['item_id'] = props.SingleItemData.item_id

    // adminEditItemAtomSetter(props.SingleItemData)

    return (
        <Transition
            // mounted={screenSizes == "DESKTOP" && ((xMousePos.x <= 100 || navBarLocked))}
            mounted={showAdminOptions}
            transition="slide-down" duration={800}
        >
            {(styles) =>


                <Menu shadow="md" width={"fit-content"} position={"bottom-end"} closeOnClickOutside={false} closeOnItemClick={false}

                    transitionProps={{
                        transition: "slide-down",
                        duration: 300,
                    }}


                    styles={{
                        dropdown: {
                            // borderRadius: desktopNavRadius.navbarBorderRadius,
                            backdropFilter: "blur(2px)",
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                            backgroundSize: "300% 300%",
                            animation: `${style.AnimateBG} 7s ease infinite`,
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical,
                            padding: "1rem",
                        },
                        label: {

                            color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                        },
                        item: {
                            backdropFilter: "blur(2px)",
                            WebkitBackdropFilter: "blur(2px)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                            backgroundSize: "300% 300%",
                            animation: `${style.AnimateBG} 7s ease infinite`,
                            border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                            backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical,

                            // ":hover": {
                            //     border: "2px solid black"
                            // }
                            marginBlock: "0.5rem"

                        }

                    }}
                    zIndex={2}

                >
                    <Menu.Target>
                        <Container
                            // pos={"fixed"}
                            // top={0} right={0}
                            m={0}
                            // w={"fit-content"}
                            style={styles}

                            className={style.Animated_Background_Gradient}

                            sx={{
                                borderRadius: desktopNavRadius.navbarBorderRadius,
                                backdropFilter: "blur(2px)",
                                WebkitBackdropFilter: "blur(2px)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                                border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`,
                                backgroundImage: colorScheme === "dark" ? NavBarColors.backgroundColorDarkVertical : NavBarColors.backgroundColorLightVertical,

                                zIndex: 2,

                            }}

                        >
                            <ActionIcon variant="transparent"
                                w={"100%"} h={"100%"}
                                mx={"auto"}
                                title={adminEditButton.name}

                            >
                                <adminEditButton.icon
                                    size={"1.5rem"}
                                    color={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                                />
                            </ActionIcon>
                        </Container>


                    </Menu.Target>

                    <IconContext.Provider
                        value={{
                            color: colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight,
                            size: "2rem"
                        }}>

                        <Menu.Dropdown>
                            <Menu.Label>Edit Menu</Menu.Label>

                            <Menu.Item>
                                <AdminEditItem SingleItemData={props.SingleItemData} />
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item sx={{
                                ":hover": {
                                    background: "red"
                                }
                            }}>
                                <AdminDeleteItem SingleItemData={props.SingleItemData} />
                            </Menu.Item>
                        </Menu.Dropdown>

                    </IconContext.Provider>
                </Menu>
            }
        </Transition>
    )
}

export default AdminCardOptionsButton
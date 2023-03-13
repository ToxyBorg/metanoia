import { ActionIcon, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";
import { ModalColors } from "../../../../Shared/colors";
import style from "../../../../Shared/css/style";
import { admin } from "../../../../Shared/icons";
import ResponsiveModalContext from "../../../UI/ResponsiveModalContext";
import AdminLoginEmailConfirmation from "./components/AdminLoginEmailConfirmation";

interface Props { }

const AdminLogin: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {

    const [opened, handlers] = useDisclosure(false);
    const { colorScheme, } = useMantineColorScheme();


    return (

        <>
            <ActionIcon
                onClick={() => handlers.toggle()}
                mx={"auto"}
                title={admin.name}

                w={"100%"} h={"100%"}
                bg={colorScheme === "dark" ? ModalColors.iconsBackgroundColorDark : ModalColors.iconsBackgroundColorLight}

                variant="outline"
                radius={"md"}
                p={"xs"}


                sx={{
                    border: `2px solid ${colorScheme === "dark" ? ModalColors.iconsBorderColorDark : ModalColors.iconsBorderColorLight}`,
                    // borderRadius: 15,
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.5)",
                }}
                className={style.Animated_Background_Gradient}


            >
                <Stack align="center" spacing={"xs"} >

                    <admin.icon title={admin.name} style={{ alignSelf: "center", }}
                    // color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                    />

                    <Text
                        color={colorScheme === "dark" ? ModalColors.iconsLineColorDark : ModalColors.iconsLineColorLight}
                        fz={"clamp(0.85rem, 2vw , 5rem)"}

                    >
                        {admin.name}
                    </Text>

                </Stack>

            </ActionIcon>

            <ResponsiveModalContext
                size={"xl"}
                responsiveModalOpened={opened}
                responsiveModalHandlers={handlers}
                modalTitle={"ADMIN LOGIN"}
                zIndex={250}
            >

                <AdminLoginEmailConfirmation />

            </ResponsiveModalContext>
        </>
    )
}

export default AdminLogin
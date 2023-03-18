import { Switch, useMantineColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";
import { useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";

interface Props {
    loadingOverlayVisible: boolean

}

const AddItemMeasurements: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)
    const [checked, setChecked] = useState(adminAddItemAtomValue.allow_measurements == "ALLOW" ? true : false);
    return (
        <Switch
            onLabel="ALLOW"
            offLabel="DEFAULT"
            checked={checked}
            onChange={
                (event) => {

                    const newArr = adminAddItemAtomValue
                    newArr['allow_measurements'] = event.currentTarget.checked ? "ALLOW" : "DEFAULT"
                    adminAddItemAtomSetter(newArr)

                    setChecked(event.currentTarget.checked)
                }
            }
            label={checked ? "Allow user to enter their measurements" : "Use default measurements for this item"}
            size="xl"
            radius="md"
            color="grape"

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
            w={"fit-content"}
        />
    )
}

export default AddItemMeasurements

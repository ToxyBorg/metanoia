import { Center, Group, Switch, Text, useMantineColorScheme } from "@mantine/core";
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
        <Group
            sx={{
                border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                borderRadius: "15px",
                boxShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",

            }}
            p={"0.5rem"}
        >

            <Switch
                disabled={props.loadingOverlayVisible}
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

                radius="md"
                color="green"
                size={"md"}

                sx={{
                    border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                    borderRadius: "10px",
                    boxShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",

                }}

                p={0}

            />
            <Text
                sx={{
                    wordBreak: "break-word",
                    textShadow: "0 7px 15px rgba(0, 0, 0, 0.5)",

                }}
                color={colorScheme === "dark"
                    ? CardContainerColors.textColorDark
                    : CardContainerColors.textColorLight
                }
            >
                {checked ? "Allow user to enter their measurements" : "Use default measurements for this item"}
            </Text>

        </Group>
    )
}

export default AddItemMeasurements

import { Group, Loader, LoadingOverlay, Switch, Text, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { SingleItemData } from "../../../../../Stores/itemDataStore";
import { useAtom, useAtomValue } from "jotai";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { allow_measurementsEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";

interface Props {
    SingleItemDataAllowMeasurements: SingleItemData['allow_measurements']

}

const EditItemMeasurements: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)
    const allow_measurementsEditLoadingValue = useAtomValue(allow_measurementsEditLoading)

    const [checked, setChecked] = useState(props.SingleItemDataAllowMeasurements == "ALLOW" ? true : false);

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
                disabled={allow_measurementsEditLoadingValue}
                onLabel="ALLOW"
                offLabel="DEFAULT"
                checked={checked}
                onChange={
                    (event) => {

                        const current_measurement: typeof props.SingleItemDataAllowMeasurements = event.currentTarget.checked ? 'ALLOW' : "DEFAULT"
                        const newArr = adminEditItemAtomValue
                        newArr['allow_measurements'] = {
                            newData: current_measurement,
                            modified: current_measurement == props.SingleItemDataAllowMeasurements ? false : true
                        }
                        adminEditItemAtomSetter(newArr)

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

        </Group >
    )
}


export default EditItemMeasurements
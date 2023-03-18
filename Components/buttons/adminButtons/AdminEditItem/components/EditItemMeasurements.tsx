import { Loader, LoadingOverlay, Switch, useMantineColorScheme } from "@mantine/core";
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
        // <div style={{ position: "relative", width: "fit-content", height: "fit-content" }}>
        //     <LoadingOverlay visible={!allow_measurementsEditLoadingValue} overlayBlur={2} zIndex={2} loader={<Loader color="pink" size="xs" />} />
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
        // </div>
    )
}


export default EditItemMeasurements
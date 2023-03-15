import { ActionIcon, createStyles, Group, LoadingOverlay, NumberInput, NumberInputHandlers, rem, useMantineColorScheme } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";
import { stockEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

interface Props {
    SingleItemDataStock: SingleItemData['stock']

}

const EditItemStock: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    return (
        <FloatingLabelInput label={"Item stock"} placeholder={"Enter item stock"} required SingleItemDataStock={props.SingleItemDataStock} />

    )
}

export default EditItemStock

////////////////////////////////////////////////////////////////////////////////


const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === "dark"
                ? CardContainerColors.textColorDark
                : CardContainerColors.textColorLight

            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[6],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: !floating ? 'transparent' : undefined,
        },
    },
}));

interface InputProps {
    label: ReactNode,
    placeholder: string | undefined,
    required: boolean,
    SingleItemDataStock: SingleItemData['stock']

}

export function FloatingLabelInput(inputProps: InputProps) {

    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)
    const stockEditLoadingValue = useAtomValue(stockEditLoading)

    const { colorScheme, } = useMantineColorScheme();

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(inputProps.SingleItemDataStock);
    // const handlers = useRef<NumberInputHandlers>();

    const { classes } = useStyles({ floating: value !== 0 || value !== null || focused });

    return (
        <div style={{ position: "relative" }}>
            <LoadingOverlay visible={stockEditLoadingValue} overlayBlur={2} zIndex={2} />
            <NumberInput
                type="number"
                hideControls
                label={inputProps.label}
                placeholder={inputProps.placeholder}
                required={inputProps.required}
                classNames={classes}
                value={value}

                onChange={
                    (event) => {
                        const newArr = adminEditItemAtomValue

                        if (typeof event == 'number') {
                            newArr['stock'] = {
                                newData: event,
                                modified: event == inputProps.SingleItemDataStock ? false : true
                            }
                            setValue(event)
                        } else {
                            newArr['stock'] = {
                                newData: 0,
                                modified: event == inputProps.SingleItemDataStock.toString() ? false : true
                            }
                            setValue(0)
                        }

                        adminEditItemAtomSetter(newArr)

                    }
                }
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                // handlersRef={inputProps.handlers}

                sx={{

                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
            // styles={{
            //     input: {
            //         border: `2px solid ${colorScheme === "dark"
            //             ? CardContainerColors.borderColorDark
            //             : CardContainerColors.borderColorLight}`,
            //     },
            // }}

            />
        </div>
    );
}

import { ActionIcon, createStyles, Group, NumberInput, NumberInputHandlers, rem, useMantineColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";

interface Props {
    loadingOverlayVisible: boolean

}

const AddItemStock: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {


    return (
        // <Group spacing={5}

        // >
        //     <ActionIcon size={42} variant="default" onClick={() => handlers.current?.decrement()}
        //         sx={{
        //             WebkitBackdropFilter: "blur(2px)",
        //             boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        //         }}
        //     >
        //         –
        //     </ActionIcon>

        <FloatingLabelInput label={"Item stock"} placeholder={"Enter item stock"} loadingOverlayVisible={props.loadingOverlayVisible} required />


        //     <ActionIcon size={42} variant="default" onClick={() => handlers.current?.increment()}
        //         sx={{
        //             WebkitBackdropFilter: "blur(2px)",
        //             boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        //         }}
        //     >
        //         +
        //     </ActionIcon>
        // </Group>
    );
}

export default AddItemStock


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
    loadingOverlayVisible: boolean

    // handlers: MutableRefObject<NumberInputHandlers | undefined>
    // requiredName?: keyof in_person_delivery['required'],
    // notRequiredName?: keyof in_person_delivery['not_required']
}

export function FloatingLabelInput(inputProps: InputProps) {

    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)
    const { colorScheme, } = useMantineColorScheme();

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(adminAddItemAtomValue.stock);
    // const handlers = useRef<NumberInputHandlers>();

    const { classes } = useStyles({ floating: value !== 0 || value !== null || focused });

    return (

        <NumberInput
            disabled={inputProps.loadingOverlayVisible}
            type="number"
            hideControls
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}

            onChange={
                (event) => {
                    const newArr = adminAddItemAtomValue

                    if (typeof event == 'number') {
                        newArr['stock'] = event
                        setValue(event)
                    } else {
                        newArr['stock'] = 0
                        setValue(0)
                    }

                    adminAddItemAtomSetter(newArr)

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
    );
}

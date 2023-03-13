import { createStyles, rem, TextInput, useMantineColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { ReactNode, useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";

interface Props { }

const AddItemTitle: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    return (
        <FloatingLabelInput label={"Item title"} placeholder={"Enter item title"} required />
    )
}

export default AddItemTitle

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
    // requiredName?: keyof in_person_delivery['required'],
    // notRequiredName?: keyof in_person_delivery['not_required']
}

export function FloatingLabelInput(inputProps: InputProps) {

    const { colorScheme, } = useMantineColorScheme();


    const [adminAddItemAtomValue, adminAddItemAtomSetter] = useAtom(adminAddItemAtom)


    const initialValue = adminAddItemAtomValue.title.length > 0
        ? adminAddItemAtomValue.title
        : ''


    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(initialValue);
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

    return (
        <TextInput
            // w={"100%"}
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}
            onChange={
                (event) => {
                    const newArr = adminAddItemAtomValue

                    newArr['title'] = event.currentTarget.value

                    adminAddItemAtomSetter(newArr)

                    setValue(event.currentTarget.value)
                }
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            // mt="1rem"

            // styles={{
            //     input: {
            //         border: `2px solid ${colorScheme === "dark"
            //             ? CardContainerColors.borderColorDark
            //             : CardContainerColors.borderColorLight}`,
            //     }
            // }}
            sx={{

                WebkitBackdropFilter: "blur(2px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            }}

        />
    );
}

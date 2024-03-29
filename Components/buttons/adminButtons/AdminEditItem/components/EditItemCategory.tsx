import type { NextComponentType, NextPageContext } from "next";
import { forwardRef, useState } from 'react';
import { Group, Avatar, Text, Select, useMantineColorScheme, createStyles, rem, LoadingOverlay, Loader } from '@mantine/core';
import { bracelets, earrings, IconInfo, necklaces, rings } from "../../../../../Shared/icons";
import { CategoriesType, SingleItemData } from "../../../../../Stores/itemDataStore";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";
import { useAtom, useAtomValue } from "jotai";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { categoryEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";

interface Props {
    SingleItemDataCategory: SingleItemData['category']

}

const EditItemCategory: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)
    const categoryEditLoadingValue = useAtomValue(categoryEditLoading)

    const { colorScheme, } = useMantineColorScheme();



    const [searchValue, onSearchChange] = useState(props.SingleItemDataCategory);

    const [focused, setFocused] = useState(false);
    const { classes } = useStyles({ floating: searchValue.trim().length !== 0 || focused });



    return (
        <div style={{ position: "relative" }}>
            <LoadingOverlay visible={categoryEditLoadingValue} overlayBlur={2} zIndex={2} loader={<Loader color="pink" size="xs" />} />

            <Select
                disabled={categoryEditLoadingValue}
                classNames={classes}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                dropdownPosition={"flip"}
                required
                label="Category"
                placeholder="Pick one"
                onChange={(event: CategoriesType) => {
                    const newArr = adminEditItemAtomValue

                    newArr['category'] = {
                        newData: event,
                        modified: event == props.SingleItemDataCategory ? false : true
                    }

                    adminEditItemAtomSetter(newArr)

                    onSearchChange(event)
                }}
                value={searchValue}
                nothingFound="No options"
                data={testData}

                transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                withinPortal

                sx={{

                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}

                styles={{
                    // input: {
                    //     border: `2px solid ${colorScheme === "dark"
                    //         ? CardContainerColors.borderColorDark
                    //         : CardContainerColors.borderColorLight}`,


                    // },
                    dropdown: {
                        border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        // borderRadius: 15,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        backgroundImage: colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`

                    },

                }}

            />
        </div>
    );
}

export default EditItemCategory

////////////////////////////////////////////////////////////////////

const testData: CategoriesType[] = [
    'bracelets', 'earrings', 'necklaces', 'rings'
]

////////////////////////////////////////////////////////////////////

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
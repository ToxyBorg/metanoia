import { createStyles, LoadingOverlay, MultiSelect, rem, Text, useMantineColorScheme } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { CardContainerColors } from "../../../../../Shared/colors";
import style from "../../../../../Shared/css/style";
import { adminAddItemAtom } from "../../../../../Stores/adminAddItemStore";
import { tagsEditLoading } from "../../../../../Stores/adminEditItemLoadingsStore";
import { adminEditItemAtom } from "../../../../../Stores/adminEditItemStore";
import { SingleItemData } from "../../../../../Stores/itemDataStore";

interface Props {
    SingleItemDataTags: SingleItemData['tags']
}

const EditItemTags: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [adminEditItemAtomValue, adminEditItemAtomSetter] = useAtom(adminEditItemAtom)
    const tagsEditLoadingValue = useAtomValue(tagsEditLoading)

    const { colorScheme, } = useMantineColorScheme();



    const [searchValue, onSearchChange] = useState(props.SingleItemDataTags);
    const [focused, setFocused] = useState(false);
    const { classes } = useStyles({ floating: searchValue.length !== 0 || focused });


    return (
        <div style={{ position: "relative" }}>
            <LoadingOverlay visible={tagsEditLoadingValue} overlayBlur={2} zIndex={2} />

            <MultiSelect

                classNames={classes}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                dropdownPosition={"flip"}
                required
                label="Tags"
                // placeholder="Create some tags"
                searchable
                onChange={(event) => {
                    const newArr = adminEditItemAtomValue

                    newArr['tags'] = {
                        newData: event,
                        modified: event == props.SingleItemDataTags ? false : true
                    }

                    adminEditItemAtomSetter(newArr)

                    onSearchChange(event)
                }}
                creatable
                getCreateLabel={(query) => `+ Create ${query} tag`}
                onCreate={(query) => {

                    onSearchChange((current) => [...current, query]);
                    return query;
                }}

                data={searchValue}
                value={searchValue}
                nothingFound="No options"

                transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                withinPortal
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                // clearable
                rightSection={<></>}

                sx={{

                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
                styles={{

                    input: {
                        padding: 0,
                        // paddingLeft: "1rem"
                    },

                    dropdown: {

                        border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        backgroundImage: colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`

                    },
                    value: {

                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                        backgroundImage: colorScheme === "dark"
                            ? CardContainerColors.backgroundColorDark
                            : CardContainerColors.backgroundColorLight,

                        backgroundSize: "300% 300%",
                        animation: `${style.AnimateBG} 7s ease infinite`,

                        color: colorScheme === "dark"
                            ? CardContainerColors.textColorDark
                            : CardContainerColors.textColorLight,

                        marginInline: "1rem",
                        marginTop: "0.5rem"


                    },
                    values: {

                        width: "clamp(35vw,200px,36vw)",
                        marginBottom: "2rem",

                    },

                    rightSection: {
                        width: 0

                    },


                }}

            />
        </div>
    );
}

export default EditItemTags

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
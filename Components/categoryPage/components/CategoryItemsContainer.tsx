"use client"

import { Container, Grid, Text, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { redirect } from "next/navigation";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { CategoriesType, categorizedItemsDataAtom } from "../../../Stores/itemDataStore";
import Cards from "../../MainPage/ResponsiveItemsContainer/components/Cards";

interface Props {
    category: CategoriesType
}

const CategoryItemsContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const categorizedItemsDataAtomValue = useAtomValue(categorizedItemsDataAtom)
    const { colorScheme, } = useMantineColorScheme();

    const allDataFromCategory = categorizedItemsDataAtomValue[props.category]


    const slugCategoryCards = allDataFromCategory.data.map(info => {
        return <Cards key={info.item_id} SingleItemData={info} />
    })



    if ((slugCategoryCards.length <= 0 || slugCategoryCards == null)) {

        return (

            <h1>
                No items available
            </h1>
        )
    }

    return (
        <IconContext.Provider
            value={{
                color: colorScheme === "dark"
                    ? CardContainerColors.iconsLineColorDark
                    : CardContainerColors.iconsLineColorLight,
                size: "clamp(2vw, 3rem , 10vw)"
            }}>

            { }
            <Grid

                align={"center"}
                sx={(theme) => ({
                    border: `2px solid ${colorScheme === "dark"
                        ? CardContainerColors.borderColorDark
                        : CardContainerColors.borderColorLight}`,
                    borderRadius: 15,
                })}

                bg={colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight
                }

                className={style.Animated_Background_Gradient}
            >
                {slugCategoryCards.map(card => {
                    return <Grid.Col span="auto" key={card.key}>{card}</Grid.Col>
                })}


            </Grid>

        </IconContext.Provider>
    )
}

export default CategoryItemsContainer
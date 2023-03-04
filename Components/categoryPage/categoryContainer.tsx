"use client"

import { Container, Transition } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import { CategoriesType } from "../../Stores/itemDataStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import CategoryItemsContainer from "./components/CategoryItemsContainer";

interface Props {
    category: CategoriesType
}

const CategoryContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const screenSizes = useAtomValue(screenSizesAtom)

    return (


        <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-left" duration={1500} timingFunction="ease">
            {(styles) =>
                <Container my={"xl"} style={styles}>
                    <CategoryItemsContainer category={props.category} />
                </Container>}
        </Transition>


    )
}

export default CategoryContainer
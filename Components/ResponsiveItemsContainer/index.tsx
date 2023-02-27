"use client"

import { Badge, Button, Card, Container, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image';
import { mobileSizes } from "../../Shared/screenSizes";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import Cards from "./components/Cards";
import ItemsContainer from "./components/ItemsContainer";


interface Props { }

const Index: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const screenSizes = useAtomValue(screenSizesAtom)

    if (screenSizes != "OUT_OF_RANGE") {
        return <ItemsContainer />
    }
    else return <></>


}

export default Index 
// import "server-only"
"use client"
import { useSetAtom } from "jotai";
import { bracelets, earrings, necklaces, rings } from "../Shared/icons";
import { AllItemsData, categorizedItemsDataAtom } from "../Stores/itemDataStore";

import AppShellWrapper from "./AppShellWrapper";
import MantineRootStyleWrapper from "./MantineRootStyleWrapper";

interface Props {
    children: React.ReactNode,
    AllItemsData: AllItemsData
}

const ContextWrapper = (props: Props) => {
    // const itemsDataAtomSetter = useSetAtom(itemsDataAtom)
    // itemsDataAtomSetter(props.AllItemsData)


    const categorizedItemsDataAtomSetter = useSetAtom(categorizedItemsDataAtom)
    categorizedItemsDataAtomSetter(
        {
            "rings": {
                data: props.AllItemsData.filter((obj) => {
                    return obj.category == "rings";
                }), icon: rings
            },
            "bracelets": {
                data: props.AllItemsData.filter((obj) => {
                    return obj.category == "bracelets";
                }), icon: bracelets
            },
            "necklaces": {
                data: props.AllItemsData.filter((obj) => {
                    return obj.category == "necklaces";
                }), icon: necklaces
            },
            "earrings": {
                data: props.AllItemsData.filter((obj) => {
                    return obj.category == "earrings";
                }), icon: earrings
            },
        }
    )

    return (


        <MantineRootStyleWrapper>
            <AppShellWrapper>
                {props.children}
            </AppShellWrapper>
        </MantineRootStyleWrapper>

    )
}

export default ContextWrapper
"use client"

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";
import ItemsContainer from "./components/ItemsContainer";
import { Transition } from "@mantine/core";
import CheckoutContainer from "../../CheckoutPage/CheckoutContainer";
import { cartItemsDataAtom } from "../../../Stores/cartStore";
import { heroScrollIntoViewAtom } from "../../../Stores/heroScrollIntoView";

interface Props {
    // AllItemsData: AllItemsData
}

const ResponsiveItemsContainer = () => {

    const screenSizes = useAtomValue(screenSizesAtom)

    const heroScrollIntoViewAtomValue = useAtomValue(heroScrollIntoViewAtom)

    return (


        <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-left" duration={1500} timingFunction="ease">
            {(styles) =>
                <div style={styles} ref={heroScrollIntoViewAtomValue?.targetRef}>
                    <ItemsContainer />
                </div>}
        </Transition>


    )
    // if (screenSizes != "OUT_OF_RANGE") {
    //     return <ItemsContainer />
    // }
    // else return <></>


}

export default ResponsiveItemsContainer
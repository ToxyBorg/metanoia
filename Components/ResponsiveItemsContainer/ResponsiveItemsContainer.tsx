"use client"

import { useAtom, useAtomValue } from "jotai";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import ItemsContainer from "./components/ItemsContainer";
import { Transition } from "@mantine/core";
import { switchToCheckout } from "../../Stores/checkoutStore";
import CheckoutContainer from "../CheckoutPage/CheckoutContainer";
import { cartItemsDataAtom } from "../../Stores/cartStore";

interface Props {
    // AllItemsData: AllItemsData
}

const ResponsiveItemsContainer = () => {

    const screenSizes = useAtomValue(screenSizesAtom)
    const [switchToCheckoutValue, switchToCheckoutSetter] = useAtom(switchToCheckout)

    const cartItemsDataAtomValue = useAtomValue(cartItemsDataAtom)

    if (cartItemsDataAtomValue.length <= 0) {
        switchToCheckoutSetter(false)
    }

    return (

        <>

            <Transition mounted={screenSizes != "OUT_OF_RANGE" && !switchToCheckoutValue} transition="slide-left" duration={500} timingFunction="ease">
                {(styles) =>
                    <div style={styles}>
                        <ItemsContainer />
                    </div>}
            </Transition>

            <Transition mounted={screenSizes != "OUT_OF_RANGE" && switchToCheckoutValue} transition="slide-right" duration={700} timingFunction="ease">
                {(styles) =>
                    <div style={styles}>
                        <CheckoutContainer />
                    </div>}
            </Transition>

        </>

    )
    // if (screenSizes != "OUT_OF_RANGE") {
    //     return <ItemsContainer />
    // }
    // else return <></>


}

export default ResponsiveItemsContainer





// const mockData = [
//     {
//         title: 'Top 10 places to visit in Norway this summer Best forests to visit in North America',
//         image: "https://picsum.photos/id/1/600/800",
//         secondaryImages: [
//             "https://picsum.photos/id/2/600/800",
//             "https://picsum.photos/id/3/600/800",
//             "https://picsum.photos/id/4/600/800",
//             "https://picsum.photos/id/5/600/800",
//         ],
//         date: 'August 18, 2022',
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
//         price: 1580,
//         id: 1

//     },
//     {
//         title: 'Best forests to visit in North America Best forests to visit in North America',
//         image:
//             "https://picsum.photos/id/6/600/800",
//         secondaryImages: [
//             "https://picsum.photos/id/7/600/800",
//             "https://picsum.photos/id/8/600/800",
//             "https://picsum.photos/id/9/600/800",
//         ],
//         date: 'August 27, 2022',
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
//         price: 2000,
//         id: 2
//     },
//     {
//         title: 'Hawaii beaches review: better than you think Best forests to visit in North America',
//         image:
//             "https://picsum.photos/id/10/600/800",
//         secondaryImages: [
//             "https://picsum.photos/id/11/600/800",
//             "https://picsum.photos/id/12/600/800",
//         ],
//         date: 'September 9, 2022',
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
//         price: 500,
//         id: 3
//     },
//     {
//         title: 'Mountains at night: 12 best locations to enjoy the view Best forests to visit in North America',
//         image: "https://picsum.photos/id/13/600/800",
//         secondaryImages: [
//             "https://picsum.photos/id/14/600/800",
//             "https://picsum.photos/id/15/600/800",
//             "https://picsum.photos/id/16/600/800",
//         ],
//         date: 'September 12, 2022',
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repudiandae, velit officia excepturi, repellendus perferendis corrupti sed quidem at, ducimus odio nam! Tempora, accusantium nisi?",
//         price: 5854,
//         id: 4
//     },
// ];

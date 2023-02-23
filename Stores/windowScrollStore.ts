import { useShallowEffect } from "@mantine/hooks";
import { atom } from "jotai";

/**                 INTERFACES AND TYPES */
type windowScrollDirectionType = "UP" | "DOWN"

/**         NAV WINDOW SCROLL */
const windowScrollDirectionInitAtom = atom<windowScrollDirectionType>("UP")
export const windowScrollDirectionAtom = atom(
    (get) => get(windowScrollDirectionInitAtom),
    (get, set, setter?: windowScrollDirectionType) => {

        // const [HideOnScrollDown, setHideOnScrollDown] = useState(0)

        // useWindowEvent('scroll', () => {
        //     if (HideOnScrollDown > scrollY) { // Scrolling up
        //         set(windowScrollDirectionInitAtom, "UP")
        //     } else if (HideOnScrollDown < scrollY) { // Scrolling down
        //         set(windowScrollDirectionInitAtom, "DOWN")
        //     }
        //     setHideOnScrollDown(scrollY);
        // })

        if (setter != undefined) {
            set(windowScrollDirectionInitAtom, setter)
        }

        else {
            useShallowEffect(() => {

                let windowScrollPos = scrollY;

                window.onscroll = () => {

                    if (scrollY < windowScrollPos) { // Scrolling up
                        // console.log("UP")
                        set(windowScrollDirectionInitAtom, "UP")

                    } else if (scrollY > windowScrollPos) { // Scrolling down
                        // console.log("DOWN")
                        set(windowScrollDirectionInitAtom, "DOWN")
                    }

                    windowScrollPos = scrollY
                }

            }, [windowScrollDirectionInitAtom])
        }

    }
)
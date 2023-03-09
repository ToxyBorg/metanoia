import { ActionIcon, MantineNumberSize, useMantineColorScheme } from "@mantine/core"

import { MetanoiaSVG } from "../../../Shared/icons"
import Link from "next/link";
import { NavBarColors } from "../../../Shared/colors";
import { useAtomValue } from "jotai";
import { screenSizesAtom } from "../../../Stores/screenSizesStore";


export const Home = () => {
    // const [scroll, scrollTo] = useWindowScroll();
    const { colorScheme, } = useMantineColorScheme();

    // const screenSizes = useAtomValue(screenSizesAtom)

    // const allSizes = getAllSizes[screenSizes]

    return (

        <ActionIcon variant="transparent" component={Link} href={"/"}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}

            w={"100%"} h={"100%"}

            title={"Home"}
            mx={"auto"}

        >
            {/* <home.icon title={home.name} /> */}
            <MetanoiaSVG
                lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeWidth={10}

            />

        </ ActionIcon>



    )
}
import { ActionIcon, useMantineColorScheme } from "@mantine/core"

import { MetanoiaSVG } from "../../../../../Shared/icons"
import Link from "next/link";
import { desktopNavIconSizes, desktopNavRadius, mobileNavIconSizes, mobileNavRadius, tabletNavIconSizes, tabletNavRadius } from "../../../../../Shared/sizes";
import { NavBarColors } from "../../../../../Shared/colors";


export const MobileHome = () => {
    // const [scroll, scrollTo] = useWindowScroll();
    const { colorScheme, } = useMantineColorScheme();


    return (

        <ActionIcon variant="transparent" component={Link} href={"/"}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}

            size={mobileNavIconSizes.ActionIconLocalSVGSize}
            sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
        >
            {/* <home.icon title={home.name} /> */}
            <MetanoiaSVG
                lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeWidth={60}

            />

        </ ActionIcon>



    )
}

export const TabletHome = () => {
    // const [scroll, scrollTo] = useWindowScroll();
    const { colorScheme, } = useMantineColorScheme();


    return (

        <ActionIcon variant="transparent" component={Link} href={"/"}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}

            size={tabletNavIconSizes.ActionIconLocalSVGSize}
            sx={{ borderRadius: tabletNavRadius.iconsBorderRadius }}
        >
            {/* <home.icon title={home.name} /> */}
            <MetanoiaSVG
                lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeWidth={45}

            />

        </ ActionIcon>


    )
}

export const DesktopHome = () => {
    // const [scroll, scrollTo] = useWindowScroll();
    const { colorScheme, } = useMantineColorScheme();


    return (

        <ActionIcon variant="transparent" component={Link} href={"/"}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}

            size={desktopNavIconSizes.ActionIconLocalSVGSize}
            sx={{ borderRadius: desktopNavRadius.iconsBorderRadius }}
            mx={"auto"}
            title={"Home"}
        >
            {/* <home.icon title={home.name} /> */}
            <MetanoiaSVG
                lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                strokeWidth={50}

            />

        </ ActionIcon>


    )
}

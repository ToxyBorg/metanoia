// import "server-only"
"use client"

import { useMediaQuery } from "@mantine/hooks";
import { desktopSizes, mobileSizes, tabletSizes } from "../../Shared/screenSizes";
import DesktopNav from "./components/navBars/DesktopNav";
import MobileNav from "./components/navBars/MobileNav";
import TabletNav from "./components/navBars/TabletNav";

const ResponsiveNavBar = () => {

    const mobileMinSize = useMediaQuery(mobileSizes.minSize);
    const mobileMaxSize = useMediaQuery(mobileSizes.maxSize);

    const tabletMinSize = useMediaQuery(tabletSizes.minSize);
    const tabletMaxSize = useMediaQuery(tabletSizes.maxSize);

    const desktopMinSize = useMediaQuery(desktopSizes.minSize);

    if (mobileMinSize && mobileMaxSize) {
        return <MobileNav mobileBreakpoints={(mobileMinSize && mobileMaxSize)} />
    }
    else if (tabletMinSize && tabletMaxSize) {
        return <TabletNav tabletBreakpoints={(tabletMinSize && tabletMaxSize)} />
    }
    else if (desktopMinSize) {
        return <DesktopNav desktopBreakpoints={desktopMinSize} />
    }
    else return <></>
}



export default ResponsiveNavBar


/*
<Transition
                mounted={mobileMinSize && mobileMaxSize}
                transition="slide-up" duration={500} timingFunction="ease-in-out"
            >
                {(styles) =>
                    <IconContext.Provider value={{ color: IconBgColor, size: mobileNavIconSizes.size }}>
                        <nav
                            style={{
                                ...styles,
                                position: "fixed",
                                bottom: 0,
                                left: 0, right: 0,
                                // borderRadius: 50
                                // width: mobileNavWidthHeight.width, height: mobileNavWidthHeight.height,
                                // width: "fit-content",
                                // backgroundColor: NavBgColor
                            }}
                        >

                            <Group
                                // pos={"fixed"}
                                // bottom={0}
                                // left={0} right={0}
                                sx={{ borderRadius: 50 }}
                                mx={"auto"}
                                my={"xs"}
                                px={"xl"}
                                grow noWrap spacing={"xl"}
                                w={mobileNavWidthHeight.width} h={mobileNavWidthHeight.height}
                                style={styles}
                                bg={NavBgColor}
                            >

                                <MobileCategories mobileScreenSize={mobileMinSize && mobileMaxSize} />
                                <MobileSearch mobileScreenSize={mobileMinSize && mobileMaxSize} />
                                <MobileHome />
                                <MobileCartButton mobileScreenSize={mobileMinSize && mobileMaxSize} />
                                <MobileUserButton mobileScreenSize={mobileMinSize && mobileMaxSize} />

                            </Group >

                        </nav>

                    </IconContext.Provider>
                }
            </Transition>


*/

/*
<Transition
    mounted={tabletMinSize && tabletMaxSize}
    transition="slide-right" duration={800} timingFunction="ease-in-out"
>
    {(styles) =>
        <IconContext.Provider value={{ color: IconBgColor, size: "60%" }}>

            <Navbar
                hiddenBreakpoint={"sm"}
                fixed
                p={"xs"}

                height={"100vh"} width={{ base: 70 }}

                style={styles}

                bg={NavBgColor}
            >

                <Navbar.Section grow>
                    <MobileCategories mobileScreenSize={false} />
                    <MobileSearch mobileScreenSize={false} />
                    <MobileHome />
                    <MobileCartButton mobileScreenSize={false} />
                </Navbar.Section>

                <Divider color={NavDividerColor} />


                <Navbar.Section>
                    <MobileUserButton mobileScreenSize={false} />
                </Navbar.Section>

            </Navbar>

        </IconContext.Provider>
    }
</Transition>

*/



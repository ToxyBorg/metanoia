// import "server-only";
"use client"

import { AppShell } from "@mantine/core";
import ResponsiveHeader from "../../Components/ResponsiveHeader";
import ResponsiveNavBar from "../../Components/ResponsiveNavBar";

interface Props {
    children: React.ReactNode
}

const AppShellWrapper = (props: Props) => {

    return (
        <AppShell

            // header={<ResponsiveHeader />}
            navbar={<ResponsiveNavBar />}

        // padding={"xs"}
        >

            {props.children}

        </AppShell>
    )
}

export default AppShellWrapper
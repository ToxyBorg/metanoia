import "server-only"
import ResponsiveHeader from "../Components/ResponsiveHeader";
import ResponsiveNavBar from "../Components/ResponsiveNavBar";

import AppShellWrapper from "./AppShellWrapper";
import MantineRootStyleWrapper from "./MantineRootStyleWrapper";

interface Props {
    children: React.ReactNode
}

const ContextWrapper = (props: Props) => {
    return (

        <MantineRootStyleWrapper>
            <AppShellWrapper>
                {props.children}
            </AppShellWrapper>
        </MantineRootStyleWrapper>

    )
}

export default ContextWrapper
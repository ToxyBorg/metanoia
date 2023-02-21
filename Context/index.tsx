import "server-only"

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
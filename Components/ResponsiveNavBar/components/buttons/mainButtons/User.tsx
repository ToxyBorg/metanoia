"use client"
import { ActionIcon, Modal, Text } from "@mantine/core"

import { user } from "../../../../../Shared/icons"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { mobileNavIconSizes, mobileNavRadius } from "../../../../../Shared/sizes";
// import { screenSizesAtom } from "../../../../../Stores/screenSizesStore";

interface Props {
    mobileScreenSize: boolean
}
export const MobileUserButton = (props: Props) => {

    const [opened, handlers] = useDisclosure(false);

    // const getScreenSize = useAtomValue(screenSizesAtom)

    if (!props.mobileScreenSize) {
        handlers.close()
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={() => handlers.toggle()}
                size={mobileNavIconSizes.ActionIconSize}
                sx={{ borderRadius: mobileNavRadius.iconsBorderRadius }}
            >
                <user.icon title={user.name} />
            </ActionIcon>

            <Modal opened={opened} onClose={() => handlers.close()} title="Introduce yourself!">
                <Text>User Modal</Text>
            </Modal>
        </>
    )
}
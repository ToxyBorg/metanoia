// "use client"

import { ActionIcon } from "@mantine/core";
import { useAtom } from "jotai";
import { navLock, navUnlock } from "../../../../../Shared/icons";
import { tabletNavLockerAtom } from "../../../Stores/tablet";


export const TabletNavLock = () => {

    const [locked, updateLocked] = useAtom(tabletNavLockerAtom)


    return (
        <ActionIcon variant="transparent" size={"xl"} onClick={() => updateLocked(!locked)}>
            {locked ? <navUnlock.icon title={navUnlock.name} /> : <navLock.icon title={navLock.name} />}
        </ActionIcon>
    )
}
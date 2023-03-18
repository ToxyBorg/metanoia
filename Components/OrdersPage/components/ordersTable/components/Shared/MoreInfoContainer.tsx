import { ActionIcon, Popover, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import style from "../../../../../../Shared/css/style";
import { moreInfoIcon } from "../../../../../../Shared/icons";
import { CardContainerColors } from "../../../../../../Shared/colors";


interface Props {
    children: React.ReactNode,

}

const MoreInfoContainer: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();

    return (

        <Popover width={"auto"} trapFocus position="top" withArrow shadow="md" radius={"md"} >
            <Popover.Target>
                <ActionIcon variant="transparent" title={moreInfoIcon.name}>
                    <moreInfoIcon.icon style={{ alignSelf: "center" }} />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown
                bg={colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight
                }
                className={style.Animated_Background_Gradient}

            >

                {props.children}

            </Popover.Dropdown>
        </Popover>
    )
}

export default MoreInfoContainer
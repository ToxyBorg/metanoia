import { ActionIcon } from '@mantine/core';
import { MantineNumberSize } from '@mantine/core';
import { ColSpan } from '@mantine/core/lib/Grid/Col/Col.styles';


type iconSizesType = {
    InnerIconSize: string;
    ActionIconSize: MantineNumberSize;
    ActionIconLocalSVGSize: MantineNumberSize;
}
////////////////////////////////////////////////////////////////////////

/**             MOBILE NAVBAR SIZES */
export const mobileNavWidthHeight = { height: "3.75rem", width: "90%" }

/**             MOBILE NAVBAR ICON SIZES */
export const mobileNavIconSizes: iconSizesType = { InnerIconSize: "1.75rem", ActionIconSize: "sm", ActionIconLocalSVGSize: 45 }

/**             MOBILE NAVBAR ICON BORDER RADIUS */
export const mobileNavRadius = {
    iconsBorderRadius: 5,
    navbarBorderRadius: 15,
}

////////////////////////////////////////////////////////////////////////

/**             TABLET NAVBAR SIZES */
export const tabletNavWidthHeight = { height: "90%", width: 70 }

/**             TABLET NAVBAR ICON SIZES */
export const tabletNavIconSizes: iconSizesType = { InnerIconSize: "2rem", ActionIconSize: "lg", ActionIconLocalSVGSize: 55 }

/**             TABLET NAVBAR ICON BORDER RADIUS */
export const tabletNavRadius = {
    iconsBorderRadius: 5,
    navbarBorderRadius: 15,

}

////////////////////////////////////////////////////////////////////////

/**             DESKTOP NAVBAR SIZES */
export const desktopNavWidthHeight = { height: "90%", width: 80 }

/**             DESKTOP NAVBAR ICON SIZES */
export const desktopNavIconSizes: iconSizesType = { InnerIconSize: "2.5rem", ActionIconSize: "xl", ActionIconLocalSVGSize: 60 }

/**             DESKTOP NAVBAR ICON BORDER RADIUS */
export const desktopNavRadius = {
    iconsBorderRadius: 5,
    navbarBorderRadius: 15,
}

////////////////////////////////////////////////////////////////////////

/**             FOOTER SIZES */
export const footerWidthHeight = { height: "3.75rem", width: "100%" }

/**             FOOTER ICON SIZES */
export const footerIconSizes: iconSizesType = { InnerIconSize: "2rem", ActionIconSize: "lg", ActionIconLocalSVGSize: 45 }

// /**             FOOTER ICON BORDER RADIUS */
// export const footerRadius = {
//     iconsBorderRadius: 50,
//     navbarBorderRadius: 15,
// }

////////////////////////////////////////////////////////////////////////

type carContainerCardSizesType = {
    cardWidthHeight: {
        minWidth: number, maxWidth: number
    },
    cardIconSizes: iconSizesType,
    cardContainerBorderRadius: {
        iconsBorderRadius: number,
        containerBorderRadius: number,
        cardBorderRadius: number | string,

    }

}

/**                IMAGE ASPECT-RATIO SIZES  */
export const cardContainerSizes: {
    mobile: carContainerCardSizesType
} = {
    mobile: {
        cardWidthHeight: {
            minWidth: 230, maxWidth: 450
        },
        cardIconSizes: { InnerIconSize: "1.75rem", ActionIconSize: "md", ActionIconLocalSVGSize: 45 },
        cardContainerBorderRadius: { iconsBorderRadius: 5, containerBorderRadius: 15, cardBorderRadius: 15 }

    }


}



type getAllSizesType = {
    NavbarAndHeaderActionIconSize: MantineNumberSize,
    NavbarAndHeaderActionIconBorderRadius: string | number,

    ModalBorderRadius: string | number,
    ModalSize: MantineNumberSize,
    ModalHeaderBorderRadius: string | number,
    // ModalActionIconSize: MantineNumberSize,
    ModalActionIconBorderRadius: string | number,
    ModalGridSpanSize: ColSpan,

    ReactIconsMainIcons: string,
    ReactIconsSecondaryIcons: string,

    CollapseBorderRadius: string | number,
    CollapseActionIconSize: MantineNumberSize,
    CollapseActionIconBorderRadius: string | number,
}
const getAllSizes: {
    "OUT_OF_RANGE": getAllSizesType,
    "MOBILE": getAllSizesType,
    "TABLET": getAllSizesType,
    "DESKTOP": getAllSizesType
} = {
    "MOBILE": {
        NavbarAndHeaderActionIconSize: "sm",
        NavbarAndHeaderActionIconBorderRadius: 5,

        // ModalActionIconSize: 100,
        ModalActionIconBorderRadius: 15,
        ModalSize: "md",
        ModalBorderRadius: 15,
        ModalHeaderBorderRadius: 10,
        ModalGridSpanSize: 6,

        ReactIconsMainIcons: "4rem",
        ReactIconsSecondaryIcons: "1rem",

        CollapseBorderRadius: 10,
        CollapseActionIconSize: "sm",
        CollapseActionIconBorderRadius: 10,
    },
    "TABLET": {
        NavbarAndHeaderActionIconSize: "lg",
        NavbarAndHeaderActionIconBorderRadius: 5,

        // ModalActionIconSize: 150,
        ModalActionIconBorderRadius: 15,
        ModalSize: "sm",
        ModalBorderRadius: 15,
        ModalHeaderBorderRadius: 10,
        ModalGridSpanSize: 5,

        ReactIconsMainIcons: "5rem",
        ReactIconsSecondaryIcons: "1rem",

        CollapseBorderRadius: 10,
        CollapseActionIconSize: "md",
        CollapseActionIconBorderRadius: 10,
    },
    "DESKTOP": {
        NavbarAndHeaderActionIconSize: "xl",
        NavbarAndHeaderActionIconBorderRadius: 5,

        // ModalActionIconSize: 200,
        ModalActionIconBorderRadius: 15,
        ModalSize: "lg",
        ModalBorderRadius: 15,
        ModalHeaderBorderRadius: 10,
        ModalGridSpanSize: 5,

        ReactIconsMainIcons: "6rem",
        ReactIconsSecondaryIcons: "1rem",

        CollapseBorderRadius: 10,
        CollapseActionIconSize: "xl",
        CollapseActionIconBorderRadius: 10,
    },
    "OUT_OF_RANGE": {
        NavbarAndHeaderActionIconSize: 0,
        NavbarAndHeaderActionIconBorderRadius: '',
        ModalBorderRadius: '',
        ModalSize: 0,
        ModalHeaderBorderRadius: '',
        // ModalActionIconSize: 0,
        ModalActionIconBorderRadius: '',
        ModalGridSpanSize: 0,
        ReactIconsMainIcons: '',
        ReactIconsSecondaryIcons: '',
        CollapseBorderRadius: '',
        CollapseActionIconSize: 0,
        CollapseActionIconBorderRadius: ''
    }
}



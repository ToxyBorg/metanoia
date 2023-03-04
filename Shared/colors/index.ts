const colors = {
    PeachTranslucid: "hsl(38, 97%, 85%, 0.7)",
    Peach: "hsl(38, 97%, 85%)",
    // PeachLighter: "hsl(38, 95%, 90%)",

    Amaranth: "#E23E57",
    QuinacridoneMagenta: "#88304E",
    DarkByzantium: "#522546",

    DarkPurple: "#311d3f",
    DarkPurpleLighter: "hsl(275, 37%, 50%)",
    DarkPurpleTranslucid: "hsl(275, 37%, 18%, 0.7)",

    DarkSkyBlue: "#78C0E0",

    CarolinaBlueTranslucid: "hsla(202, 61%, 54%, 0.7)",
    CarolinaBlue: "hsla(202, 61%, 54%)",
    CarolinaBlueLighter: "hsla(202, 61%, 60%)",
    CarolinaBlueDarker: "hsla(202, 61%, 40%)",

    GradientLight: "linear-gradient(-45deg,rgb(59, 173, 227) 0%,rgb(87, 111, 230) 25%,rgb(152, 68, 183) 51%,rgb(255, 53, 127) 100%)",
    GradientLightTranslucid: "linear-gradient(to bottom,hsla(0, 0%, 50%, 0%) 0%,hsla(199, 75%, 56%, 20%) 15%,hsla(230, 74%, 62%,40%) 25%,hsla(284, 46%, 49%,60%) 51%,hsla(338, 100%, 60%, 80%) 100%)",
    GradientLightVertical: "linear-gradient(-100deg,rgb(59, 173, 227) 0%,rgb(87, 111, 230) 25%,rgb(152, 68, 183) 51%,rgb(255, 53, 127) 100%)",

    GradientDark: "linear-gradient(-45deg, rgb(35, 1, 91) 0%, rgb(68, 1, 91) 25% , rgb(100, 1, 91) 51%,rgb(122, 2, 54) 100%) ",
    GradientDarkTranslucid: "linear-gradient(to bottom,hsla(0, 0%, 50%, 0%) 0%, hsla(263, 98%, 18%, 20%) 15%, hsla(285, 98%, 18%, 40%) 25% , hsla(305, 98%, 20%,60%) 51%,hsla(334, 97%, 24%, 80%) 100%) ",
    GradientDarkVertical: "linear-gradient(-100deg, rgb(35, 1, 91) 0%, rgb(68, 1, 91) 25% , rgb(100, 1, 91) 51%,rgb(122, 2, 54) 100%) ",

}

export const bodyColors = {
    bodyPageColorLight: colors.Peach,//PeachLighter,
    bodyTextColorLight: colors.DarkPurple,

    bodyPageColorDark: colors.DarkPurple,
    bodyTextColorDark: colors.Peach,//PeachLighter,

    // GRADIENT BACKGROUNDS
    bodyPageGradientLight: colors.GradientLight,
    bodyPageGradientDark: colors.GradientDark,

}

export const NavBarColors = {
    // DARK THEME FOR NAVBAR
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.CarolinaBlue, // ACTION ICONS BACKGROUND COLOR

    backgroundColorDark: colors.GradientDark, // NAVBAR BACKGROUND COLOR
    backgroundColorDarkVertical: colors.GradientDarkVertical, // VERTICAL NAVBAR BACKGROUND COLOR 

    borderColorDark: colors.Peach, // NAVBAR BORDER COLOR

    navDividerColorDark: colors.Peach, // NAVBAR ICON DIVIDER COLOR

    // LIGHT THEME FOR NAVBAR
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.CarolinaBlueLighter, // ACTION ICONS BACKGROUND COLOR

    backgroundColorLight: colors.GradientLight, // NAVBAR BACKGROUND COLOR
    backgroundColorLightVertical: colors.GradientLightVertical, // VERTICAL NAVBAR BACKGROUND COLOR 

    borderColorLight: colors.Peach, // NAVBAR BORDER COLOR

    navDividerColorLight: colors.Peach, // NAVBAR ICON DIVIDER COLOR

}

export const CardContainerColors = {
    // DARK THEME FOR CARD CONTAINER
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.DarkPurple, // ACTION ICONS BACKGROUND COLOR

    backgroundColorDark: colors.GradientDark, // CARD CONTAINER BACKGROUND COLOR
    backgroundColorDarkTranslucid: colors.GradientDarkTranslucid, // CARD CONTAINER BACKGROUND COLOR

    borderColorDark: colors.Peach, // CARD CONTAINER BORDER COLOR

    textColorDark: colors.Peach, // CARD CONTAINER ICON DIVIDER COLOR

    // LIGHT THEME FOR CARD CONTAINER
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.CarolinaBlueLighter, // ACTION ICONS BACKGROUND COLOR

    backgroundColorLight: colors.GradientLight, // CARD CONTAINER BACKGROUND COLOR
    backgroundColorLightTranslucid: colors.GradientLightTranslucid, // CARD CONTAINER BACKGROUND COLOR

    borderColorLight: colors.Peach, // CARD CONTAINER BORDER COLOR

    textColorLight: colors.Peach, // CARD CONTAINER ICON DIVIDER COLOR


}

export const FooterColors = {
    // DARK THEME FOR FOOTER
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.CarolinaBlue, // ACTION ICONS BACKGROUND COLOR

    backgroundColorDark: colors.GradientDark, // FOOTER BACKGROUND COLOR

    borderColorDark: colors.Peach, // FOOTER BORDER COLOR

    footerDividerColorDark: colors.Peach, // FOOTER ICON DIVIDER COLOR

    // LIGHT THEME FOR FOOTER
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.CarolinaBlueLighter, // ACTION ICONS BACKGROUND COLOR

    backgroundColorLight: colors.GradientLight, // FOOTER BACKGROUND COLOR

    borderColorLight: colors.Peach, // FOOTER BORDER COLOR

    footerDividerColorLight: colors.Peach, // FOOTER ICON DIVIDER COLOR

}

export const DrawerColors = {
    // DARK THEME FOR DRAWERS
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.GradientDark, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorDark: colors.Peach, // DRAWER ICONS BORDER COLOR

    drawerBackgroundColorDark: colors.GradientDark, // DRAWER BACKGROUND COLOR
    drawerBorderColorDark: colors.Peach, // DRAWER BORDER COLOR

    drawerHeaderBackgroundColorDark: colors.GradientDark, // DRAWER HEADER BACKGROUND COLOR
    drawerHeaderTextColorDark: colors.Peach, // DRAWER HEADER TEXT COLOR
    drawerHeaderBorderColorDark: colors.Peach, // DRAWER HEADER BORDER COLOR

    // LIGHT THEME FOR DRAWERS
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.GradientLight, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorLight: colors.Peach, // DRAWER ICONS BORDER COLOR

    drawerBackgroundColorLight: colors.GradientLight,//PeachLighter, // DRAWER BACKGROUND COLOR
    drawerBorderColorLight: colors.CarolinaBlueLighter, // DRAWER BORDER COLOR

    drawerHeaderBackgroundColorLight: colors.GradientLight, // DRAWER HEADER BACKGROUND COLOR
    drawerHeaderTextColorLight: colors.Peach, // DRAWER HEADER TEXT COLOR
    drawerHeaderBorderColorLight: colors.Peach, // DRAWER HEADER BORDER COLOR
}

export const SpotlightColors = {
    // DARK THEME FOR SPOTLIGHT 
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.GradientDark, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorDark: colors.Peach, // SPOTLIGHT ICONS BORDER COLOR

    spotlightBackgroundColorDark: colors.GradientDark, // spotlight BACKGROUND COLOR
    spotlightBorderColorDark: colors.Peach, // spotlight BORDER COLOR

    spotlightHeaderBackgroundColorDark: colors.GradientDark, // spotlight HEADER BACKGROUND COLOR
    spotlightHeaderTextColorDark: colors.Peach, // spotlight HEADER TEXT COLOR
    spotlightHeaderBorderColorDark: colors.Peach, // spotlight HEADER BORDER COLOR

    spotlightActionBackgroundColorDark: colors.GradientDark,

    // LIGHT THEME FOR SPOTLIGHT
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.GradientLight, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorLight: colors.Peach, // spotlight ICONS BORDER COLOR

    spotlightBackgroundColorLight: colors.GradientLight,//PeachLighter, // spotlight BACKGROUND COLOR
    spotlightBorderColorLight: colors.CarolinaBlueLighter, // spotlight BORDER COLOR

    spotlightHeaderBackgroundColorLight: colors.GradientLight, // spotlight HEADER BACKGROUND COLOR
    spotlightHeaderTextColorLight: colors.Peach, // spotlight HEADER TEXT COLOR
    spotlightHeaderBorderColorLight: colors.Peach, // spotlight HEADER BORDER COLOR

    spotlightActionBackgroundColorLight: colors.GradientLight
}

export const NavBarCollapseColors = {
    // DARK THEME FOR NAVBAR COLLAPSES
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.CarolinaBlue, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorDark: colors.Peach, // COLLAPSE ICONS BORDER COLOR

    collapseBackgroundColorDark: colors.CarolinaBlueLighter, // COLLAPSE BACKGROUND COLOR
    collapseBorderColorDark: colors.Peach, // COLLAPSE BORDER COLOR

    collapseHeaderBackgroundColorDark: colors.CarolinaBlue, // COLLAPSE HEADER BACKGROUND COLOR
    collapseHeaderTextColorDark: colors.Peach, // COLLAPSE HEADER TEXT COLOR
    collapseHeaderBorderColorDark: colors.Peach, // COLLAPSE HEADER BORDER COLOR

    // LIGHT THEME FOR NAVBAR COLLAPSES
    iconsLineColorLight: colors.DarkPurple, // ICON COLORS
    iconsBackgroundColorLight: colors.CarolinaBlueLighter, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorLight: colors.DarkPurple, // COLLAPSE ICONS BORDER COLOR

    collapseBackgroundColorLight: colors.CarolinaBlueDarker, // COLLAPSE BACKGROUND COLOR
    collapseBorderColorLight: colors.CarolinaBlueLighter, // COLLAPSE BORDER COLOR

    collapseHeaderBackgroundColorLight: colors.CarolinaBlueLighter, // COLLAPSE HEADER BACKGROUND COLOR
    collapseHeaderTextColorLight: colors.DarkPurple, // COLLAPSE HEADER TEXT COLOR
    collapseHeaderBorderColorLight: colors.DarkPurple, // COLLAPSE HEADER BORDER COLOR

}

export const ModalColors = {
    // DARK THEME FOR MODALS
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.GradientDark, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorDark: colors.Peach, // MODAL ICONS BORDER COLOR

    modalBackgroundColorDark: colors.GradientDark, // MODAL BACKGROUND COLOR
    modalBorderColorDark: colors.Peach, // MODAL BORDER COLOR

    modalHeaderBackgroundColorDark: colors.GradientDark, // MODAL HEADER BACKGROUND COLOR
    modalHeaderTextColorDark: colors.Peach, // MODAL HEADER TEXT COLOR
    modalHeaderBorderColorDark: colors.Peach, // MODAL HEADER BORDER COLOR

    // LIGHT THEME FOR MODALS
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.GradientLight, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorLight: colors.Peach, // MODAL ICONS BORDER COLOR

    modalBackgroundColorLight: colors.GradientLight,//PeachLighter, // MODAL BACKGROUND COLOR
    modalBorderColorLight: colors.CarolinaBlueLighter, // MODAL BORDER COLOR

    modalHeaderBackgroundColorLight: colors.GradientLight, // MODAL HEADER BACKGROUND COLOR
    modalHeaderTextColorLight: colors.Peach, // MODAL HEADER TEXT COLOR
    modalHeaderBorderColorLight: colors.Peach, // MODAL HEADER BORDER COLOR

}

export const StepperColors = {
    // DARK THEME FOR stepperS
    iconsLineColorDark: colors.Peach, // ICON COLORS
    iconsBackgroundColorDark: colors.GradientDark, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorDark: colors.Peach, // stepper ICONS BORDER COLOR

    stepperBackgroundColorDark: colors.GradientDark, // stepper BACKGROUND COLOR
    stepperBorderColorDark: colors.Peach, // stepper BORDER COLOR

    stepperHeaderBackgroundColorDark: colors.GradientDark, // stepper HEADER BACKGROUND COLOR
    stepperHeaderTextColorDark: colors.Peach, // stepper HEADER TEXT COLOR
    stepperHeaderBorderColorDark: colors.Peach, // stepper HEADER BORDER COLOR

    // LIGHT THEME FOR stepperS
    iconsLineColorLight: colors.Peach, // ICON COLORS
    iconsBackgroundColorLight: colors.GradientLight, // ACTION ICONS BACKGROUND COLOR
    iconsBorderColorLight: colors.Peach, // stepper ICONS BORDER COLOR

    stepperBackgroundColorLight: colors.GradientLight,//PeachLighter, // stepper BACKGROUND COLOR
    stepperBorderColorLight: colors.CarolinaBlueLighter, // stepper BORDER COLOR

    stepperHeaderBackgroundColorLight: colors.GradientLight, // stepper HEADER BACKGROUND COLOR
    stepperHeaderTextColorLight: colors.Peach, // stepper HEADER TEXT COLOR
    stepperHeaderBorderColorLight: colors.Peach, // stepper HEADER BORDER COLOR

}



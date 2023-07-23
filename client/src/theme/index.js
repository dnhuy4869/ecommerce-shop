import { createTheme } from "@mui/material";
import colors from "./colors";

const theme = () => {
    const themeOption = {
        colors: colors,
        heading: colors.grey900,
        paper: colors.paper,
        backgroundDefault: colors.paper,
        background: colors.primaryLight,
        darkTextPrimary: colors.grey700,
        darkTextSecondary: colors.grey500,
        textDark: colors.grey900,
        menuSelected: colors.secondaryDark,
        menuSelectedBack: colors.secondaryLight,
        divider: colors.grey200,
        borderRadius: 12,
    };

    // const themeOptions = {
    //     direction: 'ltr',
    //     palette: themePalette(themeOption),
    //     mixins: {
    //       toolbar: {
    //         minHeight: '48px',
    //         padding: '16px',
    //         '@media (min-width: 600px)': {
    //           minHeight: '48px'
    //         }
    //       }
    //     },
    //     typography: themeTypography(themeOption)
    //   };

    const theme = createTheme({});

    return theme;
}

export default theme;
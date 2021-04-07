import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
      light: "#556cd62b",
    },
    secondary: {
      main: red.A400,
    },
    error: {
      main: red.A400,
    },
    action: {
      main: "#4baf4b",
    },
    background: {
      default: "#fff",
      dark: "#F4F6F8",
    },
  },
  typography: {
    fontSize: 16,
  },

  overrides: {
    MuiButton: {
      root: {
        fontSize: ["1em", "!important"],
      },
    },
    MuiInputBase: {
      root: {
        fontSize: ["1em", "!important"],
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: ["inherit", "!important"],
      },
    },
    MuiIconButton: {
      root: {
        fontSize: ["1em", "!important"],
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: ["1.5em", "!important"],
      },
    },
    MuiTypography: {
      h2: {
        fontSize: ["1.5em", "!important"],
      },
      h3: {
        fontSize: ["1.375em", "!important"],
      },
      h4: {
        fontSize: ["1.25em", "!important"],
      },
      h5: {
        fontSize: ["1.125em", "!important"],
        fontWeight: "bold",
      },
      h6: {
        fontSize: ["1em", "!important"],
      },
      body1: {
        fontSize: ["0.875em", "!important"],
      },
      body2: {
        fontSize: ["0.75em", "!important"],
      },
    },
    MuiCardHeader: {
      root: {
        padding: ["10px", "!important"],
      },
    },
    MuiCardContent: {
      root: {
        // padding: ["10px", "!important"],
      },
    },
    MuiCardActions: {
      root: {
        padding: ["3px", "!important"],
      },
    },
    // MuiInputBase: {
    //   root: {
    //     fontSize: ["0.8rem", "!important"],
    //   },
    // },
  },
  // spacing: 4,
});

export default theme;

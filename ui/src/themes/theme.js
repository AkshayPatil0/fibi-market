import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
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
  // typography: {
  //   fontSize: "16px",
  // },

  overrides: {
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

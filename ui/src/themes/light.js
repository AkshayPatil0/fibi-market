import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "light",
    // primary: {
    //   main: "#556cd6",
    //   light: "#556cd62b",
    // },
    // secondary: {
    //   main: red.A400,
    // },
    // error: {
    //   main: red.A400,
    // },
    // action: {
    //   main: "#4baf4b",
    // },
    // background: {
    //   default: "#fff",
    //   dark: "#F4F6F8",
    // },
    // text: {
    //   primary: "#fff",
    //   secondary: "#F4F6F8",
    // },
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
      h1: {
        fontSize: ["3em", "!important"],
      },
      h2: {
        fontSize: ["2.5em", "!important"],
      },
      h3: {
        fontSize: ["2em", "!important"],
      },
      h4: {
        fontSize: ["1.5em", "!important"],
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
      button: {
        fontSize: ["1em", "!important"],
      },
    },
    // MuiPaper: {
    //   rounded: {
    //     borderRadius: "1rem",
    //   },
    // },
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

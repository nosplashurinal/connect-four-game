import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 20,
        padding: "16px"
      },
    },
  },
  palette: {
    background: {
      default: "#CED2DC",
    },
    primary: {
      light: "#FFFFFF",
      main: "#4B7BFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
    border: {
      light: "#E2E2E2",
    },
    text: {
      secondary: "#909090",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      fontFamily: "Poppins, sans-serif",
      whiteSpace: "nowrap",
    },
  },
});

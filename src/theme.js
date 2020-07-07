import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff9100",
    },
    primary: {
      main: "#ef6c00",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "linear-gradient(90deg, #ff9100 100%, #ef6c00 0%)",
    },
  },
});

export default theme;

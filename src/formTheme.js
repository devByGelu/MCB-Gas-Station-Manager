import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const formTheme = createMuiTheme({
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
  typography: {
    fontSize: 12,
  },
  overrides: {
    MuiTableCell: {
      root: {
        //This can be referred from Material UI API documentation.
        padding: 5,
      },
    },
    MuiOutlinedInput: {
      input: {
        //This can be referred from Material UI API documentation.
        paddingRight: "7px",
        paddingLeft: "7px",
        paddingTop: "3px",
        paddingBottom: "3px",
      },
    },
  },
});

export default formTheme;

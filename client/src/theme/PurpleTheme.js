import { createTheme } from "@mui/material/styles";
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: "#11cb5f",
    // },
    // background: {
    //   default: purple[900],
    // },
    // mode: "dark",
  },
});

export default theme;

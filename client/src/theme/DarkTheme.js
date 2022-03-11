import { createTheme } from "@mui/material/styles";
import { blueGrey,red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[100],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    background: {
      default: blueGrey[900],
    },
    mode: "dark",
  },
});

export default theme;

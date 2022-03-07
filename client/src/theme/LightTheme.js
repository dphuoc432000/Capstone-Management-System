import { createTheme } from "@mui/material/styles";
import { green, blue } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default lightTheme;

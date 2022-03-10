import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router/Router";
import GlobalDialogSupporter from "./services/GlobalSupporter/GlobalDialogSupporter";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theme/LightTheme";
import darkTheme from "./theme/DarkTheme";
import redTheme from "./theme/RedTheme";
import greenTheme from "./theme/GreenTheme";
import purpleTheme from "./theme/PurpleTheme";
import orangeTheme from "./theme/OrangeTheme";

import { useSelector } from "react-redux";

function App() {
  let theme = useSelector((s) => s.theme);
  const themes = [
    lightTheme,
    darkTheme,
    redTheme,
    greenTheme,
    purpleTheme,
    orangeTheme,
  ];

  const query = (tag) => {
    let array = document.querySelectorAll(tag);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      element.style.color = "white";
    }
  };


  const query2 = (tag,className) => {
    let array = document.querySelectorAll(tag);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      element.classList.add(className);
    }
  };

  const getTheme = () => {
    if (theme === 1) {
      // document.querySelector("body").style.background = "black";
      document.querySelector(".dashboard_right").style.background = "rgba(0, 0, 0, 0.8)";
      query2(".dashboard_right div","dark-bg");
      query2(".dashboard_right .MuiToolbar-root","ldark-bg");
      query2(".dashboard_right tbody","dark-bg");
      query("span");
    }
    return themes[theme];
  };

  useEffect(async () => {
    GlobalDialogSupporter.initGlobalFunction();
  }, []);

  return (
    <ThemeProvider theme={getTheme()}>
      <div className="App">
        <AppRouter></AppRouter>
        <div id="js-global"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;

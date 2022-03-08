import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router/Router";
import GlobalDialogSupporter from "./services/GlobalSupporter/GlobalDialogSupporter";


function App() {
  useEffect(async () => {
    GlobalDialogSupporter.initGlobalFunction();
  }, []);

  return (
    <div  className="App">
      <AppRouter></AppRouter>
      <div id="js-global"></div>
    </div>
  );
}

export default App;

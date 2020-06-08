import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Arwes, ThemeProvider, createTheme } from "arwes";
import image1 from "./images/background.jpg";
import image2 from "./images/glow.png";

const theme = createTheme();

//

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Arwes animate background={image1} pattern={image2}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Arwes>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

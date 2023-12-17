// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* The following line can be included in a src/App.scss */
/* The following line can be included in a src/App.scss */
import "@babel/polyfill";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/css/demo.css";

import { BrowserRouter as Roater } from "react-router-dom";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Roater>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */},
  </Roater>
);

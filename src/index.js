import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./views/App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import "./styles/header.css";
import "./styles/body.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store} >
      <App />
    </Provider>
  </BrowserRouter>
);

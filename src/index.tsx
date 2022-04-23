import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "./theme";

/* import worker from "./mocks"; */

/* if (!process.env.PRODUCTION) { */
/* worker.start(); */
/* } */

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="sotdl-pwa.us.auth0.com"
      clientId="AZbOh8vzyAZEWzr2gIGQmmINRpTaK4Ej"
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <div
              style={{ background: "#303030", color: "#fff", height: "100%" }}
            >
              <App />
              <ReactQueryDevtools />
            </div>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

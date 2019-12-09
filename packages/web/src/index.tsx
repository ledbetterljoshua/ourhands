import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import "./normalize.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo";
import { Routes } from "./routes";
import theme from "./theme";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo";
import { Routes } from "./routes";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingAuthRoute } from "./landing-auth";
import { useAppContext } from "../modules/App/context/appContext";

export const Routes = () => {
  const { Provider } = useAppContext();
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/">
            <LandingAuthRoute />
          </Route>
          <Route>nothing here</Route>
        </Switch>
      </Router>
    </Provider>
  );
};

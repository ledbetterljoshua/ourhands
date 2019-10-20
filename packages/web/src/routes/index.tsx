import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppView } from "../modules/App";
import { LandingAuthRoute } from "./landing-auth";
import { SideBarProvider } from "../modules/App/context/sideNavContext";

export const Routes = () => {
  return (
    <SideBarProvider>
      <Router>
        <Switch>
          <Route path="/">
            <LandingAuthRoute />
          </Route>
        </Switch>
      </Router>
    </SideBarProvider>
  );
};

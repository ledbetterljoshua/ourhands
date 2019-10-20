import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { AuthRoute } from "./auth";
import { LandingAuthRoute } from "./landing-auth";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LandingAuthRoute exact path="/" />
        <Route component={() => <div>404 - not found</div>} />
      </Switch>
    </BrowserRouter>
  );
};

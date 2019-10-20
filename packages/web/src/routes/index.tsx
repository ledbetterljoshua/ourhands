import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { AuthRoute } from "./auth";
import { LandingAuthRoute } from "./landing-auth";
import { Header } from "../components/Header";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <LandingAuthRoute exact path="/" />
        <Route component={() => <div>404 - not found</div>} />
      </Switch>
    </BrowserRouter>
  );
};

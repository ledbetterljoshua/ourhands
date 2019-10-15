import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegisterConnector } from "../modules/Register/registerConnector";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={RegisterConnector} />
      </Switch>
    </BrowserRouter>
  );
};

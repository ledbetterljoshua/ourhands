import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingAuthRoute } from "./landing-auth";
import { useAppContext } from "../modules/App/context/appContext";
import { AboutContent } from "../modules/About";
import { useQuery } from "react-apollo";
import { meQuery } from "@ourhands/controller";
import { Landing } from "../modules/Landing";
import { AppView } from "../modules/App";

export const Routes = () => {
  const { Provider } = useAppContext();
  const { data } = useQuery(meQuery);
  if (!data || data.loading) {
    // loading screen
    return <>loading</>;
  }
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            {!data.me ? <Landing /> : <AppView />}
          </Route>
          <Route path={`/about`}>
            <AboutContent />
          </Route>
          <Route>nothing here</Route>
        </Switch>
      </Router>
    </Provider>
  );
};

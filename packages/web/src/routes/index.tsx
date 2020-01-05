import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAppContext } from "../modules/App/context/appContext";
import { useOnboardingContext } from "../modules/App/context/onboardingContext";
import { AboutContent } from "../modules/About";
import { useQuery } from "react-apollo";
import { meQuery } from "@ourhands/controller";
import { Landing } from "../modules/Landing";
import { AppView } from "../modules/App";
import LinearProgress from "@material-ui/core/LinearProgress";

export const Routes = () => {
  const { Provider } = useAppContext();
  const { Provider: OnboardingProvider } = useOnboardingContext();
  const { data } = useQuery(meQuery);
  // if (!data || data.loading) {
  //   // loading screen
  //   return <>loading</>;
  // }
  return data ? (
    <Provider>
      <OnboardingProvider>
        {data && data.me ? (
          <Router>
            <AppView />
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route exact path={"/"}>
                <Landing />
              </Route>
              <Route path={`/about`}>
                <AboutContent />
              </Route>
              <Route>nothing here</Route>
            </Switch>
          </Router>
        )}
      </OnboardingProvider>
    </Provider>
  ) : (
    <LinearProgress />
  );
};

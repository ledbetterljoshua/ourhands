import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps } from "react-router-dom";
import { meQuery } from "@ourhands/controller";
import { Landing } from "../modules/Landing";
import { AppView } from "../modules/App";

type Props = RouteProps;

interface MeQuery {
  me: {
    email: string;
    domain: {
      name: string;
      id: string;
    };
  } | null;
}

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = () => {
    const { data } = this.props;

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return <Landing />;
    }

    return <AppView />;
  };

  render() {
    return this.renderRoute();
  }
}

export const LandingAuthRoute = graphql<Props, MeQuery>(meQuery)(C);

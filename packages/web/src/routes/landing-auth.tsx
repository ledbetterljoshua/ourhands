import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import gql from "graphql-tag";
import { Landing } from "../modules/Landing";
import { AppView } from "../modules/App";

type Props = RouteProps;

interface MeQuery {
  me: { email: string; domain: string } | null;
}

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data } = this.props;
    console.log("data", data);

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return <Landing {...routeProps} />;
    }

    return <AppView {...routeProps} me={data.me} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
      domain
    }
  }
`;

export const LandingAuthRoute = graphql<Props, MeQuery>(meQuery)(C);

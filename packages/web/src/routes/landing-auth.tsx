import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route } from "react-router-dom";
import gql from "graphql-tag";
import { Landing } from "../modules/Landing";
import { AppView } from "../modules/App";
import { UserContext } from "../modules/App/context/userContext";

type Props = RouteProps;

interface MeQuery {
  me: { email: string; domain: string } | null;
}

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = () => {
    const { data } = this.props;
    console.log("data", data);

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return <Landing />;
    }

    return (
      <UserContext.Provider value={data.me}>
        <AppView />;
      </UserContext.Provider>
    );
  };

  render() {
    return this.renderRoute();
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

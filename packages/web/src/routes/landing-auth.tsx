import * as React from "react";
import { graphql, ChildProps, useQuery } from "react-apollo";
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

export const LandingAuthRoute = () => {
  const { data } = useQuery(meQuery);

  console.log("data.me", data);
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

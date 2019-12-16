import React from "react";
import { LeftMenu } from "../../components/LeftMenu";
import { FeedView } from "./Feed";
import { MeView } from "./Me";
import { Header } from "../../components/Header";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { usePageViews } from "../../hooks/usePageViews";
import posed, { PoseGroup } from "react-pose";
import {
  ContentWrapper,
  Content,
  InnerContent,
  Container
} from "../../components/styles";
import { AboutContent } from "../About";

const RouteContainer = posed.div({
  render: { scale: 1, opacity: 1, beforeChildren: true, delay: 300 },
  hidden: { scale: 0.98, opacity: 0 }
});

export const AppView = () => {
  usePageViews();
  const location = useLocation();
  const match = useRouteMatch();
  console.log("match.url", match!.url);
  return (
    <>
      <Header />
      <Container>
        <ContentWrapper>
          <LeftMenu />
          <Content elevation={0}>
            <InnerContent>
              <PoseGroup>
                <RouteContainer
                  initialPose="hidden"
                  pose="render"
                  key={location.pathname}
                >
                  <Switch>
                    <Route exact path={`${match!.url}`}>
                      <FeedView />
                    </Route>
                    <Route path={`${match!.url}me`}>
                      <MeView />
                    </Route>
                    <Route path={`/about`}>
                      <AboutContent />
                    </Route>
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            </InnerContent>
          </Content>
        </ContentWrapper>
      </Container>
    </>
  );
};

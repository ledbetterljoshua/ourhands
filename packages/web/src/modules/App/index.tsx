import React, { useState } from "react";
import styled from "@emotion/styled";
import { LeftMenu } from "../../components/LeftMenu";
import { FeedView } from "./Feed";
import { MeView } from "./Me";
import { CreateView } from "./Create";
import { Header } from "../../components/Header";
import { Route, Switch, useLocation } from "react-router-dom";
import { usePageViews } from "../../hooks/usePageViews";
import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
  render: { scale: 1, opacity: 1, beforeChildren: true, delay: 300 },
  hidden: { scale: 0.98, opacity: 0 }
});

export const AppView = () => {
  const [createActive] = useState(false);
  usePageViews();
  const location = useLocation();
  return (
    <>
      <Header />
      <Container>
        <ContentWrapper>
          <LeftMenu />
          <Content>
            <InnerContent>
              <PoseGroup>
                <RouteContainer
                  initialPose="hidden"
                  pose="render"
                  key={location.pathname}
                >
                  {createActive && <CreateView />}
                  <Switch>
                    <Route exact path="/">
                      <FeedView />
                    </Route>
                    <Route path={`/me`}>
                      <MeView />
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

const Container = styled.div`
  background-color: #fafafa;
  animation-name: effect-fade-in;
  animation-duration: 120ms;
  display: flex;
  justify-content: center;
  min-height: calc(100vh);
  margin-left: calc(100vw - 100%);
  margin-right: 0;
`;
const ContentWrapper = styled.div`
  width: 922px;
  @media (max-width: 930px) {
    width: 100%;
  }
`;

const InnerContent = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
  vertical-align: top;
  padding-left: 39px;
  padding-right: 9px;
  padding-top: 90px;
  padding-bottom: 84px;
  @media (max-width: 930px) {
    padding-left: 9px;
  }
`;
const Content = styled.div`
  margin-left: 0;
  width: auto !important;
  padding: 0;
  z-index: 100;
  width: 600px;
  min-height: 380px;
  background-color: #fff;
  margin-left: 266px;
  border-right: 1px solid #f1f1f1;
  min-height: calc(100vh);
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
  @media (max-width: 930px) {
    width: 100%;
    margin-left: 0;
  }
`;

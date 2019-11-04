import React, { useState } from "react";
import { Header } from "../../components/Header";
import { useLocation } from "react-router-dom";
import { usePageViews } from "../../hooks/usePageViews";
import posed, { PoseGroup } from "react-pose";
import {
  Container,
  ContentWrapper,
  Content,
  InnerContent
} from "../../components/styles";
import { AboutContent } from "../About";

const RouteContainer = posed.div({
  render: { scale: 1, opacity: 1, beforeChildren: true, delay: 300 },
  hidden: { scale: 0.98, opacity: 0 }
});

export const Landing = () => {
  usePageViews();
  const location = useLocation();
  return (
    <>
      <Header />
      <Container>
        <ContentWrapper>
          {/* <LeftMenu /> */}
          <Content>
            <InnerContent>
              <PoseGroup>
                <RouteContainer
                  initialPose="hidden"
                  pose="render"
                  key={location.pathname}
                >
                  <AboutContent />
                </RouteContainer>
              </PoseGroup>
            </InnerContent>
          </Content>
        </ContentWrapper>
      </Container>
    </>
  );
};

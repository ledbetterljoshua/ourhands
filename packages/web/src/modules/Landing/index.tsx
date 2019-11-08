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
import styled from "@emotion/styled";

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
      <Container style={{ backgroundColor: "#fff" }}>
        <ContentWrapper style={{ maxWidth: "740px" }}>
          <ContentClear>
            <InnerContent>
              <PoseGroup>
                <RouteContainer
                  initialPose="hidden"
                  pose="render"
                  key={location.pathname}
                >
                  <AboutContent />
                  {/* landing */}
                </RouteContainer>
              </PoseGroup>
            </InnerContent>
          </ContentClear>
        </ContentWrapper>
      </Container>
    </>
  );
};

const ContentClear = styled(Content)`
  margin-left: auto;
  border: none;
`;

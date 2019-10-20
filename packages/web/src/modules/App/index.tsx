import React, { useState } from "react";
import styled from "@emotion/styled";
import { LeftMenu } from "../../components/LeftMenu";
import { FeedView } from "./Feed";
import { MeView } from "./Me";
import { CreateView } from "./Create";
import { Header } from "../../components/Header";

export const views = {
  ME: "me",
  FEED: "feed",
  SETTINGS: "settings",
  NEW_POST: "new-post"
};

export const AppView = (props: any) => {
  const [view, setView] = useState(views.FEED);
  const ContentSwicth = (view: string) => {
    switch (view) {
      case views.FEED:
        return <FeedView />;
      case views.ME:
        return <MeView />;
      case views.NEW_POST:
        return <CreateView setView={setView} />;
      default:
        return <div>nothing here</div>;
    }
  };
  return (
    <>
      <Header view={view} setView={setView} />
      <Container>
        <ContentWrapper>
          <LeftMenu setView={setView} current={view} domain={props.me.domain} />
          <Content>
            <InnerContent>{ContentSwicth(view)}</InnerContent>
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
  padding-top: 80px;
  padding-bottom: 84px;
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
`;
const SideBar = styled.div``;

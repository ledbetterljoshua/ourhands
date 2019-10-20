import React from "react";
import styled from "@emotion/styled";
import { views } from "../../modules/App/index";
import { Icon } from "../Icon";
import { Text } from "../Text";

export const LeftMenu = ({ setView, current }: any) => {
  const renderItem = (
    view: string,
    icon: string,
    name: string,
    current: string
  ) => {
    const isCurrent = current === view;
    return (
      <Item onClick={() => setView(view)}>
        <IconWrapper>
          <Icon color={isCurrent ? "dark" : "body"} name={icon} />
        </IconWrapper>
        <InnerItem>
          <Text
            color={isCurrent ? "dark" : "body"}
            weight={isCurrent ? "bold" : "regular"}
          >
            {name}
          </Text>
        </InnerItem>
      </Item>
    );
  };
  return (
    <Container>
      {renderItem(views.FEED, "home", "@company", current)}
      {renderItem(views.ME, "user", "My Questions", current)}
    </Container>
  );
};

export const IconWrapper = styled.span``;
export const InnerItem = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: top;
  min-height: 24px;
  line-height: 24px;
`;
export const Item = styled.div`
  min-height: 24px;
  font-size: 14px;
  color: #333;
  list-style: none;
  cursor: pointer;
  padding: 5px 16px 5px 5px;
  transition: color 0.1s ease-in, background-color 0.1s ease-in;
  line-height: 1.25;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 3px;
  align-items: center;
`;
export const Container = styled.div`
  user-select: none !important;
  width: 266px;
  height: calc(100vh - 50px);
  padding-top: 74px;
  padding-left: 32px;
  margin-left: -32px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  border-right: 1px solid #f1f1f1;
`;

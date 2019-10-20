import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "react-apollo";
import { logoutMutation } from "@ourhands/controller";
import { UserContext } from "../../modules/App/context/userContext";
import {
  useSideBarState,
  useSideBarDispatch
} from "../../modules/App/context/sideNavContext";

export const LeftMenu = () => {
  const { pathname } = useLocation();
  const { open } = useSideBarState();
  const me = useContext(UserContext);
  const [logout] = useMutation(logoutMutation);
  const onLogout = async () => {
    const { data } = await logout();
    if (data.logout) {
      window.location.reload();
    }
  };
  const renderItem = (view: string, icon: string, name: string) => {
    const isCurrent = pathname === view;

    return (
      <Link to={view}>
        <Item>
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
      </Link>
    );
  };
  console.log("open", open);
  return (
    <Container className={open ? "active" : ""}>
      <div>
        {renderItem("/", "home", `@${me.domain}`)}
        {renderItem("/me", "user", "My Questions")}
      </div>
      <div>
        <Text type="button-text" onClick={onLogout}>
          logout
        </Text>
      </div>
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
  height: calc(100vh - 100px);
  padding-top: 74px;
  padding-left: 32px;
  margin-left: -32px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  border-right: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fafafa;
  @media (max-width: 930px) {
    transition: transform 0.2s ease-in-out;
    z-index: 300;
    width: 100%;
    transform: translateX(-1000px);
    margin-left: 0rem;
    &.active {
      transform: translateX(0px);
    }
  }
`;

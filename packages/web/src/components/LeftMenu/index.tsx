import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "react-apollo";
import { logoutMutation } from "@ourhands/controller";
import { UserContext } from "../../modules/App/context/userContext";
import { useAppContext } from "../../modules/App/context/appContext";
import posed from "react-pose";

const Wrapper = posed.div({
  open: {
    delayChildren: 200,
    staggerChildren: 50
  },
  initialPose: "closed"
});

const Child = posed.div({
  open: { x: 0, opacity: 1 },
  closed: { x: 20, opacity: 0 }
});

export const LeftMenu = () => {
  // const [isOpen, toggleOpen] = useState(false)
  const { useState } = useAppContext();
  const { pathname } = useLocation();
  const {
    sideNav: { open }
  } = useState();
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
      <Child>
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
      </Child>
    );
  };
  return (
    <Wrapper pose="open">
      <Container className={open ? "active" : ""}>
        <div>
          {renderItem("/", "home", `@${me.domain}`)}
          {renderItem("/me", "user", "My Questions")}
        </div>
        <Footer>
          <Text type="button-text" onClick={onLogout}>
            logout
          </Text>
        </Footer>
      </Container>
    </Wrapper>
  );
};

export const IconWrapper = styled.span``;
export const Footer = styled.div`
  padding-bottom: 4rem;
`;
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
  height: calc(100vh - 74px);
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

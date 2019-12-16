import React from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useMutation } from "react-apollo";
import { logoutMutation, meQuery } from "@ourhands/controller";
import { useAppContext } from "../../modules/App/context/appContext";
import posed from "react-pose";
import { client } from "../../apollo";
import Fab from "@material-ui/core/Fab";

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
  const {
    me: { domain }
  }: any = client.readQuery({
    query: meQuery
  });

  const { useState } = useAppContext();
  const { pathname } = useLocation();
  const {
    sideNav: { open }
  } = useState();

  const [logout] = useMutation(logoutMutation);
  const onLogout = async () => {
    const { data } = await logout();
    if (data.logout) {
      window.location.reload();
    }
  };
  const { useDispatch } = useAppContext();
  const dispatch = useDispatch();
  const history = useHistory();

  const onCreate = () => {
    dispatch({ type: "showCreate" });
    //if not on root, then push /
    if (history.location.pathname !== "/") {
      history.push("/");
    }
    window.scrollTo(0, 0);
  };

  const renderItem = (view: string, icon: string, name: string) => {
    const isCurrent = pathname === view;

    return (
      <Child>
        <Link to={view}>
          <Item isCurrent={isCurrent}>
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
          <FabWrap>
            <Fab
              style={{ background: "#fff", width: "90%" }}
              variant="extended"
              onClick={onCreate}
            >
              Say Something
            </Fab>
          </FabWrap>
          {domain ? renderItem("/", "home", `@${domain.name}`) : null}
          {renderItem("/me", "user", "My Questions")}
          {renderItem("/rooms", "room", "Rooms")}
        </div>
        <Footer>
          <Text color="light" margin="right" type="body" onClick={onLogout}>
            logout
          </Text>
          <Link to="/support">
            <Text color="light">Support</Text>
          </Link>
        </Footer>
      </Container>
    </Wrapper>
  );
};

export const FabWrap = styled.div`
  margin-bottom: 40px;
`;
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
export const Item = styled.div<any>`
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
  border-radius: 2px;
  align-items: center;
  background-color: ${props => (props.isCurrent ? "#f5f6f7" : "")};
  border: ${props => (props.isCurrent ? "1px solid #f5f6f7" : "")};
`;
export const Container = styled.div`
  user-select: none !important;
  width: 266px;
  height: calc(100vh - 104px);
  padding-top: 104px;
  padding-left: 32px;
  margin-left: -32px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
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

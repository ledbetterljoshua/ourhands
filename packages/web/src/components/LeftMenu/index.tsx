import React from "react";
import styled from "@emotion/styled";
import Home from "@material-ui/icons/Home";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import Person from "@material-ui/icons/Person";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import MeetingRoomOutlined from "@material-ui/icons/MeetingRoomOutlined";
import Close from "@material-ui/icons/Close";
import { Text } from "../Text";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useMutation } from "react-apollo";
import { logoutMutation, meQuery } from "@ourhands/controller";
import { useAppContext } from "../../modules/App/context/appContext";
import posed from "react-pose";
import { client } from "../../apollo";
import Fab from "@material-ui/core/Fab";
import { Dot } from "../styles";
import { Box, IconButton, Hidden } from "@material-ui/core";

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

  const hideNav = () => {
    dispatch({ type: "hideSideNav" });
  };

  const renderItem = (
    view: string,
    Icon: any,
    IconActive: any,
    name: string
  ) => {
    const isCurrent = pathname === view;

    return (
      <Child>
        <Link to={view}>
          <Item isCurrent={isCurrent}>
            <IconWrapper>
              {isCurrent ? (
                <IconActive fontSize="large" />
              ) : (
                <Icon fontSize="large" />
              )}
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
        <Hidden smUp>
          <Box style={{ position: "fixed", top: 20, right: 20 }}>
            <IconButton onClick={hideNav}>
              <Close fontSize="large" />
            </IconButton>
          </Box>
        </Hidden>
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
          {domain
            ? renderItem("/", HomeOutlined, Home, `@${domain.name}`)
            : null}
          {renderItem("/me", PersonOutlined, Person, "My Questions")}
          {/* {renderItem("/rooms", MeetingRoomOutlined, MeetingRoom, "Rooms")} */}
        </div>
        <Footer>
          <Text color="light" margin="right" type="body" onClick={onLogout}>
            logout
          </Text>
          <Dot style={{ marginRight: "1rem" }} />
          <Link to="/support">
            <Text margin="right" color="light">
              Support Us
            </Text>
          </Link>
          <Dot style={{ marginRight: "1rem" }} />
          <Link to="/help">
            <Text color="light">Help</Text>
          </Link>
        </Footer>
      </Container>
    </Wrapper>
  );
};

export const FabWrap = styled.div`
  margin-bottom: 40px;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const IconWrapper = styled.span`
  margin-right: 10px;
`;
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: #fff;
  @media (max-width: 600px) {
    transition: transform 0.2s ease-in-out;
    z-index: 300;
    width: 100%;
    transform: translateX(-1000px);
    margin-left: 0rem;
    padding-left: 0rem;
    &.active {
      transform: translateX(0px);
    }
  }
`;

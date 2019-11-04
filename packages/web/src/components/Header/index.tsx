import React, { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useAppContext } from "../../modules/App/context/appContext";
import { client } from "../../apollo";
import { Register } from "./register";
import { meQuery } from "@ourhands/controller";

export const Header = (props: any) => {
  const { me }: any = client.readQuery({
    query: meQuery
  });
  const [showRegister, setShowRegister] = useState(false);
  const history = useHistory();
  const { useDispatch } = useAppContext();
  const dispatch = useDispatch();

  const toggleOpen = () => {
    return dispatch({ type: "toggleSideNav" });
  };

  const onCreate = () => {
    dispatch({ type: "showCreate" });
    //if not on root, then push /
    if (history.location.pathname !== "/") {
      history.push("/");
    }
    window.scrollTo(0, 0);
  };

  return (
    <Container isTall={!Boolean(me)}>
      <Inner justify="space-between">
        <Link to="/">
          <Icon size={11} name="logo" />
        </Link>
        <Flex>
          {me ? (
            <Button type="primary" onClick={onCreate}>
              Ask a question
            </Button>
          ) : showRegister ? (
            <Register />
          ) : (
            <Button type="primary" onClick={() => setShowRegister(true)}>
              Get Started
            </Button>
          )}
          <Action onClick={toggleOpen}>
            <Icon size={2.7} name="menu" />
          </Action>
        </Flex>
      </Inner>
    </Container>
  );
};

const Inner = styled(Flex)`
  height: 100%;
  width: 922px;
  padding-left: 13px;
  @media (max-width: 930px) {
    width: 100%;
  }
`;
const Action = styled.div`
  display: block;
  margin-left: 1rem;
  @media (min-width: 930px) {
    display: none;
  }
`;
const Container = styled.div<any>`
  box-sizing: border-box;
  height: ${props => (props.isTall ? "64" : "44")}px;
  background-color: #fff
  top: 0;
  position: fixed;
  z-index: 300;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #fff;
  transition: height 200ms ease-in;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
`;

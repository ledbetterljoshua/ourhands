import React, { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useAppContext } from "../../modules/App/context/appContext";
import { client } from "../../apollo";
import { RegisterComponent as Register } from "./register";
import { meQuery } from "@ourhands/controller";
import Box from "@material-ui/core/Box";

export const Header = (props: any) => {
  const { hasShadow = true, position = "fixed" } = props;
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
    <Container position={position} hasShadow={hasShadow} isTall={!Boolean(me)}>
      <Inner isTall={!Boolean(me)} justify="space-between">
        <Link to="/">
          <Icon size={11} name="logo" />
        </Link>
        <Flex>
          {me ? (
            <Button variant="contained" color="primary" onClick={onCreate}>
              Ask a question
            </Button>
          ) : (
            <Register />
          )}
          {me ? (
            <Action onClick={toggleOpen}>
              <Icon size={2.7} name="menu" />
            </Action>
          ) : null}
        </Flex>
      </Inner>
    </Container>
  );
};

const Inner = styled(Flex)`
  height: 100%;
  width: ${props => (props.isTall ? "1224px" : "922px")};
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
  top: 0;
  box-sizing: border-box;
  height: ${props => (props.isTall ? "64" : "44")}px;
  background-color: #fff;
  position: ${props => props.position};
  z-index: 300;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #fff;
  transition: height 200ms ease-in;
  box-shadow: ${props =>
    props.hasShadow ? "0px 4px 12px rgba(0, 0, 0, 0.05)" : "initial"};
`;

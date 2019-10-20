import React, { useContext } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import {
  useSideBarDispatch,
  useSideBarState
} from "../../modules/App/context/sideNavContext";

export const Header = (props: any) => {
  const history = useHistory();
  const dispatch = useSideBarDispatch();
  const { open } = useSideBarState();

  const toggleOpen = () => {
    if (open) {
      return dispatch({ type: "hide" });
    }
    return dispatch({ type: "show" });
  };

  return (
    <Container>
      <Inner justify="space-between">
        <Link to="/">
          <Icon size={11} name="logo" />
        </Link>
        <Flex>
          <Button type="primary" onClick={() => history.push("/create")}>
            Ask a question
          </Button>
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
const Container = styled.div`
  box-sizing: border-box;
  height: 44px;
  background-color: #fff;
  top: 0;
  position: fixed;
  z-index: 400;
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

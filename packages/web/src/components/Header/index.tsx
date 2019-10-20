import React from "react";
import styled from "@emotion/styled";
import { logoutMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import { Flex } from "../styles";
import { views } from "../../modules/App";

export const Header = (props: any) => {
  const [logout] = useMutation(logoutMutation);
  const onLogout = async () => {
    const { data } = await logout();
    console.log("res", data);
    if (data.logout) {
      window.location.reload();
    }
  };
  return (
    <Container>
      <Inner justify="space-between">
        <button onClick={onLogout}>logout</button>
        <button onClick={() => props.setView(views.NEW_POST)}>create</button>
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

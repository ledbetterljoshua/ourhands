import React, { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { useAppContext } from "../../modules/App/context/appContext";
import { client } from "../../apollo";
import { meQuery } from "@ourhands/controller";
import { Tools } from "./tools";

export const AuthenticatedHeader = (props: any) => {
  const { me }: any = client.readQuery({
    query: meQuery
  });
  const history = useHistory();
  const { useDispatch } = useAppContext();
  const dispatch = useDispatch();

  const toggleOpen = () => {
    return dispatch({ type: "toggleSideNav" });
  };

  const isHome = history.location.pathname === "/";

  return (
    <Container justify="flex-start">
      <Thing>
        <Link to="/">
          <Icon size={11} name="logo" />
        </Link>
      </Thing>
      {isHome ? <Tools /> : null}
      <Flex>
        <Action onClick={toggleOpen}>
          <Icon size={2.7} name="menu" />
        </Action>
      </Flex>
    </Container>
  );
};

const Thing = styled(Flex)`
  position: absolute;
`;
const Container = styled(Flex)`
  height: 100%;
  width: 922px;
  min-height: 36px;
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

import React from "react";
import styled from "@emotion/styled";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { RegisterComponent as Register } from "./register";

export const UnathenticatedHeader = (props: any) => {
  return (
    <Container justify="space-between">
      <Link to="/">
        <Icon size={11} name="logo" />
      </Link>
      <Flex>
        <Register />
      </Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  height: 100%;
  width: ${props => (props.isTall ? "1224px" : "922px")};
  padding: 10px 0;
  padding-left: 13px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

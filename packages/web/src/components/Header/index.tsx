import React from "react";
import styled from "@emotion/styled";
import { client } from "../../apollo";
import { meQuery } from "@ourhands/controller";
import { AuthenticatedHeader } from "./authenticated";
import { UnathenticatedHeader } from "./unauthenticated";

export const Header = (props: any) => {
  const { hasShadow = true, position = "fixed" } = props;
  const { me }: any = client.readQuery({
    query: meQuery
  });

  return (
    <Container position={position} hasShadow={hasShadow}>
      {me ? <AuthenticatedHeader {...props} /> : <UnathenticatedHeader />}
    </Container>
  );
};

const Container = styled.div<any>`
  top: 0;
  box-sizing: border-box;
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
  padding: 10px 0;
  box-shadow: ${props =>
    props.hasShadow ? "0px 4px 12px rgba(0, 0, 0, 0.05)" : "initial"};
`;

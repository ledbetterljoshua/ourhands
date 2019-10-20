import React from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Flex } from "../styles";

interface Props {
  active: Boolean;
  icon: string;
  text: string;
  onAction: any;
}

export const Action = ({ active, icon, text, onAction }: Props) => {
  return (
    <Container onClick={onAction}>
      <Icon color={active ? "active" : "body"} name={icon} />
      <Text color={active ? "active" : "body"}>{text}</Text>
    </Container>
  );
};

const Container = styled(Flex)`
  cursor: pointer;
  margin-right: 1.8rem;
  padding: 10px 20px;
  margin-left: -20px;
  background: #fff;
  transition: background 120ms ease-in-out;
  border-radius: 4px;
  &:hover {
    background: #f1f1f1;
    .injected-svg {
      transform: rotate(-10deg);
    }
  }
`;

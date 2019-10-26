import React from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Flex } from "../styles";
import posed from "react-pose";

interface Props {
  active: Boolean;
  icon: string;
  text: string;
  onAction: any;
}

const Popout = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.95, transition: { type: "spring" } }
});

export const Action = ({ active, icon, text, onAction }: Props) => {
  return (
    <Popout>
      <Container onClick={onAction}>
        <Icon color={active ? "active" : "body"} name={icon} />
        <Text color={active ? "active" : "body"}>{text}</Text>
      </Container>
    </Popout>
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

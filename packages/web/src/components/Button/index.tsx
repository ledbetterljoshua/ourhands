import styled from "@emotion/styled";
import React from "react";
import { Text } from "../Text";
import { colors } from "../Text/getTypography";

type buttonType = "primary" | "default";

interface Props {
  children: string;
  onClick: any;
  type?: buttonType;
}

export const Button = ({ children, onClick, type = "default" }: Props) => {
  return (
    <Component type={type} onClick={onClick}>
      <Text color={type === "primary" ? "white" : "dark"}>{children}</Text>
    </Component>
  );
};

const Component = styled.a`
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  height: 3.6rem;
  line-height: 3.6rem;
  padding: 0 2.4rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: ${props =>
    props.type === "primary" ? colors.active : colors.white};
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

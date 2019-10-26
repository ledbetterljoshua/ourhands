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
  ${props =>
    props.type === "primary"
      ? `
    background: ${colors.active};
    `
      : `
      background: #efefef;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  `}
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  height: 3.4rem;
  line-height: 3.4rem;
  padding: 0 2.4rem;
  border-radius: 4px;
  text-transform: capitalize;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    ${props =>
      props.type === "primary"
        ? `
        box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
        box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        `
        : `
        background: #e0e0e0;
    `}
  }
`;

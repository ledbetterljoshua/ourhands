import styled from "@emotion/styled";
import React from "react";
import { Text } from "../Text";
import { colors } from "../Text/getTypography";

type buttonType = "primary" | "text" | "default";

interface Props {
  children: string;
  onClick: any;
  type?: buttonType;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type = "default",
  disabled = false
}: Props) => {
  return (
    <Component
      disabled={disabled}
      type={type}
      onClick={!disabled ? onClick : undefined}
    >
      <Text color={type === "primary" ? "white" : "dark"}>{children}</Text>
    </Component>
  );
};

const primaryStyles = (props: any) => `
  background: ${colors.active};
  box-shadow: none;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;
const textStyles = (props: any) => `
  background: transparent;
  box-shadow: none;
  &:hover {
    transform: translateY(0px);
    box-shadow: none;
  }
`;
const disabledStyles = (props: any) => `
  background: ${props.type === "text" ? "transparent" : "#e0e0e0"};
  box-shadow: none;
  cursor: default;
  &:hover {
    transform: translateY(0px);
    box-shadow: none;
  }
`;

const Component = styled.a<any>`
  ${props => `
    background: #efefef;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
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
    ${props.type === "primary" ? primaryStyles(props) : ""}
    ${props.type === "text" ? textStyles(props) : ""}
    ${props.disabled ? disabledStyles(props) : ""}
  `}
`;

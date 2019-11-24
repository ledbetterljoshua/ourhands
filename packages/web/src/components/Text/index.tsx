import {
  textType,
  getTypography,
  colorType,
  weightType
} from "./getTypography";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface Props {
  children: string | ReactNode;
  color?: colorType;
  type?: textType;
  weight?: weightType;
  onClick?: any;
  margin?: "left" | "right";
  display?: "inline" | "block";
  align?: "center" | "left" | "right";
}

export const Text = ({
  children,
  display = "inline",
  color = "body",
  type = "body",
  weight = "regular",
  align = "left",
  margin,
  onClick
}: Props) => {
  return (
    <Component
      onClick={onClick}
      pointer={typeof onClick === "function"}
      display={display}
      type={type}
      color={color}
      weight={weight}
      margin={margin}
      align={align}
    >
      {children}
    </Component>
  );
};

const Component: any = styled.div`
  display: ${(props: any) => props.display};
  text-align: ${(props: any) => props.align};
  cursor: ${(props: any) => (props.pointer ? "pointer" : "inherit")};
  ${(props: any) =>
    getTypography(props.theme, props.type, props.color, props.weight)};
  margin${(props: any) => (props.margin ? `-${props.margin}: 1rem` : ": 0px")};
`;

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
}

export const Text = ({
  children,
  color = "body",
  type = "body",
  weight = "regular",
  margin,
  onClick
}: Props) => {
  return (
    <Component
      onClick={onClick}
      pointer={typeof onClick === "function"}
      type={type}
      color={color}
      weight={weight}
      margin={margin}
    >
      {children}
    </Component>
  );
};

const Component: any = styled.div`
  display: inline;
  cursor: ${(props: any) => (props.pointer ? "pointer" : "inherit")};
  ${(props: any) => getTypography(props.type, props.color, props.weight)};
  margin${(props: any) => (props.margin ? `-${props.margin}: 1rem` : ": 0px")};
`;

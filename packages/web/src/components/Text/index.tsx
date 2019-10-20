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
}

export const Text = ({
  children,
  color = "body",
  type = "body",
  weight = "regular",
  onClick
}: Props) => {
  return (
    <Component
      onClick={onClick}
      pointer={typeof onClick === "function"}
      type={type}
      color={color}
      weight={weight}
    >
      {children}
    </Component>
  );
};

const Component: any = styled.div`
  display: inline;
  cursor: ${(props: any) => (props.pointer ? "pointer" : "inherit")};
  ${(props: any) => getTypography(props.type, props.color, props.weight)};
`;

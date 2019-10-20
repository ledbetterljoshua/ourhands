import {
  textType,
  getTypography,
  colorType,
  weightType
} from "./getTypography";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  children: string;
  color?: colorType;
  type?: textType;
  weight?: weightType;
}

export const Text = ({
  children,
  color = "body",
  type = "body",
  weight = "regular"
}: Props) => {
  return (
    <Component type={type} color={color} weight={weight}>
      {children}
    </Component>
  );
};

const Component: any = styled.div`
  ${(props: any) => getTypography(props.type, props.color, props.weight)}
`;

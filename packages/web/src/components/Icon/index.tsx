import React from "react";
import ReactSVG from "react-svg";
import styled from "@emotion/styled";
import { colorType, colors } from "../Text/getTypography";

export const Icon = ({
  name,
  size = 1.6,
  color = "body"
}: {
  name: string;
  size?: number;
  color?: colorType;
}) => {
  return (
    <Wrapper size={size} color={color}>
      <ReactSVG src={`icons/${name}.svg`} />
    </Wrapper>
  );
};

const Wrapper: any = styled.span`
  > div > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .injected-svg {
    color: ${(props: any) => colors[props.color as colorType]};
    width: ${(props: any) => props.size}rem;
    position: relative;
    margin-right: 5px;
  }
`;

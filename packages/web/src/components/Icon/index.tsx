import React from "react";
import ReactSVG from "react-svg";
import styled from "@emotion/styled";
import { colorType, colors } from "../Text/getTypography";
import posed from "react-pose";

const Enter = posed.div({
  render: { opacity: 1 },
  hidden: { opacity: 0 }
});

export const Icon = ({
  name,
  size = 1.6,
  color = "body",
  margin = "right"
}: {
  name: string;
  size?: number;
  color?: colorType;
  margin?: string;
}) => {
  return (
    <Enter initialPose="hidden" pose="render">
      <Wrapper margin={margin} size={size} color={color}>
        <ReactSVG src={`icons/${name}.svg`} />
      </Wrapper>
    </Enter>
  );
};

const Wrapper: any = styled.span`
  > div > div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${(props: any) => props.size + 0.5}rem;
  }
  .injected-svg {
    color: ${(props: any) => colors[props.color as colorType]};
    width: ${(props: any) => props.size}rem;
    position: relative;
    margin-${(props: any) => props.margin}: 5px;
  }
`;

import styled from "@emotion/styled";

export const Flex: any = styled.div`
  display: flex;
  margin-right: 5px;
  flex-direction: ${(props: any) => props.direction || "row"};
  align-items: ${(props: any) => props.align || "center"};
  justify-content: ${(props: any) => props.justify || "start"};
`;

export const Hr = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #e4e4e4;
  margin: 0.6rem 0;
  padding: 0;
`;

export const TextArea = styled.textarea<any>`
  width: 100%;
  display: block;
  resize: none;
  overflow: hidden;
  height: ${(props: any) => (props.lines || 1) * 17}px;
  &:focus {
    outline: none;
  }
`;

export const PullLeft = styled.div`
  margin-left: -2.6rem;
`;

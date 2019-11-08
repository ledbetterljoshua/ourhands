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
  @media (max-width: 930px) {
    margin-left: 0rem;
  }
`;

export const Container = styled.div`
  background-color: #eaebee;
  animation-name: effect-fade-in;
  animation-duration: 120ms;
  display: flex;
  justify-content: center;
  min-height: calc(100vh);
  margin-left: calc(100vw - 100%);
  margin-right: 0;
`;
export const ContentWrapper = styled.div`
  width: 922px;
  @media (max-width: 930px) {
    width: 100%;
  }
`;

export const InnerContent = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
  vertical-align: top;
  padding-left: 39px;
  padding-right: 9px;
  padding-top: 90px;
  padding-bottom: 84px;
  @media (max-width: 930px) {
    padding-left: 9px;
  }
`;
export const Content = styled.div`
  width: auto !important;
  padding: 0;
  z-index: 100;
  width: 600px;
  min-height: 380px;
  background-color: #fff;
  margin-left: 266px;
  border-right: 1px solid #dcdcdc;
  min-height: calc(100vh);
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
  @media (max-width: 930px) {
    width: 100%;
    margin-left: 0;
  }
`;

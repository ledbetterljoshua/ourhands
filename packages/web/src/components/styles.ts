import styled from "@emotion/styled";
import Paper from "@material-ui/core/Paper";

export const Backdrop = styled.div`
  opacity: 0.6;
  background: #000;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

export const Flex: any = styled.div`
  display: flex;
  margin-right: 5px;
  flex-direction: ${(props: any) => props.direction || "row"};
  align-items: ${(props: any) => props.align || "center"};
  justify-content: ${(props: any) => props.justify || "start"};
`;
export const Bit: any = styled(Flex)`
  margin-left: 10px;
  padding: 0.8rem 2.2rem;
  border-radius: 500px;
  background: #f3f3f3;
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

export const Container = styled.div`
  background-color: #fff;
  animation-name: effect-fade-in;
  animation-duration: 120ms;
  display: flex;
  justify-content: center;
  min-height: calc(100vh);
  margin-left: calc(100vw - 100%);
`;
export const LandingWrap = styled(Container)`
  max-width: 816px;
  margin: 0 auto;
  margin-top: 64px;
`;
export const Image = styled.img`
  width: 100%;
  display: block;
  width: 100%;
  @media (min-width: 930px) {
    max-width: 900px;
    margin: 0 auto;
  }
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
  padding-left: 9px;
  padding-right: 9px;
  padding-top: 104px;
  padding-bottom: 84px;
  @media (max-width: 930px) {
    padding-left: 9px;
  }
`;
export const Content = styled(Paper)`
  width: auto !important;
  padding: 0;
  z-index: 100;
  width: 600px;
  min-height: 380px;
  background-color: #fff;
  margin-left: 296px;
  min-height: calc(100vh);
  @media (max-width: 930px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Br = styled.br``;

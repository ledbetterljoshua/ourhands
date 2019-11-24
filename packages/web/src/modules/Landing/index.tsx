import React, { useRef } from "react";
import { Header } from "../../components/Header";
import { usePageViews } from "../../hooks/usePageViews";
import { Text } from "../../components/Text";
import { Container, Flex, Br } from "../../components/styles";
import styled from "@emotion/styled";
import { Onboarding } from "../Onboarding";
import { Icon } from "../../components/Icon";
import { Button } from "../../components/Button";
import useMediaQuery from "use-media-query-hook";
import { useEnterOnInput } from "../../hooks/useEnterOnInput";
import {
  useOnboardingContext,
  safty_in_numbers
} from "../App/context/onboardingContext";

export const Landing = () => {
  usePageViews();
  const isMobile = useMediaQuery("(max-width: 930px)");
  const input1 = useRef(null);
  const input2 = useRef(null);

  const { useDispatch, useState } = useOnboardingContext();
  const { registerEmail } = useState();

  const dispatch = useDispatch();

  const setEmail = (email: string) => {
    dispatch({ type: "setRegisterEmail", payload: email });
  };
  const onSubmit = async () => {
    dispatch({ type: "setStage", payload: safty_in_numbers });
  };

  useEnterOnInput(input1, onSubmit);
  useEnterOnInput(input2, onSubmit);
  return (
    <>
      <Header />
      <Container style={{ backgroundColor: "#fff", flexDirection: "column" }}>
        <ContentFlex>
          <Content>
            <div style={{ marginBottom: 40 }}>
              <div style={{ marginBottom: 20 }}>
                <Text color="dark" display="block" type="h4">
                  Ask Questions
                </Text>
                <Text weight="bold" color="active" display="block" type="h3">
                  Anonymously
                </Text>
              </div>
              <Text type="document" display="block">
                This is a space where employees can speak freely to their entire
                company without fear of retaliation. Companies thrive when
                employees speak out and management listens.{" "}
              </Text>
            </div>
            <InputContent>
              <Text color="dark" type="document">
                Start With Your Company Email
              </Text>
              <InputWrap>
                <Input
                  ref={input1}
                  name="register"
                  autoFocus
                  value={registerEmail}
                  onChange={({ target: { value } }) => setEmail(value)}
                  placeholder="joshua@ourhands.app"
                />
                <Icon size={3} margin="right" name="mail" />
              </InputWrap>
              <Br />
              <Button onClick={() => null} type="primary">
                Sign Up
              </Button>
            </InputContent>
          </Content>
          <ContentBody>
            <Image
              src={isMobile ? "/character-mobile-color.png" : "character.png"}
            />
          </ContentBody>
        </ContentFlex>
        <BodyPadding>
          <Text weight="bold" color="dark" display="block" type="h4">
            How It Works
          </Text>
          <ContentFlex>
            <BlockBox>
              <Text type="h5">
                Sign up with your company email. We’ll make sure it’s secure.
              </Text>
            </BlockBox>
            <BlockBox>
              <Text type="h5">
                See comments and questions posted anonymously by your coworkers
              </Text>
            </BlockBox>
            <BlockBox>
              <Text type="h5">
                Ask an anonymous question. We'll make sure it's seen.
              </Text>
            </BlockBox>
          </ContentFlex>
        </BodyPadding>
        <ContentFlex reverse>
          <Box style={{ flex: 1 }}>
            <Text weight="bold" color="dark" display="block" type="h4">
              In a Nutshell
            </Text>
            <Br />
            <Text type="document" display="block">
              There are a lot of questions an employee may have about their
              company that they might not feel comfortable asking directly
              during an all hands meeting, either due to fear of retalitation,
              or fear of conflict.
            </Text>
            <Br />
            <Text type="document" display="block">
              A good manager and employer want to know and understand the
              concerns of the people they work with. They can't fix problems
              they can't see.
            </Text>
            <Br />
            <Text type="document" display="block">
              This platform gives you a voice.
            </Text>
          </Box>
          <ContentBody>
            <Image src="/character-group-color.png" />
          </ContentBody>
        </ContentFlex>
        <Box>
          <Flex direction="column">
            <InputContent>
              <Text color="dark" type="document">
                Get Started
              </Text>
              <InputWrap>
                <Input
                  ref={input2}
                  name="register"
                  value={registerEmail}
                  onChange={({ target: { value } }) => setEmail(value)}
                  placeholder="joshua@ourhands.app"
                />
                <Icon size={3} margin="right" name="mail" />
              </InputWrap>
              <Br />
              <Button onClick={() => null} type="primary">
                Sign Up
              </Button>
            </InputContent>
          </Flex>
        </Box>
        <Onboarding />
      </Container>
    </>
  );
};

const ContentFlex = styled(Flex)`
flex-direction column;
margin-bottom: 4rem;
margin-right: 0;
@media (min-width: 930px) {
  margin-bottom: 8rem;
  flex-direction ${props => (props.reverse ? "row-reverse" : "row")};
}
`;
const BlockBox = styled.div`
  padding: 3rem 2rem;
  background: #f6f6f6;
  margin: 2rem 0;
  border-radius: 6px;
  @media (min-width: 930px) {
    margin-right: 2rem;
  }
`;
const BodyPadding = styled.div`
  padding: 1.5rem;
`;

const InputContent = styled.div`
  min-width: 300px;
  width: 100%;
  @media (min-width: 930px) {
    max-width: 420px;
  }
`;
const Box = styled(BodyPadding)`
  margin-bottom: 20px;
`;

const InputWrap = styled(Flex)`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-right: 1rem;
  margin-right: 0;
`;
const Image = styled.img`
  width: 100%;
  display: block;
  width: 100%;
  @media (min-width: 930px) {
    max-width: 550px;
    margin: 0 auto;
  }
`;
const Input = styled.input`
  font-size: 2rem;
  padding: 0 1rem;
  flex: 1;
  border: none;
  margin: 2rem 1rem;
  &:focus {
    outline: none;
  }
`;
const ContentBody = styled(BodyPadding)`
  margin-top: 14px;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding: 1.5rem;
  flex: 1;
  width: 100%;
`;
const Content = styled(BodyPadding)`
  margin-top: 64px;
  padding: 1.5rem;
  flex: 1;
`;

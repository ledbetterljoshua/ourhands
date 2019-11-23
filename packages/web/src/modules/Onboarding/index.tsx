import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import * as yup from "yup";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Flex, Bit, Backdrop } from "../../components/styles";
import {
  useOnboardingContext,
  safty_in_numbers
} from "../../modules/App/context/onboardingContext";

export const emailValidation = yup
  .string()
  .min(3, "emailNotLongEnough")
  .max(255)
  .email("invalidEmail")
  .required();

const schema = yup.object().shape({
  email: emailValidation
});

const renderBits = (onDelete: any) => (bit: any, ndx: number) => {
  return (
    <EmailBit onClick={() => (ndx !== 0 ? onDelete(ndx) : null)} key={ndx}>
      {bit}
    </EmailBit>
  );
};

export const Onboarding = () => {
  const input = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailList, setEmailList] = useState();

  const { useState: useOState } = useOnboardingContext();

  const { stage, registerEmail } = useOState();

  useEffect(() => {
    setEmailList([registerEmail]);
  }, [registerEmail]);

  const isValidEmail = async (email: string) => {
    try {
      await schema.validate({ email }, { abortEarly: false });
      return true;
    } catch (e) {
      setError("Email not valid");
    }
  };

  const onSubmit = async (e: any) => {
    if (e.key === "Enter") {
      const isValid = await isValidEmail(email);
      if (!isValid) return;
      setEmailList([...(emailList || []), email]);
      setEmail("");
    }
  };

  useEffect(() => {
    if (input.current) {
      (input!.current as any).onkeyup = onSubmit;
    }
  }, [input, onSubmit]);

  useEffect(() => {
    if (email && error) {
      setError("");
    }
  }, [email]);

  const onDelete = (ndx: number) => {
    const filtered = emailList.filter((_: any, i: number) => i !== ndx);
    setEmailList(filtered);
  };

  const renderEmails = renderBits(onDelete);

  return stage === safty_in_numbers ? (
    <>
      <Backdrop />
      <Container>
        <Header align="flex-start" direction="column">
          <Text weight="bold" color="dark" type="h5">
            Getting Started
          </Text>
        </Header>
        <Body align="flex-start">
          <Content>
            <Text display="block" color="dark" type="h6">
              Safety In Numbers
            </Text>
            <Text display="block">
              Ensure you are not the only one at your company on here. Add your
              coworkers below. Learn more.
            </Text>
          </Content>
          <InputWrap>
            {(emailList || []).map(renderEmails)}
            <Input
              autoFocus
              ref={input}
              value={email}
              placeholder={"your coworkers email"}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            {error ? <Text color="danger">{error}</Text> : null}
          </InputWrap>
          <EmailContent>
            <Text>email being sent goes here</Text>
          </EmailContent>
        </Body>
        <Footer justify="flex-end">
          <Button type="text" onClick={() => null}>
            skip
          </Button>
          <Button
            type="primary"
            disabled={!emailList || !emailList.length}
            onClick={() => null}
          >
            Send
          </Button>
        </Footer>
      </Container>
    </>
  ) : null;
};

const Container = styled.div`
  overflow: hidden;
  z-index: 10;
  background: #fff;
  position: fixed;
  max-width: 100%;
  width: 812px;
  bottom: 0;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const EmailBit = styled(Bit)`
  margin-bottom: 1rem;
`;
const EmailContent = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;
const Body = styled(Flex)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Header = styled(Flex)`
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;
  margin: 0;
`;
const Input = styled.input`
  padding: 1rem 2rem;
  background: #fff;
  border: none;
  display: flex;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;
const InputWrap = styled(Content)`
  display: flex;
  border-radius: 4px;
  border-bottom: 1px solid #ddd;
  max-width: 100%;
  margin-left: -10px;
  flex-wrap: wrap;
  align-self: stretch;
`;
const Footer = styled(Flex)`
  background: #fafafa;
  padding: 1.2rem 1rem;
  border-top: 1px solid #c3c3c3;
  margin: 0;
`;

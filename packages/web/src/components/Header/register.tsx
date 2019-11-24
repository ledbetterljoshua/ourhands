import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import {
  useOnboardingContext,
  safty_in_numbers
} from "../../modules/App/context/onboardingContext";
import { useEnterOnInput } from "../../hooks/useEnterOnInput";

export const Register = () => {
  const input = useRef(null);
  const { useDispatch, useState: useOState } = useOnboardingContext();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch({ type: "setStage", payload: safty_in_numbers });
  };

  const { registerEmail } = useOState();

  const setEmail = (email: string) => {
    dispatch({ type: "setRegisterEmail", payload: email });
  };

  useEnterOnInput(input, onSubmit);

  return (
    <div>
      <Form>
        <Input
          autoFocus
          ref={input}
          value={registerEmail}
          placeholder={"Your Work Email"}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1.3rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1.8rem;
  margin-right: 1rem;
`;

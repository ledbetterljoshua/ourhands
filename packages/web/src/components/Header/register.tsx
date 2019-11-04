import React, { useState, useRef } from "react";
import { registerMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";

export const Register = () => {
  const [register] = useMutation(registerMutation);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async () => {
    const { data } = await register({ variables: { email } });
    setSubmitted(true);
    if (!data.register) {
      window.location.reload();
    }
  };
  return (
    <div>
      <Form>
        <Input
          autoFocus
          value={email}
          placeholder={"Your Work Email"}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
      {submitted ? <Text>check your email</Text> : null}
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

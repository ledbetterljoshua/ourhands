import React, { useState } from "react";
import { registerMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { RouteProps } from "react-router";
import { Button } from "../../components/Button";

export const Landing = (props: RouteProps) => {
  console.log("props", props);
  const [register] = useMutation(registerMutation);
  const [email, setEmail] = useState("");
  const onSubmit = async () => {
    const { data } = await register({ variables: { email } });
    console.log(data);
    if (!data.register) {
      window.location.reload();
    }
  };
  return (
    <Form>
      <Input
        value={email}
        placeholder={"your email goes here"}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <Button type="primary" onClick={onSubmit}>
        register here
      </Button>
    </Form>
  );
};

const Form = styled.div``;
const Input = styled.input`
  width: 90%;
  padding: 1.6rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1.8rem;
  margin: 2rem 0;
`;

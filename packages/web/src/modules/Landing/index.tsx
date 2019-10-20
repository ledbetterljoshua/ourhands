import React, { useState } from "react";
import { registerMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { RouteProps } from "react-router";

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
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <Button onClick={onSubmit}>register here</Button>
    </Form>
  );
};

const Form = styled.div``;
const Input = styled.input``;
const Button = styled.button``;

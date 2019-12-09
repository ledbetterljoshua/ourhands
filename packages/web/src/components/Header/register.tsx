import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import {
  useOnboardingContext,
  login,
  register
} from "../../modules/App/context/onboardingContext";
import Box from "@material-ui/core/Box";

export const RegisterComponent = () => {
  const { useDispatch } = useOnboardingContext();
  const dispatch = useDispatch();

  const onSubmit = async (stage: string) => {
    dispatch({ type: "setStage", payload: stage });
  };

  return (
    <>
      <Box mr={1}>
        <Button variant="text" color="default" onClick={() => onSubmit(login)}>
          Login
        </Button>
      </Box>
      <Button
        variant="outlined"
        color="default"
        onClick={() => onSubmit(register)}
      >
        Get Started
      </Button>
    </>
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

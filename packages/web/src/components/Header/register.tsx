import React from "react";
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

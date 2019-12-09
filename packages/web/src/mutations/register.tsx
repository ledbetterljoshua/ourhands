import React from "react";
import { registerMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import {
  useOnboardingContext,
  submitted
} from "../modules/App/context/onboardingContext";

export const Register = ({
  children,
  emails
}: {
  children: any;
  emails: string[];
}) => {
  const [register] = useMutation(registerMutation);
  const { useDispatch, useState } = useOnboardingContext();
  const dispatch = useDispatch();

  const submit = async () => {
    const { data } = await register({ variables: { email: emails[0] } });
    dispatch({ type: "setStage", payload: submitted });
  };
  return children({ submit });
};

import * as React from "react";
import { Register } from "./view/register";
import { RegisterController } from "@ourhands/controller";

export const RegisterConnector = () => {
  return (
    <RegisterController>
      {({ submit }) => <Register submit={submit} />}
    </RegisterController>
  );
};

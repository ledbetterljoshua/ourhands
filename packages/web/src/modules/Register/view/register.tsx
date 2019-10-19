import * as React from "react";

interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormValues | null>;
}

export const Register = ({ submit }: Props) => (
  <div onClick={() => submit({ email: "" })}>register here</div>
);

import * as React from "react";
// import { Register } from "./view/register";
import { meQuery } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";

export const RegisterConnector = () => {
  const { loading, error, data } = useQuery(meQuery);
  console.log("loading, error, data", loading, error, data);
  return loading ? <p>loading</p> : error ? <p>{error}</p> : <div>{data}</div>;
};

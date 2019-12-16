import React from "react";

const store = {
  id: "",
  email: "",
  domain: {
    name: ""
  },
  __typename: "User"
};

export const UserContext = React.createContext(store);

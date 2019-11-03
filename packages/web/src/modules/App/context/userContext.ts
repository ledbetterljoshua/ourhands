import React from "react";

const store = {
  email: "",
  domain: {
    name: ""
  }
};

export const UserContext = React.createContext(store);

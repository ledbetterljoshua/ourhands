/* usePostCreateContext */

/**
 * holds state for create post
 */

import { useReducer } from "react";

export const PUBLIC = "PUBLIC";
export const PRIVATE = "PRIVATE";
export const ANONYMOUS = "ANONYMOUS";

type option = {
  value: string;
  label: string;
};

export const options: option[] = [
  {
    label: "privately",
    value: PRIVATE
  },
  {
    label: "publicly",
    value: PUBLIC
  },
  {
    label: "anonymously",
    value: ANONYMOUS
  }
];

export type State = {
  option: option;
};

type actionVariant = "setOption";

export type Action = { type: actionVariant; payload?: any };
export type Dispatch = (action: Action) => void;

const initialState = {
  option: options[0]
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setOption": {
      return { ...state, option: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}

export const usePostCreateState = () => {
  return useReducer(reducer, initialState);
};

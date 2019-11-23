/* tslint:disable */
import { createContext } from "react";
import { useCustomRedux, ProviderProps } from "./customRedux";

export const not_started = "not_started";
export const safty_in_numbers = "safty_in_numbers";

type onboardingStage = "not_started" | "safty_in_numbers";

export type State = {
  registerEmail: string;
  stage: onboardingStage;
};

type actionVariant = "setStage" | "setRegisterEmail";

export type Action = { type: actionVariant; payload?: any };
export type Dispatch = (action: Action) => void;

const initialState = {
  stage: "not_started",
  registerEmail: ""
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setRegisterEmail": {
      return { ...state, registerEmail: action.payload };
    }
    case "setStage": {
      return { ...state, stage: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

interface ReturnProps {
  useDispatch(): Dispatch;
  useState(): State;
  Provider: ({ children }: ProviderProps) => any;
}

export const useOnboardingContext = (): ReturnProps => {
  return useCustomRedux({
    reducer,
    StateContext,
    DispatchContext,
    initialState
  });
};

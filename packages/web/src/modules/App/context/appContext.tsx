/* tslint:disable */
import { createContext } from "react";
import { useCustomRedux, ProviderProps } from "./customRedux";

type rangeOption = {
  value: string;
  label: string;
};

export const rangeOptions: rangeOption[] = [
  { value: "THIS_WEEK", label: "This Week" },
  { value: "THIS_MONTH", label: "This Month" },
  { value: "EVERYTHING", label: "Everything" }
];

export type State = {
  sideNav: { open: boolean };
  createNew: { active: boolean };
  registerEmail: string;
  rangeOption: rangeOption;
};

type actionVariant =
  | "setRegisterEmail"
  | "setOptionRange"
  | "showSideNav"
  | "hideSideNav"
  | "toggleSideNav"
  | "showCreate"
  | "hideCreate"
  | "toggleCreate";

export type Action = { type: actionVariant; payload?: any };
export type Dispatch = (action: Action) => void;

const initialState = {
  rangeOption: rangeOptions[0],
  sideNav: { open: false },
  createNew: { active: false }
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setOptionRange": {
      return { ...state, rangeOption: action.payload };
    }
    case "toggleSideNav": {
      return { ...state, sideNav: { open: !state.sideNav.open } };
    }
    case "showSideNav": {
      return { ...state, sideNav: { open: true } };
    }
    case "hideSideNav": {
      return { ...state, sideNav: { open: false } };
    }
    case "toggleCreate": {
      return { ...state, createNew: { active: !state.createNew.active } };
    }
    case "showCreate": {
      return { ...state, createNew: { active: true } };
    }
    case "hideCreate": {
      return { ...state, createNew: { active: false } };
    }
    case "setRegisterEmail": {
      return { ...state, registerEmail: action.payload };
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

export const useAppContext = (): ReturnProps => {
  return useCustomRedux({
    reducer,
    StateContext,
    DispatchContext,
    initialState
  });
};

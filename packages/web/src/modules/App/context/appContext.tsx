/* tslint:disable */
import { createContext } from "react";
import { useCustomRedux, ProviderProps } from "./customRedux";

export type State = {
  sideNav: { open: boolean };
  createNew: { active: boolean };
};

type actionVariant =
  | "showSideNav"
  | "hideSideNav"
  | "toggleSideNav"
  | "showCreate"
  | "hideCreate"
  | "toggleCreate";
export type Action = { type: actionVariant };
export type Dispatch = (action: Action) => void;

const initialState = { sideNav: { open: false }, createNew: { active: false } };

function reducer(state: State, action: Action) {
  switch (action.type) {
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

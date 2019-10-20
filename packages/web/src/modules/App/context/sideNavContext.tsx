/* tslint:disable */
import React, { useState, createContext, useReducer } from "react";

type State = { open: boolean };
type Action = { type: "show" } | { type: "hide" };
type Dispatch = (action: Action) => void;

interface ProviderProps {
  children: React.ReactNode;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "show": {
      return { open: true };
    }
    case "hide": {
      return { open: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}

const SideNavStateContext = createContext<State | undefined>(undefined);
const SideNavDispatchContext = createContext<Dispatch | undefined>(undefined);

export const SideBarProvider = ({ children }: ProviderProps): any => {
  const [state, dispatch] = useReducer(reducer, { open: false });
  const { Provider: StateProvider } = SideNavStateContext;
  const { Provider: DispatchProvider } = SideNavDispatchContext;
  return (
    <StateProvider value={state}>
      <DispatchProvider value={dispatch}>{children}</DispatchProvider>
    </StateProvider>
  );
};

export function useSideBarState() {
  const context = React.useContext(SideNavStateContext);
  if (context === undefined) {
    throw new Error("useSideBarState must be used within a SideBarProvider");
  }
  return context;
}

export function useSideBarDispatch() {
  const context = React.useContext(SideNavDispatchContext);
  if (context === undefined) {
    throw new Error("useSideBarDispatch must be used within a SideBarProvider");
  }
  return context;
}

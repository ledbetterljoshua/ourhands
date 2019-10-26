/* tslint:disable */
import React, { useReducer } from "react";

export interface ProviderProps {
  children: React.ReactNode;
}

interface Props {
  reducer: any;
  initialState: any;
  StateContext: any;
  DispatchContext: any;
}

export interface ReturnProps {
  useDispatch: () => any;
  useState: () => any;
  Provider: ({ children }: ProviderProps) => any;
}

export const useCustomRedux = ({
  reducer,
  initialState,
  StateContext,
  DispatchContext
}: Props): ReturnProps => {
  const Provider = ({ children }: ProviderProps): any => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { Provider: StateProvider } = StateContext;
    const { Provider: DispatchProvider } = DispatchContext;
    return (
      <StateProvider value={state}>
        <DispatchProvider value={dispatch}>{children}</DispatchProvider>
      </StateProvider>
    );
  };

  const useState = () => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
      throw new Error("useState must be used within a Provider");
    }
    return context;
  };

  const useDispatch = () => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
      throw new Error("useDispatch must be used within a Provider");
    }
    return context;
  };

  return {
    useDispatch,
    useState,
    Provider
  };
};

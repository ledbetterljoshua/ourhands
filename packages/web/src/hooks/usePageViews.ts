import { useLocation } from "react-router";
import React from "react";
import {
  useSideBarDispatch,
  useSideBarState
} from "../modules/App/context/sideNavContext";

export const usePageViews = () => {
  const dispatch = useSideBarDispatch();
  // const { open } = useSideBarState();
  let location = useLocation();
  React.useEffect(() => {
    dispatch({ type: "hide" });
    // ga.send(["pageview", location.pathname]);
  }, [location]);
};

import { useLocation } from "react-router";
import React from "react";
import { useAppContext } from "../modules/App/context/appContext";

export const usePageViews = () => {
  const { useDispatch } = useAppContext();

  const dispatch = useDispatch();
  // const { open } = useSideBarState();
  let location = useLocation();
  React.useEffect(() => {
    dispatch({ type: "hideSideNav" });
    // ga.send(["pageview", location.pathname]);
  }, [location, dispatch]);
};

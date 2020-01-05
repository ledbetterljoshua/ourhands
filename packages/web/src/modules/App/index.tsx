import React from "react";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import { LeftMenu } from "../../components/LeftMenu";
import { FeedView } from "./Feed";
import { MeView } from "./Me";
import { Header } from "../../components/Header";
import {
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import { usePageViews } from "../../hooks/usePageViews";
import posed, { PoseGroup } from "react-pose";
import {
  ContentWrapper,
  Content,
  InnerContent,
  Container
} from "../../components/styles";
import { AboutContent } from "../About";
import { useAppContext } from "./context/appContext";
import { Hidden } from "@material-ui/core";

const RouteContainer = posed.div({
  render: { scale: 1, opacity: 1, beforeChildren: true, delay: 300 },
  hidden: { scale: 0.98, opacity: 0 }
});

export const AppView = () => {
  usePageViews();
  const { useDispatch } = useAppContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const onCreate = () => {
    dispatch({ type: "showCreate" });
    //if not on root, then push /
    if (history.location.pathname !== "/") {
      history.push("/");
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <Container>
        <ContentWrapper>
          <LeftMenu />
          <Content elevation={0}>
            <InnerContent>
              <PoseGroup>
                <RouteContainer
                  initialPose="hidden"
                  pose="render"
                  key={location.pathname}
                >
                  <Switch>
                    <Route exact path={`${match!.url}`}>
                      <FeedView />
                    </Route>
                    <Route path={`${match!.url}me`}>
                      <MeView />
                    </Route>
                    <Route path={`/about`}>
                      <AboutContent />
                    </Route>
                  </Switch>
                </RouteContainer>
              </PoseGroup>
              <Hidden smUp>
                <Fab
                  onClick={onCreate}
                  style={{
                    position: "fixed",
                    bottom: 40,
                    right: 20,
                    backgroundColor: "#fff"
                  }}
                >
                  <Add style={{ fontSize: "4.1875rem" }} />
                </Fab>
              </Hidden>
            </InnerContent>
          </Content>
        </ContentWrapper>
      </Container>
    </>
  );
};

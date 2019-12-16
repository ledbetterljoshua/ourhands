import React from "react";
import { Header } from "../../components/Header";
import { usePageViews } from "../../hooks/usePageViews";
import { Text } from "../../components/Text";
import { LandingWrap, Hr, Image } from "../../components/styles";
import styled from "@emotion/styled";
import { Onboarding } from "../Onboarding";
import { Button } from "../../components/Button";
import useMediaQuery from "use-media-query-hook";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/styles";
import { createStyles, Theme, Fade, Grid } from "@material-ui/core";
import {
  useOnboardingContext,
  not_started,
  register
} from "../../modules/App/context/onboardingContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      minWidth: 596
    },
    modalContainerMobile: {
      width: "100%",
      borderRadius: "8px",
      background: "rgb(255, 255, 255)",
      position: "absolute",
      top: "0",
      bottom: "0",
      marginBottom: "0 !important",
      overflow: "scroll"
    }
  })
);

const Footer = () => (
  <Box style={{ padding: "5rem" }}>
    <Grid alignItems={"center"} justify="center" container>
      <Button onClick={() => null} variant="text">
        <Text color="light">About Us</Text>
      </Button>
      <Button onClick={() => null} variant="text">
        <Text color="light">Support Us</Text>
      </Button>
      <Button onClick={() => null} variant="text">
        <Text color="light">Help</Text>
      </Button>
    </Grid>
  </Box>
);

export const Landing = () => {
  usePageViews();
  const { useDispatch, useState } = useOnboardingContext();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 750px)");

  const showModal = () => {
    dispatch({ type: "setStage", payload: register });
  };
  const hideModal = () => {
    dispatch({ type: "setStage", payload: not_started });
  };

  const { stage } = useState();
  return (
    <>
      <Header position={"static"} hasShadow={false} />
      <LandingWrap style={{ backgroundColor: "#fff", flexDirection: "column" }}>
        <Content>
          <div style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 40 }}>
              <Text
                family="serif"
                align="center"
                color="dark"
                display="block"
                type="h4"
              >
                Speak Out
              </Text>
              <Text
                family="serif"
                weight="bold"
                align="center"
                color="dark"
                display="block"
                type="h2"
              >
                Anonymously
              </Text>
            </div>
            <Box style={{ maxWidth: 522, margin: "0 auto" }}>
              <Text align="center" type="p" display="block">
                This is a space where co-workers can speak freely to their
                entire company without fear of retaliation. Companies thrive
                when employees speak out and management listens.{" "}
              </Text>
            </Box>
          </div>
          <Box
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button variant="contained" color="primary" onClick={showModal}>
              Get Started
            </Button>
          </Box>
        </Content>
        <ContentBody>
          <Image
            src={
              isMobile
                ? "stand-out-from-the-crowd.png"
                : "stand-out-from-the-crowd.png"
            }
          />
        </ContentBody>
        <Onboarding />
      </LandingWrap>
      {/* <Hr />
      <AboutWrap>
        <AboutContent />
      </AboutWrap> */}
      <Hr />
      <Footer />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={stage !== not_started}
        onClose={hideModal}
        // onEscapeKeyDown
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0
          }}
          in={stage !== not_started}
        >
          <Box
            className={
              isMobile ? classes.modalContainerMobile : classes.modalContainer
            }
            style={{ borderRadius: 8, background: "#fff" }}
          >
            <Onboarding isModal />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// const AboutWrap = styled.div`
//   max-width: 680px;
//   margin: 80px auto;
// `;
const BodyPadding = styled.div`
  padding: 1.5rem;
`;
const Box = styled(BodyPadding)`
  margin-bottom: 20px;
`;
const ContentBody = styled(BodyPadding)`
  margin-top: 14px;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding: 1.5rem;
  flex: 1;
  width: 100%;
`;
const Content = styled(BodyPadding)`
  margin-top: 64px;
  padding: 1.5rem;
  flex: 1;
`;

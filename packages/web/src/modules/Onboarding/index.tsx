import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import * as yup from "yup";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Flex, Image, Br, Hr } from "../../components/styles";
import { Icon } from "../../components/Icon";
import {
  useOnboardingContext,
  submitted,
  register,
  not_started
} from "../../modules/App/context/onboardingContext";
import { useEnterOnInput, useEventOnInput } from "../../hooks/useEnterOnInput";
import { Register } from "../../mutations/register";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  useMediaQuery,
  IconButton
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitButton: {
      position: "absolute",
      bottom: "40px",
      maxWidth: "90%",
      margin: "0 auto",
      width: "100%",
      left: "0",
      right: "0"
    },
    root: {
      display: "flex",
      justifyContent: "start",
      flexWrap: "wrap",
      flexDirection: "row",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    innerInput: {
      display: "flex",
      width: "auto",
      flex: 1,
      padding: 10,
      margin: "0 !important",
      paddingTop: 7,
      minWidth: "150px !important"
    }
  })
);

export const emailValidation = yup
  .string()
  .min(3, "emailNotLongEnough")
  .max(255)
  .email("invalidEmail")
  .required();

const schema = yup.object().shape({
  email: emailValidation
});

const renderBits = (onDelete: any) => (bit: any, ndx: number) => {
  const isInit = ndx === 0;
  return (
    <Chip
      key={ndx}
      size="medium"
      avatar={<Avatar>{bit[0]}</Avatar>}
      label={bit}
      onDelete={!isInit ? () => onDelete(ndx) : undefined}
      disabled={isInit}
      color={isInit ? "primary" : "default"}
    />
  );
};

export const Onboarding = ({ isModal = false }: { isModal?: Boolean }) => {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const [registerEmail, setRegisterEmail] = useState("joshua@ourhands.app");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailList, setEmailList] = useState([] as any);
  const { useDispatch, useState: useOnboardingState } = useOnboardingContext();
  const { stage } = useOnboardingState();
  const dispatch = useDispatch();
  const classes = useStyles();

  const isValidEmail = async (email: string) => {
    try {
      await schema.validate({ email }, { abortEarly: false });
      const usedEmail = Boolean(emailList.find((x: string) => x === email));
      if (usedEmail) {
        setEmail("");
      }
      return !usedEmail;
    } catch (e) {
      setError("Email not valid");
    }
  };

  const onAddRegisterEmail = async (email: string) => {
    const isValid = await isValidEmail(email);
    if (!isValid) return;
    const [_, ...o] = emailList;
    console.log(_);
    setEmailList([email, ...o] as any);
    setEmail("");
    setError("");
  };
  const onSubmit = async (email: string) => {
    const isValid = await isValidEmail(email);
    if (!isValid) return console.log("not valid", email);
    setEmailList([...((emailList || []) as any), email]);
    setEmail("");
  };

  const onBackspace = () => {
    if (!email) {
      const i = emailList.length - 1;
      // const lastEmail = emailList.slice(0, i);
      setEmail(emailList[i]);
      setEmailList(
        emailList.slice(0, i).concat(emailList.slice(i + 1, emailList.length))
      );
      // setEmail(lastEmail);
    }
  };

  const onBlurCoworkerEmailInput = () => {
    if (email && email.length) {
      onSubmit(email);
    }
  };
  const onSetCoworkerEmail = (val: string) => {
    console.log(val);
    if (val[val.length - 1] === " ") {
      return onSubmit(email);
    }
    return setEmail(val);
  };

  useEffect(() => {
    if (email && error) {
      setError("");
    }
  }, [email]);

  const onDelete = (ndx: number) => {
    const filtered = emailList.filter((_: any, i: number) => i !== ndx);
    setEmailList(filtered);
  };

  const renderEmails = renderBits(onDelete);

  useEventOnInput(input1, {
    onBackspace: onBackspace,
    onEnter: () => onSubmit(email)
  });

  useEnterOnInput(input2, () => onAddRegisterEmail(registerEmail));

  const isMobile = useMediaQuery("(max-width: 750px)");

  const renderSubmitted = () => (
    <Box style={{ marginBottom: 20 }}>
      <Box style={{ maxWidth: 160, padding: 20, margin: "0 auto" }}>
        <Image src="email-conf.png" />
      </Box>
      <Hr />
      <Box style={{ marginTop: 30, marginBottom: 20 }}>
        <Text display="block" align="center" type="h5" family="serif">
          Confirm Your Email
        </Text>
      </Box>
      <Text display="block" align="center" type="body">
        We sent an invite link to your email. Follow the link to access the app.
      </Text>
    </Box>
  );

  const renderRegister = () => (
    <Register emails={emailList}>
      {({ submit }: any) => (
        <InputContent align="flex-start">
          <Text color="dark" family="serif" type="h5">
            Start With Your Company Email
          </Text>
          <InputWrap>
            <Input
              ref={input2}
              name="register"
              autoFocus
              value={registerEmail}
              onChange={({ target: { value } }) => setRegisterEmail(value)}
              placeholder="joshua@ourhands.app"
            />
            <Icon size={3} margin="right" name="mail" />
          </InputWrap>
          {Boolean(emailList.length) ? (
            <>
              <Br />
              <Br />
              <Text color="dark" family="serif" type="subtitle">
                Invite Your Coworkers (optional)
              </Text>
              <InputWrap>
                <div className={classes.root}>
                  {(emailList || []).map(renderEmails)}
                  <Input
                    autoFocus
                    onBlur={onBlurCoworkerEmailInput}
                    ref={input1}
                    value={email}
                    placeholder={"your coworkers email"}
                    className={classes.innerInput}
                    onChange={({ target: { value } }) =>
                      onSetCoworkerEmail(value)
                    }
                  />
                </div>
              </InputWrap>
              <Text color="light" family="serif" type="overline">
                The email will come from us, and will not disclose who invited
                them. This option is available for your security. Read more.
              </Text>
            </>
          ) : null}
          {error ? <Text color="danger">{error}</Text> : null}
          <Br />
          <Br />
          <Box className={isMobile && isModal ? classes.submitButton : ""}>
            <Button
              fullWidth
              disabled={!registerEmail}
              onClick={() =>
                Boolean(emailList.length) ? submit() : onSubmit(registerEmail)
              }
              variant="contained"
              color="secondary"
            >
              {Boolean(emailList.length) ? "Sign Up" : "Continue"}
            </Button>
          </Box>
        </InputContent>
      )}
    </Register>
  );

  const render = () => {
    switch (stage) {
      case submitted:
        return renderSubmitted();
      case register:
      default:
        return renderRegister();
    }
  };

  return (
    <>
      {isModal && isMobile ? (
        <Box style={{ position: "fixed", top: 20, right: 20 }}>
          <IconButton
            onClick={() => dispatch({ payload: not_started, type: "setStage" })}
          >
            <Close fontSize="large" />
          </IconButton>
        </Box>
      ) : null}
      {render()}
    </>
  );
};

const InputContent = styled.div<any>`
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  min-width: 300px;
  width: 100%;
  max-width: 90%;
  @media (min-width: 600px) {
    max-width: 566px;
  }
`;

const Input = styled.input`
  background: #fff;
  border: none;
  display: flex;
  margin: 1.6rem 1rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const InputWrap = styled(Flex)`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-right: 1rem;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 0;
`;

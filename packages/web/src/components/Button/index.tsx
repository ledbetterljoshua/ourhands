import styled from "@emotion/styled";
import React from "react";
import { Text } from "../Text";
import { colors } from "../Text/getTypography";
import MButton from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

type colorType = "default" | "inherit" | "primary" | "secondary";
type sizeType = "small" | "medium" | "large";
type variantType = "text" | "outlined" | "contained";

interface Props {
  children: string | React.ReactNode;
  color?: colorType;
  onClick: any;
  component?: string | React.ReactNode;
  href?: string;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  margin?: boolean;
  endIcon?: React.ReactNode;
  size?: sizeType;
  startIcon?: React.ReactNode;
  variant?: variantType;
}

export const Button = ({ children, ...props }: Props) => {
  const classes = useStyles();
  return (
    <MButton className={props.margin ? classes.margin : undefined} {...props}>
      {children}
    </MButton>
  );
};

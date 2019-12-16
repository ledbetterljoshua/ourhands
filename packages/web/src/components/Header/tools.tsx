import React from "react";
import styled from "@emotion/styled";
import {
  useAppContext,
  rangeOptions
} from "../../modules/App/context/appContext";
import { client } from "../../apollo";
import { meQuery } from "@ourhands/controller";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Menu, MenuItem, Box, Divider, Hidden } from "@material-ui/core";

type option = {
  value: string;
  label: string;
};

export interface toolProps {
  smDown?: boolean;
  smUp?: boolean;
}

export const Tools = (props: toolProps) => {
  const { useDispatch, useState } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: option) => {
    setAnchorEl(null);
    option.value && handleChange(option);
  };

  const { rangeOption } = useState();

  const {
    me: { domain }
  }: any = client.readQuery({
    query: meQuery
  });

  const dispatch = useDispatch();

  const handleChange = (option: option) => {
    dispatch({
      type: "setOptionRange",
      payload: option
    });
  };

  return (
    <Hidden smDown={props.smDown} smUp={props.smUp}>
      <Container>
        <Component>
          <Button variant="text" color="default" onClick={handleClick}>
            <Box position="relative">
              <Text weight="bold">{rangeOption.label}</Text>
              <Hr />
            </Box>
            <ArrowDropDown fontSize="large" />
            {domain ? <Text>{`@${domain.name}`}</Text> : null}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {rangeOptions.map(({ label, value }) => (
              <MenuItem
                key={value}
                onClick={() => handleClose({ label, value })}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Component>
      </Container>
    </Hidden>
  );
};

const Hr = styled(Divider)`
  margin-top: 15px !important;
  position: absolute;
  width: 104%;
  background-color: #000 !important;
  top: 100%;
`;
const Container = styled.div`
  margin-left: -10px;
  margin-bottom: 30px;
  @media (min-width: 930px) {
    margin-bottom: 0px;
    margin-left: 296px;
  }
`;
const Component = styled.div``;

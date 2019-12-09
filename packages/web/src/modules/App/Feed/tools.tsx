import React, { useState, useContext } from "react";
import { Dropdown } from "../../../components/Dropdown";
import styled from "@emotion/styled";
import { Hr, Flex } from "../../../components/styles";
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { useAppContext, rangeOptions } from "../context/appContext";
import { client } from "../../../apollo";
import { meQuery } from "@ourhands/controller";
import { Button } from "../../../components/Button";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Menu, MenuItem, Typography } from "@material-ui/core";

type option = {
  value: string;
  label: string;
};

export const Tools = () => {
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
    <Container>
      <Component>
        <Button variant="text" color="default" onClick={handleClick}>
          <Typography variant="body2">{rangeOption.label}</Typography>
          <ArrowDropDown fontSize="large" />
          <Typography variant="body2">{rangeOption.label}</Typography>
          {domain ? (
            <Typography variant="body2">{`@${domain.name}`}</Typography>
          ) : null}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {rangeOptions.map(({ label, value }) => (
            <MenuItem onClick={() => handleClose({ label, value })}>
              {label}
            </MenuItem>
          ))}
        </Menu>
        {/* <Dropdown
          selectedOption={rangeOption}
          onChange={(e: option) => handleChange(e)}
          options={rangeOptions}
        >
          <Action>
            <Flex>
              <span style={{ marginRight: 5 }}>
                <Text color="active">{rangeOption.label}</Text>
              </span>
              <Icon name="carrot" />
            </Flex>
            {domain ? <Text>{`@${domain.name}`}</Text> : null}
          </Action>
        </Dropdown> */}
      </Component>
      <Hr style={{ marginBottom: "2.5rem" }} />
    </Container>
  );
};

const Action = styled(Flex)`
  padding: 10px 20px;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  transition: background 120ms ease-in-out;
  &:hover {
    background: #f1f1f1;
  }
`;
const Container = styled.div``;
const Component = styled.div`
  padding-left: 19px;
`;

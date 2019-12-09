import React from "react";
import { Dropdown } from "../../../components/Dropdown";
import { Icon } from "../../../components/Icon";
import styled from "@emotion/styled-base";
import { Text } from "../../../components/Text";
import { Bit } from "../../../components/styles";
import { options } from "../context/postCreateContext";
import { Button } from "../../../components/Button";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Menu, MenuItem } from "@material-ui/core";
import { rangeOptions } from "../context/appContext";

export const AnonToggle = ({ state, onChange }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: any) => {
    setAnchorEl(null);
    option.value && onChange(option);
  };
  return (
    <>
      <Button onClick={handleClick}>
        {state.option.label}
        <ArrowDropDown fontSize="large" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map(({ label, value }: any) => (
          <MenuItem onClick={() => handleClose({ label, value })}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
    // <Dropdown
    //   onChange={onChange}
    //   options={options}
    //   selectedOption={state.option}
    // >
    //   <Toggle>
    //     <Text type="subtitle2">{state.option.label}</Text>
    //     <Icon margin="left" color="light" name="carrot" />
    //   </Toggle>
    // </Dropdown>
  );
};

const Toggle = styled(Bit)`
  cursor: pointer;
`;

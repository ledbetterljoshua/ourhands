import React from "react";
import { options } from "../context/postCreateContext";
import { Button } from "../../../components/Button";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Menu, MenuItem } from "@material-ui/core";

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
          <MenuItem key={value} onClick={() => handleClose({ label, value })}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

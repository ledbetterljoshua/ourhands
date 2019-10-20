import React from "react";
import { Icon } from "../Icon";
import { Dropdown } from "../Dropdown";

const options = [
  {
    label: "delete",
    value: "delete"
  }
];

export const Options = () => {
  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown
        selectedOption={options[0]}
        onChange={() => null}
        options={options}
        direction="left"
      >
        <Icon color="light" name={"dots"} />
      </Dropdown>
    </div>
  );
};

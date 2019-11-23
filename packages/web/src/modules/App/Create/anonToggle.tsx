import React from "react";
import { Dropdown } from "../../../components/Dropdown";
import { Icon } from "../../../components/Icon";
import styled from "@emotion/styled-base";
import { Text } from "../../../components/Text";
import { Bit } from "../../../components/styles";
import { options } from "../context/postCreateContext";

export const AnonToggle = ({ state, onChange }: any) => {
  // const { useDispatch, useState, Provider } = usePostCreateContext();
  // const dispatch = useDispatch();
  // const { option } = useState();

  return (
    <Dropdown
      onChange={onChange}
      options={options}
      selectedOption={state.option}
    >
      <Toggle>
        <Text type="subtitle2">{state.option.label}</Text>
        <Icon margin="left" color="light" name="carrot" />
      </Toggle>
    </Dropdown>
  );
};

const Toggle = styled(Bit)`
  cursor: pointer;
`;

import React from "react";
import { Dropdown } from "../../../components/Dropdown";
import { Icon } from "../../../components/Icon";
import styled from "@emotion/styled-base";
import { Text } from "../../../components/Text";
import { Flex } from "../../../components/styles";
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

const Toggle = styled(Flex)`
  margin-left: 10px;
  padding: 0.8rem 2.2rem;
  border-radius: 500px;
  background: #f3f3f3;
  cursor: pointer;
`;

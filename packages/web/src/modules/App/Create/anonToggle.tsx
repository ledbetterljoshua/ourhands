import React, { useState } from "react";
import { Dropdown } from "../../../components/Dropdown";
import { Icon } from "../../../components/Icon";
import styled from "@emotion/styled-base";
import { Text } from "../../../components/Text";
import { Flex } from "../../../components/styles";

const options = [
  {
    label: "anonymously",
    value: "anonymous"
  },
  {
    label: "publicly",
    value: "public"
  },
  {
    label: "super anonymously",
    value: "super"
  }
];

export const AnonToggle = () => {
  const [selected, onSelect] = useState(options[0]);
  return (
    <Dropdown onChange={onSelect} options={options} selectedOption={selected}>
      <Toggle>
        <Text type="subtitle2">{selected.label}</Text>
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

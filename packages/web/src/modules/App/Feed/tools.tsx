import React, { useState, useContext } from "react";
import { Dropdown } from "../../../components/Dropdown";
import styled from "@emotion/styled";
import { Hr, Flex } from "../../../components/styles";
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { UserContext } from "../context/userContext";

type option = {
  value: string;
  label: string;
};

const options: option[] = [
  { value: "chocolate", label: "This Week" },
  { value: "strawberry", label: "This Month" },
  { value: "vanilla", label: "Everything" }
];

export const Tools = () => {
  const [selectedOption, changeSelected] = useState(options[0]);
  const me = useContext(UserContext);
  const handleChange = (option: option) => {
    changeSelected(option);
  };
  return (
    <Container>
      <Component>
        <Dropdown
          selectedOption={selectedOption}
          onChange={(e: option) => handleChange(e)}
          options={options}
        >
          <Action>
            <Flex>
              <span style={{ marginRight: 5 }}>
                <Text color="active">{selectedOption.label}</Text>
              </span>
              <Icon name="carrot" />
            </Flex>
            <Text>{`@${me.domain}`}</Text>
          </Action>
        </Dropdown>
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
const Container = styled.div`
  margin-left: -39px;
`;
const Component = styled.div`
  padding-left: 19px;
`;

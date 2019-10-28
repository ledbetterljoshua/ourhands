import React, { useState, useContext } from "react";
import { Dropdown } from "../../../components/Dropdown";
import styled from "@emotion/styled";
import { Hr, Flex } from "../../../components/styles";
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { UserContext } from "../context/userContext";
import { useAppContext, rangeOptions } from "../context/appContext";

type option = {
  value: string;
  label: string;
};

export const Tools = () => {
  const { useDispatch, useState } = useAppContext();

  const { rangeOption } = useState();

  const me = useContext(UserContext);
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
        <Dropdown
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

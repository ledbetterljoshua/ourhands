import React, { useState } from "react";
import { createPostMutation, meQuery } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";
import { Flex } from "../../../components/styles";
import { useHistory } from "react-router";

export const CreateView = (props: any) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const history = useHistory();
  const [create] = useMutation(createPostMutation, {
    refetchQueries: [{ query: meQuery }]
  });
  const onCreate = async () => {
    await create({
      variables: { title, details }
    });
    history.push("/");
  };
  return (
    <Container>
      <Text type="h5" color="dark" weight="bold">
        Ask Something
      </Text>
      <Input
        autoFocus={true}
        placeholder="title"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
      />
      <TextArea
        placeholder="details"
        value={details}
        onChange={({ target: { value } }) => setDetails(value)}
      />
      <Flex>
        <Button onClick={onCreate}>ask it</Button>
      </Flex>
    </Container>
  );
};

const Input = styled.input`
  width: 90%;
  padding: 1.6rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1.8rem;
  margin: 2rem 0;
`;
const TextArea = styled.textarea`
  width: 90%;
  padding: 1.6rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
`;

import React, { useState } from "react";
import { RouteProps } from "react-router";
import { createPostMutation, postsQuery } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { views } from "..";

export const CreateView = (props: any) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [create] = useMutation(createPostMutation, {
    refetchQueries: [{ query: postsQuery }]
  });
  const onCreate = async () => {
    await create({
      variables: { title, details }
    });
    props.setView(views.FEED);
  };
  return (
    <Container>
      <Input
        placeholder="title"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
      />
      <TextArea
        placeholder="details"
        value={details}
        onChange={({ target: { value } }) => setDetails(value)}
      />
      <button onClick={onCreate}>create</button>
    </Container>
  );
};

const Input = styled.input`
  display: block;
`;
const TextArea = styled.textarea`
  display: block;
`;

const Container = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
`;

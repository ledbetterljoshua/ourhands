import React from "react";
import { RouteProps } from "react-router";
import { myPosts } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { PostList } from "../../../components/Post";

export const MeView = () => {
  const { loading, error, data } = useQuery(myPosts);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Container>
      <PostList posts={data.me.posts} mine />
    </Container>
  );
};

const Container = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
`;

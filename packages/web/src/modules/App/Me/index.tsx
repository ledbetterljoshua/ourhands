import React from "react";
import { myPosts } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { PostList } from "../../../components/Post";

export const MeView = () => {
  const { loading, error, data } = useQuery(myPosts);
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }
  console.log(data);
  return (
    <Container>
      <PostList posts={data.me.posts} />
    </Container>
  );
};

const Container = styled.div`
  animation-name: effect-fade-in;
  animation-duration: 120ms;
`;

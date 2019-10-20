import React from "react";
import { RouteProps } from "react-router";
import { meQuery } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { PostList } from "../../../components/Post";

export const MeView = (props: RouteProps) => {
  const { loading, error, data } = useQuery(meQuery);
  console.log("loading, error, data", loading, error, data);
  if (loading) {
    return <div>loading</div>;
  }
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

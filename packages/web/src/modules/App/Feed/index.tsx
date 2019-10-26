import React from "react";
import { RouteProps } from "react-router";
import { postsQuery } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { PostList } from "../../../components/Post";
import { Tools } from "./tools";
import { CreateView } from "../Create";

export const FeedView = (props: RouteProps) => {
  const { loading, error, data } = useQuery(postsQuery);
  console.log("props", props);
  if (loading) {
    return <div>loading</div>;
  }
  if (!data || error) {
    console.log("data, err", data, error);
    return <div>something went wrong</div>;
  }

  return (
    <Container>
      <Tools />
      <CreateView />
      <PostList posts={data.findPosts} />
    </Container>
  );
};

const Container = styled.div``;

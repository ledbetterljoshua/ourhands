import React, { useEffect } from "react";
import { postsQuery } from "@ourhands/controller";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { PostList } from "../../../components/Post";
import { Tools } from "./tools";
import { CreateView } from "../Create";
import { useAppContext } from "../context/appContext";

export const FeedView = () => {
  const { useState } = useAppContext();
  const { rangeOption } = useState();

  const { loading, error, data, refetch } = useQuery(postsQuery, {
    variables: {
      range: rangeOption.value
    }
  });

  useEffect(() => {
    refetch({ range: rangeOption.value });
  }, [rangeOption.value]);

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

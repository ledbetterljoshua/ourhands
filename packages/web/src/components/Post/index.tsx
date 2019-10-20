import React from "react";
import styled from "@emotion/styled";
import { upvoteMutation, postsQuery } from "@ourhands/controller";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Action } from "./action";
import { Flex } from "../styles";

interface User {
  email: string;
  id: string;
}

interface Post {
  user: User;
  id: string;
  title: string;
  details: string;
  upvoteCount: number;
  upvoted: boolean;
}

export const PostView = ({ data }: { data: Post }) => {
  const { title, details, upvoteCount, upvoted, user } = data;
  // const client = useApolloClient();
  const [upvote] = useMutation(upvoteMutation);
  const isOwned = Boolean(user);
  return (
    <Container>
      <Head direction="row" justify="space-between">
        <Flex className="flex" direction="row">
          <Text type="caption" color="light">
            3 days ago
          </Text>
          <Dot />
          <Text type="caption" color="light">
            top voted
          </Text>
        </Flex>
        {isOwned ? <Icon color="light" name={"dots"} /> : null}
      </Head>
      <Body>
        <Title>
          <Text color="dark" type="h5" weight="bold">
            {title}
          </Text>
        </Title>
        <Text>{details}</Text>
      </Body>
      <Footer>
        <Action
          onAction={() => upvote({ variables: { id: data.id } })}
          active={upvoted}
          icon="thumbsup"
          text={"Upvote"}
        />
        <Action
          onAction={() => null}
          active={false}
          icon="comment"
          text={"Comment"}
        />
      </Footer>
      <Hr />
    </Container>
  );
};

interface User {
  email: string;
  id: string;
}

interface Post {
  id: string;
  title: string;
  details: string;
  user: User;
  upvoteCount: number;
  upvoted: boolean;
}

const renderPost = (post: Post, ndx: number) => {
  return (
    <div key={post.id}>
      <PostView data={post} />
    </div>
  );
};

export const PostList = ({ posts }: { posts: Post[] }) => {
  return <List>{posts.map(renderPost)}</List>;
};

const List = styled.div``;
const Hr = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #e4e4e4;
  margin: 0.6rem 0;
  padding: 0;
`;
const Title = styled.div`
  padding-bottom: 12px;
`;
const Body = styled.div`
  padding-bottom: 1rem;
`;
const Container = styled.div`
  padding-bottom: 5rem;
`;
const Dot = styled.span`
  color: rgb(184, 184, 184);
  background-color: rgb(184, 184, 184);
  width: 4px;
  height: 4px;
  border-radius: 4px;
`;

const Footer = styled(Flex)`
  padding-bottom: 1rem;
`;

const Head = styled(Flex)`
  padding-bottom: 6px;
  .flex > * {
    margin-right: 0.8rem;
  }
`;

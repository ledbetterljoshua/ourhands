import React, { useState } from "react";
import styled from "@emotion/styled";
import { upvoteMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import { Text } from "../Text";
import { Action } from "./action";
import { Details } from "./details";
import { Flex, Hr } from "../styles";
import { Comments } from "./comments";
import { Options } from "./options";

interface User {
  email: string;
  id: string;
}

interface Post {
  user: User | undefined;
  id: string;
  title: string;
  details: string;
  upvoteCount: number;
  upvoted: boolean;
  createdAt: Date;
  commentCount?: number;
}

export const PostView = ({
  data,
  ndx,
  mine
}: {
  data: Post;
  ndx: number;
  mine?: boolean;
}) => {
  const { id, title, details, createdAt, upvoted, user, commentCount } = data;

  const [commentsVisible, setCommentsVisible] = useState(false);
  const [upvote] = useMutation(upvoteMutation);
  const isOwned = mine || Boolean(user);

  return (
    <Container>
      <Head direction="row" justify="space-between">
        <Flex className="flex" direction="row">
          <Text type="caption" color="light">
            {moment(Number(createdAt)).fromNow()}
          </Text>
          {ndx === 0 ? (
            <>
              <Dot />
              <Text weight="bold" type="caption" color="active">
                top voted
              </Text>
            </>
          ) : null}
        </Flex>
        {isOwned ? <Options id={id} /> : null}
      </Head>
      <Body>
        <Title>
          <Text color="dark" type="h5" weight="bold">
            {title}
          </Text>
        </Title>
        <Details details={details} />
      </Body>
      <Footer>
        <Action
          onAction={() => upvote({ variables: { id: data.id } })}
          active={upvoted}
          icon="thumbsup"
          text={"Upvote"}
        />
        <Action
          onAction={() => setCommentsVisible(true)}
          active={false}
          icon="comment"
          text={`Comment ${commentCount ? `(${commentCount})` : ""}`}
        />
      </Footer>
      {commentsVisible ? <Comments id={data.id} /> : <Hr />}
    </Container>
  );
};

const renderPost = (post: Post, ndx: number, mine?: boolean) => {
  return (
    <div key={post.id}>
      <PostView mine={mine} data={post} ndx={ndx} />
    </div>
  );
};

export const PostList = ({
  posts,
  mine
}: {
  posts: Post[];
  mine?: boolean;
}) => {
  return (
    <List>
      {!posts.length ? <Image src="/character.png" /> : null}
      {posts.map((o, i) => renderPost(o, i, mine))}
    </List>
  );
};

const List = styled.div``;
const Title = styled.div`
  padding-bottom: 12px;
`;
const Body = styled.div`
  padding-bottom: 1rem;
`;
const Container = styled.div`
  padding-bottom: 3rem;
`;
const Image = styled.img`
  max-width: 70%;
  display: block;
  margin: 5rem auto;
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

import React, { useState } from "react";
import styled from "@emotion/styled";
import useIsInViewport from "use-is-in-viewport";
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
  isOwner: Boolean;
  owner?: {
    email: string;
  };
}

export const PostView = ({ data, ndx }: { data: Post; ndx: number }) => {
  const {
    id,
    title,
    details,
    createdAt,
    upvoted,
    isOwner,
    commentCount,
    owner
  } = data;
  const [isInViewport, targetRef] = useIsInViewport({ threshold: 50 });
  // console.log(isInViewport);
  // useEffect(() => {
  //   if (isInViewport) {
  //     console.log(`${title} is now in view`);
  //   } else {
  //     console.log(`${title} is now out of view`);
  //   }
  // }, [isInViewport]);

  const [commentsVisible, setCommentsVisible] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [upvote] = useMutation(upvoteMutation);
  const isOwned = isOwner;

  return (
    <Container
      onMouseLeave={() => setMouseOver(false)}
      onMouseOver={() => setMouseOver(true)}
      ref={targetRef}
    >
      <Head direction="row" justify="space-between">
        {owner && owner.email ? (
          <Text color="light">{owner.email}</Text>
        ) : (
          <Text color="light">Anonymous</Text>
        )}
        {mouseOver && isOwned ? (
          <Options id={id} />
        ) : (
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
        )}
      </Head>
      <Body hasDetails={details && details.length > 0}>
        <Title>
          <Text color="dark" type="h5" weight="bold">
            {title}
          </Text>
        </Title>
        {details ? <Details details={details} /> : null}
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

const renderPost = (post: Post, ndx: number) => {
  return (
    <div key={post.id}>
      <PostView data={post} ndx={ndx} />
    </div>
  );
};

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <List>
      {!posts || (posts && posts.length < 1) ? (
        <Image src="/character.png" />
      ) : (
        posts.map((o, i) => renderPost(o, i))
      )}
    </List>
  );
};

const List = styled.div``;
const Title = styled.div`
  padding-bottom: 12px;
`;
const Body = styled.div<any>`
  padding-bottom: ${props => (props.hasDetails ? "1rem" : "")};
`;
const Container = styled.div<any>`
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

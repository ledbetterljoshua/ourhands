import React, { useState, useRef, useContext } from "react";
import styled from "@emotion/styled";
import { Text } from "../Text";
import { Flex, TextArea } from "../styles";
import { useQuery, useMutation } from "react-apollo";
import { commentsQuery, createCommentMutation } from "@ourhands/common";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UserContext } from "../../modules/App/context/userContext";
import moment from "moment";
import { addCommentToCache } from "../../utils/comments/addCommentToCache";
import { useEnterOnInput } from "../../hooks/useEnterOnInput";
import { IconButton } from "@material-ui/core";

const CommentComp = ({
  text,
  id,
  parentId,
  createdAt,
  isReponse,
  reply
}: any) => {
  const input = useRef(null);
  const [commentText, setText] = useState("");
  const [replyActive, setReplyActive] = useState(false);

  const onSubmit = (e: any) => {
    if (Boolean(text.split("\n").join("").length)) {
      reply(commentText, parentId || id);
      setText("");
      setReplyActive(false);
    }
  };

  useEnterOnInput(input, onSubmit);

  return (
    <CommentWrap style={isReponse ? { marginLeft: "3rem" } : {}} key={id}>
      <Comment>
        <Text color="dark">{text}</Text>
      </Comment>
      <CommentActions>
        <div style={{ marginRight: "1rem" }}>
          <Text
            onClick={() => setReplyActive(true)}
            weight="bold"
            type="caption"
            color="active"
          >
            reply
          </Text>
        </div>
        <Text color="light" type="caption">
          {moment(Number(createdAt)).fromNow()}
        </Text>
      </CommentActions>
      {replyActive && (
        <InputWrapper style={{ marginTop: "1rem" }}>
          <Input
            autoFocus
            ref={input}
            value={commentText}
            onChange={({ target: { value } }: any) =>
              setText(value.split("\n").join(""))
            }
            lines={Math.max(text.length / 70, 1)}
            placeholder="write a response..."
          />
        </InputWrapper>
      )}
    </CommentWrap>
  );
};

export const Comments = (props: { id: string }) => {
  const me = useContext(UserContext);
  const [anonymous, setSnonymous] = useState(true);
  const input = useRef(null);

  const [create] = useMutation(createCommentMutation, {
    update(cache, { data: { createComment } }) {
      const { id, parentId, text } = createComment[0].comment;
      addCommentToCache(
        cache,
        me
      )({
        id,
        text,
        parentId,
        postId: props.id
      });
    }
  });
  const [text, setText] = useState("");
  const { data } = useQuery(commentsQuery, {
    variables: { postId: props.id }
  });

  const toggleAnon = () => {
    setSnonymous(!anonymous);
  };

  const onCreateComment = async () => {
    await create({
      variables: {
        text,
        postId: props.id
      }
    });
    setText("");
  };
  const onCreateReply = async (text: string, parentId: string) => {
    await create({
      variables: {
        text,
        parentId,
        postId: props.id
      }
    });
  };

  const onSubmit = (e: any) => {
    if (Boolean(text.split("\n").join("").length)) {
      onCreateComment();
    }
  };

  useEnterOnInput(input, onSubmit);

  return (
    <Component>
      <Container>
        {data &&
          data.findComments.map(
            ({ replies, id, id: parentId, ...rest }: any) => {
              return (
                <div key={id}>
                  <CommentComp
                    reply={onCreateReply}
                    id={id}
                    {...rest}
                    parentId={parentId}
                  />
                  {replies &&
                    replies.map(({ id, ...rest }: any) => (
                      <CommentComp
                        reply={onCreateReply}
                        key={id}
                        id={id}
                        isReponse
                        {...rest}
                        parentId={parentId}
                      />
                    ))}
                </div>
              );
            }
          )}
        <Flex>
          <IconButton
            style={{ padding: 8, marginRight: 8, alignSelf: "flex-start" }}
            onClick={toggleAnon}
          >
            {anonymous ? (
              <VisibilityOff fontSize="large" />
            ) : (
              <Visibility fontSize="large" />
            )}
          </IconButton>
          <div style={{ flex: 1 }}>
            <InputWrapper>
              <Input
                value={text}
                autoFocus
                ref={input}
                onChange={({ target: { value } }: any) =>
                  setText(value.split("\n").join(""))
                }
                placeholder="write a comment..."
              />
            </InputWrapper>
            <Text margin="left" type="caption" color="light">
              press enter to submit
            </Text>
          </div>
        </Flex>
      </Container>
    </Component>
  );
};

const Input = styled(TextArea)<any>`
  border-radius: 18px;
  background: #f2f3f5;
  padding: 0.8rem 1.2rem;
  width: 100%;
  display: block;
  border: 1px solid #c3c3c3;
`;
const CommentActions = styled(Flex)`
  padding: 0 1rem;
`;
const InputWrapper = styled(Flex)`
  display: flex;
`;
const Comment = styled.div`
  background-color: #f2f3f5;
  border-radius: 18px;
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.8rem 1.2rem;
`;
const CommentWrap = styled.div`
  margin-bottom: 2rem;
  ${(props: any) => (props.isReponse ? `margin-left: 2rem;` : "")}
`;
const Container = styled.div``;
const Component = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 2rem 1rem;
`;

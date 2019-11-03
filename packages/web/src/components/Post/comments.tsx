import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Text } from "../Text";
import { Flex, TextArea } from "../styles";
import { useQuery, useMutation } from "react-apollo";
import { commentsQuery, createCommentMutation } from "@ourhands/common";
import { UserContext } from "../../modules/App/context/userContext";
import moment from "moment";
import { addCommentToCache } from "../../utils/addCommentToCache";

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
    if (e.key === "Enter" && Boolean(text.split("\n").join("").length)) {
      reply(commentText, parentId || id);
      setText("");
      setReplyActive(false);
    }
  };

  useEffect(() => {
    if (input.current) {
      (input!.current as any).onkeyup = onSubmit;
    }
  }, [input, onSubmit]);

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
  const input = useRef(null);
  const [create] = useMutation(createCommentMutation, {
    update(cache, { data: { createComment } }) {
      const { id, parentId, text } = createComment[0].comment;
      addCommentToCache(cache, me)({
        id,
        text,
        parentId,
        postId: props.id
      });
    }
  });
  const [text, setText] = useState("");
  const { loading, data, error } = useQuery(commentsQuery, {
    variables: { postId: props.id }
  });

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
        parentId
      }
    });
  };

  const onSubmit = (e: any) => {
    if (e.key === "Enter" && Boolean(text.split("\n").join("").length)) {
      onCreateComment();
    }
  };

  useEffect(() => {
    if (input.current) {
      (input!.current as any).onkeyup = onSubmit;
    }
  }, [input, onSubmit]);
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
        <InputWrapper>
          <Input
            value={text}
            autoFocus
            ref={input}
            onChange={({ target: { value } }: any) =>
              setText(value.split("\n").join(""))
            }
            lines={Math.max(text.length / 70, 1)}
            placeholder="write a comment..."
          />
        </InputWrapper>
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

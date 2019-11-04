import React, { useState, useRef, useContext } from "react";
import { createPostMutation, postsQuery } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { TextArea, Hr } from "../../../components/styles";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";
import { Flex } from "../../../components/styles";
import { PullLeft } from "../../../components/styles";
import { getTypography } from "../../../components/Text/getTypography";
import posed, { PoseGroup } from "react-pose";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { AnonToggle } from "./anonToggle";
import { UserContext } from "../context/userContext";
import { usePostCreateState } from "../context/postCreateContext";

export const FadeIn = posed.div({});

export const CreateView = () => {
  const [postCreateState, dispatchCreateState] = usePostCreateState();
  const { useDispatch, useState: useAppState } = useAppContext();
  const me = useContext(UserContext);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    createNew: { active }
  } = useAppState();
  const contentRef = useRef(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [create] = useMutation(createPostMutation, {
    update(cache, { data: { createPost } }) {
      debugger;
      const { id } = createPost[0].post;
      const data = cache.readQuery({
        query: postsQuery,
        variables: { range: "THIS_WEEK" }
      }) as any;
      const { findPosts: posts } = data;
      const newPost = {
        id,
        title,
        details,
        user: me,
        upvoted: true,
        upvoteCount: 1,
        createdAt: Date.now(),
        commentCount: 0,
        __typename: "Post"
      };
      cache.writeQuery({
        query: postsQuery,
        variables: { range: "THIS_WEEK" },
        data: { findPosts: [newPost, ...posts] }
      });
    }
  });

  const onChangePostCreateState = (payload: any) => {
    dispatchCreateState({ type: "setOption", payload });
    if (inputRef.current) {
      (inputRef.current as any).focus();
    }
  };

  const setActive = (val: boolean) => {
    return dispatch({ type: val ? "showCreate" : "hideCreate" });
  };

  const onCreate = async () => {
    const { option } = postCreateState;
    await create({
      variables: {
        title,
        details,
        viewability: option.value
      }
    });
    setActive(false);
    setTitle("");
    setDetails("");
  };

  useEffect(() => {
    const setInactiveOnScroll = () => {
      const ref = contentRef!.current as any;
      if (ref) {
        if (window.scrollY >= ref.clientHeight + ref.offsetTop) {
          setActive(false);
        }
      }
    };
    const ref = inputRef!.current as any;
    if (active && ref) {
      ref!.focus();
      window.addEventListener("scroll", setInactiveOnScroll);
    } else {
      window.removeEventListener("scroll", setInactiveOnScroll);
    }
  }, [active]);

  return (
    <>
      <PoseGroup>
        {active && (
          <FadeIn key="fade">
            <Background onClick={() => setActive(false)} />
          </FadeIn>
        )}
      </PoseGroup>
      <Container ref={contentRef} active={active}>
        <Content onClick={() => setActive(true)}>
          <Flex>
            <Text>Ask it</Text>
            <AnonToggle
              state={postCreateState}
              onChange={onChangePostCreateState}
            />
          </Flex>
          <Input
            ref={inputRef}
            value={title}
            placeholder="What's on your mind?"
            onChange={({ target: { value } }: any) => setTitle(value)}
          />
          {!active ? <Hr /> : null}
          {active ? (
            <Body
              ref={bodyRef}
              placeholder="Optional: anything else you would like to add?"
              value={details}
              onChange={({ target: { value } }: any) => setDetails(value)}
            />
          ) : null}
        </Content>
        {active && (
          <Footer justify="flex-end">
            <Text onClick={() => setActive(false)} margin="right" color="light">
              cancel
            </Text>
            <Button disabled={!title.length} type="primary" onClick={onCreate}>
              ask it
            </Button>
          </Footer>
        )}
      </Container>
    </>
  );
};

const Background = styled.div`
  opacity: 0.6;
  background: #000;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 310;
`;
const Content = styled.div`
  padding: 1rem 2rem;
`;
const Footer = styled(Flex)`
  background: #fafafa;
  padding: 1.2rem 1rem;
  border-top: 1px solid #c3c3c3;
  margin: 0;
`;

const Input = styled(TextArea)<any>`
  width: 90%;
  padding: 1.6rem 0;
  border: none;
  ${props => getTypography(props.theme, "h5", "dark", "bold")}
  margin: 0 0 2rem 0;
`;
const Body = styled(TextArea)<any>`
  width: 90%;
  border: none;
  ${props => getTypography(props.theme, "body")}
  margin-bottom: 4rem;
  ::placeholder {
    color: #a7a7a7;
  }
`;

const Container = styled(PullLeft)<any>`
  border-radius: 0.6rem;
  margin-bottom: 4rem;
  z-index: ${props => (props.active ? "321" : "inherit")};
  position: relative;
  background: #fff;
`;

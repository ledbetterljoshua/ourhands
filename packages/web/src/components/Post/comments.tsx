import React, { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "../Text";
import { Flex } from "../styles";

const data = [
  { text: "Beautiful ❤️ The simple things are the BEST!!!" },
  {
    text: "Thank you for being so brave!",
    responses: [{ text: "well hi there" }]
  }
];

const CommentComp = ({ text, ndx, isReponse }: any) => {
  return (
    <CommentWrap style={isReponse ? { marginLeft: "3rem" } : {}} key={ndx}>
      <Comment>
        <Text color="dark">{text}</Text>
      </Comment>
      <CommentActions>
        <div style={{ marginRight: "1rem" }}>
          <Text type="caption" color="active">
            reply
          </Text>
        </div>
        <Text color="light" type="caption">
          4 hours ago
        </Text>
      </CommentActions>
    </CommentWrap>
  );
};

export const Comments = () => {
  const [text, setText] = useState("");
  return (
    <Component>
      <Container>
        {data.map(({ text, responses }: any, ndx1) => {
          return (
            <>
              <CommentComp text={text} ndx={ndx1} />
              {responses &&
                responses.map(({ text }: any, ndx: number) => (
                  <CommentComp isReponse text={text} ndx={ndx} />
                ))}
            </>
          );
        })}
        <InputWrapper>
          <Input
            value={text}
            onChange={({ target: { value } }: any) => setText(value)}
            lines={Math.max(text.length / 70, 1)}
            placeholder="write a comment..."
          />
        </InputWrapper>
      </Container>
    </Component>
  );
};

const Input = styled.textarea<any>`
  border-radius: 18px;
  background: #f2f3f5;
  padding: 0.8rem 1.2rem;
  width: 100%;
  display: block;
  border: 1px solid #c3c3c3;
  resize: none;
  height: ${(props: any) => (props.lines || 1) * 17}px;
  &:focus {
    outline: none;
  }
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

import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import { Flex } from "../styles";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { useAppContext } from "../../modules/App/context/appContext";
import { Tools, toolProps } from "./tools";

export const AuthenticatedHeader = (props: toolProps) => {
  const history = useHistory();
  const { useDispatch } = useAppContext();
  const dispatch = useDispatch();

  const toggleOpen = () => {
    return dispatch({ type: "toggleSideNav" });
  };

  const isHome = history.location.pathname === "/";

  return (
    <Container justify="flex-start">
      <Flex>
        <Action onClick={toggleOpen}>
          <Icon size={2.7} name="menu" />
        </Action>
      </Flex>
      <Thing>
        <Link to="/">
          <Icon size={11} name="logo" />
        </Link>
      </Thing>
      {isHome ? <Tools smDown={true} /> : null}
      <Actions>
        <IconButton>
          <Avatar style={{ fontSize: "3.1875rem", color: "#000" }} />
        </IconButton>
      </Actions>
    </Container>
  );
};

const Thing = styled(Flex)`
  position: absolute;
  @media (max-width: 600px) {
    position: relative;
  }
`;
const Container = styled(Flex)`
  height: 100%;
  width: 922px;
  min-height: 36px;
  justify-content: flex-start;
  @media (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const Actions = styled.div`
  @media (min-width: 600px) {
    margin-left: auto;
  }
`;

const Action = styled.div`
  display: block;
  margin-left: 1rem;
  @media (min-width: 600px) {
    display: none;
  }
`;

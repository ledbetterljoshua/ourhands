import React, { useState } from "react";
import AriaModal from "react-aria-modal";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalHasEntered, setModalHasEntered] = useState(false);

  const activateModal = () => {
    setModalActive(true);
  };

  const deactivateModal = () => {
    setModalHasEntered(true);
    setTimeout(() => {
      setModalActive(false);
    }, 300);
  };

  const onModalEnter = () => {
    setModalHasEntered(true);
  };

  let dialogContentClass = "modal modal--animated";
  let underlayClass = "underlay";
  if (modalHasEntered) {
    dialogContentClass += " has-entered";
    underlayClass += " has-entered";
  }
  return (
    <AriaModal
      verticallyCenter={true}
      titleText="our hands action"
      onEnter={onModalEnter}
      onExit={deactivateModal}
      focusDialog={true}
      mounted={modalActive}
      underlayClass={underlayClass}
    >
      <Content className={dialogContentClass}>{children}</Content>
    </AriaModal>
  );
};

const Content = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 2em;
  max-height: 100%;
`;

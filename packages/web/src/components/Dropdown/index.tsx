import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Text } from "../Text";

type Direction = "right" | "left" | "top" | "bottom";

interface Props {
  children: React.ReactNode;
  options: any;
  onChange: any;
  selectedOption: any;
  direction?: Direction;
}

function useOutsideAlerter(ref: any, onEvent: any) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      onEvent();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export const Dropdown = ({
  children,
  options,
  onChange,
  selectedOption,
  direction = "right"
}: Props) => {
  const [active, setActive] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setActive(false));

  const onSelect = (o: any) => {
    onChange(o);
    setActive(!active);
  };

  const renderOptions = () => {
    return options.map((o: any) => {
      const { value, label, danger } = o;
      const isActive = selectedOption.value === value;
      return (
        <ListItem onClick={() => onSelect(o)} key={value}>
          <Text color={danger ? "danger" : isActive ? "active" : "body"}>
            {label}
          </Text>
        </ListItem>
      );
    });
  };

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <Component ref={wrapperRef}>
      <Action onClick={toggleActive}>{children}</Action>
      {active ? (
        <OptionWrap direction={direction}>{renderOptions()}</OptionWrap>
      ) : null}
    </Component>
  );
};

const Action = styled.div``;
const ListItem = styled.div`
  padding: 1.3rem 8rem 1.4rem 1.3rem;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;
const Component = styled.div`
  position: relative;
  display: inline-block;
`;

const OptionWrap = styled.div<any>`
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 700;
  margin-left: ${props => (props.direction === "right" ? "0px" : "-123px")};
  margin-top: -40px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.43);
`;

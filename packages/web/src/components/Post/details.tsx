import React, { useState } from "react";
import { Text } from "../../components/Text";
import styled from "@emotion/styled";

export const Details = ({ details }: { details: string }) => {
  const detailsTooLong = (details && details.length) > 200;
  const [showFullDetails, toggleShowFullDetails] = useState(detailsTooLong);
  const [detailsToShow, setDetails] = useState(
    details.substr(0, 200).split("\n")
  );

  const toggle = () => {
    setDetails(
      showFullDetails ? details.split("\n") : details.substr(0, 200).split("\n")
    );
    toggleShowFullDetails(!showFullDetails);
  };

  return (
    <>
      <Text>
        {detailsToShow.map((t, i) => {
          const isLast = i === detailsToShow.length - 1;
          return (
            <TextBlock key={i}>
              {t}
              {isLast ? (
                <span>
                  {showFullDetails ? (
                    <span style={{ marginLeft: 8 }}>
                      ...
                      <Text color="active" onClick={toggle}>
                        (more)
                      </Text>
                    </span>
                  ) : detailsTooLong ? (
                    <span style={{ marginLeft: 8 }}>
                      <Text color="active" onClick={toggle}>
                        (less)
                      </Text>
                    </span>
                  ) : null}
                </span>
              ) : null}
            </TextBlock>
          );
        })}
      </Text>
    </>
  );
};

const TextBlock = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

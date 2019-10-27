import React from "react";
import { Icon } from "../Icon";
import { Dropdown } from "../Dropdown";
import { useMutation } from "react-apollo";
import { deletePostMutation } from "@ourhands/controller";

const options = [
  {
    label: "delete",
    value: "delete",
    danger: true
  }
];

export const Options = ({ id }: { id: string }) => {
  const [deletePost] = useMutation(deletePostMutation);

  const onDelete = async () => {
    await deletePost({
      variables: {
        id
      }
    });
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown
        selectedOption={options[0]}
        onChange={onDelete}
        options={options}
        direction="left"
      >
        <Icon color="light" name={"dots"} />
      </Dropdown>
    </div>
  );
};

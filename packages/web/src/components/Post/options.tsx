import React from "react";
import { Icon } from "../Icon";
import { Dropdown } from "../Dropdown";
import { useMutation } from "react-apollo";
import { deletePostMutation } from "@ourhands/controller";
import { removePostFromCache } from "../../utils/posts/removePostFromCache";

const options = [
  {
    label: "delete",
    value: "delete",
    danger: true
  },
  {
    label: "edit",
    value: "edit"
  }
];

export const Options = ({ id }: { id: string }) => {
  const [deletePost] = useMutation(deletePostMutation, {
    update(cache, { data }) {
      console.log("data", data);
      // const { option } = postCreateState;
      removePostFromCache(cache)(id);
    }
  });

  const onDelete = async () => {
    console.log("delete");
    await deletePost({
      variables: {
        id
      }
    });
  };
  const onEdit = () => {};

  const onSelect = async (res: any) => {
    switch (res.value) {
      case "edit":
        return onEdit();
      case "delete":
        return onDelete();
      default:
        return;
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown
        selectedOption={options[0]}
        onChange={onSelect}
        options={options}
        direction="left"
      >
        <Icon color="light" name={"dots"} />
      </Dropdown>
    </div>
  );
};

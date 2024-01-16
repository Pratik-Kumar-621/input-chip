import React from "react";
import { userType } from "../data/data";

interface ListProps {
  data: userType[];
  selectedUsers: userType[];
  setData: (data: any[]) => void;
  setSelectedUsers: (data: any[]) => void;
  setInput: (input: string) => void;
  handleListItemClick: () => void;
}

const List = (props: ListProps) => {
  const {
    data,
    setData,
    setInput,
    selectedUsers,
    setSelectedUsers,
    handleListItemClick,
  } = props;

  // Adding user chip function from the list
  const handleAddUser = (user: userType) => {
    console.log(user);
    setSelectedUsers([...selectedUsers, user]);
    setInput("");
    handleListItemClick();
  };

  return (
    <div className="list_container">
      {data
        // Removing the selected users from the list
        .filter((item) =>
          selectedUsers.every((user) => user.email !== item.email)
        )
        .map((item, index) => (
          <div
            key={index}
            className="list_item"
            onClick={() => handleAddUser(item)}
          >
            <div className="list_item_image"></div>
            <div className="list_item_name">{item.name}</div>
            <div className="list_item_email">{item.email}</div>
          </div>
        ))}

      {/* If the input value doesn't matches the list */}
      {data.length === 0 && (
        <div className="list_none">No specific data !!!</div>
      )}
    </div>
  );
};

export default List;

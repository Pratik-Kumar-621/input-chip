import React, { useState, useEffect, useRef } from "react";
import { userType } from "../data/data";
import List from "./List";

// Input field Props

interface inputProps {
  data: userType[];
  selectedUsers: userType[];
  setData: (data: any[]) => void;
  setSelectedUsers: (data: any[]) => void;
  input: string;
  setInput: (input: string) => void;
}

const Input = (props: inputProps) => {
  const { data, setData, input, setInput, selectedUsers, setSelectedUsers } =
    props;

  // Function to remove chip the chip
  const handleRemove = (index: number) => {
    let data = [...selectedUsers];
    data.splice(index, 1);
    setSelectedUsers(data);
  };

  // To show the list of users while focus

  const [isListVisible, setListVisible] = useState(false);
  const inputRef: any = useRef();
  const inpRef: any = useRef();

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // To focus back on input field when clicked on list
  const handleListItemClick = () => {
    inpRef.current.focus();
  };

  // Handle backspace if input is blank and there is user selected
  const handleBackSpace = (e: any) => {
    if (input === "" && selectedUsers.length) {
      if (e.key === "Backspace") {
        let data = [...selectedUsers];
        const value = data[data.length - 1]?.name;
        setInput(value);
        data.pop();
        setSelectedUsers(data);
        e.preventDefault();
      }
      setListVisible(true);
    }
  };

  // Code
  return (
    <div className="input_container">
      {/* List of selected Users */}
      <div className="selected_list">
        {selectedUsers?.map((item, index) => (
          <div className="selected_list_item" key={index}>
            <div className="selected_list_item_image"></div>
            <div className="selected_list_item_name">{item.name}</div>
            <div
              className="selected_list_item_remove"
              onClick={() => handleRemove(index)}
            >
              x
            </div>
          </div>
        ))}
      </div>

      {/* --------------------------- */}

      {/* Input Field */}
      <div
        className="input-field"
        onClick={() => setListVisible(true)}
        ref={inputRef}
      >
        <input
          type="text"
          ref={inpRef}
          onKeyDown={handleBackSpace}
          value={input}
          placeholder="Select Users"
          onChange={(e) => setInput(e.target.value)}
        />
        {/* List of users */}
        {isListVisible && (
          <List
            {...{
              data,
              setData,
              setInput,
              selectedUsers,
              setSelectedUsers,
              handleListItemClick,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Input;

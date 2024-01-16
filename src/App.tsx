import { useEffect, useState } from "react";
import { userDetails, userType } from "./data/data";
import Input from "./components/Input";
import "./app.scss";

const App = () => {
  // Input value
  const [input, setInput] = useState<string>("");

  // Current users list
  const [data, setData] = useState<userType[]>(userDetails);

  // List of selected users
  const [selectedUsers, setSelectedUsers] = useState<userType[]>([]);

  // useEffect to filter the users list based on the input value
  useEffect(() => {
    (() => {
      setData(
        userDetails.filter((user) =>
          user.name.toLowerCase().includes(input.toLowerCase())
        )
      );
    })();
  }, [input]);

  // Code
  return (
    <div className="input-chip">
      {/* Input Field */}
      <Input
        {...{ data, setData, input, setInput, selectedUsers, setSelectedUsers }}
      />
    </div>
  );
};

export default App;

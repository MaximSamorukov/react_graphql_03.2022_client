import React, { useState } from "react";
import Header from "./Header";
import UserList from "./UsersList";

function App() {
  const [ sortOptions, setSortOptions] = useState({
    field: "created",
    sortDirection: "desc",
  });
  return (
    <div>
      <Header sortOptions={sortOptions} setSortOptions={setSortOptions} />
      <UserList sortOptions={sortOptions} />
    </div>
  );
}

export default App;

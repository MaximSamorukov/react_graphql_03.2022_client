import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./UserPage";

const UserPageWrapper = () => {
  const { id } = useParams();
  return (
    <UserPage id={id} />
  )
}

export default UserPageWrapper;
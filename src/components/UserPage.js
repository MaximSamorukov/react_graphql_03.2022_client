import React from "react";
import { useParams } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const UserPage = (props) => {
  const { id } = useParams();
  console.log(props);
  return (
    <div>
      {`User Page: ${id}`}
    </div>
  )
}

const query = gql`
  query fetchUser($id: ID!) {
    user(id: $id) {
      id,
      firstName,
      secondName,
      occupation,
      age,
      city,
      country,
    }
  }
`;

export default graphql(query)(UserPage);
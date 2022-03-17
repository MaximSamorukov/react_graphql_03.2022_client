import React from "react";
import { useParams } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const UserPage = ({ data: { user, loading, refetch } }) => {
  const { id } = useParams();
  refetch({ id })
  if (!loading) {
    return (
      <div style={{
        border: '1px solid green',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 500,
        marginTop: 10,
        padding: 10,
      }}>
        {
          Object.keys(user).map((item, index) => (
            <div key={`${user[item]}${index}`}>
              <span>{`${item}: `}<b>{user[item]}</b></span>
            </div>
          ))
        }
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    )
  }
  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}>
      <Spin />
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

export default graphql(query, {
  options: {
    variables: {
      id: '',
    }
  }
})(UserPage);
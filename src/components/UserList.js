import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";

class UserList extends Component {

  render() {
    const { users } = this.props.data;
    return (
      <div>
        {users.map(({ id, firstName, secondName, occupation, age }) => (
          <div style={{
            border: '1px solid green',
            margin: 5,
            padding: 10,
          }}>
            <div>
              <span>id: </span>
              <span><b>{id}</b></span>
            </div>
            <div>
              <span>first name: </span>
              <span><b>{firstName}</b></span>
            </div>
            <div>
              <span>second name: </span>
              <span><b>{secondName}</b></span>
            </div>
            <div>
              <span>occupation: </span>
              <span><b>{occupation}</b></span>
            </div>
            <div>
              <span>age: </span>
              <span><b>{age}</b></span>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const query = gql`
  {
    users {
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

export default graphql(query)(UserList);
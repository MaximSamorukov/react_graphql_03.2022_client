import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

class UserList extends Component {

  render() {
    const { users, loading } = this.props.data;
    return (
      <div style={{ paddingBottom: 5}}>
        { loading && (
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
        )}
        { users?.map(({ id, firstName, secondName, occupation, age }) => (
          <div key={id} style={{
            border: '1px solid green',
            margin: 5,
            padding: 10,
          }}>
            <Link to={`/user/${id}`}>
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
            </Link>
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
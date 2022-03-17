import React from "react";
import { useParams } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const UserPage = ({ data }) => {
  const { id } = useParams();
  data.refetch({ id });
  const { user } = data;
  if (user) {
    const { firstName, secondName, age, city, country, occupation, id: userId } = data?.user;
    return (
      <div style={{
        border: '1px solid green',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 500,
        marginTop: 10,
        padding: 10,
      }}>
        <div>
          <span>id: <b>{userId}</b></span>
        </div>
        <div>
          <span>first name: <b>{firstName}</b></span>
        </div>
        <div>
          <span>second name: <b>{secondName}</b></span>
        </div>
        <div>
          <span>age: <b>{age}</b></span>
        </div>
        <div>
          <span>city: <b>{city}</b></span>
        </div>
        <div>
          <span>country: <b>{country}</b></span>
        </div>
        <div>
          <span>occupation: <b>{occupation}</b></span>
        </div>
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
  query ($id: ID!) {
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
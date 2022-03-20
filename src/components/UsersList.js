import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { Spin, Modal } from 'antd';
import { Link } from 'react-router-dom';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      visible: false,
      addPostModalVisible: false,
      deleteUserModalVisible: false,
    }
  }
  getPostsData(id) {
    this.props.mutate({
      variables: {
        id
      },
    })
  }

  deleteUser(id) {
    this.props.mutate({
      variables: {
        id
      },
      refetchQueries: [
        {
          query
        }
      ]
    })
  }

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
        { users?.map(({ id, firstName, secondName, occupation, age, city, country, posts }) => (
          <div key={id} style={{
            border: '1px solid green',
            margin: 5,
            padding: 10,
          }}>
            <Link style={{ color: 'black' }} to={`/user/${id}`}>
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
              <div>
                <span>city: </span>
                <span><b>{city}</b></span>
              </div>
              <div>
                <span>country: </span>
                <span><b>{country}</b></span>
              </div>
              <div>
                <span>posts: </span>
                <span><b>{posts.length}</b></span>
              </div>
            </Link>
            <button onClick={() => {
              this.setState({ user: { id, firstName, secondName, occupation, age, city, country, posts }});
              this.setState({ deleteUserModalVisible: true });
            }}>Delete User</button>
          </div>
        ))}
        <Modal
          title="User delete request"
          visible={this.state.deleteUserModalVisible}
          onCancel={() => this.setState({ deleteUserModalVisible: false })}
          onOk={() => {
            this.deleteUser(this.state.user.id);
            this.setState({ deleteUserModalVisible: false });
          }}
          width={500}
          destroyOnClose
        >
          Do you really want to delete the user with all the posts?
        </Modal>
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
      posts {
        id,
      }
    }
  }
`;

const mutation = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      firstName,
      secondName,
      age,
      occupation,
      city,
      country
    }
  }
`;

export default
    graphql(mutation)(
      graphql(query)(UserList));
import React, { useState } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import UpdateUserModal from './UpdateUserModal';
import AddPostModal from "./AddPostModal";

const UserPage = ({ id, data: { loading, user } }) => {
  const [ addPostModalVisible, setAddPostModalVisisble ] = useState(false);
  if (!loading) {
    const { posts = [] } = user;
    return (
      <>
        <div
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: 500,
            marginTop: 10,
            height: 10,
          }}
        >
          <Link to="/">Back</Link>
        </div>
        <div
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: 500,
            fontSize: 20,

            textAlign: 'center'
          }}
        >
          <b>User Page</b>
        </div>
        <div style={{
          border: '1px solid green',
          marginRight: 'auto',
          marginLeft: 'auto',
          width: 500,
          marginTop: 10,
          padding: 10,
        }}>
          {
            Object.keys(user).map((item, index) => {
              if (item !== 'posts') {
                return (
                  <div key={`${user[item]}${index}`}>
                    <span>{`${item}: `}<b>{user[item]}</b></span>
                  </div>
                )
              }
            })
          }
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div>
              <button onClick={() => setAddPostModalVisisble(true)}>Add Post</button>
            </div>
            <div>
              <button onClick={() => {}}>Update User</button>
            </div>
            <div>
              <button onClick={() => {}}>Delete User</button>
            </div>
          </div>
        </div>
        { posts?.length && (
          <div
            style={{
              width: 500,
              marginTop: 10,
              padding: 10,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            <b>Posts: </b>
            ({posts.length})
          </div>
        )}
        {posts.length && posts.map(({ id, title, description, content, date, city, country, created, user }) => (
          <div
            key={id}
            style={{
              border: '1px solid green',
              marginRight: 'auto',
              marginLeft: 'auto',
              width: 500,
              marginTop: 10,
              padding: 10,
            }}
          >
            <div>
              <span>id: </span>
              <span><b>{id}</b></span>
            </div>
            <div>
              <span>user id: </span>
              <span><b>{user.id}</b></span>
            </div>
            <div>
              <span>title: </span>
              <span><b>{title}</b></span>
            </div>
            <div>
              <span>description: </span>
              <span><b>{description}</b></span>
            </div>
            <div>
              <span>content: </span>
              <span><b>{content}</b></span>
            </div>
            <div>
              <span>date: </span>
              <span><b>{date}</b></span>
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
              <span>created: </span>
              <span><b>{created}</b></span>
            </div>
            <button>Delete Post</button>
            <button>Update Post</button>
          </div>

        ))}
        <AddPostModal
          userId={id}
          title="Add Post"
          visible={addPostModalVisible}
          onCancel={() =>  setAddPostModalVisisble(false)}
          onOk={() =>  setAddPostModalVisisble(false)}
        />
      </>
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
  query fetchUser($id: String!) {
    user(id: $id) {
      id,
      firstName,
      secondName,
      occupation,
      age,
      city,
      country,
      posts {
        id,
        title,
        description,
        date,
        content,
        city,
        country,
        created,
        user {
          id
        }
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return {
      variables: {
        id: props.id,
      }
    }
  }
})(UserPage);
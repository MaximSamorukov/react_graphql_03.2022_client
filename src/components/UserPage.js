import React, { useState } from "react";
import { graphql, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { dateFormat } from "../utils/functions";
import { Spin, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UpdateUserModal from './UpdateUserModal';
import AddPostModal from "./AddPostModal";
import UpdatePostModal from "./UpdatePostModal";

const UserPage = ({ id, data: { loading, user } }) => {
  const [ addPostModalVisible, setAddPostModalVisisble ] = useState(false);
  const [ updatePostModalVisible, setUpdatePostModalVisisble ] = useState(false);
  const [ currentPost, setCurrentPost ] = useState({});
  const [ postToDelete, setPostToDelete ] = useState(null);
  const [ updateUserModalVisible, setUpdateUserModalVisible ] = useState(false);
  const [ deletePostModalVisible, setDeletePostVisible ] = useState(false);
  const [ deleteUserModalVisible, setDeleteUserVisible ] = useState(false);
  const navigate = useNavigate();

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
          <Mutation
            mutation={deleteUser}
            variables={{
              id,
            }}
            refetchQueries={[
              {
                query: fetchUsers,
              }
            ]}
          >
            {(deleteUserMutation) => (
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
                          <span>{`${item}: `}<b>{item === 'created' ? dateFormat(user[item]) : user[item]}</b></span>
                        </div>
                      )
                    }
                    return <></>;
                  })
                }
                <Modal
                  title={`Delete user ${user.title}`}
                  visible={deleteUserModalVisible}
                  onCancel={() => setDeleteUserVisible(false)}
                  onOk={async() => {
                    await deleteUserMutation();
                    setDeleteUserVisible(false);
                    navigate('/', { replace: true });
                  }}
                  width={600}
                  destroyOnClose
                >
                  {`Do you really want to delete the user ${user?.posts?.length ? 'and all associated posts' : '' }?`}
                </Modal>
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
                    <button onClick={() => setUpdateUserModalVisible(true)}>Update User</button>
                  </div>
                  <div>
                    <button onClick={() => setDeleteUserVisible(true)}>Delete User</button>
                  </div>
                </div>
              </div>

            )}
          </Mutation>
          { posts.length ? (
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
          ) : <></>}
          {posts.length ? posts.map(({ id, title, description, content, date, city, country, created, user }) => (
            <Mutation
              mutation={deletePost}
              variables={{
                id: postToDelete?.id,
              }}
              refetchQueries={[{
                query,
                variables: {
                  id: user.id,
                }
              }]}
            >
              {(deletePostMutation) => (
                <>
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
                    <button onClick={() => {
                      setPostToDelete({ id, title });
                      setDeletePostVisible(true)
                    }}>
                      Delete Post
                    </button>
                    <button onClick={() => {
                      setCurrentPost({ id, title, description, content, date, city, country, created, user });
                      setUpdatePostModalVisisble(true);
                    }}>
                      Update Post
                    </button>
                  </div>
                  <Modal
                    title={`Delete post ${postToDelete?.title}`}
                    visible={deletePostModalVisible}
                    onCancel={() => setDeletePostVisible(false)}
                    onOk={() => {
                      deletePostMutation();
                      setDeletePostVisible(false);
                    }}
                    width={600}
                    destroyOnClose
                  >
                    Do you really want to delete the post?
                  </Modal>
                </>
              )}
            </Mutation>
          )) : <></>}
          <AddPostModal
            userId={id}
            title="Add Post"
            visible={addPostModalVisible}
            onCancel={() =>  setAddPostModalVisisble(false)}
            onOk={() =>  setAddPostModalVisisble(false)}
            destroyOnClose={true}
          />
          <UpdateUserModal
            userData={user}
            title="Update User"
            visible={updateUserModalVisible}
            onCancel={() =>  setUpdateUserModalVisible(false)}
            onOk={() =>  setUpdateUserModalVisible(false)}
          />
          <UpdatePostModal
            post={currentPost}
            title="Update Post"
            visible={updatePostModalVisible}
            onCancel={() =>  setUpdatePostModalVisisble(false)}
            onOk={() =>  setUpdatePostModalVisisble(false)}
            destroyOnClose={true}
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
  query fetchUser($id: ID!) {
    user(id: $id) {
      id,
      firstName,
      secondName,
      occupation,
      age,
      city,
      country,
      created,
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

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const deleteUser = gql`
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

const fetchUsers = gql`
  {
    users(field: "created", sortDirection: "desc") {
      id,
      firstName,
      secondName,
      occupation,
      age,
      city,
      country,
      created,
      posts {
        id,
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
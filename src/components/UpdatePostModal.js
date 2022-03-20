import React, { useRef, useState } from "react";
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Modal, Form, Input, Space, Button } from "antd";

const UpdatePostModal = (props) => {
  const [postData, setPostData] = useState({});
  const updatePostForm = useRef();
  const { post, title, visible, onCancel, onOk } = props;
  const { id, user } = post;
  const onFinish = (updatePost) => (values) => {
    setPostData(values);
    updatePost();
    updatePostForm.current.resetFields();
    onCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={600}
      destroyOnClose
    >
      <Mutation
        mutation={updatePost}
        variables={{
          ...postData,
          user: user?.id,
          id,
        }}
        refetchQueries={[
          {
            query,
            variables: {
              userId: user?.id
            }
          }
        ]}
      >
        {(updatePostMutation) => (
          <Form
            ref={updatePostForm}
            name="updateUser"
            onFinish={onFinish(updatePostMutation)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            width={550}
          >
            <Space
              direction="vertical"
            >
              <Form.Item
                name="title"
                label="Post title:"
                rules={[{ required: true, message: 'Please input the post title!' }]}
                initialValue={post?.title}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description:"
                name="description"
                rules={[{ required: true, message: 'Please input the post description!' }]}
                initialValue={post?.description}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content:"
                name="content"
                rules={[{ required: true, message: 'Please input your Content!' }]}
                initialValue={post?.content}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Date:"
                name="date"
                rules={[{ required: true, message: 'Please input the date!' }]}
                initialValue={post?.date}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="City:"
                rules={[{ required: true, message: 'Please input your City!' }]}
                initialValue={post?.city}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country:"
                rules={[{ required: true, message: 'Please input your Country!' }]}
                initialValue={post?.country}
              >
                <Input />
              </Form.Item>
            </Space>
            <Form.Item wrapperCol={{  span: 8, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        )}
      </Mutation>
    </Modal>
  )
}

const updatePost = gql`
  mutation updatePost($title: String!, $description: String!, $content: String!, $date: String!, $city: String!, $country: String!, $user: String!, $id: ID!) {
    updatePost(id: $id, title: $title, description: $description, content: $content, date: $date, city: $city, country: $country, user: $user) {
      id,
    }
  }
`;

const query = gql`
  query fetchUser($userId: ID!) {
    user(id: $userId) {
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

export default UpdatePostModal;
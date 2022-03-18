import React, { useRef } from "react";
import gql from 'graphql-tag';
import { graphql, Mutation } from "react-apollo";
import { Modal, Form, Input, Space, InputNumber, Button } from "antd";

const AddPostModal = (props) => {
  const addPostForm = useRef();
  const { userId, title, visible, onCancel, onOk } = props;
  const onFinish = (addPost) => (values) => {
    addPost(values);
    addPostForm.current.resetFields();
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
        mutation={addPost}
        variables={{
          title: '$title',
          description: '$description',
          content: '$content',
          date: '$date',
          city: '$city',
          country: '$country',
          userId,
        }}
      >
        {(addPostMutation) => (
          <Form
            ref={addPostForm}
            name="updateUser"
            onFinish={onFinish(addPostMutation)}
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
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description:"
                name="description"
                rules={[{ required: true, message: 'Please input the post description!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content:"
                name="content"
                rules={[{ required: true, message: 'Please input your Content!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Date:"
                name="date"
                rules={[{ required: true, message: 'Please input the date!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="City:"
                rules={[{ required: true, message: 'Please input your City!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country:"
                rules={[{ required: true, message: 'Please input your Country!' }]}
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

const addPost = gql`
  mutation addPost($title: String!, $description: String!, $content: String!, $date: String!, $city: String!, $country: String!, $userId: String!) {
    addPost(title: $title, description: $description, content: $content, date: $date, city: $city, country: $country, userId: $userId) {
      id,
      title,
      description,
      content,
      date,
      city,
      country
    }
  }
`;

export default graphql(addPost)(AddPostModal);
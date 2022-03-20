import React, { useRef } from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { Modal, Form, Input, Space, InputNumber, Button } from "antd";

const UpdateUserModal = (props) => {
  const formUpdate = useRef();
  const { userData, title, visible, onCancel, onOk } = props;
  const onFinish = (values) => {
    props.mutate({
      variables: {
        id: userData.id,
        ...values,
      },
      refetchQueries: [
        {
          query,
          variables: {
            id: userData.id
          }
        }
      ]
    });
    formUpdate.current.resetFields();
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
      width={400}
      destroyOnClose
    >
      <Form
        ref={formUpdate}
        name="updateUser"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Space
          direction="vertical"
        >
          <Form.Item
            name="firstName"
            label="First Name:"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
            initialValue={userData.firstName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Second Name:"
            name="secondName"
            rules={[{ required: true, message: 'Please input your Second Name!' }]}
            initialValue={userData.secondName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age:"
            name="age"
            rules={[{ required: true, message: 'Please input your Age!' }]}
            initialValue={userData.age}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Occupation:"
            name="occupation"
            rules={[{ required: true, message: 'Please input your Occupation!' }]}
            initialValue={userData.occupation}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City:"
            rules={[{ required: true, message: 'Please input your City!' }]}
            initialValue={userData.city}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country:"
            rules={[{ required: true, message: 'Please input your Country!' }]}
            initialValue={userData.country}
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
    </Modal>
  )
}



const update = gql`
mutation updateUser($id: ID!, $firstName: String, $secondName: String, $age: Int, $occupation: String, $city: String, $country: String) {
  updateUser(id: $id, firstName: $firstName, secondName: $secondName, age: $age, occupation: $occupation, city: $city, country: $country) {
    id,
    firstName,
    secondName,
    age,
    occupation,
    city,
    country
  }
}
`;

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

export default graphql(query)(graphql(update)(UpdateUserModal));
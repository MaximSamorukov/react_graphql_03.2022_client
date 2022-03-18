import React, { useState, useRef } from "react";
import { Button, Modal, Input, Form, InputNumber, Space } from "antd";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import './Header.css';

const Header = (props) => {
  const [visible, setVisible] = useState(false);
  const form = useRef();
  const onFinish = (values) => {
    props.mutate({
      variables: values,
      refetchQueries: [
        {
          query,
        }
      ]
    });
    form.current.resetFields();
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="header">
        <Button
          type="primary"
          onClick={() => setVisible(true)}
        >Add User</Button>
      </div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Add User"
        width={400}
        destroyOnClose
      >
        <Form
          ref={form}
          name="addUser"
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
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Second Name:"
              name="secondName"
              rules={[{ required: true, message: 'Please input your Second Name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Age:"
              name="age"
              rules={[{ required: true, message: 'Please input your Age!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Occupation:"
              name="occupation"
              rules={[{ required: true, message: 'Please input your Occupation!' }]}
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
      </Modal>
    </>
  )
}

const mutation = gql`
  mutation addUser($firstName: String!, $secondName: String!, $age: Int!, $occupation: String!, $city: String!, $country: String!) {
    addUser(firstName: $firstName, secondName: $secondName, age: $age, occupation: $occupation, city: $city, country: $country) {
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
        id
      }
    }
  }
`;

export default graphql(query)(graphql(mutation)(Header));
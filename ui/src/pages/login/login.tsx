import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../services/user";
import "./login.css";

const Login: React.FC = () => {
  return (
    <Row>
      <Col md={8}></Col>
      <Col md={8}>
        <Form
          name="normal_login"
          className="form-border"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <div className="title">Telegram Storage</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Link to={"/register"}> Register</Link>
        </Form>
      </Col>
      <Col md={8}></Col>
    </Row>
  );
};

export default Login;

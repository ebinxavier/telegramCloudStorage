import {
  LockOutlined,
  UserOutlined,
  ClusterOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../services/user";
import "./login.css";

const Register: React.FC = () => {
  return (
    <Row>
      <Col md={8}></Col>
      <Col md={8}>
        <Form
          name="normal_login"
          className="form-border-register"
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

          <Form.Item
            name="botToken"
            rules={[
              { required: true, message: "Please input Telegram Bot Token!" },
            ]}
          >
            <Input
              prefix={<ClusterOutlined />}
              placeholder="Telegram Bot Token"
            />
          </Form.Item>

          <Form.Item
            name="chatId"
            rules={[
              { required: true, message: "Please input Telegram Group ID!" },
            ]}
          >
            <Input prefix={<TeamOutlined />} placeholder="Telegram Group ID" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
          <Link to={"/login"}> Login</Link>
          <br />
          <a
            target={"_blank"}
            rel="noreferrer"
            href={
              "https://github.com/ebinxavier/telegramCloudStorage/blob/main/ui/public/help/help.md"
            }
          >
            Help
          </a>
        </Form>
      </Col>
      <Col md={8}></Col>
    </Row>
  );
};

export default Register;

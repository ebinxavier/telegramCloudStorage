import { Button, Divider, Layout, Skeleton, Tooltip } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import Navigator from "./navigator";
import { PoweroffOutlined } from "@ant-design/icons";
import { history } from "../services/common";
import { isMobile } from "react-device-detect";

const LayoutComponent: React.FC<any> = ({
  actions,
  children,
  path,
  loading,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/login");
  };
  return (
    <Layout className="layout">
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div>
          <div className="header-title">Telegram Storage</div>
          <div className="logout-btn">
            <Tooltip title="Logout">
              <Button
                onClick={handleLogout}
                danger
                type="primary"
                shape="circle"
                icon={<PoweroffOutlined />}
              />
            </Tooltip>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      </Header>
      <Content
        style={{ padding: isMobile ? "0 20px" : "0 50px", marginTop: 60 }}
      >
        <Navigator path={path || "/root"} />
        {actions}
        <div style={{ minHeight: "90vh" }}>
          {loading ? <Skeleton active style={{ marginTop: 20 }} /> : children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Divider />
        Made with ❤️ by <b>Epidemist</b>
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;

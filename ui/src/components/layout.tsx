import { Layout, Skeleton } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import Navigator from "./navigator";

const LayoutComponent: React.FC<any> = ({
  actions,
  children,
  path,
  loading,
}) => {
  return (
    <Layout className="layout">
      <Header>
        <span style={{ color: "white", fontWeight: "bold" }}>
          Telegram Storage
        </span>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Navigator path={path || "/root"} />
        {actions}
        <div style={{ minHeight: "90vh" }}>
          {loading ? <Skeleton active style={{ marginTop: 20 }} /> : children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Epidemist</Footer>
    </Layout>
  );
};

export default LayoutComponent;

import { HomeOutlined, FolderOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import "./components.css";

interface NavigatorProps {
  path: string;
}
const Navigator: React.FC<NavigatorProps> = ({ path }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pathList = path.slice(1).split("/");
  const tail = pathList[pathList.length - 1];
  const middleItems = pathList.slice(1, -1);

  const handleClick = (index: number) => {
    const completePath = "/" + pathList.slice(0, index + 1).join("/");
    setSearchParams({ path: completePath });
  };

  return (
    <Breadcrumb className="navigator-margin">
      <Breadcrumb.Item className="clickable" onClick={() => handleClick(0)}>
        <HomeOutlined />
        <span> Home</span>
      </Breadcrumb.Item>
      {middleItems.map((item, index) => {
        return (
          <Breadcrumb.Item
            key={item + index}
            className="clickable"
            onClick={() => handleClick(index + 1)}
          >
            <FolderOutlined />
            <span> {item}</span>
          </Breadcrumb.Item>
        );
      })}
      {tail !== "root" && (
        <Breadcrumb.Item>
          <FolderOutlined />
          <span>{tail}</span>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default Navigator;

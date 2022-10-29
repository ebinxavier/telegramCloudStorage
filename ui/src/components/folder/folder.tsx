import React from "react";
import { FolderOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import "./folder.css";

interface FolderProps {
  folderName: string;
  onClick: any;
}
const Folder: React.FC<FolderProps> = ({ folderName, onClick }) => {
  return (
    <span
      className={isMobile ? "folder folder-mobile" : "folder"}
      onDoubleClick={onClick}
      onClick={isMobile && onClick}
    >
      <span>
        <FolderOutlined size={30} className="folderIcon" />
      </span>
      <p>{folderName}</p>
    </span>
  );
};

export default Folder;

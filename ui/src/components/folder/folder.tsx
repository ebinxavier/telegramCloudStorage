import React from "react";
import { FolderOutlined } from "@ant-design/icons";
import "./folder.css";

interface FolderProps {
  folderName: string;
  onClick: any;
}
const Folder: React.FC<FolderProps> = ({ folderName, onClick }) => {
  return (
    <span className="folder" onDoubleClick={onClick}>
      <span>
        <FolderOutlined size={30} className="folderIcon" />
      </span>
      <span>{folderName}</span>
    </span>
  );
};

export default Folder;

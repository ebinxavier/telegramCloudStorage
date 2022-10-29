import React from "react";
import { FolderOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import "./folder.css";
import { shortenFileName } from "../../services/common";

interface FolderProps {
  folderName: string;
  onClick: any;
}
const Folder: React.FC<FolderProps> = ({ folderName, onClick }) => {
  return (
    <span
      className={isMobile ? "folder folder-mobile" : "folder"}
      onDoubleClick={onClick}
      onClick={isMobile ? onClick : undefined}
    >
      <span>
        <FolderOutlined size={30} className="folderIcon" />
      </span>
      <p>{shortenFileName(folderName, "folder", isMobile ? 12 : 20)}</p>
    </span>
  );
};

export default Folder;

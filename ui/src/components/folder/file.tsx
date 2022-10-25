import React, { useEffect, useState } from "react";
import { FileOutlined } from "@ant-design/icons";
import "./folder.css";
import { getDownloadURL } from "../../services/file";

interface FolderProps {
  fileName: string;
  onClick: any;
  thumbnail: string;
}
const File: React.FC<FolderProps> = ({ fileName, onClick, thumbnail }) => {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (thumbnail)
      getDownloadURL(thumbnail).then((image) => {
        setIcon(image.url);
      });
  }, [thumbnail]);

  return (
    <span className="file" onDoubleClick={onClick}>
      <div>
        {!thumbnail ? (
          <FileOutlined size={30} className="fileIcon" />
        ) : (
          <img src={icon} alt="thumbnail" />
        )}
      </div>
      <p>{fileName}</p>
    </span>
  );
};

export default File;

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import LayoutComponent from "../../components/layout";
import { listFolder } from "../../services/home";
import "../../components/components.css";
import { Empty } from "antd";
import AddFolder from "./addFolderModal";
import DeleteFolder from "./deleteFolderModal";
import UploadFile from "./uploadFileModal";

interface Folder {
  folderName: string;
  folders: Folder[];
  path: string;
}
const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [folderInfo, setFolderInfo] = useState<Folder>();
  const [folderLoading, setFolderLoading] = useState(false);
  const params = useParams();

  const handleFolderClick = (path: string) => {
    setSearchParams({ path });
  };

  useEffect(() => {
    const path = searchParams.get("path") || "/root";
    setFolderLoading(true);
    listFolder(path)
      .then((data) => {
        setFolderInfo(data as any);
      })
      .finally(() => {
        setFolderLoading(false);
      });
  }, [params, searchParams]);

  return (
    <LayoutComponent
      path={folderInfo?.path}
      loading={folderLoading}
      actions={
        <>
          <AddFolder updateList={setFolderInfo} />
          <UploadFile />
          <DeleteFolder updateList={setFolderInfo} />
        </>
      }
    >
      <br />
      <br />
      {!folderInfo?.folders?.length && (
        <Empty
          description="Empty folder"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {folderInfo?.folders?.map((folder) => (
        <p
          className="clickable"
          onClick={() => handleFolderClick(folder.path)}
          key={folder.folderName}
        >
          {folder.folderName}
        </p>
      ))}
    </LayoutComponent>
  );
};

export default Home;

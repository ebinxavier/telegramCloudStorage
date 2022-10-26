import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import LayoutComponent from "../../components/layout";
import { listFolder } from "../../services/folder";
import "../../components/components.css";
import { Divider, Empty } from "antd";
import AddFolder from "./addFolderModal";
import DeleteFolder from "./deleteFolderModal";
import UploadFile from "./uploadFileModal";
import FolderComponent from "../../components/folder/folder";
import FileComponent from "../../components/folder/file";
import { getDownloadURL } from "../../services/file";

interface File {
  fileName: string;
  content: any;
}
interface Folder {
  folderName: string;
  folders: Folder[];
  path: string;
  files: File[];
}

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [folderInfo, setFolderInfo] = useState<Folder>();
  const [folderLoading, setFolderLoading] = useState(false);
  const params = useParams();

  const handleFolderClick = (path: string) => {
    setSearchParams({ path });
  };

  const handleDownload = async (file: File) => {
    const fileId = file.content.file_id;
    const response = await getDownloadURL(fileId);
    window.open(response.url, "_self");
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
          <UploadFile updateList={setFolderInfo} />
          <DeleteFolder updateList={setFolderInfo} />
        </>
      }
    >
      {!folderInfo?.folders?.length && !folderInfo?.files?.length && (
        <Empty
          description="Empty folder"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {!!folderInfo?.folders?.length && <Divider />}
      {folderInfo?.folders?.map((folder) => (
        <FolderComponent
          key={folder.folderName}
          onClick={() => handleFolderClick(folder.path)}
          folderName={folder.folderName}
        />
      ))}

      {!!folderInfo?.files?.length && <Divider />}

      {folderInfo?.files?.map((file) => (
        <FileComponent
          key={file?.content?.file_unique_id}
          onClick={() => handleDownload(file)}
          fileName={file?.fileName}
          thumbnail={file?.content?.thumb?.file_id}
        />
      ))}
    </LayoutComponent>
  );
};

export default Home;

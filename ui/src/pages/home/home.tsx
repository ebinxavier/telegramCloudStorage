import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import LayoutComponent from "../../components/layout";
import { listFolder } from "../../services/folder";
import "../../components/components.css";
import "./home.css";
import { Divider, Empty } from "antd";
import AddFolder from "./modals/addFolderModal";

import FolderComponent from "../../components/folder/folder";
import FileComponent from "../../components/folder/file";
import { deleteFile, getDownloadURL } from "../../services/file";
import UploadFile from "./modals/uploadFileModal";
import DeleteFolder from "./modals/deleteFolderModal";
import { isMobile } from "react-device-detect";
import { showErrorMessage } from "../../services/common";
interface File {
  fileName: string;
  content: any;
  _id: string;
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
  const [previousPath, setPreviousPath] = useState("");
  const params = useParams();


  const getCurrentPath = useCallback(
    () => {
      return searchParams.get("path") || "/root";
    },
    [searchParams],
  )

  const handleFolderClick = (path: string) => {
    setSearchParams({ path });
  };

  const handleDownload = async (file: File) => {
    const fileId = file.content.file_id;
    const response = await getDownloadURL(fileId);
    window.open(response.url, "_self");
  };

  const handleDelete = async (file: File) => {
    try {
      const path = getCurrentPath();
      console.log(file, path);
      await deleteFile(path, file.content.file_id, file.content.message_id);
      if (folderInfo) {
        const files = [...folderInfo?.files];
        files.splice(files?.findIndex(f => f === file), 1);
        setFolderInfo({ ...folderInfo, files });
      }
    } catch (e) {
      showErrorMessage("An error occurred", "Error while deleting the file!")
    }
  };


  const updateFolder = (path: string) => {
    setFolderLoading(true);
    listFolder(path)
      .then((data) => {
        setFolderInfo(data as any);
      })
      .finally(() => {
        setFolderLoading(false);
      });
  }

  useEffect(() => {
    const path = getCurrentPath();
    if (previousPath !== path) {
      setPreviousPath(path);
      updateFolder(path);
    }
  }, [params, getCurrentPath, previousPath]);

  return (
    <LayoutComponent
      path={folderInfo?.path}
      loading={folderLoading}
      actions={
        <div className={isMobile ? "header-btns" : ""}>
          <AddFolder updateList={setFolderInfo} />
          <UploadFile updateList={setFolderInfo} />
          <DeleteFolder updateList={setFolderInfo} />
        </div>
      }
    >
      {!folderInfo?.folders?.length && !folderInfo?.files?.length && (
        <Empty
          description="Empty folder"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {!!folderInfo?.folders?.length && <Divider />}
      <div className={isMobile ? "center" : ""}>
        {folderInfo?.folders?.map((folder) => (
          <FolderComponent
            key={folder.folderName}
            onClick={() => handleFolderClick(folder.path)}
            folderName={folder.folderName}
          />
        ))}
      </div>

      {!!folderInfo?.files?.length && <Divider />}
      <div className={isMobile ? "center" : ""}>
        {folderInfo?.files?.map((file) => <FileComponent
          key={file?._id}
          onDownload={() => handleDownload(file)}
          onDelete={() => handleDelete(file)}
          fileName={file?.fileName}
          thumbnail={file?.content?.thumb_url}
          file={file}
        />
        )}
      </div>
    </LayoutComponent>
  );
};

export default Home;

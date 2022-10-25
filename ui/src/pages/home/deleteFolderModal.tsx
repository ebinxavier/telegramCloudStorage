import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { deleteFolder } from "../../services/folder";

interface DeleteFolderProps {
  updateList: any;
}

const DeleteFolder: React.FC<DeleteFolderProps> = ({ updateList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmationPath, setConfirmationPath] = useState("");
  const [deleting, setDeleting] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const path = searchParams.get("path");
    if (path) {
      try {
        setDeleting(true);
        const response = await deleteFolder(path);
        const parentPath = path.split("/").slice(0, -1).join("/");
        console.log(response, parentPath);
        setSearchParams({ path: parentPath });
        setIsModalOpen(false);
        setConfirmationPath("");
      } catch (e) {
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ marginLeft: 10 }}
        danger
        type="primary"
        onClick={showModal}
      >
        <DeleteOutlined /> Delete Folder
      </Button>
      <Modal
        title="Delete Folder"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={searchParams.get("path") !== confirmationPath}
            key="submit"
            type="primary"
            danger
            loading={deleting}
            onClick={handleOk}
          >
            <DeleteOutlined /> Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete this folder and its child folders ?
        </p>
        <p>
          Type '<b>{searchParams.get("path")}</b>' to confirm delete
        </p>
        <Input
          placeholder="Confirm the folder path"
          onChange={(e) => setConfirmationPath(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default DeleteFolder;

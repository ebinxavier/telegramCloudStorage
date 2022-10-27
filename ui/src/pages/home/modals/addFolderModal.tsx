import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { makeFolder } from "../../../services/folder";

interface AddFolderProps {
  updateList: any;
}

const AddFolder: React.FC<AddFolderProps> = ({ updateList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [newFolderName, setNewFolderName] = useState("");
  const [creating, setCreating] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(newFolderName);
    const path = searchParams.get("path");
    if (path) {
      try {
        setCreating(true);
        const response = await makeFolder(path, newFolderName);
        console.log(response);
        updateList(response);
        setIsModalOpen(false);
      } catch (e) {
      } finally {
        setCreating(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <FolderAddOutlined /> Add Folder
      </Button>
      <Modal
        title="Add New Folder"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={!newFolderName}
            key="submit"
            type="primary"
            loading={creating}
            onClick={handleOk}
          >
            <FolderAddOutlined /> Add
          </Button>,
        ]}
      >
        <p>Location: '{searchParams.get("path")}'</p>
        <Input
          placeholder="New Folder name"
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default AddFolder;

import { Button, Modal } from "antd";
import { DownloadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const btnWidth = 30;
const FileMask = ({ onPreview, onDownload, fileSize, onDelete }: any) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <div style={{ marginTop: 50 }}>
      {onPreview && (
        <>
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={onPreview}
            style={{ marginRight: 10, width: btnWidth }}
          ></Button>
        </>
      )}
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        style={{ marginRight: 10, width: btnWidth }}
        onClick={onDownload}
      ></Button>
      <Button
        type="primary"
        danger
        onClick={() => setDeleteModalOpen(true)}
        icon={<DeleteOutlined />}
        style={{ width: btnWidth }}
      ></Button>

      <br />
      <br />
      {fileSize}
      <Modal
        title="Delete file"
        open={deleteModalOpen}
        onOk={onDelete}
        onCancel={() => setDeleteModalOpen(false)}
        destroyOnClose
        footer={[
          <Button type="primary" key="back" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            danger
            key="submit"
            type="primary"
            onClick={onDelete}
          >
            <DeleteOutlined /> Delete
          </Button>,
        ]}
      >
        Are you sure you want to delete this file ?
      </Modal>
    </div>
  );
};

export default FileMask;

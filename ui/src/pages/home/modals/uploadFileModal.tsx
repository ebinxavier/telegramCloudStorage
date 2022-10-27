import { Button, Modal } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import Uploader from "../../../components/uploader/uploader";

interface UploadFileProps {
  updateList?: any;
}

const UploadFile: React.FC<UploadFileProps> = ({ updateList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{ marginLeft: 10 }} type="primary" onClick={showModal}>
        <UploadOutlined /> Upload Files
      </Button>
      <Modal
        title="Upload files"
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
        width={"70vw"}
      >
        <Uploader
          path={searchParams.get("path") || "/root"}
          done={updateList}
        />
      </Modal>
    </>
  );
};

export default UploadFile;

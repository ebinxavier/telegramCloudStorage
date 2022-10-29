import { Button } from "antd";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";

const btnWidth = isMobile ? 50 : 80;
const FileMask = ({ onPreview, onDownload, fileSize }: any) => {
  return (
    <div style={{ marginTop: isMobile ? 50 : 100 }}>
      {onPreview && (
        <>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={onPreview}
            style={{ marginRight: 10, width: btnWidth }}
          ></Button>
        </>
      )}
      <Button
        type="primary"
        danger
        icon={<DownloadOutlined />}
        style={{ width: btnWidth }}
        onClick={onDownload}
      ></Button>
      <br />
      <br />
      {fileSize}
    </div>
  );
};

export default FileMask;

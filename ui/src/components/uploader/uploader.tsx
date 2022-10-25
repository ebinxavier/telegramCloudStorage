import "./styles.css";
import Dropzone from "react-dropzone-uploader";
import { baseURL } from "../../services/common";

interface UploaderProps {
  path: string;
}

const Uploader: React.FC<UploaderProps> = ({ path }) => {
  const getUploadParams = ({ file, meta }: any) => {
    const body = new FormData();
    body.append("file", file);
    body.append("path", path);
    return {
      // TODO: remove URL from here to endpoints.ts
      url: `${baseURL}/api/v1/file/upload`,
      body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
  };

  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(status, meta, file);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
    />
  );
};
export default Uploader;

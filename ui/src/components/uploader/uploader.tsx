import "./styles.css";
import Dropzone from "react-dropzone-uploader";
import { baseURL } from "../../services/common";
import { isMobile } from "react-device-detect";
import { UPLOAD_FILE } from "../../services/endpoints";

interface UploaderProps {
  path: string;
  done: any;
}


const Uploader: React.FC<UploaderProps> = ({ path, done }) => {
  const getUploadParams = ({ file, meta }: any) => {
    const body = new FormData();
    body.append("file", file);
    body.append("path", path);
    return {
      url: `${baseURL}${UPLOAD_FILE}`,
      body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
  };

  const handleChangeStatus = ({ meta, file, xhr }: any, status: any) => {
    if (status === "done") {
      done(JSON.parse(xhr.response));
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      inputContent={isMobile ? "Click to upload" : "Drag & Drop Files"}
    />
  );
};
export default Uploader;

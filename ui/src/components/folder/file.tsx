import React, { useEffect, useState } from "react";
import "./folder.css";
import { Image } from "antd";
import { getFileSize, history, shortenFileName } from "../../services/common";
import { isMobile } from "react-device-detect";
import FileMask from "./fileMask";
import { useParams } from "react-router-dom";

interface FolderProps {
  fileName: string;
  onDownload: any;
  onDelete: any;
  thumbnail: string;
  file: any;
}
const File: React.FC<FolderProps> = ({
  fileName,
  onDownload,
  onDelete,
  thumbnail,
  file,
}) => {
  const [icon, setIcon] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [hdImage, setHdImage] = useState("");
  const params = useParams();

  const handlePreviewClick = () => {
    setTimeout(() => {
      setHdImage(file?.content?.hd_url);
    })
    setOpenPreview(true);
  };

  useEffect(() => {
    if (file?.content?.mime_type?.includes("image")) {
      setIsImage(true);
    }
    if (thumbnail) {
      setTimeout(() => {
        setIcon(thumbnail);
      })
    }
  }, [file, thumbnail]);

  useEffect(() => {
    setTimeout(() => {
      if (history.location.hash !== "#preview") {
        setOpenPreview(false);
      }
    });
  }, [params]);

  useEffect(() => {
    // Adding navigation params for preview
    if (openPreview) {
      history.push(
        history.location.pathname +
        history.location.search +
        "#preview"
      );
    }
  }, [openPreview])


  return (
    <span className={isMobile ? "file file-mobile" : "file"}>
      <div>
        {
          <Image
            src={hdImage || icon || "fileIcon.png"}
            height={200}
            alt="thumbnail"
            preview={{
              bodyStyle: { backgroundColor: "black" },
              mask: (
                <FileMask
                  onPreview={icon && isImage && handlePreviewClick}
                  onDownload={onDownload}
                  onDelete={onDelete}
                  fileSize={getFileSize(file?.content?.file_size)}

                />
              ),
              visible: openPreview,
              onVisibleChange(value) {
                if (!value) {
                  setOpenPreview(false);
                  history.back();
                }
              },
            }}
          />
        }
      </div>
      <p>{shortenFileName(fileName, "file", isMobile ? 12 : 20)}</p>
    </span>
  );
};

export default File;

import React, { useEffect, useState } from "react";
import "./folder.css";
import { getDownloadURL } from "../../services/file";
import { Image, Skeleton } from "antd";
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
  const [loading, setLoading] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [hdImage, setHdImage] = useState("");
  const params = useParams();

  const handlePreviewClick = () => {
    const hdFileId = file?.content?.file_id;
    if (!hdImage && hdFileId) {
      getDownloadURL(hdFileId).then((image) => {
        setHdImage(image.url);
      });
    }
    setOpenPreview(true);
  };

  useEffect(() => {
    if (file?.content?.mime_type?.includes("image")) {
      setIsImage(true);
    }
    if (thumbnail) {
      getDownloadURL(thumbnail)
        .then((image) => {
          setIcon(image.url);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
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
        {loading ? (
          <Skeleton.Image
            className={
              isMobile ? "imageSkeleton imageSkeleton-mobile" : "imageSkeleton"
            }
            active
          />
        ) : (
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
        )}
      </div>
      <p>{shortenFileName(fileName, "file", isMobile ? 12 : 20)}</p>
    </span>
  );
};

export default File;

import { notification } from "antd";
import axios from "axios";
import { createBrowserHistory } from "history";

export const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

console.log("Env:", process.env.NODE_ENV);
type RequestMethod = "GET" | "POST";
interface RequestData {
  body?: any;
  queryParams?: any;
}

export const makeRequest = async (
  url: string,
  reqMethod: RequestMethod,
  reqData?: RequestData,
  onUploadProgress?: any,
  onDownloadProgress?: any
) => {
  try {
    const response = await axios({
      headers: {
        Authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      baseURL,
      url,
      method: reqMethod,
      data: reqData?.body,
      params: reqData?.queryParams,
      onUploadProgress,
      onDownloadProgress,
    });
    return response;
  } catch (e: any) {
    if (e.response.status === 401) {
      history.push("/login");
    }
    return {} as any;
  }
};

export const showErrorMessage = (title: string, description: string) => {
  notification.error({
    message: title,
    description,
  });
};

export const history = createBrowserHistory();

export const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken");
};

export const shortenFileName = (
  fileName: string,
  type: string = "file",
  length: number = 15
) => {
  const file = fileName.substring(0, length);
  if (type === "folder")
    return `${file}${fileName.length > length ? "..." : ""}`;
  try {
    const fileParts = fileName.split(".");
    const [extension] = fileParts.slice(-1);
    const fileNameWithoutExt = fileParts.slice(0, -1).join(".");
    return `${fileNameWithoutExt.substring(0, length)}.${extension}`;
  } catch (e) {
    return file;
  }
};

export const getFileSize = (size: number) => {
  size = Number(size);
  let unit = "KB";
  size = Math.ceil(size / 1000);
  if (size > 1000) {
    unit = "MB";
    size /= 1000;
    return `${size.toFixed(1)} ${unit}`;
  }
  return `${size} ${unit}`;
};

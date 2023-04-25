import { notification } from "antd";
import { message } from "antd";
import axios from "axios";
import { createBrowserHistory } from "history";

console.log("Env:", process.env.NODE_ENV);
type RequestMethod = "GET" | "POST";
interface RequestData {
  body?: any;
  queryParams?: any;
}

let cachedBaseURL: string;

const getBaseURLPromise = async () => {
  if (cachedBaseURL) {
    return cachedBaseURL;
  }
  const deployments = [
    "http://localhost:3000",
    ""
  ];

  return new Promise(async (resolve, reject) => {
    for (let URL of deployments) {
      try {
        await fetch(`${URL}/api/v1/healthy`);
        cachedBaseURL = URL;
        console.log("Server Found: ", URL);
        resolve(URL);
        break;
      } catch (e) {
        console.log(`${URL} not available!`, e);
      }
    }

    reject("No deployments found!");
  });
};

export const getBaseURL = () => cachedBaseURL;

export const makeRequest = async (
  url: string,
  reqMethod: RequestMethod,
  reqData?: RequestData,
  onUploadProgress?: any,
  onDownloadProgress?: any
) => {
  try {
    await getBaseURLPromise();
    const response = await axios({
      headers: {
        Authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      baseURL: cachedBaseURL,
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

export const showSuccessMessage = (description: string) => {
  message.success(description);
};

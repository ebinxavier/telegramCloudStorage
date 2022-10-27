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

export const shortenFileName = (fileName: string) => {
  const file = fileName.substring(0, 15);
  try {
    const fileParts = fileName.split(".");
    const [extension] = fileParts.slice(-1);
    const fileNameWithoutExt = fileParts.slice(0, -1).join(".");
    return `${fileNameWithoutExt.substring(0, 15)}.${extension}`;
  } catch (e) {
    return file;
  }
};

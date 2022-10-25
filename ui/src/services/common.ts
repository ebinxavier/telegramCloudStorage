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

export const makeRequest = (
  url: string,
  reqMethod: RequestMethod,
  reqData: RequestData,
  onUploadProgress?: any,
  onDownloadProgress?: any
) => {
  return axios({
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

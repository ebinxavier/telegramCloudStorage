import { makeRequest } from "./common";
import { DELETE_FILE, DOWNLOAD_FILE_URL } from "./endpoints";

export const getDownloadURL = async (fileId: string) => {
  try {
    const request = await makeRequest(DOWNLOAD_FILE_URL, "GET", {
      queryParams: {
        fileId,
      },
    });
    return request.data;
  } catch (e: any) {
    throw e;
  }
};

export const deleteFile = async (
  path: string,
  fileId: string,
  messageId: string
) => {
  try {
    const request = await makeRequest(DELETE_FILE, "POST", {
      body: {
        path,
        fileId,
        messageId,
      },
    });
    return request.data;
  } catch (e: any) {
    throw e;
  }
};

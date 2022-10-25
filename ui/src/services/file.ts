import { makeRequest, showErrorMessage } from "./common";
import { DOWNLOAD_FILE_URL } from "./endpoints";

export const getDownloadURL = async (fileId: string) => {
  try {
    const request = await makeRequest(DOWNLOAD_FILE_URL, "GET", {
      queryParams: {
        fileId,
      },
    });
    return request.data;
  } catch (e: any) {
    showErrorMessage("Make Folder Error", e?.response?.data?.message);
    throw e;
  }
};

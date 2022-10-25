import { makeRequest, showErrorMessage } from "./common";
import { DELETE_FOLDER, LIST_FOLDER, MAKE_FOLDER } from "./endpoints";

export const listFolder = async (path: string) => {
  const request = await makeRequest(LIST_FOLDER, "POST", {
    body: {
      path,
    },
  });
  return request.data;
};

export const makeFolder = async (path: string, folderName: string) => {
  try {
    const request = await makeRequest(MAKE_FOLDER, "POST", {
      body: {
        path,
        folderName,
      },
    });
    return request.data;
  } catch (e: any) {
    showErrorMessage("Make Folder Error", e?.response?.data?.message);
    throw e;
  }
};

export const deleteFolder = async (path: string) => {
  try {
    const request = await makeRequest(DELETE_FOLDER, "POST", {
      body: {
        path,
      },
    });
    return request.data;
  } catch (e: any) {
    showErrorMessage("Delete Folder Error", e?.response?.data?.message);
    throw e;
  }
};

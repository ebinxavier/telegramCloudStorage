import glob from "glob";
import fs from "fs";
import { downloadDocument, getDownloadURL, uploadDocument } from "./bot";
import path from "path";
import { download as downloadFile } from "./request";

const getFiles = (src, callback) => {
  glob(src + "/**/*", { nodir: true }, callback);
};

export const listAllFiles = (path): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    getFiles(path, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const saveSnapShot = (json) => {
  console.log("saving status...");
  fs.writeFileSync("docs.bkp.json", JSON.stringify(json, null, 2));
  try {
    fs.unlinkSync("docs.json");
  } catch (e) {
    console.log("No previous doc.json found!");
  }
  fs.renameSync("docs.bkp.json", "docs.json");
};

export const uploadDirectory = async (
  directory: string,
  updateSnapShotInterval: number = 10
) => {
  const snapShot = [];
  let updateIndex = 0;
  let fileIndex = 1;
  const files: string[] = await listAllFiles(directory);
  console.log(files.length + " files found");
  for (let fileName of files) {
    if (updateIndex > updateSnapShotInterval) {
      saveSnapShot(snapShot);
      updateIndex = 0;
    }
    const data = fs.readFileSync(path.resolve(fileName));
    console.log(`Uploading: ${fileName} [${fileIndex++}/${files.length}]`);
    const res = await uploadDocument(data, fileName);
    snapShot.push({
      file: fileName.replace(`${directory}/`, ""),
      fileId: res.document.file_id,
    });
  }
  saveSnapShot(snapShot);
};

export const downloadDirectory = async (
  docsFileName: string,
  outputDir: string
) => {
  try {
    fs.mkdirSync(outputDir);
  } catch (e) {
    console.log("Directory Exists! specify an empty directory");
    return;
  }
  let files;
  try {
    const data = fs.readFileSync(path.resolve(docsFileName));
    files = JSON.parse(data.toString());
  } catch (e) {
    console.log("File not found :", docsFileName);
    return;
  }
  let fileIndex = 1;
  for (let item of files) {
    const dir = item.file.substr(0, item.file.lastIndexOf("/"));
    fs.mkdirSync(`${outputDir}/${dir}`, { recursive: true });
    const file = await downloadDocument(item.fileId);
    console.log(`[${fileIndex++}/${files.length}]\t${outputDir}/${item.file}`);
    const url = getDownloadURL(file);
    await downloadFile(url, `${outputDir}/temp`);
    fs.renameSync(`${outputDir}/temp`, `${outputDir}/${item.file}`);
  }
};

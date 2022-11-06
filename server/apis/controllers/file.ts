import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  downloadDocument,
  getDownloadURL,
  removeDocument,
  uploadDocument,
} from "../../bot";
import { injectOwnerId } from "../middlewares";
import { addFile, removeFile } from "../../database/folder";
import mongoose from "mongoose";
import { FILE_STORAGE_PATH } from "../../constants";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(FILE_STORAGE_PATH, { recursive: true });
    cb(null, FILE_STORAGE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ dest: FILE_STORAGE_PATH, storage });

const file = express.Router();

file.use(injectOwnerId);

file.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      console.log("Saving...", req.file);
      const chatId = req.headers.chatId;
      const token = req.headers.token;
      const owner = req.headers.owner;
      const data = fs.readFileSync(req.file.path);
      const response = await uploadDocument(
        data,
        req.file.originalname,
        token,
        chatId
      );

      const fileSaved = response.document || response.sticker;

      console.log(fileSaved.thumb);
      const thumbFileId = fileSaved.thumb.file_id;
      const hdFileId = fileSaved.file_id;

      // Generating thumbnail url
      const thumbFilePath = await downloadDocument(thumbFileId, token);
      const thumbUrl = getDownloadURL(thumbFilePath, token);

      // Generating HD url
      const hdFilePath = await downloadDocument(hdFileId, token);
      const hdUrl = getDownloadURL(hdFilePath, token);

      const updatedFolder = await addFile(
        new mongoose.Types.ObjectId(owner as string),
        req.body.path,
        req.file.originalname,
        {
          ...fileSaved, // some file will treated as stickers eg: *.webp
          message_id: response.message_id,
          thumb_url: thumbUrl,
          hd_url: hdUrl,
        }
      );
      // removing temp file form server
      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.log(`Unable to remove temp file: ${req.file.path}!`);
        }
        res.send(updatedFolder);
      });
    } catch (e) {
      res.status(500).send({
        e,
        message: e?.message,
      });
    }
  }
);

file.get("/download", async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;
    const filePath = await downloadDocument(req.query.fileId, token);
    const url = getDownloadURL(filePath, token);
    res.send({ url });
  } catch (e) {
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

file.post("/remove", async (req: Request, res: Response) => {
  try {
    const token = req.headers.token;
    const owner = req.headers.owner;
    const chatId = req.headers.chatId;

    const path = req.body.path;
    const fileId = req.body.fileId; // mongoID
    const messageId = req.body.messageId; // telegramID

    // Remove from MongoDB
    await removeFile(
      new mongoose.Types.ObjectId(owner as string),
      path,
      fileId
    );
    // Remove from Telegram
    const tgResponse = await removeDocument(messageId, token, chatId);
    res.send({ folder: tgResponse });
  } catch (e) {
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

export default file;

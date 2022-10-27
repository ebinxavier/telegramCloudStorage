import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { downloadDocument, getDownloadURL, uploadDocument } from "../../bot";
import { injectOwnerId } from "../middlewares";
import { addFile } from "../../database/folder";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ dest: "uploads/", storage });

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
      const updatedFolder = await addFile(
        new mongoose.Types.ObjectId(owner as string),
        req.body.path,
        req.file.originalname,
        response.document
      );
      res.send(updatedFolder);
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

export default file;

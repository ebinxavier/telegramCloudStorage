import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { listFolder, makeFolder, removeFolder } from "../../database/folder";
import { injectOwnerId } from "../middlewares";
const folder = express.Router();

folder.use(injectOwnerId);

folder.post("/ls", async (req: Request, res: Response) => {
  try {
    const folder = await listFolder(
      new mongoose.Types.ObjectId(req.headers.owner as string),
      req.body.path
    );
    res.send(folder);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

folder.post("/mkdir", async (req: Request, res: Response) => {
  try {
    const folder = await makeFolder(
      new mongoose.Types.ObjectId(req.headers.owner as string),
      req.body.path,
      req.body.folderName
    );
    res.send(folder);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

folder.post("/rmdir", async (req: Request, res: Response) => {
  try {
    const status = await removeFolder(
      new mongoose.Types.ObjectId(req.headers.owner as string),
      req.body.path
    );
    res.send(status);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

export default folder;

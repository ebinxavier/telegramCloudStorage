import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import userController from "./controllers/user";
import folderController from "./controllers/folder";
import fileController from "./controllers/file";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

export const startAPIServer = () => {
  // API Endpoints
  app.use("/api/v1/user/", userController);
  app.use("/api/v1/folder/", folderController);
  app.use("/api/v1/file/", fileController);

  // Serving HTML
  app.use("/", express.static(path.join(__dirname, "../../ui/build")));

  app.get("*", (_req, res) => {
    console.log("url:", _req.url);
    res.sendFile(path.join(__dirname, "../../ui/build/index.html"));
  });

  app.listen(3000);
  console.log("Express started on port 3000");
};

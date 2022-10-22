import express from "express";
import bodyParser from "body-parser";

import userController from "./controllers/user";
import folderController from "./controllers/folder";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export const startAPIServer = () => {
  app.use("/api/v1/user/", userController);
  app.use("/api/v1/folder/", folderController);
  app.get("/", function (req, res) {
    res.send("Server is running!");
  });

  app.listen(3000);
  console.log("Express started on port 3000");
};

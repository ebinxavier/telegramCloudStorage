import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { getSecret } from "../utils";

export const injectOwnerId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization; // Bearer <token>
    const token = auth?.split(" ")[1];
    if (!token) {
      console.log("JWT token not found!");
      throw "";
    }
    const jwtSecret = getSecret("jwtSecret");
    const isValid = jwt.verify(token, jwtSecret);
    if (isValid) {
      const tokenInfo = jwt.decode(token);
      req.headers["owner"] = tokenInfo["id"];
      next();
    } else {
      console.log("Invalid Token!");
      throw "";
    }
  } catch (e) {
    console.log(e);
    res.status(401).send("Unauthorized!");
  }
};

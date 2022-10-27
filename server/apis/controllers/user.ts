import express from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY } from "../../constants";

import { deRegisterUser, loginUser, registerUser } from "../../database/user";
import { injectOwnerId } from "../middlewares";
const user = express.Router();

/**
 * POST: { body.username, body.password }
 */

user.post("/login", async (req: Request, res: Response) => {
  try {
    const secret = process.env.jwtSecret;
    if (!secret) {
      console.log("JWT Secret not defined in the env!");
      throw new Error("Internal server error");
    }
    const { id, chatId, token } = await loginUser(
      req.body.username,
      req.body.password
    );
    const JWTtoken = await jwt.sign({ id, chatId, token }, secret, {
      expiresIn: JWT_EXPIRY,
    });
    res.send({ token: JWTtoken });
  } catch (e) {
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

/**
 * POST: { body.username, body.password, body.botToken, body.chatId }
 */
user.post("/register", async (req: Request, res) => {
  try {
    const user = await registerUser(
      req.body.username,
      req.body.password,
      req.body.botToken,
      req.body.chatId
    );
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

/**
 * POST: { body.username, body.password }
 */
user.post("/deregister", async (req: Request, res) => {
  try {
    const done = await deRegisterUser(req.body.username, req.body.password);
    res.send({ done });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

export default user;

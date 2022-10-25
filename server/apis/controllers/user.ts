import express from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY } from "../../constants";

import { deRegisterUser, loginUser, registerUser } from "../../database/user";
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
    const id = await loginUser(req.body.username, req.body.password);
    const token = await jwt.sign({ id }, secret, {
      expiresIn: JWT_EXPIRY,
    });
    res.send({ token });
  } catch (e) {
    res.status(500).send({
      e,
      message: e?.message,
    });
  }
});

/**
 * POST: { body.username, body.password, body.botToken, body.tgChatId }
 */
user.post("/register", async (req: Request, res) => {
  try {
    const user = await registerUser(
      req.body.username,
      req.body.password,
      req.body.botToken || process.env.token,
      req.body.tgChatId || process.env.chatId
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

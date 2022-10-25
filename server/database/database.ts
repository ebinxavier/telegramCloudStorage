export { registerUser, loginUser } from "./user";
export { listFolder } from "./folder";

import mongoose from "mongoose";

export const MONGO_URL = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0.jld9cbs.mongodb.net/tgStorage`;

export const connect = () => {
  console.log("Connecting to DB...");
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));
};

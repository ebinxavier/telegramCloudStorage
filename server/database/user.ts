import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { makeFolderModel, FolderModel } from "./folder";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
  },
  password: String,
  botToken: { type: String, required: true },
  chatId: { type: String, required: true },
  createdDate: Date,
  rootFolder: {
    type: Schema.Types.ObjectId,
    ref: "FolderSchema",
  },
});

// Compile model from schema
const UserModel = mongoose.model("UserModel", UserSchema);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const validatePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export interface UserDTO {
  username: string;
  password: string;
  botToken: string;
  chatId: string;
  _id: mongoose.Types.ObjectId;
  createdDate: Date;
  rootFolder: mongoose.Types.ObjectId;
}

export const registerUser = async (
  username: string,
  password: string,
  botToken: string,
  chatId: string
): Promise<UserDTO> => {
  try {
    const hash = await hashPassword(password);
    // Creating new user
    const userModel = new UserModel({
      username,
      password: hash,
      botToken,
      chatId,
      createdDate: new Date(),
    });
    const userData = await userModel.save();
    // Creating root folder model
    const rootFolder = await makeFolderModel(userData._id, "", "root", null);
    await userModel.update(
      {
        rootFolder,
      },
      { upsert: true }
    );
    const response: UserDTO = userData.toJSON();
    delete response.password;
    console.log(`User "${username}" registered!`);
    return response;
  } catch (e) {
    console.log("Error while registering user");
    throw e;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ id: mongoose.Types.ObjectId; token: string; chatId: string }> => {
  try {
    const record = await UserModel.findOne({ username });
    if (record) {
      const isValid = await validatePassword(
        password,
        record.password as string
      );
      if (isValid) {
        console.log("Login success!", record._id);
        return {
          id: record._id,
          token: record.botToken as string,
          chatId: record.chatId as string,
        };
      } else {
        console.log("Wrong pswd!");
        throw new Error("Login Error!");
      }
    } else {
      console.log("No such user!");
      throw new Error("No such user!");
    }
  } catch (e) {
    console.log("Error while login!");
    throw e;
  }
};

export const deRegisterUser = async (
  username: string,
  password: string
): Promise<Boolean> => {
  try {
    const record = await UserModel.findOne({ username });
    if (record) {
      const isValid = await validatePassword(
        password,
        record.password as string
      );
      if (isValid) {
        console.log("Login success!");
        try {
          const owner = record._id;
          await record.delete();
          console.log(`User "${username}" deleted!`);
          console.log(`Deleting all the folder of ${username}`);
          const deleteResult = await FolderModel.deleteMany({
            owner,
          });
          console.log(`Deleted all the folders of ${username}`, deleteResult);
          return true;
        } catch (e) {
          console.log("Error", e);
          throw e;
        }
      } else {
        console.log("Login Error!");
        throw new Error("Login Error!");
      }
    } else {
      console.log("No such user!");
      throw new Error("No such user!");
    }
    return false;
  } catch (e) {
    console.log("Error while login!", e);
    throw e;
  }
};

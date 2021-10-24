import mongoose from "mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "../../utils/interfaces";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", UserSchema);
export default User;

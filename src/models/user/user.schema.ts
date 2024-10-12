import { Schema, model } from "mongoose";
import { IUser } from "../../interface/IUser";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, maxlength: 150 },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  avatar: { type: String, default: "N/A" },
  refreshToken: { type: String, default: null },

  invitation_token: { type: String, default: null },

  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);

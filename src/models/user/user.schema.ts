import { Schema, model } from "mongoose";
import { IUser } from "../../interface/IUser";

const userSchema = new Schema<IUser>(
  {
    team_id: { type: Schema.Types.ObjectId, ref: "Team" },

    name: { type: String, required: true, maxlength: 150 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "N/A" },

    refreshToken: { type: String, default: null },
    invitationToken: { type: String, default: null },
    resetToken: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);

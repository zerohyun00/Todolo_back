import mongoose, { Document, Types } from "mongoose";

export interface IProject extends Document<Types.ObjectId> {
  user_id: mongoose.Types.ObjectId;
  title: string;
  team_member_id: mongoose.Types.ObjectId[];
  team_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectInputDTO {
  title: string;
  team_id: mongoose.Types.ObjectId;
  team_member_id: mongoose.Types.ObjectId[];
}

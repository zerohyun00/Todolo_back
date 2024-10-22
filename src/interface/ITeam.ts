import mongoose, { Document } from "mongoose";

export interface ITeam extends Document<mongoose.Types.ObjectId> {
  user_id: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  projects: mongoose.Types.ObjectId[];
  team: "1팀" | "2팀" | "3팀" | "4팀";
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeamInput {
  user_id: mongoose.Types.ObjectId;
  members?: mongoose.Types.ObjectId[];
  projects?: mongoose.Types.ObjectId[];
  team: "1팀" | "2팀" | "3팀" | "4팀";
}

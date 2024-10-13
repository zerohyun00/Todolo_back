import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],

  team: { type: String, enum: ["1팀", "2팀", "3팀", "4팀"], required: true },

  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },

  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

  taskStatuses: [{ type: Schema.Types.ObjectId, ref: "TaskStatus" }],
});

export const Team = model("Team", teamSchema);

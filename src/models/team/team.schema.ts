import { Schema, model } from "mongoose";
import { ITeam } from "../../interface/ITeam";

const teamSchema = new Schema<ITeam>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

    team: { type: String, enum: ["1팀", "2팀", "3팀", "4팀"], required: true },
  },
  { timestamps: true }
);

export const Team = model<ITeam>("Team", teamSchema);

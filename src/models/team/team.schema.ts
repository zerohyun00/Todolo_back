import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // 팀 추가
  team: { type: String, enum: ["1팀", "2팀", "3팀", "4팀"], required: true },
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Team = model("Team", teamSchema);

// name: { type: String, required: true, maxlength: 150 },
// email: { type: String, required: true, maxlength: 150 },

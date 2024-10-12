import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 팀을 만든 사용자
  team: { type: String, enum: ['1팀', '2팀', '3팀', '4팀'], required: true }, // 팀명
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 팀에 속한 유저들
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Team = model('Team', teamSchema);

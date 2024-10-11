import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 프로젝트 생성자
  title: { type: String, required: true, maxlength: 150 },
  team_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 프로젝트에 속한 팀원의 ID 목록
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Project = model('Project', projectSchema);

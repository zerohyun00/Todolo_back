import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team_id: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    projectColor: { type: String },
    title: { type: String, required: true, maxlength: 150 },
  },
  { timestamps: true },
);

export const Project = model('Project', projectSchema);

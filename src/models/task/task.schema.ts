import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  crew_member: [{ type: String, required: true, maxlength: 150, default: null }],
  title: { type: String, required: true, maxlength: 150 },
  content: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Task = model('Task', taskSchema);

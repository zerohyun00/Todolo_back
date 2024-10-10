import { Schema, model } from "mongoose";
import { ITask } from "../../interface/ITask";

const taskSchema = new Schema<ITask>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },

  title: { type: String, required: true, maxlength: 150 },
  content: { type: String, required: true },

  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Task = model<ITask>("Task", taskSchema);

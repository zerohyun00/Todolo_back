import { Schema, model } from "mongoose";
import { ITask } from "../../interface/ITask";
import { IComment } from "../../interface/IComment";

const commentSchema = new Schema<IComment>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment_content: { type: String, required: true },
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

const taskSchema = new Schema<ITask>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  task_member: [{ type: Schema.Types.ObjectId, ref: "User" }],

  title: { type: String, required: true, maxlength: 150 },
  content: { type: String, required: true },

  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },

  status: {
    type: String,
    enum: ["할 일", "진행중", "완료"],
    default: "할 일",
  },
  priority: {
    type: String,
    enum: ["높음", "중간", "낮음"],
    default: "중간",
  },
  comments: [commentSchema],

  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Task = model<ITask>("Task", taskSchema);

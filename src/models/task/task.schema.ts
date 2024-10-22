import { Schema, model } from "mongoose";
import { ITask } from "../../interface/ITask";
import { IComment } from "../../interface/IComment";

const commentSchema = new Schema<IComment>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    commentContent: { type: String, required: true },
  },
  { timestamps: true }
);

const taskSchema = new Schema<ITask>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    taskMember: [{ type: Schema.Types.ObjectId, ref: "User" }],

    title: { type: String, required: true, maxlength: 150 },
    content: { type: String, required: true },

    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },

    status: {
      type: String,
      enum: ["할 일", "진행 중", "완료"],
      default: "할 일",
    },
    priority: {
      type: String,
      enum: ["높음", "중간", "낮음"],
      default: "중간",
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);

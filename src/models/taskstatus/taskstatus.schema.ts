import mongoose, { Schema } from "mongoose";

const taskStatusSchema = new Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  status: {
    type: String,
    enum: ["할 일", "진행중", "완료"],
    default: null,
  },
  priority: {
    type: String,
    enum: ["높음", "중간", "낮음"],
    default: null,
  },
  crew_member: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task_Status", taskStatusSchema);

/*
영어로 바꾸는 것 고려
  status: {
    type: String,
    enum: ["To-do", "Progress", "Completed"],
    default: null,
  },
  priority: {
    type: String,
    enum: ["high", "middle", "Low"],
    default: null,
  },


*/

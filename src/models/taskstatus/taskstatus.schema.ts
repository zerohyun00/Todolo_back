// import { Schema, model } from "mongoose";

// const taskStatusSchema = new Schema({
//   task_id: { type: Schema.Types.ObjectId, ref: "Task" },
//   task_member: [{ type: Schema.Types.ObjectId, ref: "User" }],

//   start_date: { type: Date, default: null },
//   end_date: { type: Date, default: null },

//   status: {
//     type: String,
//     enum: ["할 일", "진행중", "완료"],
//     default: null,
//   },
//   priority: {
//     type: String,
//     enum: ["높음", "중간", "낮음"],
//     default: null,
//   },

//   created_AT: { type: Date, default: Date.now },
//   updated_AT: { type: Date, default: Date.now },
// });

// export const TaskStatus = model("TaskStatus", taskStatusSchema);

// /*
// 영어로 바꾸는 것 고려
//   status: {
//     type: String,
//     enum: ["To-do", "Progress", "Completed"],
//     default: null,
//   },
//   priority: {
//     type: String,
//     enum: ["high", "middle", "Low"],
//     default: null,
//   },

// */

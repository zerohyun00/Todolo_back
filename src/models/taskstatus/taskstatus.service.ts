// import { Types } from "mongoose";
// import { TaskStatus } from "./taskstatus.schema";

// const TaskStatusService = {
//   createTaskStatus: async (taskId: Types.ObjectId, taskStatusData: any) => {
//     const taskStatus = new TaskStatus({
//       taskId,
//       start_date: taskStatusData.start_date || new Date(),
//       end_date: taskStatusData.end_date || null,
//       status: taskStatusData.status || "할일",
//       priority: taskStatusData.priority || null,
//       task_member: taskStatusData.task_member,
//     });
//     return await taskStatus.save();
//   },

//   updateTaskStatus: async (taskId: Types.ObjectId, updateData: any) => {
//     return await TaskStatus.findOneAndUpdate(
//       { taskId },
//       {
//         status: updateData.status || undefined,
//         priority: updateData.priority || undefined,
//         start_date: updateData.start_date || undefined,
//         end_date: updateData.end_date || undefined,
//         task_member: updateData.task_member || undefined,
//         updatedAt: new Date(),
//       },
//       { new: true }
//     );
//   },

//   deleteTaskStatus: async (taskId: Types.ObjectId) => {
//     return await TaskStatus.findOneAndDelete({ taskId });
//   },

//   // 상태에 따라 검색기능 넣을지 말지 고려
//   findTasksByStatus: async (status: string) => {
//     return await TaskStatus.aggregate([
//       {
//         $match: { status: status },
//       },
//       {
//         $lookup: {
//           from: "tasks",
//           localField: "taskId",
//           foreignField: "_id",
//           as: "taskInfo",
//         },
//       },
//       {
//         $unwind: "$taskInfo",
//       },
//       {
//         $project: {
//           _id: "$taskInfo._id",
//           title: "$taskInfo.title",
//           content: "$taskInfo.content",
//           start_date: "$start_date",
//           end_date: "$end_date",
//           status: "$status",
//           priority: "$priority",
//           createdAt: "$taskInfo.createdAt",
//           updatedAt: "$taskInfo.updatedAt",
//         },
//       },
//     ]);
//   },
// };

// export default TaskStatusService;

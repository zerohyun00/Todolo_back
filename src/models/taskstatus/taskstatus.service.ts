import { Types } from "mongoose";
import Task_Status from "./taskstatus.schema";

const TaskStatusService = {
  createTaskStatus: async (taskId: Types.ObjectId, taskStatusData: any) => {
    const taskStatus = new Task_Status({
      taskId,
      startDate: taskStatusData.startDate || new Date(),
      endDate: taskStatusData.endDate || null,
      status: taskStatusData.status || "할일",
      priority: taskStatusData.priority || null,
      crew_member: taskStatusData.crew_member,
    });
    return await taskStatus.save();
  },

  updateTaskStatus: async (taskId: Types.ObjectId, updateData: any) => {
    return await Task_Status.findOneAndUpdate(
      { taskId },
      {
        status: updateData.status || undefined,
        priority: updateData.priority || undefined,
        startDate: updateData.startDate || undefined,
        endDate: updateData.endDate || undefined,
        crew_member: updateData.crew_member || undefined,
        updatedAt: new Date(),
      },
      { new: true }
    );
  },

  deleteTaskStatus: async (taskId: Types.ObjectId) => {
    return await Task_Status.findOneAndDelete({ taskId });
  },

  // 상태에 따라 검색기능 넣을지 말지 고려
  findTasksByStatus: async (status: string) => {
    return await Task_Status.aggregate([
      {
        $match: { status: status },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "taskInfo",
        },
      },
      {
        $unwind: "$taskInfo",
      },
      {
        $project: {
          _id: "$taskInfo._id",
          title: "$taskInfo.title",
          content: "$taskInfo.content",
          startDate: "$startDate",
          endDate: "$endDate",
          status: "$status",
          priority: "$priority",
          createdAt: "$taskInfo.createdAt",
          updatedAt: "$taskInfo.updatedAt",
        },
      },
    ]);
  },
};

export default TaskStatusService;

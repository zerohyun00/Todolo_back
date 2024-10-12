import { Task } from "./task.schema";
import { ITaskInputDTO } from "../../interface/ITask";
import { Types } from "mongoose";
import TaskStatusService from "../taskstatus/taskstatus.service";
import Task_Status from "../taskstatus/taskstatus.schema";
import { ICommentInputDTO } from "../../interface/IComment";
import { Project } from "../project/project.schema";

const TaskService = {
  createTask: async (taskData: ITaskInputDTO) => {
    const task = new Task({
      user_id: taskData.user_id,
      project_id: taskData.project_id,
      title: taskData.title,
      content: taskData.content,
    });
    const savedTask = await task.save();

    await TaskStatusService.createTaskStatus(savedTask._id, taskData);

    return savedTask;
    // 유저가 아니라면 생성못하도록 에러
  },

  updateTask: async (taskId: Types.ObjectId, updateData: ITaskInputDTO) => {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: updateData.title,
        content: updateData.content,
      },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }

    if (
      updateData.status ||
      updateData.priority ||
      updateData.startDate ||
      updateData.endDate ||
      updateData.crew_member
    ) {
      await TaskStatusService.updateTaskStatus(taskId, updateData);
    }

    return updatedTask;
  },

  deleteTask: async (taskId: Types.ObjectId) => {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }

    await TaskStatusService.deleteTaskStatus(taskId);

    return deletedTask;
  },

  findTaskById: async (taskId: Types.ObjectId) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }
    return task;
  },

  // 룩업 이게 맞는지 더블체크 뎁스가 너무 많음
  findTask: async (taskId: Types.ObjectId) => {
    const taskWithStatus = await Task.aggregate([
      {
        $match: { _id: taskId },
      },
      {
        $lookup: {
          from: "task_statuses",
          localField: "_id",
          foreignField: "taskId",
          as: "statusInfo",
        },
      },
      {
        $unwind: "$statusInfo",
      },
      {
        $lookup: {
          from: "users",
          localField: "statusInfo.crew_member",
          foreignField: "_id",
          as: "crewMembers",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "statusInfo.crew_member",
          foreignField: "user_id",
          as: "crewMemberTeams",
        },
      },

      {
        $project: {
          title: 1,
          content: 1,
          statusInfo: {
            _id: "$statusInfo._id",
            startDate: "$statusInfo.startDate",
            endDate: "$statusInfo.endDate",
            status: "$statusInfo.status",
            priority: "$statusInfo.priority",
            crewMembers: {
              $map: {
                input: "$crewMembers",
                as: "crewMember",
                in: {
                  _id: "$$crewMember._id",
                  name: "$$crewMember.name",
                  email: "$$crewMember.email",
                  team: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: {
                            $filter: {
                              input: "$crewMemberTeams",
                              as: "team",
                              cond: {
                                $eq: ["$$team.user_id", "$$crewMember._id"],
                              },
                            },
                          },
                          as: "team",
                          in: "$$team.team",
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
          createdAt: "$statusInfo.createdAt",
          updatedAt: "$statusInfo.updatedAt",
        },
      },
    ]);

    if (!taskWithStatus || taskWithStatus.length === 0) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }

    return taskWithStatus[0];
  },

  getAllTasks: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const tasksWithStatus = await Task.aggregate([
      {
        $lookup: {
          from: "task_statuses",
          localField: "_id",
          foreignField: "taskId",
          as: "statusInfo",
        },
      },
      {
        $unwind: "$statusInfo",
      },
      {
        $lookup: {
          from: "users",
          localField: "statusInfo.crew_member",
          foreignField: "_id",
          as: "crewMembers",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          statusInfo: {
            startDate: 1,
            endDate: 1,
            status: 1,
            priority: 1,
            crewMembers: {
              _id: 1,
              name: 1,
              email: 1,
            },
          },
          createdAt: "$statusInfo.createdAt",
          updatedAt: "$statusInfo.updatedAt",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!tasksWithStatus || tasksWithStatus.length === 0) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }

    const totalTasks = await Task.countDocuments();

    return {
      tasks: tasksWithStatus,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    };
  },

  findTasksByStatus: async (status: string) => {
    return await Task_Status.aggregate([
      {
        $match: { status },
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
        $lookup: {
          from: "users",
          localField: "crew_member",
          foreignField: "_id",
          as: "crewMembers",
        },
      },
      {
        $project: {
          "taskInfo.title": 1,
          "taskInfo.content": 1,
          startDate: 1,
          endDate: 1,
          status: 1,
          priority: 1,
          crewMembers: {
            _id: 1,
            name: 1,
            email: 1,
          },
        },
      },
    ]);
  },

  addComment: async (
    taskId: Types.ObjectId,
    userId: Types.ObjectId,
    commentData: ICommentInputDTO
  ) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Not Found+업무를 찾을 수 없습니다.");

    const project = await Project.findById(task.project_id);
    if (!project) throw new Error("Not Found+프로젝트를 찾을 수 없습니다.");

    const isParticipant = project.team_member_id.some(
      (participantId) => participantId.toString() === userId.toString()
    );

    if (!isParticipant)
      throw new Error("Forbidden+댓글을 작성할 권한이 없습니다.");

    const comment = {
      _id: new Types.ObjectId(),
      user_id: userId,
      comment_content: commentData.comment_content,
      created_AT: new Date(),
      updated_AT: new Date(),
    };

    task.comments?.push(comment);
    await task.save();

    return comment;
  },

  getComments: async (taskId: Types.ObjectId) => {
    const taskWithComments = await Task.aggregate([
      { $match: { _id: taskId } },
      { $unwind: "$comments" },
      {
        $lookup: {
          from: "users",
          localField: "comments.user_id",
          foreignField: "_id",
          as: "commentUser",
        },
      },
      { $unwind: "$commentUser" },
      {
        $group: {
          _id: "$_id",
          comments: {
            $push: {
              _id: "$comments._id",
              user_id: "$comments.user_id",
              comment_content: "$comments.comment_content",
              created_AT: "$comments.created_AT",
              updated_AT: "$comments.updated_AT",
              user: {
                _id: "$commentUser._id",
                name: "$commentUser.name",
                email: "$commentUser.email",
              },
            },
          },
        },
      },
    ]);

    if (!taskWithComments || taskWithComments.length === 0) {
      throw new Error("Not Found+업무를 찾을 수 없습니다.");
    }

    return taskWithComments[0].comments;
  },

  updateComment: async (
    taskId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
    commentData: ICommentInputDTO
  ) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Not Found+업무를 찾을 수 없습니다.");

    const comment = task.comments?.id(commentId);
    if (!comment) throw new Error("Not Found+댓글을 찾을 수 없습니다.");

    if (comment.user_id.toString() !== userId.toString())
      throw new Error("Forbidden+댓글을 수정할 권한이 없습니다.");

    comment.comment_content = commentData.comment_content;
    comment.updated_AT = new Date();

    await task.save();
    return comment;
  },

  deleteComment: async (
    taskId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Not Found+업무를 찾을 수 없습니다.");

    const comment = task.comments?.id(commentId) as any;
    if (!comment) throw new Error("Not Found+댓글을 찾을 수 없습니다.");

    if (comment.user_id.toString() !== userId.toString())
      throw new Error("Forbidden+댓글을 삭제할 권한이 없습니다.");

    comment.remove();
    await task.save();

    return { message: "댓글이 삭제되었습니다." };
  },
};

export default TaskService;

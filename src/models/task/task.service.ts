import { Task } from "./task.schema";
import { Project } from "../project/project.schema";
import { Team } from "../team/team.schema";
import { Types } from "mongoose";
import { ITaskInputDTO } from "../../interface/ITask";
import { ICommentInputDTO } from "../../interface/IComment";
import { AppError } from "../../middleware/error.handler.middleware";

const TaskService = {
  createTask: async (taskData: ITaskInputDTO, userId: string) => {
    let project;

    if (taskData.project_id) {
      project = await Project.findById(taskData.project_id);
      if (!project) {
        throw new AppError("Not Found", 404, "프로젝트를 찾을 수 없습니다.");
      }
    } else if (taskData.projectTitle) {
      const newProject = new Project({
        user_id: userId,
        title: taskData.projectTitle,
        team_id: taskData.team_id,
        projectColor: taskData.projectColor,
      });
      project = await newProject.save();

      await Team.findByIdAndUpdate(
        taskData.team_id,
        { $push: { projects: project._id } },
        { new: true, useFindAndModify: false }
      );
    } else {
      throw new AppError(
        "Bad Request",
        400,
        "프로젝트 ID나 프로젝트 제목이 필요합니다."
      );
    }
    const teamAggregation = await Team.aggregate([
      {
        $match: { _id: new Types.ObjectId(project.team_id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "teamMembers",
        },
      },
    ]);

    if (teamAggregation.length === 0) {
      throw new AppError("Not Found", 404, "해당 팀이 존재하지 않습니다.");
    }

    const team = teamAggregation[0];
    const isMember = team.teamMembers.some(
      (member: any) => member._id.toString() === userId
    );

    if (!isMember) {
      throw new AppError(
        "Unauthorized",
        401,
        "해당 팀의 멤버가 아니므로 업무를 생성할 수 없습니다."
      );
    }

    const task = new Task({
      user_id: userId,
      project_id: project._id,
      title: taskData.title,
      content: taskData.content,
      startDate: taskData.startDate,
      endDate: taskData.endDate,
      priority: taskData.priority,
      status: taskData.status,
      taskMember: taskData.taskMember,
    });

    const savedTask = await task.save();
    return savedTask;
  },

  updateTask: async (
    taskId: Types.ObjectId,
    updateData: ITaskInputDTO,
    userId: string
  ) => {
    const task = await Task.findById(taskId);
    // if (!task) {
    //   throw new Error("Not Found+해당 업무를 찾을 수 없습니다.");
    // }

    // 업무 작성자만 수정 가능함
    if (task!.user_id.toString() !== userId) {
      throw new AppError(
        "Unauthorized",
        401,
        "해당 업무를 수정할 권한이 없습니다."
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: updateData.title,
        content: updateData.content,
        startDate: updateData.startDate,
        endDate: updateData.endDate,
        priority: updateData.priority,
        status: updateData.status,
        taskMember: updateData.taskMember,
      },
      { new: true }
    );

    return updatedTask;
  },

  deleteTask: async (taskId: Types.ObjectId, userId: string) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError("Not Found", 404, "해당 업무를 찾을 수 없습니다.");
    }

    if (task.user_id.toString() !== userId) {
      throw new AppError(
        "Unauthorized",
        401,
        "해당 업무를 삭제할 권한이 없습니다."
      );
    }

    await Task.findByIdAndDelete(taskId);
    return { message: "업무가 성공적으로 삭제되었습니다." };
  },

  /*
  comment 생성 수정 삭제

  업무조회?
  
  
  */

  addComment: async (
    taskId: Types.ObjectId,
    commentData: ICommentInputDTO,
    userId: string
  ) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError("Not Found", 404, "해당 업무를 찾을 수 없습니다.");
    }

    const newComment = {
      user_id: userId,
      commentContent: commentData.commentContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    task.comments?.push(newComment as any);
    await task.save();

    return { message: "댓글이 성공적으로 추가되었습니다." };
  },
  updateComment: async (
    taskId: Types.ObjectId,
    commentId: Types.ObjectId,
    commentData: ICommentInputDTO,
    userId: string
  ) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError("Not Found", 404, "해당 업무를 찾을 수 없습니다.");
    }

    const comment = task.comments!.id(commentId);
    if (!comment) {
      throw new AppError("Not Found", 404, "해당 댓글을 찾을 수 없습니다.");
    }

    if (comment.user_id.toString() !== userId) {
      throw new AppError(
        "Unauthorized",
        401,
        "해당 댓글을 수정할 권한이 없습니다."
      );
    }

    comment.commentContent = commentData.commentContent;
    comment.updatedAt = new Date();

    await task.save();
    return { message: "댓글이 성공적으로 수정되었습니다.", task };
  },

  deleteComment: async (
    taskId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: string
  ) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError("Not Found", 404, "해당 업무를 찾을 수 없습니다.");
    }

    const commentIndex = task.comments!.findIndex((comment) =>
      comment._id.equals(commentId)
    );

    if (commentIndex === -1) {
      throw new AppError("Not Found", 404, "해당 댓글을 찾을 수 없습니다.");
    }

    const comment = task.comments![commentIndex];

    if (comment.user_id.toString() !== userId) {
      throw new AppError(
        "Unauthorized",
        401,
        "해당 댓글을 삭제할 권한이 없습니다."
      );
    }

    task.comments!.splice(commentIndex, 1);

    await task.save();

    return { message: "댓글이 성공적으로 삭제되었습니다.", task };
  },
};

export default TaskService;

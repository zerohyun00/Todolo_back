import { Task } from "./task.schema";
import { Project } from "../project/project.schema";
import { Team } from "../team/team.schema";
import { Types } from "mongoose";
import { ITaskInputDTO } from "../../interface/ITask";

const TaskService = {
  createTask: async (taskData: ITaskInputDTO, userId: string) => {
    const project = await Project.findById(taskData.project_id);

    if (!project) {
      throw new Error("프로젝트를 찾을 수 없습니다.");
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
          as: "team_members",
        },
      },
    ]);

    if (teamAggregation.length === 0) {
      throw new Error("해당 팀이 존재하지 않습니다.");
    }

    const team = teamAggregation[0];
    const isMember = team.team_members.some(
      (member: any) => member._id.toString() === userId
    );

    if (!isMember) {
      throw new Error("해당 팀의 멤버가 아니므로 업무를 생성할 수 없습니다.");
    }

    const task = new Task({
      user_id: userId,
      project_id: project._id,
      title: taskData.title,
      content: taskData.content,
      start_date: taskData.start_date,
      end_date: taskData.end_date,
      priority: taskData.priority,
      status: taskData.status,
      task_member: taskData.task_member,
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
    if (!task) {
      throw new Error("해당 업무를 찾을 수 없습니다.");
    }

    if (task.user_id.toString() !== userId) {
      throw new Error("해당 업무를 수정할 권한이 없습니다.");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: updateData.title,
        content: updateData.content,
        start_date: updateData.start_date,
        end_date: updateData.end_date,
        priority: updateData.priority,
        status: updateData.status,
        task_member: updateData.task_member,
      },
      { new: true }
    );

    return updatedTask;
  },

  deleteTask: async (taskId: Types.ObjectId, userId: string) => {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("해당 업무를 찾을 수 없습니다.");
    }

    if (task.user_id.toString() !== userId) {
      throw new Error("해당 업무를 삭제할 권한이 없습니다.");
    }

    await Task.findByIdAndDelete(taskId);
    return { message: "업무가 성공적으로 삭제되었습니다." };
  },

  /*
  comment 생성 수정 삭제

  업무조회?
  
  
  */
};

export default TaskService;

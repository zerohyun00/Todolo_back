import { IProjectInputDTO } from "../../interface/IProject";
import { AppError } from "../../middleware/error.handler.middleware";
import { Team } from "../team/team.schema";
import { Project } from "./project.schema";
import mongoose from "mongoose";

interface UpdateProjectData {
  title?: string;
  updated_at?: Date;
}

const ProjectService = {
  createProject: async (projectData: IProjectInputDTO, userId: string) => {
    const newProject = new Project({
      user_id: userId,
      title: projectData.title,
      team_id: projectData.team_id,
    });
    const savedProject = await newProject.save();

    await Team.findByIdAndUpdate(
      projectData.team_id,
      { $push: { projects: savedProject._id } },
      { new: true, useFindAndModify: false }
    );

    return savedProject;
  },

  updateProject: async (projectId: string, updateData: UpdateProjectData) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateData
      );
      if (!updatedProject) {
        if (!updatedProject) {
          throw new AppError("Not Found", 404, "프로젝트를 찾을 수 없습니다.");
        }
      }
      return updatedProject;
    } catch (err) {
      throw new AppError("Bad Request", 400, "프로젝트 수정 오류");
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      if (!deletedProject) {
        throw new AppError("Not Found", 404, "프로젝트를 찾을 수 없습니다.");
      }
      return deletedProject;
    } catch (err) {
      throw new AppError("Bad Request", 400, "프로젝트 삭제 오류");
    }
  },

  /*

  프로젝트 조회
  내가 포함된 프로젝트, 내가 만든 프로젝트
  (프로젝트안에는 업무가 포함되어 있음)


*/

  // 업무 조인 필요
  findProjectByUser: async (userId: string) => {
    try {
      const projects = await Project.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "teamMember_id",
            foreignField: "_id",
            as: "teamMembers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $project: {
            _id: 0,
            projectId: "$_id",
            title: 1,
            user_id: 1,
            "creator.name": 1,
            "creator.email": 1,
            created_at: 1,
            updated_at: 1,
            "teamMembers.name": 1,
            "teamMembers.email": 1,
          },
        },
      ]);

      if (!projects || projects.length === 0) {
        throw new AppError(
          "Not Found",
          404,
          "해당 유저의 프로젝트를 찾을 수 없습니다."
        );
      }

      return projects;
    } catch (err) {
      throw new AppError("Bad Request", 400, "프로젝트 조회 오류");
    }
  },

  getAllProjects: async () => {
    try {
      const projects = await Project.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            project_id: "$_id",
            title: 1,
            user_id: 1,
            name: 1,
            created_at: 1,
            updated_at: 1,
          },
        },
      ]);
      return projects;
    } catch (err) {
      throw new AppError("Bad Request", 400, "프로젝트 조회 오류");
    }
  },

  findProjectWithTasksByUser: async (userId: string) => {
    try {
      const projects = await Project.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "project_id",
            as: "tasks",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $project: {
            _id: 0,
            projectId: "$_id",
            title: 1,
            user_id: 1,
            "creator.name": 1,
            "creator.email": 1,
            created_at: 1,
            updated_at: 1,
            tasks: {
              taskId: "$_id",
              title: 1,
              content: 1,
              created_at: 1,
              updated_at: 1,
            },
          },
        },
      ]);

      if (!projects || projects.length === 0) {
        throw new AppError(
          "Not Found",
          404,
          "해당 유저의 프로젝트를 찾을 수 없습니다."
        );
      }

      return projects;
    } catch (err) {
      throw new AppError("Bad Request", 400, "프로젝트와 업무 조회 오류");
    }
  },
};
export default ProjectService;

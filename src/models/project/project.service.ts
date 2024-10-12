import { IProjectInputDTO } from "../../interface/IProject";
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
      team_member_id: projectData.team_member_id,
    });
    return await newProject.save();
  },

  updateProject: async (projectId: string, updateData: UpdateProjectData) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateData
      );
      if (!updatedProject) {
        if (!updatedProject) {
          throw new Error("Not Found+프로젝트를 찾을 수 없습니다.");
        }
      }
      return updatedProject;
    } catch (err) {
      throw new Error("Bad Request+프로젝트 수정 오류");
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      if (!deletedProject) {
        throw new Error("Not Found+프로젝트를 찾을 수 없습니다.");
      }
      return deletedProject;
    } catch (err) {
      throw new Error("Bad Request+프로젝트 삭제 오류");
    }
  },

  // 업무 조인 필요
  findProjectByUser: async (userId: string) => {
    try {
      const projects = await Project.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId), // 해당 유저가 생성한 프로젝트 찾기
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "team_member_id", // 프로젝트에 속한 팀원들의 ID
            foreignField: "_id", // User 컬렉션에서 참조할 필드
            as: "teamMembers", // 팀원들의 정보가 저장될 필드
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id", // 프로젝트 생성자의 ID
            foreignField: "_id", // User 컬렉션에서 참조할 필드
            as: "creator", // 생성자의 정보가 저장될 필드
          },
        },
        {
          $unwind: "$creator", // 생성자 정보
        },
        {
          $project: {
            _id: 0,
            projectId: "$_id", // _id를 projectId로 반환
            title: 1,
            user_id: 1,
            "creator.name": 1,
            "creator.email": 1,
            created_at: 1,
            updated_at: 1,
            "teamMembers.name": 1, // 팀원의 이름 정보
            "teamMembers.email": 1, // 팀원의 이메일 정보
          },
        },
      ]);

      if (!projects || projects.length === 0) {
        throw new Error("Not Found+해당 유저의 프로젝트를 찾을 수 없습니다.");
      }

      return projects; // 해당 유저의 모든 프로젝트와 팀원 정보 반환
    } catch (err) {
      throw new Error("Bad Request+프로젝트 조회 오류");
    }
  },

  getAllProjects: async () => {
    try {
      const projects = await Project.aggregate([
        {
          $lookup: {
            from: "users", // user 참조
            localField: "user_id", // Project에서 참조
            foreignField: "_id", // User에서 참조
            as: "user", // 필드 이름
          },
        },
        {
          $unwind: "$user", // 프로젝트와 사용자 연결
        },
        {
          // 프로젝트 안에 업무들이 들어있는데 표시해줄지 짜를지
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
      throw new Error("Bad Request+프로젝트 조회 오류");
    }
  },

  findProjectWithTasksByUser: async (userId: string) => {
    try {
      const projects = await Project.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId), // 해당 유저가 생성한 프로젝트 필터링
          },
        },
        {
          $lookup: {
            from: "tasks", // 참조할 컬렉션 이름 (Task 모델의 컬렉션 이름)
            localField: "_id", // Project의 _id를 기준으로
            foreignField: "project_id", // Task에서 매칭할 필드
            as: "tasks", // 결과로 반환될 필드 이름
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id", // 프로젝트 생성자 ID
            foreignField: "_id", // User에서 매칭할 필드
            as: "creator",
          },
        },
        {
          $unwind: "$creator", // 단일 생성자 정보 평탄화
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
        throw new Error("Not Found+해당 유저의 프로젝트를 찾을 수 없습니다.");
      }

      return projects; // 해당 유저의 모든 프로젝트와 각 프로젝트에 속한 업무 정보 반환
    } catch (err) {
      throw new Error("Bad Request+프로젝트와 업무 조회 오류");
    }
  },
};
export default ProjectService;

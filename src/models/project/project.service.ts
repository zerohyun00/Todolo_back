import { Project } from './project.schema';
import mongoose from 'mongoose';

interface UpdateProjectData {
  title?: string;
  updated_at?: Date;
}

const ProjectService = {
  createProject: async (data: { user_id: string; title: string }) => {
    try {
      const project = new Project(data);
      await project.save();

      return project;
    } catch (error) {
      throw new Error('프로젝트 생성 오류');
    }
  },

  updateProject: async (projectId: string, updateData: UpdateProjectData) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(projectId, updateData);
      if (!updatedProject) {
        throw new Error('프로젝트를 찾을 수 없습니다.');
      }
      return updatedProject;
    } catch (error) {
      throw new Error('프로젝트 수정 오류');
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      if (!deletedProject) {
        throw new Error('프로젝트를 찾을 수 없습니다.');
      }
      return deletedProject;
    } catch (error) {
      throw new Error('프로젝트 삭제 오류');
    }
  },

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
            from: 'users',
            localField: 'team_ids', // 프로젝트에 속한 팀원들의 ID
            foreignField: '_id', // User 컬렉션에서 참조할 필드
            as: 'teamMembers', // 팀원들의 정보가 저장될 필드
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id', // 프로젝트 생성자의 ID
            foreignField: '_id', // User 컬렉션에서 참조할 필드
            as: 'creator', // 생성자의 정보가 저장될 필드
          },
        },
        {
          $unwind: '$creator', // 생성자 정보
        },
        {
          $project: {
            _id: 0,
            projectId: '$_id', // _id를 projectId로 반환
            title: 1,
            user_id: 1,
            'creator.name': 1,
            'creator.email': 1,
            created_at: 1,
            updated_at: 1,
            'teamMembers.name': 1, // 팀원의 이름 정보
            'teamMembers.email': 1, // 팀원의 이메일 정보
          },
        },
      ]);

      if (!projects || projects.length === 0) {
        throw new Error('해당 유저의 프로젝트를 찾을 수 없습니다.');
      }

      return projects; // 해당 유저의 모든 프로젝트와 팀원 정보 반환
    } catch (error) {
      throw new Error('프로젝트 조회 오류');
    }
  },

  getAllProjects: async () => {
    try {
      const projects = await Project.aggregate([
        {
          $lookup: {
            from: 'users', // user 참조
            localField: 'user_id', // Project에서 참조
            foreignField: '_id', // User에서 참조
            as: 'user', // 필드 이름
          },
        },
        {
          $unwind: '$user', // 프로젝트와 사용자 연결
        },
        {
          $project: {
            _id: 0,
            project_id: '$_id',
            title: 1,
            user_id: 1,
            name: 1,
            created_at: 1,
            updated_at: 1,
          },
        },
      ]);
      return projects;
    } catch (error) {
      throw new Error(`Bad Request+ 프로젝트 조회 오류`);
    }
  },
};
export default ProjectService;

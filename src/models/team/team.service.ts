import mongoose from 'mongoose';
import { Team } from './team.schema';

export const TeamService = {
  findTeamInfo: async (teamId: string) => {
    const teamObjectId = new mongoose.Types.ObjectId(teamId);

    const result = await Team.aggregate([
      { $match: { _id: teamObjectId } },

      // 프로젝트 조회
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: 'team_id',
          as: 'projects',
        },
      },
      { $unwind: { path: '$projects', preserveNullAndEmptyArrays: true } },

      // 업무(Task) 조회
      {
        $lookup: {
          from: 'tasks',
          localField: 'projects._id',
          foreignField: 'project_id',
          as: 'projects.tasks',
        },
      },
      { $unwind: { path: '$projects.tasks', preserveNullAndEmptyArrays: true } },

      // 업무 상태에 포함된 팀원 정보 조회
      {
        $lookup: {
          from: 'users',
          localField: 'projects.tasks.task_member', // task_member 필드를 참조하여 users와 연결
          foreignField: '_id',
          as: 'projects.tasks.task_member_details',
        },
      },

      // 결과 그룹화
      {
        $group: {
          _id: '$_id',
          team_name: { $first: '$team' },
          projects: {
            $push: {
              _id: '$projects._id',
              title: '$projects.title',
              created_AT: '$projects.created_AT',
              updated_AT: '$projects.updated_AT',
              tasks: {
                _id: '$projects.tasks._id',
                title: '$projects.tasks.title',
                content: '$projects.tasks.content',
                created_AT: '$projects.tasks.created_AT',
                updated_AT: '$projects.tasks.updated_AT',
                status: '$projects.tasks.status', // Task 모델의 상태 정보
                priority: '$projects.tasks.priority', // Task 모델의 우선순위 정보
                task_member_details: '$projects.tasks.task_member_details', // Task에 할당된 팀원 정보
                comments: '$projects.tasks.comments', // 댓글 정보
              },
            },
          },
        },
      },

      // 프로젝트 필터링: ID가 null이 아닌 프로젝트만 유지
      {
        $project: {
          projects: {
            $filter: {
              input: '$projects',
              as: 'project',
              cond: { $ne: ['$$project._id', null] },
            },
          },
        },
      },
    ]);

    return result; // 첫 번째 결과만 반환
  },
};

import mongoose from "mongoose";
import { Team } from "./team.schema";

export const TeamService = {
  findTeamInfo: async (teamId: string) => {
    const teamObjectId = new mongoose.Types.ObjectId(teamId);

    const result = await Team.aggregate([
      { $match: { _id: teamObjectId } },

      // 프로젝트 조회
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "team_id",
          as: "projects",
        },
      },
      { $unwind: { path: "$projects", preserveNullAndEmptyArrays: true } },

      // 업무 조회
      {
        $lookup: {
          from: "tasks",
          localField: "projects._id",
          foreignField: "project_id",
          as: "projects.tasks",
        },
      },
      {
        $unwind: { path: "$projects.tasks", preserveNullAndEmptyArrays: true },
      },

      // 업무 상태 조회 (TaskStatus)
      {
        $lookup: {
          from: "taskstatuses",
          localField: "projects.tasks._id",
          foreignField: "task_id",
          as: "projects.tasks.taskStatuses",
        },
      },
      {
        $unwind: {
          path: "$projects.tasks.taskStatuses",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 업무 상태에 포함된 팀원 정보 조회
      {
        $lookup: {
          from: "users",
          localField: "projects.tasks.taskStatuses.task_member",
          foreignField: "_id",
          as: "projects.tasks.taskStatuses.task_member_details",
        },
      },

      // 결과 그룹화
      {
        $group: {
          _id: "$_id",
          team_name: { $first: "$team" },
          projects: {
            $push: {
              _id: "$projects._id",
              title: "$projects.title",
              created_AT: "$projects.created_AT",
              updated_AT: "$projects.updated_AT",
              tasks: {
                _id: "$projects.tasks._id",
                title: "$projects.tasks.title",
                content: "$projects.tasks.content",
                created_AT: "$projects.tasks.created_AT",
                updated_AT: "$projects.tasks.updated_AT",
                taskStatuses: {
                  _id: "$projects.tasks.taskStatuses._id",
                  start_date: "$projects.tasks.taskStatuses.start_date",
                  end_date: "$projects.tasks.taskStatuses.end_date",
                  status: "$projects.tasks.taskStatuses.status",
                  priority: "$projects.tasks.taskStatuses.priority",
                  task_member_details:
                    "$projects.tasks.taskStatuses.task_member_details",
                },
                comments: "$projects.tasks.comments", // 직접 접근 가능
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
              input: "$projects",
              as: "project",
              cond: { $ne: ["$$project._id", null] },
            },
          },
        },
      },
    ]);

    return result[0]; // 첫 번째 결과만 반환
  },
};

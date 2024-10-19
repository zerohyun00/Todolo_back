import mongoose from "mongoose";
import { Team } from "./team.schema";
import { AppError } from "../../middleware/error.handler.middleware";

const TeamService = {
  findTeamInfo: async (teamId: string) => {
    try {
      const teamObjectId = new mongoose.Types.ObjectId(teamId);

      const result = await Team.aggregate([
        { $match: { _id: teamObjectId } },

        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "teamMembers",
          },
        },
        {
          $project: {
            "teamMembers._id": 1,
            "teamMembers.name": 1,
            "teamMembers.email": 1,
            "teamMembers.avatar": 1,
            "teamMembers.password": 1,
            "teamMembers.createdAt": 1,
            "teamMembers.updatedAt": 1,
          },
        },

        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "team_id",
            as: "projects",
          },
        },
        { $unwind: { path: "$projects", preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "tasks",
            localField: "projects._id",
            foreignField: "project_id",
            as: "projects.tasks",
          },
        },
        {
          $unwind: {
            path: "$projects.tasks",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "projects.tasks.taskMember",
            foreignField: "_id",
            as: "projects.tasks.taskMember_details",
          },
        },

        {
          $group: {
            _id: "$_id",
            team_name: { $first: "$team" },
            teamMembers: { $first: "$teamMembers" },
            projects: {
              $push: {
                _id: "$projects._id",
                title: "$projects.title",
                projectColor: "$projects.projectColor",
                created_AT: "$projects.createdAt",
                updated_AT: "$projects.updatedAt",
                tasks: {
                  _id: "$projects.tasks._id",
                  title: "$projects.tasks.title",
                  content: "$projects.tasks.content",
                  startDate: "$projects.tasks.startDate",
                  endDate: "$projects.tasks.endDate",
                  created_AT: "$projects.tasks.createdAt",
                  updated_AT: "$projects.tasks.updatedAt",
                  status: "$projects.tasks.status",
                  priority: "$projects.tasks.priority",
                  task_member_details: "$projects.tasks.taskMember_details",
                  comments: "$projects.tasks.comments",
                },
              },
            },
          },
        },

        {
          $project: {
            projects: {
              $filter: {
                input: "$projects",
                as: "project",
                cond: { $ne: ["$$project._id", null] },
              },
            },
            teamMembers: 1,
          },
        },
      ]);

      if (!result || result.length === 0) {
        throw new AppError("Not Found", 404, "팀을 찾을 수 없습니다.");
      }

      return result;
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new AppError("Bad Request", 400, "잘못된 팀 ID입니다.");
      }
      throw new AppError(
        "Internal Server Error",
        500,
        "팀 정보를 가져오는 중 오류가 발생했습니다."
      );
    }
  },
};

export default TeamService;

import { Request, Response, NextFunction } from "express";
import { Team } from "../../models/team/team.schema";
import { AppError } from "../../middleware/error.handler.middleware";

export const teamMembershipValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const { team_id } = req.body;

    const userTeam = await Team.findOne({ members: userId });
    if (!userTeam) {
      throw new AppError("Forbidden", 403, "유저는 소속된 팀이 없습니다.");
    }

    if (team_id !== userTeam._id.toString()) {
      throw new AppError(
        "Forbidden",
        403,
        "해당 팀에 속해 있지 않으므로 업무를 생성할 수 없습니다."
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

import { Request, Response, NextFunction } from "express";
import TeamService from "./team.service";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const TeamController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.id;
    const teamDetails = await TeamService.findTeamInfo(teamId);
    res.status(200).json(teamDetails);
  } catch (err) {
    next(err);
  }
};

export default TeamController;

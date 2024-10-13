// controllers/TeamController.ts

import { Request, Response, NextFunction } from "express";
import { TeamService } from "./team.service";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const findTeamInfo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.id;
    const teamDetails = await TeamService.findTeamInfo(teamId);
    res.status(200).json(teamDetails);
  } catch (error) {
    next(error);
  }
};

import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { findTeamInfo } from "./team.controller";

const teamRouter = Router();

// Route to get team details
teamRouter.get("/:id", authMiddleware, findTeamInfo);

export default teamRouter;

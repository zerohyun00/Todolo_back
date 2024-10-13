import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware";
import TeamController from "./team.controller";

const teamRouter = Router();

teamRouter.get("/:id", authMiddleware, TeamController);

export default teamRouter;

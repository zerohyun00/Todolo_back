import { Router } from "express";
import ProjectController from "./project.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const ProjectRouter = Router();

// 프로젝트 생성

ProjectRouter.post("/", authMiddleware, ProjectController.createProject);

// 특정 유저 프로젝트 조회

ProjectRouter.get("/:id", authMiddleware, ProjectController.findProjectByUser);

// 프로젝트 수정

ProjectRouter.put("/:id", authMiddleware, ProjectController.updateProject);

// 모든 프로젝트 조회

ProjectRouter.get("/", authMiddleware, ProjectController.getAllProjects);

// 특정 프로젝트 삭제

ProjectRouter.delete("/:id", authMiddleware, ProjectController.deleteProject);

ProjectRouter.get(
  "/user/:id",
  authMiddleware,
  ProjectController.findProjectWithTasksByUser
);

export default ProjectRouter;

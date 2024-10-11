import { Request, Response, NextFunction } from "express";
import ProjectService from "./project.service";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const ProjectController = {
  createProject: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const projectData = {...req.body, user_id: req.user!.userId,}
      const projectData = req.body;
      const userId = req.user!.userId;

      const project = await ProjectService.createProject(projectData, userId);

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  updateProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedProject = await ProjectService.updateProject(id, req.body);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  },

  findProjectByUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: userId } = req.params;
      const projects = await ProjectService.findProjectByUser(userId);
      res.status(200).json({ message: "프로젝트 조회 성공", data: projects });
    } catch (error) {
      next(error);
    }
  },

  getAllProjects: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      next(error);
    }
  },

  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await ProjectService.deleteProject(id);
      res
        .status(200)
        .json({ message: "프로젝트가 성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  },

  findProjectWithTasksByUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: userId } = req.params; // 유저 ID를 경로에서 가져옴
      const projects = await ProjectService.findProjectWithTasksByUser(userId);
      res
        .status(200)
        .json({ message: "프로젝트 및 업무 조회 성공", data: projects });
    } catch (error) {
      next(error);
    }
  },
};
export default ProjectController;

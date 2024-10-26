import { Request, Response, NextFunction } from 'express';
import ProjectService from './project.service';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const ProjectController = {
  createProject: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const projectData = req.body;
      const userId = res.locals.userId;

      const project = await ProjectService.createProject(projectData, userId);

      res.status(201).send({ data: project });
    } catch (err) {
      next(err);
    }
  },

  updateProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedProject = await ProjectService.updateProject(id, req.body);
      res.send({ data: updatedProject });
    } catch (err) {
      next(err);
    }
  },

  findProjectByUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      const projects = await ProjectService.findProjectByUser(userId);
      res.status(200).send({ message: '프로젝트 조회 성공', data: projects });
    } catch (err) {
      next(err);
    }
  },

  getAllProjects: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await ProjectService.getAllProjects();
      res.send({ data: projects });
    } catch (err) {
      next(err);
    }
  },

  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await ProjectService.deleteProject(id);
      res.status(204).send({ message: '프로젝트가 성공적으로 삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  },

  findProjectWithTasksByUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      const projects = await ProjectService.findProjectWithTasksByUser(userId);
      res.status(200).send({ message: '프로젝트 및 업무 조회 성공', data: projects });
    } catch (err) {
      next(err);
    }
  },
};
export default ProjectController;

import { Request, Response, NextFunction } from 'express';
import ProjectService from './project.service';

const ProjectController = {
  createProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await ProjectService.createProject(req.body);
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

  findProjectByUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      const projects = await ProjectService.findProjectByUser(userId);
      res.status(200).json({ message: '프로젝트 조회 성공', data: projects });
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
      res.status(200).json({ message: '프로젝트가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  },
};
export default ProjectController;

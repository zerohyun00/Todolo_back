import { Router } from 'express';
import ProjectController from './project.controller';

const ProjectRouter = Router();

//생성
ProjectRouter.post('/', ProjectController.createProject);

export default ProjectRouter;

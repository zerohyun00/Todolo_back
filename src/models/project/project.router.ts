import { Router } from 'express';
import ProjectController from './project.controller';
import { authMiddleware } from '../../../middleware/auth.middleware';

const ProjectRouter = Router();

// 프로젝트 생성
//@ts-ignore
ProjectRouter.post('/', authMiddleware, ProjectController.createProject);

// 특정 유저 프로젝트 조회
//@ts-ignore
ProjectRouter.get('/:id', authMiddleware, ProjectController.findProjectByUser);

// 프로젝트 수정
//@ts-ignore
ProjectRouter.put('/:id', authMiddleware, ProjectController.updateProject);

// 모든 프로젝트 조회
//@ts-ignore
ProjectRouter.get('/', authMiddleware, ProjectController.getAllProjects);

// 특정 프로젝트 삭제
//@ts-ignore
ProjectRouter.delete('/:id', authMiddleware, ProjectController.deleteProject);

export default ProjectRouter;

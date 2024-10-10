import { Router } from 'express';
import TaskController from './task.controller';

const TaskRouter = Router();

//생성
TaskRouter.post('/', TaskController.createTask);

export default TaskRouter;

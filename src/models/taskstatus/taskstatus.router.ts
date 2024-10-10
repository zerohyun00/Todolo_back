import { Router } from 'express';
import TaskStautsController from './taskstatus.controller';

const TaskStautsRouter = Router();

//생성
TaskStautsRouter.post('/', TaskStautsController.createTaskStauts);

export default TaskStautsRouter;

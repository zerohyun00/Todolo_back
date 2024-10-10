import { Router } from 'express';

import TeamController from './team.controller';

const taskRouter = Router();

//생성
taskRouter.post('/', TeamController.createTeam);

export default taskRouter;

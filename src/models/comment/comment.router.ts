import { Router } from 'express';
import CommentController from './comment.controller';

const CommentRouter = Router();

//생성
CommentRouter.post('/', CommentController.createComment);

export default CommentRouter;

import { Request, Response, NextFunction } from "express";

import { Types } from "mongoose";
import TaskService from "./task.service";

const TaskController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.userId;
      const taskData = req.body;
      const task = await TaskService.createTask(taskData, userId);
      res
        .status(201)
        .send({ message: "업무가 성공적으로 생성되었습니다.", data: task });
    } catch (err) {
      next(err);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const userId = res.locals.userId;
      const taskData = req.body;
      const updatedTask = await TaskService.updateTask(
        new Types.ObjectId(taskId),
        taskData,
        userId
      );
      res.status(200).send({
        message: "업무가 성공적으로 수정되었습니다.",
        data: updatedTask,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const userId = res.locals.userId;
      const result = await TaskService.deleteTask(
        new Types.ObjectId(taskId),
        userId
      );
      res
        .status(204)
        .send({ message: "업무가 성공적으로 삭제되었습니다.", data: result });
    } catch (err) {
      next(err);
    }
  },

  addComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;

      const userId = res.locals.userId;
      const commentData = req.body;

      const result = await TaskService.addComment(
        new Types.ObjectId(taskId),
        commentData,
        userId
      );

      res.status(201).send({ message: "댓글이 작성되었습니다.", data: result });
    } catch (err) {
      next(err);
    }
  },

  updateComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, commentId } = req.params;
      const userId = res.locals.userId;
      const commentData = req.body;

      const result = await TaskService.updateComment(
        new Types.ObjectId(taskId),
        new Types.ObjectId(commentId),
        commentData,
        userId
      );

      res.status(200).send({ message: "댓글이 수정되었습니다.", data: result });
    } catch (err) {
      next(err);
    }
  },

  deleteComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, commentId } = req.params;
      const userId = res.locals.userId;

      const result = await TaskService.deleteComment(
        new Types.ObjectId(taskId),
        new Types.ObjectId(commentId),
        userId
      );

      res.status(204).send({ message: "댓글이 삭제되었습니다.", data: result });
    } catch (err) {
      next(err);
    }
  },

  getTaskByTaskId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;

      if (!Types.ObjectId.isValid(taskId)) {
        res.status(400).send({ message: "유효하지 않은 업무 ID입니다." });
        return;
      }

      const task = await TaskService.getTaskByTaskId(
        new Types.ObjectId(taskId)
      );

      res.status(200).send({
        message: "업무가 성공적으로 조회되었습니다.",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default TaskController;

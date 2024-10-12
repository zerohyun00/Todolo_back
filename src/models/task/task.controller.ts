import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import TaskService from "./task.service";
import { date } from "joi";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const TaskController = {
  createTask: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskData = {
        ...req.body,
        user_id: req.user!.userId,
      };
      const task = await TaskService.createTask(taskData);
      res
        .status(201)
        .send({ message: "업무가 성공적으로 생성되었습니다.", date: task });
    } catch (err) {
      next(err);
    }
  },

  updateTask: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);

      const task = await TaskService.findTaskById(objectId);
      if (task.user_id.toString() !== req.user!.userId) {
        res.status(403).send({ message: "업무를 수정할 권한이 없습니다." });
      }

      const updatedTask = await TaskService.updateTask(objectId, req.body);
      res.status(200).send({
        message: "업무가 성공적으로 수정되었습니다. ",
        data: updatedTask,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);

      const task = await TaskService.findTaskById(objectId);
      if (task.user_id.toString() !== req.user!.userId) {
        res.status(403).json({ message: "업무를 삭제할 권한이 없습니다." });
      }

      await TaskService.deleteTask(objectId);
      res.status(200).send({ message: "업무가 성공적으로 삭제되었습니다." });
    } catch (err) {
      next(err);
    }
  },

  findTask: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);
      const task = await TaskService.findTask(objectId);
      res.status(200).send({ message: "업무 검색 성공", data: task });
    } catch (err) {
      next(err);
    }
  },

  getAllTasks: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const tasks = await TaskService.getAllTasks(page, limit);
      res.status(200).send({ message: "모든 업무 검색 성공", data: tasks });
    } catch (err) {
      next(err);
    }
  },
  findTasksByStatus: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { status } = req.params;
      const tasks = await TaskService.findTasksByStatus(status);
      res.status(200).send({ message: "업무 상태 검색 성공", data: tasks });
    } catch (err) {
      next(err);
    }
  },

  addComment: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const userId = req.user!.userId;
      const commentData = req.body;

      if (!commentData.comment_content) {
        res.status(400).send({ message: "댓글 내용을 입력해주세요" });
      }

      const comment = await TaskService.addComment(
        new mongoose.Types.ObjectId(taskId),
        new mongoose.Types.ObjectId(userId),
        commentData
      );

      res
        .status(201)
        .send({ message: "댓글이 추가되었습니다.", data: comment });
    } catch (err) {
      next(err);
    }
  },

  getComments: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;

      const comments = await TaskService.getComments(
        new mongoose.Types.ObjectId(taskId)
      );

      res.status(200).send({ message: "댓글 목록 조회 성공", data: comments });
    } catch (err) {
      next(err);
    }
  },

  updateComment: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId, commentId } = req.params;
      const userId = req.user!.userId;
      const commentData = req.body;

      const updatedComment = await TaskService.updateComment(
        new mongoose.Types.ObjectId(taskId),
        new mongoose.Types.ObjectId(commentId),
        new mongoose.Types.ObjectId(userId),
        commentData
      );

      res
        .status(200)
        .send({ message: "댓글이 수정되었습니다.", data: updatedComment });
    } catch (err) {
      next(err);
    }
  },

  deleteComment: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId, commentId } = req.params;
      const userId = req.user!.userId;

      await TaskService.deleteComment(
        new mongoose.Types.ObjectId(taskId),
        new mongoose.Types.ObjectId(commentId),
        new mongoose.Types.ObjectId(userId)
      );

      res.status(200).send({ message: "댓글이 삭제되었습니다." });
    } catch (err) {
      next(err);
    }
  },
};

export default TaskController;

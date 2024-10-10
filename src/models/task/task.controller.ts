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
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
    }
  },
};

export default TaskController;

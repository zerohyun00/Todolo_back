import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import TaskService from "./task.service";

const TaskController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await TaskService.createTask(req.body);
      res
        .status(201)
        .json({ message: "업무가 성공적으로 생성되었습니다.", data: task });
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);
      const task = await TaskService.updateTask(objectId, req.body);
      res
        .status(200)
        .json({ message: "업무가 성공적으로 수정되었습니다.", data: task });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);
      await TaskService.deleteTask(objectId);
      res.status(200).json({ message: "업무가 성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  },

  findTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const objectId = new mongoose.Types.ObjectId(taskId);
      const task = await TaskService.findTask(objectId);
      res.status(200).json({ data: task });
    } catch (error) {
      next(error);
    }
  },

  getAllTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const tasks = await TaskService.getAllTasks(page, limit);
      res.status(200).json({ data: tasks });
    } catch (error) {
      next(error);
    }
  },
  findTasksByStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { status } = req.params;
      const tasks = await TaskService.findTasksByStatus(status);
      res.status(200).json({ data: tasks });
    } catch (error) {
      next(error);
    }
  },
};

export default TaskController;

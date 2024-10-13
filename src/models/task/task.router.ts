import { Router } from "express";
import TaskController from "./task.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const TaskRouter = Router();

// 업무 생성
TaskRouter.post("/task", authMiddleware, TaskController.createTask);

// 업무 수정
TaskRouter.put("/task/:taskId", authMiddleware, TaskController.updateTask);

// 업무 삭제
TaskRouter.delete("/task/:taskId", authMiddleware, TaskController.deleteTask);

export default TaskRouter;

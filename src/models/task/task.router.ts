import { Router } from "express";
import TaskController from "./task.controller";

const TaskRouter = Router();

// 생성
TaskRouter.post("/task", TaskController.createTask);

// 수정
TaskRouter.put("/task/:taskId", TaskController.updateTask);

// 삭제
TaskRouter.delete("/task/:taskId", TaskController.deleteTask);

// 조회
TaskRouter.get("/task/:taskId", TaskController.findTask);

// 모든 조회
TaskRouter.get("/tasks", TaskController.getAllTasks);

// 상태 조회
TaskRouter.get("/taskstatus", TaskController.findTasksByStatus);

export default TaskRouter;
